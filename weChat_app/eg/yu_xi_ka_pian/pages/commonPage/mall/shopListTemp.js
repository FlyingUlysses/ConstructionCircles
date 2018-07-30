function t(t, e) {
    var a = e.data.mall, s = "/hdh/" + getApp().globalData.acid + "/product/?offset=" + t + "&limit=" + e.state.limit + "&category_id=" + e.state.categoryid;
    a.order && (s += "&order=" + a.order, "price" === a.order && (1 === Number(a.sort) ? s += "&sort=asc" : 2 === Number(a.sort) && (s += "&sort=desc"))), 
    v.httpRequest(s).then(function(s) {
        var r = f.dataListHandle(e, s, a.shopData, t);
        a.shopData = r.list, a.hasNext = r.hasNext, e.store({
            mall: a,
            requestStatus: !0,
            saleDisplay: Number(f.getStorage("config").shop.saleDisplay)
        }), wx.stopPullDownRefresh();
    });
}

function e(e, a) {
    var s = e.data.mall, r = a.categoryid, o = parseInt(a.current), u = e.data.navList[o].sub_shop;
    e.state.categoryid = r, e.data.currentTab !== o && (s.seconNav = 0), 0 !== Number(r) && u && u.length > 0 ? e.store({
        mall: s,
        currentTab: o,
        seconNavL: u
    }) : (wx.showLoading({
        title: "加载中...",
        mask: !0
    }), s.shopData = [], s.toView = "category_" + o, s.order = "", s.sort = 0, e.store({
        mall: s,
        seconNavL: [],
        currentTab: o,
        requestStatus: !1,
        logoPosBottom: !0
    }), e.state.offset = 0, t(0, e));
}

function a(e, a) {
    var s = e.data.mall;
    e.state.categoryid = a.categoryid, wx.showLoading({
        title: "加载中...",
        mask: !0
    }), s.shopData = [], s.order = "", s.sort = 0, s.seconNav = a.categoryid, e.store({
        mall: s,
        seconNavL: [],
        requestStatus: !1
    }), e.state.offset = 0, t(0, e);
}

function s(t) {
    var e = "/cart/?acid=" + getApp().globalData.acid;
    v.httpRequest(e).then(function(e) {
        t.store({
            cartNum: e.count
        });
    });
}

function r(e) {
    var a = e.data.mall, r = getApp().globalData.mallcategoryId, o = e.state.options, u = 0, i = f.getStorage("config").shop, n = i.categories;
    0 === Number(r) && n.length > 0 && !o.hasOwnProperty("category_id") ? e.state.categoryid = n[0].id : (o.hasOwnProperty("category_id") ? e.state.categoryid = o.category_id : e.state.categoryid = r, 
    n.forEach(function(t, a) {
        Number(t.id) === Number(e.state.categoryid) && (u = a);
    }), a.shopData = [], a.toView = "category_" + u, getApp().globalData.mallcateId = 0), 
    0 == n.length && (wx.hideLoading(), o.hasOwnProperty("category_id") ? e.state.categoryid = o.category_id : e.state.categoryid = r), 
    e.store({
        shopTempName: i.list_view_type,
        navList: i.categories,
        mall: a,
        currentTab: u,
        contactStatus: !0
    }), f.getAccessToken() ? (t(0, e), s(e)) : getApp().globalData.tokenUpdated = function() {
        console.log("update success"), t(0, e), s(e);
    };
}

function o(t, e, a) {
    var s = !1, r = "cart", o = "", u = t.data.detail;
    "detail" === a && (r = "detail", u.ptStatus && !t.state.danmai && (r = "groupon", 
    o = u.groupon.id, s = u.ptStatus));
    var i = {
        skuData: e.skuData,
        from: r,
        ptStatus: s,
        grouponId: o
    };
    f.setStorage("confirmData", i), t.setData({
        orderNum: 1
    }), t.state.isPay = !1;
    var n = t.state.options, c = 0;
    n && n.hasOwnProperty("isMallODOpen") && (c = n.isMallODOpen), wx.hideLoading(), 
    t.state.pagesLeg && 4 === t.state.pagesLeg ? (0 !== Number(c) && (c = Number(c) - 1), 
    wx.redirectTo({
        url: "/pages/mall/pages/confirmOrder/confirmOrder?isMallODOpen=" + c
    })) : wx.navigateTo({
        url: "/pages/mall/pages/confirmOrder/confirmOrder?isMallODOpen=" + c
    });
}

