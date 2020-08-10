var t = require("../../utils/api.js"),
  a = require("../../utils/util.js"),
  s = getApp(),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  e = require("../../utils/monitor/monitor.js");

Page({
  data: {
    noAddressDesc: !1,
    addressList: [],
    addressCountLimit: -1,
    isIpx: !1,
  },
  clearGlobalData: function() {
    s.globalData.searchAddressInfo = null, s.globalData.nearbyAddressInfo = null, s.globalData.editAddressInfo = null;
  },
  addressEditClickHandler: function(t) {
    var a = t.target.dataset.address;
    a || (a = t.currentTarget.dataset.address), t.targetUrl = "/pages/member/addressedit?from=addresslist&addrid=" + a.id,
      wx.navigateTo({
        url: t.targetUrl
      });
  },
  addAddressBtnClickHandler: function(s) {
    s && s.detail && t.collectFormId(s.detail.formId), -1 !== this.data.addressCountLimit && (this.data.addressCountLimit <= this.data.addressList.length ? a.toast("您最多可添加" + this.data.addressCountLimit + "条地址") : (s.targetUrl = "/pages/member/addressedit?from=addressList",
      wx.navigateTo({
        url: s.targetUrl
      })));
  },
  loadAddressList: function() {
    var a = this;
    t.ajax({
      url: "/resource/m/user/address/list"
    }).then(function(t) {
      if (t && t.content) {
        var e = t.content.addrList;
        s.globalData.addressList = t.content.addrList, a.setData({
          noAddressDesc: !(e && e.length > 0),
          addressCountLimit: t.content.countLimt,
          addressList: e && e.length > 0 ? e : []
        });
      }
    });
  },


  getAddressList() {
    let that = this;
    var oppenid = wx.getStorageSync('oppenid');
    var storeId = wx.getStorageSync('storeid');
    util.request(api.AddressList, {
      oppenId: oppenid,
      storeId: storeId
    }, 'POST').then(function(res) {
      if (res.code === 200) {
        that.setData({
          addressList: res.data
        });
      }
    });
  },

  addressAddOrUpdate(event) {
    console.log(event)
    wx.navigateTo({
      url: "/pages/member/addressedit?from=addressList"
    })
  },


  onLoad: function(t) {
    this.setData({
      isIpx: s.globalData.isIpx
    });


  },
  onReady: function() {},
  onShow: function() {
    t.scanHandler({
        title: "收货地址",
        route: this.route
      }),
      this.clearGlobalData();
    this.getAddressList();

  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return s.globalData.share;
  }
});