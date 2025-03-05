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


        /*비주얼 팝업*/
        var $Popup = $container.find('.visual_popup'),
            $PopupList = $Popup.find('.popup_list'),
            $PopupItem = $Popup.find('.popup_item'),
            $popuptotal = $Popup.find('.popup_control .count_box .total'),
            $popupcurrent = $Popup.find('.popup_control .count_box .current'),
            $PopupAuto = $Popup.find('.popup_control .count_box .auto'),
            $progress =  $Popup.find('.popup_control .count_box .progress'),
            popupListHtml = $PopupList.html(),
            $popupAllList =  $Popup.find('.slick_all_list'),
            $popupAllCurrent =  $Popup.find('.slick_all_current'),
            $popupAllTotal =  $Popup.find('.slick_all_total'),
            $popupAllPrev =  $Popup.find('.slick_all_prev'),
            $popupAllNext =  $Popup.find('.slick_all_next'),
            $popupAllMore =  $Popup.find('.slick_all_more'),
            $popupAllClose =  $Popup.find('.slick_all_close');

        $popupAllList.html(popupListHtml);
        $popupAllList.slick({
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3,
            rows: 2,
            infinite: false,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 5000,
            pauseOnHover: false,
            prevArrow: $popupAllPrev,
            nextArrow: $popupAllNext,
            dots: true,
            current: $popupAllCurrent,
            total: $popupAllTotal,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        rows: 2,
                    }
                },
            ],
            customState : function(state) {
                var slidestoshow = $popupAllList.slick('getSlick').options.slidesToShow,
                    current = Math.ceil(state.current / slidestoshow),
                    total = Math.ceil(state.total / slidestoshow);

                state.current = current;
                state.total = total;

                return state;
            },
        });

        $popupAllMore.on('click',function(){
            $('html').addClass('popup_open');
        });
        $popupAllClose.on('click',function(){
            $('html').removeClass('popup_open');
        });

        $PopupList.slick({
            //기본
            autoplay: true,
            dots: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            autoplaySpeed: 4000,
            variableWidth: false,
            infinite: true,
            prevArrow: $('.visual_popup .popup_control .prev'),
            nextArrow: $('.visual_popup .popup_control .next'),

            //추가 기능
            autoArrow: $PopupAuto,
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseOnDotsClick: true,
            pauseText: '정지',
            playText: '재생',
            total: $popuptotal,
            current:$popupcurrent,
            customState : function(state) {
                var slidesToShow = $PopupList.slick('getSlick').options.slidesToShow,
                    current = Math.ceil(state.current / slidesToShow),
                    total = Math.ceil(state.total / slidesToShow);
                if (current < 10) {
                    state.current = '0' + current;
                }
                if (total < 10) {
                    state.total = '0' + total;
                }
                return state;
            }
        }).on("beforeChange", function() {
            $progress.removeClass('on');
        }).on('afterChange', function(event, slick, currentSlide){
            $progress.addClass('on');
            $PopupItem.removeClass('active');
            $(this).find('.visual_item').eq(currentSlide).addClass('active');
        });
        $PopupItem.eq(0).addClass('active');
        $PopupAuto.on('click', function(){
            if($(this).hasClass('slick-pause')){
                $Popup.removeClass('pause');
            } else {
                $Popup.addClass('pause');
            }
        });
        //팝업 끝

        $('.goto').scroll(function(){
            var scrL= $('.goto').scrollLeft();
            if(scrL == $('.goto .goto_list').width() - $('.goto').width()){
                $('.goto').addClass('end');
            } else {
                $('.goto').removeClass('end');
            }
        });




        //게시판 게시판
        var $boardTabWrap = $('.board'),
            $boardTab = $boardTabWrap.find('.board_tab'),
            $boardTabNav = $boardTab.find('.tab_nav_list'),
            $boardTabNavItem = $boardTabNav.find('.tab_nav_item'),
            $boardTabNavBtn = $boardTabNavItem.find('.tab_btn'),
            $boardTabConWrap = $boardTabWrap.find('.tab_con_list'),
            $boardTabConItem = $boardTabConWrap.find('.tab_con_item'),
            $boardWrap = $('.board .tab_con_list .board_slide_wrap');

        //게시판 탭
        $boardTabNavBtn.on('click.tab', function () {
            var $this = $(this),
                $thisIndex = $this.closest($boardTabNavItem).index() + 1,
                boardTabNavTitle = $this.data('title');
            $this.closest($boardTabNavItem).addClass('tab_nav_active').attr('title', boardTabNavTitle).siblings().removeClass('tab_nav_active').removeAttr('title');
            $boardTabConWrap.find($('.n' + $thisIndex)).addClass('tab_con_active').attr('title', boardTabNavTitle).siblings().removeClass('tab_con_active').removeAttr('title');


        });


        //게시판 슬라이드
        $boardWrap.each(function () {
            var $this = $(this),
                boardTitle = $this.closest($boardTabWrap).find('.tab_btn span').text(),
                $boardSlide = $this.find('.board_slide_list'),
                $boardCtrl = $this.find('.board_ctrl'),
                $boardPrev = $boardCtrl.find('.prev'),
                $boardPause = $boardCtrl.find('.pause'),
                $boardNext = $boardCtrl.find('.next');

            $boardTabNavBtn.on('click.slide', function () {
                $boardSlide.slick('setPosition');
            });

            function boardSlide() {
                if ($(window).width() > 640) {
                    $boardSlide.slick({
                        //기본
                        autoplay: false,
                        swipe: true,
                        draggable: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        variableWidth: true,
                        centerMode: false,
                        accessibility: true,
                        autoArrow: false,
                        dots: false,
                        prevArrow: $boardPrev,
                        nextArrow: $boardNext,
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
                                draggable: false,
                                slidesToShow: 3,
                                swipeToSlide: false
                            }
                        }, {
                            breakpoint: 1001,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                swipeToSlide: true,
                                dots: true
                            }
                        }]
                    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                        if (currentSlide !== nextSlide) {
                            $('.slick-active + .slick-cloned').each(function(index, node) {
                                var $node = $(node);
                                setTimeout(function() {
                                    $node.addClass('slick-current');
                                    $node.addClass('slick-active');
                                });
                            });
                        }
                    }); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.

                } else {
                    $boardSlide.slick('unslick');
                }
            }

            boardSlide();
            $window.on('resize', function () {
                boardSlide();
            });
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

        //게시판 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);
