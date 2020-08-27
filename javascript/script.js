let GoogleKey = "AIzaSyClx470vGZU-Th3z32kk6xniV9NSYvjiSg";
let GoodReadsKey = "NyUHBXWYMuGHygb7kdMlIg";

async function performSearch()
{
    document.getElementById("errorMessage").className = "not-visible";
    let result;
    let data = document.getElementById('SearchItem').value;
    let type = document.getElementById('type').value;
    data = data.split(' ').join('%20');
    switch(type)
    {
        case 'Books':
            result = await search(data);
            if (result == null|| result == undefined)
                result = await searchGoodReads(data);
            break;
        case 'Music':
            result = await searchDeezer(data);
            break;
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
        document.getElementById('results').innerHTML = "Todo correcto";
    }
    else
    {
        let parsed = JSON.stringify(result);
        document.getElementById('results').innerHTML = parsed;
        document.getElementById('results').innerHTML = "Todo correcto";
    }
}

async function searchDeezer(text)
{
    let url = "https://api.deezer.com/search?q="+text+"&output=xml";
    return await $.ajax(url,"xhrFields: { withCredentials: true }").done((data) =>
    {
        if(data.status = 200)
            return data;
    });
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
window.onload = () => 
{
    var collapsibles = document.querySelectorAll('.collapsible');
    var collapsibleTriggers = document.querySelectorAll('.collapsible__label');
    
    function updateCollapsibles(e) 
    {
        var parent = e.currentTarget.parentElement;
        
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
        for (var i = 0; i < collapsibles.length; i++) 
            collapsibles[i].classList.remove('collapsible--visible');
    }

    for (var paco = 0; paco < collapsibleTriggers.length; paco++) 
        collapsibleTriggers[paco].addEventListener('click', updateCollapsibles);
}
