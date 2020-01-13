<?php

class Login extends Auth
{
    protected $email;
    protected $pwd;

    public function __construct($connect, $table, $target, $email, $pwd) 
    {
        parent::__construct($connect, $table, $target);
        $this->email = $email;
        $this->pwd = $pwd;
    }

    public function __destruct()
    {
        
    }

    protected function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
        $this->getResult();
        $this->getResultData();
    }

    protected function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, "s", $this->email);
    }

    protected function getResult(): void
    {
        $this->result = mysqli_stmt_get_result($this->stmt);
    }

    protected function getResultData(): void
    {
        if ($row = mysqli_fetch_assoc($this->result)) {
            $pwdCheck = ($this->pwd === $row['uPwd']);

            if ($pwdCheck === false) {
                $response = ['success' => false, 'content' => 'Wrong Password'];
            } else {
                $response = ['success' => true, 'content' => 'Session Started', 'user' => $row['uuid']];
                $loginQuery = "UPDATE `users` SET `isLoggedIn`=1 WHERE `uuid`=?";
                
                if (!mysqli_stmt_prepare($this->stmt, $loginQuery)) {
                    $response = ['success' => false, 'content' => 'SQLi Error'];
                } else {
                    mysqli_stmt_bind_param($this->stmt, "s", $row['uuid']);
                    mysqli_stmt_execute($this->stmt);
                }
            };
        } else {
            $response = ['success' => false, 'content' => 'No Such User'];
        }
        echo json_encode($response);
    }

    public function login(): void
    {
        $this->connect();
        $this->setQuery();
        if (!mysqli_stmt_prepare($this->stmt, $this->query)) {
            $this->onFail();
        } else {
            $this->onSuccess();
        };
        $this->disconnect();
    }

    protected function setQuery(): void
    {
        $this->query = "SELECT * FROM " . $this->table . " WHERE " . $this->target . "=?;";
    }
}