let results;
let media;
let realColor;
let initialTitle = "22.4px";
let initialAuthor = "17.92px";
let maxHeightForTitleAuth = 35.5;
var lang;
const booksSource = ["Google","GoodReads"];
const musicSource = ["LastFM", "Deezer"];
const moviesSource = ["OMBd"];
const seriesSource = ["OMBd"];


window.onload = () => 
{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
        document.body.classList.toggle("mobile");
    var id;

    if(document.body.classList.contains("mobile"))
        maxHeightForTitleAuth = 36;
    else 
    {
        $(window).resize(function() 
        {
            clearTimeout(id);
            id = setTimeout(executeInterval(800), 500);
        });
    }
}

function addToMap(map, source, total)
{
    map.set(source,total);
    return map;
}

async function performSearch()
{
    let source;
    try
    {
        lang = await searchTranslation();
        results = new Map();
        document.getElementById("errorMessage").className = "not-visible";
        document.getElementById("resultMessage").innerHTML = "";
        let data = document.getElementById('SearchItem').value;
        let type = document.getElementById('type').value;
        data = data.split(' ').join('%20');
        switch(type)
        {
            case 'Books':
                source = booksSource;
                await searchBooks(data);
                break;
            case 'Music':
                source = musicSource;
                await searchMusic(data);
                break;
            case 'Movies':
                source = moviesSource;
                //searchMovies(data);
                res = await searchOMBd(data,'movie');
                await getDetail(res, 'movie');
                break;
            case 'Series':
                source = seriesSource;
                //searchSeries(data);
                res = await searchOMBd(data,'series');
                await getDetail(res, 'series');
                break;
        }
        handleResult(results, source);
    }
    catch(Exception)
    {
        console.log(Exception);
        if(results.size > 0)
            handleResult(results,source);
        else
            errorMessage();
    }
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
    media = new Map();
    let parsed = [];
    try
    {
        if(results.size == 0)
            errorMessage();
        results.forEach((value, key) => 
        {
            parsed = [];
            let duplicate = false;
            if(value.contentType == "text/xml")
            {
                for(let i = 0; i < value.getElementsByTagName("work").length;i++)
                {
                    let id = value.getElementsByTagName("best_book")[i].childNodes[1].textContent;
                    let title = value.getElementsByTagName("title")[i].childNodes[0].textContent;
                    let auth = value.getElementsByTagName("author")[i].childNodes[3].textContent;
                    let img = value.getElementsByTagName("image_url")[i].childNodes[0].textContent.substr(0,value.getElementsByTagName("image_url")[i].childNodes[0].textContent.length-10) + "jpg";
                    let url = "https://www.goodreads.com/book/show/" + id;
                    let avgRating = value.getElementsByTagName("average_rating")[i].childNodes[0].textContent + "/5";
                    if(img.indexOf("/nophoto/") == -1)
                        parsed.push(new Media(id,title,auth,null,img,url,null,null,null,avgRating));
                }
            }
            else
            {
                let res;
                if(sources == booksSource)
                {   
                    res = value.items;

                    for(let r in res)
                        if(res[r].volumeInfo.imageLinks != undefined)
                            parsed.push(new Media(res[r].id,res[r].volumeInfo.title,res[r].volumeInfo.authors, res[r].volumeInfo.description,res[r].volumeInfo.imageLinks.thumbnail,res[r].volumeInfo.infoLink, res[r].volumeInfo.previewLink,null,null, null));
                }
                else if(sources == musicSource)
                {
                    switch(key)
                    {
                        case 'Deezer': //Deezer
                            res = value.data;
                            for(let r in res)
                                if(res[r].album.cover_big != undefined)
                                {
                                    duplicate = false;
                                    parsed.forEach((data) => {if(data.id == res[r].album.id) duplicate = true;})
                                    if(!duplicate)
                                        parsed.push(new Media(res[r].album.id,res[r].album.title,res[r].artist.name, null,res[r].album.cover_big, "https://www.deezer.com/es/album/"+res[r].album.id,null/*res[r].preview*/,null,null));
                                }
                            break;
                        case 'LastFM': //LastFM
                            res = value.results.albummatches.album;
                            for(let album in res)
                                if(res[album].image[res[album].image.length-1]["#text"] != "")
                                {
                                    duplicate = false;
                                    parsed.forEach((data) => {if(data.id == res[album].mbid) duplicate = true;})
                                    if(!duplicate)
                                        parsed.push(new Media(res[album].mbid, res[album].name,res[album].artist, null, res[album].image[res[album].image.length-1]["#text"], res[album].url, null,null,null));
                                }
                            break;
                    }
                }
                else if(sources == moviesSource)
                {
                    res = value;
                    for(let r in res)
                        if(res[r].Poster != "N/A")
                        {    
                            parsed.forEach((data) => {if(data.id == res[r].imbdID) duplicate = true;})
                            if(!duplicate)
                                parsed.push(new Media(res[r].imbdID,res[r].Title,(res[r].Director != "N/A" ? res[r].Director : res[r].Actors.split(",")[0]) + '-' + res[r].Genre.split(',')[0], res[r].Plot,res[r].Poster,null,null,res[r].Year,res[r].Runtime,res[r].imdbRating + "/10"));
                        }
                }
                else if(sources == seriesSource)
                {
                    res = value;
                    for(let r in res)
                        if(res[r].Poster != "N/A")
                        {    
                            duplicate = false;
                            let id = res[r].imdbID;
                            parsed.forEach((data) => {if(data.id === id) duplicate = true;})
                            if(!duplicate)
                                parsed.push(new Media(id,res[r].Title,(res[r].Director != "N/A" ? res[r].Director : res[r].Actors.split(",")[0]) + '-' + res[r].Genre.split(',')[0], res[r].Plot,res[r].Poster,null,null,res[r].Year,res[r].Runtime,res[r].imdbRating + "/10"));
                        }
                }
            }
            addToMap(media,key,parsed);
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
    realColor = "Red";
    document.getElementById('resultMessage').className = "not-visible";
    if(content.size == 0)
        errorMessage();
    else
    {    
        document.getElementById('resultMessage').innerHTML = "";
        document.getElementById('resultMessage').className = "visible";
        document.getElementById('cardColor').className = 'visible';
        content.forEach((value,key) => createSection(value,key));
        sectionWork();
        cardWork();
        if(realColor != defaultColor)
            $("#card-color").val(realColor).change();
    }
}

function errorMessage() 
{
    document.getElementById("errorMessage").className = "visible";
    document.getElementById('cardColor').className = "not-visible";
}