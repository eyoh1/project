(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function () {
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if (LayoutType == 'normal') {
            if (scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            } else {
                $wrapper.attr('data-nowtop', 'top');
            }
            ;
        } else if (LayoutType == 'visualtype') {
            if (scrollTop > ContainerOffset.top - 150) {
                $wrapper.attr('data-nowtop', 'nontop');
            } else {
                $wrapper.attr('data-nowtop', 'top');
            }
            ;
        }
        $window.on('scroll', function (event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if (LayoutType == 'normal') {
                if (scrollTop > wrapperOffset.top) {
                    if (headerIsActive) {
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                    ;
                } else {
                    $wrapper.attr('data-nowtop', 'top');
                }
                ;
            } else if (LayoutType == 'visualtype') {
                if (scrollTop > ContainerOffset.top - 150) {
                    if (headerIsActive) {
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                    ;
                } else {
                    $wrapper.attr('data-nowtop', 'top');
                }
                ;
            }
        });

        /*비주얼 슬릭*/
        function LoadingFirst() {
            var $totalbar = $('.visual .totalbar');
            $totalbar.removeClass('loading first active');
            setTimeout(function () {
                $totalbar.addClass('loading first active');
            }, 1);
        }

        function Loading() {
            var $totalbar = $('.visual .totalbar');
            $totalbar.removeClass('loading first active');
            setTimeout(function () {
                $totalbar.addClass('loading');
            }, 1);
        }


        var $Visual = $('.visual'),
            $VisualList = $('.visual .visual_list'),
            $VisuDots = $('.visual .control_box .dots'),
            $VisualBar = $('.visual .visual_wrap .visualbox .controlbox .controller .totalbar'),
            VisualLength = $VisualList.find('.visual_item').length;
        $VisualList.on('init', function (event, slick, currentSlide) {
            LoadingFirst();
            var $currentslide = $(slick.$slides[0]);
            $Visual.addClass('active').attr('data-active', '0');
            $currentslide.addClass('active');
        });
        $VisualList.slick({
            //기본
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: true,
            speed: 700,
            fade: true,
            prevArrow: $('.visual .control_box .prev'),
            nextArrow: $('.visual .control_box .next'),
            dots: false,


            //추가 기능
            autoArrow: $('.visual .control_box .auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseOnDotsClick: true,
            pauseText: '정지',
            playText: '재생',
            total: $('.visual .control_box .total'),
            current: $('.visual .control_box .current'),
            /*  customState : function(state) {
                  //현재 슬라이드 위치가 10보다 작을 때
                  if(state.current < 10) {
                      state.current = '0' + state.current;
                  }
                  //슬라이드 갯수가 10보다 작을 때
                  if(state.total < 10) {
                      state.total = '0' + state.total;
                  }
                  return state;
              },*/
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: false,
                        fade: false,
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        swipe: true,
                        draggable: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: false
                    }
                }]
        });


        $VisualList.on('afterChange', function (event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]);
            $(slick.$slides).removeClass('active');
            $currentslide.addClass('active');
            $Visual.addClass('active').attr('data-active', currentSlide);
        });
        $window.on('responsive', function (event) {
            if (event.state == 'wide' || event.state == 'web' || event.state == 'tablet') {
                if (VisualLength >= 2) {
                    $('.visual .visual_wrap .coltrolbox .controls button.auto').text('정지');
                }
            }
            if (event.state == 'phone') {
                $VisualList.slick('slickPause');
                $('.visual .visual_wrap .coltrolbox .controls button.auto').text('재생');
            }
            ;
        });

        /*비주얼슬릭 끝*/
		
		//달력 처음 로딩시 줄수 판단해서 class 부여 2022-05-11 서정한
		var calendarTrLength = $('.calendarbox .calendar .schedule tbody tr').length;
		$('.calendarbox .calendar .schedule').attr('data-divide', calendarTrLength);

        //달력 일 클릭 시 리스트 레이어
        var $Calendar = $('.calendarbox .calendar'),
            $LayerBox = $Calendar.find('.daily_box'),
            $LayerBoxClose = $LayerBox.find('.title_box .close_btn'),
            $CalendarTr = $Calendar.find('tr'),
            $CalendarTd = $Calendar.find('td'),
            $CalendarBtn = $CalendarTd.find('.schedule_btn');


        $CalendarTd.each(function () {
            var $this = $(this),
                $CalendarBtn = $this.find('.schedule_btn'),
                $CalendarDay = $CalendarBtn.find('.list_day'),
                Day = $CalendarDay.find('.num').text();
            $this.attr('data-date', Day);
        });


        $CalendarBtn.on('click', function () {
            var $this = $(this),
                $thisTd = $this.closest($CalendarTd),
                thisDay = $thisTd.data('date'),
                IsActive = $thisTd.is('.active_layer');

            if (!IsActive) {
                $thisTd.removeClass('active');
            }

        });


        $CalendarBtn.on('click', function () {
            var $this = $(this),
                $thisTd = $this.closest($CalendarTd),
                $thisTr = $this.closest($CalendarTr),
                thisDay = $thisTd.data('date');

            $thisTr.addClass('active').siblings().removeClass('active');
            if ($thisTr.hasClass('active')) {
                $thisTd.addClass('active_layer').siblings().removeClass('active_layer');
            } else {
                $thisTd.removeClass('active_layer');
            }

            if ($thisTd.hasClass('active_layer')) {
                $.ajax({
                    url: '../../site/eco/data/data.html',
                    success: function (data) {
                        $LayerBox.empty().append(data);
                    }
                });
            }

        });
        /* 달력 끝*/


        //달력 일 클릭 시 리스트 레이어
        $CalendarBtn.on('click', function () {
            $('.daily_box').addClass('active');
            $('.daily_box').fadeIn(500);
        });

        $LayerBoxClose.on('click', function () {
            $('.daily_box').removeClass('active');
            $('.daily_box').fadeOut(500);
        });


        //달력 일 클릭 시 리스트 선택 여부 시작
        /*$('.calendar .table_box .schedule .schedule_btn').on('click', function () {

            var $this = $(this),
                IsActive = $this.is('active'),
                $ScheduleTable = $('.section.calendar .table_box .schedule'),
                $ScheduleBtns = $ScheduleTable.find('.schedule_btn'),
                $DailyList = $('.section.calendar .daily_box .daily_list');
            if (!IsActive) {
                $.ajax({
                    url: '/eco/data/data.html',
                    success: function (data) {
                        $DailyList.empty().append(data);
                    }
                });
            }
        });*/
        //달력 일 클릭 시 리스트 선택 여부 끝





        //스크롤 애니메이션 시작
        var $ScrollWrap = $('.scroll_wrap'),
            $ScrollWrap2 = $('.scroll_wrap2');
        $window.on('scroll', function(event) {
            $ScrollWrap.each(function(){
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    WindowMiddle = (WindowTop + WindowBottom) / 2,
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top,
                    ThisOffSetBottom = ThisOffSetTop + $this.height();
                if(ThisOffSetTop < WindowMiddle + 400){
                    $this.addClass('scroll_animation');
                }
                else{
                    $this.removeClass('scroll_animation');
                }
            });

            $ScrollWrap2.each(function(){
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    WindowMiddle = (WindowTop + WindowBottom) / 2,
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top,
                    ThisOffSetBottom = ThisOffSetTop + $this.height(),
                    ThisOffSetMiddle = (ThisOffSetTop + ThisOffSetBottom) / 2;
                if(ThisOffSetTop + 200 < WindowBottom){
                    $this.addClass('scroll_animation');
                }
                else{
                    $this.removeClass('scroll_animation');
                }
            });
        });
        //스크롤 애니메이션 끝

        //팝업 시작
        var $PointPopup = $('.point_popup .point_popup_list');

        $PointPopup.slick({
            //기본
            autoplay: true,
            dots: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            prevArrow: $('.point_popup .point_popup_control .prev'),
            nextArrow: $('.point_popup .point_popup_control .next'),


            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        autoplay: false,
                        arrows: false,
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        autoplay: false,
                        variableWidth: false,
                        infinite: true,
                        slidesToShow: 1,
                    }
                },
            ],
        });
        //팝업 끝



        //팝업 시작
        var $Popup = $('.popup .popup_list'),
            $popuptotal = $('.popup .total'),
            $popupcurrent = $('.popup .current');

        $Popup.slick({
            //기본
            autoplay: true,
            dots: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            prevArrow: $('.popup .popup_control .prev'),
            nextArrow: $('.popup .popup_control .next'),

            //추가 기능
            autoArrow: $('.popup .popup_control .auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseText: '정지',
            playText: '재생',
            total: $popuptotal,
            current: $popupcurrent,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        autoplay: false,
                        arrows: false,
                        variableWidth: true,
                        slidesToShow: 1,
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        autoplay: false,
                        variableWidth: false,
                        infinite: true,
                        slidesToShow: 1,
                    }
                },
            ],
        });
        //팝업 끝


        //포토갤러리 시작
        var $InfoSlide = $('.eco_photo .eco_photo_list')
        $InfoSlide.slick({
            autoplay : false,
            arrows : false,
            dots : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            slidesToShow : 3,
            slidesToScroll : 1,
            infinite : true,
            variableWidth: true,
            responsive : [{
                breakpoint : 1401,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 1001,
                settings : {
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    slidesToShow :2,
                    variableWidth: false,
                }
            },{
                breakpoint : 641,
                settings : {
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    slidesToShow :1,
                    variableWidth: false,
                }
            }]
        });
        //포토갤러리 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });


})
(jQuery);