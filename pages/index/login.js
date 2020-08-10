function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var t = e(require("../../service/login")),
  a = (e(require("../../service/location")),
    e(require("../../service/openid"))),
  n = require("./../../utils/store.js"),
  i = require("../../utils/util.js"),
  o = require("../../utils/api.js"),
  s = getApp(),
  l = require("../../utils/monitor/monitor.js"),
  d = require("./../../fmsdk/fm-1.5.1.js");

Page({
  data: {
    mobile: "",
    verifycode: "",
    sendText: "获取验证码",
    sendTextState: "disabled",
    sendTextDisabled: !0,
    sendClass: "unsend",
    remain: 0,
    deviceId: "",
    submitState: "disabled",
    clearBtnState: "hide",
    wxMobile: null,
    openid: null,
    sessionKey: null,
    blackBox: ""
  },
  getFp: function(e) {
    var t = this;
    t.fmagent.getInfo({
      page: t,
      openid: e,
      success: function(e) {
        t.setData({
          blackBox: e
        });
      },
      fail: function(e) {},
      complete: function(e) {}
    });
  },
  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value,
      clearBtnState: "" == e.detail.value ? "hide" : "show"
    }), this.handleSubmitState();
  },
  clearMobileInput: function() {
    this.setData({
      mobile: "",
      clearBtnState: "hide"
    }), this.handleSubmitState();
  },
  memberAgreement: function(e) {
    e.targetUrl = "../agreement/member", wx.navigateTo({
      url: e.targetUrl
    });
  },
  verifycodeInput: function(e) {
    this.setData({
      verifycode: e.detail.value
    }), this.handleSubmitState();
  },
  handleSubmitState: function() {
    11 === this.data.mobile.length ? this.setData({
      sendTextState: "enable",
      sendTextDisabled: !1
    }) : this.setData({
      sendTextState: "disabled",
      sendTextDisabled: !0
    }), 11 === this.data.mobile.length && 6 === this.data.verifycode.length && "send" === this.data.sendClass ? this.setData({
      submitState: "enable"
    }) : this.setData({
      submitState: "disabled"
    });
  },
  wxUserInfo: function(e) {
    e.detail.iv && (this.setData({
      authStatus: "got",
      wxUserInfo: e.detail
    }), this.sendVerifycode(e));
  },
  sendVerifycode: function(e) {
    var t = this;
    e && e.detail && e.detail.formId && o.collectFormId(e.detail.formId);
    "disabled" === this.data.sendTextState && null === this.data.wxMobile || this.data.remain > 1 || o.ajax({
      url: "/resource/m/sys/base/validcode",
      options: {
        loading: !0
      },
      data: {
        mobile: this.data.mobile,
        deviceId: this.data.deviceId
      }
    }).then(function(e) {
      if (e.content.validate) wx.showModal({
        title: "",
        content: "设备号被拉入黑名单了，过30分钟再试试",
        showCancel: !1,
        confirmColor: "#f2cba4",
        confirmText: "我知道了",
        success: function(e) {}
      });
      else {
        i.toast("验证码已发送"), t.setData({
          remain: e.content.remain,
          sendText: e.content.remain + "s",
          sendClass: "send"
        }, function() {
          t.handleSubmitState();
        });
        var a = setInterval(function() {
          1 === t.data.remain ? (t.setData({
            sendText: "重发验证码",
            sendClass: "unsend"
          }), clearInterval(a)) : t.setData({
            remain: --t.data.remain,
            sendText: t.data.remain + "s"
          });
        }, 1e3);
      }
    });
  },
  login: function(e) {
    e && e.detail && o.collectFormId(e.detail.formId), "disabled" !== this.data.submitState && this._loginAjax(this.data.wxUserInfo);
  },
  _loginAjax: function(e) {
    var t = this,
      n = {
        mobile: this.data.mobile,
        validateCode: this.data.verifycode,
        sessionKey: this.data.sessionKey,
        openid: this.data.openid,
        type: 1,
        blackBox: this.data.blackBox
      };
    e && (n.encryptedData = e.encryptedData, n.iv = e.iv), a.default.checkOpenId().then(function(e) {
      e && (n.openid = s.globalData.openid, n.sessionKey = s.globalData.sessionKey, o.ajax({
        url: "/resource/m/user/login",
        options: {
          needOriginResult: !0
        },
        data: n
      }).then(function(e) {
        t.loginDeal(e);
      }));
    });
  },
  loginDeal: function(e) {
    if (e.content && "SUCCESS" === e.status.toUpperCase() && 1 == e.content.status)
      if (t.default.getMemberInfo(),
        t.default.setLoginStatus(!0), s.globalData.userFlag = !0, n.setStore("userId", e.content.userId),
        s.globalData.mobile = this.data.mobile, s.globalData.clearFlag = !1, t.default.setLoginMobile(this.data.mobile),
        1 == e.content.perfect) this.options && this.options.type && this.options.returnUrl ? wx.navigateTo({
        url: "/pages/member/supplement?type=" + this.options.type + "&returnUrl=" + this.options.returnUrl
      }) : wx.navigateTo({
        url: "/pages/member/supplement?type=switch&returnUrl=/pages/index/home"
      });
      else {
        if (this.options && this.options.returnUrl) {
          var a = decodeURIComponent(this.options.returnUrl);
          "switch" === this.options.type ? wx.switchTab({
            url: a
          }) : wx.redirectTo({
            url: a
          });
        } else wx.switchTab({
          url: "/pages/index/home"
        });
        l.login(!0, !1);
      }
    else {
      var i = e.content && e.content.msg && e.content.msg.split("_").join("\r\n") || e.msg;
      wx.showModal({
        title: "",
        content: i,
        showCancel: !1,
        confirmColor: "#f2cba4",
        confirmText: "我知道了",
        success: function(e) {}
      }), l.login(!1, !1);
    }
  },
  _doLogout: function() {
    o.ajax({
      url: "/resource/m/user/logout",
      options: {
        needLogin: !1,
        loading: !1
      },
      data: {}
    }).then(function(e) {
      "BASE000" === e.busiCode && 1 === e.code && (t.default.setLoginStatus(!1), s.globalData.mobile = "",
        t.default.clearLoginMobile(), n.removeStore("userInfo"), n.removeStore("uid"), n.removeStore("userId"),
        s.globalData.uid = "", s.globalData.mobile = "");
    });
  },
  setDeviceId: function(e) {
    this.setData({
      deviceId: e
    });
  },
  onLoad: function(e) {
    console.log('1');
    // var t = this;
    // e.mobile && this.setData({
    //     wxMobile: e.mobile,
    //     mobile: e.mobile,
    //     clearBtnState: "show",
    //     sendTextDisabled: !1,
    //     sendTextState: "enable"
    // });
    // var a = this;
    // wx.getSystemInfo({
    //     success: function(e) {
    //         e.model.indexOf("iPhone") > -1 ? a.setDeviceId(s.globalData.deviceNo.ios) : a.setDeviceId(s.globalData.deviceNo.android);
    //     }
    // }), 
    // wx.getSetting ? wx.login({
    //     success: function(e) {
    //         var n = e.code;
    //         o.ajax({
    //             url: "/resource/m/user/wxlogin",
    //             data: {
    //                 code: n,
    //                 isAuthorization: !0
    //             }
    //         }).then(function(e) {
    //             e && e.content && e.content.openid && (s.globalData.openid = e.content.openid, s.globalData.sessionKey = e.content.sessionKey, 
    //             t.setData({
    //                 openid: e.content.openid,
    //                 sessionKey: e.content.sessionKey
    //             }), wx.getSetting({
    //                 success: function(e) {
    //                     e.authSetting["scope.userInfo"] && wx.getUserInfo({
    //                         success: function(e) {
    //                             a.setData({
    //                                 authStatus: "got",
    //                                 wxUserInfo: e
    //                             });
    //                         }
    //                     });
    //                 }
    //             }));
    //         });
    //     }
    // }) : wx.showModal({
    //     title: "提示",
    //     content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
    //     showCancel: !1
    // }), l.onLoad(this);
  },
  onReady: function() {},
  onShow: function() {
    var e = this;
    this.fmagent = new d(s.globalData._fmOpt), a.default.checkOpenId().then(function(t) {
      t && e.getFp(s.globalData.openid);
    }), o.scanHandler({
      title: "账户登录",
      route: this.route
    }), s.globalData.mobile && this._doLogout();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return s.globalData.share;
  }
});