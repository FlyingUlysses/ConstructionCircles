function e() {
    return wx.getExtConfigSync && wx.getExtConfigSync(), N.getData().ext && N.getData().ext.acid ? N.getData().ext : wx.getExtConfigSync();
}

function t(e, t) {
    try {
        wx.setStorageSync(e, t);
    } catch (e) {
        console.log(e);
    }
}

function n(e) {
    try {
        return wx.getStorageSync(e) || {};
    } catch (e) {
        console.log(e);
    }
    return null;
}

function o(e) {
    wx.hideLoading(), wx.showModal({
        title: "提示",
        content: e,
        icon: "loading",
        showCancel: !1,
        success: function(e) {}
    });
}

function a(e) {
    for (n = 0; " " == e.charAt(n) && n < e.length; n += 1) ;
    if (n == e.length) return "";
    for (var t = e.substr(n), n = t.length - 1; " " == t.charAt(n) && n >= 0; n -= 1) ;
    return t = t.substr(0, n + 1);
}

function r(e) {
    var t = new RegExp("^[ ]+$");
    return !(e && null != e && "" !== e && 0 !== e.length && !t.test(e)) || !/^[0-9]+.?[0-9]*$/.test(e) && "" == a(e.replace(/\n/g, ""));
}

function s(e) {
    for (var t in e) return !1;
    return !0;
}

function i(e) {
    wx.getSystemInfo({
        success: function(t) {
            var n = t.SDKVersion;
            if (void 0 !== n) {
                for (var o = n.split("."), a = "", r = 0; r < o.length; r += 1) a += o[r];
                Number(a) >= 120 ? e.setData({
                    btnPhoneNumber: !0
                }) : e.setData({
                    btnPhoneNumber: !1
                });
            } else e.setData({
                btnPhoneNumber: !1
            });
        }
    });
}

function c(e) {
    return wx.pro.login({}).then(function(e) {
        return wx.pro.getUserInfo();
    }).then(function(e) {
        var t = {
            displayname: e.userInfo.nickName,
            avatar_url: {
                original_url: e.userInfo.avatarUrl
            }
        };
        return P.httpRequest("/user/me/", t, "POST");
    }).then(function(e) {
        return t("userInfo", e), e;
    }).catch(function(t) {
        return e;
    });
}

function u(e, t) {
    var n = new Date(), o = e.key_prefix + n.getFullYear() + n.getMonth() + n.getDate() + n.getHours() + n.getMinutes() + n.getSeconds() + Math.floor(1e5 * Math.random()) + "_jpg";
    return wx.pro.uploadFile({
        url: e.image_upload_url,
        filePath: t,
        name: "file",
        formData: {
            token: e.token,
            key: o
        }
    });
}

function l() {
    return P.httpRequest("/user/me/").then(function(e) {
        return t("userInfo", e), e.avatar_url.original_url && e.displayname ? e : c(e);
    }).catch(function(e) {});
}

function h(e, n) {
    new I({
        key: "PE4BZ-OTSPG-SXBQG-IPW4I-X3N4O-SGF5X"
    }).reverseGeocoder({
        location: {
            latitude: e,
            longitude: n
        },
        success: function(e) {
            console.log(e), t("publicAddress", e.result.address);
        }
    });
}

function g(e, n) {
    if (!wx.getSetting) return wx.hideLoading(), void wx.showModal({
        title: "提示",
        content: "当前微信版本过低，请升级至高版本",
        showCancel: !1
    });
    wx.getSetting({
        success: function(o) {
            o.authSetting["xiadan" === n ? "scope.address" : "scope.userLocation"] || (wx.hideLoading(), 
            wx.showModal({
                title: "用户未授权",
                content: "如需正常使用该功能，请点击“确定”并在授权管理中选中“通讯地址”，然后打开开关，即可使用",
                showCancel: !1,
                success: function(n) {
                    n.confirm && wx.openSetting({
                        success: function(n) {
                            "nearby" === e.state.locTypes ? wx.getLocation({
                                type: "wgs84",
                                success: function(e) {
                                    return t("position", {
                                        lat: e.latitude,
                                        lng: e.longitude
                                    }), h(e.latitude, e.longitude), e;
                                }
                            }) : "public" === e.state.locTypes ? wx.chooseLocation({
                                success: function(n) {
                                    console.log(JSON.stringify(n)), n.hasOwnProperty("address") && (h(n.latitude, n.longitude), 
                                    e.state.address_lng = n.latitude + "|" + n.longitude, t("publicAddress", n.address), 
                                    e.store({
                                        region: n.address
                                    }));
                                }
                            }) : "xiadan" === e.state.locTypes && wx.chooseAddress({
                                success: function(t) {
                                    if ("chooseAddress:ok" === t.errMsg) {
                                        var n = {};
                                        n.name = t.userName, n.tel = t.telNumber, n.address = t.provinceName + t.cityName + t.countyName + t.detailInfo, 
                                        e.store({
                                            addressInfo: n
                                        }), e.calculateOrderPrice();
                                    }
                                }
                            });
                        }
                    });
                }
            }));
        }
    });
}

