(function($) {
	'use strict';

	$(function() {

        var $window = $(window),
            $html = $('html'),
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

        /* gnb 마우스 오버 */
        var $siteList = $('.gnb .site_list'),
            $siteItem = $('.gnb .site_item'),
            $siteLayer = $('.gnb .layer');

        $('.gnb .site_list .site_item .site_anchor').on('mouseenter keyup', function() {
            var $this = $(this),
                $MyParent = $this.parent('.site_item'),
                $OtherParents = $MyParent.siblings('.site_item'),
                $MyLayer = $this.siblings('.layer'),
                $OtherBtn = $OtherParents.find('.site_anchor'),
                $OtherLayer = $OtherParents.find('.layer'),
                IsActive = $MyParent.is('.active');
            if(!IsActive){
                $OtherParents.removeClass('active');
                $OtherBtn.attr('title', '목록열기');
                $OtherLayer.slideUp();
                $MyParent.addClass('active');
                $this.attr('title', '목록닫기');
                $MyLayer.slideDown();
            }
        });
        $siteLayer.on('mouseenter keyup', function() {
            var $this = $(this);

            $this.slideDown();
        });
        $siteLayer.on('mouseleave blur', function(event) {
            var $this = $(this);
            $this.slideUp();
            $siteItem.removeClass('active');
        });

        $('.layer .half_box .mo_list_item').on('mouseenter keyup', function() {
            var $this = $(this),
                $MyParent = $this.parents('li'),
                $OtherParents = $MyParent.siblings('li'),
                IsActive = $MyParent.is('.active');

            if(!IsActive){
                $OtherParents.removeClass('active');
                $MyParent.addClass('active');
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
            variableWidth: false,
            vertical:true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $bannerAuto,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
        });

        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.up_button');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });

        //바로가기
        $('.footer .site .site_list .site_item .site_show').on('click', function () {
            var $this = $(this),
                $MyParent = $this.parent('li.site_item'),
                MyParentIsActive = $MyParent.is('.active'),
                $MyLayer = $this.siblings('.site_panel'),
                $OtherParents = $MyParent.siblings('li.site_item'),
                $OtherLayer = $OtherParents.find('.site_panel'),
                $OtherBtn = $OtherParents.find('.site_show');
            if (!MyParentIsActive) {
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
        });

	});
})(window.jQuery);
