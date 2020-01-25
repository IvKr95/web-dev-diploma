<?php

/**
 * Provides properties and methods
 * to authorize a user
 */
class Login extends Auth
{
    /**
     * @var string $email user email
     * @var string $password user password
     */
    protected $email;
    protected $password;

    /**
     * The constructor of Login
     * @param object $connect
     * @param string $table
     * @param string $target
     * @param string $email
     * @param string $password
     */
    public function __construct(object $connect, string $table, string $target, string $email, string $password) 
    {
        parent::__construct($connect, $table, $target);
        $this->email = $email;
        $this->password = $password;
    }

    /**
     * Fires on successful SQL statement execution
     * @uses $this->bindParams()
     * @uses $this->execute()
     * @uses $this->getResult()
     * @uses $this->getRows()
     * @return void
     */
    protected function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
        $this->getResult();
        $this->getRows();
    }

    /**
     * Binds params to a prepared statement 
     * @uses $this->stmt
     * @uses $this->email
     * @return void
     */
    protected function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, "s", $this->email);
    }

    /**
     * Gets a result set from a prepared statement
     * @uses $this->stmt
     * @return void
     */
    protected function getResult(): void
    {
        $this->result = mysqli_stmt_get_result($this->stmt);
    }

    /**
     * Gets a result row/rows
     * @uses $this->result
     * @return void
     */
    protected function getRows(): void
    {
        if ($row = mysqli_fetch_assoc($this->result)) {
            $pwdCheck = ($this->password === $row['uPwd']);

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
    
    /**
     * Used to auth a user
     * @uses $this->connect()
     * @uses $this->setQuery()
     * @uses $this->onFail()
     * @uses $this->onSuccess()
     * @uses $this->stmt
     * @uses $this->query
     * @return void
     */
    public function login(): void
    {
        $this->connect();
        $this->setQuery();
        if (!mysqli_stmt_prepare($this->stmt, $this->query)) {
            $this->onFail();
        } else {
            $this->onSuccess();
        };
    }

    /**
     * Prepares a Query
     * @uses $this->table
     * @uses $this->target
     * @return void
     */
    protected function setQuery(): void
    {
        $this->query = "SELECT * FROM " . $this->table . " WHERE " . $this->target . "=?;";
    }
}