var t = getApp().globalData.commonFun;

module.exports = {
    uploadImgs: function(a, i) {
        var s = a.data.imgList, e = a.state.imgList_p;
        t.uploadImg("community", i, function(t, i) {
            i.forEach(function(t) {
                s.push(t);
            }), t.forEach(function(t) {
                var a = {
                    oss_object: JSON.parse(t.data).url
                };
                e.push(a);
            }), a.state.imgList_p = e, a.setData({
                imgList: s
            });
        });
    },
    removeImg: function(t, a) {
        var i = t.currentTarget.dataset.index, s = a.data.imgList;
        s.splice(i, 1);
        var e = a.state.imgList_p;
        e.splice(i, 1), a.state.imgList_p = e, a.setData({
            imgList: s
        });
    }
};