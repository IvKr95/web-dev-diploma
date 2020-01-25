<?php

/**
 * Provides properties and methods
 * to logout a user
 */
class Logout extends Auth
{

    /**
     * @var string $param param to identify a user
     * @var string $state state to switch to
     * @var string $userId user unique id
     */
    protected $param;
    protected $state;
    protected $userId;

    /**
     * Constructor of Logout
     * @param object $connect
     * @param string $table
     * @param string $target
     * @param string $param
     * @param string $state
     * @param string $userId
     */
    public function __construct(object $connect, string $table, string $target, string $param, int $state, string $userId) 
    {
        parent::__construct($connect, $table, $target);
        $this->param = $param;
        $this->state = $state;
        $this->userId = $userId;
    }

    /**
     * Fires on successful SQL statement execution
     * @uses $this->bindParams()
     * @uses $this->execute()
     * @return void
     */
    protected function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
        $this->printResponse();
    }

    /**
     * Sends response to the client
     * @uses $this->checkIfLoggedIn()
     * @uses $this->rows
     * @return void
     */
    protected function printResponse(): void
    {
        $response = ['success' => true, 'content' => 'Successfully Logged Out'];
        echo json_encode($response);
    }

     /**
     * Binds params to a prepared statement 
     * @uses $this->state
     * @uses $this->userId
     * @return void
     */
    protected function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, "is", $this->state, $this->userId);
    }

    /**
     * Used to logout a user
     * @uses $this->connect()
     * @uses $this->setQuery()
     * @uses $this->onFail()
     * @uses $this->onSuccess()
     * @uses $this->stmt
     * @uses $this->query
     * @return void
     */
    public function logout(): void
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
     * @uses $this->param
     * @return void
     */
    protected function setQuery(): void
    {
        $this->query = "UPDATE " . $this->table . " SET " . $this->target . "=? WHERE " . $this->param . "=?;";
    }
}