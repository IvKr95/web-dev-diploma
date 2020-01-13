<?php

class UpdateData extends AdminBaseClass
{
    public function __construct(object $connect, string $action, object $data, string $target) 
    {
        parent::__construct($connect, $action);
        $this->data = $data;
        $this->target = $target;
    }

    public function setQuery(): void
    {
        if ($this->action === 'updatePrices') {
            $this->query = "UPDATE `halls` SET `standardPrice`=?, `vipPrice`=? WHERE `hallName`=?";
        } elseif ($this->action === 'openSales') {
            $this->query = "UPDATE `halls` SET `isOpen`=? WHERE `hallName`=?";
        } else {
            $this->query = "UPDATE `halls` SET `rows`=?, `maxSeatsInRow`=?, `hallSchema`=? WHERE `hallName`=?";
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
            mysqli_stmt_bind_param($this->stmt, "iis", $this->data->standardPrice, $this->data->vipPrice, $this->target);
        } elseif ($this->action === 'openSales') {
            mysqli_stmt_bind_param($this->stmt, 'ss', $this->data->state, $this->target);
        } else {
            mysqli_stmt_bind_param($this->stmt, 'iiss', $this->data->rows, $this->data->maxSeatsInRow, $this->data->activeHallMap, $this->target);
        } 
    }
}