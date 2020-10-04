<?php
    $url = "";
    $key = "";
    $parameter = "";
    $source = "";
    if(isset($_GET['source']))
    {
        $source = $_GET['source'];
    }
    if(isset($_GET['key']))
    {
        $key = $_GET['key'];
    }
    if(isset($_GET['param']))
    {
        $param = $_GET['param'];
    }
    
    if($source == "GoodReads")
    {
        $url = "https://www.goodreads.com/search.xml" . "?key=" . urlencode($key) . "&q=" . urlencode($param);
    }
    else 
    {
        $url = "https://api.deezer.com/search" . "?q=" .urlencode($param);
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Set curl to return the data instead of printing it to the browser.
    curl_setopt($ch, CURLOPT_URL, $url);
    $data = curl_exec($ch);
    curl_close($ch);

    echo $data;
?>