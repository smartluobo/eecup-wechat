function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("./../../utils/api.js")), n = e(require("./../../service/login.js")), o = require("./../../utils/promise/es6-promise.min.js"), i = (getApp(), 
require("../../utils/monitor/monitor.js"));

Page({
    data: {
        offSet: 0,
        pageSize: 15,
        list: []
    },
    getInvoiceRecord: function() {
        var e = this;
        return new o(function(n, o) {
            t.default.ajax({
                url: "/resource/m/user/receipt/recordlist",
                data: {
                    offSet: e.data.offSet,
                    pageSize: e.data.pageSize
                },
                options: {
                    needOriginResult: !0
                }
            }).then(function(t) {
                t && t.content && 1 === t.code ? (e.setData({
                    list: t.content
                }), n(t)) : (wx.showToast({
                    title: t.msg,
                    icon: "none"
                }), n(!0));
            });
        });
    },
    goDetail: function(e) {
        e && e.currentTarget && e.currentTarget.dataset && wx.navigateTo({
            url: "/pages/invoice/invoicedetail?receiptId=" + e.currentTarget.dataset.receiptid
        });
    },
    onLoad: function(e) {
        i.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        n.default.getLoginStatus().then(function(t) {
            t ? e.getInvoiceRecord() : n.default.loginRouter(!0, "redirectTo", "/pages/invoice/invoicerecord");
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = this;
        this.setData({
            offSet: 0
        }, function() {
            e.getInvoiceRecord().then(function(e) {
                wx.stopPullDownRefresh();
            }).catch(function(e) {
                wx.stopPullDownRefresh();
            });
        });
    },
    onReachBottom: function() {
        var e = this;
        this.setData({
            offSet: ++this.data.offSet
        }, function() {
            e.getInvoiceRecord().then();
        });
    }
});