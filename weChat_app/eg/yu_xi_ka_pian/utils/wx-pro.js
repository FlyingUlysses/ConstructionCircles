var e = require("../polyfill/es6-promise.js").Promise, t = require("../utils/common.js"), o = require("../utils/data.js");

wx.pro = {}, [ "login", "getUserInfo", "navigateTo", "checkSession", "getStorageInfo", "removeStorage", "clearStorage", "getNetworkType", "getSystemInfo", "chooseImage", "uploadFile", "chooseLocation", "getImageInfo", "requestPayment" ].forEach(function(t) {
    wx.pro[t] = function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new e(function(e, n) {
            o.success = function(t) {
                e(t);
            }, o.fail = function(e) {
                wx.hideLoading(), n(e);
            }, wx[t](o);
        });
    };
}), wx.pro.fromSync = function(t) {
    return new e(function(e, o) {
        try {
            e(t());
        } catch (e) {
            o(e);
        }
    });
}, wx.pro.all = function(t) {
    return e.all(t);
}, wx.pro.getStorage = function(t) {
    return new e(function(e, o) {
        wx.getStorage({
            key: t,
            success: function(t) {
                e(t.data);
            },
            fail: function(t) {
                e();
            }
        });
    });
}, wx.pro.setStorage = function(t, o) {
    return new e(function(e, n) {
        wx.setStorage({
            key: t,
            data: o,
            success: function(t) {
                e(o);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}, wx.pro.request = function(n) {
    var r = "https://api.miniprogramadmin.com/v1", i = o.getData().ext;
    return wx.getExtConfigSync && (i = wx.getExtConfigSync()), i && i.serverurl && (r = i.serverurl), 
    n.types && (r = "https://v2.api.miniprogramadmin.com", i && i.serverurlv2 && (r = i.serverurlv2)), 
    n.toast && wx.showToast({
        title: n.toast.title || "加载中",
        icon: "loading"
    }), new e(function(e, o) {
        console.log(n.url);
        var i = {
            url: r + n.url,
            method: n.method || "GET",
            header: {
                Authorization: "Bearer " + t.getAccessToken(),
                Position: JSON.stringify(t.getStorage("position"))
            },
            success: function(n) {
                n.statusCode >= 400 ? (console.log(n), 401 === n.statusCode && t.removeAccessToken(), 
                410 === n.statusCode && wx.showModal({
                    title: "提示",
                    content: n.data,
                    showCancel: !1,
                    success: function(e) {}
                }), wx.hideLoading(), o(n)) : (e(n.data), n.data || wx.hideLoading());
            },
            fail: function(e) {
                console.log(JSON.stringify(e)), console.error("wx.request fail [network]", n, e), 
                o(e), wx.hideLoading();
            }
        };
        n.data && (i.data = n.data, i.header["content-type"] = "application/json"), wx.request(i);
    });
}, module.exports = e;