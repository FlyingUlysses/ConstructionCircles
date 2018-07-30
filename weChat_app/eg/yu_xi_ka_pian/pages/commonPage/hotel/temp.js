function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

function a(a, e) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    });
    var n = "/api/HotelToClient/getHotelList?offset=" + e + "&limit=" + a.state.limit;
    n += "&rank=" + a.state.rank, n += "&status=" + a.data.currentTab;
    var s = a.data.location.lng;
    s && (n += "&lng=" + s);
    var o = a.data.location.lat;
    o && (n += "&lat=" + o);
    var d = a.state.keysearch;
    d && (n += "&key=" + d), v.httpRequest(n, {}, "GET", "v2").then(function(n) {
        if ("success" === n.result) {
            var s = u.dataListHandle(a, n, a.data.list, e), o = [];
            a.setData({
                list: s.list,
                requestStatus: !0,
                hasNext: s.hasNext
            });
            for (var d = 0; d < n.results.length; d++) {
                o.push((n.results[d].distance / 1e3).toFixed(2));
                var l = "list[" + d + "].distance";
                a.setData(t({}, l, o[d]));
            }
        } else u.showClickModal(n.msg);
    });
}

function e(t) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    }), x.getBanner(t, "hotel"), t.setData({
        isFixed: !1
    }), wx.getLocation({
        success: function(e) {
            t.setData({
                hasLocation: !0,
                location: {
                    lng: e.longitude,
                    lat: e.latitude
                }
            }), a(t, 0);
        },
        fail: function(e) {
            t.setData({
                location: {
                    lng: null,
                    lat: null
                }
            }), a(t, 0);
        }
    });
}

function n(t) {
    wx.getSystemInfo({
        success: function(a) {
            t.setData({
                service_class: "block",
                Hoteldisplay: "block",
                isheight: a.windowHeight + "px",
                isover: "hidden"
            });
        }
    });
}

function s(t) {
    t.setData({
        Hoteldisplay: "hide",
        service_class: "hide",
        Rankdis: "none",
        isheight: "auto",
        isover: "auto"
    });
}

function o(t, e) {
    var n = e.currentTarget.dataset.av;
    0 == n ? (t.state.offset = 0, t.state.keysearch = "", a(t, 0)) : "none" == t.data.Rankdis ? t.data.Rankdis = "block" : t.data.Rankdis = "none", 
    t.setData({
        currentTab: n,
        requestStatus: [],
        Rankdis: t.data.Rankdis
    });
}

function d(t, e) {
    t.currentTarget.dataset, e.state.keysearch = e.data.searchVal, e.state.offset = 0, 
    a(e, 0);
}

function l(t, a) {
    t.setData({
        searchVal: a.detail.value
    });
}

function h(t, e) {
    var n = e.currentTarget.dataset.idx;
    t.state.offset = 0, wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.state.rank = 0 == n ? "asc" : "desc", 1 == t.data.currentTab ? t.data.location.lng ? a(t, 0) : u.location(t, "nearby", function(e) {
        a(t, 0);
    }) : a(t, 0), s(t);
}

function r(t, a) {
    var e = a.currentTarget.dataset.mx;
    getApp().globalData.confirmService = {
        chosedTime: t.data.chosedTime,
        chosedClock: t.data.chosedClock,
        daydates: t.data.daydates,
        distance: t.data.list[e].distance
    }, wx.navigateTo({
        url: "../../hotel/pages/Hoteldetails/Hoteldetails?hotelid=" + t.data.list[e].id
    });
}

function m(t, a, e, n) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    }), v.httpRequest("/api/HotelToClient/getHotelDetails", {
        id: a,
        startTime: e,
        overTime: n
    }, "GET", "v2").then(function(a) {
        "success" === a.result ? (t.setData({
            list: a.data,
            facilities: a.data.amenities
        }), wx.pro.fromSync(function(e) {
            if (a.data.details) {
                var n = p.wxParse("article", "html", a.data.details, t, 5);
                t.setData(n);
            }
        })) : u.showClickModal(a.msg), wx.hideLoading();
    });
}

