(function($) {
	'use strict';

	$(function() {

        var $window = $(window),
            $html = $('html'),
            $document = $(document),
            $header = $document.find('#header'),
            $container = $document.find('#container'),
            $footer = $('#footer');

        /* 상단토글스위치 */
        var $body = $('body'),
            $switch = $header.find('.switch'),
            $switchInput = $switch.find('input.color');

        $switchInput.on('click', function(){
            if ( $switchInput.is(':checked') ){
                $html.addClass('color_switch');
                localStorage.setItem('colorSwitch', true);
            } else {
                $html.removeClass('color_switch');
                localStorage.setItem('colorSwitch', false);
            }
        });
        /* 상단토글스위치 - 로컬스토리지 */
        var savedColorSwitch = localStorage.getItem('colorSwitch');

        if(savedColorSwitch === 'true'){
            $switchInput.prop('checked', true);
            $html.addClass('color_switch');
        }else{
            $switchInput.prop('checked', false);
            $html.removeClass('color_switch');
            localStorage.setItem('colorSwitch', false);
        }



        //언어
        var $language = $header.find('.language');

        $language.on('click', function(event) {
            var $this = $(this);
            $this.toggleClass('active');
            $this.find('.language_panel').stop(false, true).slideToggle('200', 'linear');
        });


        /* sns공유 */
        var $sns = $header.find('.sns'),
            $snsBtn = $sns.find('.sns_show');
        $snsBtn.on('click', function(event) {
            $sns.toggleClass('active');
            if($sns.is('.active')){
                $snsBtn.attr("title","SNS 레이어 닫기")
            }else {
                $snsBtn.attr("title","SNS 레이어 열기")
            }
        });

        /* search */
        var $search = $html.find('.search'),
            $searchForm = $search.find('.search_form'),
            $searchClose = $search.find('.search_close'),
            $searchOptToggle = $search.find('.option_toggle');

        $(window).on('load resize', function () {
            if ($(window).width() > 1001) {
                $html.addClass('search_open');
                $search.addClass('active');
                setTimeout(function () {
                    var formHeight = $searchForm.find('form').innerHeight();
                    $searchForm.height(formHeight);
                });
            }else {
                $searchForm.height(0);
                $html.removeClass('search_open');
                $search.removeClass('active');
            }
        });

        $searchOptToggle.on('click', function () {
            $html.addClass('search_open');
            $search.addClass('active');
            setTimeout(function () {
                var formHeight = $searchForm.find('form').innerHeight();
                $searchForm.height(formHeight);
            });
        });


        /* quick_item */
        var $sections = $('header, footer');
        var $quick = $sections.find('.quick'),
            $quickBtn = $quick.find('.quick_btn'),
            $quickClose = $sections.find('.box_close');

        $quickBtn.on('click', function(event) {
            var $this = $(this),
                $quickItem = $this.parent('.quick_item');

            $quickItem.addClass('active').siblings().removeClass('active');
        });

        $quickClose.on('click', function(event) {
            $sections.find('.quick_item').removeClass('active');
        });



        // 퀵메뉴 모바일 설정
        var $quickPanel = $('.quick_panel'),
            $firstBtn = $('.first_btn'),
            $quickBox = $('.quick_box'),
            $quickBoxHtml = $quickBox.html(),
            $quickList = $('.quick_list'),
            $quickItemSet = $quickList.find('.quick_item.set'),
            $quickItemSetting = $quickItemSet.find('.setting');


        $quickItemSet.find('.setting').after('<div class="pc_quick"></div>');
        $('.pc_quick').html($quickBoxHtml)

        $quickItemSetting.on('click', function(event) {
            $quickPanel.addClass('pc_quick_show');
            $('.pc_quick').addClass('active');
            $quickItemSet.addClass('btn_show');
        });

        $('.quick_item .box_close').on('click', function(event) {
            $quickPanel.removeClass('pc_quick_show');
            $('.pc_quick').removeClass('active');
            $quickItemSet.removeClass('btn_show');
        });
        
        $firstBtn.on('click', function(event) {
            $quickPanel.removeClass('pc_quick_show');
            $('.pc_quick').removeClass('active');
            $quickItemSet.removeClass('btn_show');
        });


        /* 대표 프린트*/
        window.popPrint = function(selector, type) {
            let head = document.querySelector('head');
            let printContents;
            let sat = document.querySelector('.satisfaction');
            sat.style.display = 'none';

            if (type == 'class') {
                printContents = document.querySelector('.'+selector).innerHTML;
            } else if (type == 'id') {
                printContents = document.querySelector('#'+selector).innerHTML;
            }

            const popupWindow = window.open('', '_blank', 'width=800, height=800');
            popupWindow.document.write('<!DOCTYPE html><html lang="ko">'+head.outerHTML+'<body><div id="wrapper" class="print_active"><div class="print_layer"><div class="print_wrap">'+printContents+'</div></div></div></body></html>');

            popupWindow.document.close();
            popupWindow.focus();

            sat.style.display = 'block';

            setTimeout(function(){
                popupWindow.print();
                popupWindow.close();
            }, 500);
        }

    });
})(window.jQuery);

