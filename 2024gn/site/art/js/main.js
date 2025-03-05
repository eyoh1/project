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
			customPaging: function (slider, i) {
				var title = $(slider.$slides[i]).data('title'),
					index = $(slider.$slides[i]).data('index');
				return '<button type="button" class="dots_title">' + '<em>' + index  + '</em>' + '<span>' + title + '<span>' +' </button>';
			},
		});


		/* 공연안내 */
		var $performance = $container.find('.performance'),
			$performanceList = $performance.find('.performance_list'),
			$performancePrev = $performance.find('.performance_prev'),
			$performanceNext = $performance.find('.performance_next');

		$performanceList.slick({
			autoplay : false,
			draggable : true,
			infinite : true,
			slidesToShow : 4,
			variableWidth : true,
			prevArrow : $performancePrev,
			nextArrow : $performanceNext,
			responsive: [
				{
					breakpoint: 1501,
					settings: {
						slidesToShow : 3,
					}
				},
			]
		});

		/* 일정안내 */
		var $schedule = $container.find('.schedule'),
			$scheduleButton = $schedule.find('.calendar_table td .day'),
			$scheduleClose = $schedule.find('.calendar_table .schedule_layer .schedule_close');

		$scheduleButton.on('click', function () {
			var $this = $(this);
			$this.parent().addClass('active');
			$this.parent().siblings().removeClass('active');
			$this.parent().parents().siblings().children().removeClass('active');
		});

		$scheduleClose.on('click', function (){
			$(this).parents().removeClass('active');
		})

		$('.calendar_table tbody td').each( function (){
			if($(this).children().is('.schedule_layer') === true){
				$(this).children('button').addClass('schedule_open').attr('title','일정보기')
			}
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


	});
})(window.jQuery);

