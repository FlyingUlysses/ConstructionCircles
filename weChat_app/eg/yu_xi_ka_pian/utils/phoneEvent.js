function a(a, e) {
    3 === Number(e) && a.setData({
        bindPhone1: "",
        bindCode1: "",
        bindPhone2: "",
        bindCode2: ""
    }), 2 === Number(e) && a.setData({
        passPhone: "",
        passCode: "",
        pass1: "",
        pass2: ""
    });
    var t = a.data.tankuang;
    t[e] = "hide", a.setData({
        tankuang: t
    });
}

function e(a) {
    var e = a.data.tankuang;
    wx.showModal({
        title: "提示",
        content: "绑定成功！",
        showCancel: !1,
        success: function() {
            e[3] = "hide", a.setData({
                CountdownVal: a.data.CountdownVal,
                CountdownTime: a.data.CountdownTime,
                onClick: a.data.onClick,
                clearTimeout: !1,
                tankuang: e
            });
        }
    });
}

function t(a, t, n) {
    if ("setPageVal" === t.pageName) a.setData({
        numberValue: n.phone
    }); else if ("baoming" === t.pageName) {
        var o = a.data.lists, i = a.state.inputVal, s = t.currentTarget.dataset.index;
        o[s].value = n.phone, i[s].value = n.phone, a.state.inputVal = i, a.setData({
            lists: o
        });
    } else "zhuanlan" === t.pageName ? (t.types = "payMethedSure", a.setData({
        bindPhone: !0
    }), a.buyZhuanlan(t)) : "edit" === t.pageName ? a.shuaxin() : "sameCity" === t.pageName ? a.setData({
        bindPhone: !0,
        tel: n.phone
    }) : "point" === t.pageName || "extension" === t.pageName ? (a.setData({
        myInfo: n
    }), e(a)) : "market" === t.pageName && e(a);
}

function n(a, e) {
    var n = a.data.tankuang;
    if ("getPhoneNumber:ok" !== e.detail.errMsg) return n[3] = "show", void a.setData({
        tankuang: n
    });
    var o = {
        wx_encrypted: {
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv
        }
    };
    u.httpRequest("/user/me/", o, "POST").then(function(a) {
        return c.getPersonInfo();
    }).then(function(o) {
        o.phone ? (c.setStorage("userInfo", o), t(a, e, o)) : (n[3] = "show", a.setData({
            tankuang: n
        }));
    }).catch(function(e) {
        403 === e.statusCode && (c.getToken(), n[3] = "show", a.setData({
            tankuang: n
        }));
    });
}

function o(a, t, n) {
    "zhuanlan" === t.pageName && "point" === t.pageName && "extension" === t.pageName || c.showClickModal("绑定成功");
    var o = a.data.tankuang;
    if (o[3] = "hide", a.data.CountdownVal[2] = "发送验证码", a.data.CountdownTime[2] = 60, 
    a.data.onClick[2] = !0, "setPageVal" === t.pageName) a.setData({
        numberValue: n
    }); else if ("baoming" === t.pageName) {
        var i = a.data.lists, s = a.state.inputVal;
        i[a.state.phoneInputsId].value = n, s[a.state.phoneInputsId].value = n, a.state.inputVal = s, 
        a.setData({
            lists: i
        });
    } else "zhuanlan" === t.pageName ? (t.types = "payMethedSure", a.setData({
        bindPhone: !0,
        tankuang: o
    }), a.buyZhuanlan(t)) : "market" === t.pageName && e(a);
    c.getWallet(a), a.setData({
        CountdownVal: a.data.CountdownVal,
        CountdownTime: a.data.CountdownTime,
        onClick: a.data.onClick,
        clearTimeout: !1,
        tankuang: o
    });
}

function i(a, e) {
    var t = e.detail.value.phone, n = e.detail.value.code, i = "", s = "";
    if ("edit" === e.pageName && a.data.bindPhone && (i = e.detail.value.oldphone, s = e.detail.value.oldcode, 
    c.isNull(i))) c.showTimeToast("请输入旧手机号"); else if (c.isNull(t)) c.showTimeToast("请输入手机号"); else if (c.isNull(n) && !a.state.notNeedCode) c.showTimeToast("请输入验证码"); else {
        var d = {};
        d = "edit" === e.pageName && a.data.bindPhone ? {
            original: {
                phone: i,
                captcha: s
            },
            updated: {
                phone: t,
                captcha: n
            },
            scenario: "rebind_phone"
        } : {
            original: {},
            updated: {
                phone: t,
                captcha: n
            },
            scenario: "rebind_phone"
        }, wx.showLoading({
            title: "绑定中...",
            mask: !0
        }), u.httpRequest("/account/", d, "POST").then(function(n) {
            if (wx.hideLoading(), "success" === n.result) {
                c.getPersonInfo();
                var i = a.data.myInfo;
                i.phone = t, c.setStorage("userInfo", i), o(a, e, t);
            } else c.showClickModal(n.msg);
        });
    }
}

