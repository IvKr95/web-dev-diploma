<?php

/**
 * Used to update various data in the given table
 */
class UpdateData extends BaseClass
{
    private $data;
    
    /**
     * Constructor of UpdateData
     * @param object $connect
     * @param string $table
     * @param string $action
     * @param object $data
     * @param string $param
     */
    public function __construct(object $connect, string $action, string $table, $data, string $param) 
    {
        parent::__construct($connect, $action, $table);
        $this->data = $data;
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

    /**
     * Updates data in the given table
     * @uses $this->connect()
     * @uses $this->setQuery()
     * @uses $this->onFail()
     * @uses $this->onSuccess()
     * @uses $this->stmt
     * @uses $this->query
     * @return void
     */
    public function update(): void
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
        $this->bindParams();
        $this->execute();
    }

    /**
     * Binds params to a prepared statement 
     * @uses $this->stmt
     * @uses $this->action
     * @uses $this->data
     * @uses $this->param
     * @return void
     */
    private function bindParams(): void
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