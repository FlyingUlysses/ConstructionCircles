function t(t) {
    s.httpRequest("/api/ExpertToClient/getClass", {}, "GET", "v2").then(function(a) {
        t.setData({
            yunavs: a.data
        }), n.updateTabOffsetTop(t);
    });
}

function a(t, a) {
    var e = "/api/ExpertToClient/getExpertList?offset=" + a + "&limit=" + t.state.limit, o = t.state.classId;
    n.isNull(o) || (e += "&classId=" + o);
    var d = t.state.server_keyword;
    d && (e += "&key=" + d), s.httpRequest(e, {}, "GET", "v2").then(function(e) {
        if ("success" === e.result) {
            var s = n.dataListHandle(t, e, t.data.list, a);
            t.setData({
                list: s.list,
                requestStatus: !0,
                hasNext: s.hasNext
            });
        } else n.showClickModal(e.msg);
    });
}

function e(t, e) {
    var s = e.currentTarget.dataset.idx;
    Number(s) !== Number(t.data.currentTab) && (wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.state.server_keyword = "", t.setData({
        currentTab: s,
        list: [],
        requestStatus: !1
    }), t.state.classId = e.currentTarget.dataset.typeid, t.state.offset = 0, a(t, 0));
}

var s = getApp().globalData.utilFun, n = getApp().globalData.commonFun, o = getApp().globalData.dataTempFun;

