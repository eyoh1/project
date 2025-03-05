'use strict';

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

                $('.visual_list a[href="#"]').click(function (e) {
                    e.preventDefault();
                });

                //여기서부터 코드 작성해주세요

                var $Visual = $('.visual'),
                    $VisualList = $('.visual .visual_list'),
                    $VisualBar = $('.visual .visual_wrap .visualbox .controlbox .controller .totalbar'),
                    $VisualVideo = $('.visual .visual_list .visual_item.video'),
                    $VisualVideoParent = $('.slick-slide.video_slick'),
                    VisualLength = $VisualList.find('.visual_item').length;

                $VisualList.on('init', function (event, slick, currentSlide) {
                    LoadingFirst();
                    var $currentslide = $(slick.$slides[0]);
                    $Visual.addClass('active').attr('data-active', '0');
                    $currentslide.addClass('active');
                    $VisualVideo.parents('.slick-slide').addClass('video_slick');

                });
                $VisualList.slick({
                    //기본
                    autoplay: true,
                    autoplaySpeed: 5000,
                    pauseOnHover: false,
                    swipe: false,
                    draggable: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                    infinite: true,
                    speed: 700,
                    fade: true,
                    prevArrow: $('.visual .controls .prev'),
                    nextArrow: $('.visual .controls .next'),
                    dots: false,

                    //추가 기능
                    autoArrow: $('.visual .controls .auto'),
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
                    },
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                variableWidth: false
                            }
                        },
                        {
                            breakpoint: 641,
                            settings: {
                                initialSlide : 1, //인덱스넘버1부터 보여지게

                                autoplay: true,
                                swipe: true,
                                draggable: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                variableWidth: false
                            }
                        }]
                });



                /*로딩 바 시작*/
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
                /*로딩 바 끝*/


                /*비디오 재생 시 슬릭 멈춤*/
                $Visual.on('beforeChange', function (event, slick, currentSlide) {
                    var $currentslide = $(slick.$slides[currentSlide]),
                        IsPlaying = $currentslide.find('.visual_item').is('.playing');
                    if (IsPlaying) {
                        var $video = $currentslide.find('video'),
                            IsPaused = $video.get(0).paused;
                        if (!IsPaused) {
                            $video.get(0).pause();
                        }
                        ;
                    }
                    ;
                });

                $Visual.find('video').on('play', function () {
                    $VisualList.slick('slickPause');
                    $('.visual .controlbox .auto').removeClass('slick-pause').addClass('slick-play').text('재생');
                    $(this).parents('.visual_item').addClass('playing');
                });
                $Visual.find('video').on('pause', function () {
                    $(this).parents('.visual_item').removeClass('playing');
                });




                //영상 컨트롤러
                $(".video_controller .ctl-btn").on("click", function() {
                    if($('.visual .visual_list video').length) {//비디오가 있을 때만 실행
                        if($(this).hasClass('is-paused')) {
                            //재생
                            $(this).removeClass('is-paused')
                            $(this).parents('.visual').find('video').get(0).play();
                            $(".blind", $(this)).text("영상 정지");
                        } else {
                            //정지
                            $(this).addClass('is-paused')
                            $(this).parents('.visual').find('video').get(0).pause();
                            $(".blind", $(this)).text("영상 재생");
                        }
                    }
                });

                /*메인비주얼 동영상 슬라이드 반응형에서 삭제*/
                $(window).on('load resize', function () {
                    if ($(window).width() < 641) {
                        $('.close_btn').click();
                        /* $VisualList.slick('slickRemove', true); /!*슬라이드 추가시 인덱스번호 수정필요*!/*/
                    };
                });

                
                //영상 삭제
                $(".close_btn").on("click", function() {
                    $VisualList.slick('slickRemove', 0); /*슬라이드 추가시 인덱스번호 수정필요*/
                    $('.popupbox_btn').click(); //영상 삭제시 사이드 팝업 나오게
                });




            });
        })(jQuery);
    }

} catch (e) {
    console.error(e);
}
