function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function a(e) {
    var t = this, a = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: a,
        urls: t.data[i].imageUrls
    });
}

function i(e) {}

function r(e) {
    var t = this, a = e.target.dataset.from, i = e.target.dataset.idx;
    void 0 !== a && a.length > 0 && n(e, i, t, a);
}

function n(e, a, i, r) {
    var n = i.data[r];
    if (n && 0 != n.images.length) {
        var o = n.images, s = d(e.detail.width, e.detail.height, i, r), l = o[a].index, g = "" + r, h = !0, m = !1, u = void 0;
        try {
            for (var v, f = l.split(".")[Symbol.iterator](); !(h = (v = f.next()).done); h = !0) g += ".nodes[" + v.value + "]";
        } catch (e) {
            m = !0, u = e;
        } finally {
            try {
                !h && f.return && f.return();
            } finally {
                if (m) throw u;
            }
        }
        var w = g + ".width", c = g + ".height";
        if (e.detail.width === s.imageWidth) {
            var x;
            i.setData((x = {}, t(x, w, s.imageWidth), t(x, c, s.imageheight), x));
        }
    }
}

function d(e, t, a, i) {
    var r = 0, n = 0, d = 0, o = {}, s = a.data[i].view.imagePadding;
    return r = l - 2 * s, e > r ? (n = r, d = n * t / e, o.imageWidth = n, o.imageheight = d) : (o.imageWidth = e, 
    o.imageheight = t), o;
}

var o = e(require("./showdown.js")), s = e(require("./html2json.js")), l = 0, g = 0;

wx.getSystemInfo({
    success: function(e) {
        l = e.windowWidth, g = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', d = arguments[3], l = arguments[4], g = d, h = {};
        if ("html" == t) h = s.default.html2json(n, e); else if ("md" == t || "markdown" == t) {
            var m = new o.default.Converter().makeHtml(n);
            h = s.default.html2json(m, e);
        }
        h.view = {}, h.view.imagePadding = 0, void 0 !== l && (h.view.imagePadding = l);
        var u = {};
        return u[e] = h, g.wxParseImgLoad = r, g.wxParseImgTap = a, g.imgErrorEvent = i, 
        u;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, d = null, o = 0; o < a; o++) {
            var s = n[t + o].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        s.default.emojisInit(e, t, a);
    }
};