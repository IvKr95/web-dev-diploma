<?php

/**
 * Basic class which provides
 * generic methods and properties
 */

class Auth 
{
    /**
     * @var object $stmt An object for use with mysqli_stmt_prepare
     * @var string $query A query to execute
     * @var object $connect A connect object for initializing a statement
     * @var object|false A result set from a prepared statement
     * @var array|object Result row(s)
     */
    protected $stmt;
    protected $query;
    protected $connect;
    protected $result;
    protected $rows;

    /**
     * Constructor of Auth
     * @param object $connect
     * @param string $table
     * @param string $target
     */
    public function __construct(object $connect, string $table, string $target)
    {
        $this->connect = $connect;
        $this->table = $table;
        $this->target = $target;
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