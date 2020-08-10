function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var a = t(require("../../service/wallet.js")), i = t(require("../../service/order.js")), o = require("../../utils/api.js"), n = getApp(), s = null, r = require("../../utils/monitor/monitor.js");

Page({
    data: {
        totalPrice: 0,
        paramFrom: "",
        ticketList: [],
        selectedList: [],
        checkoutEnabled: !1,
        orderParam: {},
        coffeeStoreDesc: "",
        showBubble: !1,
        tmpAmount: 0,
        isLongPress: !1,
        pressInitAmount: 0,
        pressCouponId: "",
        isIpx: n.globalData.isIpx,
        isDataLoading: !1,
        imgUrls: [ "./../../resources/images/index/list_blur.png" ],
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        multipleItems: 2,
        cuurentPackageList: null,
        scaleIndex: 2,
        oldSelect: [],
        oldTicketList: []
    },
    getWalletList: function() {
        var t = this, i = this, s = [].concat(e(this.data.selectedList)), r = !0, c = !1, d = void 0;
        try {
            for (var l, u = s[Symbol.iterator](); !(r = (l = u.next()).done); r = !0) {
                var m = l.value;
                m.amount < 0 && (m.amount = 0);
            }
        } catch (t) {
            c = !0, d = t;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (c) throw d;
            }
        }
        var p = {
            from: this.data.paramFrom,
            selectedList: s
        };
        if ("order" == this.data.paramFrom) {
            var f = this.data.orderParam;
            p.deptId = f.deptId, p.supportTakeout = "sent" == f.delivery ? 1 : 0, p.productIdList = [], 
            this.options.productId ? (p.deptId = this.options.deptId ? this.options.deptId : f.deptId, 
            p.productIdList.push(this.options.productId)) : f.productList.map(function(t) {
                p.productIdList.push(t.productId);
            });
        }
        n.globalData.selectedCityInfo && void 0 !== n.globalData.selectedCityInfo.cityId ? p.cityId = n.globalData.selectedCityInfo.cityId : n.globalData.locationCityInfo && void 0 !== n.globalData.locationCityInfo.cityId && (p.cityId = n.globalData.locationCityInfo.cityId), 
        this.setData({
            isDataLoading: !0
        }), o.ajax({
            url: "/resource/m/promo/combPlans",
            data: p
        }).then(function(e) {
            if (wx.hideLoading(), e && e.content && e.content.limitMsg) return wx.showToast({
                title: e.content.limitMsg,
                icon: "none",
                mask: !0
            }), void t.setData({
                selectedList: t.data.oldSelect,
                ticketList: t.data.oldTicketList,
                isDataLoading: !1
            });
            0 == e.content.money ? i.toggleCheckoutState(!1) : i.toggleCheckoutState(!0), wx.setNavigationBarTitle({
                title: e.content.title
            }), a.default.setWallet({
                ticketList: e.content.resultList,
                totalPrice: e.content.money
            });
            var o = [], n = e.content.resultList.map(function(t) {
                return t.packageList.map(function(t) {
                    o.push(t);
                }), t.activeThrid = !1, t;
            });
            i.data.cuurentPackageList && JSON.stringify(i.data.ticketList) != JSON.stringify(n) && (n = n.map(function(t) {
                return t.packageList.map(function(e, a) {
                    i.data.cuurentPackageList.map(function(i) {
                        i.packageId === e.packageId && i.packageDes !== e.packageDes && (t.activeThrid = !!(e.packageDes && a > 1 && t.packageList.length > 2), 
                        wx.showToast({
                            title: e.packageDes ? e.packageDes : null,
                            icon: "none"
                        })), e.packageDes && i.packageId === e.packageId && i.packageDes === e.packageDes && a > 1 && (t.activeThrid = !0);
                    });
                }), t;
            })), i.setData({
                isDataLoading: !1,
                totalPrice: e.content.money,
                ticketList: n,
                cuurentPackageList: o
            });
        }).catch(function(t) {
            i.setData({
                isDataLoading: !1
            });
        });
    },
    getOrderParam: function() {
        this.setData({
            orderParam: i.default.getConfirmOrderParam()
        });
    },
    quantify: function(t, e, a) {
        var i = this, o = !1, n = t.item, s = t.plan, r = this.data.selectedList;
        if (r.map(function(t, s) {
            t.couponId === n.couponId && (a ? "add" === e ? t.amount = i.data.pressInitAmount : i.data.pressInitAmount <= 0 ? (i.removeFromSelectedList(n.couponId), 
            t.amount = 0) : t.amount = i.data.pressInitAmount : "add" === e ? t.amount++ : t.amount--, 
            o = !0);
        }), !o) {
            var c = {
                activityId: s.activityId,
                planId: s.planId
            };
            c.couponId = n.couponId, c.amount = a ? this.data.pressInitAmount : ++n.amount, 
            c.isGift = n.isGift, r = r.concat(c);
        }
        this.setData({
            selectedList: r
        });
    },
    toggleCheckoutState: function(t) {
        this.setData({
            checkoutEnabled: t
        });
    },
    amountChangeLongTap: function(t) {
        if (!this.data.isDataLoading) {
            this.setData({
                oldTicketList: this.data.ticketList.length > 0 ? this.data.ticketList : [],
                oldSelect: this.data.selectedList.length > 0 ? this.data.selectedList : []
            });
            var e = t.target.dataset, a = e.action, i = e.item.amount - 1;
            i < 0 && (i = 0);
            var o = e.item.amount + 1;
            o > 999 && (o = 999), this.setData({
                isLongPress: !0,
                showBubble: !0,
                pressInitAmount: "add" === a ? o : i,
                pressCouponId: e.item.couponId
            });
            var n = this;
            s = setInterval(function() {
                var t = n.data.pressInitAmount - 1;
                t <= 0 && (t = 0);
                var e = n.data.pressInitAmount + 1;
                e >= 999 && (e = 999), n.setData({
                    pressInitAmount: "add" === a ? e : t
                });
            }, 100);
        }
    },
    touchEndHandler: function(t) {
        var e = t.target.dataset;
        if (!this.data.isDataLoading && this.data.isLongPress) {
            var a = e.action;
            clearInterval(s), this.quantify(e, a, !0), this.getWalletList(), this.setData({
                pressInitAmount: 0,
                showBubble: !1,
                isLongPress: !1
            });
        }
    },
    removeFromSelectedList: function(t) {
        var e = this.data.selectedList;
        e.map(function(a, i) {
            a.couponId === t && e.splice(i, 1);
        }), this.setData({
            selectedList: e
        });
    },
    amountChange: function(t) {
        if (this.setData({
            oldTicketList: this.data.ticketList.length > 0 ? this.data.ticketList : [],
            oldSelect: this.data.selectedList.length > 0 ? this.data.selectedList : []
        }), !this.data.isDataLoading) {
            var e = t.target.dataset, a = e.action, i = e.item;
            if (!(i.amount < 0)) if ("add" === a) this.quantify(e, "add"), this.getWalletList(); else {
                if (0 == i.amount) return;
                1 == i.amount ? this.removeFromSelectedList(i.couponId) : i.amount > 1 && this.quantify(e, "minus"), 
                e.item.amount > 0 && this.getWalletList();
            }
        }
    },
    checkout: function() {
        var t = this;
        this.data.checkoutEnabled && o.ajax({
            url: "/resource/m/order/couponOrder/confirm",
            data: {
                totalPrice: a.default.getTotalPrice(),
                couponList: a.default.getWalletTickets()
            }
        }).then(function(e) {
            e.content.virtualOrderIdStr && (n.globalData.walletConfirmData = e.content.couponList, 
            wx.navigateTo({
                url: "/pages/coupon/walletorderconfirm?virtualOrderId=" + e.content.virtualOrderIdStr + "&totalAmount=" + e.content.totalAmount + "&from=" + t.data.paramFrom
            }));
        });
    },
    getCoffeeStoreDesc: function() {
        var t = this;
        o.ajax({
            url: "/resource/m/promotion/myself/coffeeStoreIntroduction",
            options: {
                loading: !1
            }
        }).then(function(e) {
            wx.hideLoading(), e.content && t.setData({
                coffeeStoreDesc: e.content
            });
        });
    },
    openDesc: function(t) {
        var e = "", a = t.currentTarget.dataset.item, i = t.currentTarget.dataset.plan, o = "使用规则";
        a && a.detailDesc ? e = a.detailDesc.replace(/\n/g, "\r\n") : i && i.activityDes ? (o = "活动描述", 
        e = i.activityDes.replace(/\n/g, "\r\n")) : e = this.data.coffeeStoreDesc.replace(/\n/g, "\r\n"), 
        wx.showModal({
            title: o,
            content: e,
            showCancel: !1,
            confirmColor: "#f2cba4",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    giftClick: function(t) {
        t.currentTarget.dataset.gift.packageDes && wx.showToast({
            title: t.currentTarget.dataset.gift.packageDes,
            icon: "none"
        });
    },
    swiperChange: function(t) {
        this.setData({
            scaleIndex: 1 === t.detail.current ? 0 : 2
        });
    },
    onLoad: function(t) {
        a.default.clearWallet(), "order" == t.from && this.getOrderParam(), this.setData({
            paramFrom: t.from || "mystock"
        }), r.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        this.getWalletList(), this.getCoffeeStoreDesc();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});