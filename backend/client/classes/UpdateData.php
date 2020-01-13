<?php

class UpdateData extends ClientBaseClass
{

    public function __construct(object $connect, string $action, string $data, string $target) 
    {
        $this->connect = $connect;
        $this->action = $action;
        $this->data = $data;
        $this->target = $target;
    }

    public function setQuery(): void
    {
        if ($this->action === 'updateHall') {
            $this->query = "UPDATE `shows` SET `hallMap`=? WHERE `showId`=?";
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
        if ($this->action === 'updateHall') {
            mysqli_stmt_bind_param($this->stmt, "ss", $this->data, $this->target);
        }
    }
}