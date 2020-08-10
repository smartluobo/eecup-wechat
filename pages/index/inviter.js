function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var i = t(require("./../../utils/api.js")), n = t(require("./../../utils/util.js")), o = t(require("./../../service/login.js")), a = (require("./../../utils/promise/es6-promise.min.js"), 
getApp(), require("../../utils/monitor/monitor.js"));

Page({
    data: {
        redirectUrl: "",
        shareType: "",
        openId: "",
        locationType: null,
        fission: {},
        inviteObj: {},
        shareObj: {},
        firstObj: {}
    },
    getUrl: function() {
        var t = this;
        i.default.ajax({
            url: "/resource/m/promo/adsense",
            data: {
                locationType: t.data.locationType
            },
            options: {
                needLogin: !1
            }
        }).then(function(e) {
            if (e && e.content) if (e.content.url) {
                if ("1" == t.data.shareType) {
                    var i = e.content;
                    if (i.url) {
                        var o = i.url.includes("?") ? i.url + "&frommini=mini" : "?frommini=mini";
                        if (!i.url.includes("?")) return void wx.showToast({
                            title: "拉新配置链接错误",
                            icon: "none",
                            duration: 2e3
                        });
                        i.url, t.setData({
                            redirectUrl: o
                        }), t.setData({
                            inviteObj: n.default.getUrlParam(i.url)
                        });
                    }
                }
                t.getShareContent();
            } else t.goLogin();
        });
    },
    getShareContent: function() {
        var t = this;
        i.default.ajax({
            url: "/resource/m/user/invite/shareContent",
            data: {
                target: t.data.inviteObj.target,
                activityNo: t.data.inviteObj.activityNo,
                openid: t.data.openId,
                from: t.data.locationType
            },
            options: {
                needLogin: !1
            }
        }).then(function(i) {
            if (i && i.content) {
                var n, o = 3 == t.data.shareType ? i.content.shareContents[0].shareLink + "&frommini=mini" : t.data.redirectUrl;
                t.setData((n = {}, e(n, "shareObj.shareTitle", i.content.shareContents[0].shareTitle), 
                e(n, "shareObj.shareIcon", i.content.shareContents[0].programShareIcon), e(n, "shareObj.shareDesc", i.content.shareContents[0].shareDigest), 
                e(n, "redirectUrl", o), n));
            }
        });
    },
    wxLogin: function() {
        var t = this;
        wx.login({
            success: function(e) {
                var n = e.code;
                i.default.ajax({
                    url: "/resource/m/user/wxlogin",
                    data: {
                        code: n,
                        isAuthorization: !0
                    },
                    options: {
                        needLogin: !1
                    }
                }).then(function(e) {
                    e && e.content && e.content.openid && (t.setData({
                        openId: e.content.openid
                    }), 1 == t.data.shareType ? t.getUrl() : 2 == t.data.shareType ? t.getFisson() : t.getShareContent());
                });
            }
        });
    },
    getFisson: function() {
        var t = this;
        i.default.ajax({
            url: "/resource/m/fissionRedPacket/detailInfo",
            options: {
                needLogin: !1,
                loading: !1
            },
            data: {
                orderNo: t.data.fission.orderNo,
                inviteCode: t.data.fission.inviteCode,
                activityNo: t.data.fission.activityNo,
                openId: t.data.openId
            }
        }).then(function(i) {
            if (i && i.content) {
                var n;
                t.setData((n = {}, e(n, "shareObj.shareTitle", i.content.shareContent.shareTitle), 
                e(n, "shareObj.shareIcon", i.content.shareContent.programShareIcon), e(n, "shareObj.shareDesc", i.content.shareContent.shareDigest), 
                e(n, "redirectUrl", i.content.shareContent.shareLink + "&frommini=mini"), n));
            }
        });
    },
    goLogin: function() {
        var t = this;
        o.default.getLoginStatus().then(function(e) {
            if (e) ; else {
                var i = "1" === t.options.shareType ? "/pages/index/inviter?locationType=" + t.options.locationType + "&shareType=1" : "2" === t.options.shareType ? "/pages/index/inviter?orderNo=" + t.options.orderNo + "&shareType=2&inviteCode=" + t.options.inviteCode + "&activityNo=" + t.options.activityNo : "/pages/index/inviter?locationType=" + t.options.locationType + "&shareType=3&target=" + t.options.target + "&activityNo=" + t.options.activityNo;
                o.default.loginRouter(!0, "navigateTo", i);
            }
        });
    },
    onLoad: function() {
        a.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        if (o.default.getLoginStatus().then(function(e) {
            e || "1" != t.options.shareType || t.goLogin();
        }), "2" == this.options.shareType) {
            var i;
            this.setData((i = {
                shareType: "2"
            }, e(i, "fission.orderNo", this.options.orderNo), e(i, "fission.inviteCode", this.options.inviteCode), 
            e(i, "fission.activityNo", this.options.activityNo), i)), this.wxLogin();
        } else if ("3" == this.options.shareType) {
            var n;
            this.setData((n = {
                shareType: "3",
                locationType: this.options.locationType
            }, e(n, "inviteObj.target", this.options.target), e(n, "inviteObj.activityNo", this.options.activityNo), 
            n)), this.wxLogin();
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getWebMessage: function(t) {},
    onShareAppMessage: function() {
        if ("1" == this.data.shareType) t = "/pages/index/inviter?locationType=" + this.data.locationType + "&shareType=3&target=" + this.data.inviteObj.target + "&activityNo=" + this.data.inviteObj.activityNo; else if ("2" == this.data.shareType) t = "/pages/index/inviter?orderNo=" + this.data.fission.orderNo + "&shareType=2&inviteCode=" + this.data.fission.inviteCode + "&activityNo=" + this.data.fission.activityNo; else var t = "/pages/index/inviter?locationType=" + this.data.locationType + "&shareType=3&target=" + this.data.inviteObj.target + "&activityNo=" + this.data.inviteObj.activityNo;
        return {
            title: this.data.shareObj.shareTitle,
            imageUrl: this.data.shareObj.shareIcon,
            path: t,
            desc: this.data.shareObj.shareDesc ? this.data.shareObj.shareDesc : ""
        };
    }
});