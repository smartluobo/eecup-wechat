var t = function(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }(require("../../service/order.js")),
  e = require("../../utils/api.js"),
  a = (require("../../utils/store.js"),
    require("../../utils/monitor/monitor.js")),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  store = require("../../utils/store.js"),
  r = getApp();

Page({
  data: {
    offset: 0,
    pageSize: 10,
    listData: [],
    emptyData: null,
    refresh: !0,
    shareImg: "",
    scrollTop: 0,
    timer: !1,
    wxCart: !1,
    ABtest: 0
  },
  navigateToInviter: function() {
    wx.navigateTo({
      url: "/pages/index/introduce?locationType=9&pageFrom=order_list"
    });
  },
  getUrl: function() {
    var t = this;
    e.ajax({
      url: "/resource/m/promo/adsense",
      data: {
        locationType: 9
      }
    }).then(function(e) {
      e && e.content && t.setData({
        shareImg: e.content.iosImgUrl
      });
    });
  },
  navigateToOrderDetail: function(t) {
    t.targetUrl = "../order/detail?orderId=" + t.currentTarget.dataset.id, wx.navigateTo({
      url: t.targetUrl
    });
  },
  handlerList: function(t) {
    var e = this;
    this.setData({
      offset: this.data.offset + this.data.pageSize,
      listData: this.data.listData.concat(t.map(function(t, e) {
        var a, r, o, i, n;
        return 10 === t.orderStatusCode ? (a = "red", r = "Payment", i = "red", o = "去支付",
          n = "pay_" + e) : t.orderStatusCode > 10 && t.orderStatusCode < 70 ? a = "blue" : 80 === t.orderStatusCode && (o = "去评价",
          r = "Evaluate", n = "evaluate_" + e), {
          orderId: t.orderId,
          orderTypeCode: t.orderType,
          orderNumber: t.orderNo,
          orderTypeName: 2 === t.orderType ? "自提订单" : "外卖订单",
          orderStatusCode: t.orderStatusCode,
          orderStatusName: t.orderStatusName,
          orderStatusClass: a || "orderStatus",
          orderButtonClass: i || "gray",
          orderButtonType: r || "QrCode",
          orderButtonName: o || "取餐码",
          orderBtnId: n || "eatCode_" + e,
          shopName: t.shopName,
          shopId: "(NO." + t.sequenceNumber + ")",
          orderTime: t.orderTime,
          goodsName: t.productList[0].name + "等",
          goodsCount: t.productAmount,
          orderAmount: t.orderAmount,
          takeMealCodeInfo: t.takeMealCodeInfo,
          takeCodeDesc: t.takeCodeDesc,
          orderType: t.orderType,
          eatWay: t.eatWay,
          takeAddress: t.takeAddress
        };
      }))
    }, function() {
      wx.hideLoading(), e.setData({
        wxCart: !0
      }, function() {
        var t = e;
        setTimeout(function() {
          t.setData({
            wxCart: !1
          });
        }, 2e3);
      });
    });
  },
  handlerEmptyList: function(t) {
    t && this.setData({
      emptyData: {
        class: "order",
        tips: "您还没有订单哦",
        btnText: "去喝一杯"
      }
    });
  },
  emptyEventBind: function() {
    wx.switchTab({
      url: "../index/menu"
    });
  },
  // getListData: function(t, a) {
  //   wx.showLoading({
  //     title: "加载中..."
  //   });
  //   var r = this;
  //   e.ajax({
  //     url: "/resource/m/order/list",
  //     options: {
  //       switchUrl: "/pages/index/home",
  //       loading: !1
  //     },
  //     data: {
  //       orderStatus: 0,
  //       offset: r.data.offset,
  //       pageSize: r.data.pageSize
  //     }
  //   }).then(function(e) {
  //     r.setData({
  //       emptyData: null,
  //       refresh: !0
  //     }), "BASE000" === e.busiCode && 1 === e.code ? (e.content && e.content.length ? (r.data.offset || r.setData({
  //         listData: []
  //       }), r.handlerList(e.content)) : (r.data.offset || r.handlerEmptyList(t), wx.hideLoading()),
  //       a && (wx.hideLoading(), wx.stopPullDownRefresh())) : (wx.hideLoading(), r.setData({
  //       offset: 0,
  //       listData: []
  //     }));
  //   });
  // },
  // gotoPayment: function(e, a) {
  //   var r = this.toghterUpdateExperiments.bind(this);
  //   t.default.payOrder(a.orderId, void 0, 0, void 0, r);
  // },
  gotoQrCode: function(t, e) {
    t.targetUrl = "../order/qrcode?orderId=" + e.orderId, wx.navigateTo({
      url: t.targetUrl
    });
  },
  gotoEvaluate: function(t, e) {
    var a = e.orderType,
      r = e.eatWay,
      o = void 0;
    1 == a && 2 == r && (o = 1), 2 == a && 2 == r && (o = 2), 2 == a && 1 == r && (o = 3),
      t.targetUrl = "/pages/order/comment?orderId=" + e.orderId + "&type=" + o, wx.navigateTo({
        url: t.targetUrl
      });
  },

  handlerItemEvent: function(t) {
    return !!this.data.listData[t.currentTarget.dataset.id] && this["goto" + t.currentTarget.dataset.type](t, this.data.listData[t.currentTarget.dataset.id]);
  },


  toghterUpdateExperiments: function() {
    r.adhoc.increment("payCompleteTimes", 1), this.data.hasABTEST_recommend && r.adhoc.increment("recommendPayCompleteTimes", 1),
      this.onPullDownRefresh(), r.testin.track("payCompleteTimes", 1);
  },
  onLoad: function() {
    // a.onLoad(this);
  },
  onReady: function() {
    this.animation = wx.createAnimation();
  },
  onShow: function() {
    e.scanHandler({
        title: "订单列表",
        route: this.route
      }), this.setData({
        offset: 0,
        refresh: !1
      }),
      this.getListData(!0);
    // this.getUrl();
  },
  onPageScroll: function(t) {
    var e = this;
    t != this.data.scrollTop && t.scrollTop > 0 && (t.scrollTop > this.data.scrollTop && 1 != this.data.timer ? (this.data.timer = !0,
      this.animation.translateX(120).opacity(.3).step({
        duration: 550,
        timingFunction: "ease"
      }), this.setData({
        animation: this.animation.export()
      }), setTimeout(function() {
        e.data.timer = !1;
      }, 500)) : 1 != this.data.timer && (this.data.timer = !0, this.animation.translateX(0).opacity(1).step({
      duration: 550,
      timingFunction: "ease"
    }), this.setData({
      animation: this.animation.export()
    }), setTimeout(function() {
      e.data.timer = !1;
    }, 500)), this.data.scrollTop = t.scrollTop);
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    this.data.refresh && (this.setData({
      offset: 0,
      refresh: !1
    }), this.getListData(!0, "refresh"));
  },
  onReachBottom: function() {
    this.data.refresh && (this.setData({
      refresh: !1
    }), this.getListData());
  },
  onTabItemTap: function(t) {},


  getListData: function(t, a) {
    let that = this;
    //找到订单
    var oppenid = wx.getStorageSync('oppenid');


    if (oppenid == "") {

      // 需要登录后才可以操作
      wx.showModal({
        title: '',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/index/wxlogin?from=menu"
            });

          }
        }
      });
      return;
    }



    util.request(api.FindOrderByOppenId, {
      oppenId: oppenid,
    }, 'POST').then(function(res) {
      if (res.code === 200) {
        that.setData({

          listData: res.data



        })


      }

    });

  },
  gotoPayment: function (t) {
    var order = this.data.listData[t.currentTarget.dataset.id];
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');
    util.request(api.CreateOrderByCart, {
      oppenId: oppenid,
      storeId: storeid,
      orderId: order.orderId,
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