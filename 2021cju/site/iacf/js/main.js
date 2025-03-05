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

                $('.visual_list a[href="#"]').click(function (e) {
                    e.preventDefault();
                });


                //여기서부터 코드 작성해주세요
                var $VisualMain = $('.visual .visual_main'),
                    $VisualList = $('.visual .visual_list'),
                    viaualtotal = $('.visual .countbox .total'),
                    viaualcurrent = $('.visual .countbox .current');

                $VisualMain.slick({
                    //기본
                    autoplay: true,
                    speed: 400,
                    autoplaySpeed: 5000,
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
                    // asNavFor: '.visual .visual_list',
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true
                            }
                        }
                        /* {
                             breakpoint: 641,
                             settings: {
                                 fade :false,
                                 centerMode :true,
                                 centerPadding: '20px',
                                 speed: 700,
                                 swipe : true,
                                 draggable : true
                             }
                         },*/
                    ]
                });

                $VisualList.slick({
                    //기본
                    autoplay: false,
                    dots: false,
                    swipe: false,
                    draggable: false,
                    variableWidth: true,
                    initialSlide: 1,
                    arrows: false,
                    // asNavFor: '.visual .visual_main',
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true
                            }
                        }]
                });

                $('.visual .visual_list .visual_item').click(function () {
                    var visualListNo = $(this).index();
                    $VisualMain.slick('slickGoTo', visualListNo - 1);
                    $VisualList.slick('slickGoTo', visualListNo);
                });

                $VisualList.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    var slideNo = $(this).index();
                    $VisualMain.slick('slickGoTo', currentSlide);
                });
                $VisualMain.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    $VisualList.slick('slickGoTo', nextSlide + 1);
                });


                //slick playBtn toggle
                function playToggle(slide, pauseBtn, slideName) {
                    pauseBtn.on('click', function (e) {
                        var self = $(this),
                            isPlay = self.hasClass('pause');
                        if (isPlay) {
                            self.removeClass('pause').addClass('play').html('<span>' + slideName + ' 재생</span>');
                            slide.slick('slickPause');
                        } else {
                            self.removeClass('play').addClass('pause').html('<span>' + slideName + ' 멈춤</span>');
                            slide.slick('slickPlay');
                        }
                        e.preventDefault();
                    });
                }


                //공지사항 탭메뉴 시작
                $('.board .inner_box .board_list .board_item .board_tab_btn').on('click', function () {
                    var $this = $(this),
                        $Parent = $this.parent('.board_item'),
                        Index = $Parent.index(),
                        $ParentF = $Parent.siblings('.board_item'),
                        $ParentFbtn = $ParentF.find('.board_tab_btn'),
                        $GrandParent = $Parent.parent('.board_list'),
                        $GGrandParent = $GrandParent.parents('.inner_box'),
                        $OtherParent = $GGrandParent.find('.board_content'),
                        $OtherParentC = $OtherParent.find('.board_wrap').eq(Index),
                        $OtherParentCsiblings = $OtherParentC.siblings('.board_wrap'),
                        IsActive = $Parent.is('.active');
                    if (!IsActive) {
                        $Parent.addClass('active');
                        $ParentF.removeClass('active');
                        $this.attr('title', '선택됨');
                        $ParentFbtn.removeAttr('title');
                        $OtherParentC.addClass('active');
                        $OtherParentCsiblings.removeClass('active');
                    }
                });
                //공지사항 탭메뉴 끝

                //공지사항 슬라이드
                var $social_slide = $('.notice_box .slide_list');

                $social_slide.slick({
                    autoplay: true,
                    dots: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    variableWidth: true,
                    prevArrow: $('.notice_box .slide_control .prev'),
                    nextArrow: $('.notice_box .slide_control .next'),
                    pauseOnDotsHover: true,
                    swipe: false,
                    draggable: false,
                    //추가 기능
                    autoArrow: $('.notice_box .slide_control .auto'),
                    isRunOnLowIE: false,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    pauseText: '정지',
                    playText: '재생',
                    responsive: [
                        {
                            breakpoint: 1241,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                variableWidth: true
                            }
                        },
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                variableWidth: true
                            }
                        },
                        {
                            breakpoint: 801,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                variableWidth: true
                            }
                        },
                        {
                            breakpoint: 521,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                variableWidth: true,
                                centerMode: true
                            }
                        }]
                });


                //정부재정지원 사업단
                var $Introduce = $('.introduce .introduce_list');
                $Introduce.slick({
                    //기본

                    autoplay: false,
                    dots: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    variableWidth: true,
                    prevArrow: $('.introduce .introduce_control .prev'),
                    nextArrow: $('.introduce .introduce_control .next'),
                    pauseOnDotsHover: true,
                    swipe: false,
                    draggable: false,

                    //추가 기능
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                variableWidth: true
                            }
                        },
                        {
                            breakpoint: 641,
                            settings: {
                                slidesToShow:1,
                                variableWidth: false,
                                swipe: false,
                                draggable: false,
                                dots: false,
                                focusOnSelect: true,
                                centerMode: true,
                                fade: false,
                                accessibility: true,
                                infinite: true,
                                autoArrow: false,
                                slidesToScroll: 1,
                                centerPadding: '0 0 170px',
                                vertical:true
                            }
                        }]
                });


            });
        })(jQuery);
    }
} catch (e) {
    console.error(e);
}
