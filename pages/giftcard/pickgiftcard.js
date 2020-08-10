var t = require("../../utils/api"), a = require("../../utils/monitor/monitor.js"), e = getApp();

Page({
    data: {
        giftCardId: "",
        giftCardImage: "",
        blessingsList: [],
        activeCheck: 0,
        textLength: 0,
        loading: !0,
        textFocus: !1,
        isIpx: e.globalData.isIpx,
        showTextarea: !1,
        text: "",
        scrollEle: ""
    },
    checkBlessing: function(t) {
        this.setData({
            activeCheck: t.currentTarget.dataset.active - 0
        });
    },
    textareaBlur: function() {
        this.setData({
            showTextarea: !1,
            textFocus: !1
        });
    },
    showTextarea: function() {
        var t = this;
        this.setData({
            activeCheck: this.data.blessingsList.length
        }, function() {
            t.setData({
                showTextarea: !0,
                scrollEle: "visual_block"
            }, function() {
                setTimeout(function() {
                    t.setData({
                        textFocus: !0
                    });
                }, 150);
            });
        });
    },
    next: function(t) {
        var a = t.detail.value.blessingsContent.trim(), e = this.data.activeCheck;
        if (e === this.data.blessingsList.length) {
            if ("" === a) a = this.data.blessingsList[0]; else if (/[`#$%^&*+=|{}';\[\]<>/￥…—【】‘；”“’\uD83C\uDF00-\uDFFF\uD83D\uDC00-\uDE4F]/g.test(a)) return wx.showModal({
                content: "祝福语不能包含特殊字符",
                showCancel: !1,
                confirmColor: "#f2cba4",
                confirmText: "我知道了",
                success: function(t) {}
            });
        } else a = this.data.blessingsList[e];
        wx.setStorageSync("giftData", {
            giftCardId: this.data.giftCardId,
            blessingsContent: a
        }), wx.navigateTo({
            url: "/pages/giftcard/pickcoffee"
        });
    },
    contentChange: function(t) {
        this.setData({
            textLength: t.detail.cursor,
            text: t.detail.value
        });
    },
    getCardDetail: function() {
        var a = this;
        t.ajax({
            url: "/resource/m/promotion/giftCard/detail",
            data: {
                giftCardId: this.data.giftCardId
            }
        }).then(function(t) {
            "SUCCESS" === t.status && a.setData({
                loading: !1,
                blessingsList: t.content.blessingsList,
                giftCardImage: t.content.giftCardImage
            });
        });
    },
    onLoad: function(t) {
        this.data.giftCardId = t.giftCardId, this.getCardDetail(), a.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});