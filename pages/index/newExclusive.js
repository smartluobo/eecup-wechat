function e(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
let util = require('./../../utils/mydev/util.js'),api = require('./../../utils/mydev/api.js');
Page({
  data: {
    isLoginPageSuccess: !1,
    loginFail: !1,
    invitationUrl: "",
    advertImage: "",
    actionUrl: "../index/login",
    authorizationShow: !1,
    openCardList: null,
    userInfo: {},
    isShow: 'pro'
  },
  onLoad: function() {
    // o.onLoad(this);

  },
  onReady: function() {},
  /*

*/
//领取新人优惠劵
getCoupon: function() {
  // let that = this;
  var oppenid = wx.getStorageSync('oppenid');
  util.request(api.receiveNewUserGift, {
    oppenId: oppenid
    },
    'POST'
  ).then(function(res) {
    if (res.code === 200) {
      console.info(res)
      wx.switchTab({
        url: '/pages/index/menu'
      })  
    }else{
      wx.showToast({
        title: res.msg,
        icon: "none"
      });
    }
  });
},



 

});