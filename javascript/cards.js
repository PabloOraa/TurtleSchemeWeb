var defaultColor = "Red";

const cardInit = "<section class='container'><div class='row active-with-click'>";
const cardPreTitle = `<div class='col-md-4 col-sm-6 col-xs-12'><article class='material-card ${defaultColor}'><h2><span>`;
const cardPostTitlePreAuthor = "</span>";
const cardPostAuthorPreImage = "</strong></h2><div class='mc-content'><div class='img-container'><img class='img-responsive' src='";
const cardPostImagePreResume = "'></div><div class='mc-description'>";
const cardPostResumePreIcon = "</div></div><a class='mc-btn-action'>";
const cardPostIconPreFooter = "</a><div class='mc-footer'>";
const cardPostFooter = "</div></article></div>"
const cardEnd = "</div></section>";

/*CREATION OF CARDS*/
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
        if(defaultColor != "Red")
        {
            realColor = defaultColor;
            defaultColor = "Red";
            $("#card-color").val("Red");
        }
        previousHTML = addHeader(previousHTML, content);
        previousHTML = addContent(previousHTML,content);
        previousHTML = addIcon(previousHTML,content);
        previousHTML = addFooter(previousHTML,content);
        return previousHTML;
    }
}

function addHeader(previousHTML, content)
{
    previousHTML += cardPreTitle;
    previousHTML += content.getTitle();
    previousHTML += cardPostTitlePreAuthor;;
    if(content.generalReview != null && content.generalReview != undefined)
        previousHTML += "<strong title="+content.generalReview+"><i class='fa fa-fw fa-star' label="+content.generalReview+"></i>"+content.author;
    else
        previousHTML += "<strong><i class='fa fa-fw fa-star'></i>"+content.author;
    previousHTML += cardPostAuthorPreImage;
    previousHTML += content.image;
    return previousHTML;
}

function addContent(previousHTML,content)
{
    previousHTML += cardPostImagePreResume;
    if(content.description != undefined) 
        previousHTML += '<span class=scroll>' + content.description + '</span>';
    else 
        previousHTML += '<span class=scroll>'+lang.noDescription+'</span>';
    return previousHTML;
}

function addIcon(previousHTML,content)
{
    previousHTML += cardPostResumePreIcon;
    if(content.description == null && content.previewLink == null)
        previousHTML += '<i class="fa fa-eye" aria-hidden="true" onclick="window.open(\''+content.link+'\')" title='+lang.seeonweb+'></i>';
    else
        previousHTML += "<i class='fa fa-bars'></i>";
    return previousHTML;
}

function addFooter(previousHTML, content)
{
    previousHTML += cardPostIconPreFooter;
    if(content.link != null) previousHTML += '<a href="' + content.link + '" class="shopping-preview-left"><i class="fa fa-shopping-cart" color="black" aria-hidden="true" title="'+lang.buy+'"></i></a>';
    else if(content.year != null) previousHTML += '<p><b>Year</b>: ' + content.year + '</p></hr>';
    if(content.previewLink != null)previousHTML += '<a href="' + content.previewLink + '" class="shopping-preview-right"><i class="fa fa-eye" title="'+lang.preview+'"></i></a>';
    else if(content.duration != null) previousHTML += '<b>Episode\'s length</b>: ' + content.duration;  
    previousHTML += cardPostFooter;
    return previousHTML;
}

/*ADAPTATION OF CARDS*/
function executeInterval(time)
{
    toDefault(initialTitle,initialAuthor);
    setTimeout(checkHeight, time);
}

function toDefault(title,author)
{
    document.getElementsByClassName("material-card").forEach
    ((value) => 
    {
        value.childNodes[0].childNodes[0].style.fontSize = title; 
        value.childNodes[0].childNodes[1].style.fontSize = author;
    });
}

function executeIntervalForCard(time, card)
{   
    let exactCard = card[0];
    exactCard.childNodes[0].childNodes[0].style.fontSize = initialTitle; 
    exactCard.childNodes[0].childNodes[1].style.fontSize = initialAuthor;
    setTimeout(() => {changeSize(exactCard)}, time);
}

function checkHeight() 
{
    document.getElementsByClassName("material-card").forEach((value) => {changeSize(value);});
}

function changeSize(exactCard)
{
    for(let i = 0; i < exactCard.childNodes[0].childElementCount;i++)
    {
        while(parseFloat(getComputedStyle(exactCard.childNodes[0].childNodes[i]).height.substring(0,getComputedStyle(exactCard.childNodes[0].childNodes[i]).height.indexOf("p"))) > maxHeightForTitleAuth && getComputedStyle(exactCard.childNodes[0].childNodes[i]).height != "auto")
        {
            let newValue = parseFloat(exactCard.childNodes[0].childNodes[i].style.fontSize.substring(0,exactCard.childNodes[0].childNodes[i].style.fontSize.indexOf("p")))-1;
            exactCard.childNodes[0].childNodes[i].style.fontSize = newValue + "px";
        }
        exactCard.childNodes[1].childNodes[0].childNodes[0].height = exactCard.childNodes[1].childNodes[0].offsetHeight;
        exactCard.childNodes[1].childNodes[0].childNodes[0].width = exactCard.childNodes[1].childNodes[0].offsetWidth;
    }
}

/*FUNCTIONALITY OF CARDS*/
function cardWork() 
{
    $('.material-card > .mc-btn-action').click(function () {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        if(!icon[0].classList.contains("fa-eye"))
        {
            icon.addClass('fa-spin-fast');

            if (card.hasClass('mc-active')) {
                card.removeClass('mc-active');
                executeIntervalForCard(400, card);
                window.setTimeout(function() {
                    icon
                        .removeClass('fa-arrow-left')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-bars');

                }, 800);
            } else {
                card.addClass('mc-active');
                executeIntervalForCard(400, card);
                window.setTimeout(function() {
                    icon
                        .removeClass('fa-bars')
                        .removeClass('fa-spin-fast')
                        .addClass('fa-arrow-left');

                }, 800);
            }
        }
    });
};

/*COLOR OF CARDS*/
function changeCardColor()
{
    if(document.getElementsByClassName('material-card').length != 0)
    {
        let newColor = document.getElementById('card-color').value;
        document.getElementsByClassName('material-card').forEach((elem) => 
        {
            elem.classList.toggle(defaultColor);
            elem.classList.toggle(newColor);
        });
        defaultColor = newColor;
    }
}