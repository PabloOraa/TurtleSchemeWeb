<!DOCTYPE html>
<html lang="es" min-height="100%">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TurtleScheme</title>
        <!--CSS-->
        <link rel="stylesheet" href="../css/style.css">
        <!--JS-->
        <script src="../javascript/Media.js"></script>
        <script src='../javascript/cards.js'></script>
        <script src="../javascript/script.js"></script>

        <!--Scripts from https://github.com/pwa-builder/pwa-install -->
        <script type="module" src="https://cdn.jsdelivr.net/npm/@pwabuilder/pwainstall@latest/dist/pwa-install.min.js"></script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@pwabuilder/pwaauth@latest/dist/pwa-auth.min.js"></script>

        <!--Meta and link obtained from https://tomitm.github.io/appmanifest/ to get de manifest and create the PWA following instructions at https://github.com/pwa-builder/pwa-install -->
        <link rel="manifest" href="manifest.json">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="application-name" content="TurtleScheme">
        <meta name="apple-mobile-web-app-title" content="TurtleScheme">
        <meta name="msapplication-starturl" content="/">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!--Bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha384-ZvpUoO/+PpLXR1lu4jmpXWu80pZlYUAfxl5NsBMWOEPSjUn/6Z/hRTt8+pR6L4N2" crossorigin="anonymous"></script>        
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    
        <!-- Deezer --> 
        <script src="https://cdns-files.dzcdn.net/js/min/dz.js"></script>

        <!--Cards-->
        <link rel='stylesheet/less' href='../css/cards.less' type='text/css' />
        <script src='../javascript/less.js' ></script>
        <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.12.1/css/all.css' crossorigin='anonymous'>
    </head>
    <body class="d-flex flex-column h-100">
        <main role="main" class="flex-shrink-0 container">
            <p><?php echo $lang["intro"];?></p>
            <p><?php echo $lang["instructions"];?></p>
            <pwa-install>Install</pwa-install>


            <form class="form-inline mt-2 mt-md-0" action="JavaScript:performSearch()">
                <input class="form-control mr-sm-2" id="SearchItem" type="text" placeholder="<?php echo $lang["search"];?>" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    </svg>
                </button>
            
                <select class="left-space-10" title="Type" id="type">
                    <option name="Music" value="Music" label="<?php echo $lang["music"];?>"></option>
                    <option name="Books" value="Books" label="<?php echo $lang["books"];?>" selected></option>
                </select>
            </form>

            <div id="results" class="mt-3">
                <p class="not-visible" id="errorMessage"><?php echo $lang["error"]?></p>
                <div class="not-visible" id="resultMessage">

                </div>
            </div>
        </main>
    </body>
    <footer class="footer mt-auto py-3">
        <div class="container"><?php echo $lang["createdby"];?> Pablo Oraa L&oacute;pez</div>
    </footer>
</html>