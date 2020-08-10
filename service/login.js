function e(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = function() {
    function e(e, t) {
      for (var a = 0; a < t.length; a++) {
        var n = t[a];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    return function(t, a, n) {
      return a && e(t.prototype, a), n && e(t, n), t;
    };
  }(),
  a = function(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }(require("../utils/store.js")),
  n = require("./../utils/promise/es6-promise.min.js"),
  o = require("../utils/api.js"),
  l = function() {
    function l() {
      e(this, l);
    }
    return t(l, [{
      key: "setLoginStatus",
      value: function(e) {
        return a.default.setStore("LOGIN_STATUS", e);
      }
    }, {
      key: "clearLoginStatus",
      value: function() {
        return a.default.removeStore("LOGIN_STATUS");
      }
    }, {
      key: "getLoginStatus",
      value: function() {
        var e = getApp();
        return new n(function(t, n) {
          a.default.getStore("LOGIN_STATUS") ? e.globalData.userFlag ? t(!0) : o.ajax({
            url: "/resource/m/user/baseinfo/detail",
            data: {},
            options: {
              needLogin: !1,
              needOriginResult: !0
            }
          }).then(function(a) {
            a && a.content ? (e.globalData.userFlag = !0, t(!0)) : (e.globalData.userFlag = !1,
              t(!1));
          }) : t(!1);
        });
      }
    }, {
      key: "setLoginMobile",
      value: function(e) {
        return a.default.setStore("LOGIN_MOBILE", e);
      }
    }, {
      key: "clearLoginMobile",
      value: function() {
        return a.default.removeStore("LOGIN_MOBILE");
      }
    }, {
      key: "getLoginMobile",
      value: function() {
        return a.default.getStore("LOGIN_MOBILE");
      }
    }, {
      key: "setUserInfo",
      value: function(e) {
        return a.default.setStore("LOGIN_USERINFO", e);
      }
    }, {
      key: "getUserInfo",
      value: function() {
        return this.setLoginMobile(), a.default.getStore("LOGIN_USERINFO");
      }
    }, {
      key: "getMemberInfo",
      value: function() {
        var e = this;
        o.ajax({
          url: "/resource/m/user/baseinfo/detail",
          data: {},
          options: {
            needLogin: !1,
            needOriginResult: !0
          }
        }).then(function(t) {
          e.setUserInfo(t.content);
        });
      }
    }, {
      key: "clearLoginData",
      value: function(e, t) {
        this.setLoginStatus(!1), e.globalData.mobile = "", e.globalData.userFlag = !1, e.globalData.menuLoginFlag = !1,
          e.globalData.menuLocationFlag = !1, e.globalData.awakenCoupon = !1, this.clearLoginMobile(),
          a.default.removeStore("userInfo"), a.default.removeStore("uid"), a.default.removeStore("userId"),
          e.globalData.uid = "", e.globalData.millionObj = "", e.globalData.millionStart = !1,
          e.globalData.addressInfo = null, e.globalData.shopInfo = null, e.globalData.delivery = "pick",
          e.globalData.locationFlag = !1, e.globalData.isPreset = !1, e.globalData.clearFlag = !0,
          wx.reLaunch({
            url: "../member/center",
            complete: function() {
              t.emptyCart();
            }
          });
      }
    }, {
      key: "loginRouter",
      value: function(e, t, a) {
        e && t && a ? "redirectTo" === t || "switch" === t ? wx.redirectTo({
          url: "/pages/index/wxlogin?type=" + t + "&returnUrl=" + encodeURIComponent(a)
        }) : wx.navigateTo({
          url: "/pages/index/wxlogin?type=" + t + "&returnUrl=" + encodeURIComponent(a)
        }) : wx.navigateTo({
          url: "/pages/index/wxlogin"
        });
      }
    }]), l;
  }();

exports.default = new l();