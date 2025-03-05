(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');


        //
        var keysPressed = {};
        $(document).on('keyup',function (e) {
            delete keysPressed[e.which];
        });
        $(document).on('keydown',function(e){
            keysPressed[e.which] = true;
        });

        //search박스
        var $searchBox = $header.find('.search_box'),
            $searchBoxEle = $searchBox.find('a, input, button'),
            $search = $searchBox.find('.search'),
            $searchOpen = $header.find('.search_btn'),
            $searchClose = $searchBox.find('.search_close');

        $searchOpen.on('click',function(){
            var height = $searchBox.find('.search_con').innerHeight();
            if(window.innerWidth<1001){
                if($(this).hasClass('close')){
                    $searchBox.removeClass('active');
                    $search.removeAttr('style');
                    $html.removeClass('search_open');
                    $(this).removeClass('close').text('검색열기')
                    return false;
                };
                $(this).addClass('close').text('검색닫기')
            }
            $searchBox.addClass('active');
            $search.height(height);
            $html.addClass('search_open');
            setTimeout(function(){
                $searchBoxEle.first().focus();
            },100);
        });

        $searchBoxEle.first().on('keydown',function(event){
            if(event.shiftKey && event.which === 9){
                $searchBoxEle.last().focus();
                return false;
            };
        });

        $searchClose.on('click',function(){
            $searchBox.removeClass('active');
            $search.removeAttr('style');
            $html.removeClass('search_open');
            $searchOpen.focus();
        }).on('keydown',function(event){
            if(!event.shiftKey && event.which === 9){
                $searchBoxEle.first().focus();
                return false;
            }
        })


        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next'),
            $bannerOpt = {
                draggable : false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 1000,
                variableWidth: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                playText : '재생',
                pauseText : '정지',
                autoArrow : $bannerAuto,
                prevArrow : $bannerPrev,
                nextArrow : $bannerNext,
                responsive: [
                    {
                        breakpoint: 1500,
                    },
                    {
                        breakpoint: 1200,
                    },
                ]
            };


        $bannerList.on('init reInit afterChange',function(){
            var bannerLeft = $bannerList.offset().left,
                bannerRight = $bannerList.width() + bannerLeft;
            $bannerList.find('.slick-slide').each(function(){
                var thisLeft = $(this).offset().left;
                if(thisLeft < bannerRight && thisLeft >= bannerLeft) $(this).addClass('slick-active');
            });
        });
        $bannerList.slick($bannerOpt);

        // 맨위로

        var $toTop = $footer.find('.toTop'),
            $toTopBtn = $toTop.find('button'),
            toTopOffset;

        $window.on('load resize',function(){
            $toTop.removeAttr('style');
            toTopOffset = $toTop.offset();
            $window.on('resize scroll',function(){
                toTopPosition($toTop, toTopOffset);
            });
        });

        function toTopPosition(quick, toTopOffset){
            if(window.scrollY > $('#header').height()){
                $toTop.addClass('active');
                if(window.scrollY + window.innerHeight >= $('#wrapper').height() - 200) return $toTop.removeAttr('style');
                $toTop.css({
                    'position':'fixed',
                    'top':'auto',
                    'bottom':'40px',
                });
            }else{
                $toTop.removeClass('active');
            }
        }

        $toTopBtn.on('click',function(){
            window.scroll({top:0,left:0,behavior: "smooth",});
        });

        //패밀리사이트
        var $footerSite = $footer.find('.site'),
            $siteList = $footerSite.find('.site_list'),
            $siteBtn = $footerSite.find('.site_button');

        $siteBtn.on('click',function(){
            if ($footerSite.hasClass('active')){
                $siteList.height(0);
                $footerSite.removeClass('active');
                setTimeout(function(){
                    $siteList.removeAttr('style');
                },500)
                $(this).attr('title','목록 열기');
            }else{
                var height = $siteList.height();
                $footerSite.addClass('active');
                $siteList.height(0).height(height);
                $(this).attr('title','목록 닫기');
            }
        });
    });
})(window.jQuery);
