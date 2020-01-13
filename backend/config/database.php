<?php

$host = 'localhost';
$user = 'root';
$pwd = '';
$db = 'gotocinemaappdb';

$connect = mysqli_connect($host, $user, $pwd, $db);

if (!$connect) {
    die('Ошибка подключения к базе данных ' . mysqli_connect_error());
};

if (!$connect->set_charset("utf8")) {
    mysqli_set_charset($connect, 'utf8');
}