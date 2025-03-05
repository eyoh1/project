(function($) {
    'use strict';

    $(function() {

        $('.path li.list button').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.list'),
				$OtherParents = $MyParent.siblings('li.list'),
				$MyLayer = $this.siblings('.layer'),
				$OtherBtn = $OtherParents.find('button'),
				$OtherLayer = $OtherParents.find('.layer'),
				IsActive = $MyParent.is('.active');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtn.attr('title', '목록열기');
				$OtherLayer.slideUp();
				$MyParent.addClass('active');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			} else{
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			};
		});



    });
})(window.jQuery);
