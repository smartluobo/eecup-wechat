function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("../../service/cart.js")),
  a = t(require("../../service/order.js")),
  i = t(require("../../service/million.js")),
  r = t(require("./../../service/login.js")),
  n = require("../../utils/api.js"),
  o = require("../../utils/util.js"),
  d = require("../../utils/monitor/monitor.js"),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  store = require("../../utils/store.js"),
  c = getApp();

Page({
  data: {
    cart: {},
    loading: "hidden",
    isCanConfirm: 1,
    confirmBtnText: "去结算",
    wxCart: 0,
    millionObj: "",
    ABtest: 0,
    cartGoods: [],
    discountPrice: 0
  },
  toMillion: function() {
    c.globalData.webViewUrl = "", wx.navigateTo({
      url: "/pages/index/millionbigshot?type=million"
    });
  },
  removeStart: function(t) {
    1 == t.touches.length && this.setData({
      removeTouch: {
        startX: t.touches[0].clientX,
        index: t.currentTarget.dataset.index
      },
      removeVibrate: 0
    });
  },
  recordMove: function(t) {
    var e = this.data.cartGoods,
      a = this.data.removeTouch ? this.data.removeTouch.index : 0;
    if (void 0 === a) return !1;
    var i = t.touches[0].clientX,
      r = this.data.removeTouch.startX - i,
      n = "margin-left:0";
    r > 0 && (.8 * this.data.res.screenWidth <= r ? this.data.removeVibrate || (wx.vibrateShort(),
      this.setData({
        removeVibrate: 1
      })) : this.data.removeVibrate && this.setData({
      removeVibrate: 0
    }), n = "margin-left:" + (0 - r) + "px"), e.forEach(function(t, e) {
      t.itemStyle = a === e ? n : "margin-left:0";
    }), this.setData({
      cartGoods: e
    });
  },
  removeEnd: function(t) {
    var e = this.data.removeTouch.index,
      a = this.data.cartGoods;
    if (void 0 === e) return !1;
    if (1 == t.changedTouches.length) {
      var i = t.changedTouches[0].clientX,
        r = this.data.removeTouch.startX - i,
        n = "";
      if (r < 40) n = "margin-left:0", a[e].itemStyle = n;
      else {
        if (!(.8 * this.data.res.screenWidth > r && r >= 40)) return this.removeItem(t), !1;
        n = "margin-left:-175rpx", a[e].itemStyle = n;
      }
      this.setData({
        cartGoods: a
      });
    }
  },
  // removeItem: function(t) {
  //   var a = t.currentTarget.dataset.item;
  //   a.amount = 0 - a.amount, 
  //   a.additionList = a.additionDefaultList, 
  //   e.default.add(a),

  //   this.getCartInfo(0);
  // },
  removeItem: function(t) {
    var a = t.currentTarget.dataset.item;
    this.removeItemById(a.cartItemId);



  },
  removeItemById: function(t) {

    let that = this;
    var oppenid = wx.getStorageSync('oppenid');
    util.request(api.CartDelete, {
      oppenId: oppenid,
      cartItemId: t
    }, 'POST').then(function(res) {
      if (res.code === 0) {
        // console.log(res.data);
        // let cartList = res.data.cartList.map(v => {
        //   console.log(v);
        //   v.checked = false;
        //   return v;
        // });

        // that.setData({
        //   cartGoods: cartList,
        //   cartTotal: res.data.cartTotal
        // });
      }
    });
    //重新加载
    that.getCartList();

  

  },

  removeItemHandler: function(t) {
    this.removeItem(t);

    this.getTabBarCount();


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
            text: res.data + '',
          })
        }



      }
    });
  },

  // amountChange: function(t) {
  //   if (this.loading) return !1;
  //   this.loading = !0;
  //   var a = this,
  //     i = (t.target.dataset.index, t.target.dataset.item),
  //     r = {
  //       productId: i.productId,
  //       temperAttributeCode: i.temperAttributeCode,
  //       standardCode: i.standardCode,
  //       additionList: i.additionDefaultList,
  //       eatway: i.eatway,
  //       checked: i.checked,
  //       maxAmount: i.maxAmount
  //     };
  //   if ("add" === t.target.dataset.action) {
  //     if (!i.canCheck) return this.loading = !1, !1;
  //     r.amount = 1;
  //   } else {
  //     if (!(i.amount > 1)) return this.loading = !1, wx.showModal({
  //       title: "",
  //       content: "确定不要了吗？",
  //       cancelColor: "#999999",
  //       confirmColor: "#f2cba4",
  //       success: function(e) {
  //         e.confirm && a.removeItem(t);
  //       }
  //     }), !1;
  //     r.amount = -1;
  //   }
  //   e.default.add(r), this.getCartInfo(0);
  // },





  amountChange: function(t) {
    var that = this;
    var a = this,
      i = (t.target.dataset.index, t.target.dataset.item);
    var goodList = that.data.cartGoods;
    if ("add" === t.target.dataset.action) {
      if (!i.canCheck) return this.loading = !1, !1;
      i.cartItemCount = ++i.cartItemCount;

     
      // 更新到集合中

      var oppenid = wx.getStorageSync('oppenid');
      util.request(api.UpdateCartItemCount, {
        oppenId: oppenid,
        id: i.cartItemId,
        count: '1'
      }, 'POST').then(function (res) {
        if (res.code == 200) {
          


          that.getTabBarCount();
        }
      });



    } else {
      if (!(i.cartItemCount > 1)) return this.loading = !1, wx.showModal({
        title: "",
        content: "确定不要了吗？",
        cancelColor: "#999999",
        confirmColor: "#f2cba4",
        success: function(e) {
          e.confirm && a.removeItem(t);
        }
      }), !1;
      i.cartItemCount = --i.cartItemCount;
      var oppenid = wx.getStorageSync('oppenid');
      util.request(api.UpdateCartItemCount, {
        oppenId: oppenid,
        id: i.cartItemId,
        count: '-1'
      }, 'POST').then(function (res) {
        if (res.code == 200) {
          that.getTabBarCount();
        }
      });
    };
    
    i.cartTotalPrice = i.cartItemCount * i.price;
    goodList[t.target.dataset.index] = i;


    var price = that.calTotalAmount(goodList);
    that.setData({
      cartGoods: goodList,
      discountPrice: price
    });

  },



  
  checkItemHandler: function(t) {
    
    var a = t.target.dataset.item,
      i = t.target.dataset.index;
      if(a.num<=0){
        return;
      }
    var r = this.data.cartGoods;
    a.checked = !a.checked;
    r[i] = a;
    
    var checkPrice = this.calTotalAmount(r);
    this.setData({
      cartGoods: r,
      discountPrice: checkPrice,
      isCanConfirm: checkPrice === 0 ? 0 : 1
    });



  },




  // confirmOrder: function(t) {
  //   if (t && t.detail && n.collectFormId(t.detail.formId), this.data.isCanConfirm) {
  //     t.targetUrl = "/pages/order/confirm";
  //     var i = this.getCartStorage(),
  //       r = [],
  //       d = !0,
  //       c = !1,
  //       s = void 0;
  //     try {
  //       for (var u, l = i[Symbol.iterator](); !(d = (u = l.next()).done); d = !0) {
  //         var h = u.value;
  //         h.checked && r.push(h);
  //       }
  //     } catch (t) {
  //       c = !0, s = t;
  //     } finally {
  //       try {
  //         !d && l.return && l.return();
  //       } finally {
  //         if (c) throw s;
  //       }
  //     }
  //     this.browseClickSettlement(r), e.default.setConfirmOrder(r), a.default.setConfirmOrderParam(null),
  //       a.default.setConfirmOrderCoupon(null), this.updateExperiments("accountBtnClickTimes"),
  //       o.navigate({
  //         url: t.targetUrl
  //       }, {
  //         needLogin: !0,
  //         needForward: !0
  //       });
  //   }
  // },


  confirmOrder: function(t) {
    if (t && t.detail, this.data.isCanConfirm) {

      this.updateExperiments("accountBtnClickTimes");
     
      //设置选择的信息
      let checkedValue = this.data.cartGoods.filter(function (v) {
        if (v.checked != 0&&!!v.canCheck) {
          return true;
        } else {
          return false;
        }
      }).map(function (v) {
        return v;
      });
     
      
      if(checkedValue.length>0){
        //数据存在本地
      var order = {
        priceList: checkedValue,
        discountPrice: this.data.discountPrice
      };
        store.setStore('order',order);
        wx.navigateTo({
          url: '/pages/order/confirm'
        })
      }else{
        wx.showToast({
          title: '请先选择商品',
          icon: 'none'
      });
      }
      
     

   
    }




  
},



