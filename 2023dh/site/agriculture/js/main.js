(function($) {
    'use strict';

    var $html = $('html');

    $(function() {
        var $window = $(window),
            $html = $('html'),
            $container = $('#container'),
            $footer = $('#footer');

        //여기서부터 코드 작성해주세요


        /*비주얼 온*/
        $('.visual').addClass('on');


        /* 디자인-셀렉트박스  */
        var $select = $('.select_design'),
            $selectAllButton = $select.find('button','a'),
            $selectAllButtonText = $selectAllButton.find('span'),
            $selectAnchor = $select.find('.select_anchor'),
            $selectPanel = $select.find('.select_panel');

        $selectAnchor.click(function () {
            var $this = $(this),
                selectButtonText = $this.text();

            $this.attr('title', '선택됨').closest('.select_item').addClass('active').siblings('.select_item').removeClass('active').find($selectAnchor).removeAttr('title');
            $this.parents('.select_design').find($selectAllButtonText).text(selectButtonText);
            $selectPanel.addClass('active').siblings().removeClass('active');


        });
        $selectAllButton.click(function () {
            var $this = $(this),
                IsActive = $select.is('.active');
            if(!IsActive){
                $this.attr('title','열림');
                $select.find($selectPanel).stop().slideDown('easeOutExpo');
                $select.addClass('active');
            } else{
                $this.removeAttr('title');
                $select.find($selectPanel).stop().slideUp('easeOutExpo');
                $select.removeClass('active');
            }
        });
        $('.select_panel .select_hide').on('click', function(){
            $('.select_hide').parents('.select_design').removeClass('active');
            $('.select_hide').parent('.select_panel').slideUp();
        });




        /* 게시판 tabmenu */
        var $tabs = $container.find('.tabs'),
            $tabButton = $tabs.find('.tab_button');

        $tabButton.on('click', function(event){
            var $this = $(this),
                $boardList = $board.find('.basic_list');

            event.preventDefault();

            if($this.parent().hasClass('button_box')){
                $this.parents('.board_item').addClass('active').siblings().removeClass('active');
                $this.parents('.board_item').siblings().find('.tab_button').removeAttr('title');
                $this.attr('title', '선택됨');
            } else {
                $this.parent().addClass('active').siblings().removeClass('active');
                $this.parent().siblings().children('.tab_button').removeAttr('title');
                $this.attr('title', '선택됨');

            }
        });

        /* 게시판 (반응형 슬릭) */
        var $board = $container.find('.board'),
            $boardList1 = $board.find('.n1 .basic_list'),
            $boardList2 = $board.find('.n2 .basic_list');

        function boardSlide1(){
            if ($(window).width() < 641) {
                $boardList1.slick({
                    autoplay: false,
                    swipe: true,
                    draggable: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    variableWidth: true,
                });
            }else{
                $boardList1.slick('unslick');
            }
        }

        function boardSlide2(){
            if ($(window).width() < 641) {
                $boardList2.slick({
                    autoplay: false,
                    swipe: true,
                    draggable: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    variableWidth: true,
                });
            }else{
                $boardList2.slick('unslick');
            }
        }

        boardSlide1();
        $window.on('resize', function() {
            boardSlide1();
        });
        boardSlide2();
        $window.on('resize', function() {
            boardSlide2();
        });



        /*farm*/
        var $farm = $container.find('.farm'),
            $farmList = $farm.find('.farm_list'),
            $farmPrev = $farm.find('.farm_prev'),
            $farmNext = $farm.find('.farm_next');

        $farmList.slick({
            speed: 800,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: false,
            swipeToSlide: true,
            infinite: false,
            arrows: true,
            autoplay: false,
            playText: '재생',
            pauseText: '정지',
            pauseOnFocus: false,
            pauseOnHover: false,
            prevArrow: $farmPrev,
            nextArrow: $farmNext,
            responsive: [
                {
                    breakpoint: 1481,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 801,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: false,
                    }
                }
            ]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-current');
                        $node.addClass('slick-active');
                    });
                });
            }
        }); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.


        /* fade */
        var $fade = $('.fade, .fade_in');

        function fade() {
            $fade.each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();
                if (bottom_of_window > bottom_of_object / 1) {
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


        /* 즐겨찾는 메뉴 스크롤 */
        $('.quick_service .service_wrap').scroll(function(){
            var scrL= $('.quick_service .service_wrap').scrollLeft();
            if(scrL == $('.quick_service .service_wrap ul').width() - $('.quick_service .service_wrap').width()){
                $('.quick_service .service_wrap').addClass('end');
            } else {
                $('.quick_service .service_wrap').removeClass('end');
            }
        });



        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);
