var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./../../service/login.js")), a = require("../../utils/api"), i = require("../../utils/monitor/monitor.js");

Page({
    data: {
        list: [],
        cardType: 0,
        pageNum: 1,
        pageSize: 10,
        loadingData: !0,
        isEnd: !1
    },
    checkCardType: function(t) {
        var a = t.currentTarget.dataset.type - 0;
        a !== this.data.cardType && (this.setData({
            cardType: a,
            loadingData: !0
        }), this.data.pageNum = 1, this.data.list = [], this.data.isEnd = !1, this.getCardList(this.data.pageNum));
    },
    getCardList: function() {
        var t = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        a.ajax({
            url: "/resource/m/promotion/giftCard/page",
            data: {
                cardType: this.data.cardType,
                pageNum: i || this.data.pageNum,
                pageSize: this.data.pageSize
            }
        }).then(function(a) {
            if (wx.stopPullDownRefresh(), "SUCCESS" === a.status) {
                var i = a.content.cardList;
                t.setData({
                    list: t.data.list.concat(i),
                    isEnd: i.length < t.data.pageSize,
                    loadingData: !1
                });
            }
        }).catch(function(a) {
            wx.stopPullDownRefresh(), t.setData({
                isEnd: !0,
                loadingData: !1
            });
        });
    },
    onLoad: function(a) {
        t.default.getLoginStatus().then(function(a) {
            if (!a) return t.default.loginRouter(!0, "redirectTo", "/pages/giftcard/giftcardmain");
        }), this.getCardList(), i.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.data.loadingData || (this.data.pageNum = 1, this.data.list = [], this.data.isEnd = !1, 
        this.getCardList(this.data.pageNum));
    },
    onReachBottom: function() {
        this.data.loadingData || this.data.isEnd || (this.data.pageNum += 1, this.getCardList(this.data.pageNum));
    }
});