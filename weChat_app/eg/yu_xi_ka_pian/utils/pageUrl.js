module.exports = {
    tiaoZhuan: function(e, a, s, n) {
        console.log(JSON.stringify(e));
        var p = {
            hdl: "/pages/activity/pages/list/list",
            my: "/pages/common/pages/my/my",
            about: "/pages/common/pages/about/about",
            sql: "/pages/shequn/pages/shequnList/shequnList",
            col: "/pages/zhuanlan/pages/index/index",
            zllist: "/pages/zhuanlan/pages/zhuanlanList/zhuanlanList",
            dplist: "/pages/zhuanlan/pages/danpinList/danpinList",
            news: "/pages/newMovement/pages/newMovement/newMovement",
            album: "/pages/album/pages/albumList/albumList",
            shop: "/pages/mall/pages/shopList/shopList",
            coupon: "/pages/market/pages/coupon/myCoupon/myCoupon",
            resh: "/pages/market/pages/recharge/index/index",
            tc: "/pages/sameCity/pages/index/index",
            tcm: "/pages/sameCity/pages/classify1/classify1",
            dch: "/pages/dianCan/pages/index/index",
            dc: "/pages/dianCan/pages/saomaDiancan/saomaDiancan?enterWay=wm",
            drp: "/pages/market/pages/extension/extensionCenter/extensionCenter",
            hbArea: "/pages/commandHb/pages/hbArea/hbArea",
            phb: "/pages/commandHb/pages/publishHb/publishHb",
            fromL: "/pages/form/pages/form/form",
            ppd: "/pages/market/pages/integral/integralShop/integralShop",
            myPoint: "/pages/market/pages/integral/myIntegral/myIntegral",
            appointment: "/pages/appointment/pages/appointment/appointment",
            linePay: "/pages/common/pages/underlineCheck/underlineCheck",
            house: "/pages/house/pages/index/index",
            car: "/pages/car/pages/index/index",
            settle: "/pages/settleIn/pages/index/index",
            store: "/pages/common/pages/stores/stores/stores",
            service: "/pages/service/pages/index/index",
            bargain: "/pages/bargain/pages/index/index",
            hotel: "pages/hotel/pages/index/index"
        }, t = {
            page: "/pages/userDefined/userDefined0/userDefined0?userDefined=",
            wd: "/pages/common/pages/lhkjWallet/lhkjWallet?withdraw_no=",
            sq: "/pages/shequn/pages/shequn/shequn?shequnId=",
            hdn: "/pages/activity/pages/list/list",
            newsn: "/pages/newMovement/pages/newMovement/newMovement",
            album: "/pages/album/pages/photoDetailList/photoDetailList?albumId=",
            shop: "/pages/mall/pages/shopDetail/shopDetail?&productId=",
            shopn: "/pages/mall/pages/shopList/shopList",
            drp: "/pages/market/pages/extension/extensionCenter/extensionCenter?uid=",
            hd: "/pages/activity/pages/activityDetail/activityDetail?isODOpen=0&id=",
            col: "/pages/zhuanlan/pages/zhuanlanDetail/zhuanlanDetail?zhuanlanId=",
            tw: "/pages/zhuanlan/pages/danpinTuwenDetail/danpinTuwenDetail?danpinId=",
            sp: "/pages/zhuanlan/pages/danpinVideoDetail/danpinVideoDetail?danpinId=",
            yp: "/pages/zhuanlan/pages/danpinAudeoDetail/danpinAudeoDetail?danpinId=",
            news: "/pages/newMovement/pages/newsDetail/newsDetail?newsId=",
            tcd: "/pages/sameCity/pages/detail/detail?id=",
            tct: "/pages/sameCity/pages/list/list?id=",
            sqt: "/pages/shequn/pages/dongTaiDetail/dongTaiDetail?shequnId=",
            coupon: "/pages/market/pages/coupon/couponDetail/couponDetail?pageGo=0&id=",
            hb: "/pages/commandHb/pages/receiveHb/receiveHb?id=",
            dc: "/pages/dianCan/pages/saomaDiancan/saomaDiancan?enterWay=dc&id=",
            fromD: "/pages/form/pages/formDetail/formDetail?formid=",
            ppd: "/pages/market/pages/integral/shopDetail/shopDetail?id=",
            resh: "/pages/market/pages/recharge/balanceRecharge/balanceRecharge?id=",
            appointment: "/pages/appointment/pages/Reservation/Reservation?imd=",
            houseList: "/pages/house/pages/list/list?types=",
            houseDetail: "/pages/house/pages/detail/detail?id=",
            car: "/pages/car/pages/detail/detail?id=",
            settleDetail: "/pages/settleIn/pages/storeDetail/storeDetail?id=",
            store: "/pages/common/pages/stores/storesDetail/storesDetail?id=",
            service: "/pages/service/pages/personal/personal?idx=",
            bargain: "/pages/bargain/pages/detail/detail?id=",
            hotel: "pages/hotel/pages/Hoteldetails/Hoteldetails?hotelid=",
            wUrl: "/pages/webview/webview?url="
        }, i = void 0;
        if (1 === e.length) i = p[e[0]]; else if (2 === e.length) switch (e[0]) {
          case "all":
            i = e[1];
            break;

          case "hdn":
            i = t[e[0]], getApp().globalData.hdcategoryId = e[1];
            break;

          case "newsn":
            i = t[e[0]], getApp().globalData.newscategoryId = e[1];
            break;

          case "shopn":
            i = t[e[0]], getApp().globalData.mallcategoryId = e[1];
            break;

          case "tct":
            2 === e.length && e.push(e[1]), i = t[e[0]] + e[1] + "&typesid=" + e[2];
            break;

          default:
            i = t[e[0]] + e[1];
        } else switch (i = t[e[0]] + e[1], e[0]) {
          case "sqt":
            i += "&threadId=" + e[2];
            break;

          case "tct":
            i += "&typesid=" + e[2];
            break;

          case "wb":
          case "web":
            i = "goldeggs" === e[1] ? "/pages/market/pages/eggs/eggs/index?id=" + e[2] : "turntable" === e[1] ? "/pages/market/pages/lottery/index/index?id=" + e[2] : "/pages/market/pages/dial/index?id=" + e[2];
            break;

          default:
            i += "&uid=" + e[2];
        }
        return i;
    }
};