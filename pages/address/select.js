function a(a) {
  return a && a.__esModule ? a : {
    default: a
  };
}

var t = a(require("../../service/order.js")),
  e = a(require("../../service/login.js")),
  o = getApp(),
  s = require("../../utils/api.js"),
  n = require("../../utils/util.js"),
  d = require("../../service/location.js"),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  i = require("../../utils/monitor/monitor.js");

Page({
  data: {
    fromPage: "",
    delivery: null,
    selectedAddressId: null,
    cityInfo: null,
    showDistance: !0,
    shopList: [],
    shopSelectId: null,
    myAddressList: null,
    myAddressSelectId: 1,
    nearbyAddressList: [],
    addressListLoading: !1,
    noShopDesc: "",
    shopPageNo: 1,
    shopPageSize: 10,
    shopHasMore: !0,
    nearbyAddressPageNo: 1,
    nearbyAddressPageSize: 10,
    nearbyAddressLimit: 50
  },
  goStoreDetail: function(a) {
    if (a && a.currentTarget && a.currentTarget.dataset) {
      var t = "menu" == this.options.from ? "/pages/index/storedetail?from=select&deptId=" + a.currentTarget.dataset.deptid + "&distance=" + a.currentTarget.dataset.distance : "/pages/index/storedetail?deptId=" + a.currentTarget.dataset.deptid + "&distance=" + a.currentTarget.dataset.distance;
      wx.navigateTo({
        url: t
      });
    }
  },
  clearGlobalData: function() {
    o.globalData.nearbyAddressInfo = null, this.setData({
        shopPageNo: 1,
        shopList: [],
        shopHasMore: !0,
        nearbyAddressPageNo: 1,
        nearbyAddressList: [],
        addressListLoading: !1
      }), o.globalData.searchAddressInfo = null, o.globalData.nearbyAddressInfo = null,
      o.globalData.editAddressInfo = null, o.globalData.loginStatistic["/resource/m/user/address/list"] = 0;
  },
  loadGlobalData: function() {
    this.setData({
      delivery: null === this.data.delivery ? o.globalData.delivery : this.data.delivery,
      shopSelectId: null !== o.globalData.shopInfo ? o.globalData.shopInfo.id : "",
      cityInfo: o.globalData.selectedCityInfo ? o.globalData.selectedCityInfo : o.globalData.locationCityInfo,
      selectedAddressId: o.globalData.addressInfo ? o.globalData.addressInfo.id : null,
      showDistance: null !== o.globalData.locationCityInfo && (null === o.globalData.selectedCityInfo || o.globalData.selectedCityInfo.cityId === o.globalData.locationCityInfo.cityId)
    });
  },
  tabClickHandler: function(a) {
    var t = a.target.dataset.delivery;
    this.setData({
      delivery: t
    });
  },
  // shopSelectHandler: function(a) {
  //   var e = a.currentTarget.dataset.shop;
  //   if (e && (e.cityId = this.data.cityInfo ? this.data.cityInfo.cityId : "", e.cityName = this.data.cityInfo ? this.data.cityInfo.cityName : ""),
  //     0 === e.isClick) return !1;
  //   "confirmOrder" === this.data.fromPage && e.deptId !== this.data.shopSelectId ? s.ajax({
  //     url: "/resource/m/order/changedept",
  //     data: {
  //       deptId: e.deptId,
  //       delivery: this.data.delivery,
  //       productList: t.default.getUserProdList(),
  //       eatway: o.globalData.eatway || "package"
  //     }
  //   }).then(function(a) {
  //     a.content ? (o.globalData.delivery = "pick", o.globalData.shopInfo = e, wx.navigateBack()) : wx.showModal({
  //       content: "服务门店变更，请重新确认商品",
  //       showCancel: !0,
  //       cancelText: "取消",
  //       cancelColor: o.globalData.modal.cancelColor,
  //       confirmText: "去确认",
  //       confirmColor: o.globalData.modal.confirmColor,
  //       success: function(a) {
  //         a.confirm && (o.globalData.delivery = "pick", o.globalData.shopInfo = e, o.globalData.addressInfo = null,
  //           wx.navigateBack({
  //             delta: 2
  //           }));
  //       }
  //     });
  //   }) : (o.globalData.delivery = "pick", o.globalData.shopInfo = e, o.globalData.addressInfo = null,
  //     wx.navigateBack());
  // },

  shopSelectHandler: function (a) {
    var e = a.currentTarget.dataset.shop;
    o.globalData.delivery = 'pick';
    wx.setStorageSync('storeid',e.id);
    wx.setStorageSync('shopinfo', e);
    // setTimeout( () => {
    //   wx.showToast({
    //     title: '目前不支持切换店铺~',
    //     icon: "none",
    //   });
    //   setTimeout( () =>{
    //     wx.hideToast();  
    //     wx.navigateBack()
    //   },1500)
    // },0);

    o.globalData.shopInfo=e;
    wx.navigateBack()
    
    // setTimeout(wx.navigateBack(),2000)
    

    // if (e && (e.cityId = this.data.cityInfo ? this.data.cityInfo.cityId : "", e.cityName = this.data.cityInfo ? this.data.cityInfo.cityName : ""),
    //   0 === e.isClick) return !1;
    // "confirmOrder" === this.data.fromPage && e.deptId !== this.data.shopSelectId ? s.ajax({
    //   url: "/resource/m/order/changedept",
    //   data: {
    //     deptId: e.deptId,
    //     delivery: this.data.delivery,
    //     productList: t.default.getUserProdList(),
    //     eatway: o.globalData.eatway || "package"
    //   }
    // }).then(function (a) {
    //   a.content ? (o.globalData.delivery = "pick", o.globalData.shopInfo = e, wx.navigateBack()) : wx.showModal({
    //     content: "服务门店变更，请重新确认商品",
    //     showCancel: !0,
    //     cancelText: "取消",
    //     cancelColor: o.globalData.modal.cancelColor,
    //     confirmText: "去确认",
    //     confirmColor: o.globalData.modal.confirmColor,
    //     success: function (a) {
    //       a.confirm && (o.globalData.delivery = "pick", o.globalData.shopInfo = e, o.globalData.addressInfo = null,
    //         wx.navigateBack({
    //           delta: 2
    //         }));
    //     }
    //   });
    // }) : (o.globalData.delivery = "pick", o.globalData.shopInfo = e, o.globalData.addressInfo = null,
    //   wx.navigateBack());
  },


  shopListScrollBottomHandler: function(a) {
    this.data.shopHasMore && (this.setData({
      shopPageNo: this.data.shopPageNo + 1
    }), this.loadCityShop());
  },
  myAddressScrollBottomHandler: function() {
    this.data.nearbyAddressPageNo * this.data.nearbyAddressPageSize >= this.data.nearbyAddressLimit || (this.setData({
      nearbyAddressPageNo: this.data.nearbyAddressPageNo + 1
    }), this.loadNearbyAddress());
  },
  // myAddressSelectHandler: function(a) {
  //   var e = this,
  //     n = a.currentTarget.dataset.address;
  //   o.globalData.selectAddress = a.currentTarget.dataset.address;
  //   var i = "confirmOrder" === this.data.fromPage ? o.globalData.shopInfo.deptId : "";
  //   d.locationToShop(n, i, this.data.fromPage).then(function(a) {
  //     a && ("confirmOrder" !== e.data.fromPage || null === i || a.content.nearShop.deptId === i ? (o.globalData.delivery = "sent",
  //       o.globalData.dispatchMsg = a.content.dispatchMsg, o.globalData.shopInfo = d.shopDistanceConvert(a.content.nearShop),
  //       o.globalData.addressInfo = n, wx.navigateBack()) : s.ajax({
  //       url: "/resource/m/order/changedept",
  //       data: {
  //         deptId: a.content.nearShop.deptId,
  //         delivery: e.data.delivery,
  //         productList: t.default.getUserProdList()
  //       }
  //     }).then(function(t) {
  //       t.content ? (o.globalData.delivery = "sent", o.globalData.dispatchMsg = a.content.dispatchMsg,
  //         o.globalData.shopInfo = d.shopDistanceConvert(a.content.nearShop), o.globalData.addressInfo = n,
  //         wx.navigateBack()) : wx.showModal({
  //         content: "服务门店变更，请重新确认商品",
  //         showCancel: !0,
  //         cancelText: "取消",
  //         cancelColor: o.globalData.modal.cancelColor,
  //         confirmText: "去确认",
  //         confirmColor: o.globalData.modal.confirmColor,
  //         success: function(t) {
  //           t.confirm && (o.globalData.delivery = "sent", o.globalData.dispatchMsg = a.content.dispatchMsg,
  //             o.globalData.shopInfo = d.shopDistanceConvert(a.content.nearShop), o.globalData.storeDeptId = a.content.nearShop.deptId,
  //             o.globalData.addressInfo = n, wx.navigateBack({
  //               delta: 2
  //             }));
  //         }
  //       });
  //     }));
  //   });
  // },
  nearbyAddressSelectHandler: function(a) {
    var t = this,
      e = a.currentTarget.dataset.address;
    this.addressListLoading || (this.addressListLoading = !0, s.ajax({
      url: "/resource/m/user/address/list",
      options: {
        loading: !1,
        needLogin: !0
      }
    }).then(function(a) {
      a && a.content && (a.content.addrList && a.content.countLimt <= a.content.addrList.length ? (n.toast("您最多可添加" + a.content.countLimt + "条地址"),
        t.addressListLoading = !1) : d.locationToShop(e, null, t.data.fromPage).then(function(a) {
        t.addressListLoading = !1, null !== a && (o.globalData.nearbyAddressInfo = e, n.navigate({
          url: "/pages/member/addressedit?from=addressSelect"
        }, {
          needLogin: !0
        }));
      }));
    }));
  },
  citySelectClickHandler: function(a) {
    a.targetUrl = "/pages/address/city?from=addressSelect", wx.navigateTo({
      url: a.targetUrl
    });
  },
  addAddressBtnHandler: function(a) {


    n.navigate({
      url: "/pages/member/addressedit?from=addressSelect"
    });
    // var t = this;
    // e.default.getLoginStatus().then(function(a) {
    //   if (a) {
    //     if (t.addressListLoading) return;
    //     t.addressListLoading = !0, s.ajax({
    //       url: "/resource/m/user/address/list",
    //       options: {
    //         loading: !1,
    //         needLogin: !0
    //       }
    //     }).then(function(a) {
    //       a && a.content && (a.content.addrList && a.content.countLimt <= a.content.addrList.length ? (n.toast("您最多可添加" + a.content.countLimt + "条地址"),
    //         t.addressListLoading = !1) : (t.addressListLoading = !1, n.navigate({
    //         url: "/pages/member/addressedit?from=addressSelect"
    //       }, {
    //         needLogin: !0
    //       })));
    //     });
    //   } else t.data.delivery ? e.default.loginRouter(!0, "redirectTo", "/pages/address/select?delivery=" + t.data.delivery) : t.options.from ? e.default.loginRouter(!0, "redirectTo", "/pages/address/select?from=" + t.options.from) : e.default.loginRouter(!0, "redirectTo", "/pages/address/select");
    // });



  },
  relocationClickHandler: function(a) {
    var t = this;
    wx.showLoading({
      title: "正在重新定位..."
    }), wx.getLocation({
      success: function(a) {
        wx.showToast({
          title: "定位成功"
        }), Object.assign(o.globalData.location, a), o.globalData.locationFlag = !0, t.setData({
          nearbyAddressPageNo: 1
        }), t.loadNearbyAddress();
      },
      fail: function(a) {
        o.globalData.location.success = !1, wx.showToast({
          title: "定位失败"
        });
      },
      complete: function() {
        return wx.hideLoading();
      }
    });
  },
  // loadCityShop: function() {
  //   var a = this,
  //     t = o.globalData.location || {};
  //   s.ajax({
  //     url: "/resource/m/shop/shopList",
  //     data: {
  //       longitude: t.longitude,
  //       latitude: t.latitude,
  //       channel: "GCJ-02",
  //       cityId: this.data.cityInfo ? this.data.cityInfo.cityId : "",
  //       offSet: (this.data.shopPageNo - 1) * this.data.shopPageSize,
  //       pageSize: this.data.shopPageSize,
  //       searchValue: ""
  //     }
  //   }).then(function(t) {
  //     if (t && t.content) {
  //       if (!(null !== t.content.commonShopList && 0 !== t.content.commonShopList.length || null !== t.content.otherShopList && 0 !== t.content.otherShopList.length || null !== a.data.shopList && 0 !== a.data.shopList)) return void a.setData({
  //         shopHasMore: !1,
  //         noShopDesc: "抱歉，暂无自提门店，敬请期待！"
  //       });
  //       var e = t.content.commonShopList || [],
  //         o = t.content.otherShopList || [],
  //         s = a.data.shopList || [];
  //       1 === a.data.shopPageNo && (s = s.concat(e)), s = s.concat(o), s = d.shopDistanceConvert(s),
  //         a.setData({
  //           shopList: s
  //         });
  //     }
  //   });
  // },

  loadCityShop: function () {

    var a = this,
      t = o.globalData.location || {};


    util.request(api.ShopList).then(function (res) {

        if(res.code == 200){

          if (res.data && res.data.length != 0){
            a.setData({
              shopList: res.data
            });
          

          }else{
            a.setData({
              shopHasMore: !1,
              noShopDesc: "抱歉，暂无自提门店，敬请期待！"
            });
          }


        }

    



    });


    // s.ajax({
    //   url: "/resource/m/shop/shopList",
    //   data: {
    //     longitude: t.longitude,
    //     latitude: t.latitude,
    //     channel: "GCJ-02",
    //     cityId: this.data.cityInfo ? this.data.cityInfo.cityId : "",
    //     offSet: (this.data.shopPageNo - 1) * this.data.shopPageSize,
    //     pageSize: this.data.shopPageSize,
    //     searchValue: ""
    //   }
    // }).then(function (t) {
    //   if (t && t.content) {
    //     if (!(null !== t.content.commonShopList && 0 !== t.content.commonShopList.length || null !== t.content.otherShopList && 0 !== t.content.otherShopList.length || null !== a.data.shopList && 0 !== a.data.shopList)) return void a.setData({
    //       shopHasMore: !1,
    //       noShopDesc: "抱歉，暂无自提门店，敬请期待！"
    //     });
    //     var e = t.content.commonShopList || [],
    //       o = t.content.otherShopList || [],
    //       s = a.data.shopList || [];
    //     1 === a.data.shopPageNo && (s = s.concat(e)), s = s.concat(o), s = d.shopDistanceConvert(s),
    //       a.setData({
    //         shopList: s
    //       });
    //   }
    // });
  },


  loadMyAddress: function() {
    var a = this;
    // s.ajax({
    //   url: "/resource/m/user/address/list",
    //   options: {
    //     needLogin: !1
    //   }
    // }).then(function(t) {
    //   if (t && t.content) {
    //     var e = t.content.addrList;
    //     a.setData({
    //       myAddressList: e && e.length > 0 ? e : null
    //     });
    //   }
    // });
  },
  loadNearbyAddress: function() {
    var a = this;
    "confirmOrder" !== this.data.fromPage && o.globalData.location.success && s.ajax({
      url: "/resource/m/user/address/search2",
      data: {
        lon: o.globalData.location.longitude,
        lat: o.globalData.location.latitude,
        offSet: (this.data.nearbyAddressPageNo - 1) * this.data.nearbyAddressPageSize,
        pageSize: this.data.nearbyAddressPageSize
      }
    }).then(function(t) {
      if (t && t.content) {
        var e = t.content.addrList;
        a.setData({
          nearbyAddressList: a.data.nearbyAddressList.concat(e)
        });
      }
    });
  },
  onLoad: function(a) {
    a && a.delivery && this.setData({
      delivery: a.delivery
    }), a && a.from && this.setData({
      fromPage: a.from
    });
  },
  onReady: function() {},
  onShow: function() {
    s.scanHandler({
        title: "配送方式",
        route: this.route
      }), 
      this.clearGlobalData(), 
      this.loadGlobalData(), 
      this.loadCityShop(), 
      this.loadMyAddress(),
      this.loadNearbyAddress(), 
      this.addressListLoading = !1;
    this.getAddressList();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return o.globalData.share;
  },
  getAddressList() {
    let that = this;
    var oppenid = wx.getStorageSync('oppenid');
    var storeId = wx.getStorageSync('storeid');
    util.request(api.AddressList, {
      oppenId: oppenid,
      storeId: storeId
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        that.setData({
          myAddressList: res.data
        });
      }
    });
  },


  myAddressSelectHandler: function (a) {
    var e = this,
      n = a.currentTarget.dataset.address;
    o.globalData.selectAddress = a.currentTarget.dataset.address;
    o.globalData.delivery = 'sent';

    o.globalData.addressInfo = a.currentTarget.dataset.address;

    // wx.removeStorageSync('storeid');
    // wx.removeStorageSync('shopinfo');
    wx.navigateBack();


    // d.locationToShop(n, i, this.data.fromPage).then(function (a) {

    //   a && ("confirmOrder" !== e.data.fromPage || null === i || a.content.nearShop.deptId === i ? (o.globalData.delivery = "sent",
    //     o.globalData.dispatchMsg = a.content.dispatchMsg, o.globalData.shopInfo = d.shopDistanceConvert(a.content.nearShop),
    //     o.globalData.addressInfo = n, wx.navigateBack()) : s.ajax({
    //       url: "/resource/m/order/changedept",
    //       data: {
    //         deptId: a.content.nearShop.deptId,
    //         delivery: e.data.delivery,
    //         productList: t.default.getUserProdList()
    //       }
    //     }).then(function (t) {
    //       t.content ? (o.globalData.delivery = "sent", o.globalData.dispatchMsg = a.content.dispatchMsg,
    //         o.globalData.shopInfo = d.shopDistanceConvert(a.content.nearShop), o.globalData.addressInfo = n,
    //         wx.navigateBack()) : wx.showModal({
    //           content: "服务门店变更，请重新确认商品",
    //           showCancel: !0,
    //           cancelText: "取消",
    //           cancelColor: o.globalData.modal.cancelColor,
    //           confirmText: "去确认",
    //           confirmColor: o.globalData.modal.confirmColor,
    //           success: function (t) {
    //             t.confirm && (o.globalData.delivery = "sent", o.globalData.dispatchMsg = a.content.dispatchMsg,
    //               o.globalData.shopInfo = d.shopDistanceConvert(a.content.nearShop), o.globalData.storeDeptId = a.content.nearShop.deptId,
    //               o.globalData.addressInfo = n, wx.navigateBack({
    //                 delta: 2
    //               }));
    //           }
    //         });
    //     }));
    // });
  },


});