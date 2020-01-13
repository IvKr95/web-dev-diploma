<?php

require_once __DIR__. '/../../phpqrcode/qrlib.php';

class AddData extends ClientBaseClass
{
    const UPLOADS_DIR = '../../orders_qrs';

    public function __construct($data, object $connect) 
    {
        $this->data = $data;
        $this->connect = $connect;
    }

    public function setQuery()
    {
        $this->query = "INSERT INTO `orders`(`orderId`, `date`, `hall`, `movieName`, `time`, `tickets`) VALUES (?, ?, ?, ?, ?, ?)";
    }

    public function add()
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

    public function onSuccess()
    {
        $this->bindParams();
        $this->execute();
        $this->generateQr();
    }

    public function bindParams()
    {
        mysqli_stmt_bind_param($this->stmt, 'ssssss', $this->data['orderId'], $this->data['date'], $this->data['hall'], $this->data['movieName'], $this->data['time'], $this->data['tickets']);
    }

    public function generateQr()
    {
        $id = $this->data['orderId'];
        $fileLocation = __DIR__ . "/../../orders_qrs/qr_$id.png";
        QRcode::png("qr_$id", $fileLocation);
        $this->result = file_get_contents($fileLocation);
        echo $this->result;
    }
}