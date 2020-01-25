<?php

/**
 * Used to get various data from the given table
 */
class GetData extends BaseClass
{

    /**
     * Constructor of GetData
     * @param object $connect
     * @param string $table
     * @param string $action
     * @param string|null $param
     */
    public function __construct(string $action, string $table, object $connect, ?string $param) 
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

    /**
     * Gets data
     * @uses $this->connect()
     * @uses $this->setQuery()
     * @uses $this->onFail()
     * @uses $this->onSuccess()
     * @uses $this->stmt
     * @uses $this->query
     * @return void
     */
    public function get(): void
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
     * @uses $this->setOutput()
     * @uses $this->outputResult()
     * @return void
     */
    private function onSuccess(): void
    {
        if ($this->param) {
            $this->bindParams();
        }
        $this->execute();
        $this->setOutput();
        $this->outputResult();
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

    /**
     * Gets a result set from a prepared statement
     * @uses $this->stmt
     * @return void
     */
    private function getResult(): void
    {
        $this->result = mysqli_stmt_get_result($this->stmt); 
    }

    /**
     * Gets a result row
     * @uses $this->result
     * @return void
     */
    private function getRows(string $fetchAs): void
    {
        if ($fetchAs === 'object') {
            $this->rows = mysqli_fetch_object($this->result);
        } elseif ($fetchAs === 'array') {
            $this->rows = [];
            while ($row = mysqli_fetch_assoc($this->result)) {
                array_push($this->rows, $row);
            }
        } 
    }

    /**
     * Check if given hall open
     * @uses $this->stmt
     * @return string
     */
    private function checkIfHallOpen($hall): string
    {
        $checkQuery = "SELECT * FROM `halls` WHERE `hallName`=?";
        if (!mysqli_stmt_prepare($this->stmt, $checkQuery)) {
            $this->onFail();
        } else {
            mysqli_stmt_bind_param($this->stmt, substr(gettype($hall), 0, 1), $hall);
            mysqli_stmt_execute($this->stmt);
            $result = mysqli_stmt_get_result($this->stmt);
            $r = mysqli_fetch_object($result);
            return $r->isOpen;
        }
    }

    /**
     * Generates an associative array 
     * which contains subarrays filled with
     * movie name and shows
     * @uses $this->checkIfHallOpen()
     * @uses $this->rows
     * @return void
     */
    private function prepareShowsForResponse(): void
    {
        $shows = [];
        
        foreach ($this->rows as $show) {
            $showId = $show['showId'];
            $time = $show['time'];
            $movieName = $show['movieName'];
            $hall = $show['hall'];

            $isOpen = $this->checkIfHallOpen($hall);

            if ($isOpen === 'true') {
                if (count($shows) === 0) {
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
                    array_push($shows, $data);
                } else {
                    $flag1 = false;

                    foreach ($shows as &$nShow) {
                        if ($nShow['movieName'] === $movieName) {
                            $flag1 = false;
                            if (array_key_exists($hall, $nShow['shows'])) {
                                $flag2 = false;
        
                                foreach ($nShow['shows'][$hall] as $seance) {
                                    if ($seance['showId'] === $showId) {
                                        break;
                                    } else {
                                        $flag2 = true;
                                    }
                                }
        
                                if ($flag2) array_push($nShow['shows'][$hall], ['showId' => $showId, 'time' => $time]);
        
                            } else {
                                $nShow['shows'][$hall] = [
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
                        array_push($shows, $data);
                    }
                }
            }
            $this->rows = $shows;
        }
    }

    /**
     * Replaces poster relative url
     * with base64 encoded image
     * @uses $this->rows
     * @return void
     */
    private function prepareMovieForResponse(): void
    {
        if (isset($this->rows->poster)) {
            $img_base64 = base64_encode(file_get_contents(__DIR__ . $this->rows->poster));
            $img = 'data:image/png'.';base64,'.$img_base64;
            $this->rows->poster = $img;
        }
    }

    /**
     * Replaces poster relative urls
     * with base64 encoded images
     * @uses $this->rows
     * @return string
     */
    private function prepareMoviesForResponse()
    {
        if ($this->table === 'movies') {
            foreach ($this->rows as &$movie) {

                if (isset($movie['poster'])) {
                    $img_base64 = base64_encode(file_get_contents(__DIR__ . $movie['poster']));
                    $img = 'data:image/png'.';base64,'.$img_base64;
                    $movie['poster'] = $img;
                }
            }
        }
    }

    /**
     * Sets output
     * @uses $this->getResult()
     * @uses $this->getRows()
     * @uses $this->prepareShowsForResponse()
     * @uses $this->prepareMovieForResponse()
     * @uses $this->prepareMoviesForResponse()
     * @return void
     */
    private function setOutput(): void
    {
        $this->getResult();

        if ($this->action === 'getShowsByDate') {
            $this->getRows('array');
            $this->prepareShowsForResponse();
        } elseif ($this->action === 'getMovieByName') {
            $this->getRows('object');
            $this->prepareMovieForResponse(); 
        } elseif ($this->action === 'getMovies' || $this->action === 'getHalls' || $this->action === 'getShows') {
            $this->getRows('array');
            $this->prepareMoviesForResponse();
        } else {
            $this->getRows('object');
        }
    }

    /**
     * Prints result
     * @uses $this->rows
     * @return void
     */
    private function outputResult(): void
    {
        if ($this->rows || count($this->rows) > 0) {
            echo json_encode($this->rows);
        } else {
            echo json_encode([]);
        }
    }
}