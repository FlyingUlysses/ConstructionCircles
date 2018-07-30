var t = getApp().globalData.commonFun, e = getApp().globalData.utilFun, a = getApp().globalData.dataTempFun, s = require("./temp.js");

Page({
    data: {
        interfaceName: "commentShop",
        contactStatus: !0,
        startStatus: !1,
        contentStatus: !0,
        shopImgUrl: "",
        peise: getApp().globalData.peise,
        imgStatus: !1,
        nmVal: 0,
        imgList: [],
        gradeImg: [ "https://www.haojian.cn/wximg/mall/star_def.png", "https://www.haojian.cn/wximg/mall/star_def.png", "https://www.haojian.cn/wximg/mall/star_def.png", "https://www.haojian.cn/wximg/mall/star_def.png", "https://www.haojian.cn/wximg/mall/star_def.png" ]
    },
    state: {
        imgList_p: [],
        starNum: 0,
        anonymous: !1,
        options: {}
    },
    onLoad: function(e) {
        t.commonFun(this), this.state.options = e, this.state.productId = e.id, this.state.type = e.type;
        var a = this.data.startStatus, s = this.data.contentStatus, n = this.data.imgStatus;
        ("tcDetail" === e.type && 1 === Number(e.ispoint) || "newsDetail" === e.type && 1 === Number(e.ispoint) || "shop" === e.type || "activity" === e.type || "settleIn" === e.type || "bargain" === e.type) && (a = !0, 
        n = !0), "service" === e.type && (a = !0, s = !1), "hotel" === e.type && (a = !0, 
        s = !0, n = !0), this.setData({
            startStatus: a,
            contentStatus: s,
            imgStatus: n,
            shopImgUrl: t.getStorage("commentImgUrl")
        });
    },
    onUnload: function() {
        var t = this.state.options;
        t.hasOwnProperty("index") && ("service" === this.state.type && getApp().globalData.updateServiceOrderStatus(t.index), 
        "bargain" === this.state.type && getApp().globalData.updateBargainOrder("", t.index, "comment"), 
        "hotel" === this.state.type && getApp().globalData.hotelOrderComment(t.index)), 
        wx.removeStorageSync("commentImgUrl");
    },
    selNIming: function(t) {
        var e = t.currentTarget.dataset.isnm;
        1 === e ? (e = 0, this.state.anonymous = !1) : (e = 1, this.state.anonymous = !0), 
        this.store({
            nmVal: e
        });
    },
    sendComment: function(a) {
        var s = this, n = a.detail.value.desc, i = this.state.starNum, o = "";
        if (this.data.startStatus && 0 === Number(i)) t.showTimeToast("请选择评分等级"); else if (this.data.contentStatus && t.isNull(n) && 0 === s.state.imgList_p.length) t.showTimeToast("请填写评价内容"); else {
            var m = {
                wx_form_id: a.detail.formId,
                content: n,
                attachments: s.state.imgList_p,
                rating: Number(2 * i),
                anonymous: s.state.anonymous
            }, r = "/product/" + s.state.productId + "/comment/";
            m.type = "shop", m.did = s.state.productId, "activity" === s.state.type ? (r = "/activity/" + s.state.productId + "/comment/", 
            m.type = "activity") : "newsDetail" === s.state.type ? (r = "/news/" + s.state.productId + "/comment/", 
            m.type = "newsDetail") : "tcDetail" === s.state.type ? (r = "/catalogthread/" + s.state.productId + "/comment/", 
            m.type = "tcDetail") : "settleIn" === s.state.type ? (o = "v2", r = "/business/Information/comment", 
            m.id = s.state.productId, delete m.type, delete m.did) : "service" === s.state.type ? (r = "/api/ExpertToClient/makeGrade", 
            o = "v2", m.type = "service") : "bargain" === s.state.type ? (r = "/api/BargainOrder/comment", 
            o = "v2", m.type = "bargain") : "hotel" === s.state.type && (r = "/api/HotelToClient/comments", 
            o = "v2", m.type = "hotel"), wx.showLoading({
                title: "",
                mask: !0
            }), e.httpRequest(r, m, "POST", o).then(function(e) {
                if (wx.hideLoading(), "success" === e.result) {
                    var a = "评价成功";
                    e.hasOwnProperty("comment") && "wait_confirm" === e.comment.status && (a = "评论已提交，等待审核！"), 
                    wx.showModal({
                        title: "提示",
                        content: a,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                } else t.showClickModal(e.msg);
            });
        }
    },
    store: function(t) {
        this.setData(t);
    },
    uploadImgs: function() {
        s.uploadImgs(this, 9 - this.data.imgList.length);
    },
    removeImg: function(t) {
        s.removeImg(t, this);
    },
    changestar: function(t) {
        var e = this.data.gradeImg, a = t.currentTarget.dataset.index;
        this.state.starNum = Number(a) + 1;
        for (var s = 0; s < e.length; s += 1) e[s] = "https://www.haojian.cn/wximg/mall/star_def.png";
        for (var n = 0; n <= a; n += 1) e[n] = "https://www.haojian.cn/wximg/mall/star_act.png";
        this.store({
            gradeImg: e
        });
    },
    userInfoHandler: function(t) {
        a.userInfoBind(this, t);
    }
});