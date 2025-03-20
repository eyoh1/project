(function ($) {
    'use strict';

    $(function () {

        var $window = $(window),
            $container = $('#container'),
            $contents = $('#contents'),
            debounce = null;

        /* fade */
        var $fade = $container.find('.fade');

        function fade() {
            $fade.each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();
                if (bottom_of_window > bottom_of_object / 1.2) {
                    $(this).addClass('show');
                } else {
                    $(this).removeClass('show');
                }
            });
        }

        fade();
        $window.scroll(function () {
            fade();
        });


        /* 비주얼 */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualCurrent = $visual.find('.template_current'),
            $visualTotal = $visual.find('.template_total'),
            $visualPrev = $visual.find('.template_prev'),
            $visualNext = $visual.find('.template_next'),
            $visualAuto = $visual.find('.template_auto');

        $visualList.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            infinite: true,
            variableWidth: true,
            current: $visualCurrent,
            total: $visualTotal,
            playText: '재생',
            pauseText: '정지',
            autoArrow: $visualAuto,
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            speed: 1000,
            autoplaySpeed: 8000,
            autoplay: false,
            pauseOnHover: false,
            dots: false,
            customState: function (state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if (state.current < 10) {
                    state.current = '0' + state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if (state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 1,
                        variableWidth:false,
                    }
                }
            ]
        });


        /* 게시판 */
        var $board = $container.find('.board'),
            $boardTab = $board.find('.board_tab'),
            $boardTabItem = $boardTab.find('.tab_item'),
            $boardTabBtns = $boardTabItem.find('button'),
            $boardList = $board.find('.board_list'),
            $boardPrev = $board.find('.board_control .board_prev'),
            $boardNext = $board.find('.board_control .board_next'),
            $boardMore = $board.find('.board_more'),
            $boardOpt = {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: false,
                draggable: false,
                prevArrow: $boardPrev,
                nextArrow: $boardNext,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 2,
                            variableWidth: false,
                            centerMode:false,
                        }
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: false,
                            centerMode:false,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            swipe: true,
                            draggable: true,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            swipeToSlide: true,
                            dots: true,
                            vertical:true,
                            variableWidth:false
                        }
                    },
                ]
            };


        $boardList.slick($boardOpt);
        $boardTabBtns.on('click', function (event) {
            var $this = $(this),
                thisText = $this.text();

            $boardTabItem.removeClass('active').find('button').removeAttr('title');
            $(this).attr('title', '선택됨').closest('li').addClass('active');
            $boardList.slick('slickUnfilter');
            if ($(this).attr('data-type') != 'all') {
                $boardList.slick('slickFilter', '.' + $(this).attr('data-type'));
            }

            var url = "";
            if (thisText == '공지사항') {
                url = "/bogunso/selectBbsNttList.do?bbsNo=64&key=271";
            } else if (thisText == '프로그램') {
                url = "/bogunso/selectBbsNttList.do?bbsNo=65&key=272";
            } else if (thisText == '건강정보') {
                url = "/bogunso/selectBbsNttList.do?bbsNo=66&key=273";
            }
            $boardMore.prop('href', url);
        }).eq(0).trigger('click');


        /* 서비스 */
        var $service = $container.find('.service'),
            $serviceList = $service.find('.service_list'),
            $servicePrev = $service.find('.service_control .service_prev'),
            $serviceNext = $service.find('.service_control .service_next');

        function serviceSlide() {
            if ($(window).width() > 641) {
                $serviceList.slick({
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    draggable: true,
                    infinite: false,
                    variableWidth: true,
                    prevArrow: $servicePrev,
                    nextArrow: $serviceNext,
                    speed: 1000,
                    autoplaySpeed: 5000,
                    autoplay: false,
                    pauseOnHover: false,
                    dots: false,
                    responsive: [
                        {
                            breakpoint: 1501,
                            settings: {
                                slidesToShow: 6,
                            }
                        },
                        {
                            breakpoint: 1301,
                            settings: {
                                slidesToShow: 5,
                            }
                        },
                        {
                            breakpoint: 1001,
                            settings: {
                                slidesToShow: 4,
                                variableWidth: false,
                            }
                        },
                        {
                            breakpoint: 801,
                            settings: {
                                slidesToShow: 3,
                                variableWidth: false,
                            }
                        }
                    ],
                });
            }else {
                $serviceList.slick('unslick');
            }
        }

        serviceSlide();
        $window.on('resize', function() {
            serviceSlide();
        });

    });
})(window.jQuery);
