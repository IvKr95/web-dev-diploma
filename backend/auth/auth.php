<?php

/**
 * Here all auth happens
 * The input file for loggin,
 * logout and current user fetching
 */

require_once '../config/http_headers.php';
require_once '../config/database.php';
require_once './autoload.php';

$postData = json_decode(file_get_contents('php://input'));
$action = $postData->action ?? $_GET['action'] ?? null;

if ($action) {
    if ($action === 'login') {
        
        $email = trim($postData->email);
        $password = trim($postData->password);
    
        if (empty($email) || empty($password)) {
            $badSqlResponse = ['success' => false, 'content' => 'Empty Fields, Fill In All Fields!'];
            echo json_encode($badSqlResponse);
        } else {
            
            $table = 'users';
            $target = 'uEmail';
            $newLogin = new Login($connect, $table, $target, $email, $password);
            $newLogin->login();
            unset($newLogin);
        }
    } elseif ($action === 'logout') {

        $userId = trim($postData->userId);
        $state = 0;

        $table = 'users';
        $target = 'isLoggedIn';
        $param = 'uuid';

        $newLogout = new Logout($connect, $table, $target, $param, $state, $userId);
        $newLogout->logout();
        unset($newLogout);

    } elseif ($action === 'fetch') {

        $param = 'admin@mail.ru';
        $table = 'users';
        $target = 'uEmail';
        
        $newFetch = new Fetch($connect, $table, $target, $param);
        $newFetch->fetch();
        unset($newFetch);

    } else {
        throw new Exception("Unknown Action");
    }
} else {
    throw new Exception("Action Not Passed");
}

exit();