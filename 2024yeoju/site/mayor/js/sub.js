(function ($) {
    'use strict';

    var $html = $('html');

    $(function () {
        var $window = $(window),
            $html = $('html'),
            $container = $('#container'),
            $wrapper = $('#wrapper'),
            $footer = $('#footer');

        //여기서부터 코드 작성해주세요

        /*비주얼 온
        $('.slogan_box').addClass('on');*/

        /* 시정목표 및 방침 */
        var $sloganItem = $container.find('.slogan_item'),
            $sloganBtn = $sloganItem.find('.slogan_btn'),
            $sloganWrap = $sloganItem.find('.slogan_wrap'),
            $sloganClose = $sloganItem.find('.slogan_close');

        /*
       $sloganItem.mouseover(function () {
           var $this = $(this);

           $this.addClass('active');
           $wrapper.addClass('black_top');
           $footer.addClass('black_bottom');
       });
       $sloganItem.mouseout(function () {
           var $this = $(this);

           $sloganItem.removeClass('active');
           $wrapper.removeClass('black_top');
           $footer.removeClass('black_bottom');
       });

       $sloganWrap.mouseout(function () {
           var $this = $(this);

           $sloganItem.removeClass('active');
           $wrapper.removeClass('black_top');
           $footer.removeClass('black_bottom');
       });
 */

        $sloganBtn.click(function () {
            var $this = $(this),
                $ParentSloganItem = $this.parent('.slogan_item'),
                IsActive = $ParentSloganItem.is('.active');

            if(!IsActive){
                $ParentSloganItem.siblings().removeClass('active');
                $ParentSloganItem.addClass('active');
                $wrapper.addClass('black');
                $footer.addClass('black');

            } else{
                $ParentSloganItem.removeClass('active');

            }
        });

        $sloganClose.click(function () {
            $sloganItem.removeClass('active');
            $wrapper.removeClass('black');
            $footer.removeClass('black');
        })


        /* fade */
        var $fade = $container.find('.slogan_box');

        function fade() {
            $fade.each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();
                if (bottom_of_window > bottom_of_object / 1.8) {
                    $(this).addClass('on');
                }
            });
        }

        fade();
        $window.scroll(function () {
            fade();
        });


        /* 공약총괄현황 */
        var $pledgeItem = $container.find('.pledge_item'),
            $pledgeBtn = $pledgeItem.find('.pledge_btn'),
            $pledgeBox = $pledgeItem.find('.pledge_box'),
            $pledgeClose = $pledgeItem.find('.pledge_close');

        $pledgeBtn.click(function () {
            var $this = $(this),
                $ParentPledgeItem = $this.parent('.pledge_item'),
                $ParentPledgeList = $this.parents('.pledge_list'),
                $pledgeBox = $ParentPledgeItem.find('.pledge_box'),
                IsActive = $ParentPledgeItem.is('.active');

            if(!IsActive){
                $ParentPledgeItem.siblings().removeClass('active');
                $ParentPledgeList.siblings().removeClass('active');
                $ParentPledgeItem.addClass('active');
                $ParentPledgeList.addClass('active');

                $pledgeBox.slideDown();
            } else{
                $ParentPledgeItem.removeClass('active');
                $ParentPledgeList.removeClass('active');
                $pledgeBox.slideUp();
            }
        });

        $pledgeClose.click(function () {
            var $this = $(this),
                $ParentPledgeList = $this.parents('.pledge_list'),
                $ParentPledgeItem = $this.parents('.pledge_item'),
                $pledgeBox = $ParentPledgeList.find('.pledge_box'),
                $pledgeTop = $ParentPledgeList.find('.pledge_top');

            $pledgeItem.removeClass('active');
            $ParentPledgeList.removeClass('active');
            $container.find('.pledge_item .pledge_chart_bottom').removeClass('active');
            $container.find('.cts1805_wrap').removeClass('active');
            $pledgeBox.slideUp();
            $pledgeTop.slideUp();
        })


        var $pledgeDetailBtnOpen = $container.find('.pledge_item .pledge_detail_btn.open'),
            $pledgeDetailBtnClose = $container.find('.pledge_item .pledge_detail_btn.close');

        $pledgeDetailBtnOpen.click(function () {
            var $this = $(this),
                $pledgeChartBottom = $this.parent('.pledge_chart_bottom');

            $pledgeChartBottom.addClass('active');
        });

        $pledgeDetailBtnClose.click(function () {
            var $this = $(this),
                $pledgeChartBottom = $this.parents('.pledge_chart_bottom');

            $pledgeChartBottom.removeClass('active');
        });
        

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);
