<?php

$pdf = __DIR__ ."/mycin.pdf" ;
$result = shell_exec("node ocr_main.js pdf=".$pdf); 

echo   $result ;
?>