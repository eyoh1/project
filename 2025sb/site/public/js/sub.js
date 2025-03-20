(function ($) {
    'use strict';

    $(function () {

        var $window = $(window),
            $container = $('#container'),
            $contents = $('#contents'),
            debounce = null;

        $window.load(function () {
            $('.sub_visual').addClass('active');
        });


        //cms 탭메뉴
        var $tab = $container.find('.tab'),
            $tabMenu = $tab.find('.tab_menu'),
            $tabSelect = $tabMenu.find('.tab_select');

        $tabSelect.on('click', function () {
            var $this = $(this);

            if (!$this.parent().is('.active')) {
                $this.attr('title', '목록닫기')
                    .parent().addClass('active')
                    .end().next().slideDown('250');
            } else {
                $this.attr('title', '목록열기')
                    .parent().removeClass('active')
                    .end().next().slideUp('250');
            }
        });

        //컨텐츠 탭메뉴
        $tab.each(function (index, element) {
            var $tabMenu = $(element).find('.tab_menu'),
                $tabList = $(element).find('.tab_list'),
                $tabBtn = $(element).find('.tab_list.n1 > .tab_item > button.tab_button'),
                tabAllChk = $tabBtn.is('.tab_all'),
                $tabContent = $(element).find('.tab_content');

            var liLength = $tabMenu.find('.tab_list.n1 > .tab_item').length;
            $tabList.addClass('divide' + liLength);

            $tabBtn.click(function () {
                var $this = $(this),
                    index = $tabBtn.index(this),
                    tabButtonText = $this.text(),
                    IsTabAll = $this.is('.tab_all'),
                    $tabPanel = $this.parents('.tab_panel'),
                    $tabMenu = $this.parents('.tab_menu');

                $this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
                $this.parents('.tab').find('.tab_select span').text(tabButtonText);
                $tabPanel.attr('class', 'tab_panel').addClass('active' + (index + 1));

                if (tabAllChk) {
                    if (IsTabAll) {
                        $tabContent.addClass('active');
                    } else {
                        $tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
                    }
                } else if (!tabAllChk) {
                    $tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
                }
                if ($window.width() <= 800) {
                    $tabMenu.removeClass('active');
                    $tabPanel.slideUp('250');
                }
                if ($window.width() <= 800 && IsTabAll) {
                    $tabMenu.removeClass('active');
                    $tabPanel.slideUp('250');
                }
                ;
            });
        });

        //셀렉트박스 디자인
        $('.style_select_box .search_select').on('click', function () {
            var $this = $(this),
                $MyParent = $this.parent('.style_select_box'),
                MyParentIsActive = $MyParent.is('.active'),
                $MyLayer = $this.siblings('.search_list');

            if (!MyParentIsActive) {
                $MyParent.addClass('active');
                $this.attr('title', '목록닫기');
                $MyLayer.slideDown();
            } else {
                $MyParent.removeClass('active');
                $this.attr('title', '목록열기');
                $MyLayer.slideUp();
            }
        });

        /* 스텝(가로) */
        function stepAutoHeight() {
            var $step = $container.find('.stedp');
            $step.find('.step_inner, .step_title, .step_text').removeAttr('style', 'height');

            $step.each(function () {
                var $stepInner = $(this).find('.step_inner'),
                    maxHeight = 0;
                $stepInner.css({'height': 'auto'});
                $stepInner.each(function () {
                    var $div = $('<div></div>'),
                        $stepTitle = $(this).find('.step_title'),
                        $stepText = $(this).find('.step_text'),
                        $subText = $(this).find('.sub_text');
                    $div.addClass('step_wrap');
                    if (maxHeight < $(this).innerHeight()) {
                        maxHeight = $(this).innerHeight();
                    }
                    $(this).addClass('vertical')
                    if ($(this).find('.step_wrap').length === 0) {
                        $(this).append($div);
                        $(this).find('.step_wrap').append($stepTitle, $stepText, $subText);
                    }
                })
                $stepInner.innerHeight(maxHeight);
            })

        }

        stepAutoHeight();

        /* 사이트 링크 */
        function linkAutoHeight() {
            var $linkBox = $container.find('.link_box'),
                $linkList = $linkBox.find('.link_list'),
                $linkInner = $linkBox.find('.inner');

            //초기화
            $linkInner.removeAttr('style', 'height');

            $linkList.each(function (index, element) {
                var $element = $(element),
                    linkInnerMinHeight = 0; //기본 높이

                $element.find('.link_item').each(function (index, element) {
                    var $element = $(element),
                        linkInnerHeight = $element.find('.inner').height();

                    //최고높이
                    if (linkInnerHeight > linkInnerMinHeight) {
                        linkInnerMinHeight = linkInnerHeight;
                    }
                });

                $element.find('.inner').height(linkInnerMinHeight);
            });

        }

        linkAutoHeight();

        $window.on('load resize', function () {
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                stepAutoHeight();
                linkAutoHeight()
            }, 50);
        });


        /* 반응형 테이블 */
        var $tableResponsive = $container.find('.table.responsive');

        $tableResponsive.each(function (index, element) {
            var $element = $(element),
                rowdivIs = $element.find('td, th').is('[rowdiv]'),
                theadLength = $element.find('thead').length;

            if (rowdivIs == false && !theadLength == 0) {
                $element.find('tbody th, tbody td').each(function (index, element) {
                    var $this = $(element),
                        thisIndex = $this.index(),
                        theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

                    $this.attr('data-content', theadText);
                });

                $element.find('tfoot th, tfoot td').each(function (index, element) {
                    var $this = $(element),
                        thisIndex = $this.index(),
                        theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

                    $this.attr('data-content', theadText);
                });
            }
        });

        // popup
        $(document).ready(function () {
            var $body = $('body'),
                $popupBg = $('.popup_bg'),
                $pupupBtn = $('.popup_btn'),
                $popupClose = $popupBg.find('.popup_close');
            $pupupBtn.on('click', function () {
                $popupBg.addClass('active');
                if ($popupBg.hasClass('active')) {
                    $body.addClass('popup_show');
                }
                return false;
            })
            $popupClose.on('click', function () {
                $popupBg.removeClass('active');
                $body.removeClass('popup_show');
            })
        });

        $(document).ready(function () {
            //ebook 리스트 버튼 박스 접근성 관련 포커스 수정
            var $pEbook = $('.p_ebooklist'),
                $EbookList = $pEbook.find('.ebook_list'),
                $EbookItem = $EbookList.find('.ebook_item');

            $EbookItem.on('mouseover focusin', function () {
                $EbookItem.removeClass('active');
                $(this).addClass('active');
            });
            $EbookItem.on('mouseleave focusout', function () {
                $EbookItem.removeClass('active');
            });

        });

        // 서브 자동완성
        var $searchInput = $('.search_query');
        $searchInput.each(function () {

            var $search = $(this).closest('.search');

            if (!$(this).closest('.search_input').length) $(this).wrap('<div class="search_input"></div>');

            $(this).after($('<div>', {
                class: 'search_logs',
            }).append($('<ul>')));

            var $input = $(this),
                $searchLogs = $input.next();

            $input.on('input', function () {
                var $this = $(this),
                    thisQuery = $this.val();

                if (thisQuery.length < 1) AtcpDeactive($searchLogs);
                else AtcpActive($searchLogs, thisQuery);
            }).on('focusin', function () {
                if (!($searchLogs.hasClass('active'))) return;
                $search.addClass('logs_open');
                $searchLogs.height($searchLogs.find('ul').innerHeight()).find('a, button').attr('tabindex', 0);
            }).on('focusout', function () {
                setTimeout(function () {
                    if (!!document.activeElement.closest('.search_input')) return;
                    $search.removeClass('logs_open');
                    $searchLogs.height(0).find('a, button').attr('tabindex', -1);
                });
            });

            $(window).on('resize', function () {
                $searchLogs.height(0).find('a, button').attr('tabindex', -1);
            });
        });


        // 사이드메뉴 높이에 따라서 담당자 정보 맨 아래에 고정
        var setContentsHeight = function () {
            var sideMenuHeight = $('.side_menu').outerHeight(),
                cmsTabHeight = $('.cms_tab').outerHeight() || 0;

            if (window.innerWidth > 1000) {
                $('#contents').css('min-height', ''); // 높이를 초기화
                var contentsHeight = $('#contents').outerHeight(); // 초기화 후 높이 재계산

                if (sideMenuHeight > (contentsHeight + cmsTabHeight)) {
                    $('#contents').css('min-height', sideMenuHeight - cmsTabHeight - 200); // cms_tab 높이를 빼고 #contents 높이 설정
                }
            } else {
                $('#contents').css('min-height', 'auto');
            }
        };

        setContentsHeight();
        $(window).resize(setContentsHeight);

    });
})(window.jQuery);

