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
                //챗봇에게 문의
                $('.counsel_box ul li:last-child').on('click', function () {
                    alert(' 준비중 입니다.')
                });
                //푸터 - 웹마스터
                $('.footer_nav ul li:nth-child(4)').on('click', function () {
                    alert(' 준비중 입니다.')
                });




				var $wrapper = $('#wrapper');
				var scrollTop = $window.scrollTop(),
					ContainerOffset = $('#container').offset();
				if(scrollTop > ContainerOffset.top) {
					$wrapper.attr('data-nowtop', 'nontop');
				}else{
					$wrapper.attr('data-nowtop', 'top');
				};
				$window.on('scroll', function(event) {
					var scrollTop = $window.scrollTop(),
						ContainerOffset = $('#container').offset(),
						wrapperIsActive = $wrapper.is('[data-nowtop="top"]');
					if(scrollTop > ContainerOffset.top) {
						if(wrapperIsActive){
							$wrapper.attr('data-nowtop', 'nontop');
						};
					}else{
						$wrapper.attr('data-nowtop', 'top');
					};
				});
                /*반응형 바로가기 메뉴 스크롤*/
                $('.gw_quick_box').scroll(function(){
                    var scrL= $('.gw_quick_box').scrollLeft();
                    if(scrL == $('.gw_quick_box ul').width() - $('.gw_quick_box').width()){
                        $('.gw_quick_box').addClass('end');
                    } else {
                        $('.gw_quick_box').removeClass('end');
                    }
                });

                /*전화번호탭ㅃ*/
                $('.telephone_box .tabbtn').on('click', function () {
                    var $this = $(this),
                        $MyParent = $this.parent('li'),
                        IsActive = $MyParent.is('.active'),
                        ParentIndex = $MyParent.index(),
                        $OtherParents = $MyParent.siblings('li'),
                        $OtherBtns = $OtherParents.find('.tabbtn'),
                        $TabContent = $this.siblings('.tabcontent');
                    if (!IsActive) {
                        $OtherParents.removeClass('active');
                        $OtherBtns.removeAttr('title');
                        $MyParent.addClass('active');
                        $this.attr('title', '선택됨');
                    }
                });


                /* 알림존 */
                var $notificationZone = $('.notification_zone'),
                    $notificationOpen = $notificationZone.find('.notification_open'),
                    $notificationClose = $notificationZone.find('.notification_close');

                $notificationOpen.on('click', function (event) {
                    $notificationZone.toggleClass('active');
                    $html.addClass('notification_open');
                });
                $notificationClose.on('click', function (event) {
                    $notificationZone.removeClass('active');
                    $html.removeClass('notification_open');
                });
                /* //따라다니는 배너
                 $(window).scroll(function() {
                     var scrollTop = $(window).scrollTop();

                     if (scrollTop > 400){
                         $(".notification_zone").addClass("fix_on");
                     }else {
                         $(".notification_zone").removeClass("fix_on");
                     }
                 }).scroll();*/


                //뉴스 게시판
                var $newsTabWrap = $('.news_wrap'),
                    $newsTab = $newsTabWrap.find('.news_tab'),
                    $newsTabNav = $newsTab.find('.tab_nav_list'),
                    $newsTabNavItem = $newsTabNav.find('.tab_nav_item'),
                    $newsTabNavBtn = $newsTabNavItem.find('.tab_btn'),
                    $newsTabConWrap = $newsTabWrap.find('.tab_con_list'),
                    $newsTabConItem = $newsTabConWrap.find('.tab_con_item'),
                    $newsWrap = $('.news .tab_con_list .news_slide_wrap');

                //뉴스 탭
                $newsTabNavBtn.on('click.tab', function () {
                    var $this = $(this),
                        $thisIndex = $this.closest($newsTabNavItem).index() + 1,
                        newsTabNavTitle = $this.data('title');
                    $this.closest($newsTabNavItem).addClass('tab_nav_active').attr('title', newsTabNavTitle + ' 활성화').siblings().removeClass('tab_nav_active').removeAttr('title');
                    $newsTabConWrap.find($('.n' + $thisIndex)).addClass('tab_con_active').attr('title', newsTabNavTitle + ' 콘텐츠 활성화').siblings().removeClass('tab_con_active').removeAttr('title');
                });
                //뉴스 슬라이드
                $newsWrap.each(function () {
                    var $this = $(this),
                        newsTitle = $this.closest($newsTabWrap).find('.tab_btn span').text(),
                        $newsSlide = $this.find('.news_slide_list'),
                        $newsCtrl = $this.find('.news_ctrl'),
                        $newsPrev = $newsCtrl.find('.prev'),
                        $newsPause = $newsCtrl.find('.pause'),
                        $newsNext = $newsCtrl.find('.next');

                    $newsTabNavBtn.on('click.slide', function () {
                        $newsSlide.slick('setPosition');
                    });

                    $newsSlide.slick({
                        //기본
                        autoplay: false,
                        swipe: false,
                        draggable: false,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true,
                        vertical: true,
                        centerPadding: '0 0 400px',
                        variableWidth: false,
                        centerMode: false,
                        accessibility: true,
                        autoArrow: false,
                        prevArrow: $newsPrev,
                        nextArrow: $newsNext,
                        //추가 기능
                        isRunOnLowIE: false,
                        pauseOnArrowClick: true,
                        pauseOnDirectionKeyPush: true,
                        pauseOnSwipe: true,
                        pauseOnDotsClick: true,
                        responsive: [{
                            breakpoint: 1241,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 2,
                                swipeToSlide: true
                            }
                        }, {
                            breakpoint: 901,
                            settings: {
                                swipe: true,
                                draggable: true,
                                slidesToShow: 1,
                                swipeToSlide: true
                            }
                        }, {
                            breakpoint: 641,
                            settings: {
                                slidesToShow: 5,
                                autoplay: false,
                                swipe: true,
                                draggable: true,
                                swipeToSlide: true
                            }
                        }]
                    });
                    playToggle($newsSlide, $newsPause, newsTitle);

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

                //공식 sns
                var $biz = $('.biz_wrap'),
                    $bizNav = $biz.find('.biz_nav'),
                    $bizInner = $biz.find('.biz_inner'),
                    $bizInnerBtn = $bizInner.find('.vertical_move'),
                    $bizNavWrap = $bizNav.find('.biz_nav_wrap'),
                    $bizNavBtn = $bizNav.find('.tab_btn'),
                    $bizCon = $biz.find('.biz_con'),
                    $bizSlide = $bizCon.find('.biz_slide'),
                    $bizItem = $bizCon.find('.biz_slide_item');



                //공식 sns- 탭
                var $tabConWrap = $('.biz_con_wrap'),
                    $tabCon = $tabConWrap.find('.biz_con'),
                    $tabSlideItem = $tabCon.find('.biz_slide_item'),
                    $tabConSlide = $tabCon.find('.biz_slide'),
                    $thisBizCtrl = $tabCon.find('.biz_ctrl'),
                    $thisBizPrev = $thisBizCtrl.find('.prev'),
                    $thisBizNext = $thisBizCtrl.find('.next'),
                    $thisBizDots = $thisBizCtrl.find('.biz_bar');
                  /*  $thisBizAuto = $thisBizCtrl.find('.auto');*/


                $tabConSlide.slick({
                    autoplay: true,
                    swipe: true,
                    draggable: true,
                    slidesToShow: 4,
                    autoplaySpeed: 2000,
                    vertical: false,
                    variableWidth: true,
                    centerMode: false,
                    infinite: true,
                    prevArrow: $thisBizPrev,
                    nextArrow: $thisBizNext,
                    dots: true,
                    appendDots: $thisBizDots,
                    swipeToSlide: true,
                  /*  autoArrow: $thisBizAuto,
                    pauseText: '슬라이드 정지',
                    playText: '슬라이드 재생',*/

                    //추가 기능
                    autoArrow : $('.biz_con .biz_ctrl .auto'),
                    isRunOnLowIE : false,
                    pauseOnArrowClick : true,
                    pauseOnDirectionKeyPush : true,
                    pauseOnSwipe : true,
                    pauseOnDotsClick : true,
                    pauseText : '정지',
                    playText : '재생',

                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                autoplay: true,
                                swipe: true,
                                draggable: true,
                                slidesToShow: 1,
                                swipeToSlide: true
                            }
                        }, {
                            breakpoint: 641,
                            settings: {
                                autoplay: false,
                                slidesToShow: 1,
                                swipeToSlide: true
                            }
                        }]
                });

                //section animation
                $(window).on('scroll', function () {
                    var scrollTop = $(window).scrollTop(),
                        winBottom = scrollTop + $(window).height(),
                        $section = $('section');
                    $section.each(function () {
                        var $this = $(this),
                            thisBottom = $this.offset().top + $this.outerHeight();
                        $this.attr('data-on', winBottom > (thisBottom / 1.2) ? 'on' : 'off');
                    });
                });

            });
        })(jQuery);
    }
} catch (e) {
    console.error(e);
}
