function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("./../../utils/api.js")), a = t(require("./../../service/login.js")), i = require("./../../utils/promise/es6-promise.min.js"), o = getApp(), n = require("../../utils/monitor/monitor.js");

Page({
    data: {
        storeDetail: {},
        workTimeimeArr: [],
        imgDialog: !1,
        imgUrls: [],
        isDrankShow: !1,
        qualifications: [],
        shopImageList: [],
        isIpx: !1,
        current: 0
    },
    goBtn: function() {
        o.globalData.storeDeptId = this.options.deptId, wx.switchTab({
            url: "/pages/index/menu"
        });
    },
    showImg: function(t) {
        t && t.currentTarget && t.currentTarget.dataset && t.currentTarget.dataset.imgarr && this.setData({
            imgUrls: t.currentTarget.dataset.imgarr,
            imgDialog: !0,
            isDrankShow: !1,
            current: t.currentTarget.dataset.index
        });
    },
    closeImg: function() {
        this.setData({
            imgDialog: !1,
            isDrankShow: "select" == this.options.from
        });
    },
    storePhone: function(t) {
        t && t.currentTarget && t.currentTarget.dataset && t.currentTarget.dataset.phone && (String(t.currentTarget.dataset.phone).indexOf("400") > -1 && o.globalData.dataset && o.globalData.dataset.hotLineServer && 2 === o.globalData.dataset.hotLineServer.isHotLine && 2 === o.globalData.dataset.hotLineServer.isIMService ? a.default.getLoginStatus().then(function(t) {
            t ? wx.navigateTo({
                url: "/pages/order/customerservice"
            }) : a.default.loginRouter(!0, "navigateTo", "/pages/order/customerservice");
        }) : wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.phone
        }));
    },
    getStoreDetail: function() {
        var t = this;
        return new i(function(a, i) {
            e.default.ajax({
                url: "/resource/m/deptdetail",
                data: {
                    deptId: t.options.deptId
                }
            }).then(function(e) {
                if (e && e.content) {
                    var i = e.content.qualifications, o = e.content.shopImageList, n = String(e.content.workTime).split("\n");
                    t.setData({
                        storeDetail: e.content,
                        workTimeimeArr: n,
                        qualifications: i,
                        shopImageList: o
                    }, function() {
                        a(!0);
                    });
                }
            }).catch(function(t) {
                a(!1);
            });
        });
    },
    onLoad: function(t) {
        n.onLoad(this), this.setData({
            isIpx: o.globalData.isIpx
        });
    },
    onReady: function() {
        this.mapCtx = wx.createMapContext("map");
    },
    onShow: function() {
        o.globalData.storeDeptId = "", this.getStoreDetail(), this.options.from && !this.data.imgDialog && this.setData({
            isDrankShow: "select" == this.options.from
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});