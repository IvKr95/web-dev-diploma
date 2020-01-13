<?php

class Fetch extends Auth
{
    protected $param;

    public function __construct($connect, $table, $target, $param) 
    {
        parent::__construct($connect, $table, $target);
        $this->param = $param;
    }

    public function __destruct()
    {
        
    }

    protected function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
        $this->getResult();
        $this->getResultData();
    }

    protected function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, "s", $this->param);
    }

    protected function getResult(): void
    {
        $this->result = mysqli_stmt_get_result($this->stmt);
    }

    protected function getResultData(): void
    {
        if ($row = mysqli_fetch_assoc($this->result)) {
            $isLoggedIn = $row['isLoggedIn'];
    
            if (!$isLoggedIn) {
                $response = ['success' => false];
                echo json_encode($response);
            } else {
                $response = ['success' => true, 'user' => $row['uuid']];
                echo json_encode($response);
            }
        }
    }

    public function fetch(): void
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
        $this->query = "SELECT * FROM " . $this->table . " WHERE " . $this->target . "=?;";
    }
}