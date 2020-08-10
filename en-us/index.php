<?php
    require "../lang/en.php";
    $file = file_get_contents('../php/html.php');
    $content = eval("?>$file");
    echo $content;
?>