Object.assign = Object.assign && "function" == typeof Object.assign ? Object.assign : function(r) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
}, Array.from = Array.from && "function" == typeof Array.from ? Array.from : function(r) {
    return [].slice.call(r);
};