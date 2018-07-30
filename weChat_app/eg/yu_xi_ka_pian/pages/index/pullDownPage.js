var e = getApp().globalData.commonFun, a = getApp().globalData.dataTempFun;

module.exports = {
    pullDownData: function(t, s) {
        if (t.state.isonPullDownRefresh = !0, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), e.hdhInfo(), t.state.offset = 0, t.state.hasmore = !0, wx.stopPullDownRefresh(), 
        "klhb" !== t.state.page_name) switch (t.state.page_name) {
          case "userDefined":
          case "defined":
            t.state.time && clearInterval(t.state.time), s.pageTemp.getUserDefined(t);
            break;

          case "list":
            t.state.isRefresh = !0, a.activityType(t);
            break;

          case "newMovement":
            a.newMovementList(t, 0);
            break;

          case "shequn":
            a.getShequnData(t, 0);
            break;

          case "zhuanlan":
            s.columnTemp.zhuanlanIndex(t);
            break;

          case "zllist":
            s.columnTemp.zlList(t, 0);
            break;

          case "dplist":
            s.columnTemp.dplist(t, 0);
            break;

          case "shopList":
            s.mall.getGoodsList(0, t), s.mall.getCartNum(t);
            break;

          case "shopCart":
            s.mallCart.cartList(t, 0);
            break;

          case "sameCity":
            s.catalog.config(t);
            break;

          case "sameCityPub":
            s.catalog.typeListData(t, 0);
            break;

          case "dianCan":
            s.restaurant.diancanShow(t);
            break;

          case "hbArea":
            s.voiceHongbao.areaData(t, 0);
            break;

          case "from":
            a.formList(t, 0);
            break;

          case "easyYuyue":
            s.easyYuyue.indexData(t);
            break;

          case "service":
            s.service.getData(t);
            break;

          case "settle":
            s.enter.showLoad(t);
            break;

          case "my":
            a.showGetUserInfo(t);
            break;

          case "house":
            s.house.indexData(t);
            break;

          case "car":
            t.state.startPoint = "", t.state.endPoint = "", t.state.startTime = "", t.state.viaPoint = "", 
            t.state.peopleNum = "", s.carpooling.getData(t);
            break;

          case "bargain":
            s.bargTemp.getIndexData(t);
            break;

          case "store":
            a.storeList(t, 0);
            break;

          case "hotel":
            t.state.keysearch = "", s.hotTemp.getList(t, 0);
            break;

          default:
            wx.hideLoading();
        } else wx.hideLoading();
    }
};