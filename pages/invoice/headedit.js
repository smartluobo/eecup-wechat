var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./../../utils/api.js")), e = getApp(), i = require("../../utils/monitor/monitor.js");

Page({
    data: {
        titleId: "",
        isDefault: !1,
        titleName: "",
        identityNo: "",
        registerAddr: "",
        registerTel: "",
        depositBank: "",
        bankNo: "",
        email: "",
        canSubmit: !1
    },
    checkDefault: function() {
        this.setData({
            isDefault: !this.data.isDefault
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
        t && t.detail && this.setData({
            identityNo: t.detail.value
        });
    },
    registerAddrInput: function(t) {
        t && t.detail && this.setData({
            registerAddr: t.detail.value
        });
    },
    registerTelInput: function(t) {
        t && t.detail && this.setData({
            registerTel: t.detail.value
        });
    },
    depositBankInput: function(t) {
        t && t.detail && this.setData({
            depositBank: t.detail.value
        });
    },
    bankNoInput: function(t) {
        t && t.detail && this.setData({
            bankNo: t.detail.value
        });
    },
    checkInput: function() {
        if (this.data.titleName && this.data.email) return this.setData({
            canSubmit: !0
        }), !0;
        this.setData({
            canSubmit: !1
        });
    },
    deleteHander: function() {
        var e = this;
        "edit" === this.options.type && wx.showModal({
            content: "删除后信息将无法恢复，是否确定删除？",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "#999",
            confirmText: "确定",
            confirmColor: "#f2cba4",
            success: function(i) {
                i.confirm && t.default.ajax({
                    url: "/resource/m/user/receipttitle/del",
                    data: {
                        titleId: e.data.titleId
                    }
                }).then(function(t) {
                    t && t.content && "SUCCESS" === t.status && wx.navigateBack({
                        delta: 1
                    });
                });
            }
        });
    },
    submitHander: function() {
        if (this.checkInput()) {
            var e = {
                titleName: this.data.titleName,
                identityNo: this.data.identityNo,
                email: this.data.email,
                registerAddress: this.data.registerAddr,
                registerPhone: this.data.registerTel,
                bank: this.data.depositBank,
                bankNo: this.data.bankNo,
                isDefault: this.data.isDefault
            }, i = "/resource/m/user/receipttitle/add";
            "edit" === this.options.type && (i = "/resource/m/user/receipttitle/update", e.titleId = this.data.titleId), 
            t.default.ajax({
                url: i,
                data: e
            }).then(function(t) {
                t && t.content && String(t.content).indexOf("成功") > -1 && wx.navigateBack({
                    delta: 1
                });
            });
        }
    },
    onLoad: function(t) {
        i.onLoad(this), this.setData({
            isIpx: e.globalData.isIpx
        });
    },
    onReady: function() {},
    onShow: function() {
        if (this.options && this.options.isDefault && this.setData({
            isDefault: this.options.isDefault
        }), "edit" === this.options.type) {
            var t = e.globalData.invoiceHead;
            this.setData({
                isDefault: t.isDefault,
                titleName: t.titleName,
                identityNo: t.identityNo,
                registerAddr: t.registerAddress,
                registerTel: t.registerPhone,
                depositBank: t.bank,
                bankNo: t.bankNo,
                email: t.email,
                titleId: t.titleId,
                type: "edit"
            }), wx.setNavigationBarTitle({
                title: "编辑发票抬头"
            }), this.checkInput();
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});