function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp().globalData.commonFun, a = require("setPage.js"), n = require("showPage.js"), o = require("pullDownPage.js"), i = require("reachPage.js"), s = {
    pageTemp: require("temp.js"),
    userDefTemp: require("../userDefined/temp/userDefined.js"),
    mall: require("../commonPage/mall/shopListTemp.js"),
    mallCart: require("../commonPage/mall/shopCartTemp.js"),
    columnTemp: require("../commonPage/zhuanlan/temp.js"),
    catalog: require("../commonPage/sameCity/temp.js"),
    restaurant: require("../commonPage/dianCan/temp.js"),
    voiceHongbao: require("../commonPage/commandHb/publishHb.js"),
    easyYuyue: require("../commonPage/appointment/temp.js"),
    service: require("../commonPage/yuexpert/temp.js"),
    enter: require("../commonPage/settleIn/temp.js"),
    house: require("../commonPage/house/temp.js"),
    carpooling: require("../commonPage/car/temp.js"),
    bargTemp: require("../commonPage/bargain/temp.js"),
    hotTemp: require("../commonPage/hotel/temp.js")
};

module.exports = {
    buildPage: function() {
        return {
            data: {
                name: "",
                list: [],
                requestStatus: !1,
                contactStatus: !1,
                navRequestStatus: !1,
                iconStatus: !0,
                alterHidden: "hide",
                tankuang: "hide",
                navList: [],
                info: {
                    tankuang: "hide",
                    list: [],
                    swipers: [],
                    activeIndex: 0,
                    tab: "",
                    navStyle: "",
                    temp: [],
                    temp_name: "",
                    zhuanlanList: []
                },
                learndefaultval: "专栏",
                learnSearchMenu: [ "专栏", "单品" ],
                isFixed: !0,
                buybtn: !1,
                dybtn: !1,
                is_edit: !1,
                is_selectAll: !1,
                totalNumber: 0,
                totalMoney: 0,
                selectCount: 0,
                gonggao: {},
                danpinList: [],
                view_type: "normal",
                audeo_play_status: !1,
                windowHeight: 0,
                hbq: "hide",
                isShareHb: 0,
                ishbSet: 0,
                current: 1,
                mall: {
                    seconNav: 0,
                    navList: [],
                    shopData: [],
                    currentTab: 0,
                    order: "",
                    sort: 0
                },
                seconNavL: [],
                seconNavIdx: "",
                isUserDefined: !1,
                cartNum: 0,
                is_hidden: !0,
                orderNum: 1,
                couponData: [],
                currentTab: 0,
                showGoTop: !1,
                scanCodeDiancan: {
                    list: [],
                    alter: [ "hide" ],
                    shopInfo: ""
                },
                kouling: "",
                hasmore: !0,
                peise: getApp().globalData.peise,
                logoPosBottom: !0,
                alterRequestStatus: !1
            },
            state: e({
                pageOnShow: !1,
                isOnReachBottom: !0,
                isonPullDownRefresh: !1,
                offset: 0,
                limit: 10,
                hasmore: !0,
                time: "",
                page_color: "",
                page_bgcolor: "",
                page_title: "",
                page_name: "",
                page_id: 0,
                gonggao_timer: null,
                layoutArrIndex: -1,
                layoutForm: {},
                videos: null,
                key: null,
                categoryid: "",
                upImg: "",
                keywords: "",
                options: {},
                hasLoadCart: !1,
                learnSearchType: "col",
                learnSearchMenu1: [ "col", "digitalcontent" ]
            }, "time", ""),
            tabOffsetTop: null,
            onLoad: function(e) {
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), this.state.options = e, this.config(e), s.pageTemp.pageLoad(this), a.pageData(this, s);
            },
            config: function(e) {},
            onShow: function() {
                n.showData(this, s);
            },
            onUnload: function() {
                this.state.time && clearInterval(this.state.time);
            },
            learnEvent: function(e) {
                s.columnTemp.learnChangeEvent(this, e);
            },
            danpinDetail: function(e) {
                s.columnTemp.openDanpinDetail(e);
            },
            houseEvent: function(e) {
                s.house.eventChange(this, e);
            },
            shopListEvent: function(e) {
                s.mall.shopListChangeEvent(this, e);
            },
            yuyueEvent: function(e) {
                s.easyYuyue.yuyueChangeEvent(this, e);
            },
            serverEvent: function(e) {
                s.service.serverEventCheng(this, e);
            },
            hotelEvent: function(e) {
                s.hotTemp.hotelEventCheng(this, e);
            },
            blurInput: function(e) {
                s.mall.inputBlur(this, e);
            },
            shopCartEvent: function(e) {
                s.mallCart.shopCartChangeEvent(this, e);
            },
            sameCityEvent: function(e) {
                s.catalog.sameCityEvent(this, e);
            },
            dianCanEvent: function(e) {
                s.restaurant.dianCanEvent(this, e);
            },
            settleEvent: function(e) {
                s.enter.settleEvent(e, this);
            },
            carEvent: function(e) {
                s.carpooling.carEventCheng(this, e);
            },
            hbEvent: function(e) {
                s.voiceHongbao.klhbEvent(this, e);
            },
            hbAreaEcent: function(e) {
                s.voiceHongbao.areaEvent(this, e);
            },
            store: function(e) {
                this.setData(e);
            },
            onPullDownRefresh: function() {
                o.pullDownData(this, s);
            },
            onReachBottom: function() {
                i.reachData(this, s);
            },
            scrolltolower: function(e) {
                var t = e.currentTarget.dataset.types;
                this.state.isonPullDownRefresh || this.state.isOnReachBottom && this.state.hasmore && (this.state.offset = this.state.offset + this.state.limit, 
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), "shopList" === t && s.mall.getGoodsList(this.state.offset, this), this.state.isOnReachBottom = !1);
            },
            onShareAppMessage: function(e) {
                var t = this.state.key, a = this, n = this.state.page_name;
                if ("shopList" === n || "newMovement" === n || "list" === n) {
                    var o = "/pages/index/" + t + "/" + t + "?category_id=" + a.state.categoryid;
                    return {
                        title: a.state.page_title,
                        path: o
                    };
                }
                if ("sameCity" === this.state.page_name && "button" === e.from) {
                    var i = a.data.list, s = e.target.dataset.index;
                    return {
                        title: i[s].content.substr(0, 10) + "...",
                        path: "/pages/sameCity/pages/detail/detail?id=" + i[s].id
                    };
                }
                if ("userDefined" === this.state.page_name) {
                    var r = "/pages/index/" + t + "/" + t;
                    return {
                        title: a.state.page_title,
                        path: r
                    };
                }
                return {};
            },
            onPageScroll: function(e) {
                t.scrollIsTabFixed(this, e), t.goTopEvent(this, e.scrollTop);
            }
        };
    }
};