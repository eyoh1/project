
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function(){
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if(LayoutType=='normal'){
            if(scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        } else if(LayoutType=='visualtype'){
            if(scrollTop > ContainerOffset.top-150) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        }
        $window.on('scroll', function(event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if(LayoutType=='normal'){
                if(scrollTop > wrapperOffset.top) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            } else if(LayoutType=='visualtype'){
                if(scrollTop > ContainerOffset.top-150) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            }
        });




        //최신영상 게시판
        var $videoTabWrap = $('.video_wrap'),
            $videoTab = $videoTabWrap.find('.video_tab'),
            $videoTabNav = $videoTab.find('.tab_nav_list'),
            $videoTabNavItem = $videoTabNav.find('.tab_nav_item'),
            $videoTabNavBtn = $videoTabNavItem.find('.tab_btn'),
            $videoTabConWrap = $videoTabWrap.find('.tab_con_list'),
            $videoTabConItem = $videoTabConWrap.find('.tab_con_item'),
            $videoWrap = $('.video .tab_con_list .video_slide_wrap');

        //최신영상 탭
        $videoTabNavBtn.on('click.tab', function () {
            var $this = $(this),
                $thisIndex = $this.closest($videoTabNavItem).index() + 1,
                videoTabNavTitle = $this.data('title');
            $this.closest($videoTabNavItem).addClass('tab_nav_active').attr('title', videoTabNavTitle).siblings().removeClass('tab_nav_active').removeAttr('title');
            $videoTabConWrap.find($('.n' + $thisIndex)).addClass('tab_con_active').attr('title', videoTabNavTitle).siblings().removeClass('tab_con_active').removeAttr('title');
        });
        //최신영상 슬라이드
        $window.on('screen', function() {
            if ($(window).width() < 1001) {
                $videoWrap.each(function () {

                    var $this = $(this),
                        videoTitle = $this.closest($videoTabWrap).find('.tab_btn span').text(),
                        $videoSlide = $this.find('.video_slide_list'),
                        $videoCtrl = $this.find('.video_ctrl'),
                        $videoDots = $videoCtrl.find('.dots'),
                        $videoPrev = $videoCtrl.find('.prev'),
                        $videoPause = $videoCtrl.find('.pause'),
                        $videoNext = $videoCtrl.find('.next');

                    $videoTabNavBtn.on('click.slide', function () {
                        $videoSlide.slick('setPosition');
                    });


                    $videoSlide.slick({
                        //기본
                        autoplay: false,
                        swipe: true,
                        draggable: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                        variableWidth: false,
                        centerMode: false,
                        accessibility: true,
                        autoArrow: false,
                        dots:true,
                        appendDots:$videoDots,
                        prevArrow: $videoPrev,
                        nextArrow: $videoNext,
                        //추가 기능
                        isRunOnLowIE: false,
                        pauseOnArrowClick: true,
                        pauseOnDirectionKeyPush: true,
                        pauseOnSwipe: true,
                        pauseOnDotsClick: true,
                        responsive: [{
                            breakpoint: 641,
                            settings: {
                                slidesToShow: 2,
                               /* variableWidth: true,*/
                                autoplay: false,
                                swipe: true,
                                draggable: true,
                                swipeToSlide: true
                            }
                        }]
                    });
                    playToggle($videoSlide, $videoPause, videoTitle);


                });
            }
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





        $window.on('screen:tablet screen:phone', function(event) {

        });
    });



})(jQuery);