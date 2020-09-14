let GoogleKey = "AIzaSyClx470vGZU-Th3z32kk6xniV9NSYvjiSg";
let GoodReadsKey = "NyUHBXWYMuGHygb7kdMlIg";
let results = [];
let media = [];
var cardInit = "<section class='container'><div class='row active-with-click'>";

var cardMiddle = "<div class='col-md-4 col-sm-6 col-xs-12'><article class='material-card Red'><h2><span>Título</span><strong><i class='fa fa-fw fa-star'></i>Autor/Autores</strong>" +
                 "</h2><div class='mc-content'><div class='img-container'><img class='img-responsive' src='http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg'>"+
                 "</div><div class='mc-description'>" + "Resumen</div></div><a class='mc-btn-action'><i class='fa fa-bars'></i></a><div class='mc-footer'></div></article></div>"
var cardEnd = "</div></section></body>";
const sectionInit = "<div class='collapsible'><h2 class='collapsible__label'>";
const sectionPostSource = "</h2><div class='collapsible__content'>";
const sectionEnd = "</div></div>";
const booksSource = ["Google","GoodReads"];
const musicSource = ["Deezer"];

async function performSearch()
{
    results = [];
    document.getElementById("errorMessage").className = "not-visible";
    let data = document.getElementById('SearchItem').value;
    let type = document.getElementById('type').value;
    let source;
    let res;
    data = data.split(' ').join('%20');
    switch(type)
    {
        case 'Books':
            res = await searchGoogle(data)
            if(res.totalItems != 0)
                results.push(res);
            res = await searchGoodReads(data);
            if(res.getElementsByTagName("total-results")[0].childNodes[0].nodeValue != 0)
                results.push(res);
            source = booksSource;
            break;
        case 'Music':
            res = await searchDeezer(data);
            if(res.total != 0)
                results.push(res);
            source = musicSource;
            break;
    }

    handleResult(results, source);
}

async function searchGoogle(text)
{
    let url = "https://www.googleapis.com/books/v1/volumes?q="+text+"&key="+GoogleKey;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status == 200)
            return data.items;
        else
            return null;
    });
}


async function searchGoodReads(text)
{
    let url = "https://www.goodreads.com/search/index.xml?q="+text+"&key=" + GoodReadsKey;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status == 200)
            return data;
        else
            return null;
    });
}

async function searchDeezer(text)
{
    let url = "https://api.deezer.com/search?q="+text;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status == 200)
            return data;
        else
            return null;
    });
}

function handleResult(results, sources)
{
    let parsed = [];   
    for(let result in results)
        if(results[result].contentType == "text/xml")
        {
            parsed.push((new XMLSerializer()).serializeToString(results[result]));
        }
        else
        {
            let res;
            if(sources == booksSource)
            {   
                res = results[result].items;

                for(let r in res)
                    media.push(new Media(res[r].id,res[r].volumeInfo.title,res[r].volumeInfo.authors));
            }
            else if(sources == musicSource)
            {
                res = results[result].data;

                for(let r in res)
                    media.push(new Media(res[r].id,res[r].title,res[r].artist.name));
            }
        }
    writeResult(media,sources);
}

function writeResult(content,sources)
{
    document.getElementById('resultMessage').className = "not-visible";
    if(results.length == 0)
        errorMessage();
    else
    {    
        document.getElementById('resultMessage').innerHTML = "";
        document.getElementById('resultMessage').className = "visible";
        for(let source in sources)
            createSection(content,sources[source]);
        sectionWork();
        cardWork();
    }
}

function createSection(content, source)
{
    let section = sectionInit + source + sectionPostSource;
    let cards;
    for(let indivContent in content)
        cards = createCard(content[indivContent], section);
    if(cards != null && cards != undefined)
    {   
        cards += sectionEnd;
        document.getElementById('resultMessage').innerHTML += cards;
    }
}

function createCard(content, previousHTML)
{
    if(content == null || content == undefined)
        return null;
    let sample;
    previousHTML += cardInit;
    
    for(let indivContent in content)
    {
        previousHTML += cardMiddle;
    }
    previousHTML += cardEnd;
    return previousHTML;
}


function errorMessage() 
{
    document.getElementById("errorMessage").className = "visible";
}

/*DZ.init({
    appId  : 'YOUR_APP_ID',
    channelUrl : 'http://YOUR_DOMAIN/channel.html'
});*/

//Collapsable menus for the Query from https://codepen.io/adalab/pen/NzOzQx?editors=1111w
function sectionWork()
{
    let collapsibleTriggers = document.querySelectorAll('.collapsible__label');
    for (let trigger = 0; trigger < collapsibleTriggers.length; trigger++) 
        collapsibleTriggers[trigger].addEventListener('click', updateCollapsibles);
}

function updateCollapsibles(e) 
{
    let parent = e.currentTarget.parentElement;
    
    if (parent.classList.contains('collapsible--visible')) 
        parent.classList.remove('collapsible--visible');  
    else 
    {
        closeAllCollapsibles();
        parent.classList.add('collapsible--visible');
    }
}
    
function closeAllCollapsibles() 
{
    let collapsibles = document.querySelectorAll('.collapsible');
    for (let i = 0; i < collapsibles.length; i++) 
        collapsibles[i].classList.remove('collapsible--visible');
}
