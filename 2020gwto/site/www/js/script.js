
/* 메인 스크롤 스크립트*/
$(function () {

    var $window = $(window),
        $scrollcontent = $('.slow');

    $scrollcontent.each(function () {
        var $this = $(this),
            scrollTop = $window.scrollTop(),
            scrollBottom = scrollTop + $window.height(),
            contentOffset = $this.offset();
        if (scrollBottom > contentOffset.top) {
            $this.addClass('active');
        }
        ;
    });

    $window.on('scroll', function (event) {

        $scrollcontent.each(function () {
            var $this = $(this),
                scrollTop = $window.scrollTop(),
                scrollBottom = scrollTop + $window.height(),
                contentOffset = $this.offset();
            if (scrollBottom > contentOffset.top) {
                $this.addClass('active');
            } else {
                $this.removeClass('active');
            }
            ;
        });

    });

});
