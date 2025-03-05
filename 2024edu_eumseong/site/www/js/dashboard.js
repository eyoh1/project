(function($){
    'use scrict'

    $(function(){
        var $window = $(window),
            $container = $('#container');

        // program
        var $program = $container.find('.program'),
            $programList = $program.find('.program_list'),
            $programSlckOpt = {
                infinite: true,      //무한반복 (boolean) -default:true
                slidesToShow: 3,     //한번에 보여지는 갯수
                slidesToScroll: 1,   //한번에 넘겨지는 갯수
                autoplay: true,      //자동시작 (boolean) -default:false
                autoplaySpeed: 4000, //자동넘기기 시간(int, 1000ms = 1초)
                dots: true,         //네비게이션버튼 (boolean) -default:false
                arrows: false,        //화살표(넘기기버튼) 여부 (boolean) -default:true
                speed: 2000,         //모션 시간 (1000 = 1초)
                pauseOnFocus: false,
                pauseOnHover: false,
            };

        $programList.slick($programSlckOpt)
    });
})(window.jQuery);