var t = require("../../utils/api.js"), e = require("../../utils/_wx.js"), o = require("../../utils/monitor/monitor.js"), n = getApp();

Page({
    data: {
        ticketList: [],
        coffeeStoreDesc: "",
        isIpx: n.globalData.isIpx,
        dialog: !1,
        dailogText: ""
    },
    goBuyTicket: function() {
        wx.navigateTo({
            url: "/pages/coupon/walletbuy"
        });
    },
    getCoffeeStoreDesc: function() {
        var e = this;
        t.ajax({
            url: "/resource/m/promotion/myself/coffeeStoreIntroduction",
            options: {
                loading: !1
            }
        }).then(function(t) {
            wx.hideLoading(), t.content && e.setData({
                coffeeStoreDesc: t.content
            });
        });
    },
    getWalletList: function() {
        var e = this;
        t.ajax({
            url: "/resource/m/promotion/myself/mainlist"
        }).then(function(t) {
            wx.hideLoading(), t.content && e.setData({
                ticketList: t.content
            });
        });
    },
    selectItem: function(t) {
        var e = t.currentTarget.dataset.item;
        t.targetUrl = "./walletdetail?coffeeStoreLevelId=" + e.coffeeStoreLevelId + "&typeDesc=" + e.typeDesc + "&price=" + e.price + "&isAll=" + e.isAll, 
        wx.navigateTo({
            url: t.targetUrl
        });
    },
    openDesc: function() {
        var t = this.data.coffeeStoreDesc;
        t = t.replace(/\n/g, "\r\n"), e.showModal({
            title: "咖啡钱包说明",
            content: t,
            showCancel: !1,
            confirmColor: "#f2cba4",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    openModal: function() {
        e.showModal({
            title: "",
            content: "",
            showCancel: !1,
            confirmColor: "#f2cba4",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    toGiftCard: function() {
        var e = this;
        t.ajax({
            url: "/resource/m/promotion/myself/checkGiveCoffeeStore",
            data: {
                checkType: 0
            }
        }).then(function(t) {
            t.content.giveDesc ? e.setData({
                dailogText: t.content.giveDesc
            }, function() {
                e.setData({
                    dialog: !0
                });
            }) : wx.navigateTo({
                url: "/pages/giftcard/giftcardmain"
            });
        });
    },
    iKonw: function() {
        this.setData({
            dialog: !1
        });
    },
    toRecord: function() {
        this.setData({
            dialog: !1
        }), wx.navigateTo({
            url: "/pages/giftcard/record"
        });
    },
    onLoad: function(t) {
        o.onLoad(this);
    },
    onReady: function() {},
    onxx: function(t) {},
    onShow: function() {
        this.getWalletList(), this.getCoffeeStoreDesc();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});