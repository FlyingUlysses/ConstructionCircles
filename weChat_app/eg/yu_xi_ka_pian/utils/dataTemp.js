function t(t) {
    var e = t.currentTarget.dataset, a = this.data.banner;
    a[e.index].height = Number(t.detail.height), this.setData({
        banner: a
    });
}

function e(e, a) {
    var s = "/hdh/" + getApp().globalData.acid + "/ads/?type=" + a;
    w.httpRequest(s).then(function(t) {
        e.setData({
            banner: t.results
        });
    }), e.ImgLoad = t;
}

function a(t) {
    Number(t.total) > 0 ? wx.navigateTo({
        url: "/pages/album/pages/photoDetailList/photoDetailList?albumId=" + t.id
    }) : wx.showModal({
        title: "提示",
        content: "该相册还未上传照片",
        showCancel: !1,
        confirmText: "关闭"
    });
}

function s(t, e) {
    var a = wx.getSystemInfoSync().windowWidth, s = "/hdh/" + getApp().globalData.acid + "/album/?offset=" + e + "&limit=10";
    w.httpRequest(s).then(function(s) {
        var i = y.dataListHandle(t, s, t.data.list, e);
        t.store({
            list: i.list,
            view_type: y.getStorage("config").album.list_view_type,
            windowHeight: .6 * Number(a),
            requestStatus: !0
        }), wx.stopPullDownRefresh();
    });
}

function i(t) {
    t.state.isOnReachBottom && t.state.hasmore && (wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.state.offset += t.state.limit, s(t, t.state.offset), t.state.isOnReachBottom = !1);
}

function o(t) {
    y.getPersonInfo().then(function(e) {
        var a = !1;
        e.privileges.length > 0 && e.privileges.forEach(function(t) {
            "verify" === t && (a = !0);
        }), t.setData({
            myInfo: e,
            is_verify: a,
            logoPosBottom: !1,
            contactStatus: !0
        }), t.state.pageOnShow = !0, y.getWallet(t), wx.hideLoading(), wx.stopPullDownRefresh();
    });
}

function n(t, e) {
    var a = "";
    t.state.keywords && (a = "&q=" + t.state.keywords);
    var s = "/hdh/" + getApp().globalData.acid + "/news/?order=recent&style=" + y.getStorage("config").news.list_view_type + "&offset=" + e + "&limit=" + t.state.limit + "&category_id=" + t.state.categoryid + a;
    w.httpRequest(s, a).then(function(a) {
        a.count > 0 && a.results.forEach(function(t, e) {
            a.results[e].hasOwnProperty("info") && (a.results[e].info.length > 60 ? a.results[e].isMore = !0 : a.results[e].isMore = !1), 
            a.results[e].isviews = a.results[e].config.isviews, a.results[e].iscomments = a.results[e].config.iscomments;
        });
        var s = y.dataListHandle(t, a, t.data.list, e), i = !1;
        0 === s.list.length && (i = !0), t.setData({
            list: s.list,
            hasNext: s.hasNext,
            listDataType: "news",
            requestStatus: !0,
            logoPosBottom: i
        });
    });
}

function r(t) {
    var e = y.getStorage("config"), a = t.data.info, s = "/hdh/" + getApp().globalData.acid + "/ads/?type=news";
    w.httpRequest(s).then(function(s) {
        wx.stopPullDownRefresh();
        var i = getApp().globalData.newscategoryId, o = e.news.categories, r = t.state.options;
        o.length > 0 ? 0 !== Number(i) || r.hasOwnProperty("category_id") ? (r.hasOwnProperty("category_id") ? t.state.categoryid = r.category_id : t.state.categoryid = i, 
        o.forEach(function(e, s) {
            Number(e.id === Number(t.state.categoryid)) && (a.activeIndex = s, a.toView = "category_" + s);
        })) : t.state.categoryid = o[0].id : (wx.hideLoading(), r.hasOwnProperty("category_id") ? t.state.categoryid = r.category_id : t.state.categoryid = i), 
        t.store({
            info: a,
            contactStatus: !0,
            navList: e.news.categories,
            banner: s.results,
            newsIssearch: e.news.issearch,
            news_list_view_type: e.news.list_view_type
        }), t.state.offset = 0, getApp().globalData.newscategoryId = 0, t.state.options = {}, 
        n(t, 0), y.updateTabOffsetTop(t);
    });
}

