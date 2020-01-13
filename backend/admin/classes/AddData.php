<?php

class AddData extends AdminBaseClass
{
    private $file;
    private $tmpfile;
    private $imageFileType;
    private $targetFile;

    const UPLOADS_DIR = '../posters/';
    const ADD_HALL_ACTION = 'addHall';
    const ADD_MOVIE_ACTION = 'addMovie';
    const ADD_SHOW_ACTION = 'addShowTime';

    public function __construct(object $data, object $connect, string $action, ?array $file) 
    {
        parent::__construct($connect, $action);
        $this->data = $data;
        
        if ($file) {
            $this->file = $file;
            if ($file['error'] === UPLOAD_ERR_OK) {
                $this->tmpfile = $file['tmp_name'];
                $this->targetFile = self::UPLOADS_DIR . basename($file['name']);
                $this->imageFileType = strtolower(pathinfo($this->targetFile, PATHINFO_EXTENSION));
            }
        }
    }

    public function setQuery(): void
    {
        if ($this->action === self::ADD_HALL_ACTION) {
            $this->query = "INSERT INTO `halls` (`hallId`, `hallName`) VALUES (?, ?)";
        } elseif ($this->action === self::ADD_MOVIE_ACTION) {
            $this->query = "INSERT INTO `movies` (`movieId`, `name`, `synopsis`, `duration`, `origin`, `poster`) VALUES (?, ?, ?, ?, ?, ?)";
        } elseif ($this->action === self::ADD_SHOW_ACTION) {
            $this->query = "INSERT INTO `shows`(`showId`, `date`, `hall`, `time`, `movie`, `hallMap`) VALUES (?,?,?,?,?,?)";
        } else {
            echo 'whoopsi';
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
            echo 'whoopsi';
        }
    }
}