function i(t) {
    var a = new Date(), e = new Date(), n = [], s = [], o = [], d = a.getMonth() + 1, l = a.getFullYear(), h = (v = a.getDate()) - 1, r = (c = d + 1) + 1;
    if (d < 10) m = "0" + d; else var m = d;
    for (var i = 1; i <= new Date(l, d, 0).getDate(); i++) n.push({
        day: i,
        state: 0,
        nv: ""
    });
    if (c > 12) var c = 1, g = l + 1; else g = l;
    if (r > 12) var r = 1, f = g + 1; else f = g;
    if (c < 10) c = "0" + c; else c = c;
    if (r < 10) r = "0" + r; else r = r;
    if (v < 10) v = "0" + v; else var v = v;
    for (var u = new Date(l + "-" + m), x = new Date(g + "-" + c), p = new Date(f + "-" + r), y = 1; y <= new Date(l, c, 0).getDate(); y++) s.push({
        day: y,
        state: 0,
        nv: ""
    });
    for (var D = 1; D <= new Date(l, r, 0).getDate(); D++) o.push({
        day: D,
        state: 0,
        nv: ""
    });
    var T = a.getTime() + 864e5;
    a.setTime(T);
    var w = a.getMonth() + 1, k = "", b = a.getDate(), C = "";
    k = w < 10 ? "0" + w : w, k = w < 10 ? "0" + w : w, C = b < 10 ? "0" + b : b;
    var H = a.getFullYear() + "-" + k + "-" + C, L = T - e.getTime(), R = parseInt(L / 864e5);
    t.setData({
        months: n,
        monthnext: s,
        monthlast: o,
        ymd2: g + "-" + c,
        ymd3: f + "-" + r,
        ymd: l + "-" + m,
        ymdd: l + "-" + m + "-" + v,
        chosedTime: l + "-" + m + "-" + v,
        chosedClock: H,
        left: 104 * u.getDay() + "rpx",
        left2: 104 * x.getDay() + "rpx",
        left3: 104 * p.getDay() + "rpx",
        monidx: h,
        daydates: R
    });
}

function c(t, a, n, o, d) {
    var l = t.currentTarget.dataset.days, h = t.currentTarget.dataset.co + 1, r = t.currentTarget.dataset.co;
    h < 10 && (h = "0" + h);
    var i = a.data.flag;
    if (2 === Number(i)) {
        var c = l + "-" + h;
        console.log("离店时间" + c);
        var g = (new Date(Date.parse(c.replace(/-/g, "/"))).getTime() - new Date(Date.parse(a.data.ym1.replace(/-/g, "/"))).getTime()) / 864e5, f = a.data.index1;
        if (g < 0 && r >= a.data.monidx) a.data.months[r].state = 1, a.data.months[f].state = 0, 
        a.data.months[f].nv = "", a.data.monthnext[f].state = 0, a.data.monthnext[f].nv = "", 
        a.data.monthlast[f].state = 0, a.data.monthlast[f].nv = "", a.data.months[r].nv = "入住", 
        a.setData({
            flag: 2,
            ym1: c,
            months: a.data.months,
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast,
            index1: r
        }); else if (r < a.data.monidx) a.data.months[r].state = 0, a.setData({
            flag: 2
        }); else if (0 === Number(g)) a.data.months[r].state = 1, a.setData({
            flag: 2
        }); else {
            a.data.months[r].state = 1, a.data.months[r].nv = "离店";
            for (var v = a.data.index1 + 1; v < r; v += 1) a.data.months[v].state = 2;
            1 == getCurrentPages().length ? e(a, 0, a.data.chosedTime) : m(a, (getApp().globalData.confirmService, 
            a.data.list.id), a.data.ym1, c), a.setData({
                months: a.data.months,
                chosedTime: a.data.ym1,
                chosedClock: c,
                daydates: g,
                flag: 1
            }), s(a);
        }
        console.log("总共" + g + "天");
    } else {
        var u = l + "-" + h;
        i += 1;
        for (var x = 0; x < a.data.months.length; x += 1) a.data.months[x].state = 0, a.data.months[x].nv = "";
        for (var p = 0; p < a.data.monthnext.length; p += 1) a.data.monthnext[p].state = 0, 
        a.data.monthnext[p].nv = "";
        for (var y = 0; y < a.data.monthlast.length; y += 1) a.data.monthlast[y].state = 0, 
        a.data.monthlast[y].nv = "";
        a.setData({
            months: a.data.months,
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast
        });
        for (var D = u.replace(/\-/gi, "/"), T = a.data.ymdd.replace(/\-/gi, "/"), w = new Date(D).getTime(), k = new Date(T).getTime(), b = 0; b < a.data.months.length; b++) a.data.months[b].nv = "";
        w < k ? (a.data.months[r].state = 1, wx.showModal({
            title: "温馨提示",
            content: "当前时间无法选择",
            showCancel: !1
        })) : (a.data.months[r].state = 1, a.data.months[r].nv = "入住", a.setData({
            flag: i,
            ym1: u,
            months: a.data.months,
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast,
            index1: r
        })), console.log("入住时间" + u);
    }
}

