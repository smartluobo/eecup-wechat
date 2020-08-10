var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../service/order.js")), e = require("../../utils/api.js"), r = require("../../utils/monitor/monitor.js");

Page({
    data: {},
    getOrderEvaluate: function() {
        var e = t.default.getOrderEvaluateList(), r = !0, n = !1, o = void 0;
        try {
            for (var a, i = e[Symbol.iterator](); !(r = (a = i.next()).done); r = !0) {
                var u = a.value;
                u.evaluateImgList = u.evaluateImgs.split(",");
            }
        } catch (t) {
            n = !0, o = t;
        } finally {
            try {
                !r && i.return && i.return();
            } finally {
                if (n) throw o;
            }
        }
        this.setData({
            orderEvaluateList: e
        });
    },
    onLoad: function(t) {
        r.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        e.scanHandler({
            title: "我的评价",
            route: this.route
        }), this.getOrderEvaluate();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});