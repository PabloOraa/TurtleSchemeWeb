<?php
    $lang= array(
        "intro" => "Hola muy buenas, bienvenido a TurtleScheme en la web. Esta página servirá para obtener informaci&oacute;n de los diferentes productos de M&uacute;sica, libros, pel&iacute;culas y series de televisi&oacute;n.",
        "instructions" => "Para hacer uso de esta aplicaci&oacute;n web solo sera necesario que aplique pulse el bot&oacute;n de buscar e inserte el título que desee. A mayores, indique el tipo de contenido que desea.",
        "search" => "Buscar",
        "music" => "M&uacute;sica",
        "books" => "Libros",
        "movies" => "Películas",
        "series" => "Series",
        "createdby" => "Creado por",
        "error" => "No se han encontrado datos para la b&uacute;squeda solicitada. Pruebe con otro título o autor a buscar",
        "buy" => "Comprar",
        "seeonweb" => "Ver on la web",
        "preview" => "Vista previa",
        "noDescription" => "Actualmente no disponemos de una descripci&oacute;n para este producto",
        "cardColor" => "Color de las tarjetas",
        "red" => "Rojo",
        "pink" => "Rosa",
        "purple" => "Morado",
        "deepPurple" => "Morado oscuro",
        "indigo" => "Indigo",
        "blue" => "Azul",
        "lightBlue" => "Azul claro",
        "cyan" => "Cyan",
        "teal" => "Verde azulado",
        "green" => "Verde",
        "lightGreen" => "Verde claro",
        "lime" => "Lima",
        "yellow" => "Amarillo",
        "amber" => "Ambar",
        "orange" => "Naranja",
        "deepOrange" => "Naranja oscuro",
        "brown" => "Marrón",
        "grey" => "Gris",
        "blueGrey" => "Gris Azulado"
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