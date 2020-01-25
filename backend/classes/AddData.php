<?php

require_once __DIR__. '/../phpqrcode/qrlib.php';

/**
 * Used to add various data to the given table
 */
class AddData extends BaseClass
{
    /**
     * @var string $tmpfile A temporary location of a passed file
     * @var string $destFile A desirable location of a passed file
     */
    private $tmpfile;
    private $destFile;

    const POSTERS_UPLOAD_DIR = '/../posters/';
    const ORDERS_UPLOAD_DIR =  '/../orders_qrs';
    const ADD_HALL_ACTION = 'addHall';
    const ADD_MOVIE_ACTION = 'addMovie';
    const ADD_SHOW_ACTION = 'addShowTime';

    /**
     * Constructor of AddData
     * @param object $connect
     * @param string $table
     * @param string $action
     * @param object $data
     * @param array|null $file
     */
    public function __construct(string $action, string $table, object $data, object $connect, ?array $file) 
    {
        parent::__construct($connect, $action, $table);
        $this->data = $data;
        
        if ($file) {
            if ($file['error'] === UPLOAD_ERR_OK) {
                $this->tmpfile = $file['tmp_name'];
                $this->destFile = self::POSTERS_UPLOAD_DIR . basename($file['name']);
            }
        }
    }
    
    /**
     * Prepares a Query
     * @uses $this->table
     * @uses $this->action
     * @return void
     */
    private function setQuery(): void
    {
        if ($this->action === self::ADD_HALL_ACTION) {
            $this->query = "INSERT INTO " . $this->table . "(`hallId`, `hallName`) VALUES (?, ?)";
        } elseif ($this->action === self::ADD_MOVIE_ACTION) {
            $this->query = "INSERT INTO " . $this->table . "(`movieId`, `name`, `synopsis`, `duration`, `origin`, `poster`) VALUES (?, ?, ?, ?, ?, ?)";
        } elseif ($this->action === self::ADD_SHOW_ACTION) {
            $this->query = "INSERT INTO " . $this->table . "(`showId`, `date`, `hall`, `time`, `movieName`, `hallMap`) VALUES (?, ?, ?, ?, ?, ?)";
        } else {
            $this->query = "INSERT INTO " . $this->table . "(`orderId`, `date`, `hall`, `movieName`, `time`, `tickets`) VALUES (?, ?, ?, ?, ?, ?)";
        }
    }

    /**
     * Adds data to the given table
     * @uses $this->connect()
     * @uses $this->setQuery()
     * @uses $this->onFail()
     * @uses $this->onSuccess()
     * @uses $this->stmt
     * @uses $this->query
     * @return void
     */
    public function add(): void
    {
        $this->connect();
        $this->setQuery();
        if (!mysqli_stmt_prepare($this->stmt, $this->query)) {
            $this->onFail();
        } else {
            $this->onSuccess();
        }
    }

    /**
     * Fires on successful SQL statement execution
     * @uses $this->bindParams()
     * @uses $this->execute()
     * @uses $this->tmpfile
     * @uses $this->destFile
     * @uses $this->generateQr()
     * @return void
     */
    private function onSuccess(): void
    {
        $this->bindParams();
        $this->execute();
        if ($this->tmpfile) {
            move_uploaded_file($this->tmpfile, __DIR__ . $this->destFile);
        } else {
            $this->generateQr();
        }
    }

    /**
     * Binds params to a prepared statement 
     * @uses $this->stmt
     * @uses $this->action
     * @uses $this->data
     * @uses $this->destFile
     * @return void
     */
    private function bindParams(): void
    {
        if ($this->action === self::ADD_HALL_ACTION) {
            mysqli_stmt_bind_param($this->stmt, 'ss', $this->data->id, $this->data->name);
        } elseif ($this->action === self::ADD_MOVIE_ACTION) {
            mysqli_stmt_bind_param($this->stmt, 'ssssss', $this->data->id, $this->data->name, $this->data->synopsis, $this->data->duration, $this->data->origin, $this->destFile);
        } elseif ($this->action === self::ADD_SHOW_ACTION) {
            mysqli_stmt_bind_param($this->stmt, 'ssssss', $this->data->id, $this->data->date, $this->data->hall, $this->data->startTime, $this->data->movie, $this->data->hallMap);
        } else {
            mysqli_stmt_bind_param($this->stmt, 'ssssss', $this->data->orderId, $this->data->date, $this->data->hall, $this->data->movieName, $this->data->time, $this->data->tickets);
        }
    }

    /**
     * Generates QRcode
     * @uses $this->data
     * @uses self::ORDERS_UPLOAD_DIR
     * @return void
     */
    private function generateQr()
    {
        $id = $this->data->orderId;
        $fileLocation = __DIR__ . self::ORDERS_UPLOAD_DIR . "/qr_$id.png";
        QRcode::png("qr_$id", $fileLocation);
        $this->result = file_get_contents($fileLocation);
        echo $this->result;
    }
}