module.exports = {
    getData: function(e) {
        o.getBanner(e, "service"), t(e), a(e, 0), e.setData({
            isFixed: !1
        });
    },
    getnav: t,
    getList: a,
    navbarTap: e,
    deleteOrder: function(t, a) {
        wx.showModal({
            title: "提示",
            content: "确定要删除吗？",
            success: function(e) {
                if (e.confirm) {
                    wx.showLoading({
                        title: "",
                        mask: !0
                    });
                    var n = "/api/ExpertToClient/deleteOrder?id=" + t;
                    s.httpRequest(n, {}, "GET", "v2").then(function(t) {
                        wx.hideLoading(), a(t);
                    });
                }
            }
        });
    },
    orderRefund: function(t, a, e) {
        wx.showModal({
            title: "提示",
            content: "确定要申请退款吗？",
            success: function(n) {
                if (n.confirm) {
                    wx.showLoading({
                        title: "",
                        mask: !0
                    });
                    var o = {
                        id: t,
                        remark: a
                    };
                    s.httpRequest("/api/ExpertToClient/applyRefund", o, "POST", "v2").then(function(t) {
                        wx.hideLoading(), e(t);
                    });
                }
            }
        });
    },
    serverEventCheng: function(t, s) {
        var n = s.currentTarget.dataset;
        "navbarTap" === n.types ? e(t, s) : "search" === n.types && (t.state.server_keyword = s.detail.value, 
        t.state.classId = 0, t.state.offset = 0, a(t, 0));
    },
    service_getDetail: function(t, a) {
        var e = t.data.list, n = "/api/ExpertToClient/getExpertDetails?id=" + e[a].id;
        s.httpRequest(n, {}, "GET", "v2").then(function(s) {
            "success" === s.result && (e[a].Grade = s.data.Grade, e[a].doneNum = s.data.doneNum, 
            t.setData({
                list: e
            }));
        });
    },
    selectTime: function(t, a) {
        var e = a.currentTarget.dataset.codes, s = t.data.currentTab;
        e < t.data.times[s].key || 0 == t.data.times[s].num[e] ? (t.setData({
            dis: !0,
            timeTab: e
        }), n.showClickModal("当前时间段已无法预约")) : t.setData({
            dis: !1,
            timeTab: e
        });
    },
    getYMD: function(t) {
        for (var a = new Date(), e = [], s = [], n = [], o = a.getMonth() + 1, d = a.getFullYear(), r = (p = a.getDate()) - 1, l = o + 1, m = new Date(d + "-" + x), h = new Date(c + "-" + l), i = new Date(v + "-" + f), g = 1; g <= new Date(d, o, 0).getDate(); g++) e.push({
            day: g,
            state: 0
        });
        if (l > 12) var l = 1, c = d + 1; else c = d;
        if ((f = l + 1) > 12) var f = 1, v = c + 1; else v = c;
        if (o < 10) x = "0" + o; else var x = o;
        l = l < 10 ? "0" + l : l;
        f = f < 10 ? "0" + f : f;
        if (p < 10) p = "0" + p; else var p = p;
        for (var u = 1; u <= new Date(d, l, 0).getDate(); u++) s.push({
            day: u,
            state: 0
        });
        for (var D = 1; D <= new Date(d, f, 0).getDate(); D++) n.push({
            day: D,
            state: 0
        });
        t.setData({
            months: e,
            monthnext: s,
            monthlast: n,
            ymd2: c + "-" + l,
            ymd3: v + "-" + f,
            ymd: d + "-" + x,
            ymdd: d + "-" + x + "-" + p,
            left: 106 * m.getDay() + "rpx",
            left2: 106 * h.getDay() + "rpx",
            left3: 106 * i.getDay() + "rpx",
            monidx: r
        });
    },
    choseday: function(t, a) {
        var e = t.currentTarget.dataset.days, s = t.currentTarget.dataset.co + 1, n = t.currentTarget.dataset.co;
        s = s < 10 ? "0" + s : s;
        a.setData({
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast,
            months: a.data.months
        });
        var o = a.data.flag;
        if (2 == o) {
            var d = e + "-" + s;
            a.setData({
                flag: 1
            }), console.log("离店时间" + d);
            var r = (new Date(Date.parse(d.replace(/-/g, "/"))).getTime() - (h = new Date(Date.parse(a.data.ym1.replace(/-/g, "/"))).getTime())) / 864e5;
            if (a.data.index1, r < 0) a.data.months[n].state = 0, a.setData({
                flag: 2
            }); else if (0 == r) a.data.months[n].state = 1, a.setData({
                flag: 2
            }); else {
                a.data.months[n].state = 1;
                for (var l = a.data.index1; l <= n; l++) a.data.months[l].state = 1;
                getApp().globalData.confirmService = {
                    chosedTime: a.data.ym1,
                    chosedClock: d,
                    theme: a.state.theme,
                    daydates: r
                };
                var m = a.state.options;
                wx.navigateTo({
                    url: "../Reservation/Reservation?id=" + m.idx + "&index=" + m.index
                }), a.detailClose();
            }
            a.setData({
                months: a.data.months
            }), console.log("总共" + r + "天");
        } else {
            var h = e + "-" + s;
            o++;
            for (var i = 0; i < a.data.months.length; i++) a.data.months[i].state = 0;
            for (var t = 0; t < a.data.monthnext.length; t++) a.data.monthnext[t].state = 0;
            for (var g = 0; g < a.data.monthlast.length; g++) a.data.monthlast[g].state = 0;
            a.setData({
                months: a.data.months,
                monthnext: a.data.monthnext,
                monthlast: a.data.monthlast
            });
            var c = h.replace(/\-/gi, "/"), f = a.data.ymdd.replace(/\-/gi, "/");
            new Date(c).getTime() < new Date(f).getTime() ? (a.data.months[n].state = 0, wx.showModal({
                title: "温馨提示",
                content: "请选择当前较大时间",
                showCancel: !1
            })) : (a.data.months[n].state = 1, a.setData({
                flag: o,
                ym1: h,
                months: a.data.months,
                index1: n
            })), console.log("入住时间" + h);
        }
    },
    choseday2: function(t, a) {
        var e = t.currentTarget.dataset.days, s = t.currentTarget.dataset.co + 1, n = t.currentTarget.dataset.co;
        s = s < 10 ? "0" + s : s;
        a.setData({
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast,
            months: a.data.months
        });
        var o = a.data.flag;
        if (2 == o) {
            var d = e + "-" + s;
            a.setData({
                flag: 1,
                ym2: d
            }), console.log("离店时间" + d);
            var r = new Date(Date.parse(d.replace(/-/g, "/"))).getTime(), l = new Date(Date.parse(a.data.ym1.replace(/-/g, "/"))).getTime(), m = a.data.ym1.split("-"), h = a.data.ym2.split("-");
            m = 12 * parseInt(m[0]) + parseInt(m[1]), h = 12 * parseInt(h[0]) + parseInt(h[1]);
            var i = Math.abs(m - h), g = (r - l) / 864e5, c = a.data.index1;
            if (g < 0) a.data.monthnext[n].state = 0, a.setData({
                flag: 2
            }); else if (0 == g) a.data.monthnext[n].state = 1, a.setData({
                flag: 2
            }); else {
                if (0 == i) for (var f = a.data.index1; f <= n; f++) a.data.monthnext[f].state = 1; else {
                    for (var v = c; v < a.data.months.length; v++) a.data.months[v].state = 1, a.setData({
                        months: a.data.months
                    });
                    for (var x = 0; x <= n; x++) a.data.monthnext[x].state = 1;
                }
                getApp().globalData.confirmService = {
                    chosedTime: a.data.ym1,
                    chosedClock: d,
                    theme: a.state.theme,
                    daydates: g
                };
                var p = a.state.options;
                wx.navigateTo({
                    url: "../Reservation/Reservation?id=" + p.idx + "&index=" + p.index
                }), a.detailClose();
            }
            a.setData({
                monthnext: a.data.monthnext
            }), console.log("总共" + g + "天");
        } else {
            for (l = e + "-" + s, o++, D = 0; D < a.data.months.length; D++) a.data.months[D].state = 0;
            for (var t = 0; t < a.data.monthnext.length; t++) a.data.monthnext[t].state = 0;
            for (var u = 0; u < a.data.monthlast.length; u++) a.data.monthlast[u].state = 0;
            a.setData({
                months: a.data.months,
                monthnext: a.data.monthnext,
                monthlast: a.data.monthlast
            });
            for (var D = 0; D < a.data.monthnext.length; D++) a.data.monthnext[D].state = 0;
            a.data.monthnext[n].state = 1, a.setData({
                flag: o,
                ym1: l,
                monthnext: a.data.monthnext,
                index1: n
            }), console.log("入住时间" + l);
        }
    },
    choseday3: function(t, a) {
        var e = t.currentTarget.dataset.days, s = t.currentTarget.dataset.co + 1, n = t.currentTarget.dataset.co;
        s = s < 10 ? "0" + s : s;
        a.setData({
            monthnext: a.data.monthnext,
            monthlast: a.data.monthlast,
            months: a.data.months
        });
        var o = a.data.flag;
        if (2 == o) {
            var d = e + "-" + s;
            a.setData({
                flag: 1,
                ym2: d
            }), console.log("离店时间" + d);
            var r = new Date(Date.parse(d.replace(/-/g, "/"))).getTime(), l = new Date(Date.parse(a.data.ym1.replace(/-/g, "/"))).getTime(), m = a.data.ym1.split("-"), h = a.data.ym2.split("-");
            m = 12 * parseInt(m[0]) + parseInt(m[1]), h = 12 * parseInt(h[0]) + parseInt(h[1]);
            var i = Math.abs(m - h);
            console.log("相差" + i);
            var g = (r - l) / 864e5, c = a.data.index1;
            if (g < 0) a.data.monthlast[n].state = 0, a.setData({
                flag: 2
            }); else if (0 == g) a.data.monthlast[n].state = 1, a.setData({
                flag: 2
            }); else {
                if (0 == i) for (var f = c; f <= n; f++) a.data.monthlast[f].state = 1; else if (1 == i) {
                    for (console.log(a.data.months.length), x = c; x < a.data.monthnext.length; x++) a.data.monthnext[x].state = 1, 
                    a.data.monthlast[n].state = 1;
                    for (p = 0; p < n; p++) a.data.monthlast[p].state = 1;
                } else {
                    for (var v = 0; v < a.data.monthnext.length; v++) a.data.monthnext[v].state = 1;
                    for (var x = c; x < a.data.months.length; x++) a.data.months[x].state = 1;
                    for (var p = 0; p <= n; p++) a.data.monthlast[p].state = 1;
                }
                a.setData({
                    months: a.data.months,
                    monthnext: a.data.monthnext,
                    monthlast: a.data.monthlast
                }), getApp().globalData.confirmService = {
                    chosedTime: a.data.ym1,
                    chosedClock: d,
                    theme: a.state.theme,
                    daydates: g
                };
                var u = a.state.options;
                wx.navigateTo({
                    url: "../Reservation/Reservation?id=" + u.idx + "&index=" + u.index
                }), a.detailClose();
            }
            console.log("总共" + g + "天");
        } else {
            for (l = e + "-" + s, o++, T = 0; T < a.data.months.length; T++) a.data.months[T].state = 0;
            for (var t = 0; t < a.data.monthnext.length; t++) a.data.monthnext[t].state = 0;
            for (var D = 0; D < a.data.monthlast.length; D++) a.data.monthlast[D].state = 0;
            a.setData({
                months: a.data.months,
                monthnext: a.data.monthnext,
                monthlast: a.data.monthlast
            });
            for (var T = 0; T < a.data.monthlast.length; T++) a.data.monthlast[T].state = 0;
            a.data.monthlast[n].state = 1, a.setData({
                flag: o,
                ym1: l,
                monthlast: a.data.monthlast,
                index1: n
            }), console.log(a.data.flag), console.log("入住时间" + l);
        }
    }
};