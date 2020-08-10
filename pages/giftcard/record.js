function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var n = t(require("./../../service/login.js")), e = t(require("./../../utils/api.js")), i = require("../../utils/monitor/monitor.js");

Page({
    data: {
        curIndex: 2,
        giftList: [],
        loadingFlag: !1,
        giftInfo: {}
    },
    checkNav: function(t) {
        var n = this;
        t.currentTarget.dataset.index && this.setData({
            curIndex: t.currentTarget.dataset.index,
            loadingFlag: !1,
            giftList: []
        }, function() {
            n.getGiftList();
        });
    },
    getGiftList: function() {
        var t = this;
        e.default.ajax({
            url: "/resource/m/promotion/myself/givenCoffeeStockRecord",
            data: {
                giveType: this.data.curIndex,
                mobile: n.default.getLoginMobile()
            },
            options: {
                loading: !1
            }
        }).then(function(n) {
            if (n && n.content && n.content.givenCoffeeList) {
                Object.assign(n.content.givenCoffeeList, {
                    status: t.data.curIndex
                });
                t.setData({
                    loadingFlag: !0,
                    giftList: n.content.givenCoffeeList,
                    giftInfo: n.content
                });
            }
        });
    },
    cancelSend: function(t) {
        var n = this, i = t.currentTarget.dataset.index, o = n.data.giftList;
        o.length >= i && wx.showModal({
            content: "确认取消转赠？",
            showCancel: !0,
            cancelText: "再想想",
            cancelColor: "#999999",
            confirmColor: "#f2cba4",
            confirmText: "确认",
            success: function(t) {
                t.confirm && e.default.ajax({
                    url: "/resource/m/promotion/myself/CancelGiven",
                    data: {
                        giveBatchNo: o[i].giveBatchNo
                    },
                    options: {
                        needOriginResult: !0
                    }
                }).then(function(t) {
                    t.content ? wx.showModal({
                        content: t.content,
                        confirmText: "我知道了",
                        confirmColor: "#f2cba4",
                        showCancel: !1,
                        success: function() {
                            o.splice(i, 1);
                            var t = n.data.giftInfo.giftCardTransferringCount - 1;
                            n.setData({
                                giftList: o,
                                "giftInfo.giftCardTransferringCount": t
                            });
                        }
                    }) : wx.showToast({
                        title: t.msg,
                        icon: "none",
                        duration: 2e3,
                        success: function() {
                            n.getGiftList();
                        }
                    });
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    toDetail: function(t) {
        t.currentTarget.dataset.gift && wx.navigateTo({
            url: "/pages/giftcard/recordDetail?detail=" + JSON.stringify(t.currentTarget.dataset.gift) + "&status=" + this.data.curIndex
        });
    },
    onLoad: function(t) {
        i.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        this.getGiftList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});