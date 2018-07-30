var e = require("../../index/page.js").buildPage();

e.config = function(e) {
    this.state.page_name = "defined", this.state.page_title = "", this.state.key = "userDefined", 
    this.setData({
        isUserDefined: !0
    }), e.hasOwnProperty("userDefined") && (this.state.page_id = e.userDefined);
}, e.onShareAppMessage = function() {
    var e = this;
    return {
        title: e.state.page_title,
        path: "/pages/userDefined/userDefined0/userDefined0?userDefined=" + e.state.page_id
    };
}, Page(e);