function d() {
    try {
        wx.removeStorageSync("token"), wx.removeStorageSync("expire_at");
    } catch (e) {
        console.log(e);
    }
}

function p(e) {
    t("token", e.access_token), t("refresh_token", e.refresh_token);
    var n = 1e3 * e.expires_in / 2;
    t("expire_at", Date.parse(new Date()) + n);
}

function f() {
    var t = e();
    return wx.pro.login({}).then(function(e) {
        var n = e.code, o = {
            grant_type: "authorization_code",
            code: "wx " + t.acid + " " + n,
            client_id: "string",
            client_secret: "string"
        };
        return P.httpRequest("/oauth/token/", o, "POST");
    }).then(function(e) {
        return "success" === e.result ? p(e.token) : console.log(e.msg), e;
    });
}

function w(t) {
    var n = "/ticket/?acid=" + e().acid;
    8 === t.length ? n += "&code=" + t : n += "&phone=" + t, P.httpRequest(n).then(function(e) {
        wx.hideLoading(), "success" === e.result ? 8 === t.length ? wx.navigateTo({
            url: "/pages/activity/pages/yanpiao2/yanpiao2?yanzhengma=" + t
        }) : wx.navigateTo({
            url: "/pages/activity/pages/dcyList/dcyList?phone=" + t
        }) : o(e.msg);
    });
}

function m(e, t, n, o) {
    if (1 === e) wx.previewImage({
        urls: [ t ]
    }); else {
        var a = [];
        if ("swipers" === o) a = n; else for (var r = 0; r < n.length; r += 1) a[r] = n[r].original_url;
        wx.previewImage({
            current: t,
            urls: a
        });
    }
}

function y(e, t) {
    wx.openLocation({
        latitude: Number(e),
        longitude: Number(t)
    });
}

function x(e) {
    r(e) ? o("暂无联系电话！") : wx.makePhoneCall({
        phoneNumber: e
    });
}

function b(e, o, a, r) {
    var s = D.tiaoZhuan(e, o, a, r);
    if (console.log("url:" + s), s) {
        var i = getCurrentPages().length;
        if (Number(i) >= 5 && "page" === e[0] ? wx.redirectTo({
            url: s
        }) : "payAlter" === r ? "wb" === e[0] || "navigateTo" === a.data.openType ? wx.navigateTo({
            url: s
        }) : wx.redirectTo({
            url: s
        }) : wx.navigateTo({
            url: s
        }), "wb" === e[0]) {
            var c = n("indexpop");
            c.status = !0, t("indexpop", c), a.setData({
                alterHidden: "hide"
            });
        }
    }
}

function v(e, o) {
    if ("openWindow" === e.types) {
        var a = e.url;
        if (a) {
            var r = a.split("_");
            "tel" === r[0] ? x(r[1]) : "map" === r[0] ? y(r[1], r[2]) : "payAlter" === e.name ? b(r, a, o, "payAlter") : b(r, a, o, "");
        } else "payAlter" === e.name && m(1, e.img);
    } else {
        var s = n("paypop");
        s.status = !0, t("paypop", s);
    }
    o.setData({
        alterHidden: "hide"
    });
}

function T(e) {
    var t = e.currentTarget.dataset;
    t.name = "logo", v(t, this);
}

function k(e) {
    x(e.currentTarget.dataset.url);
}

