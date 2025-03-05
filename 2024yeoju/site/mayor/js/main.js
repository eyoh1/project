(function ($) {
    'use strict';

    var $html = $('html');

    $(function () {
        var $window = $(window),
            $html = $('html'),
            $container = $('#container'),
            $footer = $('#footer');

        //여기서부터 코드 작성해주세요

        /*비주얼 온*/
        $('.visual').addClass('on');

        /* fade */
        var $fade = $container.find('.fade');

        function fade() {
            $fade.each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();
                if (bottom_of_window > bottom_of_object / 1.2) {
                    $(this).addClass('show');
                } else {
                    $(this).removeClass('show');
                }
            });
        }

        fade();
        $window.scroll(function () {
            fade();
        });

        var $fadeIn = $container.find('.fade_in');

        function fadeIn() {
            $fadeIn.each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();
                if (bottom_of_window > bottom_of_object / 1.5) {
                    $(this).addClass('show');
                } else {
                    $(this).removeClass('show');
                }
            });
        }

        fadeIn();
        $window.scroll(function () {
            fadeIn();
        });


        /*비주얼 슬릭*/
        function LoadingFirst() {
            var $totalbar = $('.visual .totalbar');
            $totalbar.removeClass('loading first active');
            setTimeout(function () {
                $totalbar.addClass('loading first active');
            }, 1);
        }

        function Loading() {
            var $totalbar = $('.visual .totalbar');
            $totalbar.removeClass('loading first active');
            setTimeout(function () {
                $totalbar.addClass('loading');
            }, 1);
        }


        var $Visual = $('.visual'),
            $VisualList = $('.visual .visual_list'),
            $VisualBar = $('.visual .visual_box .control_box .controller .totalbar'),
            VisualLength = $VisualList.find('.visual_item').length;
        $VisualList.on('init', function (event, slick, currentSlide) {
            LoadingFirst();
            var $currentslide = $(slick.$slides[0]);
            $Visual.addClass('active').attr('data-active', '0');
            $currentslide.addClass('active');
        });
        $VisualList.slick({
            //기본
            autoplay: true,
            speed: 0,
            autoplaySpeed: 6000,
            pauseOnHover: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: true,
            fade: true,
            prevArrow: $('.visual .controller .prev'),
            nextArrow: $('.visual .controller .next'),
            dots: false,

            //추가 기능
            autoArrow: $('.visual .controller .auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseOnDotsClick: true,
            pauseText: '정지',
            playText: '재생',
            total: $('.visual .controller .total'),
            current: $('.visual .controller .current'),
            customState: function (state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if (state.current < 10) {
                    state.current = '0' + state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if (state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            }
        });

        $VisualList.on('afterChange', function () {
            $VisualBar.addClass('active');
        });
        $VisualList.on('beforeChange', function () {
            $VisualBar.removeClass('active');
        });


        $VisualList.on('beforeChange', function (event, slick, currentSlide) {
            Loading();
            $Visual.removeClass('active');
        });
        $VisualList.on('afterChange', function (event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]);
            $(slick.$slides).removeClass('active');
            $currentslide.addClass('active');
            $Visual.addClass('active').attr('data-active', currentSlide);
        });
        $window.on('responsive', function (event) {
            if (event.state == 'wide' || event.state == 'web' || event.state == 'tablet') {
                if (VisualLength >= 2) {
                    $('.visual .visual_wrap .coltrolbox .controls button.auto').text('정지');
                }
            }
            if (event.state == 'phone') {
                $VisualList.slick('slickPause');
                $('.visual .visual_wrap .coltrolbox .controls button.auto').text('재생');
            }
            ;
        });

        /*비주얼슬릭 끝*/


        /* 공약 */

        var $pledgeSlick = $('.pledge .pledge_list'),
            $pledgePrev = $('.pledge .pledge_control .prev'),
            $pledgeNext = $('.pledge .pledge_control .next');

        var $VisualNav = $('.pledge .nav_list');

        $pledgeSlick.slick({
            autoplay: false,
            swipe: false,
            draggable: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: true,
            speed: 500,
            fade: true,
            prevArrow: $pledgePrev,
            nextArrow: $pledgeNext,
            asNavFor: $VisualNav,
            dots: false,
            responsive: [{
                breakpoint: 1001,
                settings: {
                    swipe: true,
                    draggable: true
                }
            }]
        });

        function VisualNav() {
            $VisualNav.slick({
                swipe: false,
                draggable: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: true,
                centerMode: true,
                fade: false,
                focusOnSelect: true,
                autoplay: false,
                infinite: true,
                dots: false,
                arrows: false,
                asNavFor: $pledgeSlick,
                responsive: [
                    {
                        breakpoint: 801,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1,
                            swipe: false,
                            draggable: false,
                            vertical: false,
                            centerMode: false,
                            variableWidth: true,
                            infinite: false,
                        }
                    }]
            });
        }

        VisualNav();
        $window.on('resize', function () {
            VisualNav();
        });


        /* 생생 현장 시정활동 */
        var $photonews = $container.find('.photonews'),
            $photonewsList = $photonews.find('.photonews_list');

        $photonewsList.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            draggable: false,
            swipe: false,
            infinite: false,
            arrow: false,
            prevArrow: false,
            nexArrow: false,
            speed: 500,
            dots: false,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 3,
                        draggable: false,
                        swipe: false,
                        infinite: false,
                        variableWidth: true,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 2,
                        draggable: true,
                        swipe: true,
                        infinite: true,
                        variableWidth: true,
                    }
                }
            ]
        });

        $photonewsList.on('beforeChange', function (event, slick, current, next) {
            $(this)[$(this).hasClass('active') ? 'removeClass' : 'addClass']('active');
        });


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);
