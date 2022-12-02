<?php
/*
 * Quick and dirty solution to have the Chrome extension launching and killing OBS
 * via micro local API when the call starts or ends.
 */

$action = $_GET['action'] ?? "";

$dirName = dirname(__FILE__);

//phpinfo();
switch ($action) {

    case "start-cam-kit":
        echo "<pre>" . shell_exec("${dirName}/start-cam-kit") . "</pre>";
        break;

    case "stop-cam-kit":
        echo "<pre>" . shell_exec("${dirName}/stop-cam-kit") . "</pre>";
        break;

    default:
        echo "Unknown action or not specified<br>";
        exit(1);
}