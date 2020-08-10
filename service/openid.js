var n = require("../utils/promise/es6-promise.min.js"),
  e = require("../utils/api.js"),
  t = function() {
    return getApp();
  };

module.exports = {
  checkOpenId: function() {
    var e = this;
    return new n(function(n, o) {
      t().globalData.openid ? wx.checkSession({
        success: function(e) {
          n(!0);
        },
        fail: function(t) {
          e.getOpenId().then(function(e) {
            n(e);
          });
        },
        complete: function(n) {}
      }) : e.getOpenId().then(function(e) {
        n(e);
      });
    });
  },
  getOpenId: function() {
    var t = getApp();
    return new n(function(n, o) {
      // wx.login({
      //   success: function(o) {
      //     var i = o.code;
      //     e.ajax({
      //       url: "/resource/m/user/wxlogin",
      //       data: {
      //         code: i,
      //         isAuthorization: !0
      //       }
      //     }).then(function(e) {
      //       e && e.content && e.content.openid && (t.globalData.openid = e.content.openid, t.globalData.sessionKey = e.content.sessionKey,
      //         n(!0));
      //     }).catch(function(n) {
      //       console.log(n);
      //     });
      //   }
      // });
    });
  }
};