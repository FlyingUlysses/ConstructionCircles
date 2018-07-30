function t(t) {
    wx.showLoading({
        title: "",
        mask: !0
    });
    var e = this, a = {
        coupon_type_id: t.currentTarget.dataset.id,
        action: "take"
    };
    T.httpRequest("/coupon/", a, "POST").then(function(t) {
        wx.hideLoading(), "success" === t.result ? x.showClickModal("领取成功") : x.showClickModal(t.msg), 
        e.data.info.temp.forEach(function(t) {
            if ("shopCoupon" === t.name) {
                var a = "/hdh/" + getApp().globalData.acid + "/coupon/?type_ids=" + t.data.ids;
                T.httpRequest(a).then(function(a) {
                    t.data.list = a.results;
                    var n = e.data.info;
                    n.temp = e.data.info.temp, e.store({
                        info: n
                    });
                });
            }
        });
    });
}

function e(t) {
    k.albumChangeEvent(this, t);
}

function a(t) {
    k.aboutChangeEvent(this, t);
}

function n(t) {
    k.BingUserInfo(this, t);
}

function o(t) {
    k.navOnTapTag(this, t);
}

function i(t) {
    k.newsChangeEvent(this, t);
}

function s(t) {
    var e = t.detail.value;
    x.isNull(e) && this.store({
        iconStatus: !0
    });
}

function r() {
    this.store({
        iconStatus: !1
    });
}

function u() {
    x.isscrollToPage(this);
}

function c(t) {
    x.goTopEvent(this, t.detail.scrollTop);
}

function d(t) {
    x.marquee(this, t);
}

function h(t) {
    var e = this.state.layoutForm, a = t.detail.value;
    a.wx_form_id = t.detail.formId;
    var n = this;
    S.submitForm(e, a, function(t) {
        S.reportFuc(t, n.state.page_id);
    });
}

function l(t) {
    var e = t.currentTarget.dataset;
    e.types = "openWindow", x.openUrl(e, this);
}

function f(t) {
    var e = t.currentTarget.dataset.imgurl, a = this.data.info.list[t.currentTarget.dataset.index].attachments;
    x.seeBigImg(2, e, a);
}

function m(t) {
    var e = this.data.kouling, a = t.detail.value, n = /^[\u4E00-\u9FA5]{1,20}$/.test(a);
    x.isNull(a) ? e = "" : n && (e = a), this.store({
        kouling: e
    });
}

function g(t) {
    var e = t.currentTarget.dataset.index;
    x.phoneCall(e);
}

function p(t) {
    k.myEventChange(this, t);
}

function w(t, e, a) {
    var n = wx.getSystemInfoSync().windowWidth;
    return t.then(function(t) {
        return wx.pro.fromSync(function(t) {
            n && Number(n) > 0 && ("slideimgs" === a ? (e.list.forEach(function(t, a) {
                e.list[a].width && (e.list[a].width1 = e.list[a].width * (Number(n) / 320));
            }), e.height && (e.height1 = e.height * (Number(n) / 320))) : "but" === a && (e.height && (e.height1 = e.height * (Number(n) / 320)), 
            e.width && (e.width1 = e.width * (Number(n) / 320))));
        });
    });
}

function v(t, e) {
    var a = wx.getSystemInfoSync().windowWidth;
    return t.then(function(t) {
        return wx.pro.fromSync(function(t) {
            a && Number(a) > 0 && (e.height1 = e.height * (Number(a) / 320));
        });
    });
}

function b(t, e, a, n, o) {
    e.data.hasOwnProperty("display") || (e.data.display = "show");
    var i = "", s = o.state.hasLoadCart;
    switch (e.name) {
      case "community":
        o.store({
            joinNumStatue: e.data.join
        });
        break;

      case "activeslist":
      case "actives":
        e.data.list.forEach(function(e, n) {
            t[a].data.list[n].clamp2 = !0, e.config.showTime && e.location.desc && (t[a].data.list[n].clamp2 = !1), 
            t[a].data.list[n].pricePos = "right", e.config.showTime || e.location.desc || (t[a].data.list[n].pricePos = "left");
        });
        break;

      case "learn":
      case "learndp":
        o.store({
            dybtn: !0,
            buybtn: !0
        });
        break;

      case "fwb":
        i = C.wxParse("article", "html", e.data.con, o, 5), o.store(i);
        break;

      case "marquee":
        o.store({
            marquee: e.data
        }), o.runGonggao(e.data.con);
        break;

      case "form":
        t[a].data.focusInputs = [ !1, !1, !1, !1 ], t[a].data.myInfo = x.getStorage("userInfo"), 
        o.state.layoutArrIndex = a, o.state.layoutForm = e.data;
        break;

      case "video":
        o.state.videos = wx.createVideoContext("myVideo");
        break;

      case "shoplist":
      case "shop":
      case "shopGroup":
        s || (o.state.hasLoadCart = !0, E.getCartNum(o));
        break;

      case "shopSeck":
        s || (o.state.hasLoadCart = !0, E.getCartNum(o)), S.getCountDown(e.data.list, o);
        break;

      case "imgs":
      case "window":
      case "slider":
      case "slidenav":
        n = v(n, e.data);
        break;

      case "slideimgs":
      case "but":
        n = w(n, e.data, e.name);
    }
}

function y(t, e) {
    var a = wx.pro.fromSync(function() {});
    t.forEach(function(n, o) {
        b(t, n, o, a, e);
    });
    var n = e.data.info;
    a.then(function(a) {
        wx.hideLoading(), n.temp = t, n.joinNumStatue = "show", e.store({
            info: n,
            logoPosBottom: !1
        });
    }).catch(function(t) {
        console.log(t);
    });
}

var x = getApp().globalData.commonFun, k = getApp().globalData.dataTempFun, T = getApp().globalData.utilFun, C = require("../../wxParse/wxParse.js"), S = require("../userDefined/temp/userDefined.js"), E = require("../commonPage/mall/shopListTemp.js");

module.exports = {
    getUserDefined: function(t) {
        S.getLayout(t, t.state.page_id, function(e) {
            wx.stopPullDownRefresh();
            var a = t.data.info, n = wx.pro.fromSync(function() {}), o = [];
            (o = e.length > 5 ? e.slice(0, 5) : e).forEach(function(e, a) {
                b(o, e, a, n, t);
            }), n.then(function(n) {
                wx.hideLoading(), a.temp = o, a.joinNumStatue = "show", t.store({
                    info: a
                }), y(e, t);
            }).catch(function(t) {
                console.log(t);
            });
        });
    },
    pageLoad: function(w) {
        w.aboutEvent = a, w.albumEvent = e, w.receiveCoupon = t, w.userInfoHandler = n, 
        w.onTapTag = o, w.newsEvent = i, w.newsBlurInput = s, w.hideIcon = r, w.onBackTop = u, 
        w.bindscrollTop = c, w.runGonggao = d, w.formSubmit = h, w.openWindow = l, w.seeBigImg = f, 
        w.enterInput = m, w.housemakePhoneCall = g, w.myEvent = p;
    }
};