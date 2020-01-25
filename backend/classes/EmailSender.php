<?php

class EmailSender 
{
    public static function send($mail, $template, $data, $config)
    {
        self::setServer($mail, $config);
        self::addAddresses($mail, $config);
        $template = self::addHTML($template, $data);
        self::addContent($mail, $config, $template);
        self::addImages($mail, $config);
        $mail->send();
    }

    private function addHTML($template, $data)
    {
        $template = str_replace(['{%TIME%}', '{%HALL_NAME%}', '{%MOVIE_NAME%}'], [$data->time, $data->hall, $data->movieName], $template);
        $tickets = json_decode($data->tickets);
        $seats = '';

        foreach ($tickets as $ticket) {
            $seats .= "Ряд: <span class=\"ticket__details ticket__chairs\" style=\"font-weight:700;\">$ticket->row</span>
            Место: <span class=\"ticket__details ticket__chairs\" style=\"font-weight:700;\">$ticket->seat</span>";
        }

        $template = str_replace('{%SEATS%}', $seats, $template);
        return $template;
    }

    private function addContent($mail, $config, $template)
    {
        // Content
        $mail->isHTML($config['html']);                                      // Set email format to HTML
        $mail->Subject = $config['subject'];
        $mail->Body = $template;
    }

    private function setServer($mail, $config)
    {
        //Server settings
        $mail->SMTPDebug = $config['debug'];                      // Enable verbose debug output
        $mail->isSMTP();                                          // Send using SMTP
        $mail->CharSet = $config['charset'];
        $mail->Host       = $config['host'];                      // Set the SMTP server to send through
        $mail->SMTPAuth   = $config['auth'];                      // Enable SMTP authentication
        $mail->Username   = $config['username'];                  // SMTP username
        $mail->Password   = $config['password'];                  // SMTP password
        $mail->SMTPSecure = $config['encryption'];                // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
        $mail->Port       = $config['port'];                      // TCP port to connect to
    }

    private function addAddresses($mail, $config)
    {
        //Recipients
        $mail->setFrom($config['from']['address'], $config['from']['name']); // Name is optional
        $mail->addAddress($config['to']['address'], $config['to']['name']);  // Add a recipient
    }

    private function addImages($mail, $config)
    {
        $mail->addEmbeddedImage(
            realpath($config['image']['fileLocation']), 
            $config['image']['cid'], 
            $config['image']['name'], 
            $config['image']['encoding'], 
            $config['image']['type']);
    }
}
