function e(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}

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

用户点击右上角分享

*/

onShareAppMessage: function(){
  var oppenid = wx.getStorageSync('oppenid');
  return {

    title: 'EECUP邀新有礼 呼朋唤友来领券',

    path: 'pages/index/home?openid='+oppenid,

    imageUrl: ''

  };
  // return util.shareEvent(option, obj);

},
 

});