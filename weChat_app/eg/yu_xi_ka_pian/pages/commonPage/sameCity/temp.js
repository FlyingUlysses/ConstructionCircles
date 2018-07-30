function t(t, a, e) {
    a += "&istitle=" + f.getStorage("config").catalog.isTitle, m.httpRequest(a).then(function(a) {
        var i = f.dataListHandle(t, a, t.data.list, e);
        i.list.forEach(function(t, a) {
            i.list[a].uid = f.getStorage("userInfo").id, t.hasOwnProperty("content") && (t.content.length > 100 ? i.list[a].isMore = !0 : i.list[a].isMore = !1);
        }), t.setData({
            list: i.list,
            requestStatus: !0,
            hasNext: i.hasNext
        }), wx.hideLoading(), wx.stopPullDownRefresh();
    });
}

function a(t, a, e) {
    var i = "";
    return 0 === Number(e) && (i = "/hdh/" + getApp().globalData.acid + "/catalogthread/?filter=all&limit=" + t.state.limit + "&offset=" + a), 
    1 === Number(e) && (i = "/hdh/" + getApp().globalData.acid + "/catalogthread/?filter=all&order=nearby&limit=" + t.state.limit + "&offset=" + a), 
    2 === Number(e) && (i = "/hdh/" + getApp().globalData.acid + "/catalogthread/?filter=me&order=recent&limit=" + t.state.limit + "&offset=" + a), 
    i;
}

function e(e, i, s) {
    t(e, a(e, i, s), i);
}

function i(t) {
    var a = "/hdh/" + getApp().globalData.acid + "/catalogp/?offset=0&limit=100";
    m.httpRequest(a).then(function(a) {
        var e = [], i = [];
        a.results.forEach(function(t, s) {
            i.push(t), 8 !== i.length && s !== a.results.length - 1 || (e.push(i), i = []);
        }), t.store({
            typeName: e,
            navRequestStatus: !0
        });
    });
}

function s(t) {
    var a = "catalog/" + getApp().globalData.acid + "/count/";
    m.httpRequest(a).then(function(a) {
        t.store({
            sameCityStat: a
        });
    });
}

function l(t) {
    h.getBanner(t, "catalog"), i(t), f.configData("catalog", function() {
        f.commonFun(t);
        var a = f.getStorage("config").catalog;
        a.module ? (1 === Number(a.isTitle) ? t.state.limit = 20 : t.state.limit = 5, e(t, 0, t.data.currentTab), 
        1 === Number(a.isStat) && s(t)) : f.showClickModal(a.msg);
    });
}

function n(t, a) {
    var i = t.data.currentTab;
    Number(i) !== Number(a) && (wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.setData({
        currentTab: Number(a),
        list: [],
        requestStatus: !1
    }), t.state.offset = 0, t.state.isOnReachBottom = !1, 1 === Number(a) ? f.location(t, "nearby", function(i) {
        e(t, 0, a);
    }) : e(t, 0, a));
}

function o(t, a, e, i) {
    var s = "/catalogthread/" + a + "/delete/";
    m.httpRequest(s, {}, "PUT").then(function(a) {
        wx.showModal({
            title: "提示",
            content: "删除成功",
            showCancel: !1,
            success: function(a) {
                var e = t.state.options;
                e.hasOwnProperty("index") && getApp().globalData.sameCityDeleteCallback(e.index), 
                wx.navigateBack({});
            }
        });
    }).catch(function(t) {
        wx.showModal({
            title: "提示",
            content: t.msg,
            showCancel: !1,
            success: function(t) {}
        });
    });
}

function c(t, a, e) {
    var i = t.data.myInfo.id;
    if (Number(a.uid) === Number(i) || t.data.detail.is_admin) {
        var s = [ "删除", "编辑", "置顶" ];
        t.data.detail.catalog.name || (s = [ "删除" ]), t.data.detail.is_top && (s = [ "删除", "编辑" ], 
        t.data.detail.catalog.name || (s = [ "删除" ])), wx.showActionSheet({
            itemList: s,
            success: function(i) {
                if (0 === Number(i.tapIndex)) o(t, a.id, e, a.index); else if (1 === Number(i.tapIndex)) wx.navigateTo({
                    url: "/pages/sameCity/pages/publish/publish?detailId=" + t.data.detail.id + "&id=" + t.data.detail.catalog.id + "&delta=1"
                }); else if (2 === Number(i.tapIndex)) {
                    var s = t.data.detail;
                    wx.navigateTo({
                        url: "/pages/sameCity/pages/zhiDing/zhiDing?delta=1&id=" + s.id + "&catalogid=" + s.catalog.id
                    });
                }
            }
        });
    } else wx.showActionSheet({
        itemList: [ "举报" ],
        success: function(t) {
            0 === Number(t.tapIndex) && wx.navigateTo({
                url: "/pages/sameCity/pages/report/report?delta=1&id=" + a.id
            });
        }
    });
}

