require("utils/wx-pro.js");

require("./utils/san.js");

var e = require("utils/util.js"), n = require("utils/common.js");

App({
    checkToken: !1,
    onLaunch: function(e) {
        this.checkToken = !0;
    },
    onShow: function(e) {
        var t = n.getExtConfig();
        n.setStorage("userDefined", t.pages), n.getConfig(function(e) {});
        var o = this;
        wx.pro.checkSession().then(function() {
            if (n.getAccessToken()) {
                if (o.checkToken) {
                    o.checkToken = !1;
                    var t = n.getStorage("userInfo");
                    if (!t.avatar_url.original_url && !t.displayname) return n.getPersonInfo().then(function(t) {
                        n.ewmOpenWin(e);
                    });
                }
            } else console.log("no token");
            o.refresh(e);
        }).catch(function(n) {
            o.refresh(e);
        }), wx.getSystemInfo({
            success: function(e) {
                var n = e.SDKVersion;
                "1.0.0" != n && "1.0.1" != n && void 0 != n || wx.showModal({
                    title: "提示",
                    content: "当前微信版本过低，请升级至高版本",
                    showCancel: !1
                });
            }
        });
        var i = n.getStorage("hdhInfo");
        i && i.hasOwnProperty("id") || n.hdhInfo();
    },
    refresh: function(e) {
        n.getToken().then(function(t) {
            n.getPersonInfo().then(function(t) {
                n.ewmOpenWin(e), getApp().globalData.tokenUpdated();
            });
        });
    },
    onError: function(n) {
        e.notifyError(n);
    },
    globalData: {
        userInfo: null,
        acid: n.getExtConfig().acid,
        peise: n.getExtConfig().colors,
        tokenUpdated: null,
        commonFun: require("utils/common.js"),
        utilFun: require("utils/util.js"),
        dataTempFun: require("utils/dataTemp.js"),
        inputFun: require("utils/inputEvent.js"),
        phoneFun: require("utils/phoneEvent.js"),
        payEvent: require("utils/payEvent.js"),
        payTemp: require("utils/payTemp.js"),
        hdcategoryId: 0,
        mallcategoryId: 0,
        newscategoryId: 0,
        groupid: 0,
        awardsConfig: {},
        audioData: {
            audioId: null,
            lastAudioId: null,
            isStop: !1
        },
        dcOrderDetailIndex: -1,
        shopOrderDetailIndex: -1,
        hdOrderDetailIndex: -1,
        hbcDetailIndex: -1,
        walletReach: !1
    }
});