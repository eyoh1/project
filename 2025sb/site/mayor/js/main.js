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


        /* 비주얼 */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal = $visual.find('.visual_total'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualNext = $visual.find('.visual_next'),
            $visualAuto = $visual.find('.visual_auto');

        $visualList.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            infinite: true,
            fade: true,
            current: $visualCurrent,
            total: $visualTotal,
            playText: '재생',
            pauseText: '정지',
            autoArrow: $visualAuto,
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            speed: 1000,
            autoplaySpeed: 8000,
            autoplay: true,
            pauseOnHover: false,
            dots: false
        });


        $('.activity_section').each(function () {
            var $activity = $(this),
                $activityList = $activity.find('.activity_list'),
                $activityPrev = $activity.find('.activity_prev'),
                $activityNext = $activity.find('.activity_next');

            $activityList.slick({
                rows: 1,
                draggable: false,
                infinite: false,
                variableWidth: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                playText: '재생',
                pauseText: '정지',
                prevArrow: $activityPrev,
                nextArrow: $activityNext,
                fade: true,
                speed: 1200,
            });
        });


        /* city */
        var $city = $container.find('.city'),
            $cityList = $city.find('.city_list'),
            $cityListHtml = $city.find('.city_list').html(),
            $cityPrev = $city.find('.city_control .city_prev'),
            $cityNext = $city.find('.city_control .city_next'),
            $cityListItem = $cityList.find('.city_item');


        $cityList.after('<div class="city_list n2"></div>');
        $('.city_list.n2').html($cityListHtml);
        var $cityList2 = $city.find('.city_list.n2');

        $cityList.slick({
            autoplay: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            variableWidth: false,
            centerPadding: '0',
            prevArrow: $cityPrev,
            nextArrow: $cityNext,
            swipe: false,
            draggable: false,
            centerMode: false,
            fade: false,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        centerMode: true,
                    }
                }
            ]
        })

        $cityList2.slick({
            autoplay: false,
            swipe: false,
            draggable: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true,
            arrows: false,
            dots: false,
            swipeToSlide: true,
            asNavFor: $cityList,
            focusOnSelect: true,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 1601,
                    settings: {
                        variableWidth: true,
                    }
                }
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


        $cityList.on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $cityListItem.addClass('ani_show');
        });


        $cityList2.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $cityList.slick('slickGoTo', currentSlide);
        });

        $cityList.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $cityList2.slick('slickGoTo', nextSlide + 1);
        });


    });
})(window.jQuery);