function u(t, e, a) {
    if ("shopCart" !== e) {
        var s = "/cart/?acid=" + getApp().globalData.acid;
        v.httpRequest(s, t.cartsku, e).then(function(s) {
            a.state.isPay || "PUT" === e ? o(a, t, "") : a.state.isCart ? ((a.data.cartNum || 0 === a.data.cartNum) && a.store({
                cartNum: Number(a.data.cartNum) + Number(a.data.orderNum)
            }), a.store({
                orderNum: 1
            }), a.state.isCart = !1, wx.hideLoading()) : "POST" === e && (a.store({
                cartNum: s.cart.count
            }), wx.hideLoading());
        });
    } else o(a, t, "");
}

function i(t, e) {
    for (var a = e.data.orderNum, s = t.idx, r = t.index, o = t.value, u = e.data.shopKeys.split("；"), i = e.data.keys, n = e.data.tk_sku, c = 0; c < i[s].value.length; c += 1) c === r ? (i[s].status[c] = !0, 
    u.splice(s, 1, o)) : i[s].status[c] = !1;
    var d = !1;
    i[s].status.forEach(function(t) {
        t && (d = !0);
    }), i[s].checked = d, u = u.join("；");
    for (var l = e.data.detail.skus, p = [], g = 0; g < l.length; g += 1) {
        for (var m = l[g], h = [], k = 0; k < m.sale_props.length; k += 1) h.push(m.sale_props[k].value);
        p.push(h.join("；")), u === h.join("；") && (n = m, a = 1);
    }
    f.IsInArray(p, u) || (a = 1, n.hasOwnProperty("stock_count") ? n.stock_count = 0 : n = {
        stock_count: 0,
        preview: e.data.detail.cover,
        price: e.data.detail.price_desc
    }), e.store({
        keys: i,
        shopKeys: u,
        tk_sku: n,
        orderNum: a
    });
}

function n(t, e, a, s) {
    var r = t.data.detail, i = t.data.orderNum, n = t.data.tk_sku.id, c = [ {
        sku_id: n,
        count: Number(i),
        price: a,
        normal_product: s,
        isMemberProduct: r.isMemberProduct,
        inputs: t.state.inputVal
    } ], d = "", l = t.data.tk_sku.sale_props;
    l.length > 0 && l.forEach(function(t) {
        d += t.value + ",";
    }), "," === d.substr(d.length - 1, 1) && (d = d.substr(0, d.length - 1));
    var p = {
        cartsku: {
            cartsku: c
        },
        skuData: [ {
            count: i,
            sku_id: n,
            price: a,
            normal_product: s,
            isMemberProduct: r.isMemberProduct,
            inputs: t.state.inputVal
        } ]
    }, g = t.data.selectSku;
    g ? g.price = t.data.tk_sku ? t.data.tk_sku.price_desc : detail.price_desc : g = t.data.tk_sku, 
    t.store({
        selectSku: g,
        is_hidden: !0,
        isScroll: !0
    }), t.state.isPay ? o(t, p, e.pageName) : t.state.isChooseSku ? t.state.isChooseSku = !1 : u(p, "POST", t);
}

function c(t, e) {
    for (var a = t.data.keys, s = 0; s < a.length; s += 1) if (!a[s].checked) return void f.showTimeToast("请选择" + a[s].name);
    if (t.data.orderNum && 0 !== Number(t.data.orderNum)) {
        var r = (t.data.tk_sku.id, t.data.orderNum), o = t.data.detail, u = t.data.tk_sku ? t.data.tk_sku.stock_count : t.data.stock_count, i = t.data.tk_sku ? t.data.tk_sku.price : o.price_desc, c = !0;
        if (o.msStatus) {
            var d = o.seckilling.price_desc;
            "元" === d.substr(d.length - 1, 1) && (d = d.substr(0, d.length - 1)), i = d, c = !1;
        }
        o.ptStatus && !t.state.danmai && (u = o.groupon.stock_count, i = o.groupon.price, 
        c = !1), c && o.isMemberProduct && (i = o.fee_member), Number(u) < Number(r) ? f.showClickModal("超出库存量") : t.state.inputVal.length > 0 ? N.contentJudge(t, function(a) {
            n(t, e, i, c);
        }) : n(t, e, i, c);
    } else f.showClickModal("请输入正确的数量");
}

function d(t) {
    var e = [], a = [], s = [], r = "", o = 0, u = !1, i = 0;
    if (t.skus.forEach(function(t) {
        if (o += t.stock_count, t.sale_props.length > 0) {
            i += 1;
            var e = [];
            t.sale_props.forEach(function(a) {
                var r = {
                    id: t.id,
                    key: a.key,
                    value: a.value
                };
                e.push(a.value), s.push(r);
            });
        }
    }), i > 0) {
        u = !0, s.forEach(function(t) {
            -1 === a.indexOf(t.key) && a.push(t.key);
        });
        for (var n = 0; n < a.length; n += 1) {
            var c = {};
            c.checked = !1, c.name = a[n], c.value = [], c.status = [];
            for (var d = 0; d < s.length; d += 1) s[d].key === a[n] && -1 === c.value.indexOf(s[d].value) && (c.value.push(s[d].value), 
            c.status.push(!1));
            e.push(c);
        }
    } else r = t.skus[0];
    return {
        shopKeys: a.join("；"),
        keys: e,
        stock_count: o,
        selectSku: r,
        tk_sku: r,
        hasSku: u
    };
}

