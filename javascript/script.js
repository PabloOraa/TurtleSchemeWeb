let GoogleKey = "AIzaSyClx470vGZU-Th3z32kk6xniV9NSYvjiSg";
let GoodReadsKey = "NyUHBXWYMuGHygb7kdMlIg";

async function performSearch()
{
    let result;
    let data = document.getElementById('SearchItem').value;
    let type = document.getElementById('type').value;
    data = data.split(' ').join('%20');
    if(type === 'Books')
    {
        result = await search(data);
        if (result == null|| result == undefined)
            result = await searchGoodReads(data);
    }


    handleResult(result);
}

async function search(text)
{
    let url = "https://www.googleapis.com/books/v1/volumes?q="+text+"&key="+GoogleKey;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        return data;
    });
}


async function searchGoodReads(text)
{
    let url = "https://www.goodreads.com/search/index.xml?q="+text+"&key=" + GoodReadsKey;
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        return data;
    });
}

function handleResult(result)
{
    if(result.contentType == "text/xml")
    {
        let xmlDoc = ( new XMLSerializer() ).serializeToString( result);
        document.getElementById('results').innerHTML = xmlDoc;
    }
    else
    {
        let parsed = JSON.stringify(result);
        document.getElementById('results').innerHTML = parsed;
    }
}