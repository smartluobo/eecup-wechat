var r = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("../../service/cart.js")), t = require("../../utils/api.js"), e = require("../../utils/monitor/monitor.js");

Page({
    data: {
        remarkPlaceholder: "输入其他备注特殊要求（可不填）"
    },
    getRemark: function() {
        var e = this, a = this, n = r.default.getOrderRemark();
        if (n) this.setData({
            remark: n.remark,
            remarkMsg: n.remarkMsg,
            remarkMsgCount: n.remarkMsg.length,
            remarkPlaceholder: n.remarkMsg.length > 0 ? "" : "输入其他备注特殊要求（可不填）"
        }); else {
            var o = r.default.getConfirmOrder(), i = 0, u = !0, s = !1, m = void 0;
            try {
                for (var l, c = o[Symbol.iterator](); !(u = (l = c.next()).done); u = !0) {
                    var d = l.value;
                    i += d.amount;
                }
            } catch (r) {
                s = !0, m = r;
            } finally {
                try {
                    !u && c.return && c.return();
                } finally {
                    if (s) throw m;
                }
            }
            t.ajax({
                url: "/resource/m/order/remark",
                data: {
                    productList: o
                }
            }).then(function(r) {
                if (r && r.content) {
                    var t = r.content.sort(e.compare("showOrder")), n = !0, o = !1, u = void 0;
                    try {
                        for (var s, m = t[Symbol.iterator](); !(n = (s = m.next()).done); n = !0) {
                            var l = s.value;
                            l.remarkList = l.remarkList.sort(a.compare("showOrder")), l.showAmount = 0, l.amount = 1;
                            var c = 0, d = !0, h = !1, f = void 0;
                            try {
                                for (var k, v = l.remarkList[Symbol.iterator](); !(d = (k = v.next()).done); d = !0) {
                                    var g = k.value;
                                    g.selected = g.isDefault, g.maxAmount = g.isSameCup && "0" !== g.isSameCup ? i : g.countLimit, 
                                    g.amount = 1, g.selected && (l.showAmount = g.status, l.currentOpt = c), c++;
                                }
                            } catch (r) {
                                h = !0, f = r;
                            } finally {
                                try {
                                    !d && v.return && v.return();
                                } finally {
                                    if (h) throw f;
                                }
                            }
                        }
                    } catch (r) {
                        o = !0, u = r;
                    } finally {
                        try {
                            !n && m.return && m.return();
                        } finally {
                            if (o) throw u;
                        }
                    }
                    e.setData({
                        remark: t,
                        remarkMsg: "",
                        remarkMsgCount: 0,
                        remarkPlaceholder: "输入其他备注特殊要求（可不填）"
                    });
                }
            });
        }
    },
    compare: function(r) {
        return function(t, e) {
            var a = t[r], n = e[r];
            return isNaN(Number(a)) || isNaN(Number(n)) || (a = Number(a), n = Number(n)), a < n ? -1 : a > n ? 1 : 0;
        };
    },
    chooseOpt: function(r) {
        var t = r.currentTarget.dataset.item, e = r.currentTarget.dataset.itemindex, a = (r.currentTarget.dataset.opt, 
        r.currentTarget.dataset.optindex);
        t.showAmount = 0;
        var n = 0, o = !0, i = !1, u = void 0;
        try {
            for (var s, m = t.remarkList[Symbol.iterator](); !(o = (s = m.next()).done); o = !0) {
                var l = s.value;
                l.selected = 0, n === a && (l.selected = 1, t.amount = l.amount, t.showAmount = l.status, 
                t.currentOpt = n), n++;
            }
        } catch (r) {
            i = !0, u = r;
        } finally {
            try {
                !o && m.return && m.return();
            } finally {
                if (i) throw u;
            }
        }
        var c = this.data.remark;
        c[e] = t, this.setData({
            remark: c
        });
    },
    amountChange: function(r) {
        var t = r.currentTarget.dataset.item, e = r.currentTarget.dataset.itemindex, a = t.remarkList[t.currentOpt], n = (t.currentOpt, 
        a.amount), o = r.currentTarget.dataset.action;
        if ("add" === o && n < a.maxAmount) a.amount++; else {
            if (!("minus" === o && n > 1)) return "add" === o && wx.showToast({
                title: "数量已达到上线",
                icon: "none",
                mask: !0
            }), !1;
            a.amount--;
        }
        t.amount = a.amount;
        var i = this.data.remark;
        i[e] = t, this.setData({
            remark: i
        });
    },
    inputRemarkMsg: function(r) {
        var t = r.detail.value, e = t.length;
        this.setData({
            remarkMsg: t,
            remarkMsgCount: e
        });
    },
    textareaFocus: function() {
        this.setData({
            remarkPlaceholder: ""
        });
    },
    textareaBlur: function() {
        this.data.remarkMsgCount ? this.setData({
            remarkPlaceholder: ""
        }) : this.setData({
            remarkPlaceholder: "输入其他备注特殊要求（可不填）"
        });
    },
    saveRemark: function(e) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
var info = prevPage.data //取上页data里的数据也可以修改
prevPage.setData({remark: this.data.remarkMsg})//设置数据
wx.navigateBack({
    delta: 1,
  })
    },
    onLoad: function(r) {
        e.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        t.scanHandler({
            title: "订单备注",
            route: this.route
        })
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        var info = prevPage.data //取上页data里的数据也可以修改
        console.info(info)
        if(info.remark){
        this.setData({
        remarkMsg: info.remark,
        remarkPlaceholder:'',
        remarkMsgCount:info.remark.length
        })
    }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});