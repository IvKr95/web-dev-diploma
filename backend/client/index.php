<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once '../vendor/autoload.php';
require_once '../config/http_headers.php';
require_once '../config/database.php';
require_once './autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $action = $_GET['action'] ?? '';
    $target = $_GET['table'] ?? '';
    $param = $_GET['param'] ?? '';
    
    $obj = new GetData($action, $target, $connect, $param);
    $obj->get();
        
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Content-Type: image/png");
    $payload = $_POST;
    
    $obj = new AddData($payload, $connect);
    $result = $obj->add();

    $mail = new PHPMailer(true);
    
    $id = $payload['orderId'];
    $fileLocation = "../orders_qrs/qr_$id.png";
    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->CharSet = 'UTF-8';
        $mail->Host       = 'smtp.mail.ru';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'idemvkino.prilozheniye@mail.ru';                 // SMTP username
        $mail->Password   = 'QygfdkHfds_&438hjf';                               // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
        $mail->Port       = 587;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom('idemvkino.prilozheniye@mail.ru', 'ИдемВКино'); // Name is optional
        $mail->addAddress('cold67@mail.ru', 'Покупателю Билета В Кино');     // Add a recipient
        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Ваш билет На Сеанс!';

        $html = file_get_contents('../mailPage.php');
        $html = str_replace('{%TIME%}', $payload['time'], $html);
        $html = str_replace('{%HALL_NAME%}', $payload['hall'], $html);
        $html = str_replace('{%MOVIE_NAME%}', $payload['movieName'], $html);
        $tickets = json_decode($payload['tickets']);
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
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $path = explode('/', $_SERVER['PATH_INFO']);
    $target = end($path);
    $payload = json_decode(file_get_contents('php://input'));

    $data = $payload->hall;
    $action = 'updateHall';

    $obj = new UpdateData($connect, $action, $data, $target);
    $obj->update();
}

unset($obj);
exit();
