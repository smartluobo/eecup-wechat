var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./../../service/login")), t = require("../../utils/util.js"), a = require("../../utils/api.js"), n = require("../../utils/monitor/monitor.js"), i = getApp();

Page({
    data: {
        nickname: "",
        submitState: "disable",
        sex: 2,
        sexAry: [ {
            name: "先生",
            value: 1,
            className: ""
        }, {
            name: "女士",
            value: 2,
            className: "active",
            checked: !0
        } ],
        isPerfected: !1
    },
    nicknameInput: function(e) {
        this.setData({
            submitState: "" == e.detail.value.trim() ? "disable" : "",
            nickname: e.detail.value
        });
    },
    sexChange: function(e) {
        for (var t = this.data.sexAry, a = 0, n = t.length; a < n; ++a) t[a].value == e.detail.value ? t[a].className = "active" : t[a].className = "";
        this.setData({
            sex: e.detail.value,
            sexAry: this.data.sexAry
        });
    },
    submit: function(s) {
        var o = this;
        this.data.nickname.trim() && a.ajax({
            url: "/resource/m/user/perfect",
            data: {
                name: this.data.nickname,
                sex: this.data.sex
            }
        }).then(function(a) {
            if ("success" === a.content) {
                if (e.default.setLoginStatus(!0), i.globalData.userFlag = !0, o.data.isPerfected = !0, 
                i.globalData.clearFlag = !1, e.default.getMemberInfo(), t.toast("更新成功"), o.options && o.options.returnUrl) {
                    var s = decodeURIComponent(o.options.returnUrl);
                    "switch" === o.options.type ? wx.switchTab({
                        url: s
                    }) : wx.redirectTo({
                        url: s
                    });
                } else {
                    var r = 1, u = getCurrentPages();
                    for (var l in u) u[l].route.indexOf("index/login") > -1 ? r = 2 : u[l].route.indexOf("index/wxlogin") > -1 && wx.switchTab({
                        url: "/pages/index/home"
                    });
                    wx.navigateBack({
                        delta: r
                    });
                }
                n.login(!0, !0);
            }
        });
    },
    onLoad: function(e) {
        n.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        a.scanHandler({
            title: "完善资料",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {
        this.data.isPerfected || n.login(!1, !0);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return i.globalData.share;
    }
});