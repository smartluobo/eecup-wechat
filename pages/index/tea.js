function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = e(require("../../service/coupon.js")), o = e(require("./../../config/config.js")), t = require("../../utils/monitor/monitor.js");

Page({
    data: {
        redirectUrl: ""
    },
    getMessage: function(e) {
        for (var o = 0; o < e.detail.data.length; o++) {
            var t = e.detail.data[o];
            "monitor" != t.type && t.alreadyReceived && (n.default.setCouponReceived(!0), n.default.setShowEnvelope(!1));
        }
    },
    onLoad: function(e) {
        t.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var e = o.default.mkt.domain + "/coupon/mini?invitationCode=MK20181102002&frommini=mini";
        this.setData({
            redirectUrl: e
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "送你免费大师咖啡，还有鲜榨果汁和轻食~",
            imageUrl: "https://www.eecup.cn/tea/image/eecup/icon/index/shareImg.jpg",
            path: "/pages/index/coupon"
        };
    }
});