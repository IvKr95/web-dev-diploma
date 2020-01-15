<?php

class BaseClass
{
    protected $stmt;
    protected $query;
    protected $connect;
    protected $action;
    protected $target;
    protected $table;
    protected $result;
    protected $param;
    protected $rows;

    CONST ACTION_STRING = 'action';

    public function __construct(object $connect, string $action, string $table) 
    {
        $this->connect = $connect;
        $this->action = $action;
        $this->table = $table;
    }

    public function __destruct()
    {
        
    }

    protected function connect(): void
    {
        $this->stmt = mysqli_stmt_init($this->connect);
    }

    protected function disconnect(): void
    {
        mysqli_stmt_close($this->stmt);
    }

    protected function onFail(): void
    {
        $response = ['success' => false, 'content' => 'SQLi Error'];
        echo json_encode($response);
    }

    protected function execute(): void
    {
        mysqli_stmt_execute($this->stmt);
    }
}