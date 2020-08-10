function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("./../../service/login.js")), i = t(require("./../../utils/util.js")), a = t(require("./../../utils/api.js")), n = t(require("./../../config/config.js")), o = require("./../../utils/promise/es6-promise.min.js"), c = getApp(), r = require("../../utils/monitor/monitor.js");

Page({
    data: {
        offSet: 0,
        pageSize: 15,
        startOffSet: 0,
        invoiceType: "1",
        checkAll: !1,
        totalMoney: 0,
        orderNum: 0,
        invoiceList: [],
        errMsg: "",
        isIpx: !1
    },
    typeChange: function(t) {
        var e = this;
        t && t.currentTarget && t.currentTarget.dataset && t.currentTarget.dataset.type && this.setData({
            invoiceType: t.currentTarget.dataset.type,
            offSet: 0,
            orderNum: 0,
            totalMoney: 0,
            startOffSet: 0,
            invoiceList: []
        }, function() {
            c.globalData.invoiceType = e.data.invoiceType, c.globalData.allInvoiceList = "", 
            c.globalData.invoiceList = "", e.getList();
        });
    },
    goExplain: function() {
        c.globalData.webViewUrl = n.default.wap.domain + "/appClient/helpCenter/faq/invoiceDesc", 
        wx.navigateTo({
            url: "/pages/index/imgwebview"
        });
    },
    getList: function() {
        var t = this;
        return wx.showLoading({
            title: "加载中...",
            mask: !0
        }), new o(function(e, i) {
            a.default.ajax({
                url: "/resource/m/user/receipt/list",
                data: {
                    offSet: t.data.startOffSet + 15 * t.data.offSet,
                    pageSize: t.data.pageSize,
                    receiptSource: t.data.invoiceType
                },
                options: {
                    loading: !1,
                    needLogin: !0
                }
            }).then(function(i) {
                if (i && i.content) {
                    var a = [];
                    if (i.content < 1) return t.setData({
                        offSet: t.data.offSet > 0 ? --t.data.offSet : 0
                    }), wx.hideLoading(), void e(!0);
                    a = i.content.map(function(t) {
                        return t.check = !1, t;
                    });
                    var n = t.data.invoiceList;
                    t.setData({
                        invoiceList: n.concat(a),
                        checkAll: !1
                    });
                }
                wx.hideLoading(), e(!0);
            }).catch(function(t) {
                wx.hideLoading(), i(t);
            });
        });
    },
    checkhander: function(t) {
        if (t && t.currentTarget && t.currentTarget.dataset) {
            var e = t.currentTarget.dataset.index, a = this.data.invoiceList, n = i.default.parseMoney(this.data.totalMoney);
            a[e].check = !a[e].check, n = a[e].check ? n + i.default.parseMoney(a[e].ticketAmount) : n - i.default.parseMoney(a[e].ticketAmount);
            var o = !0;
            a.some(function(t) {
                if (!0 !== t.check) return o = !1, !0;
            }), this.setData({
                invoiceList: a,
                checkAll: o,
                totalMoney: i.default.parseMoney(n),
                orderNum: a[e].check ? ++this.data.orderNum : --this.data.orderNum
            });
        }
    },
    checkAllHander: function() {
        var t = !this.data.checkAll, e = 0, a = this.data.invoiceList.map(function(i) {
            return i.check = t, e += parseFloat(i.ticketAmount), i;
        });
        this.setData({
            checkAll: t,
            invoiceList: a,
            totalMoney: t ? i.default.parseMoney(e) : 0,
            orderNum: t ? a.length : 0
        });
    },
    nextHander: function() {
        var t = this.data.invoiceList.filter(function(t) {
            if (t.check) return t;
        });
        if (0 !== t.length) if (t.length > 1) {
            var e = this;
            wx.showModal({
                content: "多个订单合并开票，可能开具多张发票",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#999999",
                confirmText: "确定",
                confirmColor: "#f2cba4",
                success: function(i) {
                    if (i.confirm) return c.globalData.invoiceList = t, c.globalData.allInvoiceList = e.data.invoiceList, 
                    c.globalData.invoiceType = e.data.invoiceType, void wx.navigateTo({
                        url: "/pages/invoice/createinvoice"
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else c.globalData.invoiceList = t, c.globalData.invoiceListFlag = !0, c.globalData.allInvoiceList = this.data.invoiceList, 
        c.globalData.invoiceType = this.data.invoiceType, wx.navigateTo({
            url: "/pages/invoice/createinvoice"
        });
    },
    onLoad: function(t) {
        r.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        e.default.getLoginStatus().then(function(i) {
            if (i) if (c.globalData.allInvoiceList && c.globalData.allInvoiceList.length > 0) {
                var a = c.globalData.allInvoiceList;
                t.setData({
                    invoiceList: a,
                    startOffSet: a.length,
                    invoiceType: c.globalData.invoiceType
                });
            } else t.setData({
                totalMoney: 0,
                orderNum: 0,
                invoiceType: c.globalData.invoiceType ? c.globalData.invoiceType : "1",
                isIpx: c.globalData.isIpx,
                invoiceList: []
            }, function() {
                t.getList();
            }); else e.default.loginRouter(!0, "redirectTo", "/pages/invoice/invoicelist");
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            offSet: 0,
            orderNum: 0,
            totalMoney: 0,
            invoiceList: [],
            startOffSet: 0
        }, function() {
            t.getList().then(function(t) {
                wx.stopPullDownRefresh();
            }).catch(function(t) {
                wx.stopPullDownRefresh();
            });
        });
    },
    onReachBottom: function() {
        var t = this;
        this.setData({
            offSet: ++this.data.offSet
        }, function() {
            t.getList().then(function(t) {});
        });
    }
});