function S(o) {
    var a = "/hdh/" + e().acid + "/config/?key=ui", r = n("config");
    P.httpRequest(a).then(function(e) {
        try {
            var n = {
                activity: !1,
                shequn: !1,
                news: !1,
                zhuanlan: !1,
                mall: !1,
                album: !1,
                extension: !1,
                cashcard: !1,
                sameCity: !1,
                dianCan: !1,
                hongbao: !1,
                form: !1,
                easyYuyue: !1,
                appointment: !1,
                carpool: !1,
                business: !1,
                bargain: !1,
                hotel: !1
            };
            e.ui.modules.forEach(function(e) {
                switch (e) {
                  case "activity":
                    n.activity = !0;
                    break;

                  case "community":
                    n.shequn = !0;
                    break;

                  case "news":
                    n.news = !0;
                    break;

                  case "learn":
                    n.zhuanlan = !0;
                    break;

                  case "album":
                    n.album = !0;
                    break;

                  case "shop":
                    n.mall = !0;
                    break;

                  case "sales":
                    n.extension = !0;
                    break;

                  case "prepaid":
                    n.cashcard = !0;
                    break;

                  case "restaurant":
                    n.dianCan = !0;
                    break;

                  case "catalog":
                    n.sameCity = !0;
                    break;

                  case "hongbao":
                    n.hongbao = !0;
                    break;

                  case "form":
                    n.form = !0;
                    break;

                  case "reserve":
                    n.easyYuyue = !0;
                    break;

                  case "appointment":
                    n.appointment = !0;
                    break;

                  case "carpool":
                    n.carpool = !0;
                    break;

                  case "business":
                    n.business = !0;
                    break;

                  case "bargain":
                    n.bargain = !0;
                    break;

                  case "hotel":
                    n.hotel = !0;
                }
            }), r.modules = n, r.underlinePay = e.ui.underlinePay, r.host = e.ui.host, r.copyright = !1, 
            e.ui.hasOwnProperty("copyright") && (r.copyright = e.ui.copyright), r.copyrightUrl = "", 
            e.ui.hasOwnProperty("copyrightUrl") && (r.copyrightUrl = e.ui.copyrightUrl);
            var a = {};
            e.ui.hasOwnProperty("contactInfo") ? ((a = e.ui.contactInfo).hasOwnProperty("contactDisplay") || (a.contactDisplay = 0), 
            a.hasOwnProperty("telDisplay") || (a.telDisplay = 0)) : a = {
                contactDisplay: 0,
                telDisplay: 0
            }, e.ui.hasOwnProperty("learn") && (r.learn = e.ui.learn), r.contactInfo = a, t("config", r), 
            o(r);
        } catch (e) {
            console.log(e);
        }
    });
}

function _(e) {
    var o = n("config");
    o.copyright.height = e.detail.height;
    var a = wx.getSystemInfoSync().windowWidth;
    Number(e.detail.width) < Number(2 * a) ? o.copyright.width = e.detail.width : o.copyright.width = Number(2 * a), 
    o.copyright.style = o.copyright.style, t("config", o), this.setData({
        config: o
    });
}

var P = require("util.js"), D = require("pageUrl.js"), I = require("qqmap-wx-jssdk.js"), N = require("data.js");

