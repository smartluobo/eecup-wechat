function e(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

var t = function(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }(require("./../../service/login.js")),
  i = require("../../utils/api.js").ajax,
  a = require("../../utils/store.js"),
  r = require("../../utils/util.js"),
  n = require("../../utils/api.js"),
  o = require("../../utils/monitor/monitor.js"),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  s = getApp();

Page({
  data: {
    isLoginPageSuccess: !1,
    loginFail: !1,
    userAvatar: "",
    userName: "点击登录",
    invitationUrl: "",
    advertImage: "",
    actionUrl: "../index/login",
    authorizationShow: !1,
    openCardList: null,
    navListFirst: [{
      id: "getAddress",
      label: "收货地址"
    }, {
      id: "wallet",
      label: "咖啡钱包",
      extra: ""
    }, {
      id: "coupon",
      label: "优惠券",
      extra: ""
    }, {
      id: "receipt",
      label: "发票管理"
    }, {
      id: "customerService",
      label: "客户服务"
    }],
    userInfo: {},
    userDetails:{},//用户详情
    isShow: 'pro'
  },
  onLoad: function() {
    // o.onLoad(this);
    let that = this;
   
  },
  onShow: function() {
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo) {

      this.setData({
        userName: userInfo.nickName,
        userAvatar: userInfo.avatarUrl,
      })
     
    }
    n.scanHandler({
      title: "个人中心",
      route: this.route
    }),this.getUserInfo();
    this.getShowAndHide();
  },
 
  urlList: {
    getAddress: "../member/addresslist",
    customerService: "../order/customerservice",
    wallet: "../coupon/wallet",
    coupon: "../coupon/coupon?from=list",
    share:"/pages/member/share"
  },
  getUserInfo:function(){
    var that = this;
    var oppenid = wx.getStorageSync('oppenid');
    util.request(api.getUserInfo, {
      oppenId:oppenid
    }, 'Post').then(function (res) {
      if (res.code == 200) {
        that.setData({
          userDetails:res.data
        })
      }
    });
  },

  handlerNavTap: function(e) {
    var i = this;
    "receipt" === e.currentTarget.dataset.id ? t.default.getLoginStatus() ? wx.navigateTo({
      url: "/pages/invoice/invoicemanage"
    }) : t.default.loginRouter(!0, "switch", "/pages/member/center") : (e.targetUrl = i.urlList[e.currentTarget.dataset.id],
      r.navigate({
        url: e.targetUrl
      }, {
        needLogin: !0
      }));
  },
  handlerUserAreaTap: function(e) {
    var i = this;
    !0 === this.data.isLoginPageSuccess ? this.data.loginFail ? wx.navigateTo({
      url: "../member/info?loginFail=" + i.data.errMsg
    }) : wx.navigateTo({
      url: "../member/info"
    }) : t.default.loginRouter();
  },
  invitationPeople: function() {
    wx.navigateTo({
      url: "/pages/index/introduce?locationType=1&pageFrom=center"
    });
  },

  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      user.loginByWeixin(e.detail).then(res => {
        this.setData({
          userInfo: res.userInfo,
          userAvatar: res.userInfo.avatarUrl,
          userName: res.userInfo.nickName
        });
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


  onTabItemTap: function(e) {},

  coupon: function (t) {
    wx.navigateTo({
      url: "/pages/member/couponList"
    });
  },
  share:function(){
    wx.navigateTo({
      url: "/pages/member/share"
    });
  },
  customerService: function (t) {
    wx.navigateTo({
      url: "/pages/order/customerservice?from=center"
    });
  },
  getShowAndHide: function () {
    var a = this;
    util.request(api.IsShow, {

    }, 'GET').then(function (res) {
      if (res.code == 200) {
        a.setData({
          isShow: res.data
        })
      }
    });
  },


});