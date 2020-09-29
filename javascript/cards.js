var defaultColor = "Red";

function cardWork() 
{
    $('.material-card > .mc-btn-action').click(function () {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        icon.addClass('fa-spin-fast');

        if (card.hasClass('mc-active')) {
            card.removeClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-arrow-left')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-bars');

            }, 800);
        } else {
            card.addClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-bars')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-arrow-left');

            }, 800);
        }
    });
};

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