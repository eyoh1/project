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
        $('.rowgroup1').addClass('on');


        /* fade */
        var $fade = $('.fade, .fade_in');

        function fade() {
            $fade.each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();
                if (bottom_of_window > bottom_of_object / 1.3) {
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

        /* 반응형 주요사업 */
        var $project = $('.rowgroup3 .project'),
            $projectList = $project.find('.project_list'),
            $projectCtrl = $project.find('.project_control'),
            $projectPrev = $projectCtrl.find('.prev'),
            $projectNext = $projectCtrl.find('.next');

        function $projectList1(){
            if ($(window).width() < 641) {
                $projectList.slick({
                    autoplay: false,
                    swipe: true,
                    draggable: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: true,
                    variableWidth: true,
                    prevArrow: $projectPrev,
                    nextArrow: $projectNext,
                });
            }else{
                $projectList.slick('unslick');
            }
        }
        $projectList1();
        $window.on('resize', function() {
            $projectList1();
        });


        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);
