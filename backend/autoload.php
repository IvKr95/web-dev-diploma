<?php

/**
 * Used to autoload the classes from a
 * given directory
 */

spl_autoload_register(function ($className) {
    require_once 'classes/' . $className . '.php';;
});