function a(a) {
    c.getBanner(a, "learn");
    var t = a.data.info, e = "/hdh/" + getApp().globalData.acid + "/column/?offset=0&limit=2";
    r.httpRequest(e).then(function(e) {
        wx.stopPullDownRefresh(), t.zhuanlanList = e.results, t.hasNext = !0, t.joinNumStatue = "show", 
        a.setData({
            info: t,
            dybtn: !0,
            requestStatus: !0,
            logoPosBottom: !1
        });
        var n = "/hdh/" + getApp().globalData.acid + "/digitalcontent/?offset=0&limit=3";
        return r.httpRequest(n);
    }).then(function(t) {
        a.state.pageOnShow = !0, a.setData({
            danpinList: t.results,
            buybtn: !0,
            requestStatus: !0,
            hasNext: !0,
            logoPosBottom: !1
        }), wx.hideLoading();
    });
}

function t(a, t) {
    var e = a.data.info, n = "/hdh/" + getApp().globalData.acid + "/column/?offset=" + t + "&limit=" + a.state.limit;
    r.httpRequest(n).then(function(n) {
        wx.stopPullDownRefresh();
        var o = d.dataListHandle(a, n, e.zhuanlanList, t);
        e.zhuanlanList = o.list, e.joinNumStatue = "show", e.hasNext = o.hasNext;
        var i = !1;
        0 === o.list.length && (i = !0), a.setData({
            info: e,
            dybtn: !0,
            requestStatus: !0,
            logoPosBottom: i
        });
    });
}

function e(a, t) {
    var e = "/hdh/" + getApp().globalData.acid + "/digitalcontent/?offset=" + t + "&limit=" + a.state.limit;
    r.httpRequest(e).then(function(e) {
        wx.stopPullDownRefresh();
        var n = d.dataListHandle(a, e, a.data.danpinList, t), o = !1;
        0 === n.list.length && (o = !0), a.setData({
            danpinList: n.list,
            buybtn: !0,
            hasNext: n.hasNext,
            requestStatus: !0,
            logoPosBottom: o
        });
    });
}

function n(a, t, e) {
    var n = a.data.tgDataDetail, o = a.data.convertible;
    if (n.skus) {
        var i = {
            cartsku: [ {
                sku_id: n.skus[0].id,
                count: a.data.isGift ? a.data.giveNum : 1
            } ],
            module: "learn",
            types: a.state.pageName,
            id: a.state.learnId
        };
        a.data.isGift ? i.from = "gift" : i.coupon_id = t, r.httpRequest("/order/price/", i, "POST").then(function(t) {
            var n = a.data.detail, i = t.order.price.discount;
            0 !== t.order.price.total_price || a.data.coupon || (o = !1), e ? a.store({
                convertible: o,
                discount: i,
                detail: n,
                total_money: t.order.price.total_price,
                showPayMethod: !0
            }) : a.store({
                convertible: o,
                discount: i,
                detail: n,
                total_money: t.order.price.total_price
            });
        });
    }
}

function o(a, t) {
    wx.showLoading({
        title: "",
        mask: !0
    });
    var e = a.state.pageName, o = {
        redeem_code: t,
        action: "take",
        product_id: a.data.detail.fee_product_id
    };
    r.httpRequest("/coupon/", o, "POST").then(function(t) {
        wx.hideLoading(), "fail" !== t.result ? ("shop" === e ? a.calculateOrderPrice() : n(a, t.coupon.id), 
        a.store({
            coupon: t.coupon,
            selectedCoupon: t.coupon
        })) : d.showClickModal(t.msg);
    });
}

function i(a, t) {
    var e = t.detail.value, n = a.data.learnSearchMenu, o = a.state.learnSearchMenu1;
    a.state.learnSearchType = o[e], a.setData({
        learndefaultval: n[e]
    });
}

function l(a) {
    var t = a.currentTarget.dataset, e = t.kind, n = t.id, o = "";
    e && ("video" === e ? o = "/pages/zhuanlan/pages/danpinVideoDetail/danpinVideoDetail?danpinId=" + n : "audio" === e && (o = "/pages/zhuanlan/pages/danpinAudeoDetail/danpinAudeoDetail?danpinId=" + n), 
    "article" === e && (o = "/pages/zhuanlan/pages/danpinTuwenDetail/danpinTuwenDetail?danpinId=" + n), 
    "zhuanlan" === e && (o = "/pages/zhuanlan/pages/zhuanlanDetail/zhuanlanDetail?zhuanlanId=" + n), 
    o += "&indexOf=" + t.index, wx.navigateTo({
        url: o
    }));
}

