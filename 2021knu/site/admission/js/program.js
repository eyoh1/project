'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if (jQuery) {
        //$ 중복방지
        (function ($) {
            //태그객체
            var $window = $(window);

            $(function () {
                $window.on('screen:wide screen:web', function (event) {
                    window.mode = 'pc';
                });

                $window.on('screen:tablet screen:phone', function (event) {
                    $('.search_panel').hide();
                    window.mode = 'mobile';
                });

                $('.visual_main a[href="#"]').click(function (e) {
                    e.preventDefault();
                });


                //여기서부터 코드 작성해주세요
                var $VisualMain = $('.visual .visual_main'),
                    $VisualList = $('.visual .visual_main'),
                    viaualtotal = $('.visual .countbox .total'),
                    viaualcurrent = $('.visual .countbox .current');

                $VisualMain.slick({
                    //기본
                    autoplay: false,
                    speed: 200,
                    dots: true,
                    appendDots: $('.visual .thumbnail_box'),
                    dotsClass: "slick-dots",
                    swipe: true,
                    draggable: false,
                    fade: true,
                    infinite: true,
                    cssEase: 'linear',
                    arrows: true,
                    prevArrow: $('.visual .visual_control .prev'),
                    nextArrow: $('.visual .visual_control .next'),

                    autoArrow: $('.visual .control_box .auto'),
                    isRunOnLowIE: false,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    pauseText: '정지',
                    playText: '재생',
                    // asNavFor: '.visual .visual_main',
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true
                            }
                        }
                    ]
                });


                $('.open_box .open_btn').on('click', function (event) {
                    var $this = $(this),
                        Isinitialized = $('.visual_main').is('.slick-initialized');
                    if (Isinitialized) {
                        $('.visual_main').slick('unslick');
                        $('.visual .inner_box').addClass('open');
                        $('.visual_main').addClass('open');
                        $('.visual_control').addClass('open');
                        $('.open_box .open_btn').html('<span>넘겨보기</span>');
                    } else {
                        $('.visual .inner_box').removeClass('open');
                        $('.visual_main').removeClass('open');
                        $('.visual_control').removeClass('open');
                        $('.open_box .open_btn').html('<span>펼쳐보기</span>'),
                        $VisualMain.slick({
                            //기본
                            autoplay: false,
                            speed: 200,
                            dots: true,
                            appendDots: $('.visual .thumbnail_box'),
                            dotsClass: "slick-dots",
                            swipe: true,
                            draggable: false,
                            fade: true,
                            infinite: true,
                            cssEase: 'linear',
                            arrows: true,
                            prevArrow: $('.visual .visual_control .prev'),
                            nextArrow: $('.visual .visual_control .next'),

                            autoArrow: $('.visual .control_box .auto'),
                            isRunOnLowIE: false,
                            pauseOnArrowClick: true,
                            pauseOnDirectionKeyPush: true,
                            pauseOnSwipe: true,
                            pauseOnDotsClick: true,
                            pauseText: '정지',
                            playText: '재생',
                            responsive: [
                                {
                                    breakpoint: 1001,
                                    settings: {
                                        swipe: true,
                                        draggable: true
                                    }
                                }]
                        });
                    }
                    event.preventDefault();
                });


            });
        })(jQuery);
    }
} catch (e) {
    console.error(e);
}
