
'use strict';
try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            $.tag = {
                wdw : $(window),
                dcmt : $(document),
                html : $('html')
            };
            var $window = $(window);
            $(function() {

                //여기서부터 코드 작성해주세요

                $.tag.wdw.on('responsive.main', function(event) {

                    if(event.state == 'wide' || event.state == 'web') {

                    }
                    if(event.state == 'tablet') {

                    }
                    if(event.state == 'phone') {

                    }

                });

                //비주얼
                var $rowgroup = $('.rowgroup'),
                    $contentList = $rowgroup.find('.visual_img_list'),
                    $contentCurrent = $rowgroup.find('.content_current'),
                    $contentTotal = $rowgroup.find('.content_total');


                $contentList.slick({
                    draggable : true,
                    swipe : true,
                    touchMove : true,
                    autoplaySpeed:3000,
                    infinite : true,
                    autoplay : true,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    playText : '재생',
                    pauseText : '정지',
                    dots : false,
                    arrow : false,
                    total : $contentTotal,
                    current : $contentCurrent,
                    autoArrow : false,
                    prevArrow :$('.progress_box .prev'),
                    nextArrow : $('.progress_box .next'),
                    responsive : [{
                        breakpoint : 1001,
                        settings : {
                            draggable : true,
                            swipe : true,
                            touchMove : true,
                            adaptiveHeight : true,
                        }
                    }]
                });

                // 비주얼 0붙이기
                if($contentTotal.text() <= 10){

                    $contentTotal.prepend('0');

                    $contentList.on('afterChange', function(event, slick){
                        $contentTotal.prepend('0');
                    });
                }
                if($contentCurrent.text() <= 10){

                    $contentCurrent.prepend('0');

                    $contentList.on('afterChange', function(event, slick){
                        $contentCurrent.prepend('0');
                    });
                }

                //화살표 애니메이션
                $contentList.on('afterChange',function(){
                    $(".bar_arrow").addClass('pro-ani');
                });
                $contentList.on('beforeChange',function(){
                    $(".bar_arrow").removeClass('pro-ani');
                });

                //전체 컨텐츠 슬라이드
                $(function () {
                    var selNum = 0,
                        $proList = $(".slide_content"),//item class
                        $btnDots = $(".btn_dots"),//btn class
                        totalNum = $proList.length,
                        $btnprev = $(".slide_btn_prev"),
                        $btnnext = $(".slide_btn_next"),
                        oldNum;

                    $(function () {
                        $proList.css({display: "none"});
                        $proList.eq(selNum).fadeIn(1500).addClass('active');

                        function prevItem() {
                            oldNum = selNum;
                            selNum = selNum - 1;
                            if (selNum < 0) {
                                selNum = totalNum - 1;
                            }
                            if (selNum == 0) {
                                $('html').addClass('first');
                            } else {
                                $('html').removeClass('first');
                            }
                            setting('-1');
                        }

                        function nextItem() {
                            oldNum = selNum;
                            selNum = selNum + 1;
                            if (selNum >= totalNum) {
                                selNum = 0;
                                $('html').addClass('first');
                            } else {
                                $('html').removeClass('first');
                            }

                            setting('1');

                        }

                        $btnprev.on('click', prevItem).parent('.slide_box').siblings('.content_dots').find('button').addClass('active');
                        $btnnext.on('click', nextItem).parent('.slide_box').siblings('.content_dots').find('button').removeClass('active');

                        function setting(adjust) {
                            var adjust1 = adjust * 1,
                                adjust2 = adjust * -1;
                            if (setting.adjust == indicate) {
                                if (selNum < oldNum) {
                                    adjust1 = adjust * -1;
                                    adjust2 = adjust;
                                }
                            }
                            $proList.eq(selNum).css({left: adjust1 * 1400 + 'px', display: 'block', opacity: 0});
                            $proList.eq(oldNum).stop().animate({
                                left: adjust2 * 1400 + 'px',
                                opacity: 0
                            }, function () {
                                //dot 클래스 제거
                                $btnDots.eq(oldNum).removeClass('active').removeAttr('title');
                            }).removeClass('active').removeAttr('title');
                            $proList.eq(selNum).stop().animate({left: 0, opacity: 1}, 300, function () {
                                //dot 클래스 삽입
                                $btnDots.eq(selNum).addClass('active').attr('title', '선택됨');
                            }).addClass('active').attr('title', '선택됨');

                            slideBtnNmReducer(selNum);
                        }

                        function indicate() {
                            oldNum = selNum;
                            selNum = $(this).index();
                            if (selNum == oldNum) return;
                            setting('1');
                        }

                        $btnDots.on('click', indicate);

                        $window.on('load', function () {
                            $('html').addClass('first');
                        });

                        $(function () {
                            $('.btn_dots').on('click', function () {
                                $('html').removeClass('first');
                            });
                            $('.btn_dots.n1').on('click', function () {
                                $('html').addClass('first');
                            });
                        });

                    });

                    function Resizejs() {
                        if ($window.width() > 640) {

                        } else{
                            var $spot = $('.spot'),
                                $spotList = $spot.find('.spot_list');

                            $spotList.each(function (index, element) {
                                $(element).slick({
                                    draggable: true,
                                    swipe: true,
                                    touchMove: true,
                                    cssEase: 'cubic-bezier(1, 0, 0, 1)',
                                    speed: 250,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    prevArrow: false,
                                    nextArrow: false,
                                    Arrow: false,
                                    dots: false,
                                    variableWidth: true,
                                    infinite: true,
                                });
                            });

                            $(window).scroll(function () {
                                var num = $(this).scrollTop();
                                if (num > 80) {
                                    $('#header').addClass('scroll');
                                    $('.header_box').addClass('scroll');
                                    $('.header_box:before').css('display', 'none');

                                } else {
                                    $('#header').removeClass('scroll');
                                    $('.header_box').removeClass('scroll');
                                    $('.header_box:before').css('display', 'block');
                                }
                            });

                            var $contentBox = $('.slide_content'),
                                $contentItem = $contentBox.find('.show_item');

                            $window.scroll(function () {
                                $contentItem.each(function (i) {
                                    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                                    var bottom_of_window = $window.scrollTop() + $window.height();
                                    if (bottom_of_window > bottom_of_object / 1.2) {
                                        $(this).addClass('show');
                                    }
                                    if (bottom_of_window < bottom_of_object / 1.2) {
                                        $(this).removeClass('show');
                                    }
                                });
                            });
                        }
                    }
                    $window.on('load', function(){
                        Resizejs();
                    });
                    $window.resize(function(){
                        Resizejs();
                    });
                });
            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}