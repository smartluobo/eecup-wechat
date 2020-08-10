var o = getApp(), n = require("../../utils/monitor/monitor.js");

Page({
    data: {
        invoiceImgList: []
    },
    onLoad: function(o) {
        n.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            invoiceImgList: o.globalData.invoiceImgList
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});