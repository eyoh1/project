(function ($) {
	'use strict';

	$(function () {

		var $window = $(window),
			$container = $('#container');

		/* visual */
		$window.on('load',function (){
			$visual.addClass('on');
		});

		var $visual = $('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualDots = $visual.find('.visual_dots');

		$visualList.slick({
			autoplay : true,
			fade : true,
			speed : 1500,
			autoplaySpeed : 4500,
			swipe : true,
			draggable: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite : true,
			prevArrow: $('.visual .visual_control .visual_prev'),
			nextArrow: $('.visual .visual_control .visual_next'),
			pauseOnHover: false,
			dots: true,
			autoArrow: $('.visual .visual_control .visual_auto'),
			isRunOnLowIE: false,
			pauseOnArrowClick: true,
			pauseOnDirectionKeyPush: true,
			pauseOnSwipe: true,
			pauseText: '정지',
			playText: '재생',
			appendDots : $visualDots,
		});


		/* 전시안내 */
		var $exhibit = $container.find('.exhibition'),
			$exhibitTabButton = $exhibit.find('.tab_button'),
			$exhibitTabPanel = $exhibit.find('.exhibition_panel'),
			$exhibitSlickOpt = {
				slidesToShow  : 4,
				slidesToScroll: 1,
				speed         : 500,
				infinite      : true,
				arrows         : true,
				prevArrow     : $exhibit.find('.exhibition_prev'),
				nextArrow     : $exhibit.find('.exhibition_next'),
				autoplay      : false,
				draggable: false,
				variableWidth : true,
				responsive: [
					{
						breakpoint: 1401,
						settings: {
							slidesToShow  : 3,
							variableWidth : true,
						}
					},
					{
						breakpoint: 801,
						settings: {
							slidesToShow  : 2,
							variableWidth : true,
							draggable: true,
						}
					},
					{
						breakpoint: 501,
						settings: {
							slidesToShow  : 1,
							variableWidth : true,
							draggable: true,
						}
					}
				]
			};

		$('.exhibition .exhibition_panel.active .exhibition_list').slick($exhibitSlickOpt);

		$exhibitTabButton.on('click', function (event) {
			var $this = $(this),
				$parent = $this.parents('.tab_item'),
				parentIndex = $parent.index();

			$parent.addClass('active').siblings().removeClass('active');
			$this.attr('title', '선택됨');
			$parent.siblings().children('.tab_button').removeAttr('title');
			$exhibitTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

			$exhibitTabPanel.each(function () {
				$(this).find('.exhibition_list').slick('unslick');
				$exhibitTabPanel.eq(parentIndex).find('.exhibition_list').slick($exhibitSlickOpt).slick('setPosition');
			})
		});



		//팝업
		var $Popup = $('.popup .popup_list'),
			$popuptotal = $('.popup .total'),
			$popupcurrent = $('.popup .current');

		$Popup.slick({
			//기본
			autoplay: true,
			dots: false,
			swipe: true,
			draggable: true,
			slidesToShow: 1,
			variableWidth: false,
			infinite: true,
			prevArrow: $('.popup .popup_control .prev'),
			nextArrow: $('.popup .popup_control .next'),

			//추가 기능
			autoArrow: $('.popup .popup_control .auto'),
			isRunOnLowIE: false,
			pauseOnArrowClick: true,
			pauseOnDirectionKeyPush: true,
			pauseOnSwipe: true,
			pauseText: '정지',
			playText: '재생',
			total: $popuptotal,
			current: $popupcurrent,
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
					breakpoint: 641,
					settings: {
						autoplay: false,
						variableWidth: false,
						infinite: true,
						slidesToShow: 1,
					}
				},
			],
		});
		//팝업 끝


		/* fade */
		var $fade = $('.fade, .fade_in');

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


	});
})(window.jQuery);

