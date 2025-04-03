(function ($) {
	'use strict';

	$(function () {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		/* 비주얼 */
		var $visual = $container.find('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualCurrent = $visual.find('.visual_current'),
			$visualTotal = $visual.find('.visual_total'),
			$visualPrev = $visual.find('.visual_prev'),
			$visualNext = $visual.find('.visual_next'),
			$visualAuto = $visual.find('.visual_auto');

		$visualList.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			draggable: true,
			infinite: true,
			variableWidth: true,
			current: $visualCurrent,
			total: $visualTotal,
			playText: '재생',
			pauseText: '정지',
			autoArrow: $visualAuto,
			prevArrow: $visualPrev,
			nextArrow: $visualNext,
			speed: 1000,
			autoplaySpeed: 8000,
			autoplay: false,
			pauseOnHover: false,
			dots: false,
			customState: function (state) {
				//현재 슬라이드 위치가 10보다 작을 때
				if (state.current < 10) {
					state.current = '0' + state.current;
				}
				//슬라이드 갯수가 10보다 작을 때
				if (state.total < 10) {
					state.total = '0' + state.total;
				}
				return state;
			},
			responsive: [
				{
					breakpoint: 1001,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						variableWidth:false,
					}
				}
			]
		});

		/* 검색 탭메뉴 */
		var $search = $('.search_wrap'),
			$searchTabItem = $search.find('.search_btn_item'),
			$searchTabBtn = $searchTabItem.find('button'),
			$searchTabConWrap = $search.find('.search_panel_wrap');

		$searchTabBtn.on('click.tab', function () {
			var $this = $(this),
				$Tabparent = $this.parents('.search_btn_item'),
				$thisIndex = $this.closest($searchTabItem).index() + 1,
				searchTabNavTitle = $this.text();

			$this.attr('title', '선택됨');
			$Tabparent.siblings().children('button').removeAttr('title');
			$this.closest($searchTabItem).addClass('active').siblings().removeClass('active');
			$searchTabConWrap.find($('.n' + $thisIndex)).addClass('active').attr('title', searchTabNavTitle + ' 선택됨').siblings().removeClass('active').removeAttr('title');
		});


		//class
		var $class = $container.find('.class'),
			$classTab = $class.find('.class_tab'),
			$classBtn = $classTab.find('button'),
			$classContent = $class.find('.class_content'),
			$classList = $class.find('.class_list'),
			$classMore = $class.find('.class_more'),
			classHtml = $classList.html();

		$classBtn.on('click', function () {
			var $this = $(this),
				thisText = $(this).text(),
				$parent = $this.parents('.tab_item'),
				parentIndex = $parent.index();

			$parent.addClass('active').siblings().removeClass('active');
			$this.attr('title', '선택됨');
			$('.class_panel').find('.skip').text(thisText + ' 목록')
			$parent.siblings().children('button').removeAttr('title');

			$classList.html(classHtml);
			$('.class_list > li').each(function(){
				if(parentIndex === 0){
					if($(this).index() > 3){
						$(this).remove();
					}
				}else{
					if(!$(this).is('.n' + parentIndex)){
						$(this).remove();
					}
				}
			});

			var url = "";
			if(thisText == '전체'){
				url = "";
			}else if(thisText == '용산구 평생학습관'){
				url = "/www/selectBbsNttList.do?key=549&bbsNo=14&searchCtgry=교육";
			}else if(thisText == '서로서로 학교'){
				url = "/www/selectBbsNttList.do?key=550&bbsNo=14&searchCtgry=연구";
			}else if(thisText == '용산형 동네배움터'){
				url = "/www/selectBbsNttList.do?key=551&bbsNo=14&searchCtgry=일반";
			}

			$classMore.prop('href', url);
		}).eq(0).trigger('click');

		/* class 메뉴 스크롤*/
		$('.class_wrap .class_tab').scroll(function(){
			var scrL= $('.class_wrap .class_tab').scrollLeft();
			if(scrL == $('.class_wrap .class_tab ul').width() - $('.class_wrap .class_tab').width()){
				$('.class_wrap .class_tab').addClass('end');
			} else {
				$('.class_wrap .class_tab').removeClass('end');
			}
		});



		/* 새소식 */
		var $board = $('.board'),
			$boardTab = $board.find('.board_tab'),
			$boardTabItem = $board.find('.tab_item'),
			$boardTabBtn = $boardTabItem.find('button'),
			$boardTabConWrap = $board.find('.board_panel');

		//게시판 탭
		$boardTabBtn.on('click.tab', function () {
			var $this = $(this),
				$Tabparent = $this.parents('.tab_item'),
				$thisIndex = $this.closest($boardTabItem).index() + 1,
				boardTabNavTitle = $this.text();

			$this.attr('title', '선택됨');
			$Tabparent.siblings().children('button').removeAttr('title');
			$this.closest($boardTabItem).addClass('active').siblings().removeClass('active');
			$boardTabConWrap.find($('.n' + $thisIndex)).addClass('active').attr('title', boardTabNavTitle + ' 선택됨').siblings().removeClass('active').removeAttr('title');
		});


		/* 평생학습 평생소식 */
		var $news = $('.news'),
			$newsList = $news.find('.news_list');

		$newsList.slick({
			//기본
			autoplay: false,
			dots: false,
			swipe: true,
			draggable: true,
			slidesToScroll: 1,
			slidesToShow: 3,
			speed: 1000,
			autoplaySpeed: 5000,
			variableWidth: false,
			infinite: false,
			prevArrow: $('.news .news_control .news_prev'),
			nextArrow: $('.news .news_control .news_next'),

			responsive: [
				{
					breakpoint: 1301,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 1001,
					settings: {
						variableWidth: true,
						slidesToShow: 1,
					}
				}
			],
		});


		/* 검색 */
		var $mainSearch = $container.find('.search_form'),
			$searchSelect = $mainSearch.find('.search_select_box');

		$searchSelect.each(function(){
			var thisIdx = $(this).index(),
				thisTitle = $(this).find('select').attr('title'),
				thisTag = $(this).find('select').html().replaceAll('    ',''),
				thisOpt = thisTag.replaceAll('<option','    <li class="select_item"><button type="button" class="select_button"').replaceAll('</option>','</button></li>'),
				thisHtml = '<button type="button" class="select_input" data-index="' + thisIdx + '">' + thisTitle + '</button>\n' + '<ul class="select_list">' + thisOpt  + '</ul>'

			$(this).append(thisHtml);
		});

		$(document).on('click', '.search_form .select_input', function(){
			var $thisParent = $(this).parent();

			if($thisParent.hasClass('active')){
				$thisParent.removeClass('active');
			} else {
				$searchSelect.removeClass('active');
				$thisParent.toggleClass('active');
			}
		});

		$(document).on('click', '.search_form .select_item', function(){
			var thisIdx = $(this).index(),
				$thisParent = $(this).parents('.search_select_box'),
				$thisOpt = $thisParent.find('select option'),
				$selectBtn = $thisParent.find('.select_input'),
				$thisBtn = $(this).find('button'),
				thisVal = $thisBtn.text();

			$selectBtn.text(thisVal);
			$thisOpt.eq(thisIdx).prop('selected',true);
			$searchSelect.removeClass('active');
		});

	});
})(window.jQuery);