module.exports = {
    getPersonInfo: l,
    getWallet: function(e) {
        P.httpRequest("/wallet/").then(function(t) {
            var n = e.data.bindPhone;
            n = "" !== t.phone && null !== t.phone, e.setData({
                cash_balance: Number(t.cash_balance).toFixed(2),
                hongbao: t,
                balance: Number(t.balance).toFixed(2),
                bindPhone: n,
                bindWx: t.has_wx,
                showPhone: t.phone,
                isSetPayPassword: t.has_pay_password,
                mypoint: t.mypoint,
                member: t.memberDiscount,
                membName: t.name,
                grade: t.grade
            }), e.state.isSetPayPassword = t.has_pay_password, wx.hideLoading();
        });
    },
    uploadImg: function(e, t, n) {
        var o = "";
        wx.pro.chooseImage({
            count: t,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ]
        }).then(function(t) {
            o = t.tempFilePaths;
            var n = "/album/0/photo_upload_url/?scenario=" + e;
            return P.httpRequest(n);
        }).then(function(e) {
            wx.showLoading({
                title: "上传中，请稍等..."
            });
            var t = [];
            return o.forEach(function(n) {
                t.push(u(e, n));
            }), wx.pro.all(t);
        }).then(function(e) {
            wx.hideLoading(), n(e, o);
        });
    },
    refreshToken: function() {
        var e = {
            grant_type: "refresh_token",
            refresh_token: n("refresh_token"),
            client_id: "string",
            client_secret: "string"
        };
        return P.httpRequest("/oauth/token/", e, "POST").then(function(e) {
            return "success" === e.result ? (p(e.token), e) : f();
        }).catch(function(e) {
            return wx.removeStorageSync("refresh_token"), e;
        });
    },
    getCountDown: function(e, t) {
        setInterval(function() {
            var n = Date.parse(new Date()), o = e - n;
            if (e - n != 0) {
                var a = parseInt(o / 1e3), r = Math.floor(a / 86400), s = Math.floor((a - 24 * r * 60 * 60) / 3600), i = Math.floor((a - 24 * r * 60 * 60 - 3600 * s) / 60), c = Math.floor(a - 24 * r * 60 * 60 - 3600 * s - 60 * i);
                r < 10 && (r = "0" + r), i < 10 && (i = "0" + i), c < 10 && (c = "0" + c), t(s + "小时 " + i + "分钟 " + c + "秒");
            }
        }, 1e3);
    },
    getExtConfig: e,
    hdhInfo: function() {
        var n = "/hdh/" + e().acid + "/";
        P.httpRequest(n).then(function(e) {
            t("hdhInfo", e);
        });
    },
    ewmOpenWin: function(e) {
        console.log(JSON.stringify(e));
        var t = decodeURIComponent(e.scene);
        if (!t || "undefined" === t) return !1;
        if (!isNaN(t)) {
            if (!e.query || void 0 === e.query) return !1;
            if (!e.query.scene || void 0 === e.query.scene) return !1;
            t = decodeURIComponent(e.query.scene);
        }
        var n = t.split("_");
        return !(n.length < 1 || ("code" === n[0] ? w(n[1]) : b(n, t), 0));
    },
    yanzhengma: w,
    getToken: f,
    getConfig: S,
    configData: function(o, a) {
        var r = "/hdh/" + e().acid + "/config/?key=" + o, s = n("config");
        return P.httpRequest(r).then(function(e) {
            if ("album" === o && (s.album = e.album), "shop" === o && (s.shop = e.shop), "learn" === o && (s.learn = e.learn), 
            "hongbao" === o) {
                var n = {};
                e.hasOwnProperty("hongbao") && (n = e.hongbao, e.hongbao.hasOwnProperty("isFixed") || (e.hongbao.isFixed = 0), 
                e.hongbao.hasOwnProperty("isOpen") || (e.hongbao.isOpen = 0)), s.hongbao = n;
            }
            "activity" === o && (s.activity = e.activity), "news" === o && (s.news = e.news), 
            "catalog" === o && (s.catalog = e.catalog), t("config", s), a(s);
        });
    },
    setStorage: t,
    getStorage: n,
    seeBigImg: m,
    openMap: y,
    phoneCall: x,
    openUrl: v,
    getAccessToken: function() {
        var e = n("token");
        if (!e) return null;
        var t = n("expire_at");
        return t && Date.parse(new Date()) < t ? e : (d(), null);
    },
    removeAccessToken: d,
    isNull: r,
    showClickModal: o,
    showTimeToast: function(e) {
        wx.showToast({
            title: e,
            duration: 2e3,
            icon: "loading",
            mask: !0
        });
    },
    wxAuthorize: function(e, t) {
        l().then(function(e) {
            e.avatar_url.original_url && e.displayname ? t(!0) : wx.showModal({
                title: "提示",
                content: "使用该功能需要授权获取您的微信用户信息",
                success: function(e) {
                    e.cancel || wx.openSetting({
                        success: function(e) {
                            console.log("scope.userInfo:" + JSON.stringify(e.authSetting["scope.userInfo"])), 
                            !0 === e.authSetting["scope.userInfo"] ? (console.log("authorize success"), t(!0)) : t(!1);
                        }
                    });
                }
            });
        });
    },
    goTopEvent: function(e, t) {
        var n = !1;
        n = !!wx.pageScrollTo, t > 300 && !e.data.showGoTop ? e.setData({
            showGoTop: !0,
            isPageScrollTo: n
        }) : t < 300 && e.data.showGoTop && e.setData({
            showGoTop: !1,
            isPageScrollTo: n
        });
    },
    isscrollToPage: function(e) {
        "shopList" === e.data.interfaceName && "side" === e.data.shopTempName ? e.setData({
            scrollTop: 0
        }) : wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : o("您当前微信版本过低");
    },
    dataListHandle: function(e, t, n, o) {
        wx.stopPullDownRefresh(), t.count > 0 ? n = 0 === o ? t.results : n.concat(t.results) : 0 === o && (n = []);
        var a = !0;
        return t.hasOwnProperty("next") ? (console.log("count:" + t.count + ";next:" + t.next), 
        0 === t.next ? (e.state.hasmore = !1, a = !1) : (e.state.hasmore = !0, a = !0)) : e.state.hasmore = !1, 
        e.state.pageOnShow = !0, e.state.isOnReachBottom = !0, e.state.isonPullDownRefresh = !1, 
        e.state.scrolltolower = !0, wx.hideLoading(), {
            list: n,
            hasNext: a
        };
    },
    location: function(e, o, a) {
        if (e.state.locTypes = o, "nearby" === o) {
            if (n("position") && !s(n("position"))) return void a(n("position"));
            wx.getLocation({
                type: "wgs84",
                success: function(e) {
                    t("position", {
                        lat: e.latitude,
                        lng: e.longitude
                    }), h(e.latitude, e.longitude), a(e);
                },
                fail: function() {
                    var t = g(e, o);
                    a(t);
                }
            });
        } else "public" === o ? wx.chooseLocation({
            success: function(n) {
                n.hasOwnProperty("address") && (e.state.address_lng = n.latitude + "|" + n.longitude, 
                t("publicAddress", n.address), h(n.latitude, n.longitude), e.store({
                    region: n.address
                }));
            },
            fail: function() {
                g(e, o);
            }
        }) : "xiadan" !== o && "point" !== o || wx.chooseAddress({
            success: function(t) {
                if ("chooseAddress:ok" === t.errMsg) {
                    var n = t;
                    n.name = t.userName, n.tel = t.telNumber, n.address = t.provinceName + t.cityName + t.countyName + t.detailInfo, 
                    e.store({
                        addressInfo: n
                    }), "xiadan" === o && e.calculateOrderPrice();
                }
            },
            fail: function() {
                g(e, o);
            }
        });
    },
    scopeRecord: function() {
        if (!wx.getSetting) return wx.hideLoading(), void wx.showModal({
            title: "提示",
            content: "当前微信版本过低，请升级至高版本",
            showCancel: !1
        });
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.record"] || wx.authorize({
                    scope: "scope.record",
                    success: function() {},
                    fail: function(e) {
                        wx.showModal({
                            title: "用户未授权",
                            content: "如需正常使用该功能，请点击“确定”并在授权管理中选中“录音功能”，然后打开开关，即可使用",
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && wx.openSetting({
                                    success: function(e) {}
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    uploadAudio: function(e, t, n, o) {
        var a = "/album/0/audio_upload_url/?scenario=hongbao&audioSize=" + n, r = 0;
        P.httpRequest(a).then(function(n) {
            r = n.process_delay;
            var o = new Date(), a = n.key_prefix + o.getFullYear() + o.getMonth() + o.getDate() + o.getHours() + o.getMinutes() + o.getSeconds() + Math.floor(1e5 * Math.random()) + "_hb_" + e;
            return wx.pro.uploadFile({
                url: n.image_upload_url,
                filePath: t,
                name: "file",
                formData: {
                    token: n.token,
                    key: a
                }
            });
        }).then(function(e) {
            o(e, r);
        });
    },
    IsInArray: function(e, t) {
        return -1 !== ("," + e.join(",") + ",").indexOf("," + t + ",");
    },
    marquee: function(e, t) {
        e.state.gonggao_timer && clearTimeout(e.state.gonggao_timer);
        var n = e.data.marquee, o = wx.getSystemInfoSync().windowWidth;
        t || (t = "请添加公告内容");
        var a = 14 * t.length + 28;
        n.size && (n.size = n.size.slice(0, 2), a = t.length * n.size);
        var r = {
            title: t
        }, s = parseInt((a + o) / 60 * 1e3), i = wx.createAnimation({
            duration: 1e3,
            timingFunction: "step-start"
        });
        i.translate(o).step(), r.animation = i.export(), e.store({
            gonggao: r
        }), e.state.gonggao_timer = setTimeout(function() {
            var n = wx.createAnimation({
                duration: s
            });
            n.translate(-a).step(), r.animation = n.export(), e.store({
                gonggao: r
            }), e.state.gonggao_timer = setTimeout(function() {
                e.runGonggao(t);
            }, s);
        }, 1e3);
    },
    prompt: function(e, t) {
        wx.hideLoading(), t || (t = "获取数据失败"), 404 !== e && 403 !== e || wx.showModal({
            title: "提示",
            content: t,
            showCancel: !1,
            success: function(e) {
                wx.navigateBack({});
            }
        });
    },
    timeCountDown: function(e, t, n) {
        var o = 0;
        if ("ptd" === n ? Number(t) > 0 && (o = 1e3 * Number(t)) : o = (t = P.formatTimeStamp(t)) - Date.parse(new Date()), 
        Number(o) <= 0) return clearInterval(e.data.time), {
            hour: "00",
            minute: "00",
            second: "00"
        };
        var a = parseInt(o / 1e3), r = Math.floor(a / 86400), s = Math.floor((a - 24 * r * 60 * 60) / 3600), i = Math.floor((a - 24 * r * 60 * 60 - 3600 * s) / 60), c = Math.floor(a - 24 * r * 60 * 60 - 3600 * s - 60 * i);
        return s < 10 && (s = "0" + s), i < 10 && (i = "0" + i), c < 10 && (c = "0" + c), 
        {
            day: r,
            hour: s,
            minute: i,
            second: c
        };
    },
    getAlter: function(e, o, a) {
        var r = "/hdh/" + getApp().globalData.acid + "/ads/?type=" + o;
        P.httpRequest(r).then(function(e) {
            var r = "hide";
            if (e.results.length > 0) if ("indexpop" === o) {
                var s = n("indexpop");
                s ? s.link !== e.results[0].link || s.status ? s.link !== e.results[0].link && (r = "show") : s.hasOwnProperty("status") && !s.status && (r = "show") : r = "show", 
                "show" === r && t("indexpop", e.results[0]);
            } else if ("paypop" === o) {
                var i = n("paypop");
                i ? i.link === e.results[0].link ? i.hasOwnProperty("status") && !i.status && (r = "show") : i.link !== e.results[0].link && (r = "show") : r = "show", 
                "show" === r && t("paypop", e.results[0]);
            }
            a(e.results, r);
        });
    },
    commonFun: function(t) {
        i(t), S(function(o) {
            console.log("config update success"), console.log(n("config")), t.setData({
                config: n("config"),
                peise: e().colors,
                myInfo: n("userInfo")
            });
        }), t.logoSize = _, t.logoEvent = T, t.telEvent = k;
    },
    getDistance: function(e, t, n) {
        wx.canIUse("createSelectorQuery") && wx.createSelectorQuery().select("#" + t).boundingClientRect(function(t) {
            0 === Number(e.state.queryTop) && (e.state.queryTop = t.top), n(e.state.queryTop);
        }).exec();
    },
    nullObject: s,
    toReceiveHb: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/commandHb/pages/receiveHb/receiveHb?id=" + t
        });
    },
    toSendHb: function(e) {
        var t = e.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/commandHb/pages/publishHb/publishHb?id=" + t.id + "&name=" + t.name
        });
    },
    payAndBingPhoneSetData: function(e, t) {
        e.setData({
            CountdownVal: [ "发送验证码", "发送验证码", "发送验证码", "发送验证码" ],
            tankuang: [ "hide", "hide", "hide", "hide" ],
            CountdownTime: [ 60, 60, 60, 60 ],
            onClick: [ !0, !0, !0, !0 ],
            clearTimeout: !0,
            scenario: [ "change_password", "change_pay_password" ],
            total_money: 0,
            cash_balance: 0,
            paymentId: "",
            showPayMethod: !1,
            payMethod: [ "success", "circle" ],
            payTk: "hide",
            Board: "show",
            passwords: "",
            showPassword: [ "", "", "", "", "", "" ],
            passwordLength: 0,
            isSetPayPassword: "",
            alterHidden: "hide"
        }), t();
    },
    updateTabOffsetTop: function(e) {
        wx.createSelectorQuery && setTimeout(function() {
            var t = wx.createSelectorQuery();
            t.select("#tab").boundingClientRect(), t.selectViewport().scrollOffset(), t.exec(function(t) {
                t[0] && t[1] && (t[1].scrollTop > 0 ? t[0].top > 0 ? e.tabOffsetTop = t[1].scrollTop + t[0].top : e.tabOffsetTop = t[1].scrollTop - Math.abs(t[0].bottom) + 2 * t[0].height : e.tabOffsetTop = t[0].top);
            });
        }, 1500);
    },
    scrollIsTabFixed: function(e, t) {
        if (null !== e.tabOffsetTop) {
            var n = e.data.isTabFixed, o = t.scrollTop >= e.tabOffsetTop;
            n != o && e.setData({
                isTabFixed: o
            });
        }
    },
    getSysInfo: i
};