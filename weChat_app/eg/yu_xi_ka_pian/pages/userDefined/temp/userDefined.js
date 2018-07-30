function t(t, e) {}

function e(t) {
    var e = this.data.info, a = t.target.dataset.index, o = t.target.dataset.imgindex, i = t.target.dataset.types;
    if (0 === Number(o)) {
        var n = wx.getSystemInfoSync().windowWidth;
        n && Number(n) > 0 && ("w" === i && e.temp[a].data.list.forEach(function(t, o) {
            e.temp[a].data.list[o].width *= Number(n) / 320;
        }), e.temp[a].data.height *= Number(n) / 320);
    }
    this.store({
        info: e
    });
}

var a = getApp().globalData.commonFun, o = getApp().globalData.utilFun;

module.exports = {
    getLayout: function(i, n, s) {
        var u = "/uipage/" + n + "/detail/";
        o.httpRequest(u).then(function(o) {
            if (o.hasOwnProperty("id")) {
                var n = o.layout;
                a.setStorage("layout", o.layout), i.state.page_color = o.color, i.state.page_bgcolor = o.bgcolor, 
                i.state.page_title = o.title, wx.setNavigationBarTitle({
                    title: o.title
                }), i.state.pageOnShow = !0;
                var u = i.data.info;
                u.bgcolor = o.bgcolor, u.bgimg = o.bgimg, t(o.color, o.bgcolor), s(n);
            }
            i.slideimgsImgLoad = e;
        }).catch(function(t) {
            a.prompt(t.statusCode, t.message);
        });
    },
    submitForm: function(t, e, o) {
        var i = e.name, n = e.phone, s = e.custom1, u = e.custom2;
        return a.isNull(i) ? void a.showTimeToast("请填写名称") : a.isNull(n) ? void a.showTimeToast("请填写电话") : 1 === t.open1 && a.isNull(s) ? void a.showTimeToast("请填写" + t.name1) : 1 === t.open2 && a.isNull(u) ? void a.showTimeToast("请填写" + t.name2) : void o(e);
    },
    reportFuc: function(t, e) {
        wx.showLoading({
            title: "信息提交中...",
            mask: !0
        });
        var i = "/uipage/" + e + "/form/";
        o.httpRequest(i, t, "POST").then(function(t) {
            wx.hideLoading(), "success" === t.result ? a.showClickModal("信息提交成功！") : a.showClickModal(t.msg);
        });
    },
    setNavigationBarColor: t,
    isShowAudeoPlay: function(t) {
        if (wx.getBackgroundAudioManager) {
            var e = wx.getBackgroundAudioManager();
            !1 === e.paused || 0 === e.paused ? t.setData({
                audeo_play_status: !0
            }) : t.setData({
                audeo_play_status: !1
            }), e.onPause(function() {
                console.log("onPause"), t.setData({
                    audeo_play_status: !1
                });
            }), e.onPlay(function() {
                console.log("onPlay"), t.setData({
                    audeo_play_status: !0
                });
            }), e.onEnded(function(e) {
                console.log("onEnded"), t.setData({
                    audeo_play_status: !1
                });
            });
        }
    },
    getCountDown: function(t, e) {
        e.state.time = setInterval(function() {
            t.forEach(function(i, n) {
                if (i.hasOwnProperty("seckilling")) {
                    var s = i.price + "", u = i.seckilling.price + "";
                    t[n].chaPrice = (Number(s) - Number(u)).toFixed(2);
                    var l = u.split(".");
                    t[n].seckilling.price1 = l[0], t[n].seckilling.price2 = "00", 2 === l.length && (t[n].seckilling.price2 = l[1]);
                    var r = i.seckilling.applicable_condition.valid_from, c = o.formatTimeStamp(r), d = Date.parse(new Date());
                    if (t[n].tiemStatus = 0, Number(c - d) > 0) t[n].tiemStatus = 1; else {
                        var g = a.timeCountDown(e, i.seckilling.applicable_condition.valid_through);
                        0 === Number(g.hour) && 0 === Number(g.minute) && 0 === Number(g.second) ? (t[n].tiemStatus = 2, 
                        t[n].seckilling.stock_count = 0) : (t[n].day = g.day, t[n].hour = g.hour, t[n].minute = g.minute, 
                        t[n].second = g.second);
                    }
                }
            }), e.store({
                msList: t
            });
        }, 1e3);
    }
};