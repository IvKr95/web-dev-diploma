<?php

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

    $action = $payload->action;
    $table = $payload->table;
    $data = json_decode($payload->data);
    $file = $_FILES['poster'] ?? null;

    if ($action === 'addOrder') {
        header("Content-Type: image/png");
    }

    $obj = new AddData($action, $table, $data, $connect, $file);
    $obj->add();

    if ($action === 'addOrder') {
        $mail = new PHPMailer(true);
    
        $id = $data->orderId;
        $fileLocation = "../orders_qrs/qr_$id.png";
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->CharSet = 'UTF-8';
            $mail->Host       = 'smtp.mail.ru';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'idemvkino.prilozheniye@mail.ru';                 // SMTP username
            $mail->Password   = 'AAoPT2osra4_';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
            $mail->Port       = 587;                                    // TCP port to connect to
    
            //Recipients
            $mail->setFrom('idemvkino.prilozheniye@mail.ru', 'ИдемВКино'); // Name is optional
            $mail->addAddress('cold67@mail.ru', 'Покупателю Билета В Кино');     // Add a recipient
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Ваш билет На Сеанс!';
    
            $html = file_get_contents('../mailPage.php');
            $html = str_replace('{%TIME%}', $data->time, $html);
            $html = str_replace('{%HALL_NAME%}', $data->hall, $html);
            $html = str_replace('{%MOVIE_NAME%}', $data->movieName, $html);
            $tickets = json_decode($data->tickets);
            $seats = '';
    
            foreach ($tickets as $key) {
                $seats .= "Ряд: <span class=\"ticket__details ticket__chairs\" style=\"font-weight:700;\">$key->row</span>
                Место: <span class=\"ticket__details ticket__chairs\" style=\"font-weight:700;\">$key->seat</span>";
            }
    
            $html = str_replace('{%SEATS%}', $seats, $html);
    
            $mail->Body = $html;
    
            $mail->addEmbeddedImage(realpath($fileLocation), 'qr', "qr_$id.png", 'base64', 'image/png');
            $mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        } 
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
