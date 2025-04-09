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
			$visualPrev = $visual.find('.visual_prev'),
			$visualNext = $visual.find('.visual_next');

		$visualList.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			draggable: true,
			speed: 2000,
			autoplaySpeed: 2000,
			infinite: true,
			variableWidth: true,
			prevArrow: $visualPrev,
			nextArrow: $visualNext,
			autoplay: false,
			pauseOnHover: false,
			dots: true,
			appendDots : $visual.find('.visual_dots'),
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


		//주요 상품
		var $product = $('.product'),
			$productTab = $product.find('.product_tab'),
			$productItem = $productTab.find('.product_item'),
			$productTabBtn = $productItem.find('.product_btn');

		$productTabBtn.on("click", function (){
			var $parent = $(this).parent(),
				$tabContent = $parent.find('.product_panel'),
				$MySlideNav = $tabContent.find('.nav_list'),
				$MySlide = $tabContent.find('.slide_list');

			$(this).attr('title', '선택됨').closest('.product_item').addClass('active').siblings('.product_item').removeClass('active').find('.product_btn').removeAttr('title');

			$MySlide.slick('setPosition');
			$MySlideNav.slick('setPosition');

		});

		$productItem.each(function (){
			var $this = $(this),
				$VisualNav = $this.find('.nav_list'),
				$slidePrev = $this.find('.product_control .product_prev'),
				$slideNext = $this.find('.product_control .product_next');


			$VisualNav.slick({
				swipe: false,
				draggable: false,
				slidesToShow:3,
				slidesToScroll: 1,
				fade: false,
				focusOnSelect: true,
				autoplay: false,
				infinite: true,
				dots: false,
				arrows: true,
				prevArrow : $slidePrev,
				nextArrow : $slideNext,
				responsive: [
					{
						breakpoint: 801,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 1,
							swipe: false,
							draggable: false,
							vertical: false,
							centerMode: false,
							variableWidth: true,
							infinite: false,
						}
					}]
			}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				if (currentSlide !== nextSlide) {
					$('.slick-active + .slick-cloned').each(function (index, node) {
						var $node = $(node);
						setTimeout(function () {
							$node.addClass('slick-current');
							$node.addClass('slick-active');
						});
					});
				}
			});

		});

		//주요 서비스 끝


	});
})(window.jQuery);