function d(t, a, e) {
    var i = t.data.list, s = "/catalogthread/" + a + "/";
    m.httpRequest(s).then(function(a) {
        i[e].content = a.content, i[e].view_count = a.view_count, i[e].comment_count = a.comment_count, 
        i[e].is_like = a.is_like, i[e].like_count = a.like_count, i[e].is_top = a.is_top, 
        i[e].title = a.title, t.setData({
            list: i
        });
    });
}

function r(t, a, e, i, s) {
    var l = t.data.list;
    "list" !== e || "normal" === l[s].status ? (wx.showLoading({
        title: "",
        mask: !0
    }), f.wxAuthorize(t, function(l) {
        if (l) {
            var n = "";
            n = 0 === Number(a) ? "/catalogthread/" + i + "/like/delete/" : "/catalogthread/" + i + "/like/", 
            m.httpRequest(n, {}, "PUT").then(function(a) {
                wx.hideLoading(), "success" === a.result ? "list" === e ? d(t, i, s) : t.sameCityDetail(i) : f.showClickModal(a.msg);
            });
        }
    })) : f.showClickModal("该状态无法操作！");
}

function u(t, a) {
    "normal" !== t.data.list[a.index].status && f.showClickModal("该状态无法操作！");
}

function g(t, a) {
    var e = t.data.list;
    e[a.index].isMore = !1, t.setData({
        list: e
    });
}

function p(t, a) {
    var e = t.data.list;
    e[a.index].isMore = !0, t.setData({
        list: e
    });
}

var f = getApp().globalData.commonFun, h = getApp().globalData.dataTempFun, m = getApp().globalData.utilFun;

module.exports = {
    config: l,
    sameCityCount: s,
    sameCityEvent: function(t, a) {
        var e = a.currentTarget.dataset;
        if ("switchNav" === e.types) n(t, e.current); else if ("zhiding" === e.types) wx.navigateTo({
            url: "/pages/sameCity/pages/zhiDing/zhiDing?delta=1&id=" + e.id + "&catalogid=" + e.catalogid
        }); else if ("search" === e.types) {
            var i = [ {
                name: "search",
                data: {
                    placeholder: "搜索",
                    type: "catalog"
                }
            } ];
            f.setStorage("layout", i), wx.navigateTo({
                url: "/pages/common/pages/search/search"
            });
        } else if ("call" === e.types) f.phoneCall(e.phone); else if ("event" === e.types) c(t, e, "list"); else if ("dianzan" === e.types) r(t, e.status, "list", e.pubid, e.index); else if ("share" === e.types) u(t, e); else if ("detail" === e.types) wx.navigateTo({
            url: "/pages/sameCity/pages/detail/detail?id=" + e.id + "&index=" + e.index
        }); else if ("bigImg" === e.types) {
            var s = t.data.list[e.index].attachments, l = e.url;
            f.seeBigImg(2, l, s);
        } else if ("address" === e.types) f.openMap(e.lat, e.lng); else if ("publish" === e.types) wx.navigateTo({
            url: "/pages/sameCity/pages/classify/classify"
        }); else if ("onBackTop" === e.types) f.isscrollToPage(t); else if ("openWindow" === e.types) f.openUrl(e, t); else if ("liexing" === e.types) wx.navigateTo({
            url: "/pages/sameCity/pages/list/list?id=" + e.id + "&typesid=" + e.typesid
        }); else if ("zhankaiMore" === e.types) g(t, e); else if ("yincangMore" === e.types) p(t, e); else if ("openPub" === e.types) {
            var o = t.data.list;
            o[e.index].sub_catalogs.length > 0 ? wx.navigateTo({
                url: "/pages/sameCity/pages/classify2/classify2?id=" + o[e.index].id
            }) : wx.navigateTo({
                url: "/pages/sameCity/pages/publish/publish?delta=2&id=" + o[e.index].id
            });
        }
    },
    listDataFirst: e,
    tcDetail: d,
    listData: t,
    showActionSheetEvent: c,
    implementShow: function(t) {
        getApp().globalData.sameCityCallback = function() {
            l(t), t.state.offset = 0;
        }, getApp().globalData.sameCityUpdateCallback = function(a) {
            var e = t.data.list;
            d(t, e[a].id, a);
        }, getApp().globalData.sameCityDeleteCallback = function(a) {
            var e = t.data.list;
            e.splice(a, 1), t.setData({
                list: e
            });
        }, getApp().globalData.sameCityPublishCallback = function(a) {
            t.state.offset = 0, t.setData({
                list: [],
                currentTab: a,
                requestStatus: !1
            }), e(t, 0, 2), f.isscrollToPage(t);
        };
    },
    dianzanPub: r,
    typeListData: function(t, a) {
        f.configData("catalog", function() {
            var e = f.getStorage("config").catalog;
            if (e.module) {
                var i = "/hdh/" + getApp().globalData.acid + "/catalog/?offset=0&limit=100";
                m.httpRequest(i).then(function(e) {
                    var i = f.dataListHandle(t, e, t.data.list, a);
                    t.setData({
                        list: i.list,
                        requestStatus: !0,
                        config: f.getStorage("config")
                    }), wx.hideLoading();
                });
            } else f.showClickModal(e.msg);
        });
    }
};