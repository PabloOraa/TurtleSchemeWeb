class cardHTML implements JsonSerializable
{
    private init = "<head>
                        <link rel='stylesheet/less' href='../css/cards.less' type='text/css' />
                        <script src='../javascript/less.js' ></script>
                        <script src='../javascript/cards.js'></script>
                        <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.12.1/css/all.css' crossorigin='anonymous'>
                    </head>
                    <body>
                        <section class='container'>
                            <div class='row active-with-click'>
                                <div class='col-md-4 col-sm-6 col-xs-12'>";
    private end =                   "</article>
                                </div>
                            </div>
                        </section>
                    </body>";

    public function jsonSerialize() 
    {  
        return ['init' => $this->init,'end' => $this->end];  
    }  
    
}
    
                    <article class='material-card Red'>
                        <h2>
                            <span>Autor/Autores</span>
                            <strong>
                                <i class='fa fa-fw fa-star'></i>
                                Título
                            </strong>
                        </h2>
                        <div class='mc-content'>
                            <div class='img-container'>
                                <img class='img-responsive' src='http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg'>
                            </div>
                            <div class='mc-description' id='summary'>
                                Resumen
                            </div>
                        </div>
                        <a class='mc-btn-action'>
                            <i class='fa fa-bars'></i>
                        </a>
                        <div class='mc-footer'>
                        </div>
