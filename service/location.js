var n = require("../utils/promise/es6-promise.min.js"),
  o = require("../utils/api.js"),
  user = require('../utils/mydev/user.js'),
  util = require('../utils/mydev/util.js'),
  api = require('../utils/mydev/api.js'),
  e = getApp();

module.exports = {
  
  shopDistanceConvert: function(n) {
    if (!n) return null;
    if (n instanceof Array)
      for (var o in n) n[o].distance >= 1 ? n[o].distanceText = parseFloat(n[o].distance).toFixed(1) + "km" : n[o].distanceText = parseInt(1e3 * n[o].distance, 10) + "m";
    else n.distance >= 1 ? n.distanceText = parseFloat(n.distance).toFixed(1) + "km" : n.distanceText = parseInt(1e3 * n.distance, 10) + "m";
    return n;
  },

  locationToCityInfo: function(a, t) {
    return new n(function(n, l) {
      o.ajax({
        url: "/resource/m/sys/base/location",
        data: {
          lon: a,
          lat: t,
          channel: e.globalData.mapChannel
        }
      }).then(function(o) {
        o && o.content && n(o.content);
      });
    });
  },
  locationToShop: function(a, t, l) {
    var r = e.globalData.location;
    return new n(function(n, i) {
      null === a && n(null), o.ajax({
        url: "/resource/m/sys/base/homeshop",
        data: {
          longitude: 1 * a.lon,
          latitude: 1 * a.lat,
          lonHere: r.longitude ? r.longitude : a.lon,
          latHere: r.longitude ? r.latitude : a.lat,
          channel: e.globalData.mapChannel,
          isExpress: 1,
          deptId: "confirmOrder" === l ? "" : t,
          isSelfShop: 0
        },
        options: {
          needOriginResult: !0
        }
      }).then(function(o) {
        7 === o.code ? (wx.showModal({
          content: o.msg,
          showCancel: !1,
          confirmText: "我知道了",
          confirmColor: e.globalData.modal.confirmColor
        }), n(null)) : o.content && o.content.nearShopAbnormalInfo && 1 === o.content.nearShopAbnormalInfo.abnormalType ? (wx.showModal({
          content: o.content.nearShopAbnormalInfo.abnormalDesc,
          showCancel: !1,
          confirmText: "我知道了",
          confirmColor: e.globalData.modal.confirmColor
        }), resol) : o.content && o.content.nearShopAbnormalInfo && 2 === o.content.nearShopAbnormalInfo.abnormalType ? (wx.showModal({
          content: o.content.nearShopAbnormalInfo.abnormalDesc,
          showCancel: !1,
          confirmText: "我知道了",
          confirmColor: e.globalData.modal.confirmColor
        }), n(null)) : n(o);
      });
    });
  },
  getLocation: function() {
    return new n(function(n, o) {
      wx.getLocation({
        type: "gcj02",
        success: function(o) {
          Object.assign(e.globalData.location, o), e.globalData.locationFlag = !0, n(o);
        },
        fail: function(n) {
          e.globalData.locationFlag = !1, o();
        }
      });
    });
  },


  // loadNearShop: function(a) {
  //   var t = e.globalData.location;
  //   return new n(function(n, l) {
  //     o.ajax({
  //       url: "/resource/m/sys/base/homeshop",
  //       data: {
  //         longitude: "sent" == e.globalData.delivery ? 1 * e.globalData.selectAddress.lon : t.longitude,
  //         latitude: "sent" == e.globalData.delivery ? 1 * e.globalData.selectAddress.lat : t.latitude,
  //         lonHere: t.longitude,
  //         latHere: t.latitude,
  //         channel: e.globalData.mapChannel,
  //         isExpress: "sent" == e.globalData.delivery ? 1 : 0,
  //         deptId: a || "",
  //         isSelfShop: 0
  //       },
  //       options: {
  //         needOriginResult: !0
  //       }
  //     }).then(function(o) {
  //       n(o);
  //     });
  //   });
  // },

  loadNearShop: function (a) {
    var t = e.globalData.location;
    util.request(api.SelectStore, {
        longitude: "sent" == e.globalData.delivery ? 1 * e.globalData.selectAddress.lon : t.longitude,
        latitude: "sent" == e.globalData.delivery ? 1 * e.globalData.selectAddress.lat : t.latitude,
    }, 'POST').then(function (res) {
      if (res.code == 200) {
        // e.globalData.delivery = 'pick';
        wx.setStorageSync('storeid', res.data.id);
        wx.setStorageSync('shopinfo',res.data);
        e.globalData.shopInfo = res.data;
      }
    });


  },


};