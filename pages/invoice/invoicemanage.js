var n = getApp(), e = require("../../utils/monitor/monitor.js");

Page({
    data: {
        list: [ {
            name: "开具发票",
            page: "/pages/invoice/invoicelist",
            lastIndex: !1
        }, {
            name: "发票记录",
            page: "/pages/invoice/invoicerecord",
            lastIndex: !1
        }, {
            name: "发票抬头",
            page: "/pages/invoice/invoicehead",
            lastIndex: !0
        } ]
    },
    goLink: function(n) {
        n.currentTarget && n.currentTarget.dataset && n.currentTarget.dataset.page && wx.navigateTo({
            url: n.currentTarget.dataset.page
        });
    },
    onLoad: function(n) {
        e.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        n.globalData.invoiceType = "1", n.globalData.allInvoiceList = "", n.globalData.invoiceList = "";
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});