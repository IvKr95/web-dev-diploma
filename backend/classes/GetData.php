<?php

class GetData extends BaseClass
{

    public function __construct(string $action, $table, object $connect, ?string $param) 
    {
        parent::__construct($connect, $action, $table);
        $this->param = $param;
    }

    public function setQuery(): void
    {
        
        if ($this->action === 'getHallMapByShowId') {
            $this->query = "SELECT `hallMap` FROM " . $this->table . " WHERE `showId`=?";
        } elseif ($this->action === 'getHallByName') {
            $this->query = "SELECT * FROM " . $this->table . " WHERE `hallName`=?";
        } elseif ($this->action === 'getShowsByDate') {
            $this->query = "SELECT * FROM " . $this->table . " WHERE `date`=?";
        } elseif ($this->action === 'getMovieByName') {
            $this->query = "SELECT * FROM " . $this->table . " WHERE `name`=?";
        } elseif ($this->action === 'getShows') {
            $this->query = "SELECT * FROM " . $this->table . " WHERE `date`=?";
        } else {
            $this->query = "SELECT * FROM " . $this->table;
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
        if ($this->rows || count($this->rows) > 0) {
            echo json_encode($this->rows);
        } else {
            echo json_encode([]);
        }
    }

    public function getResult(): void
    {
        $this->result = mysqli_stmt_get_result($this->stmt);

        if ($this->action === 'getShowsByDate') {
            $this->rows = [];
            while ($row = mysqli_fetch_assoc($this->result)) {
                array_push($this->rows, $row);
            };

            $formatedShows = [];
        
            foreach ($this->rows as $show) {
                $showId = $show['showId'];
                $time = $show['time'];
                $movieName = $show['movieName'];
                $hall = $show['hall'];

                if (count($formatedShows) === 0) {
                    $data = [
                        'movieName' => $movieName,
                        'shows' => [
                            $hall => [
                                [
                                    'showId' => $showId,
                                    'time' => $time
                                ]
                            ]
                        ]
                    ];
                    array_push($formatedShows, $data);
                } else {
                    $flag1 = false;

                    foreach ($formatedShows as &$formatedShow) {
                        if ($formatedShow['movieName'] === $movieName) {
                            $flag1 = false;
                            if (array_key_exists($hall, $formatedShow['shows'])) {
                                $flag2 = false;
        
                                foreach ($formatedShow['shows'][$hall] as $show) {
                                    if ($show['showId'] === $showId) {
                                        break;
                                    } else {
                                        $flag2 = true;
                                    }
                                }
        
                                if ($flag2) array_push($formatedShow['shows'][$hall], ['showId' => $showId, 'time' => $time]);
        
                            } else {
                                $formatedShow['shows'][$hall] = [
                                    [
                                        'showId' => $showId, 
                                        'time' => $time
                                    ]
                                ];
                            }
                            break;
                        } else {
                            $flag1 = true;
                        }
                    }

                    if ($flag1) {
                        $data = [
                            'movie' => $movieName,
                            'shows' => [
                                $hall => [
                                    [
                                        'showId' => $showId,
                                        'time' => $time
                                    ]
                                ]
                            ]
                        ];
                        array_push($formatedShows, $data);
                    }
                }
            }

            $this->rows = $formatedShows;
        
        } elseif ($this->action === 'getMovieByName') {
            $this->rows = mysqli_fetch_object($this->result);

            if (isset($this->rows->poster)) {
                $img_base64 = base64_encode(file_get_contents($this->rows->poster));
                $img = 'data:image/png'.';base64,'.$img_base64;
                $this->rows->poster = $img;
            }
        } elseif ($this->action === 'getMovies' || $this->action === 'getHalls' || $this->action === 'getShows') {
            $this->rows = [];
            while ($row = mysqli_fetch_assoc($this->result)) {
                array_push($this->rows, $row);
            };
            if ($this->table === 'movies') {
                foreach ($this->rows as &$movie) {
                    if (isset($movie['poster'])) {
                        $img_base64 = base64_encode(file_get_contents($movie['poster']));
                        $img = 'data:image/png'.';base64,'.$img_base64;
                        $movie['poster'] = $img;
                    }
                }
            }
        } else {
            $this->rows = mysqli_fetch_object($this->result);
        }
    }

    public function bindParams(): void
    {
        mysqli_stmt_bind_param($this->stmt, substr(gettype($this->param), 0, 1), $this->param);
    }
}