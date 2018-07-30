function t(t, a) {
    var n = t.state.condition;
    n.offset = a, n.limit = t.state.limit, e.httpRequest("/api/CarPublish/get", n, "POST", "v2").then(function(e) {
        if ("success" === e.result) {
            var n = s.dataListHandle(t, e, t.data.list, a);
            t.setData({
                list: n.list,
                requestStatus: !0,
                hasNext: n.hasNext
            });
        } else s.showClickModal(e.msg);
        wx.hideLoading();
    });
}

function a(a, e) {
    var s = e.currentTarget.dataset.idx;
    if (Number(s) !== Number(a.data.currentTab)) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), a.setData({
            currentTab: s,
            list: [],
            requestStatus: !1
        });
        var n = {
            publishType: s,
            startPoint: "",
            endPoint: "",
            startTimeStart: "",
            startTimeEnd: "",
            viaPoint: "",
            peopleNum: ""
        };
        a.state.condition = n, a.state.offset = 0, t(a, 0);
    }
}

var e = getApp().globalData.utilFun, s = getApp().globalData.commonFun, n = getApp().globalData.dataTempFun;

module.exports = {
    getData: function(a) {
        n.getBanner(a, "car"), t(a, 0), n.getgg(a, 1, 29, !0);
    },
    carEventCheng: function(t, e) {
        var n = e.currentTarget.dataset;
        if ("calling" === n.types) {
            var i = n.index;
            s.phoneCall(t.data.list[i].mobile);
        } else "navbarTap" === n.types && a(t, e);
    },
    getconfiger: function(t, a) {
        e.httpRequest("/api/CarCommon/getConfig", {}, "GET", "v2").then(function(t) {
            a(t);
        });
    },
    getTopData: function(t, a) {
        a.detail.value ? (t.setData({
            Top: 1
        }), e.httpRequest("/api/CarCommon/getTop", {}, "GET", "v2").then(function(a) {
            var e = [], s = [];
            a.results.forEach(function(t, n) {
                e.push(a.results[n].topName), s.push({
                    money: a.results[n].topMoney,
                    id: a.results[n].id
                });
            }), t.setData({
                arraytime: e,
                arrmoney: s
            });
        })) : t.setData({
            Top: 0
        });
    },
    getList: t,
    carDataSet: function(t) {
        t.setData({
            navbar: [ "全部", "人找车", "车找人" ],
            configs: [],
            Notice: "",
            peise: getApp().globalData.peise,
            requestStatus: !1,
            alterRequestStatus: !0,
            logoPosBottom: !0
        }), t.state.condition = {};
    }
};