function s(a, e) {
    var t = setTimeout(function() {
        if (a.data.clearTimeout) {
            var n = a.data.CountdownTime, o = a.data.CountdownVal, i = a.data.onClick;
            0 === n[e] ? (o[e] = "发送验证码", n[e] = 60, i[e] = !0, clearTimeout(t)) : (o[e] = "重新发送(" + a.data.CountdownTime[e] + ")", 
            n[e] -= 1, s(a, e)), a.setData({
                CountdownVal: a.data.CountdownVal,
                CountdownTime: a.data.CountdownTime,
                onClick: a.data.onClick
            });
        } else clearTimeout(t);
    }, 1e3);
}

function d(a, e) {
    var t = e.currentTarget.dataset.index, n = "";
    if (n = 3 === Number(t) ? a.data.oldphone : a.data.phone, c.isNull(n)) c.showTimeToast("请输入手机号"); else {
        if (!a.data.onClick[t]) return;
        a.data.onClick[t] = !1, a.setData({
            onClick: a.data.onClick
        }), wx.showLoading({
            title: "发送中...",
            mask: !0
        }), wx.pro.request({
            url: "/account/captcha/",
            data: {
                phone: n,
                acid: getApp().globalData.acid
            },
            method: "POST"
        }).then(function(e) {
            if (wx.hideLoading(), "success" === e.result) c.showClickModal("发送成功"), s(a, t); else {
                c.showClickModal(e.msg);
                var n = a.data.onClick;
                n[t] = !0, a.setData({
                    onClick: n
                });
            }
        }).catch(function(e) {
            wx.hideLoading(), c.showClickModal("发送失败");
            var n = a.data.onClick;
            n[t] = !0, a.setData({
                onClick: n
            });
        });
    }
}

function l(e, t, n, o) {
    var i = t.detail.value.phone, s = t.detail.value.code, d = t.detail.value.newPassword, l = t.detail.value.confirmNewPassword;
    if (c.isNull(i)) c.showTimeToast("请输入手机号"); else if (c.isNull(s)) c.showTimeToast("请输入验证码"); else if (c.isNull(d)) c.showTimeToast("请输入新密码"); else if (c.isNull(l)) c.showTimeToast("请再次输入密码"); else if (d !== l) c.showTimeToast("两次输入的密码不一致"); else {
        var u = "";
        u = 0 === n ? {
            original: {
                phone: i,
                captcha: s
            },
            updated: {
                password: l
            },
            scenario: e.data.scenario[n]
        } : {
            original: {
                phone: i,
                captcha: s
            },
            updated: {
                pay_password: l
            },
            scenario: e.data.scenario[n]
        }, wx.showLoading({
            title: "设置中...",
            mask: !0
        }), wx.pro.request({
            url: "/account/",
            data: u,
            method: "POST"
        }).then(function(t) {
            if (wx.hideLoading(), "success" === t.result) {
                c.showClickModal("设置成功");
                var i = e.data.CountdownVal, s = e.data.CountdownTime, d = e.data.onClick;
                i[n] = "发送验证码", s[n] = 60, d[n] = !0, e.setData({
                    CountdownVal: i,
                    CountdownTime: s,
                    onClick: d,
                    clearTimeout: !1,
                    isSetPayPassword: !0
                }), setTimeout(function() {
                    a(e, o);
                }, 2e3);
            } else c.showClickModal(t.msg);
        });
    }
}

var u = require("util.js"), c = require("common.js");

module.exports = {
    phoneChange: function(e, t) {
        var o = t.currentTarget.dataset;
        if ("button" === o.types) n(e, t); else if ("importPhone" === o.types) {
            var s = e.data.tankuang;
            s[3] = "show", e.setData({
                tankuang: s
            });
        } else "close" === o.types ? a(e, o.index) : "sendCode" === o.types ? d(e, t) : "oldphone" === o.types ? e.setData({
            oldphone: t.detail.value
        }) : "phone" === o.types ? e.setData({
            phone: t.detail.value
        }) : "bindPhone" === o.types ? i(e, t) : "payPassword" === o.types && l(e, t, 1, 2);
    },
    codeSend: d,
    setPassConfirm: l,
    hideAlter: a
};