$(function() {
    var slides = $('section'),
        current = 0;

    function mark() {
        if (current < 0) current = 0;
        if (current >= slides.length) current = slides.length - 1;

        window.location.hash = '' + current;

        slides.filter('.current').removeClass('current');
        slides.eq(current).addClass('current');
    }

    $('body').bind('keydown', function(event) {
        switch(event.keyCode) {
            case 39:
                ++current;
                mark();
                break;
            case 37:
                --current;
                mark();
                break;
            default:
                console.log(event);
        }
    });

    // initialization
    if (window.location.hash) {
        current = parseInt(window.location.hash.substr(1));
        if (isNaN(current)) current = 0;
    }
    mark();

    $('li').prepend('<span class="marker"></span>');
});