getCartStorage: function() {
  return e.default.getCart();
},
accSub: function(t, e) {
  var a, i, r, n;
  try {
    a = t.toString().split(".")[1].length;
  } catch (t) {
    a = 0;
  }
  try {
    i = e.toString().split(".")[1].length;
  } catch (t) {
    i = 0;
  }
  return r = Math.pow(10, Math.max(a, i)), n = a >= i ? a : i, ((t * r - e * r) / r).toFixed(n);
},
// getCartInfo: function(t) {
//   var a = this,
//     i = this.getCartStorage();
//   if (i && i.length > 0 && this.data.shopInfo && this.data.shopInfo.deptId) {
//     var r = this.data.delivery;
//     n.ajax({
//       url: "/resource/m/product/cartRefresh",
//       data: {
//         deptId: this.data.shopInfo.deptId,
//         productList: i,
//         isFirst: void 0 === t ? 1 : t,
//         delivery: this.data.delivery
//       }
//     }).then(function(n) {
//       if (n && n.content) {
//         a.setData({
//           cart: n.content
//         }, function() {
//           a.loading = !1, wx.hideNavigationBarLoading(), 2 != a.data.wxCart && a.setData({
//             wxCart: 1
//           }, function() {
//             var t = a;
//             setTimeout(function() {
//               t.setData({
//                 wxCart: 2
//               });
//             }, 2e3);
//           });
//         });
//         var o = {};
//         i.forEach(function(t) {
//           t.ABTEST_recommend && (o[t.productId] = !0);
//         });
//         var c = [],
//           s = !0,
//           u = !1,
//           l = void 0;
//         try {
//           for (var h, f = n.content.productList[Symbol.iterator](); !(s = (h = f.next()).done); s = !0) {
//             var m = h.value,
//               g = {
//                 productId: m.productId,
//                 temperAttributeCode: m.temperAttributeCode,
//                 standardCode: m.standardCode,
//                 amount: m.amount,
//                 additionList: m.additionDefaultList,
//                 eatway: m.eatway,
//                 checked: m.checked
//               };
//             o[m.productId] && (g.ABTEST_recommend = !0), c.push(g);
//           }
//         } catch (t) {
//           u = !0, l = t;
//         } finally {
//           try {
//             !s && f.return && f.return();
//           } finally {
//             if (u) throw l;
//           }
//         }
//         var v = c.filter(function(t) {
//             return t.checked;
//           }),
//           p = a.accSub(n.content.dispatchStartPrice, n.content.discountPrice);
//         a.setData({
//           isCanConfirm: v && v.length > 0 && (p <= 0 || "pick" === r),
//           confirmBtnText: p > 0 && "sent" === r ? "还差¥" + p + "起送" : "去结算"
//         }), e.default.setCart(c);
//       }
//       if (t) {
//         var C = 0;
//         for (var y in n.content.productList) 1 == y.canCheck && (C += y.amount);
//         d.event("tab_ck_shoppingcart", {
//           amount: C,
//           price: n.content.discountPrice,
//           shoppingCartDetails: n.content
//         });
//       }
//     }).catch(function() {
//       a.loading = !1;
//     });
//   } else this.setData({
//     cart: null
//   }, function() {
//     e.default.setTabBarCount(0), wx.hideLoading(), wx.hideNavigationBarLoading();
//   });
// },
initConfirmOrder: function() {
  e.default.empryConfirmOrder(),
    e.default.emptyOrderRemark(),
    e.default.emptyCartBrowseInfo();
},

