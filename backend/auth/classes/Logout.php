<?php

class Logout extends Auth
{
    protected $param;
    protected $state;
    protected $userId;

    public function __construct($connect, $table, $target, $param, $state, $userId) 
    {
        parent::__construct($connect, $table, $target);
        $this->param = $param;
        $this->state = $state;
        $this->userId = $userId;
    }

    public function __destruct()
    {
        
    }

    protected function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
        $response = ['success' => true, 'content' => 'Successfully Logged Out'];
        echo json_encode($response);
    }

    protected function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, "is", $this->state, $this->userId);
    }

    public function logout(): void
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
        $this->query = "UPDATE " . $this->table . " SET " . $this->target . "=? WHERE " . $this->param . "=?;";
    }
}