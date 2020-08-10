function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("./../../service/login")),
  o = t(require("./../../utils/store")),
  n = require("../../utils/api.js"),
  i = require("./../../utils/promise/es6-promise.min.js"),
  a = require("../../utils/monitor/monitor.js"),
  s = require("../../service/openid.js"),
  r = require("../../fmsdk/fm-1.5.1.js"),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  l = getApp();
Page({
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    userInfo: null,
    encryptedData: null,
    bindStatus: null,
    loginState: !1,
    code: null,
    blackBox: "",
    fromPage: ''
  },
  getFp: function (t) {
    var e = this;
    e.fmagent.getInfo({
      page: e,
      openid: t,
      success: function (t) {
        e.setData({
          blackBox: t
        });
      },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  wxLogin: function () {
    var t = this;
    wx.showLoading({
      title: "加载中...",
      mask: !0
    });
    var i = this,
      s = {
        code: this.data.code,
        isAuthorization: !1,
        blackBox: i.data.blackBox
      };


    user.loginByWeixin(e.detail).then(res => {
      this.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });



    // i.data.bindStatus || (s.iv = i.data.iv, s.encryptedData = i.data.encryptedData),
    //   n.ajax({
    //   url: "/api/auth/login_by_weixin1",
    //     data: s
    //   }).then(function(n) {
    //     if (n && n.content && n.content.openid)
    //       if (wx.hideLoading(), 0 === n.content.bindStatus) wx.navigateTo({
    //         url: i.options.returnUrl ? "/pages/index/login?moblieFlag=true&returnUrl=" + i.options.returnUrl + "&type=" + i.options.type + "&mobile=" + n.content.mobile : "/pages/index/login?moblieFlag=true&mobile=" + n.content.mobile
    //       });
    //       else if (1 === n.content.status)
    //       if (e.default.setLoginStatus(!0), l.globalData.userFlag = !0,
    //         o.default.setStore("userId", n.content.userId), l.globalData.mobile = n.content.mobile,
    //         l.globalData.clearFlag = !1, e.default.setLoginMobile(n.content.mobile), e.default.getMemberInfo(),
    //         1 == n.content.perfect) t.setData({
    //         loginState: !0
    //       }), t.options && t.options.type && t.options.returnUrl ? wx.navigateTo({
    //         url: "/pages/member/supplement?type=" + t.options.type + "&returnUrl=" + t.options.returnUrl
    //       }) : wx.navigateTo({
    //         url: "/pages/member/supplement?type=switch&returnUrl=/pages/index/home"
    //       });
    //       else {
    //         if (t.options && t.options.returnUrl) {
    //           var s = decodeURIComponent(t.options.returnUrl);
    //           "switch" === t.options.type ? wx.switchTab({
    //             url: s
    //           }) : "redirectTo" === t.options.type || "navigateTo" === t.options.type ? wx.redirectTo({
    //             url: s
    //           }) : wx.navigateBack();
    //         } else wx.switchTab({
    //           url: "/pages/index/home"
    //         });
    //         a.login(!0, !1);
    //       }
    //     else a.login(!1, !1);
    //     else a.login(!1, !1);
    //   });
  },
  phoneLogin: function () {
    this.options && this.options.type && this.options.returnUrl ? "redirect" !== this.options.type && "navigateTo" !== this.options.type && "redirectTo" !== this.options.type || wx.redirectTo({
      url: "/pages/index/login?type=" + this.options.type + "&returnUrl=" + this.options.returnUrl
    }) : wx.navigateTo({
      url: "/pages/index/login"
    });
  },
  getCode: function () {
    return new i(function (t, e) {
      wx.login({
        success: function (e) {
          e.code && t(e.code);
        }
      });
    });
  },
  getBindState: function () {
    var t = this;
    wx.showLoading({
      title: "加载中...",
      mask: !0
    }), this.getCode().then(function (e) {
      n.ajax({
        url: "/resource/m/user/checkBindStatus",
        data: {
          code: e
        },
        options: {
          loading: !1
        }
      }).then(function (e) {
        t.setData({
          bindStatus: e.content
        }), t.getCode().then(function (e) {
          wx.hideLoading(), t.setData({
            code: e
          });
        });
      });
    });
  },
  _doLogout: function () {
    n.ajax({
      url: "/resource/m/user/logout",
      options: {
        needLogin: !1,
        loading: !1
      },
      data: {}
    }).then(function (t) {
      "BASE000" === t.busiCode && 1 === t.code && (e.default.setLoginStatus(!1), l.globalData.mobile = "",
        e.default.clearLoginMobile(), o.default.removeStore("userInfo"), o.default.removeStore("uid"),
        o.default.removeStore("userId"), l.globalData.uid = "", l.globalData.mobile = "");
    });
  },
  bindGetPhoneNumber: function (t) {
    t.detail.hasOwnProperty("iv") && (this.setData({
      iv: t.detail.iv,
      encryptedData: t.detail.encryptedData
    }), this.wxLogin());
  },
  onLoad: function (t) {
   
    this.setData({
      fromPage: t.from ? t.from : ''
    });
  },
  onReady: function () { },
  onShow: function () {
    // var t = this;
    // this.fmagent = new r(l.globalData._fmOpt), 
    // s.checkOpenId().then(function(e) {
    //   e && t.getFp(l.globalData.openid);
    // }), 
    // this.getBindState();
    // var o = e.default.getUserInfo();
    // o && this.setData({
    //   userInfo: o
    // }), this.data.loginState && this._doLogout();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },


  bindGetUserInfo(e) {
    console.info(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      user.loginByWeixin(e.detail).then(res => {
        if (this.data.fromPage != "" ){
          wx.navigateBack({
            delta: 1
          });
        }else {
          wx.reLaunch({
            url: "/pages/index/home",
          });
        }
        
      }).catch((err) => {
        console.log(err)
      });
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告通知',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                  user.loginByWeixin(e.detail).then(res => {
                    console.info(res)
                    this.setData({
                      userInfo: res.data.userInfo
                    });
                    app.globalData.userInfo = res.data.userInfo;
                    app.globalData.token = res.data.token;
                  }).catch((err) => {
                    console.log(err)
                  });
                }
              }
            })
          }
        }
      });
    }
  },
});