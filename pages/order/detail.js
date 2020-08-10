function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function t(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

var a = e(require("../../service/order.js")),
  o = (e(require("../../service/cart.js")),
    require("../../utils/util.js")),
  r = require("../../utils/qrcode.js"),
  n = require("../../utils/api.js"),
  i = require("../../utils/monitor/monitor.js"),
  s = require("./../../utils/promise/es6-promise.min.js"),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  store = require("../../utils/store.js"),
  d = getApp(),
  c = null,
  l = null;

Page({
  data: {
    isIpx: d.globalData.isIpx,
    orderId: "",
    dataLoaded: !0,
    orderDetail: null,
    remainSecond: "",
    statusArr: ["", "", ""],
    isOrderDone: !1,
    showSlowPayTips: !1,
    showDispatchTime: !1,
    showArrivalTime: !1,
    showDeliveryContact: !1,
    showEvaluate: !1,
    showPopup: !1,
    hasClosePopup: !1,
    adsenseFlag: !1,
    pageErr: !1,
    remark: "",
    inviteImgUrl: "",
    showShareTip: !1,
    shareConfig: {
      redirectUrl: "",
      title: "",
      imgUrl: "",
      desc: ""
    },
    sharePosition: 2,
    isDefaultShareType: !0,
    fissionImgUrl: "",
    isFirstGetOrderDetail: !0,
    bannerUrl: "",
    bannerAdsenseType: null,
    isPreset: !1,
    ABtest: 0,
    isAwakenCoupon: !1,
    awakenCouponList: [],
    shopinfo: [],
    couponBackground: "https://www.eecup.cn/tea/image/eecup/icon/index/icon2.0_orderDefault.png"
  },
  closeOpen: function() {
    this.setData({
      isAwakenCoupon: !1,
      closeCouponFlag: !0
    });
  },
  callService: function() {
    // n.ajax({
    //   url: "/resource/m/order/hotline",
    //   data: {
    //     orderId: this.data.orderId
    //   }
    // }).then(function(e) {
    //   e.content.serviceTel ? wx.makePhoneCall({
    //     phoneNumber: e.content.serviceTel
    //   }) : wx.navigateTo({
    //     url: "/pages/order/customerservice"
    //   });
    // });
  },
  getShareConfig: function() {
    var e = this;
    return new s(function(a, o) {
      n.ajax({
        url: "/resource/m/fissionRedPacket/getShareUrl",
        options: {
          loading: !1
        },
        data: {
          orderNo: e.data.orderNo,
          channel: 1,
          position: e.data.sharePosition
        }
      }).then(function(r) {
        if (r.content.image && r.content.title && r.content.desc) {
          var n;
          e.setData((n = {}, t(n, "shareConfig.redirectUrl", r.content.shareUrl), t(n, "shareConfig.imgUrl", r.content.image),
            t(n, "shareConfig.title", r.content.title), t(n, "shareConfig.desc", r.content.desc),
            n)), a(r);
        } else o(r);
      });
    });
  },
  // getOrderDetail: function() {
  //   var e = this,
  //     t = this;
  //   n.ajax({
  //     url: "/resource/m/order/detail",
  //     options: {
  //       loading: !1
  //     },
  //     data: {
  //       orderId: this.data.orderId
  //     }
  //   }).then(function(a) {
  //     wx.hideLoading(), t.setData({
  //       dataLoaded: !0,
  //       pageErr: !1,
  //       orderNo: a.content.orderNo,
  //       orderDetail: a.content,
  //       remark: a.content.remark ? a.content.remark : null
  //     }, function() {
  //       t.getPromoAdsense();
  //     }), e.data.isFirstGetOrderDetail && t.setData({
  //       isFirstGetOrderDetail: !1,
  //       fissionImgUrl: a.content.fissionImgUrl ? a.content.fissionImgUrl : null
  //     }), t.computeDisplay();
  //     var o = t.data.orderDetail.orderStatusCode;
  //     90 !== o && 91 !== o && 92 !== o && 93 !== o && 94 !== o && 95 !== o && 100 !== o || (t.setData({
  //       isOrderDone: !0
  //     }), clearInterval(c));
  //   }, function(t) {
  //     clearInterval(c), c = null, e.setData({
  //       pageErr: !0
  //     });
  //   });
  // },
  setDetailType: function() {
    this.getShareConfig(), this.setData({
      isDefaultShareType: !1,
      sharePosition: 2,
      showShareTip: !0
    });
  },
  getPromoAdsense: function() {
    var e = this;
    n.ajax({
      url: "/resource/m/order/orderBanner",
      options: {
        loading: !1
      },
      data: {
        orderId: this.data.orderId
      }
    }).then(function(t) {
      wx.getSystemInfo({
        success: function(a) {
          a.model.indexOf("iPhone") > -1 ? e.setData({
            inviteImgUrl: e.data.bannerAdsenseType !== t.content.adsenseType ? t.content.iosImgUrl : e.data.inviteImgUrl
          }) : e.setData({
            inviteImgUrl: e.data.bannerAdsenseType !== t.content.adsenseType ? t.content.androidImgUrl : e.data.inviteImgUrl
          }), 1 === t.content.adsenseType && (d.globalData.inviterObj = t.content), e.setData({
            bannerUrl: t.content.url,
            bannerAdsenseType: t.content.adsenseType
          });
        }
      });
    });
  },
  toInviter: function() {
    1 === this.data.bannerAdsenseType ? wx.navigateTo({
      url: "/pages/index/introduce?locationType=8&pageFrom=order_detail"
    }) : 2 === this.data.bannerAdsenseType && this.getShareConfig().then(function(e) {
      var t = o.getUrlParam(e.content.shareUrl);
      wx.navigateTo({
        url: "/pages/index/inviter?shareType=2&orderNo=" + t.orderNo + "&inviteCode=" + t.inviteCode + "&activityNo=" + t.activityNo
      });
    });
  },
  computeDisplay: function() {
    this.getOrderStatus(), this.showSlowPayTips(), this.showDispatchTime(), this.showArrivalTime(),
      this.showDeliveryContact(), this.showEvaluate(), this.showQrcode(), this.showPopupWindow();
  },
  showPopupWindow: function() {
    var e = this;
    this.data.adsenseFlag || 1 != this.data.orderDetail.isShowSuccessWindow || this.data.hasClosePopup || n.ajax({
      url: "/resource/m/promo/adsense",
      data: {
        locationType: 2
      },
      options: {
        needLogin: !1,
        loading: !1
      }
    }).then(function(t) {
      "BASE000" === t.busiCode && 1 === t.code && (e.setData({
        adsenseFlag: !0
      }), 3 == t.content.adsenseType && t.content.orderCoupon.couponList.length > 0 && t.content.orderCoupon.couponList.length < 3 ? (e.setData({
        awakenCouponList: t.content.orderCoupon.couponList,
        couponBackground: t.content.orderCoupon.backImgUrl ? t.content.orderCoupon.backImgUrl : e.data.couponBackground,
        isAwakenCoupon: !0
      }), i.event("orderdetail_couponpopupwindow_start", null, 2)) : wx.getSystemInfo({
        success: function(a) {
          var o = "";
          o = a.model.indexOf("iPhone") > -1 ? t.content.iosImgUrl : t.content.androidImgUrl,
            e.setData({
              advertImage: o,
              showPopup: !!o,
              adsenseType: t.content.adsenseType,
              inviteUrl: t.content.url
            });
        }
      }));
    });
  },
  showSlowPayTips: function() {
    var e = this.data.orderDetail.isShowClaim,
      t = this.data.orderDetail.orderStatusCode,
      a = this.data.orderDetail.orderType,
      o = void 0;
    e ? (o = 1 === a && 20 === t || 30 === t || 40 === t || 50 === t || 51 === t, this.setData({
      showSlowPayTips: o
    })) : this.setData({
      showSlowPayTips: !1
    });
  },
  getOrderStatus: function() {
    var e = this.data.orderDetail.orderStatusDesc,
      a = [];
    a[0] = e.split("{")[0];
    if (this.setData(t({}, "statusArr[0]", e.split("{")[0])), void 0 !== this.data.orderDetail.remainSecond && "" !== this.data.orderDetail.remainSecond) this.setData({
      remainSecond: this.data.orderDetail.remainSecond
    }), this.updateTime(this), this._setCountDown(this);
    else {
      this.setData({
        remainSecond: ""
      });
      var o = e.match(/\{(.+)\}/);
      a[1] = o ? o[1] : "", a[1] && a[1].indexOf("{") > -1 && (a[1] = a[1].match(/\{(.+)\}/)[1]);
      this.setData(t({}, "statusArr[1]", a[1]));
    }
    var r = e.lastIndexOf("}");
    a[2] = r > -1 ? e.substr(r + 1) : "";
    this.setData(t({}, "statusArr[2]", a[2]));
  },
  updateTime: function(e) {
    var a;
    if ("number" == typeof e.data.remainSecond) {
      var r = e.data.remainSecond;
      if ("number" == typeof r && r <= 0) return e._ajaxTimeCancel(e), e.setData(t({}, "statusArr[1]", "")),
        void clearInterval(l);
      var n = o.formatSeconds(r);
      r--;
      e.setData((a = {}, t(a, "statusArr[1]", n || ""), t(a, "remainSecond", r), a));
    }
  },
  _setCountDown: function(e) {
    l || (l = setInterval(function() {
      e.updateTime(e);
    }, 1e3));
  },
  _ajaxTimeCancel: function(e) {
    n.ajax({
      url: "/resource/m/order/timercancel",
      options: {
        loading: !1,
        needOriginResult: !0
      },
      data: {
        orderId: e.data.orderId
      }
    }).then(function(e) {
      e.status && "SUCCESS" == e.status.toUpperCase() && o.toast("订单已取消");
    });
  },
  getAdditionInfo: function(e) {
    var t = [];
    if (!1 == !e.standardCode && t.push(e.standardCode), e.additionList)
      for (var a = 0; a < e.additionList.length; a++) t.push(e.additionList[a].showStr);
    return !1 == !e.temperAttributeName && t.push(e.temperAttributeName), t.join("/");
  },
  showDispatchTime: function() {
    var e = this.data.orderDetail.orderStatusCode,
      t = 2 == this.data.orderDetail.orderType && (80 == e || 90 == e || 91 == e || 92 == e || 93 == e || 94 == e || 95 == e);
    this.setData({
      showDispatchTime: t
    });
  },
  showArrivalTime: function() {
    var e = this.data.orderDetail.orderStatusCode;
    if (!this.data.orderDetail.dispatchInfo.arriveTime) return !1;
    var t = 70 === e || 80 === e || 90 === e || 91 === e || 92 === e || 93 === e || 94 == e || 95 === e;
    this.setData({
      showArrivalTime: t
    });
  },
  showDeliveryContact: function() {
    this.data.orderDetail.orderStatusCode;
    var e = this.data.orderDetail.dispatchInfo.dispatcherName,
      t = this.data.orderDetail.dispatchInfo.dispatcherMobile,
      a = 1 == this.data.orderDetail.orderType && !!e && !!t;
    this.setData({
      showDeliveryContact: a
    });
  },
  showEvaluate: function() {
    this.data.orderDetail.refundStatus;
    var e = this.data.orderDetail.orderStatusCode,
      t = 90 == e || 91 == e || 92 == e || 93 == e || 94 == e || 95 == e;
    this.setData({
      showEvaluate: t
    });
  },
  showQrcode: function() {
    var e = r.createQrCodeImg(this.data.orderDetail.takeMealCodeInfo.takeOrderId, {
      size: 180
    });
    this.setData({
      imageData: e
    });
  },
  setCanvasSize: function(e) {
    var t = {};
    try {
      var a = e / (375 / wx.getSystemInfoSync().windowWidth),
        o = a;
      t.w = a, t.h = o;
    } catch (e) {}
    return t;
  },
  showTips: function(e) {
    wx.showModal({
      title: "慢必赔规则说明",
      content: "向您承诺，制作完成后30分钟内，外送必达。如超时送达，您可以申请索赔本单！",
      showCancel: !1,
      confirmColor: "#f2cba4",
      confirmText: "我知道了",
      success: function(e) {}
    });
  },
  cancelOrder: function(e) {
    var t = this;
    wx.showModal({
      title: "",
      content: "是否确定取消订单？",
      cancelColor: "#999",
      cancelText: "再想想",
      confirmColor: "#f2cba4",
      confirmText: "确认",
      success: function(e) {
        e.confirm ? t.cancel(): e.cancel;
      }
    });
  },
  cancel(){
    let self=this;
    var orderId = this.data.orderDetail.orderId;
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');
    util.request(api.OrderCancel, {
      oppenId: oppenid,
      orderId: orderId
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        self.getOrderDetail();
      }else{
        wx.showLoading({
          title: res.msg,
          mask: !0
        });
      }
    })
  },
  evaluate: function(e) {
    var t = this.data.orderDetail.orderType,
      a = this.data.orderDetail.eatWay,
      o = void 0;
    1 == t && 2 == a && (o = 1), 2 == t && 2 == a && (o = 2), 2 == t && 1 == a && (o = 3),
      wx.navigateTo({
        url: "/pages/order/comment?orderId=" + this.data.orderId + "&type=" + o
      });
  },
  myEvaluate: function(e) {
    e.targetUrl = "/pages/order/mycomment", a.default.setOrderEvaluateList(this.data.orderDetail.evaluateList),
      wx.navigateTo({
        url: e.targetUrl
      });
  },
  goDetailRemark: function(e) {
    e.targetUrl = "/pages/order/detailremark?remark=" + encodeURI(this.data.remark),
      wx.navigateTo({
        url: e.targetUrl
      });
  },
  checkout: function(e) {
    e && e.detail && n.collectFormId(e.detail.formId);
    var t = this.toghterUpdateExperiments.bind(this);
    a.default.payOrder(this.data.orderId, void 0, 0, void 0, t);
  },
  takeMealCode: function(e) {
    var t = this.data.orderId;
    e.targetUrl = "/pages/order/qrcode?orderId=" + t, wx.navigateTo({
      url: e.targetUrl
    });
  },
  dialTel: function(e) {
    var t = e.target.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: t,
      success: function() {},
      fail: function() {},
      complete: function() {}
    });
  },
  customerServ: function(e) {
    var t = e.target.dataset.tel;
    wx.showLoading({
      title: "加载中...",
      mask: !0
    }), n.ajax({
      url: "/resource/m/sys/sysDict",
      options: {
        loading: !1,
        needOriginResult: !0
      }
    }).then(function(e) {
      wx.hideLoading();
      var a = e.content.hotLineServer.isHotLine,
        o = e.content.hotLineServer.isMINIService;
      2 == a && 2 == o ? wx.navigateTo({
        url: "/pages/order/customerservice"
      }) : wx.makePhoneCall({
        phoneNumber: t,
        success: function() {},
        fail: function() {},
        complete: function() {}
      });
    });
  },
  closeSharePopup: function() {
    this.setData({
      showShareTip: !1
    });
  },
  popupAction: function(e) {
    this.closePopup(e), this.setData({
      isDefaultShareType: !1
    }), 1 == this.data.adsenseType ? wx.navigateTo({
      url: "/pages/index/introduce?locationType=2&pageFrom=order_dialog"
    }) : 2 == this.data.adsenseType && (this.getShareConfig(), this.setData({
      sharePosition: 1,
      showShareTip: !0
    }));
  },
  closePopup: function(e) {
    this.setData({
      showPopup: !1,
      hasClosePopup: !0
    });
  },
  reload: function(e) {
    this.onShow();
  },
  toghterUpdateExperiments: function() {
    d.adhoc.increment("payCompleteTimes", 1), this.data.hasABTEST_recommend && d.adhoc.increment("recommendPayCompleteTimes", 1),
      d.testin.track("payCompleteTimes", 1);
  },
  onLoad: function(e) {
    e.from && e.abRecommend && this.setData({
      from: e.from,
      hasABTEST_recommend: Boolean(e.abRecommend)
    }), this.setData({
      orderId: e.orderId
    });
  },
  onReady: function() {},
  onShow: function() {
    var e = this;
    n.scanHandler({
      title: "订单详情",
      route: this.route
    }), 
    // wx.showLoading({
    //   title: "加载中...",
    //   mask: !0
    // }), 
    this.setData({
      isPreset: d.globalData.isPreset,
      adsenseFlag: !1
    });
    this.getOrderDetail();
  
    // this.getPromoAdsense(),
    //  !c && !this.data.isOrderDone && (c = setInterval(function() {
    //   e.getOrderDetail();
    // }, 3e3));
  },
  onHide: function() {
    this.setData({
      showShareTip: !1
    }), clearInterval(c), c = null;
  },
  onUnload: function() {
    clearInterval(c), c = null, clearInterval(l), l = null;
  },
  onPullDownRefresh: function() {
    this.getOrderDetail();
  },
  onReachBottom: function() {},
  onShareAppMessage: function(e) {
    var t = o.getUrlParam(this.data.shareConfig.redirectUrl);
    if (this.data.isDefaultShareType) return d.globalData.share;
    var a = this.data.shareConfig;
    return a.title && a.imgUrl && a.desc ? {
      title: a.title,
      imageUrl: a.imgUrl,
      path: "/pages/index/inviter?shareType=2&orderNo=" + t.orderNo + "&inviteCode=" + t.inviteCode + "&activityNo=" + t.activityNo,
      desc: a.desc
    } : d.globalData.share;
  },

  getOrderDetail: function () {



    let that = this;
    //找到订单
    util.request(api.FindOrderDetailById, {
      orderId: that.data.orderId,
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        that.setData({
          orderDetail: res.data
        });
        that.getShopInfo(res.data);
      }

    });



    // var e = this,
    //   t = this;
    // n.ajax({
    //   url: "/resource/m/order/detail",
    //   options: {
    //     loading: !1
    //   },
    //   data: {
    //     orderId: this.data.orderId
    //   }
    // }).then(function (a) {
    //   wx.hideLoading(), t.setData({
    //     dataLoaded: !0,
    //     pageErr: !1,
    //     orderNo: a.content.orderNo,
    //     orderDetail: a.content,
    //     remark: a.content.remark ? a.content.remark : null
    //   }, function () {
    //     t.getPromoAdsense();
    //   }), e.data.isFirstGetOrderDetail && t.setData({
    //     isFirstGetOrderDetail: !1,
    //     fissionImgUrl: a.content.fissionImgUrl ? a.content.fissionImgUrl : null
    //   }), t.computeDisplay();
    //   var o = t.data.orderDetail.orderStatusCode;
    //   90 !== o && 91 !== o && 92 !== o && 93 !== o && 94 !== o && 95 !== o && 100 !== o || (t.setData({
    //     isOrderDone: !0
    //   }), clearInterval(c));
    // }, function (t) {
    //   clearInterval(c), c = null, e.setData({
    //     pageErr: !0
    //   });
    // });
  },

  getShopInfo: function (e) {

    var a = this;
    var storeid = e.storeId;

    if (storeid){

      //现在本地查询是否有店铺id。没有就默认第一个。
      util.request(api.ShopList).then(function (res) {

        if (res.code == 200) {

          //设置选择的信息
          let checkedValue = res.data.filter(function (v) {
            if (v.id && v.id == storeid) {
              return true;
            } else {
              return false;
            }
          }).map(function (v) {
            return v;
          });

          a.setData({
            shopinfo: checkedValue[0]
          });

        }
      });



    }

  },

  gotoPayment: function () {
    var orderId = this.data.orderDetail.orderId;
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');
    util.request(api.CreateOrderByCart, {
      oppenId: oppenid,
      storeId: storeid,
      orderId: orderId,
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp + "",
          'nonceStr': res.data.nonce_str,
          'package': "prepay_id=" + res.data.prepay_id,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          'success': function (res) {
            if (res.errMsg == "requestPayment:ok") {
              wx.showToast({
                title: '支付成功'
              });
              wx.switchTab({
                url: "/pages/order/list"
              });
            }
          },
          'fail': function (res) {
            console.log(res.errMsg);
          },
          complete: function (res) {
          }
        });
      }

    });
  },

});