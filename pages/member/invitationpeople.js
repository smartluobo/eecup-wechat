var n = require("../../utils/monitor/monitor.js");

Page({
    data: {
        invitationUrl: ""
    },
    onLoad: function(o) {
        this.setData({
            invitationUrl: decodeURIComponent(o.url)
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