init: function() {

  var t = this,
    e = getApp(),
    a = wx.getSystemInfoSync();
  this.setData({
      res: a,
  });
  this.getCartList();
},
updateExperiments: function(t) {
  c.adhoc.increment(t, 1);
},
onLoad: function(t) {
  // d.onLoad(this);

},
onReady: function() {},
onShow: function() {
  n.scanHandler({
    title: "购物车",
    route: this.route
  });
  this.init();
},
onHide: function() {},
onUnload: function() {},
onPullDownRefresh: function() {
  wx.stopPullDownRefresh(), wx.showNavigationBarLoading();
},
onReachBottom: function() {},
browseClickSettlement: function(t) {
  if (void 0 != t && 0 != t.length) {
    r.default.getLoginStatus().then(function(t) {});
    var a = [];
    for (var i in this.data.cart.productList)
      for (var n in t)
        if (this.data.cart.productList[i].productId == t[n].productId) {
          a.push(this.data.cart.productList[i]);
          break;
        }
    e.default.setCartBrowseInfo(a);
    for (var o = d.generateBrowseUuid(), c = 0; c < a.length; c++) {
      var s = a[c],
        u = new d.BusinessProperties();
      if (u.element_content = "去结算", u.item_id = s.productId + "", u.item_name = s.name,
        u.item_price = s.discountPrice + "", u.standard_id = s.standardCode + "", u.temperature_id = s.temperAttributeCode + "",
        u.item_number = s.amount + "", u.uuid = o, void 0 != s.additionList && s.additionList.length > 0) {
        var l = "";
        for (var h in s.additionList) 0 != l.length && (l += ","), l += s.additionList[h].code;
        u.default_info = l;
      }
      d.event("shoppingcart_ck_billing", u);
    }
  }
},
onTabItemTap: function(t) {},



