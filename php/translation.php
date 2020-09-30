<?php
    $langu = "es";
    if(isset($_GET['lang']))
        $langu = $_GET['lang'];
    
    if($langu == "es")
        require "../lang/es.php";
    else
        require "../lang/en.php";
    print(json_encode($lang));
?>