var t = getApp().globalData.commonFun, e = getApp().globalData.utilFun;

Page({
    data: {
        alterHidden: "hide",
        commentInfo: "",
        placeholderVal: "输入回复内容...",
        isFocus: !1,
        contentVal: "",
        replyInfo: [],
        interfaceName: "commonList",
        list: {},
        requestStatus: !1,
        messageDetail: "hide",
        scrolltop: 0,
        comments: [],
        detail: {}
    },
    state: {
        offset: 0,
        limit: 20,
        hasmore: !0,
        productType: "",
        isOnReachBottom: !1,
        activityId: "",
        count: 0
    },
    onLoad: function(e) {
        if (wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.state.productType = e.productType, this.state.options = e, t.commonFun(this), 
        "news" === e.productType) {
            e.hasOwnProperty("qunzhuId") ? this.state.qunzhuId = e.qunzhuId : this.state.qunzhuId = 0;
            var a = t.getStorage("commentInfo");
            this.store({
                commentInfo: a,
                productType: this.state.productType
            }), this.state.commentId = a.id, this.state.userId = a.publisher.id, this.getReplyList(0);
        }
        if ("activity" === e.productType) {
            if (e.hasOwnProperty("count") && (this.state.count = e.count), e.hasOwnProperty("type")) {
                var s = !0;
                "false" === e.type && (s = !1), this.store({
                    isReply: s
                });
            }
            this.state.activityId = e.id, this.getData(0);
        }
    },
    onUnload: function() {
        wx.removeStorageSync("commentInfo");
    },
    getReplyList: function(a) {
        var s = this, i = "/comment/" + t.getStorage("commentInfo").id + "/reply/?offset=" + a + "&limit=" + s.state.limit;
        e.httpRequest(i).then(function(e) {
            var i = t.dataListHandle(s, e, s.data.replyInfo, a);
            wx.hideLoading(), s.store({
                replyInfo: i.list
            });
        });
    },
    submitReply: function(a) {
        wx.showLoading({
            title: "",
            mask: !0
        });
        var s = this, i = "/comment/" + s.state.commentId + "/reply/?product=" + s.state.productType, o = a.detail.value.pinglun;
        if (0 !== o.length) {
            var n = {
                wx_form_id: a.detail.formId,
                content: o,
                ref_uid: s.state.huifuId
            };
            e.httpRequest(i, n, "POST").then(function(e) {
                if (wx.hideLoading(), "fail" !== e.result) {
                    var a = s.data.replyInfo;
                    a.push(e.comment), s.store({
                        replyInfo: a,
                        is_reply: !1,
                        contentVal: ""
                    });
                } else t.showClickModal(e.msg);
            });
        } else t.showTimeToast("请输入评论内容");
    },
    gotolistPage: function(e) {
        var a = e.currentTarget.dataset.index, s = this.data.commentInfo[a];
        t.setStorage("commentInfo", s), wx.navigateTo({
            url: "/pages/comment/comment?productType=news"
        });
    },
    huifu: function(t) {
        var a = this;
        a.state.huifuId = t.currentTarget.dataset.uid;
        var s = t.currentTarget.dataset.uname, i = t.currentTarget.dataset.commentid, o = a.data.myInfo.id;
        a.state.commentId = i;
        var n = [ "回复" ];
        Number(a.state.qunzhuId) === o && Number(a.state.huifuId) !== o ? n = [ "回复", "删除" ] : Number(a.state.huifuId) === o && (n = [ "删除" ]), 
        wx.showActionSheet({
            itemList: n,
            itemColor: "#333333",
            success: function(t) {
                if (0 === t.tapIndex) if (Number(a.state.huifuId) === o) {
                    var n = "/comment/" + i + "/delete/?product=" + a.state.productType;
                    e.httpRequest(n, {}, "PUT").then(function(t) {
                        a.getReplyList(0);
                    });
                } else a.store({
                    showInput: "show",
                    isFocus: !0,
                    placeholderVal: "回复" + s + "：",
                    is_reply: !0
                }); else if (1 === t.tapIndex) {
                    var r = "/comment/" + i + "/delete/?product=" + a.state.productType;
                    e.httpRequest(r, {}, "PUT").then(function(t) {
                        a.getReplyList(0);
                    });
                }
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    getData: function(a) {
        var s = this, i = "/activity/" + this.state.activityId + "/comment/?offset=" + a + "&limit=" + this.state.limit + "&order=recent";
        e.httpRequest(i).then(function(e) {
            e.count > 0 && e.results.forEach(function(t) {
                var e = [];
                if (t.rating) {
                    for (var a = 1; a <= 5; a += 1) t.rating / 2 >= a ? e.push("https://www.haojian.cn/wximg/mall/star_act.png") : e.push("https://www.haojian.cn/wximg/mall/star_def.png");
                    t.grade = e;
                }
            });
            var i = t.dataListHandle(s, e, s.data.comments, a);
            s.setData({
                comments: i.list,
                requestStatus: !0,
                interfaceName: "activityLiuyan",
                productType: s.state.productType
            });
        });
    },
    inputBlur: function() {
        this.store({
            isFocus: !1,
            placeholderVal: "输入回复内容..."
        });
    },
    inputVal: function(t) {
        var e = t.detail.value;
        this.store({
            lyVal: e
        });
    },
    seeBigImg: function(e) {
        if ("news" === this.state.productType) {
            var a = e.currentTarget.dataset.imgurl, s = this.data.commentInfo.attachments;
            t.seeBigImg(2, a, s);
        }
        if ("activity" === this.state.productType) {
            var i = e.currentTarget.dataset.index, o = e.currentTarget.dataset.imgurl, n = this.data.comments[i].attachments;
            t.seeBigImg(2, o, n);
        }
    },
    onReachBottom: function() {
        if ("news" === this.state.productType) {
            if (!this.state.hasmore) return;
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), this.state.offset += this.state.limit, this.getReplyList(this.state.offset);
        }
        if ("activity" === this.state.productType) {
            if (!this.state.isOnReachBottom) return;
            if (!this.state.hasmore) return;
            wx.showLoading({
                title: "加载中...",
                mask: !0
            }), this.state.offset += this.state.limit, this.getData(this.state.offset), this.state.isOnReachBottom = !1;
        }
    },
    store: function(t) {
        this.setData(t);
    }
});