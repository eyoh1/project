(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $container = $('#container');

        /* visual */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualItem = $visual.find('.visual_item'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal =  $visual.find('.visual_total'),
            $visualAuto =  $visual.find('.visual_auto'),
            $visualPrev =  $visual.find('.visual_prev'),
            $visualNext =  $visual.find('.visual_next'),
            $visualProgress =  $visual.find('.progress'),
            visualSlickOpt = {
                slidesToShow: 1,
                autoplay: true,
                infinite:false,
                current: $visualCurrent,
                total: $visualTotal,
                playText: '재생',
                pauseText: '정지',
                autoArrow: $visualAuto,
                prevArrow: $visualPrev,
                nextArrow: $visualNext,
                fade: true,
                pauseOnFocus: false,
                pauseOnHover: false,
                speed: 1000,
                autoplaySpeed: 8000,
                zIndex:1,
                customState : function(state) {
                    var slidestoshow = $visualList.slick('getSlick').options.slidesToShow,
                        current = Math.ceil(state.current / slidestoshow),
                        total = Math.ceil(state.total / slidestoshow);

                    if(current < 10) {
                        state.current = '0' + current;
                    }
                    if(total < 10) {
                        state.total = '0' + total;
                    }
                    return state;
                }
            };

        setTimeout(function(){
            $html.addClass('visual_active');
        }, 750);

        $visualList.slick(visualSlickOpt).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $currentSlide = $(slick.$slides[currentSlide]),
                $nextSlide = $(slick.$slides[nextSlide]);

            $currentSlide.removeClass('active');
            $nextSlide.addClass('active');
            $visualProgress.removeClass('on');
        }).on('afterChange', function(event, slick, current, next){
            var $currentSlide = $(slick.$slides[current]),
                $nextSlide = $(slick.$slides[next]);

            $currentSlide.addClass('active');
            $nextSlide.removeClass('active');
            $visualProgress.addClass('on');

            var _last = slick.slideCount - slick.options.slidesToShow

            if (_last === current) {
                $visualList.slick('slickPause');

                setTimeout(function() {
                    $visualList.slick('slickGoTo', 0, false);

                    setTimeout(function() {
                        $visualList.slick('unslick');
                        $visualList.slick(visualSlickOpt);
                        $visualList.slick('slickPlay');
                        $visualList.slick('slickGoTo', 1, false);
                    }, $visualList.slick('slickGetOption', 'autoplaySpeed'));

                }, $visualList.slick('slickGetOption', 'autoplaySpeed'));
            }
        });
        $visualItem.eq(0).addClass('active');
        $visualAuto.on('click', function(){
            if($(this).hasClass('slick-pause')){
                $visual.removeClass('pause');
            } else {
                $visual.addClass('pause');
            }
        });

        /* 프로그램 예약 */
        var $program = $container.find('.program'),
            $programTabButton = $program.find('.tab_button'),
            $programTabPanel = $program.find('.program_panel'),
            $programSlickOpt = {
                slidesToShow  : 3,
                slidesToScroll: 1,
                speed         : 800,
                infinite      : false,
                arrow         : true,
                prevArrow     : $program.find('.program_prev'),
                nextArrow     : $program.find('.program_next'),
                autoplay      : false,
                draggable: false,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1401,
                        settings: {
                            slidesToShow  : 2,
                        }
                    },
                    {
                        breakpoint: 721,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 1,
                            draggable: true,
                            arrow: false,
                        }
                    }
                ]
            };

        $('.program .program_panel.active .program_list').slick($programSlickOpt);

        $programTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $programTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

            $programTabPanel.each(function () {
                $(this).find('.program_list').slick('unslick');

                $programTabPanel.eq(parentIndex).find('.program_list').slick($programSlickOpt).slick('setPosition').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    var slideLength = $('.program .program_panel.active .program_item:not(.slick-cloned)').length - 1,
                        slideActiveLength = $('.program .program_panel.active .program_item.slick-active').length - 1;

                    //console.log(slideActiveLength);

                    $(this).find('.program_item').removeClass('active');
                    $(this).find('.program_item').removeClass('hide');
                    if(nextSlide > currentSlide){
                        $('.program_item.slick-active').eq(slideActiveLength).next().attr('tabindex','0').addClass('active');
                    }else{
                        $('.program_item.slick-active').eq(0).prev().attr('tabindex','0').addClass('active');
                    }
                    if (nextSlide == 0) {
                        $('.program_item.slick-active').eq(slideActiveLength).next().addClass('active');
                    }
                    if (currentSlide == 0) {
                        $('.program_item.slick-active').eq(0).prev().addClass('active');
                    }
                    if(currentSlide > nextSlide && currentSlide != 0 || currentSlide == 0 && nextSlide == slideLength){
                        $('.program_item.slick-active').eq(slideActiveLength).addClass('hide');
                        if(currentSlide == slideLength && nextSlide == 0){
                            $('.program_item.slick-active').eq(slideActiveLength).removeClass('hide');
                        }else if(currentSlide == 1 && nextSlide == 0 || currentSlide == 0 && nextSlide == slideLength){
                            $('.program_item.slick-active').eq(slideActiveLength).next().addClass('hide');
                        }else if(currentSlide == 0 && nextSlide == slideLength){
                            $('.program_item:last-child').addClass('hide');
                        }
                    }
                }).on('afterChange', function(event, slick, currentSlide, nextSlide){
                    $(this).find('.program_item').removeClass('hide');
                });
            })
        });

        $('.program .tab_item.active .tab_button').trigger('click');


        /* 배너 */
        var $commonBanner = $container.find('.common_banner'),
            $commonBannerList = $commonBanner.find('.banner_list'),
            $commonBannerAuto =  $commonBanner.find('.banner_auto'),
            $commonBannerPrev =  $commonBanner.find('.banner_prev'),
            $commonBannerNext =  $commonBanner.find('.banner_next'),
            visualListHtml = $commonBannerList.html(),
            $visualAllList =  $commonBanner.find('.slick_all_list'),
            $visualAllCurrent =  $commonBanner.find('.slick_all_current'),
            $visualAllTotal =  $commonBanner.find('.slick_all_total'),
            $visualAllPrev =  $commonBanner.find('.slick_all_prev'),
            $visualAllNext =  $commonBanner.find('.slick_all_next'),
            $visualAllMore =  $commonBanner.find('.slick_all_more'),
            $visualAllClose =  $commonBanner.find('.slick_all_close'),
            commonBannerSlickOpt = {
                slidesToShow : 1,
                autoplay     : true,
                infinite     : false,
                playText     : '재생',
                pauseText    : '정지',
                autoArrow    : $commonBannerAuto,
                prevArrow    : $commonBannerPrev,
                nextArrow    : $commonBannerNext,
                fade         : false,
                speed        : 500,
                autoplaySpeed: 3500
            };

        $visualAllList.html(visualListHtml);
        $visualAllList.slick({
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 4,
            rows: 1,
            infinite: false,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 5000,
            pauseOnHover: false,
            prevArrow: $visualAllPrev,
            nextArrow: $visualAllNext,
            dots: true,
            current: $visualAllCurrent,
            total: $visualAllTotal,
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
                var slidestoshow = $visualAllList.slick('getSlick').options.slidesToShow,
                    current = Math.ceil(state.current / slidestoshow),
                    total = Math.ceil(state.total / slidestoshow);

                state.current = current;
                state.total = total;

                return state;
            },
        });

        $visualAllMore.on('click',function(){
            $('html').addClass('visual_open');
            $visualAllList.slick('setPosition');
        });
        $visualAllClose.on('click',function(){
            $('html').removeClass('visual_open');
        });

        $commonBannerList.slick(commonBannerSlickOpt).on('afterChange', function(event, slick, current){
            var _last = slick.slideCount - slick.options.slidesToShow

            if (_last === current) {
                $commonBannerList.slick('slickPause');

                setTimeout(function() {
                    $commonBannerList.slick('slickGoTo', 0, false);

                    setTimeout(function() {
                        $commonBannerList.slick('unslick');
                        $commonBannerList.slick(commonBannerSlickOpt);
                        $commonBannerList.slick('slickPlay');
                        $commonBannerList.slick('slickGoTo', 1, false);
                    }, $commonBannerList.slick('slickGetOption', 'autoplaySpeed'));

                }, $commonBannerList.slick('slickGetOption', 'autoplaySpeed'));
            }
        });

        /* 보드 */
        var $board = $container.find('.board'),
            $boardScroll = $board.find('.board_scroll'),
            $boardTab = $board.find('.board_tab'),
            $boardBtn = $boardTab.find('button'),
            $boardPanel = $board.find('.board_panel'),
            $boardList = $boardPanel.find('.board_list'),
            $boardItem = $boardPanel.find('.board_item'),
            boardSlickOption = {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                draggable: false,
                swipe: false,
                variableWidth: false,
                arrows : false,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1401,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: false,
                            draggable: true,
                            swipe: true,
                            //variableWidth: true,
                        }
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: false,
                            draggable: true,
                            swipe: true,
                            variableWidth: true,
                        }
                    }
                ]
            },
            boardEmptyHtml = '<div class="board_empty">\n' +
                '	<p>등록된 데이터가 없습니다.</p>\n' +
                '</div>';

        $board.find('.board_more').attr('href','#n');
        $boardBtn.on('click',function(){
            var thisType = $(this).attr('data-type'),
                thisText = $(this).text(),
                thisIdx = $(this).parent().index();

            if(thisText === '알림 모아보기'){
                thisText = '전체'
            }
            $boardBtn.removeAttr('title');
            $(this).attr('title','선택됨').parent().addClass('active').siblings().removeClass('active');
            $boardPanel.find('.skip').text(thisText + ' 목록');
            $board.find('.board_more').text(thisText + ' 더보기');
            $boardItem.removeClass('active last');
            /*if(thisType === 'all'){
                $boardPanel.find('.board_item:nth-child(-n+3)').addClass('active');
            }else{
                $boardPanel.find('.board_item.' + thisType).addClass('active');
            }*/
          /*  $boardPanel.find('.board_item.active').eq(2).addClass('last');*/
            if(thisIdx === 0){
                $board.find('.board_more').attr('href','#n');
            }else if(thisIdx === 1){
                $board.find('.board_more').attr('href','#n');
            }else if(thisIdx === 2){
                $board.find('.board_more').attr('href','#n');
            }else if(thisIdx === 3){
                $board.find('.board_more').attr('href','#n');
            }
           /* $boardList.find('.board_item.slick-active').hide()
            if( $boardList.find('.board_item.slick-active').hasClass('active') ){
                $boardList.find('.board_item.active').show();
            }
            $boardList.find('.board_item.slick-active .board_anchor').attr('tabindex', '-1')
            $boardList.find('.board_item.active .board_anchor').attr('tabindex', '0');
            $boardList.find('.board_item').removeAttr('title');
            $boardList.find('.board_item.active').attr('title', '선택됨');*/

            $boardList.slick('unslick');
            $boardItem.remove();
            $boardList.append((thisType === 'all') ? $boardItem : $boardItem.filter('[class="board_item ' + thisType + '"]'));
            $boardList.slick(boardSlickOption);
        });
        $boardTab.find('.tab_item.active .board_button').trigger('click');
        /*$boardList.slick('unslick');
        $boardList.slick(boardSlickOption);
        $boardScroll.on('scroll',function(){
            if(Math.ceil($(this).scrollLeft() + $(this).width()) == $boardTab.width()) {
                $board.addClass('end');
            }else{
                $board.removeClass('end');
            }
        });*/




        /* 테마정원 */
        var $theme = $container.find('.theme'),
            $themeList = $theme.find('.theme_list'),
            $themeItem = $theme.find('.theme_item'),
            $themePrev = $theme.find('.theme_prev'),
            $themeNext = $theme.find('.theme_next'),
            $themeSlickOpt = {
                slidesToShow : 1,
                slidesToScroll : 1,
                arrows : true,
                prevArrow : $themePrev,
                nextArrow : $themeNext,
                autoplay : false,
                speed : 500,
                infinite : true,
                fade : true,
                focusOnSelect : true,
                responsive: [
                    {
                        breakpoint: 1401,
                        settings: {
                            slidesToShow  : 1,
                        }
                    }
                ]
            };

        $themeList.slick($themeSlickOpt).slick('setPosition').on('init', function(event, slick, current, next){
            var last = slick.slideCount - slick.options.slidesToShow;

            $themeItem.eq(1).addClass('next_item');
            $themeItem.eq(last).addClass('prev_item');

        });
        $themeList.slick($themeSlickOpt).slick('setPosition').on('beforeChange', function(event, slick, current, next){
            $html.removeClass('theme_active');

            var last = slick.slideCount - slick.options.slidesToShow;
            $themeItem.removeClass('prev_item next_item');

            if(current < next){
                $themeItem.eq(current).addClass('prev_item');
                if(next != last - 1 && next != last){
                    $themeItem.eq(current + 2).addClass('next_item');
                }
                if(next === last - 1){
                    $themeItem.eq(current + 2).addClass('next_item');
                }
                if(next === last){
                    $themeItem.eq(0).addClass('next_item');
                }
            }
            if(current === last && next === 0){
                $themeItem.eq(last).addClass('prev_item');
                $themeItem.eq(1).addClass('next_item');
            }
            if(current > next){
                if(next != 0){
                    $themeItem.eq(next - 1).addClass('prev_item');
                }
                if(next != last - 2 && next != last - 1){
                    $themeItem.eq(next + 1).addClass('next_item');
                }
                if(next === last - 2){
                    $themeItem.eq(next + 1).addClass('next_item');
                }
                if(next === last - 1){
                    $themeItem.eq(last).addClass('next_item');
                }
                if(next === 0){
                    $themeItem.eq(last).addClass('prev_item');
                }
            }
            if(current === 0 && next === last){
                $themeItem.eq(last - 1).addClass('prev_item').removeClass('next_item');
                $themeItem.eq(current).removeClass('prev_item');
                $themeItem.eq(0).removeClass('prev_item');
            }
        }).on('afterChange', function(){
            $html.addClass('theme_active');
        });

        var $rowgroup = $("[class^='rowgroup']");

        $window.on('load resize', function (){
            $rowgroup.eq(0).addClass('scroll_effect');
            /*$rowgroup.eq(1).addClass('scroll_effect');*/

            if ( $window.width() < 1001 ){
                /*$rowgroup.eq(2).addClass('scroll_effect');*/
            }

            var scrollTop = $window.scrollTop(),
                windowBottom = scrollTop + $window.height();

            $rowgroup.each(function (index, element){
                var $element = $(element),
                    rowgroupOffset = $element.offset().top + 240;

                if (rowgroupOffset < windowBottom) {
                    $rowgroup.eq(index).addClass('scroll_effect');
                }
            });
        });

        $window.on('scroll', function (){
            var scrollTop = $window.scrollTop(),
                windowBottom = scrollTop + $window.height();

            $rowgroup.each(function (index, element){
                var $element = $(element),
                    rowgroupOffset = $element.offset().top + 240;

                if (rowgroupOffset < windowBottom) {
                    $rowgroup.eq(index).addClass('scroll_effect');
                }
            });
        })

    });

})(window.jQuery);
