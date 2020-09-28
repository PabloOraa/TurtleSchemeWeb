<html>
    <head>
        <script type="text/javascript">
            window.onload = () => {
                var userLang = navigator.language || navigator.userLanguage; 
                if(userLang == "es")
                    window.location.replace("./es-es/index.php");
                else if(userLang == "en")
                    window.location.replace("./en-us/index.php");
                else
                    window.location.replace("./es-es/index.php");
            }
        </script>
    </head>
    <body>
    </body>
</html>