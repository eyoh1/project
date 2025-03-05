

(function($) {
	'use strict';

	var $window = $(window),
		$document = $(document),
		$html = $('html'),
		$head = $('head'),
		$screen = $.screen,
		$inArray = $.inArray;

	$(function() {

		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target;

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					$this.toggleClass('active').siblings('.depth_item').removeClass('active');
					event.preventDefault();
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
		}

		//여기서부터 코드 작성해주세요

		$('.sub_visual').addClass('active');

		/* cms 탭메뉴 */
		var $tabMenu = $container.find('.tab_menu'),
			$tabPanel =  $tabMenu.find('.tab_depth6'),
			$tabItem =  $tabMenu.find('.tab_anchor'),
			$tabSelect = $tabMenu.find('.tab_select');

		$tabSelect.click(function () {
			var $this = $(this),
				$ParentTabmenu = $this.parent('.tab_menu'),
				IsActive = $ParentTabmenu.is('.active');
			if(!IsActive){
				$this.next('.tab_panel').slideDown('250', 'swing');
				$ParentTabmenu.addClass('active');
			} else{
				$this.next('.tab_panel').slideUp('250', 'swing');
				$ParentTabmenu.removeClass('active');
			};

		});


		/* 컨텐츠 탭 */
		var $tab = $container.find('.tab'),
			$tabButton = $tab.find('.tab_button'),
			$tabContent = $tab.find('.tab_content'),
			tabActiveText = $tab.find('.tab_menu .tab_item.active').text();

		$tab.find('.tab_select span').text(tabActiveText);

		$tabButton.click(function () {
			var $this = $(this),
				index = $tabButton.index(this),
				tabButtonText = $this.text(),
				IsTabAll = $this.is('.tab_all'),
				NowState = $.screen.settings.state[0],
				$tab_panel = $this.parents('.tab_panel'),
				$tab_menu = $this.parents('.tab_menu');
			$this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);
			if(IsTabAll){
				$tabContent.addClass('active');
			} else{
				$tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
			};
			if(NowState === 'phone'){
				$tab_menu.removeClass('active');
				$tab_panel.slideUp();
			};

		});

		/* 컨텐츠 템플릿 탭 */
		var $tabTemp = $container.find('.template'),
			$tabButtonTemp = $tabTemp.find('.tab_button'),
			$tabContentTemp = $tabTemp.find('.tab_content'),
			tabActiveText = $tabTemp.find('.tab_menu .tab_item.active').text();

		$tabTemp.find('.tab_select span').text(tabActiveText);

		$tabButtonTemp.click(function () {
			var $this = $(this),
				index = $tabButtonTemp.index(this),
				tabButtonText = $this.text(),
				IsTabAll = $this.is('.tab_all'),
				NowState = $.screen.settings.state[0],
				$tab_panel = $this.parents('.tab_panel'),
				$tab_menu = $this.parents('.tab_menu');
			$this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);
			if(IsTabAll){
				$tabContent.addClass('active');
			} else{
				$tabContentTemp.eq(index-1).addClass('active').siblings('.tab_content').removeClass('active');
			};
			if(NowState === 'phone'){
				$tab_menu.removeClass('active');
				$tab_panel.slideUp();
			};

		});

		/*
		$('.tab_menu').not($('.prettyprint').children()).each(function() {
			var li_length = $(this).children('ul').find('li').length;
			$(this).addClass('divide'+li_length);
		});
		*/

		$('table.table.responsive').not($('.prettyprint').children()).each(function() {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			};
		});

	});
})(jQuery);