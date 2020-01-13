<?php

class ClientBaseClass
{
    protected $stmt;
    protected $query;
    protected $connect;
    protected $result;
    protected $target;
    protected $action;

    const ACTION_STRING = 'action';

    public function __construct() 
    {
    }

    protected function connect()
    {
        $this->stmt = mysqli_stmt_init($this->connect);
    }

    protected function disconnect()
    {
        mysqli_stmt_close($this->stmt);
    }

    protected function onFail()
    {
        $response = ['success' => false, 'content' => 'SQLi Error'];
        echo json_encode($response);
    }

    protected function execute()
    {
        mysqli_stmt_execute($this->stmt);
    }
}