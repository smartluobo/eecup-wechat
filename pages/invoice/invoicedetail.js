var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./../../utils/api.js")), i = require("./../../utils/promise/es6-promise.min.js"), e = getApp(), a = require("../../utils/monitor/monitor.js");

Page({
    data: {
        detail: {},
        dialogFlag: !1,
        email: "",
        isIpx: !1
    },
    colseWarp: function() {
        this.setData({
            dialogFlag: !1
        });
    },
    reSubmit: function() {
        this.setData({
            dialogFlag: !0,
            email: this.data.detail.email
        });
    },
    emailInput: function(t) {
        t && t.detail && this.setData({
            email: t.detail.value
        });
    },
    checkImg: function() {
        this.data.detail && this.data.detail.imgUrls.length > 0 && (e.globalData.invoiceImgList = this.data.detail.imgUrls), 
        wx.navigateTo({
            url: "/pages/invoice/invoiceimg"
        });
    },
    submit: function() {
        var i = this;
        this.data.email && t.default.ajax({
            url: "/resource/m/user/receipt/resend",
            data: {
                receiptId: this.options.receiptId,
                email: this.data.email
            }
        }).then(function(t) {
            t && t.content && "SUCCESS" === t.status && String(t.content).indexOf("成功") > -1 && (wx.showToast({
                title: "发送成功",
                icon: "none"
            }), i.setData({
                dialogFlag: !1
            }));
        });
    },
    getInvoiceDetail: function() {
        var e = this;
        return new i(function(i, a) {
            t.default.ajax({
                url: "/resource/m/user/receipt/receiptinfo",
                data: {
                    receiptId: e.options.receiptId
                }
            }).then(function(t) {
                t && t.content && (e.setData({
                    detail: t.content
                }), i(t));
            });
        });
    },
    onLoad: function(t) {
        a.onLoad(this), this.setData({
            isIpx: e.globalData.isIpx
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getInvoiceDetail();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});