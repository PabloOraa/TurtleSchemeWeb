let results;
let media;
var cardInit = "<section class='container'><div class='row active-with-click'>";
var cardPreTitle = "<div class='col-md-4 col-sm-6 col-xs-12'><article class='material-card Red'><h2><span>";
var cardPostTitlePreAuthor = "</span>";
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
const moviesSource = ["OMBd"];
const seriesSource = ["OMBd"];

function addToMap(map, source, total)
{
    map.set(source,total);
    return map;
}

async function performSearch()
{
    results = new Map();
    media = new Map();
    document.getElementById("errorMessage").className = "not-visible";
    document.getElementById("resultMessage").innerHTML = "";
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
        case 'Movies':
            source = moviesSource;
            res = await searchOMBd(data,'movie');
            await getDetail(res, 'movie');
            break;
        case 'Series':
            source = seriesSource;
            res = await searchOMBd(data,'series');
            await getDetail(res, 'series');
            break;
    }
    handleResult(results, source);
}

async function getDetail(data, type)
{
    let res = [];
    for(let media in data.Search)
        res.push(await getDetails(data.Search[media].Title, type));
    if(res.length != 0)
        addToMap(results,moviesSource[0],res);
}

function handleResult(results, sources)
{
    let i = 0;
    let parsed = []; 
    try
    {
        if(results.size == 0)
            errorMessage();
        results.forEach((value, key) => 
        {
            parsed = [];
            if(value.contentType == "text/xml")
            {
                parsed.push((new XMLSerializer()).serializeToString(value));
                i++;
                addToMap(media,key,parsed);
            }
            else
            {
                let res;
                if(sources == booksSource)
                {   
                    res = value.items;

                    for(let r in res)
                        if(res[r].volumeInfo.imageLinks != undefined)
                            parsed.push(new Media(res[r].id,res[r].volumeInfo.title,res[r].volumeInfo.authors, res[r].volumeInfo.description,res[r].volumeInfo.imageLinks.thumbnail,res[r].volumeInfo.infoLink, res[r].volumeInfo.previewLink,null,null));
                }
                else if(sources == musicSource)
                {
                    switch(key)
                    {
                        case 'Deezer': //Deezer
                            res = value.data;
                            for(let r in res)
                                if(res[r].album.cover_big != undefined)
                                    parsed.push(new Media(res[r].id,res[r].title,res[r].artist.name, null,res[r].album.cover_big, res[r].link,res[r].preview,null,null));
                            break;
                        case 'LastFM': //LastFM
                            res = value.results.albummatches.album;
                            for(let album in res)
                                if(res[album].image[res[album].image.length-1]["#text"] != "")
                                    parsed.push(new Media(res[album].mbid, res[album].name,res[album].artist, null, res[album].image[res[album].image.length-1]["#text"], res[album].url, null,null,null))
                    }
                }
                else if(sources == moviesSource)
                {
                    res = value;
                    for(let r in res)
                        if(res[r].Poster != "N/A")
                            parsed.push(new Media(res[r].imbdID,res[r].Title,(res[r].Director != "N/A" ? res[r].Director : res[r].Actors.split(",")[0]) + '-' + res[r].Genre.split(',')[0], res[r].Plot,res[r].Poster,null,null,res[r].Year,res[r].Runtime));
                }
                else if(sources == seriesSource)
                {
                    res = value;
                    for(let r in res)
                        if(res[r].Poster != "N/A")
                            parsed.push(new Media(res[r].imbdID,res[r].Title,(res[r].Director != "N/A" ? res[r].Director : res[r].Actors.split(",")[0]) + '-' + res[r].Genre.split(',')[0], res[r].Plot,res[r].Poster,null,null,res[r].Year,res[r].Runtime));
                }
                addToMap(media,key,parsed);
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
    if(content.size == 0)
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
    if(content instanceof Media)
    {
        previousHTML += cardPreTitle;
        if(content.getTitle().length > 37) previousHTML += "<p class='moreReducedText'>"+content.getTitle()+"</p>";
        else if(content.getTitle().length > 26) previousHTML += "<p class='reducedText'>"+content.getTitle()+"</p>"; 
        else previousHTML += content.getTitle();
        previousHTML += cardPostTitlePreAuthor;;
        if(content.author.toString().length > 37) previousHTML += "<strong class='moreReducedText'><i class='fa fa-fw fa-star'></i>"+content.author;   
        else if(content.author.toString().length > 19) previousHTML += "<strong class='moreReducedText'><i class='fa fa-fw fa-star'></i>"+content.author;    
        else previousHTML += "<strong><i class='fa fa-fw fa-star'></i>"+content.author;
        previousHTML += cardPostAuthorPreImage;
        previousHTML += content.image;
        previousHTML += cardPostImagePreResume;
        if(content.description != undefined) previousHTML += '<span class=scroll>' + content.description + '</span>';
        else previousHTML += '<span class=scroll>There is no description for this product.</span>';
        previousHTML += cardPostResumePreFooter;
        if(content.link != null) previousHTML += '<a href="' + content.link + '" class="shopping-preview-left"><i class="fa fa-shopping-cart" color="black" aria-hidden="true" title="Comprar"></i></a>';
        else if(content.year != null) previousHTML += '<p><b>Year</b>: ' + content.year + '</p></hr>';
        if(content.previewLink != null)previousHTML += '<a href="' + content.previewLink + '" class="shopping-preview-right"><i class="fa fa-eye" title="Vista Previa"></i></a>';
        else if(content.duration != null) previousHTML += '<b>Episode\'s length</b>: ' + content.duration;  
        previousHTML += cardPostFooter;
        return previousHTML;
    }
}


function errorMessage() 
{
    document.getElementById("errorMessage").className = "visible";
}

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

function cambiarModo()
{
    let body = document.body;
    body.classList.toggle("oscuro");
    body.classList.toggle("claro");
}
