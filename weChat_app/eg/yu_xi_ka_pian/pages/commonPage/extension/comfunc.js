function a(a) {
    var t = "/sales/card/?acid=" + getApp().globalData.acid + "&product_id=" + a.state.productId;
    e.httpRequest(t).then(function(t) {
        a.setData({
            haiBaoList: t
        }), wx.hideLoading();
    });
}

var t = getApp().globalData.commonFun, e = getApp().globalData.utilFun, i = require("../../../wxParse/wxParse.js"), n = require("../../commonPage/zhuanlan/temp.js");

module.exports = {
    getInvite: a,
    productList: function(a, i) {
        var n = "/sales/product/?acid=" + getApp().globalData.acid + "&order=recent&offset=" + a + "&limit=" + i.state.limit;
        e.httpRequest(n).then(function(e) {
            var n = t.dataListHandle(i, e, i.data.tgDataList, a);
            i.store({
                tgDataList: n.list,
                requestStatus: !0,
                hasNext: n.hasNext
            });
        });
    },
    tgShare: function(a) {
        var t = a.state.mainLink.split("_"), e = a.data.myInfo.id, i = "";
        switch (t[0]) {
          case "hd":
            i = "/pages/activity/pages/activityDetail/activityDetail?isODOpen=0&id=" + t[1] + "&uid=" + e;
            break;

          case "col":
            i = "/pages/zhuanlan/pages/zhuanlanDetail/zhuanlanDetail?zhuanlanId=" + t[1] + "&uid=" + e;
            break;

          case "tw":
            i = "/pages/zhuanlan/pages/danpinTuwenDetail/danpinTuwenDetail?danpinId=" + t[1] + "&uid=" + e;
            break;

          case "sp":
            i = "/pages/zhuanlan/pages/danpinVideoDetail/danpinVideoDetail?danpinId=" + t[1] + "&uid=" + e;
            break;

          case "yp":
            i = "/pages/zhuanlan/pages/danpinAudeoDetail/danpinAudeoDetail?danpinId=" + t[1] + "&uid=" + e;
            break;

          case "shop":
            i = "/pages/mall/pages/shopDetail/shopDetail?&productId=" + t[1] + "&uid=" + e;
        }
        return i;
    },
    tkHide: function(a) {
        var t = a.data.tgCenter;
        t.fangShi = "hide", a.store({
            tgCenter: t,
            isScroll: !0
        });
    },
    tuiguangInfo: function(a, t) {
        var n = "/sales/?acid=" + getApp().globalData.acid;
        e.httpRequest(n).then(function(e) {
            a.setData({
                selasInfo: e,
                btnShow: !0,
                requestStatus: !0
            }), "extension" === t && wx.pro.fromSync(function(t) {
                if (e.drp.info) {
                    var n = i.wxParse("article", "html", e.drp.info, a, 5);
                    a.setData(n);
                }
            }), wx.hideLoading();
        });
    },
    fangShishow: function(t) {
        var e = t.data.tgCenter;
        e.fangShi = "show", t.store({
            tgCenter: e,
            isScroll: !1
        }), a(t);
    },
    getProductDetial: function(a, t, i) {
        var s = "/product/" + t + "/";
        e.httpRequest(s).then(function(t) {
            a.store({
                tgDataDetail: t
            }), t.has_bought || n.calculatePrice(a, 0, i), wx.hideLoading();
        });
    }
};