function l(t, e) {
    wx.showLoading({
        title: "",
        mask: !0
    });
    var a = e.data.list, s = t.id, i = t.index, o = t.method, n = "/news/" + s + "/like/";
    "DELETE" === o && (n = "/news/" + s + "/like/delete/"), w.httpRequest(n, {}, "PUT").then(function(t) {
        wx.hideLoading(), "success" === t.result ? ("DELETE" === o ? (a[i].like_count -= 1, 
        a[i].is_like = !1) : (a[i].like_count += 1, a[i].is_like = !0), e.store({
            list: a
        })) : y.showClickModal(t.msg);
    });
}

function c(t, e) {
    var a = t.data.list;
    a[e.index].isMore = !1, t.setData({
        list: a
    });
}

function u(t, e) {
    var a = t.data.list;
    a[e.index].isMore = !0, t.setData({
        list: a
    });
}

function d(t, e) {
    var a = "/hdh/" + getApp().globalData.acid + "/activity/?category_id=" + e.state.categoryid + "&offset=" + t + "&limit=" + e.state.limit;
    w.httpRequest(a).then(function(a) {
        wx.stopPullDownRefresh();
        var s = y.dataListHandle(e, a, e.data.list, t);
        s.list.forEach(function(t, e) {
            s.list[e].clamp2 = !0, t.config.showTime && t.location.desc && (s.list[e].clamp2 = !1), 
            s.list[e].pricePos = "right", t.config.showTime || t.location.desc || (s.list[e].pricePos = "left");
        });
        var i = !1;
        0 === s.list.length && (i = !0), e.setData({
            list: s.list,
            requestStatus: !0,
            hasNext: s.hasNext,
            logoPosBottom: i
        }), wx.hideLoading();
    });
}

function h(t) {
    var a = y.getStorage("config").activity, s = t.data.info;
    s.temp_name = a.list_view_type, s.list_order_type = a.list_order_type;
    var i = getApp().globalData.hdcategoryId, o = a.categories, n = t.state.options;
    o.length > 0 ? t.state.isRefresh || (0 !== Number(i) || n.hasOwnProperty("category_id") ? (n.hasOwnProperty("category_id") ? t.state.categoryid = n.category_id : t.state.categoryid = i, 
    o.forEach(function(e, a) {
        Number(e.id === Number(t.state.categoryid)) && (s.activeIndex = a, s.toView = "category_" + a);
    })) : t.state.categoryid = o[0].id) : (wx.hideLoading(), n.hasOwnProperty("category_id") ? t.state.categoryid = n.category_id : t.state.categoryid = i), 
    t.store({
        info: s,
        navList: a.categories,
        listDataType: "activity"
    }), t.state.offset = 0, getApp().globalData.hdcategoryId = 0, t.state.isRefresh = !1, 
    t.state.options = {}, y.getAccessToken() ? d(0, t) : getApp().globalData.tokenUpdated = function() {
        console.log("update success"), d(0, t);
    }, e(t, "activity");
}

function g(t, e, a) {
    var s = y.getStorage("userInfo").id;
    t.state.huifuId = a.currentTarget.dataset.uid;
    var i = a.currentTarget.dataset.uname, o = a.currentTarget.dataset.commentid;
    t.state.commentId = o;
    var n = [ "回复" ];
    Number(t.state.huifuId) === s && (n = [ "删除" ]), wx.showActionSheet({
        itemList: n,
        itemColor: "#333333",
        success: function(o) {
            "匿名" !== i ? 0 === o.tapIndex && (Number(t.state.huifuId) === s ? w.httpRequest(e, {}, "PUT").then(function() {
                var e = t.data.detail;
                e.comment_count -= 1, t.setData({
                    detail: e
                }), t.state.offset = 0, t.getComment(0);
            }) : ("sameCity" === a.pageName && t.setData({
                bottom: [ "hide", "show" ]
            }), t.store({
                showInput: "show",
                isFocus: !0,
                placeholderVal: "回复" + i + "：",
                contentVal: "",
                is_reply: !0
            }))) : y.showClickModal("匿名评论不能回复！");
        },
        fail: function(e) {
            "newsDetail" === a.pageType && t.setData({
                showInput: "hide"
            }), console.log(e.errMsg);
        }
    });
}

