function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var o = e(require("../../service/cart.js")),
  n = e(require("../../service/login.js")),
  t = require("../../utils/api.js").ajax,
  i = require("../../utils/store.js"),
  r = require("../../utils/api.js"),
  a = getApp(),
  s = require("../../utils/monitor/monitor.js");

Page({
  data: {
    userAvatar: "",
    userName: "",
    mobile: "",
    sexArray: ["", "男", "女"],
    objectSexArray: [{
      id: 0,
      name: ""
    }, {
      id: 1,
      name: "男"
    }, {
      id: 2,
      name: "女"
    }],
    sexIndex: 0,
    weixin: 2
  },
  unBindHander: function() {
    var e = this;
    "1" == this.data.weixin && wx.showModal({
      content: "确定解除与微信账号的关联关系吗？",
      showCancel: !0,
      cancelText: "取消",
      cancelColor: "#999999",
      confirmText: "确定解绑",
      confirmColor: "#f2cba4",
      success: function(o) {
        o.confirm && r.ajax({
          url: "/resource/m/user/unbindwechat"
        }).then(function(o) {
          if ("success" == o.content) {
            e.setData({
              weixin: 2
            });
            var n = i.getStore("userInfo");
            n.bindingState = 2, i.setStore("userInfo", n);
          }
        });
      },
      fail: function(e) {},
      complete: function(e) {}
    });
  },
  onLoad: function() {
    var e = i.getStore("userInfo");
    this.setData({
      userAvatar: e.imgUrl || "",
      userName: e.userName || "",
      mobile: e.mobile || "",
      sexIndex: e.sex || 0,
      weixin: e.bindingState || 2
    });
  },
  onShow: function() {
    console.log("mini version：", a.globalData.version), r.scanHandler({
      title: "个人资料",
      route: this.route
    });
    var e = getCurrentPages(),
      o = e[e.length - 1].options;
    o.loginFail && wx.showModal({
      content: o.loginFail,
      showCancel: !1,
      confirmText: "我知道了",
      confirmColor: a.globalData.modal.confirmColor
    });
  },
  handlerLogout: function(e) {
    t({
      url: "/resource/m/user/logout",
      data: {}
    }).then(function(e) {
      "BASE000" === e.busiCode && 1 === e.code && n.default.clearLoginData(a, o.default);
    });
  }
});