function g(t, a) {
    var n = t.currentTarget.dataset.days, o = t.currentTarget.dataset.co + 1, d = t.currentTarget.dataset.co;
    o < 10 && (o = "0" + o);
    var l = a.data.flag;
    if (2 === Number(l)) {
        var h = n + "-" + o;
        a.setData({
            ym2: h
        }), console.log("离店时间" + h);
        var r = new Date(Date.parse(h.replace(/-/g, "/"))).getTime(), i = new Date(Date.parse(a.data.ym1.replace(/-/g, "/"))).getTime(), c = a.data.ym1.split("-"), g = a.data.ym2.split("-");
        c = 12 * parseInt(c[0]) + parseInt(c[1]), g = 12 * parseInt(g[0]) + parseInt(g[1]);
        var f = Math.abs(c - g), v = (r - i) / 864e5, u = a.data.index1;
        if (v < 0) a.data.monthnext[d].state = 1, a.data.monthnext[u].state = 0, a.data.monthnext[u].nv = "", 
        a.data.monthlast[u].state = 0, a.data.monthlast[u].nv = "", a.data.monthnext[d].nv = "入住", 
        a.setData({
            flag: 2,
            ym1: h,
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast,
            index1: d
        }); else if (0 == Number(v)) a.data.monthnext[d].state = 1, a.setData({
            flag: 2
        }); else {
            if (0 === Number(f)) {
                for (var x = a.data.index1 + 1; x < d; x += 1) a.data.monthnext[x].state = 2;
                a.data.monthnext[d].state = 1;
            } else {
                for (var p = u + 1; p < a.data.months.length; p += 1) a.data.months[p].state = 2, 
                a.setData({
                    months: a.data.months
                });
                for (var y = 0; y < d; y += 1) a.data.monthnext[y].state = 2;
                a.data.monthnext[d].state = 1;
            }
            a.data.monthnext[d].nv = "离店", 1 === getCurrentPages().length ? e(a, 0, a.data.chosedTime) : m(a, (getApp().globalData.confirmService, 
            a.data.list.id), a.data.ym1, h), a.setData({
                monthnext: a.data.monthnext,
                chosedTime: a.data.ym1,
                chosedClock: h,
                daydates: v,
                flag: 1
            }), s(a);
        }
        console.log("总共" + v + "天");
    } else {
        var D = n + "-" + o;
        l += 1;
        for (var T = 0; T < a.data.months.length; T += 1) a.data.months[T].state = 0;
        for (var w = 0; w < a.data.monthnext.length; w += 1) a.data.monthnext[w].state = 0;
        for (var k = 0; k < a.data.monthlast.length; k += 1) a.data.monthlast[k].state = 0;
        for (var b = 0; b < a.data.monthnext.length; b += 1) a.data.monthnext[b].state = 0, 
        a.data.monthnext[b].nv = "";
        for (var C = 0; C < a.data.months.length; C += 1) a.data.months[C].nv = "";
        for (var H = 0; H < a.data.monthlast.length; H += 1) a.data.monthlast[H].nv = "";
        a.data.monthnext[d].state = 1, a.data.monthnext[d].nv = "入住", a.setData({
            flag: l,
            ym1: D,
            index1: d,
            months: a.data.months,
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast
        }), console.log("入住时间" + D);
    }
}

