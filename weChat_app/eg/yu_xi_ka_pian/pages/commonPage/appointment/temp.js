function e(e) {
    t.httpRequest("/api/ServerToClient/getCate", {}, "GET", "v2").then(function(t) {
        var a = {
            con: t.ShopNotices,
            size: "12px"
        }, n = {
            title: t.ShopNotices
        };
        e.setData({
            list: t.data,
            marquee: a,
            gonggao: n
        }), t.ShopNotices ? e.runGonggao(t.ShopNotices) : clearTimeout(e.state.gonggao_timer), 
        e.state.pageOnShow = !0, wx.hideLoading();
    });
}

var t = getApp().globalData.utilFun, a = (getApp().globalData.commonFun, getApp().globalData.dataTempFun);

module.exports = {
    indexData: function(t) {
        a.getBanner(t, "easyYuyue"), e(t);
    },
    yuyueChangeEvent: function(e, t) {
        var a = t.currentTarget.dataset;
        if ("detail" === a.types) {
            var n = e.data.list[a.index].id;
            wx.navigateTo({
                url: "/pages/appointment/pages/Reservation/Reservation?imd=" + n
            });
        }
    },
    deleteOrder: function(e, a) {
        wx.showModal({
            title: "提示",
            content: "确定要删除吗？",
            success: function(n) {
                if (n.confirm) {
                    wx.showLoading({
                        title: "",
                        mask: !0
                    });
                    var o = "/api/ServerToClient/deleteOrder?id=" + e;
                    t.httpRequest(o, {}, "GET", "v2").then(function(e) {
                        wx.hideLoading(), a(e);
                    });
                }
            }
        });
    },
    orderRefund: function(e, a, n) {
        wx.showModal({
            title: "提示",
            content: "确定要申请退款吗？",
            success: function(o) {
                if (o.confirm) {
                    wx.showLoading({
                        title: "",
                        mask: !0
                    });
                    var i = {
                        id: e,
                        remark: a
                    };
                    t.httpRequest("/api/ServerToClient/applyRefund", i, "POST", "v2").then(function(e) {
                        wx.hideLoading(), n(e);
                    });
                }
            }
        });
    }
};