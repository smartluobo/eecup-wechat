var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./../../utils/api.js")), n = require("../../utils/monitor/monitor.js");

Page({
    data: {
        redirectUrl: "",
        shareImg: "",
        shareTitle: ""
    },
    getInfo: function() {
        var n = this;
        e.default.ajax({
            url: "/resource/m/user/invite/qrcodeurl",
            data: {
                id: this.options.scene
            }
        }).then(function(e) {
            e && e.content && n.setData({
                shareImg: e.content.programShareIcon,
                shareTitle: e.content.title,
                redirectUrl: e.content.url
            });
        });
    },
    onLoad: function(e) {
        n.onLoad(this);
        decodeURIComponent(e.scene);
    },
    onReady: function() {},
    onShow: function() {
        this.getInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getWebMessage: function(e) {},
    onShareAppMessage: function() {
        return {
            title: this.data.shareTitle,
            imageUrl: this.data.shareImg,
            path: "pages/index/wxacode?scene=" + encodeURIComponent(this.options.scene)
        };
    }
});