function l(t, e) {
    var a = d(e);
    e.hasOwnProperty("seckilling") && (e.msStatus = !0), e.hasOwnProperty("groupon") && (e.ptStatus = !0), 
    t.store({
        detail: e,
        shopKeys: a.shopKeys,
        keys: a.keys,
        stock_count: a.stock_count,
        selectSku: a.selectSku,
        tk_sku: a.tk_sku,
        hasSku: a.hasSku,
        is_hidden: !1,
        isScroll: !1,
        orderNum: 1
    });
}

function p(t, e) {
    var a = e.currentTarget.dataset.value, s = t.data.tk_sku ? t.data.tk_sku.stock_count : t.data.stock_count;
    Number(s) < Number(a) && (f.showClickModal("超出库存量"), a = Number(s)), t.store({
        orderNum: a
    });
}

function g(t, e) {
    var a = t.data.orderNum ? Number(t.data.orderNum) : 0, s = t.data.tk_sku ? t.data.tk_sku.stock_count : t.data.stock_count;
    Number(s) > Number(a) && t.store({
        orderNum: a += 1
    });
}

function m(t) {
    var e = Number(t.data.orderNum);
    e > 1 && t.store({
        orderNum: e -= 1
    });
}

function h(t, e) {
    var a = "/product/" + e + "/";
    wx.showLoading({
        title: "",
        mask: !0
    }), v.httpRequest(a).then(function(e) {
        wx.hideLoading(), l(t, e);
    });
}

function k(e, a) {
    var s = e.data.mall;
    if ("price" === a.typename) {
        s.order = a.typename;
        var r = a.orsort;
        0 === Number(r) ? s.sort = 1 : 1 === Number(r) ? s.sort = 2 : 2 === Number(r) && (s.sort = 0, 
        s.order = "");
    } else {
        if (s.order === a.typename) return;
        s.sort = 0, s.order = a.typename;
    }
    s.seconNav = e.state.categoryid, e.store({
        mall: s,
        seconNavL: []
    }), wx.showLoading({
        title: "加载中...",
        mask: !0
    }), e.state.offset = 0, t(0, e);
}

var f = getApp().globalData.commonFun, v = getApp().globalData.utilFun, y = getApp().globalData.dataTempFun, N = getApp().globalData.inputFun;

require("../../userDefined/temp/userDefined.js");

module.exports = {
    shopListChangeEvent: function(s, r) {
        var o = r.currentTarget.dataset;
        if ("input" === r.type && (o.value = r.detail.value), "swichNav" === o.types) s.state.categoryid = o.categoryid, 
        e(s, o); else if ("seconNav" === o.types) a(s, o); else if ("closeNav" === o.types) {
            var u = s.data.mall;
            u.seconNav = s.state.categoryid, s.store({
                mall: u,
                seconNavL: []
            }), t(0, s);
        } else if ("addCart" === o.types) h(s, o.id); else if ("selectSpecify" === o.types) i(o, s); else if ("downNumber" === o.types) m(s); else if ("addNumber" === o.types) g(s, r); else if ("closeModal" === o.types) s.state.isCart = !1, 
        s.state.isPay = !1, s.state.danmai = !0, s.store({
            is_hidden: !0,
            isScroll: !0,
            orderNum: 1
        }); else if ("sure" === o.types) c(s, r); else if ("changeValue" === o.types) p(s, r); else if ("openWindow" === o.types) f.openUrl(o, s); else if ("ggHide" === o.types) {
            var n = f.getStorage("indexpop");
            n.status = !0, f.setStorage("indexpop", n), s.store({
                alterHidden: "hide"
            });
        } else "chooseSort" === o.types && k(s, o);
    },
    getGoodsList: t,
    shopListNav: function(t, e) {
        y.getBanner(t, "shop"), f.configData("shop", function() {
            f.commonFun(t);
            var e = f.getStorage("config").shop;
            e.module ? r(t) : f.showClickModal(e.msg);
        });
    },
    getShopDetail: h,
    inputBlur: function(t, e) {
        var a = e.detail.value;
        "" === a || Number(a);
    },
    getCartNum: s,
    addShopCar: u,
    skuProps: d
};