(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;


		//fade
		var $fade = $('.fade');

		function fade() {
			$fade.each(function (i) {
				var bottom_of_object = $(this).offset().top + $(this).outerHeight();
				var bottom_of_window = $window.scrollTop() + $window.height();
				if (bottom_of_window > bottom_of_object / 1.2) {
					$(this).addClass('show');
				} else {
					$(this).removeClass('show');
				}
			});
		}

		fade();
		$window.scroll(function () {
			fade();
		});


		//텍스트 에니메이션
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
		Splitting();

		var $splittingTxt = $('.split_ani');
		$splittingTxt.each(function () {
			splittingTextDelay(this, $(this).data('speed'), $(this).data('speed-delay'));
		});

		/* visual */
		$('.visual').addClass('on');

		/* svg & 메인비주얼*/
		function Loading(){
			var count = $(('#count'));
			$({ Counter: 0 }).animate({ Counter: 100 }, {
				duration: 7200,
				easing: 'linear',
				step: function () {
					count.text(Math.ceil(this.Counter)+ "%");
				}
			});
			var s = Snap('#animated');
			var progress = s.select('#progress');
			progress.attr({strokeDasharray: '0, 251.2'});
			Snap.animate(0,251.2, function( value ) {
				progress.attr({ 'stroke-dasharray':value+',251.2'});
			}, 7200);
		}


		var $visualslide = $('.visual .visual_list'),
			$visual_dots = $('.visual .slide_control .dots');


		Loading();
		$visualslide.on('beforeChange', function(){
			Loading();
		});

		$visualslide.slick({
			swipe : false,
			autoplay : true,
			draggable : false,
			slidesToShow : 1,
			slidesToScroll: 1,
			autoplaySpeed: 7500,
			vertical : false,
			infinite: true,
			fade : true,
			dots : true,
			initialSlide : 0,
			appendDots: $visual_dots,

			//추가 기능
			autoArrow : $('.slide_control .auto'),
			isRunOnLowIE : false,
			pauseOnFocus: false,
			pauseOnHover: false,
			pauseOnDotsHover: false,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			pauseOnDotsClick : true,
			pauseText : '정지',
			playText : '재생',

			responsive: [
				{
					breakpoint: 1001,
					settings: {
						swipe : true,
						draggable : true
					}
				},
				{
					breakpoint: 641,
					settings: {
						swipe : true,
						draggable : true,
						variableWidth: false,
					}
				}]
		});


		//게시판 게시판
		var $boardTabWrap = $('.board'),
			$boardTab = $boardTabWrap.find('.board_tab'),
			$boardTabNav = $boardTab.find('.tab_nav_list'),
			$boardTabNavItem = $boardTabNav.find('.tab_nav_item'),
			$boardTabNavBtn = $boardTabNavItem.find('.tab_btn'),
			$boardTabConWrap = $boardTabWrap.find('.tab_con_list'),
			$boardTabConItem = $boardTabConWrap.find('.tab_con_item'),
			$boardWrap = $('.board .tab_con_list .board_slide_wrap');

		//게시판 탭
		$boardTabNavBtn.on('click.tab', function () {
			var $this = $(this),
				$thisIndex = $this.closest($boardTabNavItem).index() + 1,
				boardTabNavTitle = $this.data('title');
			$this.closest($boardTabNavItem).addClass('tab_nav_active').attr('title', boardTabNavTitle).siblings().removeClass('tab_nav_active').removeAttr('title');
			$boardTabConWrap.find($('.n' + $thisIndex)).addClass('tab_con_active').attr('title', boardTabNavTitle).siblings().removeClass('tab_con_active').removeAttr('title');


		});


		//게시판 슬라이드
		$boardWrap.each(function () {
			var $this = $(this),
				boardTitle = $this.closest($boardTabWrap).find('.tab_btn span').text(),
				$boardSlide = $this.find('.board_slide_list'),
				$boardCtrl = $this.find('.board_ctrl'),
				$boardPrev = $boardCtrl.find('.prev'),
				$boardPause = $boardCtrl.find('.pause'),
				$boardNext = $boardCtrl.find('.next');

			$boardTabNavBtn.on('click.slide', function () {
				$boardSlide.slick('setPosition');
			});

			function boardSlide() {
				if ($(window).width() > 0) {
					$boardSlide.slick({
						//기본
						autoplay: false,
						swipe: true,
						draggable: false,
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: false,
						variableWidth: true,
						centerMode: false,
						accessibility: true,
						autoArrow: false,
						dots: false,
						prevArrow: $boardPrev,
						nextArrow: $boardNext,
						//추가 기능
						isRunOnLowIE: false,
						pauseOnArrowClick: true,
						pauseOnDirectionKeyPush: true,
						pauseOnSwipe: true,
						pauseOnDotsClick: true,
						responsive: [{
							breakpoint: 1601,
							settings: {
								swipe: true,
								draggable: false,
								slidesToShow: 2,
								swipeToSlide: false
							}
						},{
							breakpoint: 1001,
							settings: {
								swipe: true,
								draggable: true,
								slidesToShow: 1,
								slidesToScroll: 1,
								swipeToSlide: true,
								dots: true
							}
						},{
							breakpoint: 641,
							settings: {
								swipe: true,
								draggable: true,
								slidesToShow: 3,
								slidesToScroll: 1,
								swipeToSlide: true,
								dots: true,
								vertical:true,
								variableWidth:false
							}
						}]
					}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
						if (currentSlide !== nextSlide) {
							$('.slick-active + .slick-cloned').each(function(index, node) {
								var $node = $(node);
								setTimeout(function() {
									$node.addClass('slick-current');
									$node.addClass('slick-active');
								});
							});
						}
					}); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.

				} else {
					$boardSlide.slick('unslick');
				}
			}

			boardSlide();
			$window.on('resize', function () {
				boardSlide();
			});
		});


	});
})(window.jQuery);
