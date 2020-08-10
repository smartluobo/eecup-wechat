function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../service/wallet.js")), o = t(require("../../service/order.js")), e = (require("../../utils/api.js"), 
"/pages/coupon/walletorderresult"), r = getApp(), i = require("../../utils/monitor/monitor.js");

Page({
    data: {
        paramFrom: "",
        payAgree: !0,
        priceList: [],
        totalCount: 0,
        totalPrice: 0,
        isIpx: r.globalData.isIpx
    },
    checkPayAgree: function(t) {
        this.setData({
            payAgree: !this.data.payAgree
        });
    },
    goCheckout: function() {
        var t = e + "?from=" + this.data.paramFrom + "&amount=" + this.data.totalAmount + "&status=success", a = e + "?from=" + this.data.paramFrom + "&amount=" + this.data.totalAmount + "&status=fail";
        this.data.virtualOrderId && o.default.payOrder(this.data.virtualOrderId, t, 1, a);
    },
    checkout: function() {
        this.data.payAgree && this.goCheckout();
    },
    onLoad: function(t) {
        this.setData({
            paramFrom: t.from || "mystock",
            virtualOrderId: t.virtualOrderId,
            totalAmount: t.totalAmount,
            ticketList: r.globalData.walletConfirmData,
            totalPrice: a.default.getTotalPrice(),
            totalCount: a.default.getTicketsCount()
        }), i.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});