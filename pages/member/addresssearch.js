var a = require("../../utils/api.js"),
  e = require("../../utils/util.js"),
  t = require("../../service/location.js"),
  s = getApp(),
  user = require('../../utils/mydev/user.js'),
  util = require('../../utils/mydev/util.js'),
  api = require('../../utils/mydev/api.js'),
  n = require("../../utils/monitor/monitor.js");

Page({
  data: {
    location: null,
    keyName: "",
    showKeyNameClear: !1,
    cityName: "",
    searchAddressList: null,
    noSearchAddress: !1,
    searching: !1,
    searchingKeyName: null,
    searchCount: 20
  },
  loadGlobalData: function() {
    var a = s.globalData.selectedCityInfo,
      e = s.globalData.locationCityInfo;
    this.setData({
      cityName: a ? a.cityName : e ? e.cityName : "",
      location: s.globalData.location
    });
  },
  keyNameInputHandler: function(a) {
    var t = e.trim(a.detail.value);
    this.setData({
      keyName: t,
      showKeyNameClear: null !== t
    }), t && this.searchAddress();
  },
  keyNameClearHandler: function(a) {
    this.setData({
      keyName: "",
      showKeyNameClear: !1,
      searchingKeyName: "",
      searching: !1,
      searchAddressList: null
    });
  },
  addressSelectedHandler: function(a) {
    var e = a.currentTarget.dataset.address;
    
    null !== a && (s.globalData.searchAddressInfo = e,
    wx.navigateBack());


    // t.locationToShop(e).then(function(a) {

    //   null !== a && (s.globalData.searchAddressInfo = e, s.globalData.dispatchMsg = a.content.dispatchMsg,


    //     wx.navigateBack());
    // });



  },


  // searchAddress: function() {
  //   var e = this;
  //   !this.data.searching && this.data.cityName && (this.setData({
  //     searching: !0,
  //     searchingKeyName: this.data.keyName
  //   }), a.ajax({
  //     url: "/resource/m/user/address/search2",
  //     data: {
  //       keyName: this.data.keyName,
  //       cityName: null === this.data.keyName || this.data.keyName.length < 1 ? "" : this.data.cityName,
  //       lon: this.data.location.longitude,
  //       lat: this.data.location.latitude,
  //       offset: 0,
  //       pageSize: this.data.searchCount
  //     }
  //   }).then(function(a) {
  //     e.setData({
  //       searching: !1
  //     }), e.data.keyName === e.data.searchingKeyName ? a && a.content && e.setData({
  //       searchAddressList: a.content.addrList,
  //       noSearchAddress: !a.content.addrList || a.content.addrList.length < 1
  //     }) : e.searchAddress();
  //   }).catch(function(a) {
  //     return e.setData({
  //       searching: !1
  //     });
  //   }));
  // },



  onLoad: function(a) {
    // n.onLoad(this);
  },
  onReady: function() {},
  onShow: function() {
    a.scanHandler({
      title: "选择地址",
      route: this.route
    }), 
    // this.loadGlobalData(), 
    this.searchAddress();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return s.globalData.share;
  },


  searchAddress: function () {
    var a = this,
      t = s.globalData.location || {};
    util.request(api.GetAddressList,{
      longitude: t.longitude,
      latitude: t.latitude,
      keywords: a.data.keyName,
    },'POST').then(function (res) {
      if (res.code == 200) {
        if (res.data && res.data.length != 0) {
          a.setData({
            searchAddressList: res.data
          });
        } 
      }
    });




    // var e = this;
    // !this.data.searching && this.data.cityName && (this.setData({
    //   searching: !0,
    //   searchingKeyName: this.data.keyName
    // }), a.ajax({
    //   url: "/resource/m/user/address/search2",
    //   data: {
    //     keyName: this.data.keyName,
    //     cityName: null === this.data.keyName || this.data.keyName.length < 1 ? "" : this.data.cityName,
    //     lon: this.data.location.longitude,
    //     lat: this.data.location.latitude,
    //     offset: 0,
    //     pageSize: this.data.searchCount
    //   }
    // }).then(function (a) {
    //   e.setData({
    //     searching: !1
    //   }), e.data.keyName === e.data.searchingKeyName ? a && a.content && e.setData({
    //     searchAddressList: a.content.addrList,
    //     noSearchAddress: !a.content.addrList || a.content.addrList.length < 1
    //   }) : e.searchAddress();
    // }).catch(function (a) {
    //   return e.setData({
    //     searching: !1
    //   });
    // }));
  },




});