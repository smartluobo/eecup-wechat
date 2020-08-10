function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../utils/api.js")), i = t(require("./../../utils/util.js")), o = t(require("./../../service/login.js")), n = (getApp(), 
require("../../utils/monitor/monitor.js"));

Page({
    data: {
        open: !1,
        inviteObj: {},
        shareObj: {},
        shareRecord: {}
    },
    goProductPic: function() {
        var t = "/pages/index/beautifulpic?locationType=" + this.options.locationType + "&shareType=3&target=" + this.data.inviteObj.target + "&activityNo=" + this.data.inviteObj.activityNo + "&pageFrom=" + this.options.pageFrom;
        n.event("share_ck_generatepic", {
            from_page: this.options.pageFrom + ""
        }), wx.navigateTo({
            url: t
        });
    },
    getUrl: function() {
        var t = this;
        e.default.ajax({
            url: "/resource/m/promo/adsense",
            data: {
                locationType: this.options.locationType
            }
        }).then(function(e) {
            if (e && e.content) if (e.content.url) {
                var n = e.content, a = n.url.includes("?") ? n.url + "&frommini=mini" : "?frommini=mini";
                if (!n.url.includes("?")) return void wx.showToast({
                    title: "拉新配置链接错误",
                    icon: "none",
                    duration: 2e3
                });
                n.url, t.setData({
                    redirectUrl: a
                }), n.url && (t.data.inviteObj = i.default.getUrlParam(n.url)), t.getShareInfo();
            } else o.default.loginRouter(!0, "navigateTo", "/pages/index/introduce?locationType=" + t.options.locationType);
        });
    },
    getShareInfo: function() {
        var t = this;
        e.default.ajax({
            url: "/resource/m/user/invite/shareContent",
            data: {
                target: t.data.inviteObj.target,
                activityNo: t.data.inviteObj.activityNo,
                from: t.options.locationType
            }
        }).then(function(e) {
            e && e.content && t.setData({
                shareObj: e.content.shareContents[0],
                shareRecord: e.content.shareRecord
            });
        });
    },
    activeRuleOpen: function() {
        this.setData({
            open: !0
        });
    },
    activeRuleClose: function() {
        this.setData({
            open: !1
        });
    },
    onLoad: function(t) {
        n.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.showLoading(), o.default.getLoginStatus().then(function(e) {
            e ? (wx.hideLoading(), t.getUrl()) : o.default.loginRouter(!0, "navigateTo", "/pages/index/introduce?locationType=" + t.options.locationType);
        });
    },
    onHide: function(t) {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            title: this.data.shareObj.shareTitle,
            imageUrl: this.data.shareObj.programShareIcon,
            path: "/pages/index/inviter?locationType=" + this.options.locationType + "&shareType=3&target=" + this.data.inviteObj.target + "&activityNo=" + this.data.inviteObj.activityNo
        };
    },
    funWxFriendShare: function(t) {
        var e = "invite_friends_from_";
        this.options && this.options.pageFrom ? e += this.options.pageFrom : e += "others", 
        n.event(e);
    }
});