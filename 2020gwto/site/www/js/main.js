'use strict';

try {
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//태그객체
			var $window = $(window);
			$(function() {
				$window.on('screen:wide screen:web', function(event) {
					window.mode = 'pc';
				});

				$window.on('screen:tablet screen:phone', function(event) {
					$('.search_panel').hide();
					window.mode = 'mobile';
				});


				//여기서부터 코드 작성해주세요

				//공지사항 탭메뉴 시작
				$('.board .inner_box .board_list .board_item .board_tab_btn').on('click', function(){
					var $this = $(this),
						$Parent = $this.parent('.board_item'),
						Index = $Parent.index(),
						$ParentF = $Parent.siblings('.board_item'),
						$ParentFbtn = $ParentF.find('.board_tab_btn'),
						$GrandParent = $Parent.parent('.board_list'),
						$GGrandParent = $GrandParent.parents('.inner_box'),
						$OtherParent = $GGrandParent.find('.board_content'),
						$OtherParentC = $OtherParent.find('.board_wrap').eq(Index),
						$OtherParentCsiblings = $OtherParentC.siblings('.board_wrap'),
						IsActive = $Parent.is('.active');
					if(!IsActive){
						$Parent.addClass('active');
						$ParentF.removeClass('active');
						$this.attr('title', '선택됨');
						$ParentFbtn.removeAttr('title');
						$OtherParentC.addClass('active');
						$OtherParentCsiblings.removeClass('active');
					}
				});
				//공지사항 탭메뉴 끝

				//비주얼 슬릭 시작
				var $Visual = $('.visual .visual_list'),
					$viaualtotal = $('.visual .countbox .total'),
					$viaualcurrent = $('.visual .countbox .current'),
					$viaualDots = $('.visual .visual_control .control_box .dots');

				$Visual.slick({
					//기본
					autoplay : true,
					dots : true,
					appendDots : $viaualDots,
					dotsClass : "slick-dots",
					swipe : false,
					draggable : false,
					slidesToShow : 1,
					slidesToScroll: 1,
					variableWidth: false, //
					infinite: true, //무한반복
					prevArrow : $('.visual .visual_control .prev'),
					nextArrow : $('.visual .visual_control .next'),
					customPaging : function(slider,i){ //01 로 시작
						var iCustom,
							sliderTotalCount;
						if(i < 9){
							iCustom = '0' + (i + 1);
						} else {
							iCustom = (i + 1);
						}
						if(slider.slideCount < 10 ){
							sliderTotalCount = '0' + slider.slideCount;
						} else {
							sliderTotalCount = slider.slideCount;
						}
						return '<span class="current">'+iCustom+'</span><span class="total">'+ sliderTotalCount+'</span>';
					},

					// total :  $viaualtotal, //1로 시작
					// current :$viaualcurrent,
					//추가 기능
					autoArrow : $('.visual .visual_control .auto'),
					isRunOnLowIE : false,
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
								dots : true,
								swipe : true,
								draggable : true
							}
						}
					]
				});


				//비주얼 슬릭 끝

				//자주찾는 서비스 시작
				var $Favorite = $('.favorite .favorite_list');
				$Favorite.slick({
					//기본
					autoplay : false,
					dots : false,
					swipe : false,
					draggable : false,
					slidesToShow : 5,
					slidesToScroll: 1,
					variableWidth: false,
					infinite: false,
					arrows : false,
					responsive: [
						{
							breakpoint: 1001,
							settings: {
								swipe : true,
								draggable : true,
								slidesToShow: 5,
								swipeToSlide: true
							}
						},
						{
							breakpoint: 641,
							settings: {
								swipe : true,
								draggable : true,
								slidesToShow: 3,
								swipeToSlide: true
							}
						}
					]
				});
				//자주찾는 서비스 끝

				//팝업 슬릭 시작
				var $Popup = $('.popup .popup_list'),
					popuptotal = $('.popup .total'),
					popupcurrent = $('.popup .current');
				$Popup.slick({
					//기본
					autoplay : true,
					dots : false,
					swipe : true,
					draggable : true,
					slidesToShow : 1,
					variableWidth: false,
					infinite: true,
					prevArrow : $('.popup .popup_control .prev'),
					nextArrow : $('.popup .popup_control .next'),
					//추가 기능
					autoArrow : $('.popup .popup_control .auto'),
					isRunOnLowIE : false,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
					pauseText : '정지',
					playText : '재생',
					total : popuptotal,
					current : popupcurrent,
					responsive: [
						{
							breakpoint: 1001,
							settings: {
								autoplay : false,
								arrows:false,
								slidesToShow : 1
							}
						},
						{
							breakpoint: 641,
							settings: {
								autoplay : false,
								infinite: false,
								slidesToShow : 1
							}
						}
					]
				});
				//팝업 슬릭 끝



				//비즈니스
				var $SpecialtyNav = $('.specialty_nav .specialty_nav_list');
				$SpecialtyNav.slick({
					//기본
					slidesToShow:1,
					variableWidth: false,
					swipe: false,
					draggable: false,
					dots: false,
					focusOnSelect: true,
					centerMode: true,
					fade: false,
					accessibility: true,
					infinite: true,
					autoArrow: false,
					slidesToScroll: 1,
					centerPadding: '110px',
					vertical:true,
					asNavFor: '.specialty_for .specialty_for_list',


					//추가 기능
					responsive: [
						{
							breakpoint: 1001,
							settings: {
								slidesToShow: 3,
							}
						},

					],
				});

				var $SpecialtyFor = $('.specialty_for .specialty_for_list'),
					/* specialtytotal = $('.specialty .total'),*/
					$specialtycurrent = $('.specialty .current');
				$SpecialtyFor.slick({
					//기본
					slidesToShow: 1,
					variableWidth: true,
					swipe: false,
					draggable: false,
					centerMode: true,
					focusOnSelect: false,
					/*        dots: false,*/
					vertical:false,
					/* total: specialtytotal,*/
					/* current: $specialtycurrent,*/
					asNavFor: '.specialty_nav .specialty_nav_list',
					prevArrow: $('.specialty .specialty_control .prev'),
					nextArrow: $('.specialty .specialty_control .next'),

					dots : true,
					appendDots : $specialtycurrent,
					customPaging : function(slider, i){
						var pagingCount;
						if(i < 10){
							pagingCount = '0'+(i + 1);
						} else if(i >= 10){
							pagingCount = (i + 1);
						}
						return pagingCount;
					},


					responsive: [
						{
							breakpoint: 1001,
							settings: {
								slidesToShow: 1,
								variableWidth: true,
								centerMode: true,
							}
						},
						{
							breakpoint: 641,
							settings: {
								swipe : true,
								draggable : true
							}
						}

					],
				});

				// On before slide change
				$SpecialtyFor.on('beforeChange', function (event, _ref, currentSlide, nextSlide) {
					var count = _ref.slideCount;
					var selectors = [nextSlide, nextSlide - count, nextSlide + count].map(function (n) {
							return "[data-slick-index=\"".concat(n, "\"]");
						}).join(', '),
						selectorsPrev = [nextSlide, nextSlide - count, nextSlide + count].map(function (n) {
							return "[data-slick-index=\"".concat(n - 1, "\"]");
						}).join(', '),
						selectorsNext = [nextSlide, nextSlide - count, nextSlide + count].map(function (n) {
							return "[data-slick-index=\"".concat(n + 1, "\"]");
						}).join(', ');
					$('.slick-slide').removeClass('slick-now').removeClass('slick-isprev').removeClass('slick-isnext');
					$(selectors).addClass('slick-now');
					$(selectorsPrev).addClass('slick-isprev');
					$(selectorsNext).addClass('slick-isnext');
				});
				$('[data-slick-index="0"]').addClass('slick-now');
				$('[data-slick-index="-1"]').addClass('slick-isprev');
				$('[data-slick-index="1"]').addClass('slick-isnext');




			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}
