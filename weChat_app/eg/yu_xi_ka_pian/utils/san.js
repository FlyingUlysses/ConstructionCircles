var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(a) {
    return void 0 === a ? "undefined" : t(a);
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : void 0 === a ? "undefined" : t(a);
}, e = require("data.js");

!function() {
    function t(t) {
        var a = wx.getStorageSync("aldstat_uuid");
        return a || (a = "" + Date.now() + Math.floor(1e7 * Math.random()), wx.setStorageSync("aldstat_uuid", a), 
        t.aldstat_is_first_open = !0), a;
    }
    function s() {
        wx.request({
            url: "https://" + c + ".aldwx.com/config/app.json",
            header: {
                AldStat: "MiniApp-Stat"
            },
            method: "GET",
            success: function(t) {
                if (200 === t.statusCode) for (var a in t.data) wx.setStorageSync(a, t.data[a]);
            }
        });
    }
    function n(t, a, e) {
        if (t[a]) {
            var s = t[a];
            t[a] = function(t) {
                e.call(this, t, a), s.call(this, t);
            };
        } else t[a] = function(t) {
            e.call(this, t, a);
        };
    }
    function o(t, a, e) {
        if (t[a]) {
            var s = t[a];
            t[a] = function(t) {
                var n = s.call(this, t);
                return e.call(this, [ t, n ], a), n;
            };
        } else t[a] = function(t) {
            e.call(this, t, a);
        };
    }
    function r(t) {
        this.app = t;
    }
    function _(t) {
        for (var a in t) return !1;
        return !0;
    }
    function i(t) {
        return !(!t && "string" == typeof t || !/^(?!_)(?!.*?_$)[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(t.replace(/\s+/g, "_")));
    }
    function l(t) {
        for (var e in t) {
            if ("object" == a(t[e])) return !1;
            if ("string" === e) return i(e);
            if ("string" == typeof t[e]) return i(t[e]);
        }
        return !0;
    }
    var d = "2", c = "log", u = {
        test: 1
    }, p = 0, h = 0, f = 0, g = 0, w = function(t) {
        wx.login({
            success: function(a) {
                wx.getUserInfo({
                    success: function(a) {
                        t(a);
                    }
                });
            }
        });
    }, v = function(t, a, e) {
        void 0 === arguments[1] && (a = "GET"), void 0 === arguments[2] && (e = "d.html");
        var s = 0;
        !function n() {
            p += 1, t.rq_c = p, wx.request({
                url: "https://" + c + ".aldwx.com/" + e,
                data: t,
                header: {
                    AldStat: "MiniApp-Stat"
                },
                method: a,
                success: function() {},
                fail: function() {
                    s < 2 && (s++, t.retryTimes = s, n());
                }
            });
        }();
    }, y = function(a, e, s, n) {
        var o = {
            ak: u.app_key,
            uu: t(a),
            at: a.aldstat_access_token,
            st: Date.now(),
            tp: s,
            ev: e,
            v: d
        };
        n && (o.ct = n), a.aldstat_qr && (o.qr = a.aldstat_qr), v(o, "GET", "d.html");
    }, m = function(a, e, s, n) {
        void 0 === a.aldstat_showoption && (a.aldstat_showoption = {});
        var o = {
            ak: u.app_key,
            wsr: a.aldstat_showoption,
            uu: t(a),
            at: a.aldstat_access_token,
            st: Date.now(),
            tp: s,
            ev: e,
            nt: a.aldstat_network_type,
            pm: a.aldstat_phone_model,
            pr: a.aldstat_pixel_ratio,
            ww: a.aldstat_window_width,
            wh: a.aldstat_window_height,
            lang: a.aldstat_language,
            wv: a.aldstat_wechat_version,
            lat: a.aldstat_lat,
            lng: a.aldstat_lng,
            spd: a.aldstat_speed,
            v: d
        };
        n && (o.ct = n), a.aldstat_location_name && (o.ln = a.aldstat_location_name), a.aldstat_src && (o.sr = a.aldstat_src), 
        a.aldstat_qr && (o.qr = a.aldstat_qr), v(o, "GET", "d.html");
    };
    r.prototype.debug = function(t) {
        m(this.app, "debug", 0, t);
    }, r.prototype.warn = function(t) {
        m(this.app, "debug", 1, t);
    }, r.prototype.error = function(t) {
        y(this.app, "debug", 2, t);
    }, r.prototype.sendEvent = function(t, e) {
        if (!t || t.length >= 255) return !1;
        if (!i(t)) return !1;
        if ("object" === (void 0 === e ? "undefined" : a(e))) l(e) && m(this.app, "event", t, JSON.stringify(e)); else if ("string" == typeof e && e.length <= 255) {
            if (i(e)) {
                var s = String(e);
                new Object()[s] = e, m(this.app, "event", t, e);
            }
        } else m(this.app, "event", t, !1);
    };
    var S = function() {
        var t = this;
        t.aldstat_duration += Date.now() - t.aldstat_showtime, D(t, "app", "unLaunch");
    }, x = function(t, a, e) {
        void 0 !== wx.getShareInfo ? wx.getShareInfo({
            shareTicket: a,
            success: function(a) {
                m(t, "event", "ald_share_" + e, JSON.stringify(a));
            },
            fail: function() {
                m(t, "event", "ald_share_" + e, "1");
            }
        }) : m(t, "event", "ald_share_" + e, "1");
    }, k = function(a) {
        s();
        var n = e.getData().ext ? 0 : wx.getExtConfigSync();
        u = n.ald_config ? n.ald_config : '"ald_config": {"app_key": "110fa41ff401825c9c67fa15b6cd86fa","getLocation": 0,"getUserinfo": "0"}', 
        n && wx.getExtConfigSync({
            success: function(t) {
                is_while = !1;
            },
            fail: function() {}
        }), this.aldstat = new r(this);
        var o = wx.getStorageSync("aldstat_src");
        o && (this.aldstat_src = o);
        var _ = t(this);
        this.aldstat_uuid = _, this.aldstat_timestamp = Date.now(), this.aldstat_showtime = Date.now(), 
        this.aldstat_duration = 0;
        var i = this;
        i.aldstat_error_count = 0, i.aldstat_page_count = 1, i.aldstat_first_page = 0, this.aldstat_showoption = void 0 !== a ? a : {};
        var l = function() {
            wx.getSystemInfo({
                success: function(t) {
                    i.aldstat_vsdk_version = void 0 === t.SDKVersion ? "1.0.0" : t.SDKVersion, i.aldstat_phone_model = t.model, 
                    i.aldstat_pixel_ratio = t.pixelRatio, i.aldstat_window_width = t.windowWidth, i.aldstat_window_height = t.windowHeight, 
                    i.aldstat_language = t.language, i.aldstat_wechat_version = t.version, i.aldstat_sv = t.system, 
                    i.aldstat_wvv = t.platform;
                },
                complete: function() {
                    u.getLocation && c(), u.getUserinfo && d();
                }
            });
        }, d = function() {
            w(function(t) {
                var a = wx.getStorageSync("aldstat_uuid");
                t.userInfo.uu = a, v(t.userInfo, "GET", "u.html");
            });
        }, c = function() {
            wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    i.aldstat_lat = t.latitude, i.aldstat_lng = t.longitude, i.aldstat_speed = t.speed;
                }
            });
        };
        wx.getNetworkType({
            success: function(t) {
                i.aldstat_network_type = t.networkType;
            },
            complete: l
        });
        var p = wx.getStorageSync("app_session_key_create_launch_upload");
        p ? p > 0 && "number" == typeof p && (i.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())) : i.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random());
    }, b = function(t, a) {
        var e = getApp();
        void 0 === this.aldstat_error_count ? this.aldstat_error_count = 1 : this.aldstat_error_count++, 
        m(e, "event", "ald_error_message", JSON.stringify(t));
    }, D = function(a, e, s) {
        var n = wx.getStorageSync("app_" + s + "_upload");
        if ((n || "launch" === s) && !(n < 1 && "number" == typeof n)) {
            void 0 === a.aldstat_timestamp && (a.aldstat_timestamp = Date.now()), a.aldstat_duration += Date.now() - a.aldstat_showtime;
            var o = wx.getSystemInfoSync();
            a.aldstat_vsdk_version = void 0 === o.SDKVersion ? "1.0.0" : o.SDKVersion, a.aldstat_phone_model = o.model, 
            a.aldstat_pixel_ratio = o.pixelRatio, a.aldstat_window_width = o.windowWidth, a.aldstat_window_height = o.windowHeight, 
            a.aldstat_language = o.language, a.aldstat_wechat_version = o.version;
            var r = {
                ak: u.app_key,
                waid: u.appid,
                wst: u.appsecret,
                uu: t(a),
                at: a.aldstat_access_token,
                wsr: a.aldstat_showoption,
                st: a.aldstat_timestamp,
                dr: a.aldstat_duration,
                et: Date.now(),
                pc: a.aldstat_page_count,
                fp: a.aldstat_first_page,
                lp: a.aldstat_last_page,
                life: s,
                ec: a.aldstat_error_count,
                nt: a.aldstat_network_type,
                pm: a.aldstat_phone_model,
                wsdk: a.aldstat_vsdk_version,
                pr: a.aldstat_pixel_ratio,
                ww: a.aldstat_window_width,
                wh: a.aldstat_window_height,
                lang: a.aldstat_language,
                wv: a.aldstat_wechat_version,
                lat: a.aldstat_lat,
                lng: a.aldstat_lng,
                spd: a.aldstat_speed,
                v: d,
                ev: e,
                sv: a.aldstat_sv,
                wvv: a.aldstat_wvv
            };
            "launch" === s ? h += 1 : "show" === s ? f += 1 : g += 1, r.la_c = h, r.as_c = f, 
            r.ah_c = g, a.page_share_count && "number" == typeof a.page_share_count && (r.sc = a.page_share_count), 
            a.aldstat_is_first_open && (r.ifo = "true"), a.aldstat_location_name && (r.ln = a.aldstat_location_name), 
            a.aldstat_src && (r.sr = a.aldstat_src), a.aldstat_qr && (r.qr = a.aldstat_qr), 
            a.ald_share_src && (r.usr = a.ald_share_src), v(r, "GET", "d.html");
        }
    }, q = function(t) {
        this.aldstat_showtime = Date.now(), this.aldstat_showoption = void 0 !== t ? t : {};
        var a = wx.getStorageSync("app_session_key_create_show_upload");
        a && a > 0 && "number" == typeof a && (this.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())), 
        this.aldstat_duration += Date.now() - this.aldstat_showtime, D(this, "app", "show"), 
        void 0 !== t && (void 0 !== t.shareTicket ? x(this, t.shareTicket, "click") : void 0 !== t.query && void 0 !== t.query.ald_share_src && x(this, "0", "click"));
    }, A = function(t, a) {
        var e = this;
        e.aldstat_is_first_open && (e.aldstat_is_first_open = !1), e.aldstat_duration += Date.now() - e.aldstat_showtime, 
        D(e, "app", "hide");
    }, T = App;
    App = function(t) {
        n(t, "onLaunch", k), n(t, "onUnlaunch", S), n(t, "onShow", q), n(t, "onHide", A), 
        n(t, "onError", b), T(t);
    };
    var M = function(t, a) {
        var e = getApp();
        G(e, this, "hide");
    }, E = function(t, a) {
        var e = getApp();
        G(e, this, "unload");
    }, I = function(t, a) {
        var e = wx.getStorageSync("aldstat_src");
        wx.showShareMenu;
        var s = getApp();
        e && (s.aldstat_src = e), _(t) || (void 0 !== t.aldsrc && (e ? s.aldstat_qr = t.aldsrc : (wx.setStorageSync("aldstat_src", t.aldsrc), 
        s.aldstat_src = t.aldsrc, s.aldstat_qr = t.aldsrc)), wx.getStorageSync("aldstat_uuid"), 
        void 0 !== t.ald_share_src && (s.ald_share_src = t.ald_share_src), this.aldstat_page_args = JSON.stringify(t)), 
        G(s, this, "load");
    }, G = function(a, e, s) {
        var n = wx.getStorageSync("page_" + s + "_upload");
        if ((n || "show" === s) && !(n < 1 && "number" == typeof n)) {
            e.aldstat_start_time = Date.now(), e.aldstat_error_count = 0, a.aldstat_page_count ? a.aldstat_page_count++ : a.aldstat_page_count = 1, 
            a.aldstat_first_page || (a.aldstat_first_page = e.__route__, e.aldstat_is_first_page = !0), 
            a.aldstat_last_page = e.__route__;
            var o = {
                uu: t(a),
                at: a.aldstat_access_token,
                wsr: a.aldstat_showoption,
                ak: u.app_key,
                ev: "page",
                st: e.aldstat_start_time,
                dr: Date.now() - e.aldstat_start_time,
                pp: e.__route__,
                life: s,
                sc: e.page_share_count,
                ec: e.aldstat_error_count,
                nt: a.aldstat_network_type,
                pm: a.aldstat_phone_model,
                pr: a.aldstat_pixel_ratio,
                ww: a.aldstat_window_width,
                wh: a.aldstat_window_height,
                lang: a.aldstat_language,
                wv: a.aldstat_wechat_version,
                lat: a.aldstat_lat,
                lng: a.aldstat_lng,
                spd: a.aldstat_speed,
                v: d,
                wsdk: a.aldstat_vsdk_version,
                sv: a.aldstat_sv,
                wvv: a.aldstat_wvv
            };
            e.aldstat_is_first_page && (o.ifp = "true"), a.aldstat_page_last_page && (o.lp = a.aldstat_page_last_page), 
            a.aldstat_location_name && (o.ln = a.aldstat_location_name), e.aldstat_page_args && (o.ag = e.aldstat_page_args), 
            a.aldstat_src && (o.sr = a.aldstat_src), a.aldstat_qr && (o.qr = a.aldstat_qr), 
            a.ald_share_src && (o.usr = a.ald_share_src), a.aldstat_page_last_page = e.__route__, 
            v(o, "GET", "d.html");
        }
    }, O = function(t, a) {
        var e = getApp();
        G(e, this, "show");
    }, U = function(t, a) {
        var e = getApp();
        m(e, "event", "ald_pulldownrefresh", 1);
    }, j = function(t, a) {
        var e = getApp();
        m(e, "event", "ald_reachbottom", 1);
    }, L = Page, N = function(t, e) {
        var s = this, n = getApp();
        if (void 0 !== t && void 0 !== t[1]) {
            var o = wx.getStorageSync("aldstat_uuid"), r = wx.getStorageSync(o), _ = "";
            if ("undefined" !== n.ald_share_src && n.ald_share_src) {
                var i = (_ = n.ald_share_src).split(",");
                i.length >= 3 && (i.shift(), _ = i.toString()), "" !== _ && (_ = _ + "," + o);
            } else _ = wx.getStorageSync("aldstat_uuid");
            t[1].path && "undefined" !== t[1].path || (u.defaultPath ? t[1].path = u.defaultPath : t[1].path = s.__route__), 
            -1 != t[1].path.indexOf("?") ? t[1].path += "&ald_share_src=" + _ : t[1].path += "?ald_share_src=" + _, 
            m(n, "event", "ald_share_chain", {
                path: n.aldstat_last_page,
                chain: _
            }), "" === r || void 0 === r ? (wx.setStorageSync(o, 1), r = 1, n.page_share_count = r) : (r = parseInt(wx.getStorageSync(o)) + 1, 
            n.page_share_count = r, wx.setStorageSync(o, r)), void 0 !== u.getShareUserInfo && !0 !== u.getShareUserInfo || w(function(t) {
                var a = wx.getStorageSync("aldstat_uuid");
                t.userInfo.uu = a, v(t.userInfo, "GET", "u.html");
            }), t[1], void 0 === t[1].success && (t[1].success = function(t) {}), void 0 === t[1].fail && (t[1].fail = function(t) {});
            var l = t[1].fail, d = t[1].success;
            return t[1].success = function(t) {
                if (new Array(), "object" === a(t.shareTickets)) for (var e = 0; e < t.shareTickets.length; e++) x(n, t.shareTickets[e], "user");
                m(n, "event", "ald_share_status", JSON.stringify(t)), d(t);
            }, t[1].fail = function(t) {
                m(n, "event", "ald_share_status", "fail"), l(t);
            }, t[1];
        }
    };
    Page = function(t) {
        n(t, "onLoad", I), n(t, "onUnload", E), n(t, "onShow", O), n(t, "onHide", M), n(t, "onReachBottom", j), 
        n(t, "onPullDownRefresh", U), void 0 !== t.onShareAppMessage && o(t, "onShareAppMessage", N), 
        L(t);
    };
}();