

(function($) {
    'use strict';

    $(function() {
        var $window = $(window),
            $html = $('html'),
            $container = $('#container'),
            $footer = $('#footer');

       
            //tab 6depth 유무에 따른 스타일 변경
            $(function () {
                var $tabPanel = $('.tab_panel'),
                    $tabItem = $tabPanel.find('.tab_item'),
                    $tabDepth6 = $tabItem.find('.tab_depth6'),
                    $tabDepth6Item = $tabDepth6.find('.tab_depth6_item');
                $tabDepth6Item.closest('.tab_item').addClass('has_depth');
            });
            //tab 6depth 유무에 따른 스타일 변경 끝

            /* cms 탭메뉴 */

            function roundFunc() {
                var $all_tab = $container.find('.tab_menu');
            
                $all_tab.each(function(index, element){
                    var $this = $(element),
                        $cms_item = $this.find('.tab_item'),
                        item_length = $cms_item.length,
                        last_floorLength = item_length % 4;

                    if($window.width() > 800){
                        if(last_floorLength != 0){
                            $this.find('.tab_item:nth-last-child('+ last_floorLength +')').addClass('first');
                        } else {
                            $this.find('.tab_item:nth-last-child(4)').addClass('first');
                            $this.find('.tab_item:nth-last-child(1)').addClass('last');
                        }
                    } else{
                        var last_floorLength = item_length % 3;

                        if(last_floorLength != 0){
                            $this.find('.tab_item:nth-last-child('+ last_floorLength +')').addClass('first');
                        } else {
                            $this.find('.tab_item:nth-last-child(3)').addClass('first');
                            $this.find('.tab_item:nth-last-child(1)').addClass('last');
                        }
                    }
                });
            }
            roundFunc();
            


            var $tabMenu = $container.find('.tab_menu'),
                $tabSelect = $tabMenu.find('.tab_select');

            $tabSelect.click(function () {
                var $this = $(this),
                    $ParentTabmenu = $this.parent('.tab_menu'),
                    IsActive = $ParentTabmenu.is('.active');
                if (!IsActive) {
                    $this.next('.tab_panel').stop().slideDown(250);
                    $ParentTabmenu.addClass('active');
                } else {
                    $this.next('.tab_panel').stop().slideUp(250);
                    $ParentTabmenu.removeClass('active');
                };
            });

            /* cms 탭메뉴 끝*/

            /* 컨텐츠 탭메뉴 */
            var $tab = $container.find('.tab');

            $tab.each(function(index, element){
                var $tabM = $(element).find('.tab_menu'),
                    $tabButton = $(element).find('.tab_button'),
                    tabAllCheck = $tabButton.is('.tab_all'),/*전체보기 탭메뉴 유무*/
                    $tabContent = $(element).find('.tab_content');

                var li_length = $tabM.find('.tab_item').length;
                $tabM.not($('.prettyprint').children()).addClass('divide' + li_length);

                $tabButton.click(function () {
                    var $this = $(this),
                        index = $tabButton.index(this),
                        tabButtonText = $this.text(),
                        IsTabAll = $this.is('.tab_all'),
                        $tab_panel = $this.parents('.tab_panel'),
                        $tab_menu = $this.parents('.tab_menu');
                    $this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
                    $this.parents('.tab').find('.tab_select span').text(tabButtonText);
                    if (tabAllCheck){
                        if (IsTabAll) {
                            $tabContent.addClass('active');
                        } else {
                            $tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
                        };
                    } else if (!tabAllCheck){
                        $tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
                    }
                    if ($window.width() <= 640) {
                        $tab_menu.removeClass('active');
                        $tab_panel.slideUp();
                    };
                    if ($window.width() <= 640 && IsTabAll) {
                        $tab_menu.removeClass('active');
                        $tab_panel.slideUp();
                    };

                });
            });

            /* 컨텐츠 탭메뉴 끝 */

            /* 테이블 */
            $('table.table.responsive').not($('.prettyprint').children()).each(function () {
                var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                    TheadExist = $(this).find('thead').length;
                if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                    $(this).children('tbody').children('tr').find('th, td').each(function () {
                        var ThisIndex = $(this).index(),
                            TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                        $(this).attr('data-content', TheadText);
                    });
                    $(this).children('tfoot').children('tr').find('th, td').each(function () {
                        var ThisIndex = $(this).index(),
                            TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                        $(this).attr('data-content', TheadText);
                    });
                };
            });

            $('.table_scroll').each(function () {
                $(this).removeAttr('tabindex');
            });

            $('ol.num').not($('.prettyprint').children()).each(function () {
                var $this = $(this),
                    $ThisLi = $this.find('>li');
                $ThisLi.each(function () {
                    var $this = $(this),
                        ThisIndex = $this.index() + 1;
                    $this.prepend('<i class="count">' + ThisIndex + '</i>');
                });
            });

            $('.table_unit').each(function () {
                var $this = $(this),
                    IsTitle = $this.find('h3,h4,h5,h6').length;
                console.log(IsTitle);
                if (!IsTitle){
                    $this.addClass('notitle');
                }
            });
            /* 테이블 끝 */

            /*인풋 포커스*/
            var selectTarget = $('.sd_input input[type="text"]');
            selectTarget.on({
                'focus': function () {
                    $(this).parent().addClass('focus');
                },
                'blur': function () {
                    $(this).parent().removeClass('focus');
                }
            });
            /*인풋 포커스 끝*/

            /* 셀렉트박스 디자인 */
            var $select = $container.find('.select_design'),
                $selectAllButton = $select.find('button', 'a'),
                $selectAnchor = $select.find('.select_anchor'),
                $selectPanel = $tab.find('.select_panel');

            $selectAnchor.click(function () {
                var $this = $(this),
                    selectButtonText = $this.text();

                $this.attr('title', '선택됨').closest('.select_item').addClass('active').siblings('.select_item').removeClass('active').find('.select_anchor').removeAttr('title');
                $this.parents('.select_design').find('.select_button span').text(selectButtonText);
                $selectPanel.addClass('active').siblings().removeClass('active');


            });
            $selectAllButton.click(function () {
                var $this = $(this),
                    $parentmenu = $this.parents('.select_design'),
                    IsActive = $parentmenu.is('.active');
                if (!IsActive) {
                    $this.attr('title', '열림');
                    $parentmenu.find('.select_panel').stop().slideDown(250);
                    $parentmenu.addClass('active');
                } else {
                    $this.removeAttr('title');
                    $parentmenu.find('.select_panel').stop().slideUp(250);
                    $parentmenu.removeClass('active');
                }
            });
            /* 셀렉트박스 디자인 끝 */

            /*Q&A*/
            $('.qnabox .listbox .qnabtn').on('click', function(){
                var $this = $(this),
                    $MyParent = $this.parent('.listbox'),
                    $MyAnswer = $this.siblings('.answer'),
                    $OterParents = $MyParent.siblings('.listbox'),
                    $OterAnswer = $OterParents.find('.answer'),
                    $OterBtn = $OterParents.find('.qnabtn'),
                    IsActive = $MyParent.is('.active');
                if(!IsActive){
                    $OterParents.removeClass('active');
                    $OterAnswer.stop().slideUp();
                    $OterBtn.attr('title', '목록열기');
                    $MyParent.addClass('active');
                    $MyAnswer.stop().slideDown();
                    $this.attr('title', '목록닫기');
                } else{
                    $MyParent.removeClass('active');
                    $MyAnswer.stop().slideUp();
                    $this.attr('title', '목록열기');
                };
            });

            /* 스텝 넘버 */
            $(document).ready(function () {
                var $step = $container.find('.step.number');
                    
                $step.each(function (index, element) {
                    var $stepList = $(element).find('.step_list');

                    if(!$(element).hasClass('type3')){

                        $stepList.each(function (index, element) {
                            var $element = $(element),
                                $elementStepItem = $element.find('.step_item'),
                                $elementItemLevel = $elementStepItem.find('.level');

                            $elementStepItem.each(function (index, obj) {
                                var $index = $(this).index();
                                $elementItemLevel.eq(index).text('step' + ($index + 1));
                            });
                        });
                    }
                });
            });
            /* 스텝 넘버 끝*/

            /* 스텝 자동 높이 */
            function stepAutoHeight() {
                var $step = $container.find('.step'),
                    $stepList = $step.find('.step_list'),
                    $stepItem = $stepList.find('.step_item');


                $stepList.each(function (index, element) {
                    var $element = $(element),
                        $elementStepBox = $element.find('.step_box'),
                        $elementStepItem = $element.find('.step_item'),
                        $elementItemLevel = $elementStepItem.find('.level'),
                        height = 0,
                        width = 0,
                        count;

                    // if ($element.parents('.step').hasClass('type2')) {
                    //     $($elementStepItem, element).each(function (index) {
                    //         var $this = $(this),
                    //             $thisContent = $this.find('.step_content'),
                    //             IsTitle = $thisContent.children().is('.title'),
                    //             $thisText = $thisContent.find('.text');
                    //         if (IsTitle){
                    //             $thisContent.css('display','block');
                    //         } else if (!IsTitle){
                    //             $thisContent.css('display', 'inline-block');
                    //         }
                    //     });
                    // }


                    if ($element.parents('.step').hasClass('type3')) {
                        if ($(window).width() > 640) {
                            $($elementStepBox, element).each(function (index) {
                                var $this = $(this),
                                    height = 0,
                                    thisHeight = $this.height(),
                                    thisItemHeight = $this.find('.step_item').height(),
                                    thisProHeight = $this.find('.step_process').height();

                        
                                var $index = $this.index();
                                $elementItemLevel.eq(index).text('step' + ($index + 1));

                                    /*둘중 큰높이*/
                                    if (thisItemHeight > height) {
                                        height = thisItemHeight;
                                        if (thisProHeight > height){
                                            height = thisProHeight;
                                        }
                                    }
                                    if (thisItemHeight < height) {
                                        $this.find('.step_item').outerHeight(height);
                                    } else{
                                        $this.find('.step_process').height($this.find('.step_item').outerHeight());
                                    }

                                count = index + 1;
                            });
                        } else{
                            $($elementStepBox, element).each(function (index) {
                                var $this = $(this),
                                    $index = $this.index();
                                $elementItemLevel.eq(index).text('step' + ($index + 1));

                            });
                        }

                    } else if (!$element.parents('.step').hasClass('type3')) {
                        $($elementStepItem, element).each(function (index) {
                            var $this = $(this),
                                $thisContent = $this.find('.step_content'),
                                thisHeight = $this.find('.step_content').height();

                            if (thisHeight > height) {
                                height = thisHeight;
                                // $thisContent.height(height);
                            }

                            count = index + 1;
                        }).height(height);
                    }

                    $element.closest('.step').addClass('length' + count);
                });
            }
            /* 스텝 자동 높이 끝*/

            /* 스텝 자동 높이 반응형 */
            $(window).on('load resize', function () {
                stepAutoHeight();
                
            });
            /* 스텝 자동 높이 반응형 끝*/

    });
})(jQuery);
