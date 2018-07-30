function e(e, t, s, a) {
    var u = e.state.limit, o = "/api/house/gethousemessage?types=" + e.state.houseListTyps + "&offset=" + t + "&limit=" + u;
    s && (o += "&key=" + s), a && (o += "&screening=" + a), n.httpRequest(o, {}, "GET", "v2").then(function(s) {
        if ("success" === s.result) {
            var a = i.dataListHandle(e, s, e.data.list, t);
            e.setData({
                list: a.list,
                requestStatus: !0,
                hasNext: a.hasNext
            });
        }
    });
}

function t(t, s) {
    Number(s.index) !== Number(t.data.switch_menus_status) && (wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.state.offset = 0, t.state.houseListTyps = s.index, t.setData({
        switch_menus_status: s.index,
        list: [],
        requestStatus: !1
    }), e(t, 0));
}

function s(e, t) {
    var s = t.detail.value, a = e.data.switch_menus, u = a[s].menu_id;
    e.setData({
        searchtype: u,
        searchdedefaultvalue: a[s].menu_name
    });
}

function a(e, t) {
    1 === Number(t) || 2 === Number(t) || 3 === Number(t) || 4 === Number(t) ? wx.navigateTo({
        url: "/pages/house/pages/list/list?types=" + t
    }) : 5 === Number(t) ? wx.navigateTo({
        url: "/pages/house/pages/agent/agent"
    }) : 6 === Number(t) ? wx.navigateTo({
        url: "/pages/common/pages/stores/stores/stores"
    }) : 7 === Number(t) ? wx.navigateTo({
        url: "/pages/house/pages/publish/publish?isagentStatus=0&isagentid=0"
    }) : 8 === Number(t) && wx.navigateTo({
        url: "/pages/house/pages/publish/publish?isagentStatus=" + e.data.isagent_status + "&isagentid=" + e.data.isagent_id
    });
}

function u(e) {
    if (i.isNull(e.data.searchkey)) i.showTimeToast("请填写关键字"); else {
        var t = e.data.searchtype, s = e.data.searchkey;
        wx.navigateTo({
            url: "/pages/house/pages/list/list?types=" + t + "&key=" + s
        });
    }
}

var n = getApp().globalData.utilFun, i = getApp().globalData.commonFun, o = getApp().globalData.dataTempFun;

module.exports = {
    indexData: function(t) {
        o.getBanner(t, "house"), n.httpRequest("/api/house/menuconf", {}, "GET", "v2").then(function(s) {
            if (wx.hideLoading(), "success" === s.result) {
                var a = "";
                s.switch_menu.length > 0 && (a = s.switch_menu[0].menu_name), t.setData({
                    switch_menus_status: 1,
                    visiblemenus: s.visible_menu,
                    searchdedefaultvalue: a,
                    switch_menus: s.switch_menu
                }), "" !== s.type && (t.state.houseListTyps = s.type, e(t, 0));
            }
        });
    },
    eventChange: function(e, n) {
        var i = n.currentTarget.dataset;
        "nav" === i.types ? t(e, i) : "housesearchInput" === i.types ? e.setData({
            searchkey: n.detail.value
        }) : "housePickerChange" === i.types ? s(e, n) : "houseentermenu" === i.types ? a(e, i.index) : "housesearch" === i.types && u(e);
    },
    pullhousedata: e,
    houseentermenu: a,
    houseDataSet: function(e) {
        e.setData({
            visiblemenus: [],
            switch_menus: [],
            switch_menus_status: 1,
            searchdedefaultvalue: "",
            searchtype: 1,
            searchkey: "",
            peise: getApp().globalData.peise,
            requestStatus: !1,
            alterRequestStatus: !0,
            logoPosBottom: !0
        });
    },
    isagent: function(e, t) {
        var s = {
            phone: i.getStorage("userInfo").phone
        };
        n.httpRequest("/api/house/isagent", s, "GET", "v2").then(function(s) {
            e.setData({
                isagent_status: s.status,
                isagent_id: s.id
            }), t(s);
        });
    }
};