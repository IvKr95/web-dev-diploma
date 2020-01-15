<?php

class DeleteData extends BaseClass
{
    const DELETE_SHOWTIME_ACTION = 'deleteShowTime';
    const DELETE_HALL_ACTION = 'deleteHall';
    const DELETE_SHOWS_ACTION = 'deleteShows';

    public function __construct(object $connect, string $action, string $table, string $param) 
    {
        $this->param = $param;
        parent::__construct($connect, $action, $table);
    }

    private function setQuery(): void
    {
        if ($this->action === self::DELETE_SHOWTIME_ACTION) {
            $this->query = "DELETE FROM " . $this->table . " WHERE `showId`=?";
        } elseif ($this->action === self::DELETE_HALL_ACTION) {
            $this->query = "DELETE FROM " . $this->table . " WHERE `hallName`=?";
        } elseif ($this->action === self::DELETE_SHOWS_ACTION) {
            $this->query = "DELETE FROM " . $this->table . " WHERE `hall`=?";
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
        if ($this->param) {
            $this->bindParams();
        }
        $this->execute();
    }

    private function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, substr(gettype($this->param), 0, 1), $this->param);
    }
}