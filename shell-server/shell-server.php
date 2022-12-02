<?php
/*
 * Quick and dirty solution to have the Chrome extension launching and killing OBS
 * via micro local API when the call starts or ends.
 */

const CACHE_KEY = 'obs_pid';

$action = $_GET['action'] ?? "";

//phpinfo();
switch ($action) {
    case "startObs":
        echo "Starting OBS...<br>";
        cleanOldProcess();
        $pid = shell_exec(dirname(__FILE__) . "/start-obs");
        if ($pid == null) {
            echo "Failed to start<br>";
            exit(1);
        }
        echo "Started. Pid: $pid<br>";
        apcu_store(CACHE_KEY, $pid);
        break;

    case "killObs":
        $pid = fetchPid();
        if ($pid !== false) {
            killObs($pid);
        } else {
            echo "Killing OBS skipped: it was not started.<br>";
        }
        break;

    default:
        echo "Unknown action or not specified<br>";
        exit(1);
}

/**
 * @return void
 */
function cleanOldProcess(): void
{
    $oldPid = fetchPid();
    if ($oldPid !== false) {
        echo "OBS already running. Killing it and relaunching it...<br>";
        killObs($oldPid);
    }
}

function killObs(mixed $pid): void
{
    echo "Killing OBS...<br>";
    `kill -9 $pid`;
    echo "Killed.<br>";
    apcu_delete(CACHE_KEY);
}

/**
 * @return false|mixed
 */
function fetchPid(): mixed
{
    return apcu_fetch(CACHE_KEY);
}
