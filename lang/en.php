<?php
    $lang= array(
        "intro" => "Hi and welcome to TurtleScheme. This app/web born with the idea to offer all people an easy way to store and search their next favourite show, film, song or book.",
        "instructions" => "To use this webapp, you only need to touch the button to search and type the title of your desire. Optionally you can choose type of the content you want.",
        "search" => "Search",
        "music" => "Music",
        "books" => "Books",
        "movies" => "Movies",
        "series" => "Series",
        "createdby" => "Created by",
        "error" => "Error",
        "buy" => "Buy",
        "seeonweb" => "View on the web",
        "preview" => "Preview",
        "noDescription" => "There is no description for this product.",
        "cardColor" => "Card Color",
        "red" => "Red",
        "pink" => "Pink",
        "purple" => "Purple",
        "deepPurple" => "Deep purple",
        "indigo" => "Indigo",
        "blue" => "Blue",
        "lightBlue" => "Light blue",
        "cyan" => "Cyan",
        "teal" => "Teal",
        "green" => "Green",
        "lightGreen" => "Light green",
        "lime" => "Lime",
        "yellow" => "Yellow",
        "amber" => "Amber",
        "orange" => "Orange",
        "deepOrange" => "Deep orange",
        "brown" => "brown",
        "grey" => "grey",
        "blueGrey" => "Blue grey"
    );

    if (!function_exists('getData'))
    {
        function getData()
        {
            global $lang;
            return $lang;
        }
    }
?>