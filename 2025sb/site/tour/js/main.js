(function ($) {
	'use strict';

	$(function () {

		var $window = $(window),
			$html = $('html'),
			$document = $(document),
			$header = $document.find('#header'),
			$container = $document.find('#container'),
			$footer = $('#footer');

		/* visual */
		var $visual = $container.find('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualCurrent = $visual.find('.visual_current'),
			$visualTotal = $visual.find('.visual_total'),
			$visualProgress = $visual.find('.visual_progress'),
			$navList = $visual.find('.nav_list'),
			$navItem = $visual.find('.nav_item'),
			$visualBtn = $visual.find('.nav_list .nav_item button');

		$('.visual_list .visual_item').each(function() {
			var thisInx = $(this).index();

			$visualList.slick({
				speed: 1000,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				fade: true,
				arrows: true,
				autoplay: true,
				autoplaySpeed: 5000,
				playText: '재생',
				pauseText: '정지',
				pauseOnHover: false,
				current: $visualCurrent,
				total: $visualTotal,
				dots: false,
				asNavFor: $navList,

			}).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
				$visualProgress.removeClass('on');
			}).on('afterChange', function (e, slick, current, next) {
				$visualProgress.addClass('on');
			});
		});


		setTimeout(function(){
			$('.rowgroup1').addClass('visual_active');
		}, 750);


		$navList.slick({
			swipe: false,
			draggable: false,
			slidesToScroll: 1,
			infinite: true,
			arrows: false,
			autoplay: false,
			dots: false,
			vertical:true,
			asNavFor: $visualList,
			centerMode: false,
			focusOnSelect: true,
		}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			var $currentslide = $(slick.$slides[currentSlide]),
				$nextslide = $(slick.$slides[nextSlide]);
			setTimeout(function(){
				$nextslide.addClass('now');
				$currentslide.removeClass('now');
			}, 1000);

		});

		$navList.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$navItem.each(function () {
				var $this = $(this);

				if ($this.hasClass('slick-current')) {
					if ($this.hasClass('white')) {
						$this.parent().addClass('color_white');
					} else {
						$this.parent().removeClass('color_white');
					}
				}
			})
		});


		/* festival */
		var $festival = $('.festival'),
			$festivalList = $festival.find('.festival_list'),
			$festivalCurrent = $festival.find('.festival_current'),
			$festivalTotal = $festival.find('.festival_total'),
			$festival_dot = $festival.find('.festival_dot'),
			$festival_control = $festival.find('.festival_control'),
			$dotItem = $festival.find('.dot_item');

		$festivalList.slick({
			autoplay: true,
			fade: true,
			infinite: true,
			dots: false,
			arrows: false,
			speed: 800,
			autoplaySpeed: 5000,
			current: $festivalCurrent,
			total: $festivalTotal,
			asNavFor: $festival_dot,
			customState : function(state) {
				//현재 슬라이드 위치가 10보다 작을 때
				if(state.current < 10) {
					state.current = '0' + state.current;
				}
				//슬라이드 갯수가 10보다 작을 때
				if(state.total < 10) {
					state.total = '0' + state.total;
				}
				return state;
			},
		});

		$festival_dot.slick({
			infinite: true,
			autoplay: false,
			slidesToScroll: 1,
			slidesToShow: 1,
			vertical: true,
			asNavFor: $festivalList,
			dot: false,
			focusOnSelect: true,
			verticalSwiping: true,
			swipeToSlide: true,
			transformEnabled: false,
			centerMode: false,
			prevArrow : $festival_control.find('.prev_btn'),
			nextArrow : $festival_control.find('.next_btn'),
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
		}); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.


		$festival_dot.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$dotItem.each(function () {
				var $this = $(this);

				if ($this.hasClass('slick-current')) {
					if($this.hasClass('first')){
						$this.parent().addClass('change_transform');
					} else {
						$this.parent().removeClass('change_transform');
					}
				}

				if ($this.hasClass('slick-current')) {
					$this.removeClass('short');
				} else {
					$this.addClass('short');
				}

			})
		})


	});
})(window.jQuery);


