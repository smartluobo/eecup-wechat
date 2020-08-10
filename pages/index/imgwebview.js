function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

e(require("../../service/login.js")), e(require("../../service/million.js"));

var n = getApp(),
  o = require("../../utils/monitor/monitor.js");

Page({
  data: {
    webViewUrl: ""
  },
  onLoad: function(e) {
    o.onLoad(this);
  },
  onReady: function() {},
  onShow: function() {
    this.setData({
      webViewUrl: n.globalData.webViewUrl
    });
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  getWebMessage: function(e) {},
  onShareAppMessage: function() {
    return n.globalData.share;
  }
});