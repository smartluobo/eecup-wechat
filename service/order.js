function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/store.js")), n = require("./openid.js"), u = require("../utils/api.js"), o = function() {
    function o() {
        e(this, o);
    }
    return t(o, [ {
        key: "setUserProdList",
        value: function(e) {
            return r.default.setStore("USERPRODLIST", e);
        }
    }, {
        key: "getUserProdList",
        value: function() {
            return r.default.getStore("USERPRODLIST");
        }
    }, {
        key: "setOrderEvaluateList",
        value: function(e) {
            return r.default.setStore("ORDER_EVALUATE", e);
        }
    }, {
        key: "getOrderEvaluateList",
        value: function() {
            return r.default.getStore("ORDER_EVALUATE");
        }
    }, {
        key: "payOrder",
        value: function(e, t, r, o, a) {
            var i = this, f = getApp();
            if (void 0 === r && (r = 0), this.loading) return !1;
            this.loading = !0;
            n.checkOpenId().then(function(n) {
                n && u.ajax({
                    url: "/resource/m/order/topay",
                    data: {
                        payType: 214,
                        busType: r,
                        orderId: e,
                        openid: f.globalData.openid
                    }
                }).then(function(e) {
                    if (e && e.content) if (2 === e.content.paypayStatus) wx.redirectTo({
                        url: o || t
                    }); else if (e.content.needPay) {
                        var r = e.content.payParams;
                        r.success = function() {
                            a && a(), t && wx.redirectTo({
                                url: t
                            });
                        }, r.fail = function() {
                            wx.redirectTo({
                                url: o || t
                            });
                        }, wx.hideLoading(), wx.requestPayment(r);
                    } else a && a(), wx.hideLoading(), t && wx.redirectTo({
                        url: t
                    });
                }).finally(function() {
                    i.loading = !1;
                });
            });
        }
    }, {
        key: "getConfirmOrderCoupon",
        value: function() {
            return r.default.getStore("CONFIRMORDER_COUPON");
        }
    }, {
        key: "setConfirmOrderCoupon",
        value: function(e) {
            return r.default.setStore("CONFIRMORDER_COUPON", e);
        }
    }, {
        key: "getConfirmOrderParam",
        value: function() {
            return r.default.getStore("CONFIRMORDER_PARAM");
        }
    }, {
        key: "setConfirmOrderParam",
        value: function(e) {
            return r.default.setStore("CONFIRMORDER_PARAM", e);
        }
    }, {
        key: "setConfirmOrderIsUseCoffeeStore",
        value: function(e) {
            var t = this.getConfirmOrderParam();
            return t.useCoffeeStore = e, r.default.setStore("CONFIRMORDER_PARAM", t);
        }
    }, {
        key: "getSelectWalletParam",
        value: function() {
            return r.default.getStore("SELECTWALLET_PARAM");
        }
    }, {
        key: "setSelectWalletParam",
        value: function(e) {
            return r.default.setStore("SELECTWALLET_PARAM", e);
        }
    }, {
        key: "getConfirmOrderDefaultDiscount",
        value: function() {
            return r.default.getStore("CONFIRMORDER_DEFAULTDISCOUNT");
        }
    }, {
        key: "setConfirmOrderDefaultDiscount",
        value: function(e) {
            return r.default.setStore("CONFIRMORDER_DEFAULTDISCOUNT", e);
        }
    } ]), o;
}();

exports.default = new o();