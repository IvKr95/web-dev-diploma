<?php

/**
 * The main file where all requests are processed
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once './vendor/autoload.php';
require_once './config/http_headers.php';
require_once './config/database.php';
require_once './autoload.php';

$method = $_SERVER['REQUEST_METHOD'];
$payload = json_decode(file_get_contents('php://input'));

if ($method === 'GET') {

    $action = $_GET['action'] ?? '';
    $table = $_GET['table'] ?? '';
    $param = $_GET['param'] ?? '';
    
    $obj = new GetData($action, $table, $connect, $param);
    $obj->get();
        
} elseif ($method === 'POST') {

    $action = $_POST['action'] ?? $payload->action;
    $data = $_POST['data'] ?? $payload->data;
    $data = json_decode($data);

    if ($action === 'addEmail') {
        $mail = new PHPMailer(true);
    
        $id = $data->orderId;
        $to = $data->email;
        $fileLocation = "./orders_qrs/qr_$id.png";
        $template = file_get_contents('./mailPage.php');

        try {
            EmailSender::send($mail, $template, $data, [
                'debug' => SMTP::DEBUG_SERVER,
                'charset' => 'UTF-8',
                'host' => 'smtp.mail.ru',
                'auth' => true,
                'username' => 'idemvkino.prilozheniye@mail.ru',
                'password' => 'OKeTtYui72y*',
                'encryption' => PHPMailer::ENCRYPTION_STARTTLS,
                'port' => 587,
                'from' => [
                    'address' => 'idemvkino.prilozheniye@mail.ru',
                    'name' => 'ИдемВКино'
                ],
                'to' => [
                    'address' => $to,
                    'name' => 'Покупателю Билета В Кино'
                ],
                'subject' => 'Ваш билет На Сеанс!',
                'html' => true,
                'image' => [
                    'fileLocation' => $fileLocation,
                    'cid' => 'qr',
                    'name' => "qr_$id.png",
                    'encoding' => 'base64',
                    'type' => 'image/png',
                ]
            ]);
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        unset($mail);
    } else {

        $table = $_POST['table'] ?? $payload->table;
        $file = $_FILES['poster'] ?? null;

        if ($action === 'addOrder') {
            header("Content-Type: image/png");
        }

        $obj = new AddData($action, $table, $data, $connect, $file);
        $obj->add();
    }

} elseif ($method === 'PUT') {
    
    $path = explode('/', $_SERVER['PATH_INFO']);
    $param = end($path);

    $action = $payload->action;
    $table = $payload->table;
    $data = $payload->data;

    $obj = new UpdateData($connect, $action, $table, $data, $param);
    $obj->update();
} elseif ($method === 'DELETE') {

    $action = $_GET['action'];
    $table = $_GET['table'];
    $param = $_GET['target'];

    $obj = new DeleteData($connect, $action, $table, $param);
    $obj->delete();
   
}

unset($obj);
exit();
