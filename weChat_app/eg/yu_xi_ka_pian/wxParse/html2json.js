function e(e) {
    for (var t = {}, r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
    return t;
}

function t(e) {
    var t = [];
    if (0 == s.length || !n) return (d = {}).node = "text", d.text = e, o = [ d ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var r = new RegExp("[:]"), o = e.split(r), i = 0; i < o.length; i++) {
        var l = o[i], d = {};
        n[l] ? (d.node = "element", d.tag = "emoji", d.text = n[l], d.baseSrc = a) : (d.node = "text", 
        d.text = l), t.push(d);
    }
    return t;
}

var r = "https", s = "", a = "", n = {}, o = require("./wxDiscode.js"), i = require("./htmlparser.js"), l = (e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
e("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), d = e("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), c = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
e("wxxxcode-style,script,style,view,scroll-view,block");

module.exports = {
    html2json: function(e, s) {
        var a = [], n = {
            node: s,
            nodes: [],
            images: [],
            imageUrls: []
        }, p = 0;
        return i(e, {
            start: function(e, t, i) {
                var u = {
                    node: "element",
                    tag: e
                };
                if (0 === a.length ? (u.index = p.toString(), p += 1) : (void 0 === (b = a[0]).nodes && (b.nodes = []), 
                u.index = b.index + "." + b.nodes.length), l[e] ? u.tagType = "block" : d[e] ? u.tagType = "inline" : c[e] && (u.tagType = "closeSelf"), 
                0 !== t.length && (u.attr = t.reduce(function(e, t) {
                    var r = t.name, s = t.value;
                    return "class" == r && (u.classStr = s), "style" == r && (u.styleStr = s), "align" == r && (u.styleStr = "text-align:center"), 
                    s.match(/ /) && (s = s.split(" ")), e[r] ? Array.isArray(e[r]) ? e[r].push(s) : e[r] = [ e[r], s ] : e[r] = s, 
                    e;
                }, {})), "img" === u.tag) {
                    u.imgIndex = n.images.length;
                    var g = u.attr.src;
                    "" == g[0] && g.splice(0, 1), g = o.urlToHttpUrl(g, r), u.attr.src = g, u.from = s, 
                    n.images.push(u), n.imageUrls.push(g);
                }
                if ("font" === u.tag || "p" === u.tag) {
                    var h = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], m = [ "36rpx", "40rpx", "48rpx", "50rpx", "60rpx", "72rpx", "104rpx" ], f = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    "font" === u.tag && u.hasOwnProperty("attr") && u.attr.hasOwnProperty("style") && (u.attr.style || (u.attr.style = []), 
                    u.styleStr || (u.styleStr = ""));
                    for (var x in f) if ("color" === x && (u.styleStr ? u.styleStr = "padding: 10rpx 0;" + u.styleStr : u.styleStr = "padding: 10rpx 0;"), 
                    u.hasOwnProperty("attr") && "font" === u.tag && u.attr[x]) {
                        var v = "size" === x ? h[u.attr[x] - 1] : u.attr[x];
                        u.attr.hasOwnProperty("style") && (u.attr.style.push(f[x]), u.attr.style.push(v));
                        var y = "";
                        isNaN(u.attr[x]) || (y = "line-height:" + m[u.attr[x] - 1]), u.styleStr += f[x] + ": " + v + ";" + y;
                    }
                }
                if ("source" === u.tag && (n.source = u.attr.src), i) {
                    var b = a[0] || n;
                    void 0 === b.nodes && (b.nodes = []), b.nodes.push(u);
                } else a.unshift(u);
            },
            end: function(e) {
                var t = a.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && n.source && (t.attr.src = n.source, 
                delete result.source), 0 === a.length) n.nodes.push(t); else {
                    var r = a[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var r = {
                    node: "text",
                    text: e = o.strDiscode(e),
                    textArray: t(e)
                };
                if (0 === a.length) n.nodes.push(r); else {
                    var s = a[0];
                    void 0 === s.nodes && (s.nodes = []), r.index = s.index + "." + s.nodes.length, 
                    s.nodes.push(r);
                }
            },
            comment: function(e) {}
        }), n;
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", r = arguments[2];
        s = e, a = t, n = r;
    }
};