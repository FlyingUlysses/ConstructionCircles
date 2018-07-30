var e = require("moment.min.js"), t = require("raven.js");

require("moment.zh-cn.js"), e.locale("zh-cn");

var r = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime1: function(t) {
        return e(t).format("YYYY-MM-DD HH:mm");
    },
    formatTime: function(e) {
        var t = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate(), o = e.getHours(), u = e.getMinutes(), s = e.getSeconds();
        return [ t, n, a ].map(r).join("/") + " " + [ o, u, s ].map(r).join(":");
    },
    notifyError: function(e) {
        console.log(e), t.config("https://81649ba360ca44a5b3db82fb18bee5a1@sentry.io/180942").install(), 
        t.setTransport(function(e) {
            wx.pro.request({
                url: "/notifyError/",
                data: e,
                method: "POST"
            });
        }), t.captureException(e);
    },
    getDateDiff: function(t) {
        return e(t).fromNow();
    },
    getDateDiff1: function(e, t, r) {
        e = e.replace(/\-/g, "/"), t = t.replace(/\-/g, "/"), r = r.toLowerCase();
        var n = new Date(e), a = new Date(t), o = 1;
        switch (r) {
          case "second":
            o = 1e3;
            break;

          case "minute":
            o = 6e4;
            break;

          case "hour":
            o = 36e5;
            break;

          case "day":
            o = 864e5;
        }
        return parseInt((a.getTime() - n.getTime()) / parseInt(o));
    },
    getNowFormatDate: function() {
        return e().format("YYYY-MM-DD HH:mm");
    },
    httpRequest: function(e, t, r, n) {
        var a = r || "GET", o = t || {};
        return n ? wx.pro.request({
            url: e,
            data: o,
            method: a,
            types: n
        }) : wx.pro.request({
            url: e,
            data: o,
            method: a
        });
    },
    changeTimeFormat: function(e) {
        var t = parseInt(e / 3600), r = parseInt(e % 3600 / 60), n = e % 3600 % 60;
        return t = t < 10 ? "0" + t : t, r = r < 10 ? "0" + r : r, n = n < 10 ? "0" + n : n, 
        parseInt(t) > 0 ? t + ":" + r + ":" + n : r + ":" + n;
    },
    getFormatDate: function(t) {
        return e(t).format("YYYY.MM.DD");
    },
    getFormatDate1: function(t) {
        return e(t).format("YYYY-MM-DD");
    },
    getFormatDate2: function(e) {
        var t = new Date(), r = t.getHours(), n = t.getMinutes();
        return r < 10 && (r = "0" + r), n < 10 && (n = "0" + n), r + ":" + n;
    },
    formatPhoneOnkeyUp: function(e) {
        var t = e.replace(/\D/g, "").substring(0, 11), r = t.length;
        return r > 3 && r < 8 ? t = t.substr(0, 3) + " " + t.substr(3) : r >= 8 && (t = t.substr(0, 3) + " " + t.substr(3, 4) + " " + t.substr(7)), 
        t;
    },
    formatTimeStamp: function(e) {
        return new Date(Date.parse(e.replace(/-/g, "/"))).getTime();
    }
};