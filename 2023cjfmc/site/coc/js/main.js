(function ($) {
	'use strict';

	$(function () {
		$(window).load(function () {
			$('body').addClass('loaded');
			$('.left_box').addClass('on');
		});
		$('#fullpage_wrap').fullpage({
			anchors             : ['page1', 'page2'],
			responsiveWidth: 1000,
		});




		$('.section.n1').addClass('on');

		//텍스트 에니메이션 플러그인 시작
		function splittingTextDelay (object, speed, delay_speed) {
			var splitLength = $(object).find('.char').length;
			for (var i=0; i<splitLength; i++) {
				if (  $(object).data('css-property') == 'animation' ) {
					$(object).find('.char').eq(i).css('animation-delay',delay_speed+(i*speed)+'s');
				}else if( $(object).data('css-property') == 'transition' ) {
					$(object).find('.char').eq(i).css('transition-delay',delay_speed+(i*speed)+'s');
				}
			}
		}

		Splitting({
			target: '[data-splitting]',
			by: 'chars',
			key: null
		});
		var $splittingTxt = $('.word-split');
		$($splittingTxt).each(function  () {
			splittingTextDelay($(this),$(this).data('speed'),$(this).data('speed-delay'));
		});
		//텍스트 에니메이션 플러그인 끝


		/*비주얼 슬릭*/
		function LoadingFirst() {
			var $totalbar = $('.visual_popup .totalbar');
			$totalbar.removeClass('loading active');
			setTimeout(function () {
				$totalbar.addClass('loading active');
			}, 1);
		}

		function Loading() {
			var $totalbar = $('.visual_popup .totalbar');
			$totalbar.removeClass('loading active');
			setTimeout(function () {
				$totalbar.addClass('loading');
			}, 1);
		}


		var $visualPopup = $('.visual_popup'),
			$VisualList = $('.visual_popup .visual_list'),
			$VisualBar = $('.visual_popup .visual_wrap .control_box .totalbar'),
			VisualLength = $VisualList.find('.visual_item').length;
		$VisualList.on('init', function (event, slick, currentSlide) {
			LoadingFirst();
			var $currentslide = $(slick.$slides[0]);
			$visualPopup.addClass('active').attr('data-active', '0');
			$currentslide.addClass('active');
		});

		$VisualList.slick({
			//기본
			autoplay: true,
			autoplaySpeed: 4000,
			pauseOnHover: false,
			swipe: true,
			draggable: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: false,
			infinite: true,
			speed: 700,
			fade: false,
			prevArrow: $('.visual_popup .control_box .prev'),
			nextArrow: $('.visual_popup .control_box .next'),
			dots: false,
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

			//추가 기능
			autoArrow: $('.visual_popup .control_box .auto'),
			isRunOnLowIE: false,
			pauseOnArrowClick: true,
			pauseOnDirectionKeyPush: true,
			pauseOnSwipe: true,
			pauseOnDotsClick: true,
			pauseText: '정지',
			playText: '재생',
			total: $('.visual_popup .control_box .total'),
			current: $('.visual_popup .control_box .current'),
		});

		$VisualList.on('afterChange', function () {
			$VisualBar.addClass('active');
		});
		$VisualList.on('beforeChange', function () {
			$VisualBar.removeClass('active');
		});


		$VisualList.on('beforeChange', function (event, slick, currentSlide) {
			Loading();
			$visualPopup.removeClass('active');
		});
		$VisualList.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			var $currentslide = $(slick.$slides[currentSlide]);
			$(slick.$slides).removeClass('active');
			$currentslide.addClass('active');
			$visualPopup.addClass('active').attr('data-active', currentSlide);
		});

		/*$window.on('responsive', function (event) {
			if (event.state == 'wide' || event.state == 'web' || event.state == 'tablet') {
				if (VisualLength >= 2) {
					$('.visual_popup .visual_wrap .control_box  .controls button.auto').text('정지');
				}
			}
			if (event.state == 'phone') {
				$VisualList.slick('slickPause');
				$('.visual_popup .visual_wrap .control_box .controls button.auto').text('재생');
			}

		});*/

		/*비주얼슬릭 끝*/


	});
})(window.jQuery);