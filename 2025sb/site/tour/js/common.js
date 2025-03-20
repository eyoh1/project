(function($) {
	'use strict';

    $.fn.eleResize = function(callback){
        this.each(function(){
            var $this = $(this),
                prevWid = $this.width();

            $(window).on('resize', chkSize);

            if(typeof callback === 'function') $this.on('eleResize',callback);

            function chkSize(){
                var newWid = $this.width();
                if(prevWid===newWid) return;
                prevWid = newWid;
                $this.trigger('eleResize');
            };

            chkSize();
        });
        return this;
    };

	$(function() {

        var $window = $(window),
            $html = $('html'),
            $document = $(document),
            $header = $document.find('#header'),
            $wrapper = $('#wrapper'),
            $container = $document.find('#container'),
            $footer = $('#footer');

        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.toggle'),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

            if($this.is('[class*="_show"]')){
                if ($parent.siblings().hasClass('active')){
                    $parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if($this.is('[class*="_hide"]')){
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });

        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            draggable : false,
            infinite: true,
            variableWidth: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $bannerAuto,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
        });

        /* 맨위로 */

        var $bodyHtml = $('body,html'),
            $totop = $footer.find('.totop button');

        $window.on('load resize scroll',function(){

            var winY = window.scrollY,
                winH = window.innerHeight,
                headerH = $header.innerHeight(),
                containerH = $container.outerHeight(true);

            var contArea = containerH - winH,
                diff = $totop.outerHeight(true)+(window.innerWidth>640 ? 60 : 35);

            contArea = contArea+diff;
            $totop.closest('.totop').removeClass('footer_in');
            if(winY < 1){
                $totop.removeAttr('style');
            }else if(winY > 0 && winY < contArea){
                var totopY = winY-contArea;
                totopY = totopY<-diff?totopY:-diff;
                $totop.css('top',totopY+'px');
            }else if(winY > 0 && winY > contArea){
                $totop.css('top',diff+'px');
                $totop.closest('.totop').addClass('footer_in');
            };
        });
        $totop.on('click',function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });

        // 메뉴 보완
        var $lnb = $header.find('.lnb'),
            $lnbMenu = $lnb.find('.menu'),
            $lnbItem = $lnb.find('.depth_item'),
            $lnbText = $lnb.find('.depth_text'),
            $activeLnb = $lnbMenu.find('.active').last();

        $lnbText.on('focusout',function(){
            if(window.mode !== 'pc') return;
            setTimeout(function(){
                if($(document.activeElement).closest('.lnb').length<1){
                    $lnbMenu.height('');
                    $html.removeClass('lnb_open');
                    $lnbItem.removeClass('active');
                };
            });
        });

        $window.on('load resize',function(){
            if(window.innerWidth<1001){
                var $parentItem = $activeLnb.parent().closest('li');
                $lnbItem.removeClass('active');
                while($parentItem.length){
                    $parentItem.addClass('active');
                    $parentItem = $parentItem.parent().closest('li');
                };
            };
        })

        // header fix
        $window.on('scroll', function () {
            if (window.scrollY > 40) $html.addClass('header_fix');
            else $html.removeClass('header_fix');
        });

        var scrollTop = $window.scrollTop(),
            wrapperOffset = $wrapper.offset();

        if (scrollTop > wrapperOffset.top) {
            $html.addClass('header_fix');
        } else {
            $html.removeClass('header_fix');
        }


        // search
        var $search = $header.find('.search'),
            $searchForm = $search.find('.search_form'),
            $searchTop = $search.find('.form_top'),
            $searchBot = $search.find('.form_bottom'),
            $searchToggle = $search.find('.search_toggle'),
            $searchClose = $search.find('.search_close'),
            $searchOptToggle = $search.find('.option_toggle'),
            $srchFcsEle = $search.find('a, button, input, select');

        $searchToggle.on('click',function(){
            if($search.hasClass('active')){
                $searchForm.height(0);
                setTimeout(function(){
                    $html.removeClass('search_open');
                    $search.removeClass('active');
                },250);
                $(this).text('검색창 열기');
            }else{
                $html.addClass('search_open');
                $search.addClass('active');
                $(this).text('검색창 닫기');
                setTimeout(function(){
                    var formHeight = $searchForm.find('form').innerHeight();
                    $searchForm.height(formHeight);
                });
            };
        });

        $searchOptToggle.on('click',function(){
            if($search.hasClass('active_option')) $search.removeClass('active_option');
            else $search.addClass('active_option');

            var searchHei = $searchTop.innerHeight()+$searchBot.innerHeight();
            $searchForm.height(searchHei);
        });

        $searchClose.on('click',function(){
            $searchForm.height(0);
            $html.removeClass('search_open');
            $search.removeClass('active');
            $searchToggle.text('검색창 열기');
        });

        $searchForm.eleResize(function(){
            var hei = $(this).find('.form_top, .form_bottom').map(function(){return $(this).innerHeight()}).toArray().reduce(function(a,b){return a+b});
            $(this).height(hei);
        });

        // $srchFcsEle.on('focusout',function(){
        //     var $this = $(this);
        //     if(!($search.hasClass('active'))) return;
        //     setTimeout(function(){
        //         var $focus = $(document.activeElement);
        //         var fcsEleArr = $srchFcsEle.toArray();
        //         if($focus.closest('.search').length>0) return;
        //         $focus.blur();
        //         if($focus.closest('.lnb').length>0){
        //             while($focus.closest('.search').length<1){
        //                 $(fcsEleArr.pop()).focus();
        //                 $focus = $(document.activeElement);
        //             };
        //         }else{
        //             $(fcsEleArr.shift()).focus();
        //         };
        //     });
        // });

        $srchFcsEle.first().on('keydown',function(e){
            if(!$search.hasClass('active')) return;
            if(e.which === 9 && e.shiftKey){
                e.preventDefault();
                $(this).blur();
                var $focus = $(document.activeElement),
                    fcsEleArr = $srchFcsEle.toArray();
                while($focus.closest('.search').length<1){
                    $(fcsEleArr.pop()).focus();
                    $focus = $(document.activeElement);
                };
            };
        }).end().last().on('keydown',function(e){
            if(e.which === 9 && !e.shiftKey){
                e.preventDefault();
                $srchFcsEle.first().focus();
            };
        });
        $searchTop.find('.keyword a').last().on('keydown',function(e){
            if($search.hasClass('active_option')) return;
            if(e.which === 9 && !e.shiftKey){
                e.preventDefault();
                $srchFcsEle.first().focus();
            };
        });

        // datePicker
        $searchTop.find('#cal_start, #cal_end').closest('.search_input.calendar').datepicker().on('changeDate',function(e){
            var $input = $(this).find('input'),
                date = e.date;
            $input.val(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
            $searchForm.css('overflow','');
        }).on('show',function(e){
            if(window.innerWidth>1000) return;
            var $cal = $(this).next(),
                $input = $(this).find('input');
            $searchTop.animate({
                scrollTop: $cal.position().top + $cal.height()
            },250);
            if(window.innerWidth>640 || $input.attr('id')!=='cal_start') return;
            $cal.css('left','0');
        });
        $searchTop.find('.search_input.calendar input, .search_input.calendar button').on('click',function(){
            var $wrap = $(this).closest('.search_input');
            setTimeout(function(){
                var $calWrap = $wrap.next();
                if(!($calWrap.length>0)) return;
                $searchForm.css('overflow','visible');
            });
        });

                //패밀리사이트
        var $familyBtn = $('.menu_header .link_anchor'),
        $familyLayer = $('.family_layer'),
        $familyClose = $familyLayer.find('.close'),
        $familyItem = $familyLayer.find('.item_btn');

        $familyBtn.on('click', function () {
        $familyLayer.addClass('active');
        $familyLayer.fadeIn();
        });
        $familyClose.on('click', function () {
        $familyLayer.removeClass('active');
        $familyLayer.fadeOut();
        })

        $familyItem.on('click', function () {
        var $this = $(this),
            $MyParent = $this.parent('li.item'),
            IsActive = $MyParent.is('.active'),
            $MyLayer = $this.siblings('.layer'),
            $OtherParents = $MyParent.siblings('li.item'),
            $OtherLayer = $OtherParents.find('.layer'),
            $OtherBtn = $OtherParents.find('.item_btn');
        if (!IsActive) {
            $OtherParents.removeClass('active');
            $OtherLayer.slideUp();
            $OtherBtn.attr('title', '목록열기');
            $MyParent.addClass('active');
            $this.attr('title', '목록닫기');
            $MyLayer.slideDown();
        } else {
            $MyParent.removeClass('active');
            $this.attr('title', '목록열기');
            $MyLayer.slideUp();
        }
        ;
        });
	});
})(window.jQuery);