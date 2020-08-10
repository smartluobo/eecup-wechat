function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var i = t(require("../../utils/api.js")), e = t(require("./../../config/config.js")), o = require("../../utils/monitor/monitor.js");

Page({
    data: {
        redirectUrl: "",
        giveBatchNo: null,
        shareContent: {}
    },
    getGiftInfo: function() {
        var t = this;
        i.default.ajax({
            url: "/resource/m/promotion/giftCardPresent/splitGiftCard",
            data: {
                giveBatchNo: this.options.giveBatchNo,
                operationSource: 2
            }
        }).then(function(i) {
            if (i && i.content) {
                var e = {
                    title: i.content.blessings,
                    sharePicture: i.content.sharePicture,
                    shareUrl: i.content.shareUrl
                };
                t.setData({
                    shareContent: e
                });
            }
        });
    },
    onLoad: function(t) {
        var i = e.default.wap.domain + "/giftcard/mini?giveBatchNo=" + this.options.giveBatchNo + "&inviteCode=" + this.options.inviteCode + "&activityNo=" + this.options.activityNo;
        this.setData({
            redirectUrl: i
        }), o.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        this.getGiftInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getWebMessage: function(t) {},
    onShareAppMessage: function() {
        return {
            title: this.data.shareContent.title,
            path: "/pages/giftcard/receivecard?giveBatchNo=" + this.options.giveBatchNo + "&inviteCode=" + this.options.inviteCode + "&activityNo=" + this.options.activityNo,
            imageUrl: this.data.shareContent.sharePicture
        };
    }
});