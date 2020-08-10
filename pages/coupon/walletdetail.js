var t = require("../../utils/api.js"), e = getApp(), o = require("../../utils/monitor/monitor.js");

Page({
    data: {
        ticketList: [],
        param: {},
        coffeeStoreDesc: "",
        isIpx: e.globalData.isIpx,
        dialog: !1,
        dailogText: ""
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
            url: "/resource/m/promotion/myself/list",
            options: {
                loading: !1
            },
            data: this.data.param
        }).then(function(t) {
            wx.hideLoading(), t.content && e.setData({
                ticketList: t.content
            });
        });
    },
    openDesc: function(t) {
        var e = "", o = "咖啡钱包说明", n = t.currentTarget.dataset.item;
        n && n.detailDesc ? (o = "使用规则", e = n.detailDesc.replace(/\n/g, "\r\n")) : e = this.data.coffeeStoreDesc.replace(/\n/g, "\r\n"), 
        wx.showModal({
            title: o,
            content: e,
            showCancel: !1,
            confirmColor: "#f2cba4",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    openModal: function() {
        wx.showModal({
            title: "",
            content: "",
            showCancel: !1,
            confirmColor: "#f2cba4",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    goBuyTicket: function() {
        wx.navigateTo({
            url: "/pages/coupon/walletbuy"
        });
    },
    onLoad: function(t) {
        this.setData({
            param: {
                coffeeStoreLevelId: t.coffeeStoreLevelId,
                typeDesc: t.typeDesc,
                price: t.price,
                isAll: t.isAll
            }
        }), this.getWalletList(), this.getCoffeeStoreDesc(), o.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});