function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var e = function() {
    function t(t, e) {
        var n = [], o = !0, a = !1, i = void 0;
        try {
            for (var s, r = t[Symbol.iterator](); !(o = (s = r.next()).done) && (n.push(s.value), 
            !e || n.length !== e); o = !0) ;
        } catch (t) {
            a = !0, i = t;
        } finally {
            try {
                !o && r.return && r.return();
            } finally {
                if (a) throw i;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
}, o = require("../../utils/api"), a = require("../../utils/monitor/monitor.js"), i = require("../../utils/promise/es6-promise.min"), s = getApp(), r = null;

Page({
    data: {
        giftNum: 0,
        cardList: [],
        loading: !0,
        isCheck: !1,
        showDialog: !1,
        giftResult: {},
        touchX: 0,
        touchY: 0,
        moveX: 0,
        moveY: 0,
        touchEnd: !0,
        isIpx: s.globalData.isIpx,
        requestting: !1
    },
    getGiftCoffeeCard: function() {
        var t = this;
        o.ajax({
            url: "/resource/m/promotion/myself/canGiveCoffeeStore2"
        }).then(function(e) {
            if (wx.stopPullDownRefresh(), "SUCCESS" === e.status) {
                var o = e.content.resultList;
                o = o.map(function(t) {
                    return n({}, t, {
                        count: 0,
                        showCount: !1
                    });
                }), t.setData({
                    giftNum: e.content.giftCardTransferringCount,
                    cardList: o,
                    loading: !1,
                    isCheck: !1
                });
            }
        }).catch(function(e) {
            t.setData({
                loading: !1
            }), wx.stopPullDownRefresh();
        });
    },
    openDes: function(t) {
        var e = t.currentTarget.dataset.item.detailDesc;
        wx.showModal({
            title: "使用规则",
            content: e,
            showCancel: !1,
            confirmColor: "#f2cba4",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    cradBtnInit: function(t) {
        var e = this;
        if (!(t.touches.length > 1)) {
            var n = t.target.dataset, o = n.index, a = n.num, i = t.touches[0], s = i.pageX, c = i.pageY;
            this.data.touchX = this.data.moveX = s, this.data.touchY = this.data.moveY = c, 
            this.data.touchEnd = !1;
            var u = "cardList[" + o + "]";
            r = setTimeout(function() {
                e.handleBtnEvent(o, a, u);
            }, 200);
        }
    },
    handleBtnEvent: function(e, n, o) {
        var a = this;
        if (Math.abs(this.data.moveX - this.data.touchX) < 15 && Math.abs(this.data.moveY - this.data.touchY) < 15) {
            var i, s = this.data.cardList[e].count + n;
            s > this.data.cardList[e].stockNum ? s = this.data.cardList[e].stockNum : s < 0 && (s = 0), 
            this.setData((i = {}, t(i, o + ".showCount", !0), t(i, o + ".count", s), i), function() {
                a.setData({
                    isCheck: a.data.cardList.some(function(t) {
                        return t.count > 0;
                    })
                });
            });
        } else this.setData(t({}, o + ".showCount", !0));
        this.data.touchEnd ? (clearTimeout(r), setTimeout(function() {
            a.setData(t({}, o + ".showCount", !1));
        }, 100)) : r = setTimeout(function() {
            a.handleBtnEvent(e, n, o);
        }, 100);
    },
    btnTouchMove: function(t) {
        if (!(t.touches.length > 1)) {
            var e = t.touches[0], n = e.pageX, o = e.pageY;
            this.data.moveX = n, this.data.moveY = o;
        }
    },
    btnEndTouch: function() {
        this.data.touchEnd = !0;
    },
    btnTouchCancel: function() {
        clearTimeout(r), this.data.touchEnd = !0;
        for (var t = {}, e = 0; e < this.data.cardList.length; e++) t["cardList[" + e + "].showCount"] = !1;
        this.setData(t), this.data.touchEnd = !0;
    },
    sendFriend: function() {
        var t = this;
        this.setData({
            requestting: !0
        }, function() {
            wx.showLoading({
                title: "加载中...",
                mask: !0
            });
            var n = t.data.cardList.filter(function(t) {
                return t.count > 0;
            }).map(function(t) {
                return {
                    couponGroupId: t.couponGroupId,
                    couponNum: t.count
                };
            });
            i.all([ o.ajax({
                url: "/resource/m/promotion/myself/checkGiveCoffeeStore",
                data: {
                    checkType: 1,
                    giveList: n
                },
                options: {
                    loading: !1
                }
            }), o.ajax({
                url: "/resource/m/promotion/myself/checkGiveCoffeeStore",
                data: {
                    checkType: 2,
                    giveList: n
                },
                options: {
                    loading: !1
                }
            }) ]).then(function(t) {
                var n = e(t, 2), o = n[0], a = n[1];
                return o && o.content ? o.content.isCheck ? a && a.content ? a.content.isCheck ? i.resolve(!0) : (wx.showModal({
                    content: a.content.giveDesc,
                    showCancel: !1,
                    confirmColor: "#f2cba4",
                    confirmText: "我知道了",
                    success: function(t) {}
                }), i.resolve(!1)) : i.resolve(!1) : (wx.showModal({
                    content: o.content.giveDesc,
                    showCancel: !1,
                    confirmColor: "#f2cba4",
                    confirmText: "我知道了",
                    success: function(t) {}
                }), i.resolve(!1)) : i.resolve(!1);
            }).then(function(e) {
                e ? o.ajax({
                    url: "/resource/m/promotion/myself/createGiven",
                    data: {
                        givenType: 2,
                        giftCardId: t.data.giftCardId,
                        wishContent: t.data.wishContent,
                        coffeeList: n
                    },
                    options: {
                        loading: !1
                    }
                }).then(function(e) {
                    wx.hideLoading(), e && e.content ? t.setData({
                        giftResult: e.content,
                        showDialog: !0,
                        requestting: !1
                    }) : t.setData({
                        requestting: !1
                    });
                }).catch(function(e) {
                    wx.hideLoading(), t.setData({
                        requestting: !1
                    }), wx.showToast({
                        icon: "none",
                        title: e.msg
                    }), setTimeout(function() {
                        t.getGiftCoffeeCard();
                    }, 1500);
                }) : (wx.hideLoading(), t.setData({
                    requestting: !1
                }));
            }).catch(function(e) {
                wx.hideLoading(), t.setData({
                    requestting: !1
                }), wx.showToast({
                    icon: "none",
                    title: e.msg
                }), setTimeout(function() {
                    t.getGiftCoffeeCard();
                }, 1500);
            });
        });
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("giftData");
        this.data.giftCardId = e.giftCardId, this.data.wishContent = e.blessingsContent, 
        a.onLoad(this);
    },
    onReady: function() {
        wx.hideShareMenu();
    },
    onShow: function() {
        this.getGiftCoffeeCard(), this.setData({
            showDialog: !1,
            isCheck: !1,
            requestting: !1
        });
    },
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("giftData");
    },
    onPullDownRefresh: function() {
        this.getGiftCoffeeCard();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return wx.updateShareMenu({
            withShareTicket: !0
        }), {
            title: this.data.giftResult.title,
            path: this.data.giftResult.path,
            imageUrl: this.data.giftResult.hdImageUrl,
            desc: this.data.giftResult.desc
        };
    }
});