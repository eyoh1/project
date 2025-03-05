(function($) {
	'use strict';

	$(function () {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		/* cms 탭메뉴 */
		var $tabMenuType1 = $container.find('.tab_menu.type1'),
			$tabMenuType2 = $container.find('.tab_menu.type2'),
			$tabSelect = $tabMenuType1.find('.tab_select'),
			$tabItem = $tabMenuType1.find('.tab_item');

		if($tabMenuType1.length){
			$tabMenuType1.addClass('depth' + $tabMenuType1.find('.tab_item').length);
		}
		if($tabMenuType2.length){
			$tabMenuType2.addClass('depth' + $tabMenuType2.find('.tab_item').length);
		}

		$tabSelect.each(function (){
			$(this).on('click', function(event) {
				$(this).next('.tab_panel').stop().slideToggle('250', 'easeOutExpo');
				$(this).parent().toggleClass('active');
			});
		});

		$window.on('screen', function(event) {
			if($(window).width() < 641){
				$tabItem.on('click', function(event) {
					$(this).parents('.tab_panel').slideUp('250', 'easeOutExpo');
					$tabMenuType1.removeClass('active');
				});
			}
		});

		/* 숙소 및 이용안내*/
		var $slide_box = $('.swipe_box');
		$slide_box.each(function (){
			var $this = $(this),
				$slide = $this.find('.item_list'),
				$control = $this.find('.controls'),
				$count = $this.find('.counts'),
				$prev = $control.find('.prev'),
				$next = $control.find('.next'),
				$slideCurrent = $count.find('.swipe_current'),
				$slideTotal =  $count.find('.swipe_total');

			$slide.slick({
				autoplay : false,
				swipe : false,
				fade : true,
				draggable : true,
				infinite: true,
				arrows: true,//화살표 유무
				prevArrow :$prev, //이전 버튼 클래스
				nextArrow : $next, //다음 버튼 클래스
				current: $slideCurrent,
				total: $slideTotal,
				dots : false,

				responsive: [
					{
						breakpoint: 1001,//화면 사이즈
						settings: {
							draggable : true,
							swipeToSlide: true
						}
					}]
			});
		})

		/* 컨텐츠 탭메뉴 */
		var $tab = $contents.find('.tab'),
			$tabButton = $tab.find('button.tab_button'),
			$tabContent = $tab.find('.tab_content');

		$('.tab_select').click(function () {
			$(this).parent('.tab').toggleClass('active');
		});

		$tabButton.click(function (event) {
			var $this = $(this),
				tabButtonText = $this.text(),
				index = $tabButton.index(this);

			$this.parent().addClass('active').siblings().removeClass('active');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);
			$tabContent.eq(index).addClass('active').siblings().removeClass('active');
		});



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
