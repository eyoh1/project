(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$html = $('html'),
			$header = $('#header'),
			$footer = $('#footer');

		/* 토글 */
		var $toggle = $('.toggle'),
			$toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

		$toggleSelector.on('click', function (event) {
			var $this = $(this),
				$parent = $this.parents('.toggle'),
				parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

			if($this.is('[class*="_show"]')){
				if ($parent.siblings().hasClass('active')){
					$parent.siblings().removeClass('active');
					$html.removeClass(parentClass + '_open');
				}
				$html.toggleClass(parentClass + '_open');
				$parent.toggleClass('active');
			}

			if($this.is('[class*="_hide"]')){
				$html.removeClass(parentClass + '_open');
				$this.closest('.active').removeClass('active');
			}
		});

		//search박스
		$('.search_btn').on('click', function() {
			var $this = $(this),
				$searchbox = $('.search_box'),
				IsActive = $searchbox.is('.active');
			$html.addClass('search_open');
			$('.search_box_curtain').fadeIn();
			$searchbox.addClass('active').fadeIn();
			$('.search_box .total_search').focus();
		});

		$('.search_box_curtain').on('click', function() {
			var $this = $(this),
				$search_btn = $('.search_btn'),
				$searchbox = $('.search_box');
			$html.removeClass('search_open');
			$this.fadeOut();
			$searchbox.removeClass('active').fadeOut();
			$search_btn.focus();
		});
		$('.search_box .search_close').on('click', function() {
			var $this = $(this),
				$search_btn = $('.search_btn'),
				$searchbox = $('.search_box');
			$html.removeClass('search_open');
			$('.search_box_curtain').fadeOut();
			$searchbox.removeClass('active').fadeOut();
			$search_btn.focus();
		});


		/* 배너모음 */
		var $banner = $footer.find('.banner'),
			$bannerList = $banner.find('.banner_list'),
			$bannerPrev = $banner.find('.banner_prev'),
			$bannerAuto = $banner.find('.banner_auto'),
			$bannerNext = $banner.find('.banner_next');

		$bannerList.slick({
			draggable : false,
			infinite: true,
			variableWidth: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			playText : '재생',
			pauseText : '정지',
			autoArrow : $bannerAuto,
			prevArrow : $bannerPrev,
			nextArrow : $bannerNext,
			responsive: [
				{
					breakpoint: 1001,
					settings: {
						draggable: true,
						slidesToShow: 3,
						slidesToScroll: 1,
					}
				}
			]
		});

		/* 상단으로 */
		var $bodyHtml = $('body,html'),
			$upButton = $footer.find('.up_button');

		$upButton.click(function(){
			$bodyHtml.stop().animate({
				scrollTop: 0
			}, 250);
		});

	});
})(window.jQuery);
