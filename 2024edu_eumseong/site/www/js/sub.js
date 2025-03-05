(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		$window.load(function(){
			$('.sub_visual').addClass('active');
		});



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

		/* cms 탭메뉴 */
		function setTabHeight(){
			var $tabType2 = $container.find('.sub_head_tab .tab');

			if($tabType2.length){
				var contentsWidth = $contents.width(),
					contentsLeft = $contents.offset().left;

				$tabType2.each(function(){
					var $thisTab = $(this),
						$tabItem= $thisTab.find('.tab_item');

					$tabItem.each(function(){
						var $this = $(this),
							$thisDepth6 = $this.find('.tab_depth6'),
							thisWidth = $this.width() - 1.5,
							thisLeft = $this.offset().left,
							marginLeft = thisLeft - contentsLeft;

						$this.width(thisWidth + 2);
						$thisDepth6.width(contentsWidth).css('margin-left', '-' + marginLeft + 'px');
					});
				});
			}
		}

		setTabHeight();

		$(window).on('resize', function(){
			setTabHeight();
		});

		//breadcrumbs
		var $breadcrumbs = $container.find('.breadcrumbs'),
			$breadcrumbsSelect = $breadcrumbs.find('.breadcrumbs_select');

		$breadcrumbsSelect.on('click', function(){
			var $this = $(this);

			if(!$this.parent().is('.active')){
				$this.attr('title','목록닫기')
					.parent().addClass('active').end().next().slideDown('250')
					.parent().siblings().removeClass('active').find('ul').slideUp('300');
			} else{
				$this.attr('title','목록열기')
					.parent().removeClass('active').end().next().slideUp('300');
			}
		});

		//sns공유
		$('.addons .share_show').on('click', function(){
			var $this = $(this),
				$share = $this.parent('.share'),
				$panel = $this.siblings('.share_panel'),
				OnOff = $share.is('.active');

			$panel.slideDown();
			$share.addClass('active');
		});

		$('.share_panel .share_hide').on('click', function(){
			$('.share_panel .share_hide').parent('.share_panel').slideUp();
			$('.share_panel .share_hide').parents('.share').removeClass('active');
		});

		/* 스텝(가로) */
		function stepAutoHeight(){
			var $step = $container.find('.step.width'),
				$stepList = $step.find('.step_list'),
				$stepTitle = $step.find('.step_title'),
				$stepText = $step.find('.step_text');

			//초기화
			$stepTitle.removeAttr('style', 'height');
			$stepText.removeAttr('style', 'height');

			$stepList.each(function (index, element) {
				var $element = $(element),
					titleMinHeight = 52, //기본 제목 높이
					textMinHeight = 95; //기본 텍스트 높이

				$element.find('li').each(function (index, element) {
					var $element = $(element),
						titleHeight = $element.find('.step_title').height(),
						textHeight = $element.find('.step_text').height();

					//제목 최고높이
					if (titleHeight > titleMinHeight) {
						titleMinHeight = titleHeight;
					}

					//텍스트 최고높이
					if (textHeight > textMinHeight) {
						textMinHeight = textHeight;
					}
				});

				$element.find('.step_title').height(titleMinHeight);
				$element.find('.step_text').height(textMinHeight);
			});

		}
		stepAutoHeight();

		function boxinfoHeightCheck(){

			var $boxinfo = $container.find('.box.info');

			//초기화
			$boxinfo.removeClass('over');

			$boxinfo.each(function (index, element) {
				var $element = $(element),
					minHeight = 64,
					outerHeight = $element.outerHeight();

				$element[(minHeight < outerHeight) ? 'addClass' : 'removeClass']('over');
				/*
				if(minHeight < outerHeight){
					$element.addClass('over');
				}else{
					$element.removeClass('over');
				}
				*/
			});

		}
		boxinfoHeightCheck();

		$window.on('resize', function () {
			clearTimeout(debounce);
			debounce = setTimeout(function (){
				stepAutoHeight();
				boxinfoHeightCheck();
			}, 50);
		});


		/* 반응형 테이블 */
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

		/* 엑셀다운로드 숨김 */
		if($('.p-wrap .p-button').length){
			$('.p-button').each(function(){
				if($(this).text() == '엑셀다운로드'){
					$(this).remove();
				}
			});
		}

	});
})(window.jQuery);
