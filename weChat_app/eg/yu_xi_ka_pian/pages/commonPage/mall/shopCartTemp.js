function t(t, e) {
    var a = "/cart/?acid=" + getApp().globalData.acid;
    d.httpRequest(a, {}, "GET").then(function(a) {
        a.results = a.sku;
        var o = l.dataListHandle(t, a, t.data.list, e);
        o.list.forEach(function(t, e) {
            o.list[e].kc = !1, o.list[e].checked = !1;
        }), t.store({
            list: o.list,
            is_selectAll: !1,
            requestStatus: !0,
            logoPosBottom: !0
        });
    });
}

function e(t, e) {
    var a = e.index, o = Number(t.data.totalNumber), c = Number(t.data.totalMoney), u = t.data.selectCount, r = !0, i = t.data.list;
    i[a].checked = !i[a].checked, i.forEach(function(t) {
        t.checked || (r = !1);
    });
    var s = Number(i[a].count) * Number(i[a].price);
    i[a].checked ? (u += 1, o += Number(i[a].count), c += s) : (o -= Number(i[a].count), 
    c -= s, u -= 1), t.store({
        list: i,
        is_selectAll: r,
        totalNumber: o,
        totalMoney: c.toFixed(2),
        selectCount: u
    });
}

function a(t) {
    var e = t.data.list, a = 0, o = 0, c = 0;
    e.forEach(function(u, r) {
        t.data.is_selectAll ? (e[r].checked = !1, a = 0, c = 0) : (e[r].checked = !0, a += Number(u.count), 
        o += Number(u.count) * Number(u.price), c = e.length);
    }), t.store({
        list: e,
        is_selectAll: !t.data.is_selectAll,
        totalNumber: a,
        totalMoney: o.toFixed(2),
        selectCount: c
    });
}

function o(t) {
    var e = [];
    t.data.list.forEach(function(t) {
        var a = {
            sku_id: t.sku_id,
            count: Number(t.count),
            price: t.price
        };
        e.push(a);
    });
    var a = {
        cartsku: e
    }, o = "/cart/?acid=" + getApp().globalData.acid;
    d.httpRequest(o, a, "PUT");
}

function c(t, e) {
    var a = e.index, c = Number(t.data.totalNumber), u = Number(t.data.totalMoney), r = t.data.list;
    r[a].count < r[a].sku.stock_count && (r[a].count += 1, r[a].checked && (c += 1, 
    u += Number(r[a].price)), o(t)), t.store({
        list: r,
        totalNumber: c,
        totalMoney: u.toFixed(2)
    });
}

function u(t, e) {
    var a = e.index, c = Number(t.data.totalNumber), u = Number(t.data.totalMoney), r = t.data.list;
    r[a].count > 1 && (r[a].count -= 1, r[a].checked && (c -= 1, u -= Number(r[a].price)), 
    o(t)), t.store({
        list: r,
        totalNumber: c,
        totalMoney: u.toFixed(2)
    });
}

function r(t) {
    var e = t.data.list, a = 0, o = 0, c = [];
    e.forEach(function(t) {
        if (t.checked) {
            a += Number(t.count), o += Number(t.price) * Number(t.count);
            var e = {
                sku_id: t.sku_id,
                count: t.count,
                price: t.price
            };
            c.push(e);
        }
    });
    var u = {
        cartsku: c,
        module: "shop"
    };
    d.httpRequest("/order/price/", u, "POST").then(function(a) {
        a.order.detail.forEach(function(t, a) {
            e.forEach(function(a, o) {
                a.checked && t.id === a.id && (Number(a.count) > Number(a.sku.stock_count) ? e[o].kc = !0 : e[o].kc = !1);
            });
        }), t.setData({
            list: e
        });
    }), t.store({
        is_edit: !t.data.is_edit,
        totalNumber: a,
        selectCount: a,
        totalMoney: Number(o).toFixed(2)
    });
}

