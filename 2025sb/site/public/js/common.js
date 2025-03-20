(function ($) {
    'use strict';

    $.fn.eleResize = function (callback) {
        this.each(function () {
            var $this = $(this),
                prevWid = $this.width();

            $(window).on('resize', chkSize);

            if (typeof callback === 'function') $this.on('eleResize', callback);

            function chkSize() {
                var newWid = $this.width();
                if (prevWid === newWid) return;
                prevWid = newWid;
                $this.trigger('eleResize');
            };

            chkSize();
        });
        return this;
    };

    $(function () {

        var $window = $(window),
            $html = $('html'),
            $document = $(document),
            $header = $document.find('#header'),
            $container = $document.find('#container'),
            $footer = $('#footer');


        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.toggle'),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g, '').split(/\s+/).slice(-2)[0].replace(/_item/, '');

            if ($this.is('[class*="_show"]')) {
                if ($parent.siblings().hasClass('active')) {
                    $parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if ($this.is('[class*="_hide"]')) {
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });

        // search
        var $search = $html.find('.search'),
            $searchForm = $search.find('.search_form'),
            $searchTop = $search.find('.form_top'),
            $searchBot = $search.find('.form_bottom'),
            $searchToggle = $search.find('.search_toggle'),
            $searchClose = $search.find('.search_close'),
            $searchOptToggle = $search.find('.option_toggle'),
            $srchFcsEle = $search.find('a, button, input, select');

        $searchToggle.on('click', function () {
            if ($search.hasClass('active')) {
                $searchForm.height(0);
                setTimeout(function () {
                    $html.removeClass('search_open');
                    $search.removeClass('active');
                }, 250);
                $(this).text('검색창 열기');
            } else {
                $html.addClass('search_open');
                $search.addClass('active');
                $(this).text('검색창 닫기');
                setTimeout(function () {
                    var formHeight = $searchForm.find('form').innerHeight();
                    $searchForm.height(formHeight);
                });
            }
            ;
        });

        $searchOptToggle.on('click', function () {
            if ($search.hasClass('active_option')) {
                $searchForm.height(0);
                $html.removeClass('search_open');
                $search.removeClass('active');
                $search.removeClass('active_option');
            } else $search.addClass('active_option');

            var searchHei = $searchTop.innerHeight() + $searchBot.innerHeight();
            $searchForm.height(searchHei);
        });


        $searchClose.on('click', function () {
            $searchForm.height(0);
            $html.removeClass('search_open');
            $search.removeClass('active');
            $searchToggle.text('검색창 열기');
        });

        $searchForm.eleResize(function () {
            var hei = $(this).find('.form_top, .form_bottom').map(function () {
                return $(this).innerHeight()
            }).toArray().reduce(function (a, b) {
                return a + b
            });
            $(this).height(hei);
        });


        $srchFcsEle.first().on('keydown', function (e) {
            if (!$search.hasClass('active')) return;
            if (e.which === 9 && e.shiftKey) {
                e.preventDefault();
                $(this).blur();
                var $focus = $(document.activeElement),
                    fcsEleArr = $srchFcsEle.toArray();
                while ($focus.closest('.search').length < 1) {
                    $(fcsEleArr.pop()).focus();
                    $focus = $(document.activeElement);
                }
                ;
            }
            ;
        }).end().last().on('keydown', function (e) {
            if (e.which === 9 && !e.shiftKey) {
                e.preventDefault();
                $srchFcsEle.first().focus();
            }
            ;
        });
        $searchTop.find('.keyword a').last().on('keydown', function (e) {
            if ($search.hasClass('active_option')) return;
            if (e.which === 9 && !e.shiftKey) {
                e.preventDefault();
                $srchFcsEle.first().focus();
            }
            ;
        });

        // datePicker
        $searchTop.find('#cal_start, #cal_end').closest('.search_input.calendar').datepicker().on('changeDate', function (e) {
            var $input = $(this).find('input'),
                date = e.date;
            $input.val(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
            $searchForm.css('overflow', '');
        }).on('show', function (e) {
            if (window.innerWidth > 1000) return;
            var $cal = $(this).next(),
                $input = $(this).find('input');
            $searchTop.animate({
                scrollTop: $cal.position().top + $cal.height()
            }, 250);
            if (window.innerWidth > 640 || $input.attr('id') !== 'cal_start') return;
            $cal.css('left', '0');
        });
        $searchTop.find('.search_input.calendar input, .search_input.calendar button').on('click', function () {
            var $wrap = $(this).closest('.search_input');
            setTimeout(function () {
                var $calWrap = $wrap.next();
                if (!($calWrap.length > 0)) return;
                $searchForm.css('overflow', 'visible');
            });
        });


        /* sns공유 */
        var $share = $container.find('.share'),
            $shareBtn = $share.find('.share_show'),
            $shareClose = $share.find('.share_hide');

        $shareBtn.on('click', function (event) {
            $share.toggleClass('active');
        });
        $shareClose.on('click', function (event) {
            $share.removeClass('active');
        })


        //클립보드복사
        var $urlCopy = $container.find('#url_copy');

        $urlCopy.on('click', function (event) {
            $('#url_copy div').remove();
            var html = "<div><label for='clip_target'>복사된 URL</label><input id='clip_target' type='text' value='' /></div>";
            $(this).append().html(html);

            var input_clip = document.getElementById("clip_target");
            var _url = $(location).attr('href');
            $('#clip_target').val(_url);

            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                var editable = input_clip.contentEditable;
                var readOnly = input_clip.readOnly;

                input_clip.contentEditable = true;
                input_clip.readOnly = false;

                var range = document.createRange();
                range.selectNodeContents(input_clip);

                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                input_clip.setSelectionRange(0, 999999);

                input_clip.contentEditable = editable;
                input_clip.readOnly = readOnly;
            } else {
                input_clip.select();
            }
            try {
                var successful = document.execCommand('copy');
                input_clip.blur();
                if (successful) {
                    alert("URL이 복사 되었습니다");
                } else {
                    alert('이 브라우저는 지원하지 않습니다.');
                }
            } catch (err) {
                alert('이 브라우저는 지원하지 않습니다.');
            }
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
            ;
        });

        //패밀리사이트
        var $familyBtn = $('.family_btn'),
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


        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            draggable: false,
            infinite: true,
            variableWidth: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            vertical: true,
            playText: '재생',
            pauseText: '정지',
            autoArrow: $bannerAuto,
            prevArrow: $bannerPrev,
            nextArrow: $bannerNext,
            responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ],
        });

        /* 상단으로 */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $upButton = $footer.find('.up_button');

        if ($upButton.length) {
            $upButton.on('click', function (event) {
                $htmlBody.animate({
                    scrollTop: $wrapper.offset().top
                }, {
                    duration: 1000,
                });
                event.preventDefault();
            });

            $window.scroll(function () {
                if ($window.scrollTop() > 100) {
                    $upButton.addClass('show');
                } else {
                    $upButton.removeClass('show');
                }
            });
        }

        //팝업 시작
        var $popup = $('.popup .popup_list'),
            $popupTotal = $('.popup .template_total'),
            $popupCurrent = $('.popup .template_current');

        $popup.slick({
            //기본
            autoplay: false,
            dots: false,
            swipe: true,
            draggable: true,
            fade:true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: false,
            speed: 1000,
            autoplaySpeed: 5000,
            prevArrow: $('.popup .template_control .template_prev'),
            nextArrow: $('.popup .template_control .template_next'),

            //추가 기능
            autoArrow: $('.popup .template_control .template_auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseText: '정지',
            playText: '재생',
            total: $popupTotal,
            current: $popupCurrent,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
        });
        //팝업 끝

        // 프린트 추가
        window.popPrint = function(selector, type) {
            let head = document.querySelector('head');
            let printContents;
            let sat = document.querySelector('.satisfaction');
            sat.style.display = 'none';
            let style = document.createElement('style');
            style.innerHTML = "*{-webkit-print-color-adjust: exact !important;color-adjust: exact !important;}"+
                ".table_scroll{width:100%;overflow:auto;}"+
                ".table{width:100%;min-width:100% !important;table-layout:auto !important;border-collapse:collapse;}"+
                ".table th,.table td{word-break:break-word !important;white-space:normal;padding:8px;}"+
                ".emphasis .emphasis_item{height:auto;align-items:center;}"+
                ".emphasis .emphasis_group{flex:0 0 auto;}"+
                "@media print {"+
                "    .p-icon__alt,.p-upload__label.alt{background-image:url(/common/images/program/p-icon.png);background-position:-159px -100px;width:14px;height:13px}"+
                "    .p-icon__answer{background-image:url(/common/images/program/p-icon.png);background-position:-96px -158px;width:22px;height:22px}"+
                "    .p-icon__arrow-circle,.p-progress--ellipse .p-progress__item:not(:first-child):after{background-image:url(/common/images/program/p-icon.png);background-position:-90px -45px;width:24px;height:24px}"+
                "    .p-form__required--icon,.p-icon__asterisk{background-image:url(/common/images/program/p-icon.png);background-position:-150px -190px;width:12px;height:8px}"+
                "    .p-icon__blog{background-image:url(/common/images/program/p-icon.png);background-position:-45px 0;width:35px;height:35px}"+
                "    .p-icon__calendar{background-image:url(/common/images/program/p-icon.png);background-position:-188px -128px;width:16px;height:18px}"+
                "    .p-icon__checked-dark{background-image:url(/common/images/program/p-icon.png);background-position:-108px -190px;width:12px;height:10px}"+
                "    .p-form-checkbox__input[disabled][checked]~.p-form-checkbox__label:after,.p-form-checkbox__input[readonly][checked]~.p-form-checkbox__label:after,.p-icon__checked-gray{background-image:url(/common/images/program/p-icon.png);background-position:-86px -190px;width:12px;height:10px}"+
                "    .p-category__link.active:before,.p-form-checkbox__input:checked~.p-form-checkbox__label:after,.p-icon__checked-white,.p-nav--group .p-nav__link.active:before{background-image:url(/common/images/program/p-icon.png);background-position:-64px -190px;width:12px;height:10px}"+
                "    .p-icon__css{background-image:url(/common/images/program/p-icon.png);background-position:0 -158px;width:22px;height:22px}"+
                "    .p-icon__deleted-bg{background-image:url(/common/images/program/p-icon.png);background-position:0 -90px;width:43px;height:24px}"+
                "    .p-icon__deleted{background-image:url(/common/images/program/p-icon.png);background-position:-53px -90px;width:43px;height:24px}"+
                "    .p-icon__doc{background-image:url(/common/images/program/p-icon.png);background-position:-34px -124px;width:22px;height:22px}"+
                "    .p-accordion__button.active:after,.p-accordion__button:after,.p-icon__down,.p-poll-result__link:after{background-image:url(/common/images/program/p-icon.png);background-position:-192px -158px;width:15px;height:8px}"+
                "    .p-external-link:after,.p-icon__external-link{background-image:url(/common/images/program/p-icon.png);background-position:-162px -124px;width:12px;height:12px}"+
                "    .p-icon__facebook{background-image:url(/common/images/program/p-icon.png);background-position:-90px 0;width:35px;height:35px}"+
                "    .p-icon__file,.p-upload__label.file{background-image:url(/common/images/program/p-icon.png);background-position:-135px -100px;width:14px;height:14px}"+
                "    .p-icon__folder{background-image:url(/common/images/program/p-icon.png);background-position:-188px -32px;width:22px;height:22px}"+
                "    .p-icon__gif{background-image:url(/common/images/program/p-icon.png);background-position:-188px -64px;width:22px;height:22px}"+
                "    .p-icon__hot-bg{background-image:url(/common/images/program/p-icon.png);background-position:-135px 0;width:43px;height:24px}"+
                "    .p-icon__hot{background-image:url(/common/images/program/p-icon.png);background-position:-135px -34px;width:43px;height:24px}"+
                "    .p-icon__html{background-image:url(/common/images/program/p-icon.png);background-position:-32px -158px;width:22px;height:22px}"+
                "    .p-icon__hwp{background-image:url(/common/images/program/p-icon.png);background-position:-64px -158px;width:22px;height:22px}"+
                "    .p-icon__insta{background-image:url(/common/images/program/p-icon.png);background-position:0 0;width:35px;height:35px}"+
                "    .p-icon__jpg{background-image:url(/common/images/program/p-icon.png);background-position:-128px -158px;width:22px;height:22px}"+
                "    .p-icon__js{background-image:url(/common/images/program/p-icon.png);background-position:-160px -158px;width:22px;height:22px}"+
                "    .p-icon__kakostory{background-image:url(/common/images/program/p-icon.png);background-position:-45px -45px;width:35px;height:35px}"+
                "    .p-icon__new{background-image:url(/common/images/program/p-icon.png);background-position:0 -124px;width:24px;height:24px}"+
                "    .p-icon__noimg{background-image:url(/common/images/program/p-icon.png);background-position:-220px -64px;width:22px;height:22px}"+
                "    .p-icon__pdf{background-image:url(/common/images/program/p-icon.png);background-position:-220px -96px;width:22px;height:22px}"+
                "    .p-icon__png{background-image:url(/common/images/program/p-icon.png);background-position:-220px -128px;width:22px;height:22px}"+
                "    .p-icon__ppt{background-image:url(/common/images/program/p-icon.png);background-position:0 -190px;width:22px;height:22px}"+
                "    .p-icon__question-hover{background-image:url(/common/images/program/p-icon.png);background-position:-32px -190px;width:22px;height:22px}"+
                "    .p-icon__question{background-image:url(/common/images/program/p-icon.png);background-position:-188px 0;width:22px;height:22px}"+
                "    .p-icon__reply{background-image:url(/common/images/program/p-icon.png);background-position:-135px -68px;width:34px;height:22px}"+
                "    .p-icon__secret{background-image:url(/common/images/program/p-icon.png);background-position:-106px -90px;width:12px;height:17px}"+
                "    .p-icon__select-arrow{background-image:url(/common/images/program/p-icon.png);background-position:-172px -190px;width:11px;height:8px}"+
                "    .p-icon__swf{background-image:url(/common/images/program/p-icon.png);background-position:-66px -124px;width:22px;height:22px}"+
                "    .p-icon__times-circle,.p-upload__clear{background-image:url(/common/images/program/p-icon.png);background-position:-220px -160px;width:18px;height:18px}"+
                "    .p-icon__times{background-image:url(/common/images/program/p-icon.png);background-position:-130px -190px;width:10px;height:10px}"+
                "    .p-icon__twitter{background-image:url(/common/images/program/p-icon.png);background-position:0 -45px;width:35px;height:35px}"+
                "    .p-icon__txt{background-image:url(/common/images/program/p-icon.png);background-position:-130px -124px;width:22px;height:22px}"+
                "    .p-icon__xls{background-image:url(/common/images/program/p-icon.png);background-position:-98px -124px;width:22px;height:22px}"+
                "    .p-icon__xlsx{background-image:url(/common/images/program/p-icon.png);background-position:-220px -32px;width:22px;height:22px}"+
                "    .p-icon__xml{background-image:url(/common/images/program/p-icon.png);background-position:-188px -96px;width:22px;height:22px}"+
                "    .p-icon__zip{background-image:url(/common/images/program/p-icon.png);background-position:-220px 0;width:22px;height:22px}"+
                "}";

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
            popupWindow.document.querySelector('head').appendChild(style);

            popupWindow.onload = function(){

                if(popupWindow.document.querySelector('.tab_menu')) popupWindow.document.querySelector('.tab_menu').style.display = 'none';
                popupWindow.document.body.style.zoom = '80%';

                TriggerPrint();

                function TriggerPrint(){
                    popupWindow.print();
                    popupWindow.close();
                };
            };
        };

    });
})(window.jQuery);

function validateSearch() {
    const input = document.getElementById('kwd');
    if (input.value.trim() === '') {
        alert('검색어를 입력해주세요.');
        return false;
    }
    return true;
}

function validateSearch2() {
    const input = document.getElementById('kwd2');
    if (input.value.trim() === '') {
        alert('검색어를 입력해주세요.');
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    if(!(document.querySelector('.search_reset'))) return;
    document.querySelector('.search_reset').addEventListener('click', function () {
        // 텍스트 입력 필드 초기화
        document.querySelectorAll('input[type="text"]').forEach(function (input) {
            input.value = '';
        });

        // select 요소 초기화 (첫 번째 옵션 선택)
        document.querySelectorAll('select').forEach(function (select) {
            select.selectedIndex = 0;
        });
    });
});