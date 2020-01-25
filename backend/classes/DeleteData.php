<?php

/**
 * Used to delete various data from the given table
 */
class DeleteData extends BaseClass
{
    const DELETE_SHOWTIME_ACTION = 'deleteShowTime';
    const DELETE_HALL_ACTION = 'deleteHall';
    const DELETE_SHOWS_ACTION = 'deleteShows';

    /**
     * The constructor of DeleteData
     * @param object $connect
     * @param string $table
     * @param string $action
     * @param object $param
     */
    public function __construct(object $connect, string $action, string $table, string $param) 
    {
        parent::__construct($connect, $action, $table);
        $this->param = $param;
    }

    /**
     * Prepares a Query
     * @uses $this->table
     * @uses $this->action
     * @return void
     */
    private function setQuery(): void
    {
        if ($this->action === self::DELETE_SHOWTIME_ACTION) {
            $this->query = "DELETE FROM " . $this->table . " WHERE `showId`=?";
        } elseif ($this->action === self::DELETE_HALL_ACTION) {
            $this->query = "DELETE FROM " . $this->table . " WHERE `hallName`=?";
        } elseif ($this->action === self::DELETE_SHOWS_ACTION) {
            $this->query = "DELETE FROM " . $this->table . " WHERE `hall`=?";
        }
    }

    /**
     * Removes data from the given table
     * @uses $this->connect()
     * @uses $this->setQuery()
     * @uses $this->onFail()
     * @uses $this->onSuccess()
     * @uses $this->stmt
     * @uses $this->query
     * @return void
     */
    public function delete(): void
    {
        $this->connect();
        $this->setQuery();
        if (!mysqli_stmt_prepare($this->stmt, $this->query)) {
            $this->onFail();
        } else {
            $this->onSuccess();
        };
    }

    /**
     * Fires on successful SQL statement execution
     * @uses $this->bindParams()
     * @uses $this->execute()
     * @return void
     */
    private function onSuccess(): void
    {
        if ($this->param) {
            $this->bindParams();
        }
        $this->execute();
    }

    /**
     * Binds params to a prepared statement 
     * @uses $this->stmt
     * @uses $this->param
     * @return void
     */
    private function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, substr(gettype($this->param), 0, 1), $this->param);
    }
}