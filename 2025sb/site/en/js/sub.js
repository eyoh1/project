(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container'),
            $contents = $('#contents'),
            debounce = null;


        // breadcrumbs
        var $breadcrumbs = $container.find('.sub_head .breadcrumbs'),
            $breadcrumbsItem = $breadcrumbs.find('.breadcrumbs_item'),
            $breadcrumbsAnchor = $breadcrumbs.find('.breadcrumbs_anchor');


        $breadcrumbsAnchor.each(function(){
            var $this = $(this),
                $item = $this.closest('.breadcrumbs_item'),
                $wrap = $item.find('.breadcrumbs_wrap');

            if($wrap.length<1) return;
            $this.attr('title','목록열기');
            $item.addClass('has');

            $this.on('click',function(){
                event.preventDefault();

                $breadcrumbsItem.filter(function(){return !$(this).is($item)}).each(function(){
                    if($(this).find('.breadcrumbs_wrap').length<1) return;
                    $(this).removeClass('active');
                    $(this).find('.breadcrumbs_anchor').attr('title','목록열기');
                    $(this).find('.breadcrumbs_wrap').removeAttr('style');
                });

                $item.toggleClass('active');
                var wrapHei = $wrap.find('ul').outerHeight(true);

                if($item.hasClass('active')){
                    $this.attr('title','목록닫기');
                    $wrap.height(wrapHei);
                }else{
                    $this.attr('title','목록열기');
                    $wrap.removeAttr('style');
                }
            });
        });


    });
})(window.jQuery);
