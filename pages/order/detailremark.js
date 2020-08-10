var o = require("../../utils/monitor/monitor.js");

Page({
    data: {
        remark: ""
    },
    onLoad: function(n) {
        n.remark && this.setData({
            remark: decodeURIComponent(n.remark)
        }), o.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});