function f(t, e) {
    wx.showLoading({
        title: "图片下载中..."
    }), w.httpRequest(e.url, {}, "GET", "v2").then(function(e) {
        t.setData({
            shareAlter: "hide",
            haibaoImg: e.url,
            shareAlter1: "show"
        }), wx.hideLoading(), wx.downloadFile({
            url: e.url,
            success: function(t) {
                wx.hideLoading(), 200 === t.statusCode ? (wx.showToast({
                    title: "下载成功"
                }), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log(t);
                    }
                })) : (wx.hideLoading(), wx.showToast({
                    title: "下载失败"
                }));
            }
        });
    });
}

function m(t, e) {
    wx.showLoading({
        title: "图片下载中..."
    });
    var a = "/" + e.name + "/" + e.id + "/qrcode/";
    e.hasOwnProperty("url") && (a = e.url), w.httpRequest(a).then(function(e) {
        t.setData({
            shareAlter: "hide",
            haibaoImg: e.original_url,
            shareAlter1: "show"
        }), wx.hideLoading(), wx.downloadFile({
            url: e.original_url,
            success: function(t) {
                wx.hideLoading(), 200 === t.statusCode ? (wx.showToast({
                    title: "下载成功"
                }), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log(t);
                    }
                })) : (wx.hideLoading(), wx.showToast({
                    title: "下载失败"
                }));
            }
        });
    });
}

function p(t, e, a) {
    w.httpRequest("/user/me/", e, "POST").then(function(e) {
        var s = t.data.tankuang;
        s[0] = "hide", t.store({
            tankuang: s
        }), "success" === e.result ? (1 === Number(a) && y.showClickModal("修改成功"), t.store({
            myInfo: e.user
        }), o(t)) : 1 === Number(a) && y.showClickModal("修改失败"), wx.hideLoading();
    });
}

var w = require("util.js"), y = require("common.js");

