function e(e, t, a) {
    var l = t.currentTarget.dataset.index, u = e.state.inputVal, i = e.data.lists;
    c.uploadImg("community", a, function(t, n) {
        n.forEach(function(e) {
            -1 === Number(a) ? i[l].value = e : i[l].value.push(e);
        }), t.forEach(function(e) {
            var t = {
                oss_object: JSON.parse(e.data).url
            };
            -1 === Number(a) ? u[l].value = t : u[l].value.push(t);
        }), e.state.inputVal = u, e.setData({
            lists: i
        });
    });
}

function t(t, a) {
    var l = a.currentTarget.dataset.num;
    1 === Number(l) ? e(t, a, -1) : e(t, a, 9 - t.state.inputVal[a.currentTarget.dataset.index].value.length);
}

function a(e, t) {
    var a = t.currentTarget.dataset.index, l = t.currentTarget.dataset.imgindex, u = e.data.lists;
    c.seeBigImg(2, u[a].value[l], u[a].value, "swipers");
}

function l(e, t) {
    var a = t.currentTarget.dataset.index, l = t.currentTarget.dataset.imgindex;
    console.log(11, l);
    var u = e.state.inputVal;
    u[a].value.splice(l, 1), e.state.inputVal = u;
    var i = e.data.lists;
    i[a].value.splice(l, 1), e.setData({
        lists: i
    });
}

function u(e, t) {
    var a = t.currentTarget.dataset.index, l = t.detail.value, u = e.state.inputVal;
    u[a].value = l.split("_")[0];
    var i = e.data.lists, n = i[a].choice;
    n.forEach(function(e, t) {
        n[t].checked = !1;
    }), n[l.split("_")[1]].checked = !0, e.state.inputVal = u, e.setData({
        lists: i
    });
}

function i(e, t) {
    var a = t.currentTarget.dataset.index, l = e.data.lists, u = l[a].choice, i = e.state.inputVal, n = t.detail.value;
    u.forEach(function(e, t) {
        u[t].checked = !1;
    });
    var s = "";
    n.forEach(function(e, t) {
        n[t] = e.split("_"), u[n[t][1]].checked = !0, s += n[t][0] + ",";
    }), i[a].value = s.substring(0, s.length - 1), e.state.inputVal = i, e.setData({
        lists: l
    });
}

function n(e, t) {
    var a = e.data.lists, l = e.state.inputVal, u = t.currentTarget.dataset.datatypes, i = t.currentTarget.dataset.index;
    if ("datetime" === u) {
        var n = t.currentTarget.dataset.date;
        1 === Number(n) ? (a[i].value2 ? (a[i].value = t.detail.value + " " + a[i].value2, 
        l[i].value = t.detail.value + " " + a[i].value2) : (a[i].value = t.detail.value, 
        l[i].value = t.detail.value), a[i].value1 = t.detail.value, l[i].value1 = t.detail.value) : (a[i].value1 ? (a[i].value = a[i].value1 + " " + t.detail.value, 
        l[i].value = a[i].value1 + " " + t.detail.value) : (a[i].value = t.detail.value, 
        l[i].value = t.detail.value), a[i].value2 = t.detail.value, l[i].value2 = t.detail.value);
    } else a[i].value = t.detail.value, l[i].value = t.detail.value;
    e.state.inputVal = l, e.setData({
        lists: a
    });
}

function s(e, t) {
    if (t) {
        var a = e.state.inputVal, l = e.data.lists, u = t.currentTarget.dataset.index, i = t.currentTarget.dataset.datatypes, n = t.detail.value;
        if ("d" === i) {
            console.log(111);
            var s = d.getFormatDate1(new Date(n.replace(/-/g, "/"))), r = d.getFormatDate1(new Date());
            r >= s ? (n = r, a[u].mowStatus = !0) : a[u].mowStatus = !1;
        }
        if ("t" === i) {
            console.log(222);
            var v = d.getFormatDate2(new Date());
            v >= n && (n = v);
        }
        5 === Number(a[u].typeid) || "datetime" === a[u].type ? (console.log(333), "d" === i && (l[u].value.d5 = n, 
        a[u].mowStatus ? l[u].value.st5 = d.getFormatDate2(new Date()) : l[u].value.st5 = "00:00"), 
        "t" === i && (l[u].value.t5 = n, a[u].mowStatus || (l[u].value.t5 = t.detail.value)), 
        a[u].value = l[u].value.d5 + " " + l[u].value.t5) : (a[u].value = n, l[u].value = n), 
        e.state.inputVal = a, e.setData({
            lists: l
        });
    }
}

function r(e, t) {
    var a = t.currentTarget.dataset.val, l = t.currentTarget.dataset.index;
    "请输入内容" === a && (a = "");
    var u = e.state.inputVal;
    u[l].value = a, e.state.inputVal = u;
    var i = e.data.lists;
    i[l].value = a, i[l].textMul = !0, e.setData({
        lists: i
    });
}

function v(e, t) {
    var a = t.currentTarget.dataset.index, l = e.state.inputVal, u = t.detail.value;
    "" === u && (u = "请输入内容"), l[a].value = t.detail.value, e.state.inputVal = l;
    var i = e.data.lists;
    i[a].value = u, i[a].textMul = !1, e.setData({
        lists: i
    });
}

