function a(a, e) {
    var o = a.data.tgDataDetail, s = a.data.convertible;
    if (o.skus) {
        var r = {
            cartsku: [ {
                sku_id: o.skus[0].id,
                count: a.data.isGift ? a.data.giveNum : 1,
                normal_product: !0,
                isMemberProduct: a.data.detail.isMemberLearn
            } ],
            module: "learn",
            types: a.state.pageName,
            id: a.state.learnId
        };
        a.data.isGift ? r.from = "gift" : r.coupon_id = e, t.httpRequest("/order/price/", r, "POST").then(function(t) {
            var e = a.data.detail, o = t.order.price.discount;
            0 !== t.order.price.total_price || a.data.coupon || (s = !1), a.setData({
                convertible: s,
                discount: o,
                detail: e,
                total_money: t.order.price.total_price
            });
        });
    }
}

var t = require("util.js"), e = require("common.js");

module.exports = {
    passwordDelete: function(a) {
        var t = a.data.passwordLength, e = a.data.showPassword, o = a.data.passwords;
        t > 0 && (t -= 1, e[t] = "", o = o.substr(0, t), a.setData({
            showPassword: e,
            passwords: o,
            passwordLength: t
        }));
    },
    passwordClear: function(a) {
        a.setData({
            passwords: "",
            showPassword: [ "", "", "", "", "", "" ],
            passwordLength: 0
        });
    },
    chooseType: function(a, t) {
        var o = a.currentTarget.dataset, s = Number(o.index), r = t.data.payMethod, d = t.data.cash_balance, i = t.data.total_money;
        if ("success" !== r[s]) {
            if (1 === s && Number(d) < Number(i)) return void e.showClickModal("账户余额不足");
            if (!t.data.isSetPayPassword) return wx.hideLoading(), void wx.showModal({
                title: "提示",
                content: "请先设置支付密码",
                success: function(a) {
                    if (a.confirm) {
                        var e = t.data.tankuang;
                        e[2] = "show", t.setData({
                            tankuang: e
                        });
                    }
                }
            });
            r.forEach(function(a, t) {
                r[t] = "circle";
            }), r[s] = "success", t.setData({
                payMethod: r,
                payId: s
            });
        }
    },
    getCoupon: function(o, s) {
        wx.showLoading({
            title: "",
            mask: !0
        });
        var r = o.state.pageName, d = {
            redeem_code: s,
            action: "take",
            product_id: o.data.detail.fee_product_id
        };
        t.httpRequest("/coupon/", d, "POST").then(function(t) {
            wx.hideLoading(), "fail" !== t.result ? ("shop" === r ? o.calculateOrderPrice() : a(o, t.coupon.id), 
            o.setData({
                coupon: t.coupon,
                selectedCoupon: t.coupon
            })) : e.showClickModal(t.msg);
        });
    }
};