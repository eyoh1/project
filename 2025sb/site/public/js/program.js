(function($){
    'use strict';


    $(function(){


        var $window = $(window),
            $document = $(document),
            $container = $('#container');

        // QnA
        var $qna = $container.find('.temp_accordion.qna_list'),
            $qnaItem = $qna.find('.qna_item'),
            $qnaBtn = $qna.find('.accordion_btn');

        $window.on('resize',function(){
            $qnaItem.each(function(){
                if($(this).hasClass('active')){
                    var $cont = $(this).find('.accordion_con'),
                        $contWrap = $cont.find('.boxwrap'),
                        contHei = $contWrap.innerHeight();

                    $cont.height(contHei);
                };
            });
        });

        $qnaBtn.on('click',function(){
            var $thisItem = $(this).closest('.qna_item'),
                $cont = $thisItem.find('.accordion_con'),
                $contWrap = $cont.find('.boxwrap'),
                contHei = $contWrap.innerHeight();

            $thisItem.toggleClass('active');
            if($thisItem.hasClass('active')){
                $(this).attr('title','내용닫기');
                $cont.height(contHei);
            }else{
                $(this).attr('title','내용열기');
                $cont.height(0);
            };
            $qnaItem.filter(function(){return $(this)[0]!==$thisItem[0]}).each(function(){
                $(this).removeClass('active');
                $(this).find('.accordion_btn').attr('title','내용열기');
                $(this).find('.accordion_con').height(0);
            });
        });


    });
})(window.jQuery);