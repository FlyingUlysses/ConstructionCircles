function a(a, e) {
    var t = "/restaurant/?group_id=0&offset=" + e + "&limit=5", n = a.data.scanCodeDiancan;
    return l.httpRequest(t).then(function(t) {
        var i = c.dataListHandle(a, t, n.list, e);
        n.list = i.list, a.setData({
            scanCodeDiancan: n,
            requestStatus: !0,
            peise: getApp().globalData.peise
        });
    });
}

function e(a) {
    var e = c.getStorage("hdhInfo"), t = a.data.scanCodeDiancan;
    t.shopInfo = e, a.store({
        scanCodeDiancan: t
    });
}

function t(a, e) {
    var t = "/hdh/" + getApp().globalData.acid + "/config/?key=restaurant", n = c.getStorage("config");
    l.httpRequest(t).then(function(t) {
        if (t.restaurant) {
            if (!t.restaurant.hasOwnProperty("busTime")) {
                var i = {
                    working: !1
                };
                t.restaurant.busTime = i;
            }
            if (!t.restaurant.hasOwnProperty("takeaway")) {
                var s = {
                    working: !1
                };
                t.restaurant.takeaway = s;
            }
            var o = t.restaurant;
            if (a.state.options) {
                var r = a.data.isWorking;
                r = "wm" === a.state.options.enterWay ? o.takeaway.working : o.busTime.working, 
                a.store({
                    isWorking: r,
                    restaurant: o,
                    underlinePay: t.ui.underlinePay
                });
            } else a.store({
                restaurant: o
            });
            n.underlinePay = t.ui.underlinePay, n.restaurant = t.restaurant, c.setStorage("config", n), 
            e();
        } else c.showClickModal(t.msg);
    });
}

function n() {
    wx.scanCode({
        onlyFromCamera: !0,
        success: function(a) {
            if (console.log(a), a.hasOwnProperty("path")) {
                var e = a.path;
                if (e) {
                    var t = e.split("?")[1].split("=")[1].split("_");
                    "dc" === t[0] ? wx.navigateTo({
                        url: "/pages/dianCan/pages/saomaDiancan/saomaDiancan?enterWay=dc&id=" + t[1]
                    }) : c.showClickModal("无效的小程序码！");
                }
            } else c.showClickModal("无效的小程序码！");
        }
    });
}

function i(a, e) {
    var t = a.data.restaurant, n = a.data.scanCodeDiancan;
    1 === Number(t.takeaway.open) ? (t.takeaway.working && t.busTime.working ? wx.navigateTo({
        url: "/pages/dianCan/pages/saomaDiancan/saomaDiancan?enterWay=wm&detail_id=" + e.detail_id + "&group_id=" + e.group_id
    }) : t.busTime.working ? c.showClickModal("当前不在配送时间段！") : c.showClickModal("餐厅已打烊！"), 
    n.alter[0] = "hide", a.store({
        scanCodeDiancan: n
    })) : c.showClickModal("本店暂不支持外卖！");
}

function s() {
    c.showClickModal("该功能暂未开放！");
}

function o(a, e) {
    var t = e.index, n = a.data.scanCodeDiancan;
    n.alter[0] = "show", n.detail = n.list[t], a.store({
        scanCodeDiancan: n
    });
}

function r(a) {
    var e = a.data.scanCodeDiancan;
    e.alter[0] = "hide", a.store({
        scanCodeDiancan: e
    });
}

var c = getApp().globalData.commonFun, l = getApp().globalData.utilFun;

module.exports = {
    diancanShow: function(n) {
        t(n, function(t) {
            c.getAccessToken() ? (e(n), a(n, 0)) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), e(n), a(n, 0);
            };
        });
    },
    dianCanEvent: function(a, e) {
        if (c.getStorage("config").restaurant) {
            var t = e.currentTarget.dataset;
            if ("location" === t.types) {
                var l = a.data.scanCodeDiancan.shopInfo.location;
                c.openMap(l.lat, l.lng);
            } else if ("saoma" === t.types) n(); else if ("waimai" === t.types) i(a, t); else if ("maidan" === t.types) s(); else if ("call" === t.types) c.phoneCall(a.data.scanCodeDiancan.shopInfo.customer_service.tel); else if ("detail" === t.types) o(a, t); else if ("close" === t.types) r(a); else if ("bigImg" === t.types) {
                var d = e.currentTarget.dataset.url, u = a.data.scanCodeDiancan.detail.attachments;
                u.length > 1 ? c.seeBigImg(2, d, u) : c.seeBigImg(1, d, "");
            }
        } else c.showClickModal("应用已过期！");
    },
    getData: a,
    seeDetail: o,
    closealter: r,
    getConfigInfo: t,
    getHdhInfo: e
};