module.exports = {
    showAbuotInfo: function(t) {
        var e = t.data.info, a = "/hdh/" + getApp().globalData.acid + "/";
        w.httpRequest(a).then(function(a) {
            wx.hideLoading(), wx.stopPullDownRefresh(), e.about = a, t.setData({
                info: e,
                logoPosBottom: !1,
                contactStatus: !0
            }), t.state.pageOnShow = !0;
        });
    },
    aboutChangeEvent: function(t, e) {
        var a = e.currentTarget.dataset;
        if ("call" === a.types) y.phoneCall(a.phone); else if ("location" === a.types) y.openMap(a.lat, a.lng); else if ("kefu" === a.types) t.setData({
            tankuang: "show"
        }); else if ("close" === a.types) t.setData({
            tankuang: "hide"
        }); else if ("seeyyzz" === a.types) y.seeBigImg(1, t.imgurl, ""); else if ("photos" === a.types) {
            var s = t.data.info.about.photos, i = t.data.info.about.photos[a.index].original_url;
            y.seeBigImg(2, i, s);
        } else "wxkf" === a.types && y.seeBigImg(1, a.imgurl, "");
    },
    showGetUserInfo: o,
    newsChangeEvent: function(t, e) {
        var a = e.currentTarget.dataset;
        if ("zhankaiMore" === a.types) c(t, a); else if ("yincangMore" === a.types) u(t, a); else if ("newsLiken" === a.types) y.wxAuthorize(t, function(e) {
            e && l(a, t);
        }); else if ("close" === a.types) t.setData({
            tankuang: "hide"
        }); else if ("seeyyzz" === a.types) y.seeBigImg(1, t.imgurl, ""); else if ("photos" === a.types) {
            var s = t.data.info.about.photos, i = t.data.info.about.photos[a.index].original_url;
            y.seeBigImg(2, i, s);
        } else if ("newsSearchBtn" === a.types) {
            var o = e.detail.value;
            y.isNull(o) && t.store({
                iconStatus: !0
            }), t.state.keywords = o, t.state.offset = 0;
            var r = t.data.info;
            r.activeIndex = 0, r.toView = "category_0", t.store({
                info: r
            }), n(t, 0);
        }
    },
    newsNavList: function(t) {
        y.configData("news", function() {
            y.commonFun(t);
            var e = y.getStorage("config").news;
            e.module ? r(t) : y.showClickModal(e.msg);
        });
    },
    newMovementList: n,
    getNewsDetail: function(t, e, a) {
        var s = "/news/" + e + "/", i = t.data.list;
        w.httpRequest(s).then(function(e) {
            i[a].comment_count = e.comment_count, i[a].like_count = e.like_count, t.store({
                list: i
            });
        });
    },
    navOnTapTag: function(t, e) {
        var a = e.currentTarget.dataset.id, s = e.currentTarget.dataset.index, i = e.currentTarget.dataset.type, o = t.data.info;
        t.state.hasmore = !0, t.state.offset = 0, o.activeIndex !== s && (o.activeIndex = s, 
        o.toView = "category_" + s, t.state.categoryid = a, o.list = [], t.state.offset = 0, 
        t.setData({
            info: o,
            searchVal: "",
            list: [],
            requestStatus: !1
        }), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), "activity" === i ? d(0, t) : "news" === i && (t.state.keywords = "", n(t, 0)));
    },
    activityType: function(t) {
        y.configData("activity", function() {
            y.commonFun(t);
            var e = y.getStorage("config").activity;
            e.module ? h(t) : y.showClickModal(e.msg);
        });
    },
    actList: d,
    dianzan: function(t, e, a) {
        wx.showLoading({
            title: "",
            mask: !0
        }), w.httpRequest(e, {}, "PUT").then(function(e) {
            if (wx.hideLoading(), "success" === e.result) {
                var s = t.data.detail;
                "DELETE" === a ? (s.like_count -= 1, s.is_like = !1) : (s.like_count += 1, s.is_like = !0), 
                Number(s.like_count) <= 10 && t.getLikeList(), t.store({
                    detail: s
                });
            } else y.showClickModal(e.msg);
        });
    },
    dianzanList: function(t, e) {
        var a = t.data.detail;
        w.httpRequest(e).then(function(e) {
            a.like_count = e.count;
            var s = "";
            e.results.forEach(function(t) {
                s += "" === s ? t.displayname : "," + t.displayname;
            }), t.store({
                dianzanInfo: e.results,
                likeName: s,
                detail: a
            }), wx.hideLoading();
        });
    },
    pinglunList: function(t, e, a) {
        w.httpRequest(e).then(function(e) {
            var s = y.dataListHandle(t, e, t.data.commentInfo, a);
            s.list.forEach(function(t, e) {
                var a = [];
                if (t.rating) {
                    for (var i = 1; i <= 5; i += 1) t.rating / 2 >= i ? a.push("https://www.haojian.cn/wximg/mall/star_act.png") : a.push("https://www.haojian.cn/wximg/mall/star_def.png");
                    s.list[e].grade = a;
                }
            }), t.store({
                commentInfo: s.list
            });
        });
    },
    pinglun: function(t, e, a, s) {
        var i = t.data.detail, o = a.detail.value.pinglun;
        if (y.isNull(o)) y.showTimeToast("请输入评论内容"); else {
            wx.showLoading({
                title: "",
                mask: !0
            });
            var n = {
                wx_form_id: a.detail.formId,
                content: o,
                type: a.p_type,
                did: a.did
            };
            w.httpRequest(e, n, "POST").then(function(e) {
                wx.hideLoading(), "fail" === e.result ? y.showClickModal(e.msg) : ("wait_confirm" === e.comment.status ? y.showClickModal("评论已提交，等待审核！") : (t.getComment(0), 
                i.comment_count += 1), t.store({
                    detail: i,
                    contentVal: ""
                }), "sameCity" === s && t.setData({
                    bottom: [ "show", "hide" ]
                }));
            });
        }
    },
    huifuPinglun: function(t, e, a) {
        y.getStorage("userInfo") ? g(t, e, a) : y.getPersonInfo().then(function(s) {
            g(t, e, a);
        });
    },
    subReply: function(t, e, a) {
        var s = a.detail.value.pinglun;
        if (y.isNull(s)) y.showTimeToast("请输入回复内容！"); else if (t.state.huifuId) {
            wx.showLoading({
                title: "",
                mask: !0
            });
            var i = {
                wx_form_id: a.detail.formId,
                content: s,
                ref_uid: t.state.huifuId
            };
            w.httpRequest(e, i, "POST").then(function(e) {
                if (wx.hideLoading(), "fail" === e.result) y.showClickModal(e.msg); else {
                    if ("wait_confirm" === e.comment.status) y.showClickModal("回复成功，等待审核！"); else {
                        t.state.offset = 0;
                        var a = t.data.detail;
                        a.comment_count += 1, t.getComment(0, a);
                    }
                    t.store({
                        is_reply: !1,
                        contentVal: "",
                        isFocus: !1,
                        showInput: "hide",
                        placeholderVal: "输入评论内容..."
                    });
                }
            });
        } else y.showClickModal("请选择要回复的评论！");
    },
    BingUserInfo: function(t, e) {
        var a = e.detail;
        if (a.hasOwnProperty("userInfo")) {
            wx.showLoading({
                title: "绑定中...",
                mask: !0
            });
            var s = {
                displayname: a.userInfo.nickName,
                avatar_url: {
                    original_url: a.userInfo.avatarUrl
                }
            };
            w.httpRequest("/user/me/", s, "POST").then(function(e) {
                if ("success" === e.result) {
                    var s = t.data.myInfo;
                    s.displayname = a.userInfo.nickName, s.avatar_url.thumb_small_url = a.userInfo.avatarUrl, 
                    t.setData({
                        myInfo: s
                    });
                } else y.showClickModal("修改失败");
                wx.hideLoading();
            });
        }
    },
    getBanner: e,
    searchSettle: function(t, e, a) {
        var s = "/business/Information/search?offset=" + t + "&limit=" + a.state.limit;
        w.httpRequest(s, {
            name: e.q
        }, "GET", "v2").then(function(t) {
            if (wx.hideLoading(), "success" === t.result) {
                var e = a.data.list;
                e = 0 === a.state.offset ? t.results : e.concat(t.results), a.setData({
                    list: e
                }), a.state.nextCount = t.next;
            } else y.showClickModal(t.msg);
        });
    },
    searchActivity: function(t, e, a) {
        y.commonFun(a);
        var s = a.data.list;
        "product" === e.types ? s = a.data.mall : "column" === e.types && (s = a.data.info), 
        wx.showLoading({
            title: "加载中..."
        });
        var i = "/hdh/" + getApp().globalData.acid + "/" + e.types + "/?offset=" + t + "&limit=" + a.state.limit;
        w.httpRequest(i, {
            q: e.q
        }).then(function(t) {
            if (0 === a.state.offset) switch (e.types) {
              case "community":
              case "catalogthread":
              case "activity":
              case "digitalcontent":
              case "news":
                s = t.results;
                break;

              case "column":
                s.zhuanlanList = t.results, s.joinNumStatue = "show";
                break;

              case "product":
                s.shopData = t.results;
            } else switch (e.types) {
              case "community":
              case "digitalcontent":
              case "catalogthread":
              case "activity":
              case "news":
                s = s.concat(t.results);
                break;

              case "column":
                s.zhuanlanList = s.zhuanlanList.concat(t.results);
                break;

              case "product":
                s.shopData = s.shopData.concat(t.results);
            }
            "product" === e.types ? a.store({
                mall: s,
                requestStatus: !0
            }) : "column" === e.types ? a.store({
                info: s,
                dybtn: !0,
                requestStatus: !0
            }) : "digitalcontent" === e.types ? a.store({
                danpinList: s,
                buybtn: !0,
                requestStatus: !0
            }) : a.store({
                list: s,
                requestStatus: !0
            }), a.state.nextCount = t.next, wx.hideLoading();
        });
    },
    detailShare: function(t, e) {
        var a = e.currentTarget.dataset, s = a.url, i = a.types;
        switch (console.log(i), i) {
          case "showShareAlter":
            t.setData({
                shareAlter: "show"
            });
            break;

          case "closeShareAlter":
            t.setData({
                shareAlter: "hide"
            });
            break;

          case "closehaibao":
            t.setData({
                shareAlter1: "hide"
            });
            break;

          case "haibaoBigImg":
            y.seeBigImg(1, s, "");
            break;

          case "getHaibao":
            "v2" === e.type ? f(t, e) : m(t, e);
            break;

          case "topIndex":
            wx.switchTab({
                url: "/pages/index/page0/page0"
            });
        }
    },
    getShequnData: function(t, a) {
        var s = "/hdh/" + getApp().globalData.acid + "/community/?offset=" + a + "&limit=" + t.state.limit;
        w.httpRequest(s).then(function(s) {
            var i = y.dataListHandle(t, s, t.data.list, a);
            t.setData({
                list: i.list,
                joinNumStatue: "show",
                requestStatus: !0
            }), wx.stopPullDownRefresh(), e(t, "community");
        });
    },
    shequnDetail: function(t, e) {
        var a = t.data.list, s = "/community/" + a[e].id + "/";
        w.httpRequest(s).then(function(s) {
            a[e].is_member = s.is_member, a[e].member_count = s.member_count, a[e].thread_count = s.thread_count, 
            t.setData({
                list: a
            });
        });
    },
    nickNameUpdate: function(t, e) {
        y.isNull(e) ? y.showTimeToast("请输入昵称") : (wx.showLoading({
            title: "修改中...",
            mask: !0
        }), p(t, {
            displayname: e
        }, 1));
    },
    photoUpdate: function(t, e) {
        y.uploadImg(e, 1, function(a, s) {
            var i = {};
            if ("avatar" === e) i.avatar_url = {
                oss_object: JSON.parse(a[0].data).url
            }; else {
                var o = [];
                i.wx_paycode = {
                    oss_object: JSON.parse(a[0].data).url
                }, s.forEach(function(t) {
                    o.push(t);
                }), t.setData({
                    imgList: o
                });
            }
            p(t, i, 1);
        });
    },
    userInfoBind: function(t, e) {
        var a = e.detail;
        a.hasOwnProperty("userInfo") && (wx.showLoading({
            title: "绑定中...",
            mask: !0
        }), p(t, {
            displayname: a.userInfo.nickName,
            avatar_url: {
                original_url: a.userInfo.avatarUrl
            }
        }, 2));
    },
    albumConfig: function(t) {
        y.configData("album", function() {
            y.commonFun(t);
            var e = y.getStorage("config").album;
            e.module ? s(t, 0) : y.showClickModal(e.msg);
        });
    },
    albumList: s,
    albumChangeEvent: function(t, e) {
        var s = e.currentTarget.dataset;
        "viewBigImg" === s.types ? a(s) : "scrolltolower" === s.types && i(t);
    },
    formList: function(t, e) {
        var a = "/form/Record/?offset=" + e + "&limit=" + t.state.limit;
        w.httpRequest(a).then(function(a) {
            wx.stopPullDownRefresh();
            var s = y.dataListHandle(t, a, t.data.list, e);
            t.setData({
                list: s.list,
                requestStatus: !0
            });
        });
    },
    getgg: function(t, e, a, s, i) {
        var o = "/api/notice/GetNotice?typeId=" + e + "&applyId=" + a;
        w.httpRequest(o, {}, "GET", "v2").then(function(e) {
            if (s) {
                var a = {
                    con: e.data.title,
                    size: "12px"
                }, o = {
                    title: e.data.title
                };
                t.setData({
                    marquee: a,
                    gonggao: o
                }), e.data.title ? t.runGonggao(e.data.title) : clearTimeout(t.state.gonggao_timer);
            } else i(e);
        });
    },
    storeList: function(t, e) {
        var a = "/api/BranchToClient/getBranch?offset=" + e + "&limit=" + t.state.limit;
        w.httpRequest(a, {}, "GET", "v2").then(function(a) {
            if ("success" === a.result) {
                var s = y.dataListHandle(t, a, t.data.list, e);
                t.setData({
                    list: s.list,
                    requestStatus: !0,
                    hasNext: s.hasNext
                });
            }
        });
    },
    myEventChange: function(t, e) {
        var a = e.currentTarget.dataset.index, s = t.data.list, i = s[a].show;
        s.forEach(function(t) {
            t.show = !1;
        }), s[a].show = !i, t.setData({
            list: s
        });
    }
};