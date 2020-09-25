let GoogleKey = "AIzaSyClx470vGZU-Th3z32kk6xniV9NSYvjiSg";
let GoodReadsKey = "NyUHBXWYMuGHygb7kdMlIg";
let SpotifyToken = "";
let LastFMAPIKey = "40a0d7ad1498eeada629d92f48bcc6ae";
let LastFMAPIKeySecret = "7f22785605b38cd7ea0ab9e1c540cf5e";
let results = [];
let media = new Map();
var cardInit = "<section class='container'><div class='row active-with-click'>";
var cardPreTitle = "<div class='col-md-4 col-sm-6 col-xs-12'><article class='material-card Red'><h2><span>";
var cardPostTitlePreAuthor = "</span><strong><i class='fa fa-fw fa-star'></i>";
var cardPostAuthorPreImage = "</strong></h2><div class='mc-content'><div class='img-container'><img class='img-responsive' src='";
var cardPostImagePreResume = "'></div><div class='mc-description'>";
var cardPostResumePreFooter = "</div></div><a class='mc-btn-action'><i class='fa fa-bars'></i></a><div class='mc-footer'>";
var cardPostFooter = "</div></article></div>"
var cardEnd = "</div></section>";
const sectionInit = "<div class='collapsible'><h2 class='collapsible__label'>";
const sectionPostSource = "</h2><div class='collapsible__content'>";
const sectionEnd = "</div></div>";
const booksSource = ["Google","GoodReads"];
const musicSource = ["Deezer", "LastFM"];

/*window.onload = () => s
{   //&code="+code+"
    let url = "https://accounts.spotify.com/api/token?grant_type=authorization_code&client_secret=f6d7eb3833fe49798fdfac92a4f7cdf1&client_id=1c77ad14a10147938dfc54a3a269a406";
    console.log("Method");
    $.ajax(url).done((result) =>{console.log(result);});
}*/

function addToMap(map, source, total)
{
    map.set(source,total);
    return map;
}

async function performSearch()
{
    results = new Map();
    document.getElementById("errorMessage").className = "not-visible";
    let data = document.getElementById('SearchItem').value;
    let type = document.getElementById('type').value;
    let res;
    let source;
    data = data.split(' ').join('%20');
    switch(type)
    {
        case 'Books':
            res = await searchGoogle(data);
            source = booksSource;
            if(res.totalItems != 0)
                addToMap(results,booksSource[0],res);
            res = await searchGoodReads(data);
            if(res.getElementsByTagName("total-results")[0].childNodes[0].nodeValue != 0)
                addToMap(results,booksSource[1],res);
            break;
        case 'Music':
            source = musicSource;
            res = await searchDeezer(data);
            if(res.total != 0)
                addToMap(results,musicSource[0],res);
            res = await searchLastFM(data);
            if(res.results.albummatches.album.length != 0)
                addToMap(results,musicSource[1],res);
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

async function searchSpotify(text)
{
    /*let url = "https://api.spotify.com/v1/search?q="+text;
    return await $.ajax({url = url,headers: { Authorization: 'Bearer ${token}' }},"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status == 200)
            return data;
        else
            return null;
    });*/
}

async function searchLastFM(text)
{
    let url = "http://ws.audioscrobbler.com/2.0/?method=album.search&album="+text+"&api_key="+LastFMAPIKey+"&format=json";
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
    let i = 0;
    let parsed = []; 
    let keyOut;  
    try
    {
        results.forEach((value, key) =>
        {
            parsed = [];
            keyOut = key;
            if(value.contentType == "text/xml")
            {
                parsed.push((new XMLSerializer()).serializeToString(value));
                i++;
            }
            else
            {
                let res;
                if(sources == booksSource)
                {   
                    res = value.items;

                    for(let r in res)
                        if(res[r].volumeInfo.imageLinks != undefined)
                            parsed.push(new Media(
                                                res[r].id,
                                                res[r].volumeInfo.title,
                                                res[r].volumeInfo.authors, 
                                                res[r].volumeInfo.description,
                                                res[r].volumeInfo.imageLinks.thumbnail,
                                                res[r].volumeInfo.infoLink, res[r].volumeInfo.previewLink));
                }
                else if(sources == musicSource)
                {
                    switch(i)
                    {
                        case 0: //Deezer
                            res = value.data;
                            for(let r in res)
                                parsed.push(new Media(res[r].id,res[r].title,res[r].artist.name, 'Test',res[r].album.cover_big, res[r].link,res[r].preview));
                            break;
                        case 1: //LastFM
                            res = value.results.albummatches.album;
                            for(let album in res)
                                parsed.push(new Media(res[album].mbid, res[album].name,res[album].artist, 'Test', res[album].image[res[album].image.length-1]["#text"], res[album].url, null))
                    }
                }
                addToMap(media,keyOut,parsed);
                i++;
            }
        });
       
        writeResult(media);
    }
    catch(Exception)
    {
        console.log(Exception);
        errorMessage();
    }
}

function writeResult(content)
{
    document.getElementById('resultMessage').className = "not-visible";
    if(results.length == 0)
        errorMessage();
    else
    {    
        document.getElementById('resultMessage').innerHTML = "";
        document.getElementById('resultMessage').className = "visible";
        content.forEach((value,key) => createSection(value,key));
        sectionWork();
        cardWork();
    }
}

function createSection(content, source)
{
    let section = sectionInit + source + sectionPostSource;
    let cards = cardInit;
    content.forEach((value) => cards = createCard(value, cards));
    if(cards != null && cards != undefined)
    {   
        cards += cardEnd;
        section += cards;
        section += sectionEnd;
        document.getElementById('resultMessage').innerHTML += section;
    }
}

function createCard(content, previousHTML)
{
    if(content == null || content == undefined)
        return null;
    previousHTML = createContentCard(content, previousHTML);
    return previousHTML;
}

function createContentCard(content, previousHTML)
{
    previousHTML += cardPreTitle;
    if(content.getTitle().length > 26) previousHTML += "<font size=3>"+content.getTitle()+"</font>"; else previousHTML += content.getTitle();
    previousHTML += cardPostTitlePreAuthor;
    if(content.author.length > 26) previousHTML += "<font size=3>"+content.author+"</font>"; else previousHTML += content.author;
    previousHTML += cardPostAuthorPreImage;
    previousHTML += content.image;
    previousHTML += cardPostImagePreResume;
    if(content.description != "Test") previousHTML += '<span class=scroll>' + content.description + '</span>';
    previousHTML += cardPostResumePreFooter;
    previousHTML += '<a href="' + content.link + '" class="shopping-preview-left"><i class="fa fa-shopping-cart" color="black" aria-hidden="true" title="Comprar"></i></a>';
    if(content.previewLink != null)previousHTML += '<a href="' + content.previewLink + '" class="shopping-preview-right"><i class="fa fa-eye" title="Vista Previa"></i></a>';
    previousHTML += cardPostFooter;
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
