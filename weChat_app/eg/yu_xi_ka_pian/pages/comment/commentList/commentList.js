var t = getApp().globalData.commonFun, e = getApp().globalData.utilFun;

Page({
    data: {
        commentInfo: "",
        placeholderVal: "输入回复内容...",
        isFocus: !1,
        contentVal: "",
        replyInfo: [],
        interfaceName: "commonList"
    },
    state: {
        offset: 0,
        limit: 30,
        hasmore: !0
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var o = t.getStorage("commentInfo");
        this.state.commentId = o.id, this.state.userId = o.publisher.id, e.hasOwnProperty("qunzhuId") ? this.state.qunzhuId = e.qunzhuId : this.state.qunzhuId = 0, 
        e.hasOwnProperty("productType") && (this.state.productType = e.productType), this.store({
            commentInfo: o
        }), t.commonFun(this);
    },
    onShow: function() {
        this.getReplyList(0);
    },
    onUnload: function() {
        wx.removeStorageSync("commentInfo");
    },
    getReplyList: function(o) {
        var s = this, n = "/comment/" + t.getStorage("commentInfo").id + "/reply/?offset=" + o + "&limit=" + s.state.limit;
        e.httpRequest(n).then(function(e) {
            var n = t.dataListHandle(s, e, s.data.replyInfo, o);
            wx.hideLoading(), s.store({
                replyInfo: n.list
            });
        });
    },
    submitReply: function(o) {
        wx.showLoading({
            title: "",
            mask: !0
        });
        var s = this, n = "/comment/" + s.state.commentId + "/reply/?product=" + s.state.productType, a = o.detail.value.pinglun;
        if (0 !== a.length) {
            var i = {
                wx_form_id: o.detail.formId,
                content: a,
                ref_uid: s.state.huifuId
            };
            e.httpRequest(n, i, "POST").then(function(e) {
                if (wx.hideLoading(), "fail" !== e.result) {
                    var o = s.data.replyInfo;
                    "wait_confirm" === e.comment.status ? t.showClickModal("评论已提交，等待审核！") : o.push(e.comment), 
                    s.store({
                        replyInfo: o,
                        is_reply: !1,
                        contentVal: ""
                    });
                } else t.showClickModal(e.msg);
            });
        } else t.showTimeToast("请输入评论内容");
    },
    huifu: function(t) {
        var o = this;
        o.state.huifuId = t.currentTarget.dataset.uid;
        var s = t.currentTarget.dataset.uname, n = t.currentTarget.dataset.commentid, a = o.data.myInfo.id;
        o.state.commentId = n;
        var i = [ "回复" ];
        Number(o.state.qunzhuId) === a && Number(o.state.huifuId) !== a ? i = [ "回复", "删除" ] : Number(o.state.huifuId) === a && (i = [ "删除" ]), 
        wx.showActionSheet({
            itemList: i,
            itemColor: "#333333",
            success: function(t) {
                if (0 === t.tapIndex) if (Number(o.state.huifuId) === a) {
                    var i = "/comment/" + n + "/delete/?product=" + o.state.productType;
                    e.httpRequest(i, {}, "PUT").then(function(t) {
                        o.getReplyList(0);
                    });
                } else o.store({
                    showInput: "show",
                    isFocus: !0,
                    placeholderVal: "回复" + s + "：",
                    is_reply: !0
                }); else if (1 === t.tapIndex) {
                    var u = "/comment/" + n + "/delete/?product=" + o.state.productType;
                    e.httpRequest(u, {}, "PUT").then(function(t) {
                        o.getReplyList(0);
                    });
                }
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    },
    inputBlur: function() {
        this.store({
            isFocus: !1,
            placeholderVal: "输入回复内容..."
        });
    },
    onReachBottom: function() {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.state.hasmore && (this.state.offset += this.state.limit, this.getReplyList(this.state.offset));
    },
    store: function(t) {
        this.setData(t);
    }
});