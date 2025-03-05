(function($) {
    'use strict';

    $(function () {
        var $container = $('#container');
        //  커스텀 셀렉트 박스
        var $select = $('.select_box'),
            $selectBtn = $select.find('.select_btn'),
            $selectList = $select.find('.select_list');

        $selectBtn.on('click', function () {
            var $this = $(this),
                $thisList = $this.siblings('.select_list'),
                $selectItem = $thisList.find('li'),
                hasActive = $this.hasClass('active');

            $selectBtn.removeClass('active').attr('title', '목록열기').not($this);
            $selectList.slideUp(300).not($thisList);

            if(!hasActive) {
                $this.addClass('active').attr('title', '목록닫기');
                $thisList.slideDown(300);
            } else {
                $this.removeClass('active').attr('title', '목록열기');
                $thisList.slideUp(300);
            }

            $selectItem.on('click', function () {
                var $this = $(this),
                    thisText = $this.text();

                $this.parent().siblings($selectBtn).text(thisText).removeClass('active').attr('title', '목록닫기');
                $selectList.slideUp(300);
            })
        })

        // 반응형 테이블
        var $tableResponsive = $container.find('.table.responsive');
        $tableResponsive.each(function(index, element) {
            var $element = $(element),
                rowdivIs = $element.find('td, th').is('[rowdiv]'),
                theadLength = $element.find('thead').length;

            if(rowdivIs == false && !theadLength == 0){
                $element.find('tbody th, tbody td').each(function(index, element) {
                    var $this = $(element),
                        thisIndex = $this.index(),
                        theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

                    $this.attr('data-content', theadText);
                });

                $element.find('tfoot th, tfoot td').each(function(index, element) {
                    var $this = $(element),
                        thisIndex = $this.index(),
                        theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

                    $this.attr('data-content', theadText);
                });
            }
        });
    });
})(window.jQuery);
