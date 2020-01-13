<?php

require_once '../config/http_headers.php';
require_once './autoload.php';
require_once '../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    
    $action = $_POST['action'];
    unset($_POST['action']);
    $data = json_decode($_POST['data']);
    $file = $_FILES['poster'] ?? null;
    
    $obj = new AddData($data, $connect, $action, $file);
    $obj->add();

} elseif ($method === 'DELETE') {

    $target = $_GET['target'];
    $action = $_GET['action'];

    $obj = new DeleteData($target, $connect, $action);
    $obj->delete();
   
} elseif ($method === 'GET') {

    $table = $_GET['table'];
    $param = $_GET['date'] ?? null;

    $obj = new GetData($table, $connect, $param);
    $obj->get();

} elseif ($method === 'PUT') {
    $payload = json_decode(file_get_contents('php://input'));
    $path = explode('/', $_SERVER['PATH_INFO']);
    $target = end($path);
    $action = $payload->action;
    $data = $payload->data;

    $obj = new UpdateData($connect, $action, $data, $target);
    $obj->update();
}

unset($obj);
exit();