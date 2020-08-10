var t = require("../../utils/monitor/monitor.js");

Page({
    data: {
        orderStatus: "",
        amount: 0,
        paramFrom: ""
    },
    onLoad: function(a) {
        this.setData({
            orderStatus: a.status || "success",
            amount: a.amount,
            paramFrom: a.from
        }), "success" === this.data.orderStatus ? (wx.setNavigationBarTitle({
            title: "购买成功"
        }), this.setBuySuccessToCleanWallet()) : wx.setNavigationBarTitle({
            title: "购买失败"
        }), t.onLoad(this);
    },
    setBuySuccessToCleanWallet: function() {
        var t = getCurrentPages(), a = t[t.length - 2];
        "pages/coupon/walletbuy" === a.route && a.setData({
            selectedList: []
        });
    },
    naviBackConfirm: function() {
        wx.navigateBack();
    },
    naviBack: function() {
        wx.navigateBack({
            delta: 2
        });
    },
    jumpMenu: function() {
        wx.switchTab({
            url: "/pages/index/menu"
        });
    },
    jumpWallet: function() {
        wx.navigateTo({
            url: "/pages/coupon/wallet"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {}
});