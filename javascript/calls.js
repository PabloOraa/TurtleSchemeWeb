let GoogleKey = "AIzaSyClx470vGZU-Th3z32kk6xniV9NSYvjiSg";
let GoodReadsKey = "NyUHBXWYMuGHygb7kdMlIg";
let SpotifyToken = "";
let LastFMAPIKey = "40a0d7ad1498eeada629d92f48bcc6ae";
let LastFMAPIKeySecret = "7f22785605b38cd7ea0ab9e1c540cf5e";
let MusicXMatchKey = "e23fe2527fb9a122166770f318866cfa";
let OBDbKey = "758c9925";
let DeezerKey = "374583ad164febe68231287753fc959b";
let DeezerID = "437462";

async function searchGoogle(text)
{
    let url = `https://www.googleapis.com/books/v1/volumes?q=${text}&key=${GoogleKey}`;
    return await makeCall(url);
}


async function searchGoodReads(text)
{
    //let url = `https://www.goodreads.com/search/index.xml?q=${text}&key=${GoodReadsKey}`;
    let url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${GoodReadsKey}&q=${text}`;
    return await makeCall(url);
}

async function searchDeezer(text)
{
    //let url = `https://api.deezer.com/search?q=${text}`;
    let url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${text}`;
    return await makeCall(url);
}

async function searchSpotify(text)
{
    /*let url = `https://api.spotify.com/v1/search?q=${text}`;
    return await makeCall(url)*/
}

async function searchLastFM(text)
{
    let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text}&api_key=${LastFMAPIKey}&format=json`;
    return await makeCall(url);
}

async function searchMusixMatch(text) //Not in actual use
{
    let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text}&api_key=${LastFMAPIKey}&format=json`;
    return await makeCall(url);
}

async function searchOMBd(text,type)
{
    let url = `http://www.omdbapi.com/?apikey=${OBDbKey}&s=${text}&r=json&type=${type}`;
    return await makeCall(url);
}

async function getDetails(text,type)
{
    let url = `http://www.omdbapi.com/?apikey=${OBDbKey}&t=${text}&r=json&type=${type}&plot=short`;
    return await makeCall(url);
}

async function makeCall(url)
{
    return await $.ajax(url,"xhrFields: { withCredentials: true }, crossdomain: true").done((data) =>
    {
        if(data.status == 200)
            return data.items;
        else
            return null;
    });
}