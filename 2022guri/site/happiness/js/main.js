(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function () {
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if (LayoutType == 'normal') {
            if (scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            } else {
                $wrapper.attr('data-nowtop', 'top');
            }
            ;
        } else if (LayoutType == 'visualtype') {
            if (scrollTop > ContainerOffset.top - 150) {
                $wrapper.attr('data-nowtop', 'nontop');
            } else {
                $wrapper.attr('data-nowtop', 'top');
            }
            ;
        }
        $window.on('scroll', function (event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if (LayoutType == 'normal') {
                if (scrollTop > wrapperOffset.top) {
                    if (headerIsActive) {
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                    ;
                } else {
                    $wrapper.attr('data-nowtop', 'top');
                }
                ;
            } else if (LayoutType == 'visualtype') {
                if (scrollTop > ContainerOffset.top - 150) {
                    if (headerIsActive) {
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                    ;
                } else {
                    $wrapper.attr('data-nowtop', 'top');
                }
                ;
            }
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
            $VisualBar = $('.visual .visual_wrap .visualbox .controlbox .controller .totalbar'),
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
            /*  customState : function(state) {
                  //현재 슬라이드 위치가 10보다 작을 때
                  if(state.current < 10) {
                      state.current = '0' + state.current;
                  }
                  //슬라이드 갯수가 10보다 작을 때
                  if(state.total < 10) {
                      state.total = '0' + state.total;
                  }
                  return state;
              },*/
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: false,
                        fade: false,
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: false
                    }
                }]
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

        //팝업 시작
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
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        autoplay: false,
                        arrows: false,
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }, {
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


        //교육프로그램 게시판
        var $educationTabWrap = $('.education_wrap'),
            $educationTab = $educationTabWrap.find('.education_tab'),
            $educationTabNav = $educationTab.find('.tab_nav_list'),
            $educationTabNavItem = $educationTabNav.find('.tab_nav_item'),
            $educationTabNavBtn = $educationTabNavItem.find('.tab_btn'),
            $educationTabConWrap = $educationTabWrap.find('.tab_con_list'),
            $educationTabConItem = $educationTabConWrap.find('.tab_con_item'),
            $educationWrap = $('.education .tab_con_list .education_slide_wrap');

        //교육프로그램 탭
        $educationTabNavBtn.on('click.tab', function () {
            var $this = $(this),
                $thisIndex = $this.closest($educationTabNavItem).index() + 1,
                educationTabNavTitle = $this.data('title');
            $this.closest($educationTabNavItem).addClass('tab_nav_active').attr('title', educationTabNavTitle).siblings().removeClass('tab_nav_active').removeAttr('title');
            $educationTabConWrap.find($('.n' + $thisIndex)).addClass('tab_con_active').attr('title', educationTabNavTitle).siblings().removeClass('tab_con_active').removeAttr('title');


        });



        //교육프로그램 슬라이드
        $educationWrap.each(function () {
            var $this = $(this),
                educationTitle = $this.closest($educationTabWrap).find('.tab_btn span').text(),
                $educationSlide = $this.find('.education_slide_list'),
                $educationCtrl = $this.find('.education_ctrl'),
                $educationPrev = $educationCtrl.find('.prev'),
                $educationPause = $educationCtrl.find('.pause'),
                $educationNext = $educationCtrl.find('.next');

            $educationTabNavBtn.on('click.slide', function () {
                $educationSlide.slick('setPosition');
            });

            $educationSlide.slick({
                //기본
                autoplay: false,
                swipe: true,
                draggable: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                variableWidth: true,
                centerMode: false,
                accessibility: true,
                autoArrow: false,
                dots:false,
                prevArrow: $educationPrev,
                nextArrow: $educationNext,
                //추가 기능
                isRunOnLowIE: false,
                pauseOnArrowClick: true,
                pauseOnDirectionKeyPush: true,
                pauseOnSwipe: true,
                pauseOnDotsClick: true,
                responsive: [{
                    breakpoint: 1401,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 3,
                        swipeToSlide: true
                    }
                }, {
                    breakpoint: 1001,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        swipeToSlide: true,
                        dots:true
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        swipe: true,
                        draggable: true,
                        infinite: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        swipeToSlide: true,
                        dots:true
                    }
                }]
            });
            playToggle($educationSlide, $educationPause, educationTitle);

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

        //교육프로그램 끝

        /*교육프로그램 메뉴 스크롤*/
        $('.education .education_content .education_tab').scroll(function(){
            var scrL= $('.education .education_content .education_tab').scrollLeft();
            if(scrL == $('.education .education_content .education_tab .tab_nav_list').width() - $('.education .education_content .education_tab').width()){
                $('.education .education_content .education_tab').addClass('end');
                $('.education .education_content').addClass('end');
            } else {
                $('.education .education_content .education_tab').removeClass('end');
                $('.education .education_content').removeClass('end');
            }
        });


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });


})(jQuery);