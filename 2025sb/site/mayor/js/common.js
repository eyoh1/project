(function ($) {
    'use strict';

    $(function () {

        var $window = $(window),
            $html = $('html'),
            $document = $(document),
            $header = $document.find('#header'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        // 메뉴 보완
        var $lnb = $header.find('.lnb'),
            $lnbMenu = $lnb.find('.menu'),
            $lnbItem = $lnb.find('.depth_item'),
            $lnbText = $lnb.find('.depth_text'),
            $activeLnb = $lnbMenu.find('.active').last();

        $lnbText.on('focusout', function () {
            if (window.mode !== 'pc') return;
            setTimeout(function () {
                if ($(document.activeElement).closest('.lnb').length < 1) {
                    $lnbMenu.height('');
                    $html.removeClass('lnb_open');
                    $lnbItem.removeClass('active');
                }
                ;
            });
        });

        $window.on('load resize', function () {
            if (window.innerWidth < 1001) {
                var $parentItem = $activeLnb.parent().closest('li');
                $lnbItem.removeClass('active');
                while ($parentItem.length) {
                    $parentItem.addClass('active');
                    $parentItem = $parentItem.parent().closest('li');
                }
                ;
            }
            ;
        })

        // header fix
        $window.on('scroll', function () {
            if (window.scrollY > 40) $html.addClass('header_fix');
            else $html.removeClass('header_fix');
        });

        var scrollTop = $window.scrollTop(),
            wrapperOffset = $wrapper.offset();

        if (scrollTop > wrapperOffset.top) {
            $html.addClass('header_fix');
        } else {
            $html.removeClass('header_fix');
        }

        

    });
})(window.jQuery);
