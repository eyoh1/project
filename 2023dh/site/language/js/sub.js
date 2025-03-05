(function($) {
    'use strict';

    var $html = $('html');

    $(function() {
        var $window = $(window),
            $html = $('html'),
            $container = $('#container'),
            $footer = $('#footer');

        //여기서부터 코드 작성해주세요

        /* breadcrumbs */
        var $tabMenu = $container.find('.breadcrumbs_item'),
            $tabSelect = $tabMenu.find('.breadcrumbs_anchor.pc');

        $tabSelect.click(function () {
            var $this = $(this),
                $ParentTabmenu = $this.parent('.breadcrumbs_item'),
                IsActive = $ParentTabmenu.is('.active');
            if(!IsActive){
                $ParentTabmenu.siblings().removeClass('active').find('.tab_panel').stop().slideUp();
                $ParentTabmenu.find('.tab_panel').stop().slideDown();
                $ParentTabmenu.addClass('active');
                $tabSelect.attr('title','메뉴 열림');
            } else{
                $ParentTabmenu.find('.tab_panel').stop().slideUp();
                $ParentTabmenu.removeClass('active');
                $tabSelect.attr('title','메뉴 닫힘');
            }
        });

        /*비주얼 온*/
        $('.top_sub_visual').addClass('on');


        /* 1차메뉴가 끝인경우 */
        var $LongMenu = $html.find('.lnb .depth1 .depth1_list .depth1_item'),
            $LongMenuLast = $html.find('.lnb .depth1 .depth1_list .depth1_item:last-child'),
            $LongMenuWrap = $html.find('.depth1_list');

        if ((!$LongMenuLast.hasClass("has")) && ($LongMenuLast.hasClass('active'))) {
            $LongMenuWrap.addClass('long');
            $LongMenuWrap.parent().addClass('long');
        } else {
            $LongMenuWrap.removeClass('long');
            $LongMenuWrap.parent().removeClass('long');
        }

        $LongMenu.on('click', function () {
            if ($LongMenu.hasClass('has')){
                $LongMenuWrap.removeClass('long');
                $LongMenuWrap.parent().removeClass('long');
            }
        })

        /* Tour Attractions */
        var $tour = $('.tour_wrap'),
            $tourList = $tour.find('.tour_middle_list');
        $tourList.slick({
            autoplay: false,
            slidesToShow: 5,
            infinite: false,
            prevArrow: $tour.find('.tour_middle_btn .prev'),
            nextArrow: $tour.find('.tour_middle_btn .next'),
            variableWidth : true,
            responsive: [
                {
                    breakpoint: 1481,
                    settings: {
                        slidesToShow:3,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 3,
                        variableWidth : false,
                    }
                },
                {
                    breakpoint: 701,
                    settings: {
                        slidesToShow: 2,
                        variableWidth : false,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1,
                        variableWidth : false,
                    }
                }
            ]
        });

        var $tour = $('.tour_wrap'),
            $tourBList = $tour.find('.tour_bottom_list');
        $tourBList.slick({
            autoplay: false,
            slidesToShow: 1,
            infinite: false,
            prevArrow: $tour.find('.tour_bottom_btn .prev'),
            nextArrow: $tour.find('.tour_bottom_btn .next'),
            variableWidth : true,
            responsive: [
                {
                    breakpoint: 481,
                    settings: {
                        variableWidth : false,
                    }
                }
            ]
        });



        $('.day_list_wrap').scroll(function(){
            var scrL= $('.day_list_wrap').scrollLeft();
            if(scrL == $('.day_list_wrap .day_list').width() - $('.day_list_wrap').width()){
                $('.day_list_wrap').addClass('end');
            } else {
                $('.day_list_wrap').removeClass('end');
            }
        });


        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);
