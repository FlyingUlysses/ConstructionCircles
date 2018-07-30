var e = getApp().globalData.commonFun;

Page({
    data: {
        webview_url: ""
    },
    state: {},
    onLoad: function(t) {
        var a = e.getAccessToken();
        this.state.options = t;
        var s = this;
        a ? s.openUrl(t) : getApp().globalData.tokenUpdated = function() {
            console.log("update success"), s.openUrl(t);
        };
    },
    openUrl: function(t) {
        t.hasOwnProperty("url") ? this.setData({
            webview_url: t.url
        }) : this.setData({
            webview_url: "https://" + e.getStorage("config").host + "/sell/?token=" + e.getAccessToken() + "&key=" + t.k + "&acid=" + getApp().globalData.acid
        });
    },
    onShareAppMessage: function() {
        var e = this, t = "/pages/webview/webview?k=" + e.state.options.k;
        return e.state.options.hasOwnProperty("url") && (t = "/pages/webview/webview?url=" + e.state.options.url), 
        {
            title: "",
            path: t,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});