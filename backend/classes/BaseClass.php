<?php

/**
 * Basic class which provides
 * generic methods and properties
 */
class BaseClass
{
    /**
     * @var object $stmt An object for use with mysqli_stmt_prepare
     * @var string $query A query to execute
     * @var object $connect A connect object for initializing a statement
     * @var string $action An action to specify operation
     * @var object $table An SQL table to work with
     * @var object $param A parameter to bind to
     * @var object $rows The rows from the result
     * @var object|false $result A result set from a prepared statement
     */
    protected $stmt;
    protected $query;
    protected $connect;
    protected $action;
    protected $table;
    protected $result;
    protected $param;
    protected $rows;

    CONST ACTION_STRING = 'action';

     /**
     * Constructor of BaseClass
     * @param object $connect
     * @param string $table
     * @param string $action
     */
    public function __construct(object $connect, string $action, string $table) 
    {
        $this->connect = $connect;
        $this->action = $action;
        $this->table = $table;
    }

    /**
     * Destructor
     */
    public function __destruct()
    {
        $this->disconnect();
    }

    /**
     * Initializes a statement and returns an 
     * object for use with mysqli_stmt_prepare
     * @uses $this->connect
     * @return void
     */
    protected function connect(): void
    {
        $this->stmt = mysqli_stmt_init($this->connect);
    }

    /**
     * Closes a prepared statement
     * @uses $this->stmt
     * @return void
     */
    protected function disconnect(): void
    {
        mysqli_stmt_close($this->stmt);
    }

    /**
     * Gives bad response on SQLi Error
     * @return void
     */
    protected function onFail(): void
    {
        $response = ['success' => false, 'content' => 'SQLi Error'];
        echo json_encode($response);
    }

    /**
     * Executes a prepared Query
     * @uses $this->stmt
     * @return void
     */
    protected function execute(): void
    {
        mysqli_stmt_execute($this->stmt);
    }
}