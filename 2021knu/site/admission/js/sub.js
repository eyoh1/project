

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {
		var $container = $('#container'),
			$subvisual = $('.sub_visual'),
			$wrapper = $('#wrapper'),
			$header = $('#header');

		$window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });

		setTimeout(function(){
			console.log(mode);
		}, 1);

		var scrollTop = $window.scrollTop(),
			ContainerOffset = $container.offset(),
			subvisualOffset = $subvisual.offset();
		if(scrollTop > subvisualOffset.top) {
			$wrapper.attr('data-nowtop', 'nontop');
		}else{
			$wrapper.attr('data-nowtop', 'top');
		};
		$window.on('scroll', function(event) {
			var scrollTop = $window.scrollTop(),
				ContainerOffset = $container.offset(),
				subvisualOffset = $subvisual.offset(),
				headerIsActive = $wrapper.is('[data-nowtop="top"]');
			if(scrollTop > subvisualOffset.top) {
				if(headerIsActive){
					$wrapper.attr('data-nowtop', 'nontop');
				};
			}else{
				$wrapper.attr('data-nowtop', 'top');
			};
		});

		//여기서부터 코드 작성해주세요
		//푸터 - 웹마스터
		$('.footer_nav ul li:nth-child(4)').on('click', function () {
			alert(' 준비중 입니다.')
		});


		var $Path = $('.path'),
			$PathList = $Path.find('li.list'),
			PathLength = $PathList.length;
		$Path.addClass('devide'+PathLength);
		$('.path li.list button').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parents('li.list'),
				$OtherParents = $MyParent.siblings('li.list'),
				$MyLayer = $this.siblings('.layer'),
				$OtherBtn = $OtherParents.find('button'),
				$OtherLayer = $OtherParents.find('.layer'),
				IsActive = $MyParent.is('.active');
			if(!IsActive){
				$OtherParents.removeClass('active prev');
				$OtherBtn.attr('title', '목록열기');
				$OtherLayer.slideUp();
				$MyParent.addClass('active').prev('li.list').addClass('prev');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			} else{
				$OtherParents.removeClass('prev');
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			};
		});

		//sns
		$('.pathbox .sharebox .share_btn').on('click', function(){
			var $this = $(this),
				$share = $this.parent('.share'),
				$layer = $this.siblings('.layer'),
				OnOff = $share.is('.active'),
				NowState = $.screen.settings.state[0];
			if(!OnOff){
				$this.attr('title', 'sns 공유 닫기').text('sns 공유 닫기');
				if(NowState=='phone'){
					$layer.animate({
						height: "show"
					}, 250);
				} else{
					$layer.animate({
						width: "show"
					}, 250);
				}
				$share.addClass('active');
			} else{
				$share.removeClass('active');
				$this.attr('title', 'sns 공유 열기').text('sns 공유 열기');
				if(NowState=='phone'){
					$layer.animate({
						height: "hide"
					}, 250);
				} else{
					$layer.animate({
						width: "hide"
					}, 250);
				}
			};
		});
		
		var $tabPanel = $('.tab_panel'),
			$tabItem = $tabPanel.find('.tab_item'),
			$tabDepth6 = $tabItem.find('.tab_depth6'),
			$tabDepth6Item = $tabDepth6.find('.tab_depth6_item');
		$tabDepth6Item.closest('.tab_item').addClass('has_depth');

		function roundFunc() {
				var $all_tab = $container.find('.tab_menu');
			
				$all_tab.each(function(index, element){
					var $this = $(element),
						$cms_item = $this.find('.tab_item'),
						item_length = $cms_item.length;

					if ($window.width() > 1400){
						if(item_length > 5){
							$this.addClass('add_line');
						} else{
							$this.removeClass('add_line');
						}
					} else if ($window.width() < 1399 && $window.width() > 800){
						if(item_length > 4){
							$this.addClass('add_line');
						} else{
							$this.removeClass('add_line');
						}
					} else if ($window.width() < 800){
						if(item_length > 3){
							$this.addClass('add_line');
						} else{
							$this.removeClass('add_line');
						}
					}
				});
			}
		roundFunc();

		/* cms 탭메뉴 */
		var $tabMenu = $container.find('.tab_menu'),
			$tabSelect = $tabMenu.find('.tab_select');

		$tabSelect.click(function () {
			var $this = $(this),
				$ParentTabmenu = $this.parent('.tab_menu'),
				IsActive = $ParentTabmenu.is('.active');
			if (!IsActive) {
				$this.next('.tab_panel').stop().slideDown(250);
				$ParentTabmenu.addClass('active');
			} else {
				$this.next('.tab_panel').stop().slideUp(250);
				$ParentTabmenu.removeClass('active');
			};
		});

		/* cms 탭메뉴 끝*/

		/* 컨텐츠 탭메뉴 */
		var $tab = $container.find('.tab');

		console.log($tab);

		$tab.each(function(index, element){
			var $tabM = $(element).find('.tab_menu'),
				IsFn = $tabM.is('.function'),//탭컨텐트 기능활성화
				$tabButton = $(element).find('.tab_button'),
				tabAllCheck = $tabButton.is('.tab_all'),/*전체보기 탭메뉴 유무*/
				$tabContent = $(element).find('.tab_content');

			var li_length = $tabM.find('.tab_item').length;
			$tabM.not($('.prettyprint').children()).addClass('divide' + li_length);

			console.log($(element));
			$tabButton.click(function () {
				var $this = $(this),
					index = $tabButton.index(this),
					tabButtonText = $this.text(),
					IsTabAll = $this.is('.tab_all'),
					$tab_panel = $this.parents('.tab_panel'),
					$tab_menu = $this.parents('.tab_menu');

				if(IsFn){
					$this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
					$this.parents('.tab').find('.tab_select span').text(tabButtonText);
					if (tabAllCheck){
						if (IsTabAll) {
							$tabContent.addClass('active');
						} else {
							$tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
						};
					} else if (!tabAllCheck){
						$tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
					}
					if ($window.width() <= 640) {
						$tab_menu.removeClass('active');
						$tab_panel.slideUp();

					};
					if ($window.width() <= 640 && IsTabAll) {
						$tab_menu.removeClass('active');
						$tab_panel.slideUp();
					};
				} else{
					$this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
					$this.parents('.tab').find('.tab_select span').text(tabButtonText);
					if ($window.width() <= 640) {
						$tab_menu.removeClass('active');
						$tab_panel.slideUp();
					};
				}

			});
		});

		/* 컨텐츠 탭메뉴 끝 */

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

		$('.table_scroll').each(function () {
			$(this).removeAttr('tabindex');
		});

		$('ol.num').not($('.prettyprint').children()).each(function () {
			var $this = $(this),
				$ThisLi = $this.find('>li');
			$ThisLi.each(function () {
				var $this = $(this),
					ThisIndex = $this.index() + 1;
				$this.prepend('<i class="count">' + ThisIndex + '</i>');
			});
		});

		$('.table_unit').each(function () {
			var $this = $(this),
				IsTitle = $this.find('h3,h4,h5,h6').length;
			if (!IsTitle){
				$this.addClass('notitle');
			}
		});
		/* 테이블 끝 */

		/*인풋 포커스*/
		var selectTarget = $('.sd_input input[type="text"]');
		selectTarget.on({
			'focus': function () {
				$(this).parent().addClass('focus');
			},
			'blur': function () {
				$(this).parent().removeClass('focus');
			}
		});
		/*인풋 포커스 끝*/

		/* 셀렉트박스 디자인 */
		var $select = $container.find('.select_design'),
			$selectAllButton = $select.find('button', 'a'),
			$selectAnchor = $select.find('.select_anchor'),
			$selectPanel = $tab.find('.select_panel');

		$selectAnchor.click(function () {
			var $this = $(this),
				selectButtonText = $this.text();

			$this.attr('title', '선택됨').closest('.select_item').addClass('active').siblings('.select_item').removeClass('active').find('.select_anchor').removeAttr('title');
			$this.parents('.select_design').find('.select_button span').text(selectButtonText);
			$selectPanel.addClass('active').siblings().removeClass('active');


		});
		$selectAllButton.click(function () {
			var $this = $(this),
				$parentmenu = $this.parents('.select_design'),
				IsActive = $parentmenu.is('.active');
			if (!IsActive) {
				$this.attr('title', '열림');
				$parentmenu.find('.select_panel').stop().slideDown(250);
				$parentmenu.addClass('active');
			} else {
				$this.removeAttr('title');
				$parentmenu.find('.select_panel').stop().slideUp(250);
				$parentmenu.removeClass('active');
			}
		});
		/* 셀렉트박스 디자인 끝 */

		/*Q&A*/
		$('.qnabox .listbox .qnabtn').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('.listbox'),
				$MyAnswer = $this.siblings('.answer'),
				$OterParents = $MyParent.siblings('.listbox'),
				$OterAnswer = $OterParents.find('.answer'),
				$OterBtn = $OterParents.find('.qnabtn'),
				IsActive = $MyParent.is('.active');
			if(!IsActive){
				$OterParents.removeClass('active');
				$OterAnswer.stop().slideUp();
				$OterBtn.attr('title', '목록열기');
				$MyParent.addClass('active');
				$MyAnswer.stop().slideDown();
				$this.attr('title', '목록닫기');
			} else{
				$MyParent.removeClass('active');
				$MyAnswer.stop().slideUp();
				$this.attr('title', '목록열기');
			};
		});

		/* 스텝 넘버 */
		$(document).ready(function () {
			var $step = $container.find('.step.number');
				
			$step.each(function (index, element) {
				var $stepList = $(element).find('.step_list');

				if(!$(element).hasClass('type3')){

					$stepList.each(function (index, element) {
						var $element = $(element),
							$elementStepItem = $element.find('.step_item'),
							$elementItemLevel = $elementStepItem.find('.level');

						$elementStepItem.each(function (index, obj) {
							var $index = $(this).index();
							$elementItemLevel.eq(index).text('step' + ($index + 1));
						});
					});
				}
			});
		});
		/* 스텝 넘버 끝*/

		/* 스텝 자동 높이 */
		function stepAutoHeight() {
			var $step = $container.find('.step'),
				$stepList = $step.find('.step_list'),
				$stepItem = $stepList.find('.step_item');


			$stepList.each(function (index, element) {
				var $element = $(element),
					$elementStepBox = $element.find('.step_box'),
					$elementStepItem = $element.find('.step_item'),
					$elementItemTitle = $elementStepItem.find('.title'),
					$elementItemLevel = $elementStepItem.find('.level'),
					height = 0,
					Theight = 0,
					width = 0,
					count;

				if ($element.parents('.step').hasClass('type2')) {
					$($elementStepItem, element).each(function (index) {
						var $this = $(this),
							$thisContent = $this.find('.step_content'),
							IsTitle = $thisContent.children().is('.title'),
							$thisText = $thisContent.find('.text');
						if (IsTitle){
							$thisContent.css('display','block');
						} else if (!IsTitle){
							$thisContent.css('display', 'inline-block');
						}
					});
				}


				if ($element.parents('.step').hasClass('type3')) {
					if ($(window).width() > 640) {
						$($elementStepBox, element).each(function (index) {
							var $this = $(this),
								height = 0,
								thisHeight = $this.height(),
								thisItemHeight = $this.find('.step_item').height(),
								thisProHeight = $this.find('.step_process').height();

					
							var $index = $this.index();
							$elementItemLevel.eq(index).text('step' + ($index + 1));

								/*둘중 큰높이*/
								if (thisItemHeight > height) {
									height = thisItemHeight;
									if (thisProHeight > height){
										height = thisProHeight;
									}
								}
								if (thisItemHeight < height) {
									$this.find('.step_item').outerHeight(height);
								} else{
									$this.find('.step_process').height($this.find('.step_item').outerHeight());
								}

							count = index + 1;
						});
					} else {
						$($elementStepBox, element).each(function (index) {
							var $this = $(this),
								$index = $this.index();
							$elementItemLevel.eq(index).text('step' + ($index + 1));

						});
					}

				} else if (!$element.parents('.step').hasClass('type3')) {
					if ($(window).width() > 640) {
						$($elementStepItem, element).each(function (index) {
							var $this = $(this),
								$thisContent = $this.find('.step_content'),
								titleHeight = $thisContent.find('.title').height(),
								thisHeight = $this.find('.step_content').height();

							if (titleHeight > Theight) {
								Theight = titleHeight;
								// $thisContent;
							}

							if (thisHeight > height) {
								height = thisHeight;
								// $thisContent.height(height);
							}

							count = index + 1;

						}).height(height).find('.title').height(Theight);
					
					} else {
						$elementStepItem.css('height','auto');
						$elementStepItem.find('.title').css('height','auto');

					}

				$element.closest('.step').addClass('length' + count);
				}
			});
		}
		stepAutoHeight();
		/* 스텝 자동 높이 끝*/

		/* 스텝 자동 높이 반응형 */
		$(window).on('load resize', function () {
			stepAutoHeight();
			roundFunc();
		});
		/* 스텝 자동 높이 반응형 끝*/

		//$('.popupbox_btn').click();//임시

        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);

/** 프린트 아이콘 기능 **/
$(document).on('click','.print',function(){window.print();});