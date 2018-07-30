var e = require("../page.js").buildPage(), t = getApp().globalData.commonFun;

e.config = function(e) {
    this.state.key = "page0";
    var a = this;
    t.getAlter(this, "indexpop", function(e, t) {
        a.setData({
            alter: e,
            alterHidden: t
        });
    });
}, Page(e);