function e(e, a, t) {
    var s = a.data.payId, n = a.data.coupon, o = "weixin";
    1 === Number(s) ? o = "wallet" : wx.showLoading({
        title: "支付中...",
        mask: !0
    }), a.setData({
        showPayMethod: !1,
        useCode: !1,
        total_money: a.data.total_money
    }), n ? a.callPayment(a, o, t, n.id) : a.callPayment(a, o, t, 0);
}

function a(a, t) {
    var s = a.detail.formId;
    t.state.formId = a.detail.formId, !a.detail.value.code || t.data.coupon ? e(a, t, s) : o.getCoupon(t, a.detail.value.code, s);
}

function t(e, a) {
    var t = e.data.passwordLength, s = e.data.showPassword, n = e.data.passwords;
    t < 6 && (s[t] = "*", n += a.target.dataset.number, t += 1, e.setData({
        showPassword: s,
        passwords: n,
        passwordLength: t
    }), 6 === t && e.walletPay(e));
}

var s = require("util.js"), n = require("common.js"), o = require("payEvent.js");

module.exports = {
    payChangeEvent: function(e, s) {
        var n = s.currentTarget.dataset;
        if ("chooseType" === n.types) o.chooseType(s, e); else if ("closePayTypeTk" === n.types) {
            var r = e.data.detail;
            e.state.giveFriends ? (e.setData({
                showPayMethod: !1,
                isGift: !1,
                total_money: r.fee
            }), e.state.giveFriends = !1) : e.setData({
                showPayMethod: !1
            });
        } else "closeBaoMing" === n.types ? ("mall" === s.pageName ? e.tiaoZhuan() : "diancan" === s.pageName ? wx.redirectTo({
            url: "/pages/dianCan/pages/myTakeout/myTakeout"
        }) : "baoming" === s.pageName && e.tiaoZhuan(), e.setData({
            payTk: "hide"
        }), o.passwordClear(e)) : "boardClose" === n.types ? (e.setData({
            Board: "hide"
        }), o.passwordClear(e)) : "boradShow" === n.types ? e.setData({
            Board: "show"
        }) : "delNumber" === n.types ? o.passwordDelete(e) : "numberClick" === n.types ? t(e, s) : "payMethedSure" === n.types && a(s, e);
    },
    wxPayEvent: function(e, a, t, o) {
        s.httpRequest(e, a, "POST", t).then(function(e) {
            if (wx.hideLoading(), "success" === e.result) {
                if ("finish" === e.type) o("success", e.msg ? e.msg : "支付成功"); else if ("waitpay" === e.type) {
                    var a = e.data.result;
                    wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: a.signType,
                        paySign: a.paySign,
                        success: function(e) {
                            o("success", "支付成功");
                        },
                        fail: function(e) {
                            console.log(JSON.stringify(e));
                            var a = "";
                            a = e.hasOwnProperty("errMsg") ? "requestPayment:fail cancel" === e.errMsg ? "取消支付" : e.errMsg : "支付失败", 
                            o("fali", a);
                        }
                    });
                }
            } else {
                var t = e.err_code;
                10303 === Number(t) || 40001 === Number(t) || 10004 === Number(t) ? n.showClickModal(e.msg) : o("fali", e.msg);
            }
        });
    },
    payRequest: function(e, a) {
        wx.showLoading({
            title: "支付中...",
            mask: !0
        });
        var t = {
            type: "pay",
            payment_id: e.data.paymentId,
            paypass: e.data.passwords,
            wx_form_id: e.state.formId
        };
        s.httpRequest("/wallet/transaction/", t, "POST").then(function(t) {
            e.setData({
                payTk: "hide"
            }), o.passwordClear(e), wx.hideLoading(), a(t);
        });
    },
    payment: function(e, a, t, n) {
        s.httpRequest(a, t, "POST").then(function(a) {
            "fail" !== a.result ? (Number(a.payment.amount) > 0 ? "wallet" === t.platform ? e.setData({
                paymentId: a.payment.id,
                payTk: "show",
                Board: "show"
            }) : "weixin" === t.platform && wx.requestPayment({
                timeStamp: a.payment.weixin.timeStamp,
                nonceStr: a.payment.weixin.nonceStr,
                package: a.payment.weixin.package,
                signType: a.payment.weixin.signType,
                paySign: a.payment.weixin.paySign,
                success: function(e) {
                    var o = {
                        method: "refresh"
                    }, r = 0;
                    a.payment.hasOwnProperty("orderId") && (r = a.payment.orderId), a.payment.hasOwnProperty("id") && (r = a.payment.id);
                    var i = "/order/" + r + "/payment/";
                    t.hasOwnProperty("typeName") && "activity" === t.typeName && (i = "/enroll/" + r + "/payment/"), 
                    s.httpRequest(i, o, "POST"), n("success", "支付成功");
                },
                fail: function(e) {
                    console.log(JSON.stringify(e));
                    var a = "";
                    a = e.hasOwnProperty("errMsg") ? "requestPayment:fail cancel" === e.errMsg ? "取消支付" : e.errMsg : "支付失败", 
                    n("fali", a);
                }
            }) : n("success", a.msg), wx.hideLoading()) : n("fali", a.msg);
        }).catch(function(e) {
            n("fali", e.errMsg);
        });
    }
};