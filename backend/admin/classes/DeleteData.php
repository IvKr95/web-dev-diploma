<?php

class DeleteData extends AdminBaseClass
{
    const DELETE_SHOWTIME_ACTION = 'deleteShowTime';
    const DELETE_HALL_ACTION = 'deleteHall';
    const DELETE_SHOWS_ACTION = 'deleteShows';

    public function __construct(string $target, object $connect, string $action) 
    {
        $this->target = $target;
        parent::__construct($connect, $action);
    }

    private function setQuery(): void
    {
        if ($this->action === self::DELETE_SHOWTIME_ACTION) {
            $this->query = "DELETE FROM `shows` WHERE `showId`=?";
        } elseif ($this->action === self::DELETE_HALL_ACTION) {
            $this->query = "DELETE FROM `halls` WHERE `hallName`=?";
        } elseif ($this->action === self::DELETE_SHOWS_ACTION) {
            $this->query = "DELETE FROM `shows` WHERE `hall`=?";
        } else {
            echo 'whoopsi';
        }
    }

    public function delete(): void
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

    private function onSuccess(): void
    {
        if ($this->target) {
            $this->bindParams();
        }
        $this->execute();
    }

    private function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, substr(gettype($this->target), 0, 1), $this->target);
    }
}