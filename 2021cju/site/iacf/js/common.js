(function ($) {

    'use strict';

    window.element = {};

    var $document = element.$document = $(document),
        $screen = $.screen;

    //screen
    $document.on('ready.layout', function (event) {
        $screen({
            state: [{
                name      : 'wide',
                horizontal: {
                    from: 9999,
                    to  : 1300
                }
            }, {
                name      : 'web',
                horizontal: {
                    from: 1280,
                    to  : 1001
                }
            }, {
                name      : 'tablet',
                horizontal: {
                    from: 1000,
                    to  : 641
                }
            }, {
                name      : 'phone',
                horizontal: {
                    from: 640,
                    to  : 0
                }
            }]
        });
    });

    $(function () {

        var $html = element.$html = $('html'),
            $header = element.$header = $('#header'),
            $container = element.$container = $('#container'),
            $footer = element.$footer = $('#footer');

        /* 메뉴 */
        var $lnb = $header.find('.lnb'),
            $depthList = $lnb.find('.depth_list');

        $depthList.each(function (index, element) {
            var $element = $(element);
            $element.find('> li').each(function (index, element) {
                var $element = $(element);
                $element.addClass('n' + (index + 1));
            });
        });

        /* 서브메뉴 */
        var $side = $container.find('.side');
        $side.find('.depth1_item:last-child').addClass('last');

        /* 토글 */
        var $toggle = $('.toggle');

        $toggle.on('click', function () {
            var $this = $(this);
            $this.toggleClass('active');
        });



        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            infinite      : true,
            variableWidth : true,
            slidesToShow  : 6,
            slidesToScroll: 1,
            autoplay      : true,
            playText      : '재생',
            pauseText     : '정지',
            autoArrow     : $bannerAuto,
            prevArrow     : $bannerPrev,
            nextArrow     : $bannerNext,
        });

        /*관련기관*/
        $('.footer_top .list_box .homepage_list .hp_btn').on('click', function(){
            var $this = $(this),
                $MyParent = $this.parent('.homepage_list'),
                $MyAnswer = $this.siblings('.list'),
                $OterParents = $MyParent.siblings('.homepage_list'),
                $OterAnswer = $OterParents.find('.list'),
                $OterBtn = $OterParents.find('.hp_btn'),
                IsActive = $MyParent.is('.active');
            if(!IsActive){
                $OterParents.removeClass('active');
                $OterAnswer.slideUp();
                $OterBtn.attr('title', '목록열기');
                $MyParent.addClass('active');
                $MyAnswer.slideDown();
                $this.attr('title', '목록닫기');
            } else{
                $MyParent.removeClass('active');
                $MyAnswer.slideUp();
                $this.attr('title', '목록열기');
            };
        });


        $(window).load(function () {
            function menuPosition() {
                $('.lnb .menu .depth1_item').each(function () {
                    var $windowHalf = $('.wrap').width() / 2 + 50;
                    var $thisPosition = $(this).position().left;
                    var $depth2 = $(this).find('.depth2_list');
                    var $depth2Width = $depth2.width();
                    var $depth2Content = $(this).find('.depth2_content');
                    var $thisWidth = $(this).width();

                    if ($thisPosition < $windowHalf) { //1차 메뉴명이 절반 기준 좌측에 있을경우
                        if ($depth2Width < $windowHalf) { //2차 메뉴명 길이가 절반보다 작을 경우
                            $depth2.css('left', $thisPosition + 'px');
                        } else {//2차 메뉴명 길이가 절반보다 클 경우
                            $depth2Content.css('text-align', 'center');
                        }
                    } else {//1차 메뉴명이 절반 기준 우측에 있을경우
                        if ($depth2Width < $windowHalf) { //2차 메뉴명 길이가 절반보다 작을 경우
                            var $right = $thisPosition + $thisWidth - $depth2Width;
                            //$depth2.css('left', $right + 'px');
                            $depth2.css('left', $thisPosition + 'px');
                        } else {//2차 메뉴명 길이가 절반보다 클 경우
                            //$depth2Content.css('text-align', 'center');
                            var $right = $thisPosition + $thisWidth - $depth2Width;
                            $depth2.css('left', $right + 'px');
                        }
                    }
                });
            };

            menuPosition();

            $(window).resize(function(){
                var $windowWidth = $(this).width();

                if ($windowWidth > 1001){
                    menuPosition();
                }
            });

        });

        //콘텐츠 준비중
        $('#contents .prepare img').attr('src', '/site/iacf2021/images/sub/prepare.png');
        $('#contents .prepare').addClass('text_center');

    });

   
})(window.jQuery);
