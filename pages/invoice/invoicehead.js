function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("./../../utils/api.js")), a = t(require("./../../service/login.js")), i = getApp(), n = require("../../utils/monitor/monitor.js");

Page({
    data: {
        countLimt: 10,
        titleList: []
    },
    removeStart: function(t) {
        1 == t.touches.length && this.setData({
            removeTouch: {
                startX: t.touches[0].clientX,
                index: t.currentTarget.dataset.index
            },
            removeVibrate: 0
        });
    },
    recordMove: function(t) {
        var e = this.data.titleList, a = this.data.removeTouch ? this.data.removeTouch.index : 0;
        if (void 0 === a) return !1;
        var i = t.touches[0].clientX, n = this.data.removeTouch.startX - i, r = "margin-left:0";
        n > 0 && (.8 * this.data.res.screenWidth <= n ? this.data.removeVibrate || (wx.vibrateShort(), 
        this.setData({
            removeVibrate: 1
        })) : this.data.removeVibrate && this.setData({
            removeVibrate: 0
        }), r = "margin-left:" + (0 - n) + "px"), e.forEach(function(t, e) {
            t.itemStyle = a === e ? r : "margin-left:0";
        }), this.setData({
            titleList: e
        });
    },
    removeEnd: function(t) {
        var e = this.data.removeTouch.index, a = this.data.titleList;
        if (void 0 === e) return !1;
        if (1 == t.changedTouches.length) {
            var i = t.changedTouches[0].clientX, n = this.data.removeTouch.startX - i, r = "";
            if (n < 40) r = "margin-left:0", a[e].itemStyle = r; else {
                if (!(.8 * this.data.res.screenWidth > n && n >= 40)) return this.removeItem(t), 
                !1;
                r = "margin-left:-100rpx", a[e].itemStyle = r;
            }
            this.setData({
                titleList: a
            });
        }
    },
    deleteHander: function(t) {
        var a = this.data.titleList.map(function(t) {
            return t.itemStyle = "margin-left:0rpx", t;
        });
        if (this.setData({
            titleList: a
        }), t && t.currentTarget && t.currentTarget.dataset && t.currentTarget.dataset.titleid) {
            var n = this;
            wx.showModal({
                content: "删除后信息将无法恢复，是否确定删除？",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#999",
                confirmText: "确定",
                confirmColor: "#f2cba4",
                success: function(a) {
                    a.confirm && e.default.ajax({
                        url: "/resource/m/user/receipttitle/del",
                        data: {
                            titleId: t.currentTarget.dataset.titleid
                        }
                    }).then(function(e) {
                        e && e.content && "SUCCESS" === e.status && (t.currentTarget.dataset.titleid != n.data.titleList[0].titleId && t.currentTarget.dataset.titleid != i.globalData.choseHead.titleId || (i.globalData.choseHead = "", 
                        i.globalData.headType = ""), n.getHeadList());
                    });
                }
            });
        }
    },
    editHander: function(t) {
        t && t.currentTarget && t.currentTarget.dataset && (i.globalData.invoiceHead = t.currentTarget.dataset.item, 
        wx.navigateTo({
            url: "/pages/invoice/headedit?type=edit"
        }));
    },
    choseHander: function(t) {
        t && t.currentTarget && t.currentTarget.dataset && "create" == this.options.type && (i.globalData.choseHead = t.currentTarget.dataset.item, 
        i.globalData.headType = "choose", wx.navigateBack());
    },
    getHeadList: function() {
        var t = this;
        e.default.ajax({
            url: "/resource/m/user/receipttitle/list"
        }).then(function(e) {
            e && e.content && t.setData({
                countLimt: e.content.countLimt,
                titleList: e.content.titleList
            });
        });
    },
    submitHander: function() {
        if (this.data.titleList.length < this.data.countLimt) {
            var t = this.data.titleList.length < 1 ? "/pages/invoice/headedit?isDefault=1" : "/pages/invoice/headedit";
            wx.navigateTo({
                url: t
            });
        } else wx.showToast({
            title: "最多" + this.data.countLimt + "发票抬头",
            icon: "none"
        });
    },
    onLoad: function(t) {
        n.onLoad(this), this.setData({
            isIpx: i.globalData.isIpx
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        a.default.getLoginStatus().then(function(e) {
            if (e) {
                t.getHeadList();
                var e = wx.getSystemInfoSync();
                t.setData({
                    res: e
                });
            } else a.default.loginRouter(!0, "redirectTo", "/pages/invoice/invoicehead");
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});