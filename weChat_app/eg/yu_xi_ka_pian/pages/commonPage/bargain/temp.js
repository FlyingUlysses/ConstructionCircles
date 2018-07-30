function t(t, e) {
    e.state.time = setInterval(function() {
        t.forEach(function(t, a) {
            if (1 === Number(t.goodsStatus) || 2 == Number(t.goodsStatus)) {
                var s = "";
                1 === Number(t.goodsStatus) && (s = n.timeCountDown(e, t.endTime, "")), 2 === Number(t.goodsStatus) && (s = n.timeCountDown(e, t.startTime, ""));
                var u = t.startTime, i = o.formatTimeStamp(u), r = Date.parse(new Date()), d = 0;
                1 === Number(t.goodsStatus) && (d = i - r), 2 === Number(t.goodsStatus) && (d = r - i), 
                Number(d) > 0 ? t.goodsStatus = 3 : Number(s.hour) <= 0 && Number(s.minute) <= 0 && Number(s.second) <= 0 ? t.goodsStatus = 3 : (t.day = s.day, 
                t.hour = s.hour, t.minute = s.minute, t.second = s.second);
            }
        }), e.setData({
            cutDownList: t
        });
    }, 1e3);
}

function e(e, a) {
    clearInterval(e.state.time);
    var s = "/api/BargainGoods/get?offset=" + a + "&limit=" + e.state.limit, u = e.state.typeId;
    u && u > 0 && (s += "&cateId=" + u);
    var i = [];
    o.httpRequest(s, {}, "GET", "v2").then(function(s) {
        var o = n.dataListHandle(e, s, e.data.list, a);
        o.list.forEach(function(t) {
            i.push({
                endTime: t.endTime,
                startTime: t.startTime,
                goodsStatus: t.goodsStatus
            });
        }), e.store({
            list: o.list,
            requestStatus: !0,
            hasNext: o.hasNext
        }), t(i, e), wx.hideLoading();
    });
}

function a(t) {
    o.httpRequest("/api/BargainCommon/getCate", {}, "GET", "v2").then(function(e) {
        var a = e.results, s = [], o = [];
        a.forEach(function(t, e) {
            o.push(t), 8 !== o.length && e !== a.length - 1 || (s.push(o), o = []);
        }), t.setData({
            navList: s
        });
    });
}

function s(t) {
    o.httpRequest("/api/BargainCommon/getConfig", {}, "GET", "v2").then(function(e) {
        t(e.results);
    });
}

var o = getApp().globalData.utilFun, n = getApp().globalData.commonFun, u = getApp().globalData.dataTempFun;

module.exports = {
    getIndexData: function(t) {
        u.getBanner(t, "bargain"), e(t, 0), a(t), s();
    },
    getIndexList: e,
    bargainConfig: s,
    getDetail: function(t, e) {
        var a = t.data.list, s = "/api/BargainGoods/get?id=" + a[e].id;
        o.httpRequest(s, {}, "GET", "v2").then(function(s) {
            "success" === s.result && (a[e].showType = s.results.showType, a[e].goodsStatus = s.results.goodsStatus, 
            a[e].header = s.results.header, a[e].joinPeople = s.results.joinPeople, t.setData({
                list: a
            }));
        });
    }
};