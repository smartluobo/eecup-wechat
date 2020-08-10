function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("./../../utils/api.js")), a = t(require("./../../utils/util.js")), i = require("./../../utils/promise/es6-promise.min.js"), n = getApp(), s = require("../../utils/monitor/monitor.js");

Page({
    data: {
        orderIdList: [],
        count: 0,
        billType: "1",
        titleType: "1",
        titleName: "",
        identityNo: "",
        registerAddr: "",
        registerTel: "",
        depositBank: "",
        bankNo: "",
        email: "",
        source: "",
        moreInfo: !1,
        titleList: []
    },
    billTypeHander: function(t) {
        t && t.currentTarget && t.currentTarget.dataset && this.setData({
            billType: t.currentTarget.dataset.type
        });
    },
    titleTypeHander: function(t) {
        t && t.currentTarget && t.currentTarget.dataset && (this.setData({
            titleType: t.currentTarget.dataset.type,
            email: ""
        }), "2" === t.currentTarget.dataset.type && this.setData({
            titleName: this.data.defaultData.titleName,
            identityNo: this.data.defaultData.identityNo,
            registerAddr: this.data.defaultData.registerAddress,
            registerTel: this.data.defaultData.registerPhone,
            depositBank: this.data.defaultData.bank,
            bankNo: this.data.defaultData.bankNo,
            email: this.data.defaultData.email
        }));
    },
    getDefaultHead: function() {
        var t = this;
        this.getHeadList().then(function(e) {
            n.globalData.invoiceHead = e;
            var a = "1";
            e.typeList.map(function(t) {
                t.typeName.indexOf("类别") > -1 && t.isDefault && (a = "2");
            }), t.setData({
                defaultData: e,
                billType: a,
                titleName: e.titleName,
                identityNo: e.identityNo,
                registerAddr: e.registerAddress,
                registerTel: e.registerPhone,
                depositBank: e.bank,
                bankNo: e.bankNo,
                email: 1 == t.data.titleType ? "" : e.email
            });
        });
    },
    emailInput: function(t) {
        var e = this;
        t && t.detail && this.setData({
            email: t.detail.value
        }, function() {
            e.checkInput();
        });
    },
    titleNameInput: function(t) {
        var e = this;
        t && t.detail && this.setData({
            titleName: t.detail.value
        }, function() {
            e.checkInput();
        });
    },
    identityNoInput: function(t) {
        var e = this;
        t && t.detail && this.setData({
            identityNo: t.detail.value
        }, function() {
            e.checkInput();
        });
    },
    registerAddrInput: function(t) {
        var e = this;
        t && t.detail && this.setData({
            registerAddr: t.detail.value
        }, function() {
            e.checkInput();
        });
    },
    registerTelInput: function(t) {
        var e = this;
        t && t.detail && this.setData({
            registerTel: t.detail.value
        }, function() {
            e.checkInput();
        });
    },
    depositBankInput: function(t) {
        var e = this;
        t && t.detail && this.setData({
            depositBank: t.detail.value
        }, function() {
            e.checkInput();
        });
    },
    bankNoInput: function(t) {
        var e = this;
        t && t.detail && this.setData({
            bankNo: t.detail.value
        }, function() {
            e.checkInput();
        });
    },
    checkInput: function() {
        this.data.titleName && this.data.identityNo && this.data.registerAddr && this.data.registerTel && this.data.depositBank && this.data.bankNo && this.data.email ? this.setData({
            canSubmit: !0
        }) : this.setData({
            canSubmit: !1
        });
    },
    goHead: function() {
        wx.navigateTo({
            url: "/pages/invoice/invoicehead?type=create"
        });
    },
    moreInfoHander: function() {
        this.setData({
            moreInfo: !this.data.moreInfo
        });
    },
    getHeadList: function() {
        return new i(function(t, a) {
            e.default.ajax({
                url: "/resource/m/user/receipt/default"
            }).then(function(e) {
                e && e.content && t(e.content);
            });
        });
    },
    submitHander: function() {
        var t = {
            receiptSource: "1" === n.globalData.invoiceType ? "1" : "3",
            orderIdList: this.data.orderIdList,
            source: "14",
            count: this.data.count,
            titleType: this.data.titleType,
            billType: this.data.billType,
            titleName: this.data.titleName,
            identityNo: this.data.identityNo,
            registerAddr: this.data.registerAddr,
            registerTel: this.data.registerTel,
            depositBank: this.data.depositBank,
            bankNo: this.data.bankNo,
            email: this.data.email
        };
        e.default.ajax({
            url: "/resource/m/user/receipt/list/batchOrder",
            data: t
        }).then(function(t) {
            t && t.content && "SUCCESS" === t.status && String(t.content).indexOf("成功") > -1 && (n.globalData.invoiceList = "", 
            n.globalData.allInvoiceList = "", wx.navigateBack());
        });
    },
    onLoad: function(t) {
        // s.onLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var t = 0, e = n.globalData.invoiceList.map(function(e) {
            return t += 1e6 * e.ticketAmount, e.orderId;
        });
        if ("choose" === n.globalData.headType) {
            var i = n.globalData.choseHead;
            this.setData({
                titleType: "2",
                titleName: i.titleName,
                identityNo: i.identityNo,
                registerAddr: i.registerAddress,
                registerTel: i.registerPhone,
                depositBank: i.bank,
                bankNo: i.bankNo,
                email: i.email
            });
        } else this.getDefaultHead();
        this.setData({
            orderIdList: e,
            count: a.default.parseMoney(t / 1e6),
            isIpx: n.globalData.isIpx
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});