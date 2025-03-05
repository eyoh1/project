(function ($) {
    'use strict';

    $(function () {

        var $window = $(window),
            $container = $('#container');

        /* visual */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualNext = $visual.find('.visual_next'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal = $visual.find('.visual_total'),
            $visualProgress = $visual.find('.visual_progress'),
            $navList = $visual.find('.nav_list');

        $visualList.slick({
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            fade: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 5000,
            playText: '재생',
            pauseText: '정지',
            pauseOnHover: false,
            prevArrow: $visualPrev,
            autoArrow: $visualAuto,
            nextArrow: $visualNext,
            current: $visualCurrent,
            total: $visualTotal,
            asNavFor: $navList,
            dots:false,
        }).on("beforeChange",function(event, slick, currentSlide, nextSlide) {
            $visualProgress.removeClass('on');
        }).on('afterChange', function(e, slick, current, next) {
            $visualProgress.addClass('on');
        });

        setTimeout(function(){
            $('.rowgroup1').addClass('visual_active');
        }, 750);

        $visualAuto.on('click', function(){
            if($(this).hasClass('slick-pause')){
                $visual.removeClass('pause');
            } else {
                $visual.addClass('pause');
            }
        });

        $navList.slick({
            swipe: false,
            draggable: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            autoplay: false,
            dots: false,
            vertical:true,
            asNavFor: $visualList,
            centerMode: true,
            focusOnSelect: true,
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]),
                $nextslide = $(slick.$slides[nextSlide]);
            setTimeout(function(){
                $nextslide.addClass('now');
                $currentslide.removeClass('now');
            }, 1000);

            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-active');
                    });
                });
            }

        });



        //팝업
        var $Popup = $('.popup .popup_list'),
            $popuptotal = $('.popup .total'),
            $popupcurrent = $('.popup .current');

        $Popup.slick({
            //기본
            autoplay: true,
            dots: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            prevArrow: $('.popup .popup_control .prev'),
            nextArrow: $('.popup .popup_control .next'),

            //추가 기능
            autoArrow: $('.popup .popup_control .auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseText: '정지',
            playText: '재생',
            total: $popuptotal,
            current: $popupcurrent,
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
            },
            responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        autoplay: false,
                        variableWidth: false,
                        infinite: true,
                        slidesToShow: 1,
                    }
                },
            ],
        });
        //팝업 끝

        //vr
        var $vr = $container.find('.vr'),
            $vrList = $vr.find('.vr_list.n1'),
            $vrListHtml = $vr.find('.vr_list').html(),
            $vrPrev = $vr.find('.vr_control .vr_prev'),
            $vrNext = $vr.find('.vr_control .vr_next'),
            $vrItem,
            last;

        $('.vr_list.n1').html($vrListHtml).find('.vr_off').remove();
        $vrList.after('<div class="vr_list n3"></div>');
        $('.vr_list.n3').html($vrListHtml).find('.vr_on').remove();
        $vrList.after('<div class="vr_list n2"></div>');
        $('.vr_list.n2').html($vrListHtml).find('.vr_on').remove();

        var $vrList2 = $vr.find('.vr_list.n2');
        var $vrList3 = $vr.find('.vr_list.n3');

        $vrList.slick({
            autoplay: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            variableWidth: false,
            centerPadding: '0',
            prevArrow: $vrPrev,
            nextArrow: $vrNext,
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

        $vrList2.slick({
            autoplay: false,
            draggable: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            dots: false,
            fade: false,
            initialSlide: 1,
        }).on('beforeChange', function (event, slick, current, next) {
            $vrList3.slick('slickGoTo', next + 1);
        });

        $vrList3.slick({
            autoplay: false,
            draggable: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            dots: false,
            fade: false,
            centerMode: false,
            variableWidth: false,
            initialSlide: 2,
        }).on('beforeChange', function (event, slick, current, next) {
            $vrList2.slick('slickGoTo', next);
        })


        $vrList.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $vrList2.slick('slickGoTo', nextSlide + 1);
            $vrList3.slick('slickGoTo', nextSlide + 2);
        });


    });
})(window.jQuery);