function f(t, a) {
    var n = t.currentTarget.dataset.days, o = t.currentTarget.dataset.co + 1, d = t.currentTarget.dataset.co;
    o < 10 && (o = "0" + o);
    var l = a.data.flag;
    if (2 === Number(l)) {
        var h = n + "-" + o;
        a.setData({
            ym2: h
        }), console.log("离店时间" + h);
        var r = new Date(Date.parse(h.replace(/-/g, "/"))).getTime(), i = new Date(Date.parse(a.data.ym1.replace(/-/g, "/"))).getTime(), c = a.data.ym1.split("-"), g = a.data.ym2.split("-");
        c = 12 * parseInt(c[0]) + parseInt(c[1]), g = 12 * parseInt(g[0]) + parseInt(g[1]);
        var f = Math.abs(c - g);
        console.log("相差" + f);
        var v = (r - i) / 864e5, u = a.data.index1;
        if (v < 0) a.data.monthlast[d].state = 1, a.data.monthlast[u].state = 0, a.data.monthlast[u].nv = "", 
        a.data.monthlast[d].nv = "入住", a.setData({
            flag: 2,
            ym1: h,
            monthlast: a.data.monthlast,
            index1: d
        }); else if (0 == v) a.data.monthlast[d].state = 1, a.setData({
            flag: 2
        }); else {
            if (0 == f) {
                for (var x = u + 1; x < d; x++) a.data.monthlast[x].state = 2;
                a.data.monthlast[d].state = 1;
            } else if (1 == f) {
                console.log(a.data.months.length);
                for (y = u + 1; y < a.data.monthnext.length; y++) a.data.monthnext[y].state = 2;
                a.data.monthlast[d].state = 2;
                for (D = 0; D < d; D++) a.data.monthlast[D].state = 2;
                a.data.monthlast[d].state = 1;
            } else {
                for (var p = 0; p < a.data.monthnext.length; p++) a.data.monthnext[p].state = 2;
                for (var y = u + 1; y < a.data.months.length; y++) a.data.months[y].state = 2;
                for (var D = 0; D < d; D++) a.data.monthlast[D].state = 2;
                a.data.monthlast[d].state = 1;
            }
            a.data.monthlast[d].nv = "离店", a.setData({
                months: a.data.months,
                monthnext: a.data.monthnext,
                monthlast: a.data.monthlast
            }), 1 == getCurrentPages().length ? e(a, 0, a.data.chosedTime) : m(a, (getApp().globalData.confirmService, 
            a.data.list.id), a.data.ym1, h), a.setData({
                chosedTime: a.data.ym1,
                chosedClock: h,
                daydates: v,
                flag: 1
            }), s(a);
        }
        console.log("总共" + v + "天");
    } else {
        l += 1;
        for (var T = 0; T < a.data.months.length; T += 1) a.data.months[T].state = 0;
        for (var w = 0; w < a.data.monthnext.length; w += 1) a.data.monthnext[w].state = 0;
        for (var k = 0; k < a.data.monthlast.length; k += 1) a.data.monthlast[k].state = 0;
        for (var b = 0; b < a.data.monthnext.length; b += 1) a.data.monthnext[b].state = 0, 
        a.data.monthnext[b].nv = "";
        for (var C = 0; C < a.data.months.length; C += 1) a.data.months[C].nv = "";
        for (var H = 0; H < a.data.monthlast.length; H += 1) a.data.monthlast[H].nv = "", 
        a.data.monthlast[H].state = 0;
        a.data.monthlast[d].nv = "入住", a.data.monthlast[d].state = 1, a.setData({
            flag: l,
            ym1: n + "-" + o,
            index1: d,
            months: a.data.months,
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast
        });
    }
}

var v = getApp().globalData.utilFun, u = getApp().globalData.commonFun, x = getApp().globalData.dataTempFun, p = require("../../../wxParse/wxParse.js");

module.exports = {
    getData: e,
    getYMD: i,
    getList: a,
    getData2: m,
    hotelEventCheng: function(t, a, e) {
        var m = a.currentTarget.dataset;
        if ("BombBox" === m.types) n(t); else if ("navbarTap" === m.types) o(t, a); else if ("selectRank" === m.types) h(t, a); else if ("Hoteldetails" === m.types) r(t, a); else if ("detailClose" === m.types) s(t); else if ("many" === m.types) d(a, t); else if ("search" === m.types) l(t, a); else if ("choseday" === m.types) c(a, t, e); else if ("choseday2" === m.types) g(a, t, e); else if ("choseday3" === m.types) f(a, t, e); else if ("HotelAddress" === m.types) {
            var i = t.data.list[m.index];
            u.openMap(i.lat, i.lng);
        }
    },
    hotelDataSet: function(t) {
        t.setData({
            hotelweeks: [ "日", "一", "二", "三", "四", "五", "六" ],
            Hoteldisplay: "hide",
            ymd: "",
            ymd2: [],
            ymd3: [],
            months: [],
            monthnext: [],
            monthlast: [],
            left: "",
            left2: "",
            left3: "",
            flag: 1,
            ym1: "",
            ym2: "",
            ymdd: "",
            service_class: "hide",
            monidx: "",
            chosedTime: "",
            chosedClock: "",
            daydates: "",
            navs: [ "全部", "距离", "价格", "评分" ],
            currentTab: 0,
            searchVal: "",
            projects: [],
            hasLocation: !1,
            location: {},
            Rankdis: "none",
            choseSele: [ [ "由近到远", "由远到近" ], [ "由低到高", "由高到低" ], [ "由低到高", "由高到低" ] ],
            alterRequestStatus: !0,
            peise: getApp().globalData.peise
        }), t.state.rank = "asc", t.state.keysearch = "", i(t);
    }
};