var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./../../utils/api.js")), n = getApp(), o = require("../../utils/monitor/monitor.js");

Page({
    data: {
        status: 1,
        detailInfo: null,
        isIpx: !1
    },
    openDesc: function(t) {
        t.currentTarget.dataset.rule && wx.showModal({
            title: "使用规则",
            content: t.currentTarget.dataset.rule,
            showCancel: !1,
            confirmColor: "#f2cba4",
            confirmText: "我知道了"
        });
    },
    cancelSend: function() {
        var n = this;
        wx.showModal({
            content: "确认取消转赠？",
            showCancel: !0,
            cancelText: "再想想",
            confirmText: "确认",
            confirmColor: "#f2cba4",
            cancelColor: "#999999",
            success: function(o) {
                o.confirm && t.default.ajax({
                    url: "/resource/m/promotion/myself/CancelGiven",
                    data: {
                        giveBatchNo: n.data.detailInfo.giveBatchNo
                    }
                }).then(function(t) {
                    wx.navigateBack({
                        complete: function() {
                            wx.showModal({
                                content: t.content,
                                confirmText: "我知道了",
                                confirmColor: "#f2cba4",
                                showCancel: !1
                            });
                        }
                    });
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    toCard: function() {
        wx.navigateTo({
            url: "/pages/giftcard/giftcardmain"
        });
    },
    toMenu: function() {
        wx.switchTab({
            url: "/pages/index/menu"
        });
    },
    onLoad: function(t) {
        t.detail && this.setData({
            detailInfo: JSON.parse(t.detail),
            status: t.status
        }), n.globalData.isIpx && this.setData({
            isIpx: n.globalData.isIpx
        }), o.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});