// 만족도조사
function fn_validateCntntsEvalHist(frm) {
    var valiEvl = false;
    for (var i = 0; i < frm.cntntsEvlSe.length; i++) {
        if (frm.cntntsEvlSe[i].checked == true) {
            valiEvl = true;
            break;
        }
        ;
    }
    ;
    if (!valiEvl) {
        alert("만족도의 등급을 선택하지 않으셨습니다.\n만족도 등급을 선택하여 주세요.");
        return false;
    }
    ;
    return true;
};


/**
 * 검색어 입력시 자동완성
 */
function AtcpActive($logs, thisQuery) {
    var $search = $logs.closest('.search'),
        $autolist = $logs.find('ul');
    $.ajax({
        url: "/search/api/akc.jsp?kwd=" + thisQuery,
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            var obj = JSON.parse(response),
                // seed = obj.seed,
                list = obj.suggestions[0],
                $input = $logs.prev();

            $input[0].originVal = thisQuery;

            $autolist.html('');

            $.each(list, function (i, item) {
                var $item = $('<li>'),
                    $button = $('<button type="button" title="자동완성 삭제" class="search_delete"></button>'),
                    kwd = item[0],
                    $a = $('<a>', {
                        href: '/search/search.jsp?kwd=' + kwd,
                        html: kwd.replace(new RegExp(thisQuery, 'gi'), function (match) {
                            return '<em>' + match + '</em>';
                        }),
                    });

                $a.on('focusin', function () {
                    $input.val(kwd);
                });

                $a.add($button).on('focusout', function () {
                    setTimeout(function () {
                        if (!!document.activeElement.closest('.search_input')) return;
                        $search.removeClass('logs_open');
                        $logs.height(0).find('a, button').attr('tabindex', -1);
                        $input.val($input[0].originVal);
                    });
                });

                $autolist.append($item.append($a, $button));
            });

            if ($autolist.children().length < 1) return AtcpDeactive($logs);
            $search.addClass('logs_open');
            $logs.addClass('active').height($autolist.innerHeight());
        },
        error: function () {
            console.log('Error')
        }
    });
};

function AtcpDeactive($logs) {
    $logs.removeClass('active').height(0);
};

function validateSearch() {
    const input = document.getElementById('kwd');
    if (input.value.trim() === '') {
        alert('검색어를 입력해주세요.');
        return false;
    }
    return true;
}

function validateSearch2() {
    const input = document.getElementById('kwd2');
    if (input.value.trim() === '') {
        alert('검색어를 입력해주세요.');
        return false;
    }
    return true;
}
