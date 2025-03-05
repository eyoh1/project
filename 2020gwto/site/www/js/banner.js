
$(document).ready(function() {
    if (7 < $(".banner li").length) {
        var t = null;

        function n() {
            $(".banner ul").stop().animate({
                left: "-=130px"
            }, 0, function() {
                var e = $(".banner ul li:first").clone(!0);
                $(".banner ul li:first").remove(), $(".banner ul").css("left", 0), $(".banner ul").append(e)
            }), t && clearTimeout(t), t = setTimeout(n, 3e3)
        }
        $(document).ready(function() {
            t = setTimeout(n, 3e3), $rightB = $(".banner_controller .banner_next"), $leftB = $(".banner_controller .banner_prev"), $pauseB = $(".banner_controller .banner_ctrl");
            var e = !1;
            $leftB.click(function() {
                return "left", clearTimeout(t), $(".banner ul").stop().animate({
                    left: "0px"
                }, 0, function() {
                    var e = $(".banner ul li:last").clone(!0);
                    $(".banner ul li:last").remove(), $(".banner ul").css("left", "0"), $(".banner ul").prepend(e)
                }), t && clearTimeout(t), t = setTimeout(n, 3e3), !1
            }), $rightB.click(function() {
                return "right", clearTimeout(t), n(), !1
            }), $pauseB.click(function() {
                0 == e ? (clearTimeout(t), $pauseB.addClass("play").text("배너 롤링 재생하기"), e = !0) : (e = !1, $pauseB.removeClass("play").text("배너 롤링 정지하기"), t = setTimeout(n, 1500))
            }), $(".banner ul li a").on("mouseover focusin", function() {
                clearTimeout(t)
            }), $(".banner ul li a").on("mouseleave focusout", function() {
                e = !1
            })
        })
    }
});