function i(t) {
    if (t.data.selectCount > 0) {
        wx.showLoading({
            title: "请等待...",
            mask: !0
        });
        var e = t.data.list, a = [], o = 0, c = [];
        e.forEach(function(t) {
            if (t.checked) {
                var e = {
                    count: Number(t.count),
                    sku_id: t.sku_id,
                    stock_count: Number(t.sku.stock_count),
                    price: t.price,
                    isMemberProduct: t.isMemberProduct,
                    normal_product: t.normal_product,
                    alias: t.alias,
                    title: t.title,
                    url: t.sku.preview.thumb_medium_url,
                    inputs: t.inputs
                };
                c.push(e), o += Number(t.count);
            }
            var u = {
                sku_id: t.sku_id,
                count: t.count,
                price: t.price,
                isMemberProduct: t.isMemberProduct,
                normal_product: t.normal_product,
                inputs: t.inputs
            };
            a.push(u);
        });
        var u = {
            cartsku: {
                cartsku: a
            },
            skuData: c,
            totalNum: o,
            totalMoney: t.data.totalMoney
        }, r = {
            cartsku: a,
            module: "shop"
        };
        d.httpRequest("/order/price/", r, "POST").then(function(a) {
            var o = !1;
            a.order.detail.forEach(function(t, a) {
                e.forEach(function(a, c) {
                    a.checked && t.id === a.id && (Number(a.count) > Number(a.sku.stock_count) ? (e[c].kc = !0, 
                    o = !0) : e[c].kc = !1);
                });
            }), o ? (t.setData({
                list: e
            }), wx.hideLoading()) : p.addShopCar(u, "shopCart", t);
        });
    } else l.showClickModal("您还未选择任何商品！");
}

function s(e) {
    if (0 !== e.data.selectCount) {
        var a = [];
        e.data.list.forEach(function(t) {
            if (!t.checked) {
                var e = {
                    sku_id: t.sku_id,
                    count: Number(t.count),
                    price: t.price
                };
                a.push(e);
            }
        });
        var o = {
            cartsku: a
        }, c = "/cart/?acid=" + getApp().globalData.acid;
        d.httpRequest(c, o, "PUT").then(function(a) {
            l.showClickModal("删除成功！"), t(e, 0);
        });
    } else l.showClickModal("请选择需要删除的商品！");
}

function n(t, e) {
    var a = e.skuid, o = e.index, c = t.data.list;
    if (c[o].checked) {
        var u = [];
        c.forEach(function(t) {
            if (t.sku_id !== a) {
                var e = {
                    sku_id: t.sku_id,
                    count: Number(t.count),
                    price: t.price
                };
                u.push(e);
            }
        });
        var r = {
            cartsku: u
        }, i = "/cart/?acid=" + getApp().globalData.acid;
        d.httpRequest(i, r, "PUT").then(function(e) {
            c.splice(o, 1), l.showClickModal("删除成功");
            for (var a = 0, u = 0, r = 0, i = 0; i < c.length; i += 1) c[i].checked && (a += Number(c[i].count), 
            u += Number(c[i].count) * Number(c[i].price), r += 1);
            t.store({
                list: c,
                totalNumber: a,
                totalMoney: u.toFixed(2),
                selectCount: r
            });
        });
    }
}

var l = getApp().globalData.commonFun, d = getApp().globalData.utilFun, p = require("./shopListTemp.js");

module.exports = {
    shopCartChangeEvent: function(t, o) {
        var l = o.currentTarget.dataset;
        "selectGoods" === l.types ? e(t, l) : "selectAll" === l.types ? a(t) : "downNumber" === l.types ? u(t, l) : "addNumber" === l.types ? c(t, l) : "goDetialPage" === l.types ? wx.navigateTo({
            url: "/pages/mall/pages/shopDetail/shopDetail?isMallODOpen=0&productId=" + l.id
        }) : "caozuoCart" === l.types ? r(t) : "deleteCart" === l.types ? s(t) : "goPlay" === l.types ? i(t) : "deleteGoods" === l.types && n(t, l);
    },
    cartList: t
};