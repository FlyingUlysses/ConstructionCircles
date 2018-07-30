function t(t) {
    wx.setNavigationBarColor && wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#ff4b4b"
    }), wx.hideLoading(), n.commonFun(t);
}

function e(e) {
    n.getAccessToken() ? t(e) : getApp().globalData.tokenUpdated = function() {
        console.log("update success"), t(e);
    };
}

function a(t, e) {
    wx.setNavigationBarColor && wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#ff4b4b"
    });
    var a = "", o = t.data.current, s = "/hongbaopool/?offset=" + e + "&limit=" + t.state.limit + "&acid=" + getApp().globalData.acid;
    2 === Number(o) && (a = "normal", s += "&status=" + a), 3 === Number(o) && (a = "finish", 
    s += "&status=" + a), i.httpRequest(s).then(function(a) {
        var o = n.dataListHandle(t, a, t.data.list, e);
        t.setData({
            list: o.list,
            requestStatus: !0,
            logoPosBottom: !0
        });
    });
}

function o(t, e) {
    wx.hideLoading(), wx.showModal({
        title: "提示",
        content: e,
        showCancel: !1,
        success: function(e) {
            t.state.options && t.state.options.hasOwnProperty("id") ? wx.redirectTo({
                url: "/pages/commandHb/pages/publishSuccess/publishSuccess?id=" + t.state.hongbaopoolId
            }) : wx.navigateTo({
                url: "/pages/commandHb/pages/publishSuccess/publishSuccess?id=" + t.state.hongbaopoolId
            }), t.setData({
                kouling: "",
                money: "",
                geshu: "",
                isShareHb: 0,
                switchStatus: !1,
                hbq: "hide",
                hbSet: !1,
                content: "",
                upImg: "",
                payPrice: 0
            }), n.commonFun(t);
        }
    });
}

function s(t, e) {
    var a = this, s = e.detail.value.money, r = e.detail.value.number, u = e.detail.value.kouling, d = e.detail.value.ggContent;
    if (n.isNull(u)) n.showTimeToast("请输入口令"); else if (n.isNull(s)) n.showTimeToast("请输入赏金"); else if (n.isNull(r)) n.showTimeToast("请输入数量"); else if (/^[0-9]+$/.test(r) && 0 !== Number(r)) {
        wx.showLoading({
            title: "请求中...",
            mask: !0
        });
        var c = !1, b = n.getStorage("config").hongbao.isFixed;
        0 === Number(b) || 0 === Number(t.data.ishbSet) ? c = !0 : 1 === Number(b) && 1 === Number(t.data.ishbSet) && (c = !1);
        var g = !1;
        1 === Number(t.data.isShareHb) && (g = !0);
        var p = {
            wx_form_id: e.detail.formId,
            take_method: "pass",
            total_hongbao: Number(s),
            total_count: Number(r),
            is_random: c,
            is_public: g,
            pass: {
                pass: u,
                text: d,
                attachments: t.state.upImg
            }
        }, h = t.state.options;
        h && h.hasOwnProperty("id") && (p.related_obj_id = Number(h.id), p.related_obj_type = h.name), 
        i.httpRequest("/hongbaopool/", p, "POST").then(function(s) {
            if (wx.hideLoading(), "success" === s.result) if (t.state.orderId = s.hongbaopool.shop_order_id, 
            t.state.hongbaopoolId = s.hongbaopool.id, "normal" === s.hongbaopool.status) o(t, "支付成功"); else {
                var i = "/order/" + s.hongbaopool.shop_order_id + "/payment/", r = {
                    wx_form_id: e.detail.formId,
                    method: "pay",
                    platform: "weixin"
                };
                l.payment(a, i, r, function(e, a) {
                    "success" === e ? o(t, "支付成功") : n.showClickModal(a);
                });
            } else n.showClickModal(s.msg);
        });
    } else n.showClickModal("请输入正确的数量");
}

var n = getApp().globalData.commonFun, i = getApp().globalData.utilFun, l = getApp().globalData.payTemp;

module.exports = {
    navColor: function(t, o) {
        n.configData("hongbao", function() {
            "klhb" === o ? e(t) : a(t, 0);
        });
    },
    navCon: t,
    klhbEvent: function(t, e) {
        var a = e.currentTarget.dataset;
        if ("shareHb" === a.types) 0 === Number(a.index) ? a.index = 1 : a.index = 0, t.store({
            isShareHb: a.index
        }); else if ("hbSet" === a.types) 0 === Number(a.index) ? a.index = 1 : a.index = 0, 
        t.store({
            ishbSet: a.index
        }); else if ("submit" === a.types) s(t, e); else if ("money" === a.types) {
            var o = Number(e.detail.value);
            t.setData({
                payPrice: o,
                total_money: o
            });
        } else "uploadgg" === a.types && n.uploadImg("hongbao", 1, function(e, a) {
            var o = [ {
                oss_object: JSON.parse(e[0].data).url
            } ];
            t.state.upImg = o, t.setData({
                ggImg: a
            });
        });
    },
    hongBaoTishi: o,
    areaEvent: function(t, e) {
        var o = e.currentTarget.dataset;
        if ("nav" === o.types) {
            if (Number(t.data.current) === Number(o.current)) return;
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), t.setData({
                list: [],
                requestStatus: !1,
                current: o.current
            }), t.state.offset = 0, a(t, 0);
        } else "lingqu" === o.types && (getApp().globalData.hbcDetailIndex = o.index, wx.navigateTo({
            url: "/pages/commandHb/pages/receiveHb/receiveHb?id=" + o.id
        }));
    },
    areaData: a,
    getDetails: function(t) {
        var e = t.data.list, a = getApp().globalData.hbcDetailIndex, o = "/hongbaopool/" + e[a].id + "/";
        i.httpRequest(o).then(function(o) {
            1 !== Number(t.data.current) && e[a].status !== o.status ? e.splice(a, 1) : (e[a].sent_count = o.sent_count, 
            e[a].total_count = o.total_count, e[a].status = o.status, e[a].sheng = Number(o.total_count) - Number(o.sent_count)), 
            t.store({
                list: e
            }), getApp().globalData.hbcDetailIndex = -1;
        });
    }
};