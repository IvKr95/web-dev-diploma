<?php

abstract class AdminBaseClass
{
    protected $stmt;
    protected $query;
    protected $connect;
    protected $action;
    protected $target;
    protected $result;
    protected $param;
    protected $rows;

    CONST ACTION_STRING = 'action';

    public function __construct($connect, $action) 
    {
        $this->connect = $connect;
        $this->action = $action;
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
        $response = ['status' => 'fail', 'content' => 'SQLi Error'];
        echo json_encode($response);
    }

    protected function execute(): void
    {
        mysqli_stmt_execute($this->stmt);
    }
}