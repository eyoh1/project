

(function($) {
	'use strict';

	var $window = $(window),
		$document = $(document),
		$html = $('html'),
		$head = $('head'),
		$screen = $.screen,
		$inArray = $.inArray;

	$(function() {

		//marketing section animation - width "ScrollMagic" url(/site/www/js/ScrollMagic.js)
		var controller = new ScrollMagic.Controller();

		var scene2 = new ScrollMagic.Scene({
			triggerElement: ".mkt_sec2", //트리거 설정
			triggerHook: 0.8
		})
			.setClassToggle(".mkt_sec2", "effect")
			.addTo(controller);

		var scene3 = new ScrollMagic.Scene({
			triggerElement: ".mkt_sec3", //트리거 설정
			triggerHook: 0.8
		})
			.setClassToggle(".mkt_sec3", "effect")
			.addTo(controller);

		//section2 bg animation
		$(function(){
			var $mktSec2 = $('.mkt_sec2'),
				$mktSec2Bg = $('.mkt_sec2_bg');
			$(document).on('scroll',function(){
				if($mktSec2.hasClass('effect')){
					$mktSec2Bg.addClass('effect');
				} else {
					$mktSec2Bg.removeClass('effect');
				}
			});
		});

		//marketing 변수지정
		var $mktSlideWrap = $('.mkt_slide'),
			$mktSlide = $mktSlideWrap.find('.mkt_slide_list'),
			$mktItem = $mktSlide.find('.mkt_slide_item'),
			mktLength = $mktItem.length,
			mktBarWidth = 100 / mktLength,
			$mktCtrl = $mktSlideWrap.find('.mkt_ctrl'),
			$mktDots = $mktCtrl.find('.dots'),
			$mktPrev = $mktCtrl.find('.prev'),
			$mktNext = $mktCtrl.find('.next'),
			$mktBarWrap = $mktCtrl.find('.bar_wrap'),
			$mktBar = $mktCtrl.find('.bar'),
			$mktSec3 = $('.mkt_sec3'),
			$mktBizList = $mktSec3.find('.mkt_biz_list'),
			$mktBizItem = $mktBizList.find('.mkt_biz_item');


		//marketing slide
		$mktBar.css('width',0);
		$mktSlide.slick({
			autoplay: true,
			autoplaySpeed: 4000, //변경시 css animation 속도도 변경해줘야 함.
			dots: true,
			cssEase:'ease-in-out',
			appendDots : $mktDots,
			useCSS:true,
			customPaging: function (slider, i) {
				var current = i + 1,
					currentCount = current < 10 ? '0' + current : current,
					total = slider.slideCount,
					totalCount = total < 10 ? '0' + total : total;
				return '<span class="current">' + currentCount + '</span><span class="total">' + totalCount + '</span>';
			},
			prevArrow: $mktPrev,
			nextArrow: $mktNext,
			fade : true
		});

		$mktSlide.on('afterChange',function(){
			$mktBar.addClass('active');
		});
		$mktSlide.on('beforeChange',function(){
			$mktBar.removeClass('active');
		});

		//marketing box height
		$(window).on('load resize', function(){
			var h = 0;
			h = 0;
			$mktBizItem.each(function(){
				var $this = $(this),
					thisHeight = $this.find('.mkt_biz_text').outerHeight();
				if(thisHeight > h){
					h = thisHeight;
				}
			}).css('height',h);
		});
	});
})(jQuery);