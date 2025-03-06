
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function(){
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if(LayoutType=='normal'){
            if(scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        } else if(LayoutType=='visualtype'){
            if(scrollTop > ContainerOffset.top-150) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        }
        $window.on('scroll', function(event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if(LayoutType=='normal'){
                if(scrollTop > wrapperOffset.top) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            } else if(LayoutType=='visualtype'){
                if(scrollTop > ContainerOffset.top-150) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            }
        });


        //비주얼 슬릭 시작

        var $slide_control = $('.health_slick .health_slick_control'),
            $slide_box = $('.health_slick_box');
        $slide_box.each(function (){

            var $this = $(this),
                $slide = $this.find('.item_list'),
                healthtotal = $slide_control.find('.countbox .total'),
                healthcurrent = $slide_control.find('.countbox .current'),
                $control =$slide_control.find('.controls'),
                $prev = $control.find('.prev'),
                $next = $control.find('.next'),
                $auto = $control.find('.auto');

            $slide.slick({
                autoplay : true,
                swipe : true,
                draggable : true,
                infinite: true,
                arrows: true,//화살표 유무
                prevArrow :$prev, //이전 버튼 클래스
                nextArrow : $next, //다음 버튼 클래스
                dots : false,
                variableWidth: false,

                //추가 기능
                autoArrow : $auto,
                isRunOnLowIE : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseText : '정지',
                playText : '재생',
                total : healthtotal,
                current : healthcurrent,

                responsive: [
                    {
                        breakpoint: 1001,//화면 사이즈
                        settings: {
                            swipe : true,
                            draggable : true,
                            swipeToSlide: true
                        }
                    }]
            });
        });

        //비주얼 슬릭 끝

        //공지사항 탭메뉴 시작
        $('.board .inner_box .board_list .board_item .board_tab_btn').on('click', function () {
            var $this = $(this),
                $Parent = $this.parent('.board_item'),
                Index = $Parent.index(),
                $ParentF = $Parent.siblings('.board_item'),
                $ParentFbtn = $ParentF.find('.board_tab_btn'),
                $GrandParent = $Parent.parent('.board_list'),
                $GGrandParent = $GrandParent.parents('.inner_box'),
                $OtherParent = $GGrandParent.find('.board_content'),
                $OtherParentC = $OtherParent.find('.board_wrap').eq(Index),
                $OtherParentCsiblings = $OtherParentC.siblings('.board_wrap'),
                IsActive = $Parent.is('.active');
            if (!IsActive) {
                $Parent.addClass('active');
                $ParentF.removeClass('active');
                $this.attr('title', '선택됨');
                $ParentFbtn.removeAttr('title');
                $OtherParentC.addClass('active');
                $OtherParentCsiblings.removeClass('active');
            }
        });
        //공지사항 탭메뉴 끝

        //팝업 시작
        var $Popup = $('.popup .popup_list'),
            $popuptotal = $('.popup .total'),
            $popupcurrent = $('.popup .current');

        $Popup.slick({
            //기본
            autoplay : true,
            dots : false,
            swipe : true,
            draggable : true,
            slidesToShow : 1,
            variableWidth: false,
            infinite: true,
            prevArrow : $('.popup .popup_control .prev'),
            nextArrow : $('.popup .popup_control .next'),

            //추가 기능
            autoArrow : $('.popup .popup_control .auto'),
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseText : '정지',
            playText : '재생',
            total : $popuptotal,
            current : $popupcurrent,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        autoplay : false,
                        arrows:false,
                        variableWidth: false,
                        slidesToShow : 1,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        autoplay : false,
                        variableWidth: false,
                        infinite: true,
                        slidesToShow : 1,
                    }
                },
            ],
        });
        //팝업 끝

        //홍보동영상 시작
        var $TourImg = $('.y_img .y_img_list');
        $TourImg.slick({
            //기본
            autoplay: false,
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            variableWidth: true,
            prevArrow: $('.y_img .y_img_control .prev'),
            nextArrow: $('.y_img .y_img_control .next'),
            swipe: false,
            draggable: false,

            //추가 기능
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: true
                    }
                },
                {
                    breakpoint: 801,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode:true,
                        variableWidth: true
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode:false,
                        variableWidth: true
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode:true,
                        variableWidth: true
                    }
                }]
        });
        //홍보동영상 끝

		//전체선택
        $('.life_box.left ul li.all label').on('click', function() {
            var $this = $(this),
                $MyParent = $this.parent('li'),
                ParentIndex = $MyParent.index(),
                $thisCheckbox = $this.siblings('input[type="checkbox"]'),
                thisCheckboxIsChecked = $thisCheckbox.is(':checked'),
                $OtherParent = $MyParent.siblings('li'),
                $AllCheckbox = $OtherParent.find('input[type="checkbox"]');
            if (!thisCheckboxIsChecked) {
                $AllCheckbox.prop('checked', true);
            } else {
                $AllCheckbox.prop('checked', false);
            };
        });

        $('.life_box.left ul li:not(:first-child) label').on('click', function() {
            var $this = $(this),
                $MyParent = $this.parent('li'),
                ParentIndex = $MyParent.index(),
                $thisCheckbox = $this.siblings('input[type="checkbox"]'),
                thisCheckboxIsChecked = $thisCheckbox.is(':checked'),
                thisText = $this.find('.text').text(),
                $FirstParent = $MyParent.siblings('li').first(),
                $AllCheckbox = $FirstParent.find('input[type="checkbox"]'),
                AllCheckboxIsChecked = $AllCheckbox.is(':checked'),
                $OtherParent = $MyParent.siblings('li');
            if(AllCheckboxIsChecked && thisCheckboxIsChecked){
                $AllCheckbox.prop('checked', false);
                $OtherParent.each(function(){
                    var $this = $(this),
                        $thisLabel = $this.find('label'),
                        thisText = $thisLabel.find('.text').text(),
                        $thisCheckbox = $this.find('input[type="checkbox"]');

                });
            };
            if(!thisCheckboxIsChecked){

            };
        });


        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);