function s(a) {
    var t = "/product/" + a.currentTarget.dataset.productid + "/log/", e = {
        wx_form_id: a.detail.formId,
        action: "view"
    };
    return l(a), r.httpRequest(t, e, "POST").then(function(a) {});
}

function u(a, t) {
    a ? wx.navigateTo({
        url: "/pages/zhuanlan/pages/danpinAudeoDetail/danpinAudeoDetail?danpinId=" + t
    }) : d.showClickModal("当前无播放节目");
}

var d = getApp().globalData.commonFun, r = getApp().globalData.utilFun, c = getApp().globalData.dataTempFun;

module.exports = {
    getData: function(a, n) {
        "zhuanlan" === a.state.dataType ? t(a, n) : "danpin" === a.state.dataType && e(a, n);
    },
    getZhuanlanDetail: function(a, t, e) {
        var n = "/column/" + t + "/";
        r.httpRequest(n).then(function(t) {
            var n = a.data.info;
            n.zhuanlanList[e].update_hint = t.update_hint, n.zhuanlanList[e].subscrib_count = t.subscrib_count, 
            n.zhuanlanList[e].has_subscribed = t.has_subscribed, a.setData({
                info: n
            });
        });
    },
    getDanpinDetail: function(a, t, e) {
        var n = "/digitalcontent/" + t + "/";
        r.httpRequest(n).then(function(t) {
            var n = a.data.danpinList;
            n[e].view_count = t.view_count, n[e].comment_count = t.comment_count, n[e].has_bought = t.has_bought, 
            n[e].like_count = t.like_count, a.setData({
                danpinList: n
            });
        });
    },
    onUseCode: function(a) {
        var t = a.data.useCode;
        t = !t, a.store({
            useCode: t
        });
    },
    changeVal: function(a, t) {
        var e = a.detail.value;
        8 === e.length && o(t, e), t.store({
            codeVal: e
        });
    },
    columnShare: function(a, t) {
        wx.navigateTo({
            url: "/pages/zhuanlan/pages/zhuanlanDetailShare/zhuanlanDetailShare?id=" + t
        });
    },
    calculatePrice: n,
    zhuanlanIndex: function(t) {
        d.configData("learn", function() {
            d.commonFun(t);
            var e = d.getStorage("config").learn;
            e.module ? a(t) : d.showClickModal(e.msg);
        });
    },
    learnIndex: function(a, n) {
        d.configData("learn", function() {
            var o = d.getStorage("config").learn;
            o.module ? "zhuanlan" === n ? t(a, 0) : "danpin" === n && e(a, 0) : d.showClickModal(o.msg);
        });
    },
    zlList: t,
    dplist: e,
    learnChangeEvent: function(a, t) {
        var e = t.currentTarget.dataset;
        if ("searchBtn" === e.types) {
            var n = [ {
                name: "search",
                data: {
                    placeholder: "搜索",
                    type: a.state.learnSearchType
                }
            } ];
            d.setStorage("layout", n), wx.navigateTo({
                url: "/pages/common/pages/search/search"
            });
        } else if ("pickerChange" === e.types) i(a, t); else if ("getFormId" === e.types) s(t); else if ("colSearchBtn" === e.types) {
            var o = [ {
                name: "search",
                data: {
                    placeholder: "搜索",
                    type: "col"
                }
            } ];
            d.setStorage("layout", o), wx.navigateTo({
                url: "/pages/common/pages/search/search"
            });
        } else if ("digSearchBtn" === e.types) {
            var l = [ {
                name: "search",
                data: {
                    placeholder: "搜索",
                    type: "digitalcontent"
                }
            } ];
            d.setStorage("layout", l), wx.navigateTo({
                url: "/pages/common/pages/search/search"
            });
        } else "toAudeoDetail" === e.types && u(a.data.audeo_play_status, getApp().globalData.audioData.audioId);
    },
    openDanpinDetail: l
};