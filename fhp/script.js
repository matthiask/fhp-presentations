// TODO rewrite the JS with document.querySelectorAll, Array.prototype.slice.call,
// classList and friends so that it definitively does not work in old browsers
// anymore :-)
$(window).load(function() {
    var $window = $(window),
        slides = $('section'),
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
            case 32:
                ++current;
                mark();
                return false;
            case 37:
                --current;
                mark();
                return false;
        }
        console.log(event);
    });

    // initialization
    if (window.location.hash) {
        current = parseInt(window.location.hash.substr(1));
        if (isNaN(current)) current = 0;
    }
    mark();

    $('li, .title').prepend('<span class="marker"></span>');
    $('section.title').each(function(i, e) {
        $(e).addClass('n' + i);
    });

    $('section.image').each(function(i, e) {
        var $img = $('img', this),
            css = {
                'backgroundImage': 'url(' + $img.attr('src') + ')'
                };

        if ($img.width() > $window.width() || $img.height() > $window.height())
            css.backgroundSize = 'contain';

        $(this).css(css);
        $img.remove();
    });
});
