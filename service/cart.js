function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var a = e[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, r, a) {
        return r && t(e.prototype, r), a && t(e, a), e;
    };
}(), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../utils/store.js")), a = {
    prodDisabledTip: "该商品暂停售卖，请选购其他",
    prodMaxAmountTip: "该商品可购买数量已达上限",
    failTip: "加入购物车失败，请稍后再试"
}, n = function() {
    function n() {
        t(this, n);
    }
    return e(n, [ {
        key: "add",
        value: function(t) {
            var e = this.getCart(), r = e ? this.getCartItemsAmount(e) : 0;
            r += t.amount;
            var n = getApp().globalData.dataset.cartCountLimit || 30;
            if (r > n) return wx.showModal({
                content: "购物车上限" + n + "件，您已经买超了",
                showCancel: !1,
                confirmText: "OK",
                confirmColor: "#f2cba4"
            }), !1;
            t.additionList = this.formatAdditionList(t.additionList);
            var o = {
                productId: t.productId,
                temperAttributeCode: t.temperAttributeCode,
                standardCode: t.standardCode || 0,
                amount: t.amount,
                additionList: t.additionList,
                eatway: t.eatway,
                checked: 1
            };
            if (t.ABTEST_recommend && (o.ABTEST_recommend = !0), e && e.length > 0) {
                var u = !1, i = 0;
                if (e.forEach(function(r, a) {
                    JSON.stringify({
                        productId: r.productId,
                        temperAttributeCode: r.temperAttributeCode,
                        standardCode: r.standardCode,
                        additionList: r.additionList,
                        eatway: r.eatway
                    }) === JSON.stringify({
                        productId: o.productId,
                        temperAttributeCode: o.temperAttributeCode,
                        standardCode: o.standardCode,
                        additionList: o.additionList,
                        eatway: o.eatway
                    }) && (e[a].amount = o.amount + r.amount, u = !0, i = a, t.ABTEST_recommend && (e[a].ABTEST_recommend = !0));
                }), u) {
                    var d = e[i];
                    if (d.amount <= 0) e.splice(i, 1); else if (d.amount > t.maxAmount && t.amount > 0) return wx.showModal({
                        content: a.prodMaxAmountTip,
                        showCancel: !1,
                        confirmText: "我知道了",
                        confirmColor: "#f2cba4"
                    }), !1;
                } else e.unshift(o);
            } else e = [ o ];
            return this.setCart(e), !0;
        }
    }, {
        key: "formatAdditionList",
        value: function(t) {
            return t && t.length > 0 && (t.forEach(function(e, r) {
                t[r] = {
                    amount: e.amount,
                    code: e.code
                };
            }), t = t.sort(this.compare("code"))), t;
        }
    }, {
        key: "compare",
        value: function(t) {
            return function(e, r) {
                var a = e[t], n = r[t];
                return isNaN(Number(a)) || isNaN(Number(n)) || (a = Number(a), n = Number(n)), a < n ? -1 : a > n ? 1 : 0;
            };
        }
    }, {
        key: "getCartItemsCount",
        value: function() {
            return this.getCart().length;
        }
    }, {
        key: "getCartItemsAmount",
        value: function(t) {
            t || (t = this.getCart());
            var e = 0, r = !0, a = !1, n = void 0;
            try {
                for (var o, u = t[Symbol.iterator](); !(r = (o = u.next()).done); r = !0) e += o.value.amount;
            } catch (t) {
                a = !0, n = t;
            } finally {
                try {
                    !r && u.return && u.return();
                } finally {
                    if (a) throw n;
                }
            }
            return e;
        }
    }, {
        key: "getCart",
        value: function() {
            return r.default.getStore("CART");
        }
    }, {
        key: "setCart",
        value: function(t) {
            var e = t ? this.getCartItemsAmount(t) : 0;
            this.setTabBarCount(e);
            var a = !0, n = !1, o = void 0;
            try {
                for (var u, i = t[Symbol.iterator](); !(a = (u = i.next()).done); a = !0) {
                    var d = u.value;
                    d.additionList = this.formatAdditionList(d.additionList);
                }
            } catch (t) {
                n = !0, o = t;
            } finally {
                try {
                    !a && i.return && i.return();
                } finally {
                    if (n) throw o;
                }
            }
            return r.default.setStore("CART", t);
        }
    }, {
        key: "setTabBarCount",
        value: function(t) {
            if (this.getCart()) {
                var e = this.getCart().filter(function(t, e) {
                    if (t.amount > 0) return !0;
                });
                r.default.setStore("CART", e);
            }
            if (void 0 === t) {
                var a = this.getCart();
                t = a ? this.getCartItemsAmount(a) : 0;
            }
            t > 0 ? "function" == typeof wx.setTabBarBadge && wx.setTabBarBadge({
                index: 3,
                text: t.toString()
            }) : "function" == typeof wx.removeTabBarBadge && wx.removeTabBarBadge({
                index: 3
            });
        }
    }, {
        key: "removeCheckedCartItem",
        value: function() {
            var t = this.getCart().filter(function(t) {
                return !t.checked;
            });
            this.setCart(t), this.setTabBarCount();
        }
    }, {
        key: "emptyCart",
        value: function() {
            return this.setTabBarCount(0), r.default.setStore("CART", null);
        }
    }, {
        key: "setConfirmOrder",
        value: function(t) {
            return r.default.setStore("CONFIRM_ORDER", t);
        }
    }, {
        key: "getConfirmOrder",
        value: function() {
            return r.default.getStore("CONFIRM_ORDER");
        }
    }, {
        key: "empryConfirmOrder",
        value: function() {
            return r.default.setStore("CONFIRM_ORDER", null);
        }
    }, {
        key: "setOrderRemark",
        value: function(t) {
            return r.default.setStore("ORDER_REMARK", t);
        }
    }, {
        key: "getOrderRemark",
        value: function() {
            return r.default.getStore("ORDER_REMARK");
        }
    }, {
        key: "emptyOrderRemark",
        value: function() {
            return r.default.setStore("ORDER_REMARK", null);
        }
    }, {
        key: "getRemarkNeeds",
        value: function() {
            var t = this.getOrderRemark();
            if (t && t.remark) {
                var e = [], r = !0, a = !1, n = void 0;
                try {
                    for (var o, u = t.remark[Symbol.iterator](); !(r = (o = u.next()).done); r = !0) {
                        var i = o.value, d = {
                            i: i.mRemarkid,
                            e: i.remarkList[i.currentOpt].name,
                            n: i.mRemarkName
                        };
                        i.remarkList[i.currentOpt].status && (d.c = i.amount), e.push(d);
                    }
                } catch (t) {
                    a = !0, n = t;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (a) throw n;
                    }
                }
                return e;
            }
            return null;
        }
    }, {
        key: "setCartBrowseInfo",
        value: function(t) {
            return r.default.setStore("CART_BROWSE_INFO", t);
        }
    }, {
        key: "getCartBrowseInfo",
        value: function() {
            return r.default.getStore("CART_BROWSE_INFO");
        }
    }, {
        key: "emptyCartBrowseInfo",
        value: function() {
            return r.default.setStore("CART_BROWSE_INFO", null);
        }
    } ]), n;
}();

exports.default = new n();