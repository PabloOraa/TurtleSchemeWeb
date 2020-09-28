let GoogleKey = "AIzaSyClx470vGZU-Th3z32kk6xniV9NSYvjiSg";
let GoodReadsKey = "NyUHBXWYMuGHygb7kdMlIg";
let SpotifyToken = "";
let LastFMAPIKey = "40a0d7ad1498eeada629d92f48bcc6ae";
let LastFMAPIKeySecret = "7f22785605b38cd7ea0ab9e1c540cf5e";
let MusicXMatchKey = "e23fe2527fb9a122166770f318866cfa";
let OBDbKey = "758c9925";

async function searchGoogle(text)
{
    let url = `https://www.googleapis.com/books/v1/volumes?q=${text}&key=${GoogleKey}`;
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
    let url = `https://www.goodreads.com/search/index.xml?q=${text}&key=${GoodReadsKey}`;
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
    let url = `https://api.deezer.com/search?q=${text}`;
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
    /*let url = `https://api.spotify.com/v1/search?q=${text}`;
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
    let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text}&api_key=${LastFMAPIKey}&format=json`;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status == 200)
            return data;
        else
            return null;
    });
}

async function searchMusixMatch(text) //Not in actual use
{
    let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text}&api_key=${LastFMAPIKey}&format=json`;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status == 200)
            return data;
        else
            return null;
    });
}

async function searchOMBd(text,type)
{
    let url = `http://www.omdbapi.com/?apikey=${OBDbKey}&s=${text}&r=json&type=${type}`;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done( (data) =>
    {
        if(data.Response == "True")
            return data;
        else
            return null;
    });
}

async function getDetails(text,type)
{
    let url = `http://www.omdbapi.com/?apikey=${OBDbKey}&t=${text}&r=json&type=${type}&plot=short`;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status == 200)
            return data;
        else
            return null;
    });
}

/*window.onload = () => 
{   //&code="+code+"
    let url = "https://accounts.spotify.com/api/token?grant_type=authorization_code&client_secret=f6d7eb3833fe49798fdfac92a4f7cdf1&client_id=1c77ad14a10147938dfc54a3a269a406";
    console.log("Method");
    $.ajax(url).done((result) =>{console.log(result);});
}*/

/*DZ.init({
    appId  : 'YOUR_APP_ID',
    channelUrl : 'http://YOUR_DOMAIN/channel.html'
});*/