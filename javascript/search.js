async function searchTranslation()
{
    lang = await getTranslation();
    lang = JSON.parse(lang);
    return lang;
}

async function searchBooks(data)
{
    let res = await searchGoogle(data);
    if(res.totalItems != 0)
        addToMap(results,booksSource[0],res);
    res = await searchGoodReads(data);
    if (window.ActiveXObject) 
    { 
        var oXML = new ActiveXObject("Microsoft.XMLDOM"); 
        oXML.loadXML(res);
        res = oXML;
    }
    // code for Chrome, Safari, Firefox, Opera, etc. 
    else 
    {
        res = (new DOMParser()).parseFromString(res, "text/xml");
    }
    if(res.getElementsByTagName("total-results")[0].childNodes[0].nodeValue != 0)
        addToMap(results,booksSource[1],res);
}

async function searchMusic(data)
{
    let res = await searchLastFM(data);
    if(res.results.albummatches.album.length != 0)
        addToMap(results,musicSource[0],res);
    res = await searchDeezer(data);
    res = JSON.parse(res);
    if(res.total != 0)
        addToMap(results,musicSource[1],res);
}

async function searchMovie(data)
{
    let res = await searchOMBd(data,'movie');
    await getDetail(res, 'movie');
}

async function searchSeries(data)
{
    let res = await searchOMBd(data,'series');
    await getDetail(res, 'series');
}

async function getDetail(data, type)
{
    let res = [];
    for(let media in data.Search)
        res.push(await getDetails(data.Search[media].Title, type));
    if(res.length != 0)
        addToMap(results,moviesSource[0],res);
}