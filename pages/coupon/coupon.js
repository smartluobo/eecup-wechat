function t(t, e, o) {
  return e in t ? Object.defineProperty(t, e, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = o, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }(require("../../service/order.js")),
  o = require("../../utils/api.js"),
  a = getApp(),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  n = require("../../utils/monitor/monitor.js");

Page({
  data: {
    radioDisplay: !1,
    couponAvailable: !1,
    couponNum: "",
    emptyData: null,
    comeFrom: "",
    isIpx: a.globalData.isIpx,
    offset: 0,
    pageSize: 10,
    couponList: [],
    ABtest: 0,
    inviterImg: "",
    bannerFlag: !1
  },
  getBootomBanner: function() {
    var t = this;
    wx.getSystemInfo({
      success: function(e) {
        // o.ajax({
        //     url: "/resource/m/promo/adsense",
        //     data: {
        //         locationType: 12
        //     },
        //     options: {
        //         loading: !1
        //     }
        // }).then(function(o) {
        //     if (o && o.content) {
        //         var a = e.system.toLowerCase().includes("ios") ? o.content.iosImgUrl : o.content.androidImgUrl;
        //         t.setData({
        //             inviterImg: a,
        //             bannerFlag: !0
        //         });
        //     }
        // });
      }
    });
  },
  getCoupon: function(t) {
    // var e = this;
    // o.ajax({
    //   url: "/resource/m/promotion/ticket/list",
    //   options: {
    //     loading: !1
    //   },
    //   data: {
    //     offset: e.data.offset,
    //     pageSize: e.data.pageSize
    //   }
    // }).then(function(o) {
    //   o && o.content.length > 0 ? e.arrangeData(o.content) : (e.data.offset || e.handlerEmptyList(t),
    //     wx.hideLoading());
    // });
  },
  getOrderCoupon: function(t) {
    // var a = this,
    //   n = e.default.getConfirmOrderParam(),
    //   i = e.default.getConfirmOrderCoupon();
    // o.ajax({
    //   url: "/resource/m/order/ticket/list",
    //   data: n
    // }).then(function(e) {
    //   var o = e.content.useList;
    //   if (e && o.length > 0) {
    //     for (var n = 0; n < o.length; n++)
    //       if (o[n].code === i[0]) {
    //         o[n].radio = !0;
    //         break;
    //       }
    //     a.arrangeData(o), a.setData({
    //       couponNum: o.length
    //     });
    //   } else a.handlerEmptyList(t), wx.hideLoading();
    // });
  },
  handlerEmptyList: function(t) {
    this.setData({
      couponAvailable: !1,
      emptyData: {
        class: "order",
        tips: "暂无可用优惠券"
      }
    });
  },
  arrangeData: function(t) {
    var e = t;
    0 === this.data.offset && this.setData({
      couponList: []
    });
    for (var o = 0; o < e.length; o++) {
      if ("discount" === e[o].type) {
        var a = e[o].value;
        a.split(".").length > 1 ? (e[o].num1 = "." + a.split(".")[1], e[o].value = a.split(".")[0]) : e[o].num1 = ".0";
      }
      e[o].display = !0;
    }
    e = this.data.couponList.concat(e), this.setData({
      couponList: e,
      offset: this.data.offset + 10
    }, function() {
      wx.hideLoading();
    });
  },
  saveData: function(t) {
    var o = this,
      a = o.data.couponList,
      n = [],
      i = 0,
      r = "",
      s = e.default.getConfirmOrderParam();
    s.isFirst = 0, e.default.setConfirmOrderParam(s);
    for (var c = 0; c < a.length; c++) a[c].radio && (r = a[c], n.push(r.code));
    r ? ("face" === r.type && (i = Number(r.value)), 1 === r.activityMutex ? wx.showModal({
      content: "该优惠券与营销活动不能同时使用，您是否确认用券？",
      showCancel: !0,
      cancelText: "不用券了",
      cancelColor: "#f2cba4",
      confirmText: "确认用券",
      confirmColor: "#f2cba4",
      success: function(t) {
        if (t.confirm) o.deductibleMoney(n, i, a);
        else {
          for (var e = 0; e < a.length; e++)
            if (a[e].code === n[0]) {
              a[e].radio = !1;
              break;
            }
          o.setData({
            couponList: a
          });
        }
      }
    }) : o.deductibleMoney(n, i, a)) : (e.default.setConfirmOrderCoupon([]), o.navigateBackFun());
  },
  deductibleMoney: function(t, a, n) {
    var i = this;
    o.ajax({
      url: "/resource/m/order/ticket/calculate",
      data: {
        couponCode: t[0]
      }
    }).then(function(o) {
      o.content < a ? wx.showModal({
        content: "使用该优惠券只能抵扣" + o.content + "元，不设找零，是否确认使用？",
        showCancel: !0,
        cancelText: "不用券了",
        cancelColor: "#f2cba4",
        confirmText: "确认用券",
        confirmColor: "#f2cba4",
        success: function(o) {
          if (o.confirm) e.default.setConfirmOrderCoupon(t), i.navigateBackFun();
          else {
            for (var a = 0; a < n.length; a++)
              if (n[a].code === t[0]) {
                n[a].radio = !1;
                break;
              }
            i.setData({
              couponList: n
            });
          }
        }
      }) : (e.default.setConfirmOrderCoupon(t), i.navigateBackFun());
    });
  },
  navigateBackFun: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  // radioIsChecked: function(e) {
  //   var o = this.data.couponList,
  //     a = e.currentTarget.dataset.radio,
  //     n = e.currentTarget.dataset.index,
  //     i = "couponList[" + n + "].radio";
  //   if ("ignore" !== e.target.dataset.ignore) {
  //     for (var r = 0; r < o.length; r++) r !== n && (o[r].radio = !1);
  //     this.setData(t({
  //       couponList: o
  //     }, i, !a));
  //   }
  // },
  radioIsChecked: function (e) {
    var o = this.data.couponList,
      n = e.currentTarget.dataset.index,
      comeFrom = this.data.comeFrom,
      couponid = o[n].id;
  
    console.log(couponid);
    if (comeFrom && comeFrom =='confirm'){

      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        userCouponsId: couponid,
        isCouponBack:true
      });
      wx.navigateBack({
        delta: 1,
        // success:function(){
        //   prevPage.getUserCoupons();
        // }
      })
      
    }
  },
  toggle: function(e) {
    var o = e.currentTarget.dataset.index,
      a = e.currentTarget.dataset.close,
      n = "couponList[" + o + "].display";
    this.setData(t({}, n, !a));
  },
  renderExperiments: function() {
    var t = this;
    a.adhoc.getExperimentFlags(function(e) {
      1 === e.get("CouponUseNowBtnClick") && t.setData({
        ABtest: 1
      });
    }), a.testin.getVars(function(e) {
      e.get("isPurchaseBtnShow") && t.setData({
        ABtest: 1
      });
    });
  },
  useNowHandle: function(t) {
    var e = t.currentTarget.dataset.index;
    this.data.couponList[e];
    a.adhoc.increment("useNowBtnClickTimes", 1), a.testin.track("useNowBtnClickTimes", 1),
      wx.switchTab({
        url: "/pages/index/menu"
      });
  },
  onLoad: function(t) {
    this.setData({
      comeFrom: t.from || ""
    });
  },
  onReady: function() {},
  onShow: function() {
    // this.setData({
    //     offset: 0
    // }), "confirm" === this.data.comeFrom ? (this.setData({
    //     radioDisplay: !0,
    //     couponAvailable: !0
    // }), 
    // this.getOrderCoupon(!0)) : (this.getCoupon(!0), 
    // this.getBootomBanner()), 
    // this.renderExperiments();
    this.getUserCoupons();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    // var t = this;
    // this.setData({
    //   couponList: [],
    //   offset: 0
    // }, function() {
    //   "list" === t.data.comeFrom ? t.getCoupon(!0) : t.getOrderCoupon(!0);
    // }),
     wx.stopPullDownRefresh();
     
  },
  onReachBottom: function() {
    "list" === this.data.comeFrom && (wx.showLoading({
      title: "加载中..."
    }), 
    
     
    // this.getCoupon(!0)
     this.getUserCoupons()
    
    );
  },
  onShareAppMessage: function() {
    return a.globalData.share;
  },
  getUserCoupons: function() {
    let that = this;
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');
    util.request(api.GetUserCoupons, {
      oppenId: oppenid,
      storeId: storeid
    }, 'POST').then(function(res) {
      if (res.code == 200 && res.data) {
        that.setData({
          couponList: res.data,
          couponNum: res.data.length,
          couponAvailable: res.data.length
        });
     
      }else{
        that.handlerEmptyList();
      }
    });
  },
});