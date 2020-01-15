<?php

class UpdateData extends BaseClass
{
    private $data;
    
    public function __construct(object $connect, string $action, string $table, $data, string $param) 
    {
        parent::__construct($connect, $action, $table);
        $this->data = $data;
        $this->param = $param;
    }


    public function setQuery(): void
    {
        if ($this->action === 'updatePrices') {
            $this->query = "UPDATE " . $this->table . " SET `standardPrice`=?, `vipPrice`=? WHERE `hallName`=?";
        } elseif ($this->action === 'openSales') {
            $this->query = "UPDATE " . $this->table . " SET `isOpen`=? WHERE `hallName`=?";
        } else if ($this->action === 'updateHall') {
            $this->query = "UPDATE " . $this->table . " SET `hallMap`=? WHERE `showId`=?";
        } else {
            $this->query = "UPDATE " . $this->table . " SET `rows`=?, `maxSeatsInRow`=?, `hallSchema`=? WHERE `hallName`=?";
        }
    }

    public function update(): void
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

    public function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
    }

    public function bindParams(): void
    {
        if ($this->action === 'updatePrices') {
            mysqli_stmt_bind_param($this->stmt, "iis", $this->data->standardPrice, $this->data->vipPrice, $this->param);
        } elseif ($this->action === 'openSales') {
            mysqli_stmt_bind_param($this->stmt, 'ss', $this->data->state, $this->param);
        } else if ($this->action === 'updateHall') {
            mysqli_stmt_bind_param($this->stmt, "ss", $this->data, $this->param);
        } else {
            mysqli_stmt_bind_param($this->stmt, 'iiss', $this->data->rows, $this->data->maxSeatsInRow, $this->data->activeHallMap, $this->param);
        }
    }
}