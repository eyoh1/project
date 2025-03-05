(function($) {
    'use strict';

    var $html = $('html');

    $(function() {
        var $window = $(window),
            $html = $('html'),
            $container = $('#container'),
            $footer = $('#footer');

        //여기서부터 코드 작성해주세요

        /*비주얼 온*/
        $('.visual').addClass('on');

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
            speed: 3000,
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
            customState : function(state) {
                  //현재 슬라이드 위치가 10보다 작을 때
                  if(state.current < 10) {
                      state.current = '0' + state.current;
                  }
                  //슬라이드 갯수가 10보다 작을 때
                  if(state.total < 10) {
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

        //텍스트 에니메이션 플러그인 시작
        function splittingTextDelay (object, speed, delay_speed) {
            var splitLength = $(object).find('.char').length;
            for (var i=0; i<splitLength; i++) {
                if (  $(object).data('css-property') == 'animation' ) {
                    $(object).find('.char').eq(i).css('animation-delay',delay_speed+(i*speed)+'s');
                }else if( $(object).data('css-property') == 'transition' ) {
                    $(object).find('.char').eq(i).css('transition-delay',delay_speed+(i*speed)+'s');
                }
            }
        }

        Splitting({
            target: '[data-splitting]',
            by: 'chars',
            key: null
        });
        var $splittingTxt = $('.word-split');
        $($splittingTxt).each(function  () {
            splittingTextDelay($(this),$(this).data('speed'),$(this).data('speed-delay'));
        });
        //텍스트 에니메이션 플러그인 끝

        /*한줄팝업*/
        var $oneline = $container.find('.oneline'),
            $onelineList = $oneline.find('.oneline_list'),
            $onelineCurrent = $oneline.find('.oneline_current'),
            $onelineTotal =  $oneline.find('.oneline_total'),
            $onelineAuto = $oneline.find('.oneline_auto'),
            $onelinePrev = $oneline.find('.oneline_prev'),
            $onelineNext = $oneline.find('.oneline_next');

        $onelineList.slick({
            vertical: true,
            slidesToShow: 1,
            autoplay: false,
            total: $onelineTotal,
            current: $onelineCurrent,
            arrows: true,
            playText: '재생',
            pauseText: '정지',
            autoArrow: $onelineAuto,
            prevArrow: $onelinePrev,
            nextArrow: $onelineNext,
            /*
            responsive: [{
                breakpoint: 641,
                settings: {
                    dots: false,
                }
            }]
            */

        });

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);
