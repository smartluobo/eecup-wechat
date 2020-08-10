function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../service/login.js")), i = e(require("../../service/million.js")), o = e(require("./../../utils/util.js")), n = e(require("./../../utils/api.js")), r = getApp(), a = require("../../utils/monitor/monitor.js");

Page({
    data: {
        webViewUrl: "",
        shareObj: {}
    },
    getShareInfo: function() {
        var e = this;
        n.default.ajax({
            url: "/resource/m/promotion/cashAward/copywriting",
            data: {
                buttonType: 1
            }
        }).then(function(t) {
            t.content && e.setData({
                shareObj: t.content
            });
        });
    },
    onLoad: function(e) {
        a.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        "million" === this.options.type ? t.default.getLoginStatus().then(function(o) {
            var n = e.options.shareType ? "/pages/index/millionbigshot?type=" + e.options.type + "&shareType=" + e.options.shareType : "/pages/index/millionbigshot?type=" + e.options.type;
            n += e.options.inviterMobile ? "&inviterMobile=" + e.options.inviterMobile : "", 
            o ? i.default.isActivityStart().then(function(i) {
                var o = e.options.shareType ? i.linkUrl + "&from=mini&shareType=" + e.options.shareType : i.linkUrl + "&from=mini";
                o += e.options.inviterMobile ? "&inviterMobile=" + e.options.inviterMobile : "", 
                i && i.activityEName ? e.setData({
                    webViewUrl: o
                }) : t.default.loginRouter(!0, "redirectTo", n);
            }) : t.default.loginRouter(!0, "redirectTo", n);
        }) : this.setData({
            webViewUrl: r.globalData.webViewUrl
        }), this.getShareInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getWebMessage: function(e) {},
    onShareAppMessage: function(e) {
        if ("million" === this.options.type) {
            var t = e.webViewUrl;
            String(e.webViewUrl).indexOf("imageUrl") > -1 && (t = decodeURIComponent(e.webViewUrl));
            var i = "", n = "", a = "", s = "", l = "";
            return o.default.getQueryString(t, "mobile"), 2 == (i = o.default.getQueryString(t, "shareType")) && (l = o.default.getQueryString(t, "mobile")), 
            n = o.default.getQueryString(t, "imageUrl"), a = o.default.getQueryString(t, "title"), 
            s = i ? "pages/index/millionbigshot?type=" + this.options.type + "&shareType=" + i : "pages/index/millionbigshot?type=" + this.options.type, 
            s += i && l ? "&inviterMobile=" + l : "", {
                title: a || this.data.shareObj.shareTitle,
                imageUrl: n || this.data.shareObj.sharePhoto,
                path: s
            };
        }
        return r.globalData.share;
    }
});