let GoogleKey = "AIzaSyClx470vGZU-Th3z32kk6xniV9NSYvjiSg";
let GoodReadsKey = "NyUHBXWYMuGHygb7kdMlIg";
let results = [];
let media = [];
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
const musicSource = ["Deezer"];

let tempImage = 'http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg';

async function performSearch()
{
    results = [];
    media = [];
    document.getElementById("errorMessage").className = "not-visible";
    let data = document.getElementById('SearchItem').value;
    let type = document.getElementById('type').value;
    let res;
    let sourceMap = new Map();
    data = data.split(' ').join('%20');
    switch(type)
    {
        case 'Books':
            res = await searchGoogle(data)
            if(res.totalItems != 0)
            {
                results.push(res);
                sourceMap = addSource(sourceMap, booksSource[0], res.totalItems);
            }
            res = await searchGoodReads(data);
            if(res.getElementsByTagName("total-results")[0].childNodes[0].nodeValue != 0)
            {
                results.push(res);
                sourceMap = addSource(sourceMap, booksSource[1],res.getElementsByTagName("total-results")[0].childNodes[0].nodeValue);
            }
            break;
        case 'Music':
            res = await searchDeezer(data);
            if(res.total != 0)
            {
                results.push(res);
                sourceMap = addSource(sourceMap,musicSource[0],res.total);
            }
            break;
    }
    handleResult(results, sourceMap);
}

function addSource(map, source, total)
{
    map.set(source,total);
    return map;
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
            if(sources.has(booksSource[0]))
            {   
                res = results[result].items;

                for(let r in res)
                    media.push(new Media(res[r].id,res[r].volumeInfo.title,res[r].volumeInfo.authors, res[r].volumeInfo.description, res[r].volumeInfo.imageLinks.thumbnail, res[r].volumeInfo.infoLink, res[r].volumeInfo.previewLink));
            }
            else if(sources.has(musicSource[0]))
            {
                res = results[result].data;

                for(let r in res)
                    media.push(new Media(res[r].id,res[r].title,res[r].artist.name, 'Test',res[r].album.cover_big, res[r].link,res[r].preview));
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
        sources.forEach(function(value, key, map){createSection(content,key, value)});
        sectionWork();
        cardWork();
    }
}

function createSection(content, source, maxItem)
{
    if(content.length < maxItem) maxItem = content.length;
    let section = sectionInit + source + sectionPostSource;
    let cards = cardInit;
    for(let i = 0; i < maxItem; i++ )
        cards = createCard(content[i], cards);
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
    previousHTML += content.title;
    previousHTML += cardPostTitlePreAuthor;
    previousHTML += content.author;
    previousHTML += cardPostAuthorPreImage;
    previousHTML += content.image;
    previousHTML += cardPostImagePreResume;
    previousHTML += '<span class=scroll>' + content.description + '</span>';
    previousHTML += cardPostResumePreFooter;
    previousHTML += '<a href=' + content.link + '><p>Ver en la tienda</p></a>';
    previousHTML += '<a href=' + content.previewLink + '>Vista previa</a>';
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
