function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("./../../service/login.js")), n = e(require("./../../utils/api.js")), o = require("../../utils/monitor/monitor.js");

Page({
    data: {
        textInfo: []
    },
    getText: function() {
        var e = this;
        n.default.ajax({
            url: "/resource/m/sys/base/sendCoffee"
        }).then(function(t) {
            var n = t.content.filter(function(e) {
                return "咖啡红包" != e.title;
            });
            e.setData({
                textInfo: n
            });
        });
    },
    toView: function(e) {
        2 == e.currentTarget.dataset.item.type ? t.default.getLoginStatus().then(function(e) {
            e ? wx.navigateTo({
                url: "/pages/giftcard/giftcardmain"
            }) : t.default.loginRouter(!0, "navigateTo", "/pages/index/sendcoffee");
        }) : 3 == e.currentTarget.dataset.item.type && wx.navigateTo({
            url: "/pages/index/introduce?locationType=1&shareType=1&pageFrom=send_coffee"
        });
    },
    onLoad: function(e) {
        o.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        this.getText();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});