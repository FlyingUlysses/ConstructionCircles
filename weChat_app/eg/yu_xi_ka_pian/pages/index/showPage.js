var a = getApp().globalData.commonFun, e = getApp().globalData.dataTempFun;

module.exports = {
    showData: function(t, s) {
        var o = t.state.page_name;
        getApp().globalData.updateDanpinCallback = function(a) {
            var e = t.data.danpinList;
            s.columnTemp.getDanpinDetail(t, e[a].id, a);
        }, getApp().globalData.updateZhuanlanCallback = function(a) {
            var e = t.data.info;
            s.columnTemp.getZhuanlanDetail(t, e.zhuanlanList[a].id, a);
        }, getApp().globalData.newMovementCallback = function(a) {
            e.getNewsDetail(t, t.data.list[a].id, a);
        }, getApp().globalData.updateHouseList = function() {
            t.state.offset = 0, s.house.pullhousedata(t, 0);
        }, getApp().globalData.updateShequnList = function(a) {
            e.shequnDetail(t, a);
        }, getApp().globalData.gator = function(a) {
            t.state.offset = 0, t.state.condition = a, t.setData({
                currentTab: a.publishType
            }), s.carpooling.getList(t, 0);
        }, getApp().globalData.serviceUpdateData = function(a) {
            s.service.service_getDetail(t, a);
        }, "sameCity" === o && s.catalog.implementShow(t), getApp().globalData.updateBargainList = function(a) {
            s.bargTemp.getDetail(t, a);
        }, "settle" === o && s.enter.showLoadEvent(t), t.state.videos && t.state.videos.pause();
        var n = t.data.info, l = !1;
        switch (t.state.page_name) {
          case "zhuanlan":
            s.userDefTemp.isShowAudeoPlay(t);
            break;

          case "userDefined":
          case "defined":
            n.temp.forEach(function(a) {
                "learn" === a.name && s.userDefTemp.isShowAudeoPlay(t), "shoplist" !== a.name && "shop" !== a.name && "shopSeck" !== a.name && "shopGroup" !== a.name || l || (s.mall.getCartNum(t), 
                l = !0);
            });
            break;

          case "shopCart":
            t.store({
                is_edit: !1,
                is_selectAll: !1,
                totalNumber: 0,
                selectCount: 0,
                totalMoney: 0
            });
            break;

          case "house":
            s.house.isagent(t);
        }
        if (t.state.pageOnShow) {
            if ("hbArea" === t.state.page_name) return void (-1 !== getApp().globalData.hbcDetailIndex && s.voiceHongbao.getDetails(t));
            switch (t.state.offset = 0, t.state.page_name) {
              case "my":
                e.showGetUserInfo(t);
                break;

              case "userDefined":
              case "defined":
                -1 !== t.state.layoutArrIndex && (n.temp[t.state.layoutArrIndex].data.myInfo = a.getStorage("userInfo")), 
                t.store({
                    info: n
                }), wx.setNavigationBarTitle({
                    title: t.state.page_title
                });
                break;

              case "shopList":
                s.mall.getCartNum(t);
                break;

              case "shopCart":
                s.mallCart.cartList(t, 0);
            }
        }
    }
};