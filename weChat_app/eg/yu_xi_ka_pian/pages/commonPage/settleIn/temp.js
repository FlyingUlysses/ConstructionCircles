function t(t) {
    o.httpRequest("/business/ServerConfig/get", {}, "GET", "v2").then(function(e) {
        if ("success" === e.result) {
            var s = n.getStorage("config");
            s.settle = e.results, n.setStorage("config", s), t.store({
                config: s,
                peise: getApp().globalData.peise
            });
        } else n.showClickModal(e.msg);
    });
}

function e(t, e, s) {
    var a = {
        id: s,
        offset: e,
        limit: t.state.limit
    };
    o.httpRequest("/business/Information/show", a, "GET", "v2").then(function(s) {
        if (wx.hideLoading(), "success" === s.result) {
            var a = n.dataListHandle(t, s, t.data.list, e);
            t.store({
                requestStatus: !0,
                list: a.list,
                hasNext: a.hasNext
            });
        } else n.showClickModal(s.msg);
    });
}

function s(t, e, s) {
    var a = {
        offset: e,
        limit: t.state.limit,
        classid: t.state.classId
    };
    s && (a.id = s), o.httpRequest("/business/Information/cate", a, "GET", "v2").then(function(s) {
        if (wx.hideLoading(), "success" === s.result) {
            var a = n.dataListHandle(t, s, t.data.list, e);
            t.store({
                requestStatus: !0,
                list: a.list,
                hasNext: a.hasNext
            });
        } else n.showClickModal(s.msg);
    });
}

function a(t) {
    return o.httpRequest("/business/Information/selected", {}, "GET", "v2").then(function(e) {
        "success" === e.result ? t.store({
            featured: e.results
        }) : n.showClickModal(e.msg);
    }).then(function() {
        e(t, 0, t.data.sortIdx);
    });
}

function i(t) {
    return o.httpRequest("/business/Information/category?pid=0", {}, "GET", "v2").then(function(e) {
        if (a(t), "success" === e.result) {
            for (var s = [], i = [], l = 0; l < e.results.length; l += 1) i.push(e.results[l]), 
            8 !== i.length && l !== e.results.length - 1 || (s.push(i), i = []);
            t.store({
                typeName: s
            });
        } else n.showClickModal(e.msg);
    });
}

function l(t, e, s) {
    var a = t.data.list, i = "/business/Information/showOne?id=" + e;
    o.httpRequest(i, {}, "GET", "v2").then(function(e) {
        if ("success" === e.result) {
            var i = e.results;
            a[s].businessName = i.businessName, a[s].logo = i.logo, a[s].service = i.service, 
            a[s].address = i.address, a[s].views = i.views, a[s].comments = i.comments, t.setData({
                list: a
            });
        }
    });
}

var o = getApp().globalData.utilFun, n = getApp().globalData.commonFun, r = getApp().globalData.dataTempFun;

module.exports = {
    getConfig: t,
    getClassList: i,
    getBusinessList: e,
    getClassBusinesslist: s,
    getSelected: a,
    settleEvent: function(t, a) {
        var i = t.currentTarget.dataset;
        if ("sort" === i.types) {
            if (Number(a.data.sortIdx) === Number(i.index)) return;
            a.store({
                sortIdx: i.index
            }), wx.showLoading({
                title: "加载中...",
                mask: !0
            }), a.state.offset = 0, 5 === Number(i.index) ? n.location(a, "nearby", function(t) {
                a.state.classId ? s(a, 0, i.index) : e(a, 0, i.index);
            }) : a.state.classId ? s(a, 0, i.index) : e(a, 0, i.index);
        } else if ("detail" === i.types) {
            var l = i.id;
            wx.navigateTo({
                url: "/pages/settleIn/pages/storeDetail/storeDetail?id=" + l + "&index=" + i.index
            });
        } else if ("search" === i.types) {
            var o = [ {
                name: "search",
                data: {
                    placeholder: "搜索",
                    type: "settle"
                }
            } ];
            n.setStorage("layout", o), wx.navigateTo({
                url: "/pages/common/pages/search/search"
            });
        } else if ("class" === i.types) {
            var r = i.item;
            r.subClass.length > 0 ? a.store({
                subList: r.subClass,
                showSub: "show"
            }) : wx.navigateTo({
                url: "/pages/settleIn/pages/list/list?id=" + r.id
            });
        } else if ("subClass" === i.types) {
            var u = i.id;
            a.store({
                showSub: "hide"
            }), wx.navigateTo({
                url: "/pages/settleIn/pages/list/list?id=" + u
            });
        } else "close" === i.types ? a.store({
            showSub: "hide"
        }) : "onBackTop" === i.types && n.isscrollToPage(a);
    },
    showLoad: function(e) {
        r.getBanner(e, "settle"), i(e), t(e);
    },
    showLoadEvent: function(t) {
        getApp().globalData.settleUpdateCallback = function(e) {
            var s = t.data.list;
            l(t, s[e].id, e);
        }, getApp().globalData.settleDeleteCallback = function(e) {
            var s = t.data.list;
            s.splice(e, 1), t.setData({
                list: s
            });
        }, getApp().globalData.settlePublishCallback = function() {
            t.state.offset = 0, t.setData({
                list: [],
                sortIdx: 1
            }), e(t, 0, 1), n.isscrollToPage(t);
        };
    },
    settleDataSet: function(t) {
        t.setData({
            banner: [],
            typeName: [],
            sortIdx: 1,
            featured: [],
            list: [],
            subList: [],
            hasNext: !0,
            showGoTop: !1,
            showSub: "hide",
            peise: getApp().globalData.peise,
            requestStatus: !1,
            alterRequestStatus: !0,
            logoPosBottom: !0
        });
    }
};