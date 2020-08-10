var n = require("../../utils/monitor/monitor.js");

Page({
    data: {
        redirectUrl: ""
    },
    onLoad: function(o) {
        this.setData({
            redirectUrl: decodeURIComponent(o.redirect_url)
        }), n.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getWebMessage: function(n) {},
    onShareAppMessage: function() {}
});