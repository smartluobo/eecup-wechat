function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("../../service/cart.js")),
  a = t(require("../../service/order.js")),
  o = t(require("../../service/location.js")),
  i = require("../../utils/api.js"),
  n = require("../../utils/util.js"),
  r = require("../../service/openid.js"),
  s = require("../../utils/monitor/monitor.js"),
  c = require("../../fmsdk/fm-1.5.1.js"),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  store = require("../../utils/store.js"),
  d = getApp();

Page({
  data: {
    payAgree: !0,
    useDiscount: !0,
    showFlag: !0,
    order: {},
    isIpx: getApp().globalData.isIpx,
    isPreset: !1,
    presetDialog: !1,
    isPickAlertShow: 1,
    times: [],
    time: "",
    timeIndex: [0],
    isNow: !1,
    isScroll: 0,
    userCoupons:[],
    couponDiscount: 0,
    userCoupon: {},
    orderTotalAmount: 0,
    userCouponsId: '',
    isShow: 'pro',
    buyerMessage:'',
    isCouponBack:false,//判断是否是选择优惠卷回来
  },
  bindChange: function(t) {
    var e = t.detail.value;
    this.setData({
      timeIndex: e,
      isScroll: 2
    });
  },
  changePreset: function() {
    1 === this.data.order.reservation && this.data.order.appointmentTimeList.length < 1 && wx.showToast({
      title: "暂不支持预约",
      icon: "none"
    }), this.data.times.length > 1 && 1 == this.data.order.reservation && this.setData({
      presetDialog: !0,
      isScroll: 1
    });
  },
  startAnimation: function() {
    this.setData({
      isScroll: 3
    });
  },
  cancelPreset: function() {
    this.setData({
      presetDialog: !1,
      isScroll: 0
    });
  },
  doPreset: function() {
    3 !== this.data.isScroll && (this.setData({
      presetDialog: !1,
      isScroll: 0
    }), 0 === this.data.timeIndex[0] ? (this.setData({
      time: "",
      isPreset: !1
    }), d.globalData.time = "", d.globalData.isPreset = !1) : (this.setData({
      time: this.data.times[this.data.timeIndex[0]],
      isPreset: !0
    }), d.globalData.time = this.data.times[this.data.timeIndex[0]], d.globalData.isPreset = !0));
  },
  switchSentHandler: function(t) {
  //  this.setData.isCouponBack=false;
   this.setData({
    isCouponBack:false
   })
    t.targetUrl = "/pages/address/select?delivery=sent&from=confirmOrder", wx.navigateTo({
      url: t.targetUrl
    });
  },
  switchPickHandler: function(t) {
    // this.setData.isCouponBack=false;
    this.setData({
      isCouponBack:false
     })
    t.targetUrl = "/pages/address/select?delivery=pick&from=confirmOrder", wx.navigateTo({
      url: t.targetUrl
    });
  },
  deliveryNavigatorHandler: function(t) {
    // this.setData.isCouponBack=false;
    this.setData({
      isCouponBack:false
     })
    if(this.data.isShow != 'pro'){
        return;
    }


    t.targetUrl = "/pages/address/select?delivery=" + this.data.delivery + "&from=confirmOrder",
      wx.navigateTo({
        url: t.targetUrl
      });
  },
  // discountSwitchChange: function(t) {
  //   var e = this;
  //   this.setData({
  //     useDiscount: t.detail.value
  //   }, function() {
  //     var o = a.default.getConfirmOrderParam();
  //     o.isFirst = 1, o.useDefaultCafeKu = 1, a.default.setConfirmOrderParam(o), e.showAgain = t.detail.value ? 1 : 0,
  //       e.getConfirmOrder();
  //   });
  // },

  discountSwitchChange: function(t) {
    var e = this;
    this.setData({
        useDiscount: t.detail.value
      },
      function() {


        // var o = a.default.getConfirmOrderParam();

        // o.isFirst = 1,
        // o.useDefaultCafeKu = 1,
        // a.default.setConfirmOrderParam(o),
        //  e.showAgain = t.detail.value ? 1 : 0,
        // e.getConfirmOrder();



      });
  },


  chooseCoffeeBank: function(t) {
    this.data.order.hasCafeKu && (this.data.showFlag = !0, wx.navigateTo({
      url: "/pages/order/usecoffeewallet"
    }));
  },
  buyCafeKu: function(t) {
    wx.navigateTo({
      url: "/pages/coupon/walletbuy?from=order"
    });
  },
  // chooseCoupon: function(t) {
  //   if (this.data.order.hasCoupon) {
  //     var e = this.data.order.priceList.filter(function(t) {
  //         return "dispatchFee" === t.type;
  //       }),
  //       a = e.length > 0 ? e[0].totalPrice : 0;
  //     (0 === this.data.order.discountPrice || this.data.order.discountPrice === a) && this.data.order.hasCafeKu && this.data.order.cafeKuDiscount === this.data.order.totalPrivilegeMoney ? wx.showModal({
  //       title: "",
  //       content: "商品金额已足够支付，如需修改请手动取消使用咖啡钱包",
  //       showCancel: !1,
  //       confirmText: "我知道了",
  //       confirmColor: "#f2cba4"
  //     }) : this.data.order.couponSelectType ? wx.showModal({
  //       title: "",
  //       content: "同一商品优惠券与咖啡钱包不能同时使用，如需修改请手动取消使用咖啡钱包",
  //       showCancel: !1,
  //       confirmText: "我知道了",
  //       confirmColor: "#f2cba4"
  //     }) : wx.navigateTo({
  //       url: "/pages/coupon/coupon?from=confirm"
  //     });
  //   }
  // },
  //跳转备注
  remarkNavigatorHandler: function(t) {
    // this.setData.isCouponBack=false;
    this.setData({
      isCouponBack:false
     })
    t.targetUrl = "/pages/order/remark", wx.navigateTo({
      url: t.targetUrl
    });
  },
  getConfirmOrder: function() {
    var t = this,
      o = this,
      r = e.default.getConfirmOrder(),
      s = a.default.getConfirmOrderParam(),
      c = a.default.getConfirmOrderCoupon(),
      l = s ? s.isFirst : 1,
      u = s ? s.useDefaultCafeKu : 1,
      f = s ? s.productList : [];
    if (0 === f.length) {
      var h = !0,
        m = !1,
        g = void 0;
      try {
        for (var p, v = r[Symbol.iterator](); !(h = (p = v.next()).done); h = !0)
          for (var w = p.value, x = 0; x < w.amount; x++) {
            var C = Object.assign({}, w);
            f.push(C);
          }
      } catch (t) {
        m = !0, g = t;
      } finally {
        try {
          !h && v.return && v.return();
        } finally {
          if (m) throw g;
        }
      }
      var b = 1,
        D = !0,
        k = !1,
        y = void 0;
      try {
        for (var T, I = f[Symbol.iterator](); !(D = (T = I.next()).done); D = !0) {
          var A = T.value;
          A.indexId = b, A.amount = 1, A.cafeKuId = "", b++;
        }
      } catch (t) {
        k = !0, y = t;
      } finally {
        try {
          !D && I.return && I.return();
        } finally {
          if (k) throw y;
        }
      }
    }
    var S = s ? s.useCoffeeStore : 1,
      B = r.filter(function(t) {
        return "eat" === t.eatway;
      }),
      O = B && B.length > 0 ? "eat" : "package";
    a.default.setUserProdList(f);
    var P = {
      deptId: this.data.shopInfo.deptId,
      addressId: "sent" === this.data.delivery ? this.data.addressInfo.addrId || "" : "",
      productList: f,
      delivery: this.data.delivery,
      eatway: "pick" === this.data.delivery ? O : null,
      useDiscount: this.data.useDiscount ? 1 : 0,
      useDefaultCafeKu: u,
      couponCodeList: c,
      isFirst: l,
      paymentAccountType: 1,
      useCoffeeStore: S,
      appointmentTime: this.data.time.indexOf("立即") > -1 ? "" : this.data.time
    };
    this.data.time.indexOf("立即") > -1 || (d.globalData.isPreset = !1), i.ajax({
      url: "/resource/m/order/preview",
      data: P,
      options: {
        needOriginResult: !0
      }
    }).then(function(e) {
      if (7 === e.code) {
        var i = {
          title: "",
          content: e.msg,
          showCancel: !0,
          cancelText: "取消",
          cancelColor: "#999999",
          confirmText: "确认",
          confirmColor: "#f2cba4"
        };
        switch (e.busiCode) {
          case "BASE100":
            i.showCancel = !1, i.confirmText = "我知道了", i.success = function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            };
            break;

          case "BASE200":
            i.cancelText = "选择自提", i.confirmText = "继续选购", i.success = function(t) {
              t.confirm ? wx.navigateBack({
                delta: 1
              }) : t.cancel && wx.navigateTo({
                url: "/pages/address/select?delivery=pick&from=confirmOrder"
              });
            };
            break;

          case "BASE300":
            i.showCancel = !1, i.confirmText = "OK", i.success = function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            };
            break;

          case "BASE400":
            i.showCancel = !1, i.confirmText = "选购其他", i.success = function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            };
            break;

          default:
            n.toast(e.msg || "业务处理错误");
        }
        wx.showModal(i);
      } else if (1 === e.code && e.content) {
        e.content.tipMsgInfo && e.content.tipMsgInfo.type && wx.showModal({
          title: "",
          content: e.content.tipMsgInfo.msg,
          showCancel: !1,
          confirmText: "我知道了",
          confirmColor: "#f2cba4"
        });
        var r = "pick" === t.data.delivery ? "立即取餐-约" + e.content.aboutTime + "可取" : "立即配送-约" + e.content.aboutTime + "送达",
          s = [r],
          c = 0,
          l = e.content.appointmentTime;
        e.content.appointmentTimeList.map(function(t, e) {
          t === l && (c = e);
        });
        var u = 0 != c ? [c] : [0];
        "both" === e.content.eatway && d.globalData.dataset && d.globalData.dataset.defaultMode && (O = 1 === d.globalData.dataset.defaultMode ? "eat" : "package"),
          o.setData({
            order: e.content,
            eatway: d.globalData.eatway || O,
            times: s.concat(e.content.appointmentTimeList),
            time: e.content.appointmentTime ? e.content.appointmentTime : r,
            isPreset: !!e.content.appointmentTime,
            curIndex: u
          }), a.default.setConfirmOrderParam(P), a.default.setConfirmOrderCoupon(e.content.couponCodeList);
        var f = a.default.getConfirmOrderDefaultDiscount() || {};
        P.isFirst && (f.couponCodeList = e.content.couponCodeList), P.useDefaultCafeKu && (f.productList = e.content.productDetailList),
          a.default.setConfirmOrderDefaultDiscount(f);
      } else n.toast(e.msg || "业务处理错误");
    });
  },
  showSlowTip: function(t) {
    wx.showModal({
      title: "慢必赔规则说明",
      content: "向您承诺，制作完成后30分钟内，外送必达。如超时送达，您可申请索赔本单！",
      showCancel: !1,
      confirmColor: "#f2cba4",
      confirmText: "我知道了"
    });
  },
  // getRemark: function() {
  //   console.info(this.data.remark)
  //   this.remark = this.data.remark;

  //   var t = this.remark ? this.remark.remarkStr || "" : "";
  //   this.setData({
  //     remark: t
  //   });
  // },
  chooseEatway: function(t) {
    var e = t.currentTarget.dataset.way;
    d.globalData.eatway = e, this.setData({
      eatway: e
    });
  },
  checkPayAgree: function(t) {
    // this.setData.isCouponBack=false;
    this.setData({
      payAgree: !this.data.payAgree,
      isCouponBack:false
    });
  },
  checkAddress: function() {
    var t = this,
      e = d.globalData.addressList,
      a = this.data.addressInfo;
    if ("sent" === this.data.delivery && a && e) {
      var i = null;
      e.every(function(e) {
        return a.addrId === e.addrId ? a.lat !== e.lat || a.lon !== e.lon ? (i = 1, t.setData({
          addressInfo: e
        }), d.globalData.addressInfo = e, o.default.locationToShop(e).then(function(e) {
          e && (d.globalData.delivery = "sent", d.globalData.dispatchMsg = e.content.dispatchMsg,
            d.globalData.shopInfo = o.default.shopDistanceConvert(e.content.nearShop), t.setData({
              shopInfo: d.globalData.shopInfo
            }));
        }), !1) : (i = 2, !1) : (i = 3, !0);
      });
    }
    return i;
  },


  init: function () {
    var order = store.getStore('order');
      this.setData({
        delivery: d.globalData.delivery,
        shopInfo: wx.getStorageSync('shopinfo'),
        addressInfo: d.globalData.addressInfo,
        location: d.globalData.location,
        mapChannel: d.globalData.mapChannel,
        eatway: "package",
        isPickAlertShow: 1,
        isPreset: t,
        time: e,
        order: order
      })
  },
  getFp: function(t) {
    var e = this;
    e.fmagent.getInfo({
      page: e,
      openid: t,
      success: function(t) {
        e.setData({
          blackBox: t
        });
      },
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  toghterUpdateExperiments: function() {
    d.adhoc.increment("payCompleteTimes", 1), this.data.hasABTEST_recommend && d.adhoc.increment("recommendPayCompleteTimes", 1),
      d.testin.track("payCompleteTimes", 1);
  },
  onLoad: function(t) {
    // s.onLoad(this);
  },
  onReady: function() {},
  onShow: function() {
    var t = this;
    if (i.scanHandler({
        title: "确认订单",
        route: this.route
      }), this.hasOrder) return !1;
    this.init(),
    this.checkAddress(),
    // this.fmagent = new c(d.globalData._fmOpt),
    r.checkOpenId().then(function(e) {
      e && t.getFp(d.globalData.openid);
    });

    //获取优惠券列表
    t.getUserCoupons();
  
    t.getShowAndHide();

  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  browseCheckout: function() {
    var t = e.default.getCartBrowseInfo();
    if (null != t && void 0 != t && 0 != t.length)
      for (var a = s.generateBrowseUuid(), o = 0; o < t.length; o++) {
        var i = t[o],
          n = new s.BusinessProperties();
        if (n.element_content = "去支付", n.item_id = i.productId + "", n.item_name = i.name,
          n.item_price = i.discountPrice + "", n.standard_id = i.standardCode + "", n.temperature_id = i.temperAttributeCode + "",
          n.item_number = i.amount + "", n.uuid = a, i.additionList = i.additionDefaultList,
          void 0 != i.additionList && i.additionList.length > 0) {
          var r = "";
          for (var c in i.additionList) 0 != r.length && (r += ","), r += i.additionList[c].code;
          n.default_info = r;
        }
        s.event("ordercenter_ck_pay", n);
      }
  },



  getTotalMoney: function (e) {
    let that = this;
    //找到订单ids
    let checkedValue = that.data.order.priceList.map(function (v) {
      return v.cartItemId;
    });
    var ids = checkedValue.join(',');
    var userCouponsId = e;
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');
    util.request(api.GetTotalMoney, {
      userCouponsId: userCouponsId,
      oppenId: oppenid,
      storeId: storeid,
      cartItemIds: ids,
      addressId: that.data.delivery == 'pick' ? 0 : that.data.addressInfo.id,
      selfGet: that.data.delivery == 'pick' ? 0 : 1

    }, 'POST').then(function (res) {
      if (res.code === 200) {
        that.setData({
          ['order.discountPrice']: res.data.orderPayAmount,
          ['order.orderTotalAmount']: res.data.orderTotalAmount,
          ['order.couponsName']: res.data.couponsName,
          ['order.phoneNum']: res.data.phoneNum,
          ['order.postFee']: res.data.postFee,
          couponDiscount: res.data.orderReduceAmount
        })
        if(res.data.couponsType!=3&&that.data.isCouponBack){
          wx.showToast({
            title: '小e结算系统为您选择了更优惠的策略 ,不使用客官您的优惠券哦~',
            icon:'none',
            duration:2500
            });
        }


      }

    });


  },



  getUserCoupons: function () {
    let that = this;
    //判断是否有优惠券id
    if (that.data.userCouponsId != ''){
      that.getTotalMoney(that.data.userCouponsId);
      return;
    }
    var oppenid = wx.getStorageSync('oppenid');
    util.request(api.GetUserCoupons, {
      oppenId: oppenid
    }, 'POST').then(function (res) {
      if (res.code == 200 && res.data) {

        that.setData({
          useDiscount: 1,
          userCoupons: res.data,
          
        });
        if(res.data.length>0){
          that.setData({
            userCouponsId: res.data[0].id,
            userCoupon: res.data[0],
          });
            //计算总金额
          that.getTotalMoney(res.data[0].id);
        }else{
          //计算总金额
          that.getTotalMoney(0);
        }
       
      }else{

        that.setData({
          // useDiscount: !1,
          ['order.orderTotalAmount']: that.data.order.discountPrice,
        });
        that.getTotalMoney("");
      }

    });
  },



  chooseCoupon: function (t) {
    if (this.data.userCoupon) {
      wx.navigateTo({
        url: "/pages/coupon/coupon?from=confirm"
      });
    }
  },
  //更改手机号码
  tellNavigator(){
    // this.setData.isCouponBack=false;
    this.setData({
      isCouponBack:false
     })
    wx.navigateTo({
      url: "/pages/address/binding"
    });
  },
  //确认订单
  checkout: function (t) {
    let that = this;
    console.info(this.data.shopInfo.storeName)
    
    if(!this.data.order.phoneNum&&this.data.delivery==='pick'){
      // this.setData.isCouponBack=false;
      this.setData({
        isCouponBack:false
       })
      wx.navigateTo({
        url: "/pages/address/binding"
      });
      return
    }
    if(this.data.delivery==='pick'){
      let storeName= this.data.shopInfo.storeName;
      wx.showModal({
        title: '是否前往【'+storeName+'】自提？',
        content: '订单确认后将无法更改！',
        success (res) {
          if (res.confirm) {
            that.getOrder()

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      that.getOrder()
    }

  },

  getOrder(){
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
 
    //找到订单ids
    let checkedValue = that.data.order.priceList.map(function (v) {
      return v.cartItemId;
    });
    var ids = checkedValue.join(',');
    let buyerMessage=this.data.remark;
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');
    console.info(that.data.userCouponsId)
    util.request(api.CreateOrderByCart, {
      oppenId: oppenid,
      storeId: storeid,
      cartItemIds: ids,
      buyerMessage:buyerMessage,
      userCouponsId: that.data.useDiscount == '1' ? that.data.userCouponsId : '',
      addressId: that.data.delivery == 'pick' ? 0 : that.data.addressInfo.id,
      selfGet: that.data.delivery == 'pick' ? 0 : 1
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        that.getTabBarCount();
        //res.data返回空时表示不用使用现金支付
        console.info(!!res.data)
        if(!!res.data){
          wx.requestPayment({
            'timeStamp': res.data.timeStamp +"",
            'nonceStr': res.data.nonce_str,
            'package': "prepay_id=" + res.data.prepay_id,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            'success': function (res) {
              if (res.errMsg == "requestPayment:ok") {
                wx.hideLoading();
                wx.showToast({
                  title: '支付成功'
                });
  
                wx.switchTab({
                  url: "/pages/order/list"
                });
              }
            },
            'fail': function(res) {
              if (res.errMsg == 'requestPayment:fail cancel') {
                  wx.hideLoading();
                  wx.showToast({
                      title: '取消支付',
                      icon: 'none',
                      complete: function() {
                          wx.switchTab({
                              url: "../order/list"
                          });
                      }
                  })
              } else {
                  wx.hideLoading();
                  wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                      complete: function() {
                          wx.switchTab({
                              url: "../order/list"
                          });
                      }
                  })
              }
          }
          });
        } 
      }else{
        wx.showToast({
          title: '支付成功',
          icon: 'none',
          complete: function() {
              wx.switchTab({
                  url: "../order/list"
              });
          }
      })
      }

    });
  },
  getTabBarCount: function () {
    var oppenid = wx.getStorageSync('oppenid');
    util.request(api.GetCartItemCount, {
      oppenId: oppenid
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        if (res.data == 0) {

          wx.removeTabBarBadge({
            index: 3,
          })
        } else {
          wx.setTabBarBadge({
            index: 3,
            text: res.data == 0 ? null : res.data + '',
          })
        }
      }
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
