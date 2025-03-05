(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        /*비주얼 슬릭*/
        function LoadingFirst() {
            var $totalbar = $('.visual .totalbar');
            $totalbar.removeClass('loading active');
            setTimeout(function () {
                $totalbar.addClass('loading active');
            }, 1);
        }

        function Loading() {
            var $totalbar = $('.visual .totalbar');
            $totalbar.removeClass('loading active');
            setTimeout(function () {
                $totalbar.addClass('loading');
            }, 1);
        }


        var $Visual = $('.visual'),
            $VisualList = $('.visual .visual_list'),
            $VisualBar = $('.visual .visual_wrap .control_box .totalbar'),
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
            autoplaySpeed: 5000,
            pauseOnHover: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: true,
            speed: 700,
            fade: true,
            prevArrow: $('.visual .control_box .prev'),
            nextArrow: $('.visual .control_box .next'),
            dots: false,

            //추가 기능
            autoArrow: $('.visual .control_box .auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseOnDotsClick: true,
            pauseText: '정지',
            playText: '재생',
            total: $('.visual .control_box .total'),
            current: $('.visual .control_box .current'),
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
                    $('.visual .visual_wrap .control_box  .controls button.auto').text('정지');
                }
            }
            if (event.state == 'phone') {
                $VisualList.slick('slickPause');
                $('.visual .visual_wrap .control_box .controls button.auto').text('재생');
            }
            ;
        });

        /*비주얼슬릭 끝*/





        $window.on('screen:tablet screen:phone', function (event) {

        });
    });


})(jQuery);