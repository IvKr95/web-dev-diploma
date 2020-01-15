<?php

require_once __DIR__. '/../phpqrcode/qrlib.php';

class AddData extends BaseClass
{
    private $file;
    private $tmpfile;
    private $imageFileType;
    private $targetFile;

    const POSTERS_UPLOAD_DIR = '../posters/';
    const ORDERS_UPLOAD_DIR = '../orders_qrs';
    const ADD_HALL_ACTION = 'addHall';
    const ADD_MOVIE_ACTION = 'addMovie';
    const ADD_SHOW_ACTION = 'addShowTime';

    public function __construct(string $action, string $table, object $data, object $connect, ?array $file) 
    {
        parent::__construct($connect, $action, $table);
        $this->data = $data;
        
        if ($file) {
            $this->file = $file;
            if ($file['error'] === UPLOAD_ERR_OK) {
                $this->tmpfile = $file['tmp_name'];
                $this->targetFile = self::POSTERS_UPLOAD_DIR . basename($file['name']);
                $this->imageFileType = strtolower(pathinfo($this->targetFile, PATHINFO_EXTENSION));
            }
        }
    }
    
    public function setQuery(): void
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

    public function add(): void
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
        if ($this->file) {
            move_uploaded_file($this->tmpfile, $this->targetFile);
        } else {
            $this->generateQr();
        }
    }

    public function bindParams(): void
    {
        if ($this->action === self::ADD_HALL_ACTION) {
            mysqli_stmt_bind_param($this->stmt, 'ss', $this->data->id, $this->data->name);
        } elseif ($this->action === self::ADD_MOVIE_ACTION) {
            mysqli_stmt_bind_param($this->stmt, 'ssssss', $this->data->id, $this->data->name, $this->data->synopsis, $this->data->duration, $this->data->origin, $this->targetFile);
        } elseif ($this->action === self::ADD_SHOW_ACTION) {
            mysqli_stmt_bind_param($this->stmt, 'ssssss', $this->data->id, $this->data->date, $this->data->hall, $this->data->startTime, $this->data->movie, $this->data->hallMap);
        } else {
            mysqli_stmt_bind_param($this->stmt, 'ssssss', $this->data->orderId, $this->data->date, $this->data->hall, $this->data->movieName, $this->data->time, $this->data->tickets);
        }
    }

    public function generateQr()
    {
        $id = $this->data->orderId;
        $fileLocation = __DIR__ . "/../orders_qrs/qr_$id.png";
        QRcode::png("qr_$id", $fileLocation);
        $this->result = file_get_contents($fileLocation);
        echo $this->result;
    }
}