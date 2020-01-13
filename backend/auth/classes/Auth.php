<?php

abstract class Auth 
{
    protected $stmt;
    protected $query;
    protected $connect;
    protected $result;

    public function __construct($connect, $table, $target)
    {
        $this->connect = $connect;
        $this->table = $table;
        $this->target = $target;
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