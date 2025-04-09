(function($) {
	'use strict';

	$(function() {

        var $window = $(window),
            $html = $('html'),
            $wrapper = $('#wrapper'),
            $footer = $('#footer');

        // header fix
        $window.on('scroll', function () {
            if (window.scrollY > 125) $html.addClass('header_fix');
            else $html.removeClass('header_fix');
        });

        var scrollTop = $window.scrollTop(),
            wrapperOffset = $wrapper.offset();

        if (scrollTop > wrapperOffset.top) {
            $html.addClass('header_fix');
        } else {
            $html.removeClass('header_fix');
        }

        //Language
        $('.language_show').on('click', function(){
            var $this = $(this),
                $language = $this.parent('.language'),
                $languagePanel = $this.siblings('.language_panel'),
                OnOff = $language.is('.active');

            if(!OnOff){
                $languagePanel.slideDown();
                $language.addClass('active');
            } else{
                $language.removeClass('active');
                $languagePanel.slideUp();
            }
        });

        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.up_button');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 400);
        });


	});
})(window.jQuery);
