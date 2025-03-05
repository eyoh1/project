
'use strict';
try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {

        })(jQuery);
    }
}catch(e) {
    console.error(e);
}