function o(e, t) {
    var a = t.currentTarget.dataset.index, l = e.state.inputVal;
    l[a].value = t.detail.value, e.state.inputVal = l;
    var u = e.data.lists;
    u[a].value = t.detail.value, e.setData({
        lists: u
    });
}

var d = require("util.js"), c = require("common.js");

module.exports = {
    eventChange: function(e, d) {
        var c = d.currentTarget.dataset;
        "seeBigImg" === c.types ? a(e, d) : "removeImg" === c.types ? l(e, d) : "uploadImgs" === c.types ? t(e, d) : "radioChange" === c.types ? u(e, d) : "checkboxChange" === c.types ? i(e, d) : "pickerChange" === c.types ? n(e, d) : "dateChange" === c.types ? s(e, d) : "textMultipleFocus" === c.types ? r(e, d) : "inputText" === c.types ? v(e, d) : "singleline" === c.types && o(e, d);
    },
    inputData: function(e, t) {
        for (var a = [], l = d.getFormatDate1(new Date()), u = d.getFormatDate2(new Date()), i = 0; i < t.length; i += 1) !function(e) {
            if (a.push({
                id: t[e].id,
                typeid: t[e].typeid,
                type: t[e].type,
                value: ""
            }), t[e].hasOwnProperty("required") && (t[e].isMust = 0, a[e].isMust = 0, t[e].required && (t[e].isMust = 1, 
            a[e].isMust = 1)), t[e].hasOwnProperty("name") && (a[e].name = t[e].name, t[e].title = t[e].name), 
            t[e].hasOwnProperty("title") && (a[e].name = t[e].title, t[e].title = t[e].title), 
            1 !== Number(t[e].typeid) && "multiple_line" !== t[e].type || (t[e].value = "请输入内容", 
            t[e].textMul = !1), 2 === Number(t[e].typeid) || "single_choice" === t[e].type) {
                var i = "";
                t[e].hasOwnProperty("choice") && (i = t[e].choice), t[e].hasOwnProperty("question") && (i = t[e].question), 
                t[e].choice = [], i.forEach(function(a) {
                    t[e].choice.push({
                        checked: !1,
                        name: a,
                        value: a
                    });
                });
            }
            if (3 === Number(t[e].typeid) || "multiple_choice" === t[e].type) {
                var n = "";
                t[e].hasOwnProperty("choice") && (n = t[e].choice), t[e].hasOwnProperty("question") && (n = t[e].question), 
                t[e].choice = [], n.forEach(function(a) {
                    t[e].choice.push({
                        checked: !1,
                        name: a,
                        value: a
                    });
                });
            }
            4 !== Number(t[e].typeid) && "picture" !== t[e].type || (t[e].value = [], a[e].value = []), 
            5 !== Number(t[e].typeid) && "datetime" !== t[e].type || (t[e].value = {
                d5: l,
                t5: u,
                sd5: l,
                st5: u
            }, a[e].value = l + " " + u, a[e].mowStatus = !0), 6 !== Number(t[e].typeid) && "date" !== t[e].type || (t[e].value = l, 
            t[e].startDate = l, a[e].value = l), 7 !== Number(t[e].typeid) && "time" !== t[e].type || (t[e].value = u, 
            t[e].startTime = u, a[e].value = u);
        }(i);
        e.state.inputVal = a, e.setData({
            lists: t
        });
    },
    contentJudge: function(e, t) {
        for (var a = e.state.inputVal, l = 0; l < a.length; l += 1) {
            var u = a[l];
            if (1 === Number(u.isMust)) {
                if ("picture" === u.type && 0 === u.value.length) return void c.showClickModal("请上传" + u.name);
                if ("single_choice" === u.type && 0 === u.value.length) return void c.showClickModal("请选择" + u.name);
                if ("multiple_choice" === u.type && 0 === u.value.length) return void c.showClickModal("请选择" + u.name);
                if ("datetime" === u.type && 0 === u.value.length) return void c.showClickModal("请选择" + u.name);
                if ("date" === u.type && 0 === u.value.length) return void c.showClickModal("请选择" + u.name);
                if ("time" === u.type && 0 === u.value.length) return void c.showClickModal("请选择" + u.name);
                if ("single_line" === u.type && 0 === u.value.length) return void c.showClickModal("请填写" + u.name);
                if ("multiple_line" === u.type && 0 === u.value.length) return void c.showClickModal("请填写" + u.name);
                if ("phone" === u.type && 0 === u.value.length) return void c.showTimeToast("请先绑定" + u.name);
                if ("number" === u.type && c.isNull(u.value)) return void c.showTimeToast("请输入" + u.name);
                if ("phone" === u.type && ("未绑定" === u.value || 0 === u.value.length)) return void wx.showModal({
                    title: "提示",
                    content: "请绑定手机号",
                    showCancel: !1,
                    success: function(t) {
                        var a = e.data.tankuang;
                        a[3] = "show", e.store({
                            tankuang: a
                        });
                    }
                });
                if ("email" === u.type) {
                    if (0 === u.value.length) return void c.showTimeToast("请输入邮箱");
                    if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(u.value)) return void c.showTimeToast("邮箱格式错误");
                }
            }
        }
        t(a);
    }
};