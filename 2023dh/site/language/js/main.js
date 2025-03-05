'use strict';




$(function() {
    var $window = $(window);

    $('.visual').addClass('on');

    /* svg & 메인비주얼*/
    function Loading(){
        var count = $(('#count'));
        $({ Counter: 0 }).animate({ Counter: 100 }, {
            duration: 4000,
            easing: 'linear',
            step: function () {
                count.text(Math.ceil(this.Counter)+ "%");
            }
        });
        var s = Snap('#animated');
        var progress = s.select('#progress');
        progress.attr({strokeDasharray: '0, 251.2'});
        Snap.animate(0,251.2, function( value ) {
            progress.attr({ 'stroke-dasharray':value+',251.2'});
        }, 4000);
    }


    var $visualslide = $('.visual .slide_list'),
        $visual_current = $('.visual .current'),
        $visual_total = $('.visual .total'),
        $visual_dots = $('.visual .slide_control .dots'),
        $total = $('.visual .slide_item').length;


    $visualslide.on('beforeChange', function(){
        Loading();
    });

    $total = $total < 10 ? '0'+ $total : $total;
    $visual_total.text($total);
    $visualslide.slick({
        swipe : false,
        autoplay : false,
        draggable : false,
        slidesToShow : 1,
        slidesToScroll: 1,
        speed: 3000,
        autoplaySpeed: 3000,
        vertical : false,
        infinite: true,
        fade : true,
        dots : true,
        initialSlide : 0,
        appendDots: $visual_dots,
        prevArrow : $('.popup .prev'),
        nextArrow : $('.popup .next'),

        //추가 기능
        autoArrow : $('.slide_control .auto'),
        isRunOnLowIE : false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        pauseOnArrowClick : true,
        pauseOnDirectionKeyPush : true,
        pauseOnSwipe : true,
        pauseOnDotsClick : true,
        pauseText : '정지',
        playText : '재생',
        current : $visual_current,
        customState : function(state) {
            //현재 슬라이드 위치가 10보다 작을 때
            if(state.current < 10) {
                state.current = '0' + state.current;
            }
            return state;
        },
        responsive: [
            {
                breakpoint: 1001,
                settings: {
                    swipe : true,
                    draggable : true
                }
            },
            {
                breakpoint: 801,
                settings: {
                    autoplaySpeed: 2500,
                }
            },
            {
                breakpoint: 641,
                settings: {
                    swipe : true,
                    draggable : true,
                    variableWidth: false,
                }
            }]
    });


    /* tour Attraction*/
    var $attractionSlideBox = $('.attraction .slidebox'),
        $attractionSlide = $attractionSlideBox.find('.slide_list'),
        $controls = $attractionSlideBox.find('.controls'),
        $attractionNav = $attractionSlideBox.find('.nav_list'),
        $attractionCurrent = $('.attraction .slide_current .current');

    $attractionSlide.slick({
        fade: true,
        autoplay : false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        prevArrow : $controls.find('.prev'),
        nextArrow : $controls.find('.next'),
        pauseOnDotsHover : true,
        swipe:false,
        draggable:false,
        dots:false,
        asNavFor: $attractionNav,
        current : $attractionCurrent,
        customState : function(state) {
            //현재 슬라이드 위치가 10보다 작을 때
            if(state.current < 10) {
                state.current = '0' + state.current;
            }
            return state;
        },
        responsive: [
            {
                breakpoint: 1001,
                settings: {
                    swipe:true,
                    draggable:true,
                    autoplay : false
                }
            }]
    });
    $attractionNav.slick({
        vertical: true,
        verticalSwiping: false,
        centerMode: false,
        centerPadding: '120px',
        fade: false,
        dots : false,
        swipe : false,
        draggable : false,
        slidesToShow : 5,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        focusOnSelect: true,
        asNavFor: $attractionSlide,
        responsive: [
            {
                breakpoint: 1001,
                settings: {
                    swipe : false,
                    draggable : true,
                    verticalSwiping: false,
                    variableWidth: true,
                }
            }]
    });

    $attractionSlide.on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.attraction .conbox .titlebox .titleitem').eq(currentSlide).addClass('active').siblings('.titleitem').removeClass('active');
    });
});

