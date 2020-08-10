!function(e) {
    e && e.__esModule;
}(require("../../service/order.js"));

var e = require("../../utils/qrcode.js"), o = require("../../utils/api.js"), t = require("../../utils/monitor/monitor.js"), a = getApp();

Page({
    data: {
        takeMealInfo: {},
        takeMealDesc: "",
        orderId: ""
    },
    ajaxLoad: function() {
        var e = this;
        o.ajax({
            url: "/resource/m/order/detail",
            data: {
                orderId: this.data.orderId
            }
        }).then(function(o) {
            e.setData({
                takeMealInfo: o.content.takeMealCodeInfo,
                takeMealDesc: o.content.takeCodeDesc
            }), e.showQrcode();
        });
    },
    onLoad: function(e) {
        this.setData({
            orderId: e.orderId
        }), e.orderId || console.error("订单码空"), this.ajaxLoad(), t.onLoad(this);
    },
    showQrcode: function() {
        var o = e.createQrCodeImg(this.data.takeMealInfo.takeOrderId, {
            size: 180
        });
        this.setData({
            imageData: o
        });
    },
    onReady: function() {},
    onShow: function() {
        o.scanHandler({
            title: "取餐码",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return a.globalData.share;
    }
});