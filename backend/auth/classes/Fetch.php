<?php

/**
 * Provides properties and methods
 * to work with fetching a user
 */
class Fetch extends Auth
{

    /**
     * @var string $param parameter to bind to a prepared statement
     */
    protected $param;

    /**
     * Constructor of Fetch
     * @param object $connect
     * @param string $table
     * @param string $target
     * @param string $param
     */
    public function __construct(object $connect, string $table, string $target, string $param) 
    {
        parent::__construct($connect, $table, $target);
        $this->param = $param;
    }

    /**
     * Fires on successful SQL statement execution
     * @uses $this->bindParams()
     * @uses $this->execute()
     * @uses $this->getResult()
     * @uses $this->fetchRows()
     * @return void
     */
    protected function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
        $this->getResult();
        $this->fetchRows();
        $this->printResponse();
    }

    /**
     * Binds params to a prepared statement 
     * @uses $this->stmt
     * @uses $this->param
     * @return void
     */
    protected function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, "s", $this->param);
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
     * Fetch a result row
     * @uses $this->result
     * @return void
     */
    protected function fetchRows(): void
    {
        $this->rows = mysqli_fetch_assoc($this->result);
    }

    /**
     * Checks if a user is logged in
     * @uses $this->rows
     * @return int
     */
    protected function checkIfLoggedIn(): int
    {
        $isLoggedIn = $this->rows['isLoggedIn'];
        return $isLoggedIn;
    }

    /**
     * Sends response to the client
     * @uses $this->checkIfLoggedIn()
     * @uses $this->rows
     * @return void
     */
    protected function printResponse(): void
    {
        if (!$this->checkIfLoggedIn()) {
            $response = ['success' => false];
            echo json_encode($response);
        } else {
            $response = ['success' => true, 'user' => $this->rows['uuid']];
            echo json_encode($response);
        }
    }

    /**
     * Used to fetch data about a user
     * @uses $this->connect()
     * @uses $this->setQuery()
     * @uses $this->onFail()
     * @uses $this->onSuccess()
     * @uses $this->stmt
     * @uses $this->query
     * @return void
     */
    public function fetch(): void
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