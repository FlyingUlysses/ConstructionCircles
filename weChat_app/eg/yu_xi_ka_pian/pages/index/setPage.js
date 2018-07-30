var e = getApp().globalData.commonFun, a = getApp().globalData.dataTempFun;

module.exports = {
    pageData: function(t, o) {
        var s = e.getStorage("userDefined")[t.state.key];
        s && (t.state.page_name = s.name, t.state.page_title = s.title, t.state.page_id = s.id);
        var n = t.state.page_name, c = t.state.page_title;
        wx.setNavigationBarTitle({
            title: c
        }), e.commonFun(t);
        var l = e.getAccessToken();
        switch (n) {
          case "list":
            l ? a.activityType(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), a.activityType(t);
            };
            break;

          case "userDefined":
          case "defined":
            l ? o.pageTemp.getUserDefined(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.pageTemp.getUserDefined(t);
            }, t.setData({
                isUserDefined: !0
            });
            break;

          case "shequn":
            l ? a.getShequnData(t, 0) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), a.getShequnData(t, 0);
            };
            break;

          case "zhuanlan":
            l ? o.columnTemp.zhuanlanIndex(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.columnTemp.zhuanlanIndex(t);
            };
            break;

          case "zllist":
            l ? o.columnTemp.learnIndex(t, "zhuanlan") : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.columnTemp.learnIndex(t, "zhuanlan");
            };
            break;

          case "dplist":
            l ? o.columnTemp.learnIndex(t, "danpin") : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.columnTemp.learnIndex(t, "danpin");
            };
            break;

          case "album":
            l ? a.albumConfig(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), a.albumConfig(t);
            };
            break;

          case "shopList":
            l ? o.mall.shopListNav(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.mall.shopListNav(t);
            };
            break;

          case "shopCart":
            l ? o.mallCart.cartList(t, 0) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.mallCart.cartList(t, 0);
            };
            break;

          case "my":
            l ? a.showGetUserInfo(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), a.showGetUserInfo(t);
            };
            break;

          case "about":
            a.showAbuotInfo(t);
            break;

          case "newMovement":
            l ? a.newsNavList(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), a.newsNavList(t);
            };
            break;

          case "sameCity":
            l ? o.catalog.config(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.catalog.config(t);
            };
            break;

          case "sameCityPub":
            l ? o.catalog.typeListData(t, 0) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.catalog.typeListData(t, 0);
            };
            break;

          case "dianCan":
            l ? o.restaurant.diancanShow(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.restaurant.diancanShow(t);
            };
            break;

          case "klhb":
            o.voiceHongbao.navColor(t, "klhb");
            break;

          case "hbArea":
            l ? o.voiceHongbao.navColor(t, "hbArea") : getApp().globalData.tokenUpdated = function() {
                o.voiceHongbao.navColor(t, "hbArea");
            };
            break;

          case "from":
            l ? a.formList(t, 0) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), a.formList(t, 0);
            };
            break;

          case "easyYuyue":
            l ? o.easyYuyue.indexData(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.easyYuyue.indexData(t);
            };
            break;

          case "service":
            l ? o.service.getData(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.service.getData(t);
            };
            break;

          case "settle":
            o.enter.settleDataSet(t), l ? o.enter.showLoad(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.enter.showLoad(t);
            };
            break;

          case "house":
            o.house.houseDataSet(t), l ? o.house.indexData(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.house.indexData(t);
            };
            break;

          case "car":
            o.carpooling.carDataSet(t), l ? o.carpooling.getData(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.carpooling.getData(t);
            };
            break;

          case "store":
            l ? a.storeList(t, 0) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), a.storeList(t, 0);
            };
            break;

          case "bargain":
            l ? o.bargTemp.getIndexData(t) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.bargTemp.getIndexData(t);
            };
            break;

          case "hotel":
            o.hotTemp.hotelDataSet(t), l ? o.hotTemp.getData(t, 0) : getApp().globalData.tokenUpdated = function() {
                console.log("update success"), o.hotTemp.getData(t, 0);
            };
        }
        t.store({
            interfaceName: n,
            name: n
        });
    }
};