var t = getApp().globalData.dataTempFun;

module.exports = {
    reachData: function(e, s) {
        if (!e.state.isonPullDownRefresh && e.state.isOnReachBottom && e.state.hasmore) switch (e.data.name) {
          case "newMovement":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, t.newMovementList(e, e.state.offset), e.state.isOnReachBottom = !1;
            break;

          case "list":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, t.actList(e.state.offset, e), e.state.isOnReachBottom = !1;
            break;

          case "album":
            if (wx.showLoading({
                title: "加载中...",
                mask: !0
            }), "slide" === e.data.view_type) return;
            e.state.offset += e.state.limit, t.albumList(e, e.state.offset), e.state.isOnReachBottom = !1;
            break;

          case "shequn":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, t.getShequnData(e, e.state.offset), e.state.isOnReachBottom = !1;
            break;

          case "zllist":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.columnTemp.zlList(e, e.state.offset), e.state.isOnReachBottom = !1;
            break;

          case "dplist":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.columnTemp.dplist(e, e.state.offset), e.state.isOnReachBottom = !1;
            break;

          case "shopList":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.mall.getGoodsList(e.state.offset, e), e.state.isOnReachBottom = !1;
            break;

          case "sameCity":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.catalog.listDataFirst(e, e.state.offset, e.data.currentTab), 
            e.state.isOnReachBottom = !1;
            break;

          case "dianCan":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += 5, s.restaurant.getData(e, e.state.offset), e.state.isOnReachBottom = !1;
            break;

          case "hbArea":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.voiceHongbao.areaData(e, e.state.offset);
            break;

          case "from":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, t.formList(e, e.state.offset);
            break;

          case "settle":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.enter.getBusinessList(e, e.state.offset, e.data.sortIdx);
            break;

          case "house":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.house.pullhousedata(e, e.state.offset);
            break;

          case "car":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.carpooling.getList(e, e.state.offset);
            break;

          case "service":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.service.getList(e, e.state.offset);
            break;

          case "bargain":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.bargTemp.getIndexList(e, e.state.offset);
            break;

          case "store":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, t.storeList(e, e.state.offset);
            break;

          case "hotel":
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), e.state.offset += e.state.limit, s.hotTemp.getList(e, e.state.offset);
            break;

          default:
            wx.hideLoading();
        }
    }
};