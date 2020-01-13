<?php

class GetData extends AdminBaseClass
{
    public function __construct(string $target, object $connect, ?string $param) 
    {
        $this->target = $target;
        parent::__construct($connect, 'get');
        $this->param = $param;
    }

    public function setQuery(): void
    {
        if ($this->param) {
            $this->query = "SELECT * FROM " . $this->target . ' WHERE `date`=?';
        } else {
            $this->query = "SELECT * FROM " . $this->target;
        }
    }

    public function get(): void
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
        if ($this->param) {
            $this->bindParams();
        }
        $this->execute();
        $this->getResult();
        $this->outputRows();
    }

    public function outputRows(): void
    {
        if (count($this->rows) > 0) {
            echo json_encode($this->rows);
        } else {
            echo json_encode([]);
        }
    }

    public function getResult(): void
    {
        $this->result = mysqli_stmt_get_result($this->stmt);
        $this->rows = [];
        while ($row = mysqli_fetch_assoc($this->result)) {
            array_push($this->rows, $row);
        };
        if ($this->target === 'movies') {
            foreach ($this->rows as &$movie) {
                if (isset($movie['poster'])) {
                    $img_base64 = base64_encode(file_get_contents('..' . $movie['poster']));
                    $img = 'data:image/png'.';base64,'.$img_base64;
                    $movie['poster'] = $img;
                }
            }
        }
    }

    public function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, substr(gettype($this->param), 0, 1), $this->param);
    }
}