//后续新增
getCartList: function() {
  let that = this;

  var oppenid = wx.getStorageSync('oppenid');
  var storeid = wx.getStorageSync('storeid');

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



  util.request(api.CartList, {
    oppenId: oppenid,
    storeId: storeid
  }, 'POST').then(function(res) {
    if (res.code === 200) {
      that.setData({
        cartGoods: res.data
      });
      wx.setStorageSync('cartGoodsLenth', res.data.length);
      for (var index in res.data) {
        if(res.data[index].num>0){
          var sexParam = "cartGoods[" + index + "].canCheck"
          that.setData({
            [sexParam]: "0",
          })
        }
      };

      for (var index in res.data) {
        var sexParam = "cartGoods[" + index + "].checked"
        that.setData({
          [sexParam]: "true",
        })
      };

      //计算金额
      var countPrice = 0;
      that.data.cartGoods.forEach(item => {
        if(item.num>0){
          countPrice += item.cartPrice * item.cartItemCount;
        }
      });

      that.setData({
        discountPrice: countPrice.toFixed(2),
      })


    }else{
      that.setData({
        cartGoods: []
      });
    }

  });

  that.getTabBarCount();

},


// 计算总金额
calTotalAmount: function(r) {



  //设置选择的信息
  let checkedValue = r.filter(function(v) {
    if (v.checked != 0) {
      return true;
    } else {
      return false;
    }
  }).map(function(v) {
    return v;
  });

  //计算金额
  var countPrice = 0;
  checkedValue.forEach(item => {
    if(item.num>0){
      countPrice += item.cartPrice * item.cartItemCount;
    }
  });
  return countPrice.toFixed(2);
},





});