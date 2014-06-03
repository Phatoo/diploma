$('.slider').unslider({
          speed: 500,       //  The speed to animate each slide (in milliseconds)
          delay: 5000,      //  The delay between slide animations (in milliseconds)
          keys: true,       //  Enable keyboard (left, right) arrow shortcuts
          dots: true,       //  Display dot navigation
        });

      $(function() {
    var unslider = $('.mini-slider').unslider({
        speed: 500,     // animation speed, false for no transition (integer or boolean)
        delay: false,    // delay between slides, false for no autoplay (integer or boolean)
        init: 100,        // init delay, false for no delay (integer or boolean)
        pause: true,      // pause on hover (boolean)
        loop: true,       // infinitely looping (boolean)
        keys: true,        // keyboard shortcuts (boolean)
        dots: false,        // display ••••o• pagination (boolean)
        fluid: true,       // is it a percentage width? (boolean)
        easing: 'swing' // easing function to use for animation
    });

    $('.unslider-arrow').click(function() {
        var fn = this.className.split(' ')[1];
        event.preventDefault();

        unslider.data('unslider')[fn]();
    });
});