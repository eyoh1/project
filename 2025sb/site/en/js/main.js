(function ($) {
    'use strict';

    $(function () {

        var $window = $(window),
            $container = $('#container'),
            $contents = $('#contents'),
            debounce = null;

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

        /* Quick */
        var $quick = $container.find('.quick_menu'),
            $quickList = $quick.find('.quick_list');

        function quickSlide() {
            $quickList.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                draggable: true,
                infinite: false,
                variableWidth: true,
                speed: 1000,
                autoplaySpeed: 5000,
                autoplay: false,
                pauseOnHover: false,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1301,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow:3,
                        }
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            slidesToShow: 3,
                        }
                    }
                ]
            })
        }

        quickSlide();
        $window.on('resize', function () {
            quickSlide();
        });


        /* attraction */
        var $attraction = $container.find('.attraction'),
            $attractionList = $attraction.find('.attraction_list'),
            $attractionControl = $attraction.find('.attraction_control'),
            $attractionPrev = $attractionControl.find('.prev'),
            $attractionNext = $attractionControl.find('.next');

        $attractionList.slick({
            //기본
            autoplay: false,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            arrows: true,
            prevArrow: $attractionPrev,
            nextArrow: $attractionNext,
            speed: 1000,
            autoplaySpeed: 5000,
            centerMode: true,
            centerPadding: 0,
            zIndex: 0,
            fade: false,
            responsive: [{
                breakpoint: 641,
                settings: {
                    variableWidth: false,
                    slidesToShow: 1,
                    centerMode: true,
                }
            }]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-current');
                        $node.addClass('slick-active');
                    });
                });
            }
        }); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.


        /* festival */
        var $festival = $container.find('.festival'),
            $festivalList = $festival.find('.festival_list'),
            $festivalControl = $festival.find('.festival_control'),
            $festivalPrev = $festivalControl.find('.prev'),
            $festivalNext = $festivalControl.find('.next');

        $festivalList.slick({
            //기본
            autoplay: false,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: true,
            arrows: true,
            prevArrow: $festivalPrev,
            nextArrow: $festivalNext,
            zIndex: 0,
            fade: false,
            responsive: [
                {
                    breakpoint: 1301,
                    settings: {
                        slidesToShow: 3,

                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 3,
                      variableWidth: true,
                        centerMode:true,

                    }
                },
            ]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-current');
                        $node.addClass('slick-active');
                    });
                });
            }
        }); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.

        /* Link zone */
        var $link = $container.find('.link_zone'),
            $linkList = $link.find('.linkzone_list');

        function linkListSlide() {
            $linkList.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                draggable: true,
                infinite: false,
                variableWidth: true,
                speed: 1000,
                autoplaySpeed: 5000,
                autoplay: false,
                pauseOnHover: false,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1301,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]
            })
        }

        linkListSlide();
        $window.on('resize', function () {
            linkListSlide();
        });
    });
})(window.jQuery);
