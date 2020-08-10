function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("../../service/cart.js")),
  a = t(require("../../service/login.js")),
  o = require("./../../utils/api.js"),
  i = require("./../../utils/promise/es6-promise.min.js"),
  n = (require("./../../utils/store.js"),
    require("./../../utils/util.js")),
  d = require("../../service/location.js"),
  r = require("../../service/openid.js"),
  s = require("../../service/million.js"),
  l = getApp(),
  c = require("../../utils/monitor/monitor.js"),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  u = !1;

Page({
  data: {
    delivery: null,
    locationSuccess: null,
    cityNoShop: !1,
    cityNoShopText: "",
    areaNoShop: !1,
    areaNoShopText: null,
    hasTakeoutKitchen: !1,
    hasTakeoutKitchenText: null,
    hasNoProductText: null,
    dispatchMsg: "",
    shopInfo: null,
    addressInfo: null,
    adPos: [],
    products: null,
    menuActiveIndex: 0,
    productActiveIndex: 0,
    indicatorDots: !0,
    autoplay: !0,
    interval: 5e3,
    duration: 500,
    product: null,
    showDetailLayer: !1,
    detailLayerAnimateData: null,
    detailProductCount: 1,
    detailStandardCode: null,
    detailTemperCode: null,
    detailAdditionList: [],
    productScrollTop: [],
    contentHeight: "",
    currentScrollTop: 0,
    windowHeight: "",
    windowWidth: "",
    radio: "",
    calcHeight: "400rpx",
    addressSentHeight: 166,
    addressPickHeight: 128,
    bannerHeight: 140,
    bannerHeightDefault: 140,
    productItemHeight: "",
    toView: "index-0",
    millionObj: "",
    topBannerIndex: 0,
    ABtest: 0,
    locationDialog: 0,
    overRunDefault: !1,
    navList: [],
    categoryList: [],
    currentCategory: 0,
    checkedSpecText: '',
    isShow: 'pro'
  },
  selectShop: function(t) {
    var e = this;
    t && t.currentTarget && t.currentTarget.dataset && t.currentTarget.dataset.deptid ? (this.data.shopInfo && this.data.shopInfo.deptId != t.currentTarget.dataset.deptid && d.loadNearShop(t.currentTarget.dataset.deptid).then(function(t) {
      e.dealShop(t);
    }), this.setData({
      locationDialog: 2
    })) : d.loadNearShop().then(function(t) {
      e.dealShop(t), e.setData({
        locationDialog: 2
      });
    });
  },
  closeLocation: function() {
    this.setData({
      locationDialog: 2
    });
  },
  moreShop: function() {
    this.setData({
      locationDialog: 2
    });
    var t = "/pages/address/select?delivery=" + (this.data.delivery ? this.data.delivery : "pick") + "&from=menu";
    wx.navigateTo({
      url: t
    });
  },
  loactionLife: function() {
    var t = this;
    return new i(function(e, a) {
      d.getLocation().then(function(a) {
        t.getUsualLocation(a).then(function(a) {
          console.log("常用门店res", a), a && "deptId" === a.tyep && a.deptId && d.loadNearShop(a.deptId).then(function(e) {
            t.dealShop(e);
          }), a && "location" === a.tyep && d.loadNearShop().then(function(e) {
            t.dealShop(e);
          }), e(!0);
        });
      }).catch(function(a) {
        d.loadNearShop().then(function(a) {
          t.dealShop(a), e(!0);
        });
      });
    });
  },
  getUsualLocation: function(t) {
    var e = this;
    return new i(function(a, i) {
      if (2 === e.data.locationDialog) return l.globalData.shopInfo ? (e.loadGlobalData(),
        void a()) : void a({
        tyep: "location"
      });
     
      // o.ajax({
      //   url: "/resource/m/sys/base/prevhomeshop",
      //   data: {
      //     lonHere: t ? t.longitude + "" : l.globalData.location.longitude + "",
      //     latHere: t ? t.latitude + "" : l.globalData.location.latitude + "",
      //     channel: l.globalData.mapChannel
      //   }
      // }).then(function(t) {
      //   if (t && t.content) {
      //     if (t.content.deptId) return void a({
      //       tyep: "deptId",
      //       deptId: t.content.deptId
      //     });
      //     if (t.content.shopList.length > 0) {
      //       if (t.content.shopList.length > 1) {
      //         var o = t.content.shopList.map(function(t) {
      //           return t.distance > 1 ? t.distance = parseFloat(Number(t.distance).toFixed(1)) + "km" : t.distance = parseInt(1e3 * t.distance) + "m",
      //             t;
      //         });
      //         return void e.setData({
      //           locationDialog: 1,
      //           locationShop: o
      //         });
      //       }
      //       return void a({
      //         tyep: "deptId",
      //         deptId: t.content.shopList[0].deptId
      //       });
      //     }
      //     e.data.shopInfo ? e.loadGlobalData() : a({
      //       tyep: "location"
      //     });
      //   }
      // }).catch(function(t) {});



    });
  },
  dealShop: function(t) {
    if (t.content && (l.globalData.locationCityInfo = {
        cityId: t.content.cityId,
        cityName: t.content.cityName,
        cityIdHere: t.content.cityIdHere,
        cityNameHere: t.content.cityNameHere,
        provinceNameHere: t.content.provinceNameHere,
        provinceIdHere: t.content.provinceIdHere,
        countryIdHere: t.content.countryIdHere,
        countryNameHere: t.content.countryNameHere
      }), 7 == t.code) this.setData({
      cityNoShop: !0,
      cityNoShopText: t.msg
    });
    else if (t.content && t.content.nearShopAbnormalInfo && 1 === t.content.nearShopAbnormalInfo.abnormalType) this.setData({
      locationDialog: 2,
      areaNoShop: !0,
      areaNoShopText: t.content.nearShopAbnormalInfo.abnormalDesc
    });
    else if (t.content && t.content.nearShopAbnormalInfo && 2 === t.content.nearShopAbnormalInfo.abnormalType) this.setData({
      locationDialog: 2,
      hasTakeoutKitchen: !0,
      hasTakeoutKitchenText: t.content.nearShopAbnormalInfo.abnormalDesc
    });
    else {
      if (t.content && t.content.defaultAddressInfo) {
        l.globalData.delivery = "sent";
        var e = t.content.defaultAddressInfo;
        l.globalData.addressInfo = e, this.setData({
          delivery: "sent",
          addressInfo: e
        });
      }
      var a = d.shopDistanceConvert(t.content.nearShop);
      l.globalData.shopInfo = a, this.setData({
          shopInfo: a
        }), this.browseShopInfo(), l.globalData.location.cityId = t.content.cityId, l.globalData.location.cityName = t.content.cityName,
        l.globalData.dispatchMsg = t.content.dispatchMsg, this.setData({
          dispatchMsg: l.globalData.dispatchMsg
        });
    }
    this.loadGlobalData();
  },
  toMillion: function() {
    l.globalData.webViewUrl = "", wx.navigateTo({
      url: "/pages/index/millionbigshot?type=million"
    });
  },
  loadSystemInfo: function() {
    var t = this,
      e = wx.getSystemInfoSync();
    if ("android" === e.platform) wx.createSelectorQuery().select("#fixed-helper").boundingClientRect(function(e) {
      var a = e.width / 750;
      t.setData({
        windowHeight: e.height,
        windowWidth: e.width,
        radio: a,
        addressSentHeight: t.data.addressSentHeight * a,
        addressPickHeight: t.data.addressPickHeight * a,
        bannerHeight: t.data.bannerHeight * a,
        bannerHeightDefault: t.data.bannerHeightDefault * a
      });
    }).exec();
    else {
      var a = e.windowWidth / 750;
      this.setData({
        windowHeight: e.windowHeight,
        windowWidth: e.windowWidth,
        radio: a,
        addressSentHeight: this.data.addressSentHeight * a,
        addressPickHeight: this.data.addressPickHeight * a,
        bannerHeight: this.data.bannerHeight * a,
        bannerHeightDefault: this.data.bannerHeightDefault * a
      });
    }
  },
  goImgLink: function(t) {
    var e = "";
    if (t.currentTarget && t.currentTarget.dataset && t.currentTarget.dataset.clickurl && (e = t.currentTarget.dataset.clickurl),
      e) {
      if (e.includes("pages/"))
        if (e.includes("pages/index/menu") || e.includes("pages/index/home") || e.includes("pages/order/list") || e.includes("pages/index/cart") || e.includes("pages/member/center")) {
          if ((e + "").split("?").length > 1) {
            var o = n.getUrlParam(e);
            l.globalData.kindId = o.kindId, e = e.split("?")[0];
          }
          wx.switchTab({
            url: e
          });
        } else e.includes("pages/") && (e.includes("million") || e.includes("walletbuy") || e.includes("giftcardmain") ? a.default.getLoginStatus().then(function(t) {
          t ? wx.navigateTo({
            url: e
          }) : wx.navigateTo({
            url: "./wxlogin"
          });
        }) : wx.navigateTo({
          url: e
        }));
      else e.includes("million_big_shot") ? a.default.getLoginStatus().then(function(t) {
        t ? wx.navigateTo({
          url: "./millionbigshot?type=million"
        }) : a.default.loginRouter();
      }) : (l.globalData.webViewUrl = e + "&frommini=mini", wx.navigateTo({
        url: "./imgwebview"
      }));
      c.event("menu_ck_banner", {
        element_id: t.currentTarget.id,
        element_index: this.data.topBannerIndex
      });
    }
  },
  clearGlobalDataCache: function() {
    null != this.data.shopInfo && null != l.globalData.shopInfo && this.data.shopInfo.deptId == l.globalData.shopInfo.deptId || null == this.data.shopInfo && null == l.globalData.shopInfo ? this.setData({
      menuActiveIndex: 0,
      showDetailLayer: !1
    }) : this.setData({
      cityNoShop: !1,
      areaNoShop: !1,
      hasTakeoutKitchen: !1,
      menuActiveIndex: 0,
      productActiveIndex: 0,
      currentScrollTop: 0,
      showDetailLayer: !1
    }), u = !1;
  },
  loadGlobalData: function() {
    this.setData({
      delivery: l.globalData.delivery,
      shopInfo: l.globalData.shopInfo,
      addressInfo: l.globalData.addressInfo,
      locationSuccess: l.globalData.locationFlag,
      dispatchMsg: l.globalData.dispatchMsg
    }), this.browseShopInfo(), this.loadProductList();
  },
  alertDispathMsg: function(t) {
    wx.showModal({
      title: "慢必赔规则说明",
      content: "向您承诺，制作完成后30分钟内，外送必达。如超时送达，您可申请索赔本单！",
      showCancel: !1,
      confirmColor: "#f2cba4",
      confirmText: "我知道了"
    });
  },
  gotoCitySelect: function(t) {
    t.targetUrl = "/pages/address/city?from=index", wx.navigateTo({
      url: t.targetUrl
    });
  },
  gotoSelectAddress: function(t) {
    var e = t.target.dataset.delivery;
    t.targetUrl = "/pages/address/select?delivery=" + (e || "pick") + "&from=menu",
      wx.navigateTo({
        url: t.targetUrl
      });
  },
  standardSwitchHandler: function(t) {
    var e = t.target.dataset.skuShowInfosId,
      a = t.target.dataset.skuDetailsId;
    this.data.detailStandardCode !== e && 1 * a != 0 && (this.setData({
      detailStandardCode: e
    }), this.reCalculateProductPrice("standard"));
  },
  standardSwitchHandler1: function(t) {




    var e = t.target.dataset.skushowinfosindex,
      a = t.target.dataset.skudetailsindex;
    //找到对应的节点改数据
    var productN = this.data.product;
    if (productN.skuShowInfos[e].skuDetails[a].isSelected === 1) {
      return
    }

    productN.skuShowInfos[e].skuDetails.forEach(item => {
      item.isSelected = 0
    });
    productN.skuShowInfos[e].skuDetails[a].isSelected = 1;


    this.changeSpecInfo();
    this.setData({
      product: productN
    });





  },


  //获取选中的规格信息
  getCheckedSpecValue: function() {
    let checkedValues = [];
    let _specificationList = this.data.product.skuShowInfos;

    if (!_specificationList){
        return false;
    }


    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].id,
        valueId: 0,
        valueText: '',
        valueTextExt: '',
        valuePrice: 0,
      };
      for (let j = 0; j < _specificationList[i].skuDetails.length; j++) {
        if (_specificationList[i].skuDetails[j].isSelected === 1) {
          _checkedObj.valueId = _specificationList[i].skuDetails[j].id;
          _checkedObj.valueText = _specificationList[i].skuDetails[j].skuDetailName + '￥' + _specificationList[i].skuDetails[j].skuDetailPrice;
          _checkedObj.valueTextExt = _specificationList[i].skuDetails[j].skuDetailName;
          _checkedObj.valuePrice = _specificationList[i].skuDetails[j].skuDetailPrice;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;

  },



  changeSpecInfo: function() {
    let checkedNameValue = this.getCheckedSpecValue();
    var countPrice = 0;
    if (checkedNameValue){
     
          //设置选择的信息
          let checkedValue = checkedNameValue.filter(function(v) {
            if (v.valueId != 0 && (v.nameId === 3) || v.nameId === 4) {
              return true;
            } else {
              return false;
            }
          }).map(function(v) {
            return v.valueText;
          });
          if (checkedValue.length > 0) {

            var goodNameAndPrice = this.data.product.title + '￥' ;

            var pric = this.data.product.activityPrice != 0 ? this.data.product.activityPrice : this.data.product.price;

            this.setData({
              'checkedSpecText': goodNameAndPrice + pric + '+' + checkedValue.join('+')
            });
          } else {
            this.setData({
              'checkedSpecText': ''
            });
          }

          //设置选择的规格价格
          let checkedPriceValue = checkedNameValue.filter(function(v) {
            if (v.valueId != 0) {
              return true;
            } else {
              return false;
            }
          }).map(function(v) {
            return v.valuePrice;
          });


        checkedPriceValue.forEach(item => {
          countPrice += item;
        });
    }
    //计算金额
    var productN = this.data.product;
    var basePrice = productN.price;

    if (productN.activityPrice && productN.activityPrice != 0){
      basePrice = productN.activityPrice;
    }

    var totalPrice = basePrice + countPrice;


    productN.cartTotalPrice = totalPrice.toFixed(2);

    this.setData({
      product: productN
    });
  },


  changeSpecInfoByGuige: function () {
    let checkedNameValue = this.getCheckedSpecValue();
    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0 ) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueId;
    });
    return checkedValue.join(',');
  },

  changeSpecInfoByGuigeText: function () {
    let checkedNameValue = this.getCheckedSpecValue();
    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueTextExt;
    });
    return checkedValue.join('/');
  },



  temperSwitchHandler: function(t) {
    var e = t.target.dataset.code,
      a = t.target.dataset.inventory;
    this.data.detailTemperCode !== e && 1 * a != 0 && (this.setData({
      detailTemperCode: e
    }), this.reCalculateProductPrice("temper"));
  },
  additionSwitchHandler: function(t) {
    var e = t.target.dataset.inventory,
      a = t.target.dataset.code,
      o = t.target.dataset.index;
    if (this.data.detailAdditionList[o].code !== a && 1 * e != 0) {
      var i = this.data.detailAdditionList;
      this.data.detailAdditionList[o].code = a, this.setData({
        detailAdditionList: i
      }), this.reCalculateProductPrice("addition", a);
    }
  },
  loadSystemDataset: function() {
    o.ajax({
      url: "/resource/m/sys/sysDict",
      options: {
        loading: !1
      }
    }).then(function(t) {
      t && t.content && (l.globalData.dataset = t.content);
    });
  },
  addShoppingCartForIndex: function(t) {
    var a = this,
      i = Boolean(t.currentTarget.dataset.recommend);
    if (this.browseAddImageToCart(t), !u) {
      u = !0;
      var d = t.target.dataset.pop ? t.target.dataset.pop : t.currentTarget.dataset.pop,
        r = t.target.dataset.product ? t.target.dataset.product : t.currentTarget.dataset.product;
      if (0 !== r.maxAmount) {
        var s = !r.temperAttributeItem || r.temperAttributeItem.length <= 1,
          c = !r.additionDefaultList || r.additionDefaultList.length < 1,
          h = !1;
        if (r.standardCodeItem) {
          for (var p = 0, g = 0; g < r.standardCodeItem.length; g++) 1 === r.standardCodeItem[g].isInventory && p++;
          h = !(p > 1);
        } else h = !0;
        if (!d && h && s && c) {
          var m = null,
            f = null;
          r.standardCodeItem && r.standardCodeItem.length > 0 && (m = r.standardCodeItem[0].code),
            f = r.temperAttributeItem && r.temperAttributeItem.length > 0 ? r.temperAttributeItem[0].code : r.temperAttributeCode;
          var D = {
            productId: r.productId,
            temperAttributeCode: f,
            standardCode: m,
            amount: 1,
            additionList: r.additionDefaultList,
            eatway: r.eatway,
            maxAmount: r.maxAmount
          };
          return i && (D.ABTEST_recommend = !0), e.default.add(D) && n.toast("成功加入购物车", "success"),
            u = !1, void(i && this.updateExperiments("recommendAddToCartTimes"));
        }
        var I = r.promotionMsg;
        o.ajax({
          url: "/resource/m/product/detail2",
          data: {
            deptId: this.data.shopInfo.deptId,
            productId: r.productId,
            isHide: "NO",
            tasteId: "",
            paymentAccountType: 1,
            supportTakeout: "sent" === this.data.delivery ? 1 : 0
          }
        }).then(function(t) {
          i && a.updateExperiments("recommendClickTimes");
          var e = t.content;
          e.desc && (e.descAry = e.desc.split("\n")), a.setData({
            product: Object.assign({}, e, {
              promotionMsg: I,
              ABTEST_recommend: i
            })
          }), a.reCalculateProductCheck(e);
          var o = wx.createAnimation({
            duration: 300,
            timingFunction: "line"
          });
          a.animation = o, o.scale(.3, .3).step(), a.setData({
            showDetailLayer: !0,
            detailLayerAnimateData: o.export()
          }), setTimeout(function() {
            o.scale(1.05, 1.05).step(), this.setData({
              detailLayerAnimateData: o.export()
            });
          }.bind(a), 100), setTimeout(function() {
            var t = this;
            o.scale(1, 1).step(), this.setData({
              detailLayerAnimateData: o.export()
            }), 0 === e.maxAmount && wx.showModal({
              title: "",
              content: '"' + e.name + '"暂停售卖，请选购其他',
              showCancel: !1,
              confirmText: "选购其他",
              confirmColor: l.globalData.modal.confirmColor,
              success: function(e) {
                t.hideProductDetailLayer(), t.loadProductList();
              }
            });
          }.bind(a), 400);
        }).catch(function(t) {
          u = !1;
        });
      } else u = !1;
    }
  },


  addShoppingCartForIndex1: function(event) {
    var that = this;
    var currentIndex = event.currentTarget.dataset.index;
    var goodInfo = that.data.categoryList[currentIndex];


    if (goodInfo.num == 0){
        return;
    }


    that.setData({
      showDetailLayer: !0,
      product: goodInfo
    });

    this.changeSpecInfo();
    wx.hideTabBar({
      animation: true //是否需要过渡动画
    })

  },


  reCalculateProductCheck: function(t) {
    var e = t.standardCodeItem;
    if (e && e.length > 0) {
      for (var a in e)
        if (1 === e[a].checked) {
          this.setData({
            detailStandardCode: e[a].code
          });
          break;
        }
    } else this.setData({
      detailStandardCode: t.standardCode
    });
    var o = t.temperAttributeItem;
    if (o && o.length > 0) {
      for (var i in o)
        if (1 === o[i].checked) {
          this.setData({
            detailTemperCode: o[i].code
          });
          break;
        }
    } else this.setData({
      detailTemperCode: t.temperAttributeCode
    });
    var n = t.additionList,
      d = [];
    if (n)
      for (var r in n)
        if (n[r] && n[r].typeList)
          for (var s in n[r].typeList)
            if (n[r].typeList[s])
              for (var l in n[r].typeList[s]) 1 === n[r].typeList[s][l].checked && d.push({
                amount: n[r].typeList[s][l].amount,
                code: n[r].typeList[s][l].code
              });
    this.setData({
      detailAdditionList: d
    });
  },



  // addShoppingCartForDetail: function(t) {
  //   if (t && t.detail && o.collectFormId(t.detail.formId), this.browseAddCartForDetail(t),
  //     this.data.product) {
  //     if (null === this.data.detailStandardCode || null === this.data.detailTemperCode) return this.setData({
  //       detailProductCount: 1
  //     }), void this.hideProductDetailLayer();
  //     var a = {
  //       productId: this.data.product.productId,
  //       temperAttributeCode: this.data.detailTemperCode,
  //       standardCode: this.data.detailStandardCode,
  //       amount: this.data.detailProductCount,
  //       additionList: this.data.detailAdditionList,
  //       eatway: this.data.product.eatway,
  //       maxAmount: this.data.product.maxAmount
  //     };
  //     this.data.product.ABTEST_recommend && (a.ABTEST_recommend = !0), e.default.add(a) && (this.setData({
  //         detailProductCount: 1
  //       }), n.toast("成功加入购物车", "success"), this.data.product.ABTEST_recommend && this.updateExperiments("recommendAddToCartTimes"),
  //       this.hideProductDetailLayer());
  //   }
  // },

  //加入购物车
  addShoppingCartForDetail: function(t) {
      var that = this;

      //提示选择完整规格
      // if (!this.isCheckedAllSpec()) {
      //   util.showErrorToast('请选择商品规格');
      //   return false;
      // }


      let checkedNameValue = this.getCheckedSpecValue();
      var skuDetailIds = '';
      var itemDesc = '';
      if (checkedNameValue){
        skuDetailIds = this.changeSpecInfoByGuige();
        itemDesc = this.changeSpecInfoByGuigeText();
      }
      


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





      var storeid = wx.getStorageSync('storeid');

      //发送请求
    util.request(api.CartAdd, { oppenId: oppenid, storeId: storeid, goodsId: this.data.product.id, skuDetailIds: skuDetailIds, itemCount: this.data.detailProductCount, skuDetailDesc: itemDesc }, "POST")
      .then(function (res) {
        let _res = res;
        if (_res.code == 200) {
          n.toast("成功加入购物车", "success");

          that.getTabBarCount();
          //关闭当前弹出框
        } else {
          util.showErrorToast(_res.msg);
        }
      });
    this.hideProductDetailLayer();

    wx.showTabBar({
      animation: true //是否需要过渡动画
    });
  
      // this.data.product.ABTEST_recommend && (a.ABTEST_recommend = !0),
      //   e.default.add(a) && (this.setData({
      //       detailProductCount: 1
      //     }),
      //     n.toast("成功加入购物车", "success"),
      //     this.data.product.ABTEST_recommend && this.updateExperiments("recommendAddToCartTimes"),

      //     this.hideProductDetailLayer());
 
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



  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },




  gotoWallet: function(t) {
    t.targetUrl = "/pages/coupon/walletbuy?from=order&productId=" + t.currentTarget.dataset.prod.productId + "&deptId=" + this.data.shopInfo.deptId,
      wx.navigateTo({
        url: t.targetUrl
      });
  },
  decrementProductCountHandler: function(t) {
    var e = this.data.detailProductCount;
    e > 1 && this.setData({
      detailProductCount: --e
    });
  },
  // incrementProductCountHandler: function(t) {
  //   var a = e.default.getCartItemsAmount(),
  //     o = l.globalData.dataset.cartCountLimit - a,
  //     i = this.data.detailProductCount;
  //   i < this.data.product.maxAmount && i < o ? this.setData({
  //     detailProductCount: ++i
  //   }) : wx.showModal({
  //     title: "",
  //     content: "该商品可购买数量已达上限",
  //     showCancel: !1,
  //     confirmText: "我知道了",
  //     confirmColor: l.globalData.modal.confirmColor
  //   });
  // },

  incrementProductCountHandler: function(t) {


    var i = this.data.detailProductCount;
    this.setData({
      detailProductCount: ++i
    });

    // var a = e.default.getCartItemsAmount(),
    //   o = l.globalData.dataset.cartCountLimit - a,
    //   i = this.data.detailProductCount;
    // i < this.data.product.maxAmount && i < o ? this.setData({
    //   detailProductCount: ++i
    // }) : wx.showModal({
    //   title: "",
    //   content: "该商品可购买数量已达上限",
    //   showCancel: !1,
    //   confirmText: "我知道了",
    //   confirmColor: l.globalData.modal.confirmColor
    // });
  },

  // hideProductDetailLayer: function(t) {
  //   if (!t || "true" === (t.target ? t.target.dataset.close : t.currentTarget ? t.currentTarget.dataset.close : "")) {
  //     var e = wx.createAnimation({
  //       duration: 300,
  //       timingFunction: "ease"
  //     });
  //     e.scale(.2, .2).opacity(.7).step(), this.setData({
  //       detailLayerAnimateData: e.export(),
  //       detailProductCount: 1,
  //       detailStandardCode: null,
  //       detailTemperCode: null,
  //       detailAdditionList: []
  //     }), setTimeout(function() {
  //       this.setData({
  //         product: null,
  //         showDetailLayer: !1
  //       }), u = !1;
  //     }.bind(this), 280);
  //   }
  // },

  hideProductDetailLayer: function(t) {
  
    if (!t || "true" === (t.target ? t.target.dataset.close : t.currentTarget ? t.currentTarget.dataset.close : "")) {
      var e = wx.createAnimation({
        duration: 300,
        timingFunction: "ease"
      });
      e.scale(.2, .2).opacity(.7).step(), this.setData({
        detailProductCount: 1,
        detailStandardCode: null,
        detailTemperCode: null,
        detailAdditionList: []
      }), setTimeout(function() {
        this.setData({
          product: null,
          showDetailLayer: !1,
          checkedSpecText: ''
        }), u = !1;
      }.bind(this), 280);
    };

    if (t && t.target && t.target.dataset.close){


      wx.showTabBar({
        animation: true //是否需要过渡动画
      });

    }

  },


  tapMenuItem: function(t) {
    var e = t.currentTarget.dataset.id;
    this.setData({
      toView: "index-" + t.currentTarget.dataset.id,
      productActiveIndex: e
    });
  },
  productScrollHandler: function(t) {
    for (var e = t.detail.scrollTop, a = this.data.productScrollTop, o = this.data.productActiveIndex, i = -1, n = 0; n < a.length; n++) e + 15 > a[n] && e - 15 < a[n] && (i = n); -
    1 !== i && i !== o && (i > this.data.products.length && (i = this.data.products.length - 1),
      this.setData({
        productActiveIndex: i
      }));
  },
  productScrollTopHandler: function() {},
  calcProductScrollTop: function() {
    this.data.radio;
    var t = 188 * this.data.radio,
      e = this.data.products,
      a = [];
    a.push(0);
    for (var o = 0, i = 0; i < e.length; i++) o += e[i].productList.length * t, a.push(o);
    this.setData({
      productItemHeight: t,
      productScrollTop: a
    });
  },
  calcContentHeight: function() {
    var t = "pick" === this.data.delivery ? this.data.addressPickHeight : this.data.addressSentHeight;
    this.setData({
      contentHeight: this.data.windowHeight - this.data.bannerHeight - t
    });
  },
  productDetailMashTap: function(t) {
    return !1;
  },
  loadAdposData: function() {
    var t = this,
      e = wx.getSystemInfoSync();
    o.ajax({
      url: "/resource/m/sys/app/adpos",
      data: {
        Width: e.pixelRatio * e.screenWidth,
        Height: e.pixelRatio * e.screenHeight,
        source: e.system.includes("Android") ? 1 : 2,
        displayLocation: 2
      },
      options: {
        loading: !1
      }
    }).then(function(e) {
      e && e.content && e.content.length > 0 ? (t.setData({
        adPos: e.content,
        bannerHeight: t.data.bannerHeightDefault
      }), 
      e.content.length < 2 && t.setData({
        indicatorDots: !1,
        autoplay: !1
      })) : (t.setData({
        adPos: null,
        bannerHeight: 0
      }), t.calcContentHeight());
    });
  },
  loadProductList: function() {
    var t = this;
    if (!this.data.shopInfo) return !1;
    var e = wx.getSystemInfoSync();
    wx.showLoading({
      title: "加载中...",
      mask: !0
    }), o.ajax({
      url: "/resource/m/product/list",
      data: {
        deptId: this.data.shopInfo.deptId,
        supportTakeout: "sent" === this.data.delivery ? 1 : 0,
        applyTerminal: e.model.indexOf("iPhone") ? 1 : 2
      },
      options: {
        loading: !1,
        needOriginResult: !0
      }
    }).then(function(e) {
      if (wx.hideLoading(), e && 7 === e.code) t.setData({
        hasNoProductText: e.msg,
        products: [],
        locationDialog: 2
      });
      else if (e && e.content) {
        var a = e.content.shopInfo;
        0 === a.isWork ? (t.setData({
          locationDialog: 2
        }), wx.showModal({
          title: "",
          content: "店铺已打烊ZzZ， " + (a.workDesc ? a.workDesc : "") + "营业时间再来吧",
          showCancel: !1,
          confirmText: "我知道了",
          confirmColor: l.globalData.modal.confirmColor
        })) : 2 === a.isWork && (t.setData({
          locationDialog: 2
        }), wx.showModal({
          title: "",
          content: a.workDesc ? a.workDesc : "",
          showCancel: !1,
          confirmText: "切换门店",
          confirmColor: l.globalData.modal.confirmColor,
          success: function() {
            wx.navigateTo({
              url: "/pages/address/select?from=menu&delivery=pick"
            });
          }
        }));
        var o = e.content.commodityList.map(function(t) {
          var e = Object.assign({}, t);
          if (Object.prototype.hasOwnProperty.call(e, "kindDesc"))
            if (/[1-9]折/.test(e.kindDesc)) {
              var a = e.kindDesc.split("/").map(function(t) {
                return t.trim();
              });
              e = Object.assign({}, e, {
                kindDescIsOnSale: !0,
                kindDescOnSaleFirst: a.shift(),
                kindDescOnSaleRest: a.join(" / ")
              });
            } else e = Object.assign({}, e, {
              kindDescIsOnSale: !1
            });
          var o = "";
          switch (e.kindIconDisplay) {
            case 1:
              o = "https://www.eecup.cn/tea/image/eecup/icon/menu/hot.png";
              break;

            case 2:
              o = "https://www.eecup.cn/tea/image/eecup/icon/menu/sale.png";
              break;

            case 0:
            default:
              o = e.iconUrl;
          }
          return e = Object.assign({}, e, {
            displayedIconUrl: o
          });
        });
        if (t.setData({
            products: o || [],
            hasNoProductText: o.length ? null : "该门店暂无可售商品"
          }), l.globalData.kindId) {
          t.calcContentHeight(), t.calcProductScrollTop();
          var i = t.data.products.findIndex(function(t, e) {
            return t.kindId === l.globalData.kindId;
          }); -
          1 != i && (l.globalData.kindId = "", t.setData({
            currentScrollTop: t.data.productScrollTop[i]
          }));
        } else t.calcContentHeight(), t.calcProductScrollTop();
      }
    });
  },
  reCalculateProductPrice: function(t, e) {
    var a = this,
      i = "standard" === t ? 1 : "temper" === t ? 2 : 3;
    o.ajax({
      url: "/resource/m/product/pricecalc2",
      data: {
        deptId: this.data.shopInfo.deptId,
        productId: this.data.product.productId,
        standardCode: this.data.detailStandardCode,
        temperAttributeCode: this.data.detailTemperCode,
        additionCode: e,
        additionList: this.data.detailAdditionList,
        clickSite: i,
        paymentAccountType: 1,
        supportTakeout: "sent" === this.data.delivery ? "1" : "0"
      },
      options: {
        needOriginResult: !0
      }
    }).then(function(t) {
      if ((!t || 7 !== t.code) && t && t.content) {
        var e = a.data.product;
        Object.assign(e, t.content), a.setData({
          product: e
        }), a.reCalculateProductCheck(e);
      }
    });
  },
  renderExperiments: function() {
    var t = this;
    l.adhoc.getExperimentFlags(function(e) {
      t.setData({
        ABtest: e.get("Top1Style")
      });
    });
  },
  updateExperiments: function(t) {
    l.adhoc.increment(t, 1);
  },
  onLoad: function(t) {
    
    this.loadSystemInfo();
    this.getShowAndHide();
    // this.loadFlData();
  },
  onReady: function() {},



  onShow: function() {
    var t = this;
    o.scanHandler({
        title: "菜单页",
        route: this.route
      }), 
      r.checkOpenId(), 
      l.globalData.hideTime && (Date.now() - l.globalData.hideTime) / 1e3 > l.globalData.dataset.locationRefreshTime && (l.globalData.delivery = "pick",
        this.setData({
          delivery: "pick",
          shopInfo: null,
          locationSuccess: !1
        }), l.globalData.locationFlag = !1, l.globalData.menuLoginFlag = !1, l.globalData.hideTime = ""),
      this.clearGlobalDataCache(), 
      l.globalData.storeDeptId ? d.getLocation().then(function(e) {
        e && d.loadNearShop(l.globalData.storeDeptId).then(function(e) {
          l.globalData.storeDeptId = "", t.setData({
            locationDialog: 2
          }), t.dealShop(e), l.globalData.locationFlag = !0, a.default.getLoginStatus().then(function(t) {
            t && (l.globalData.menuLoginFlag = !0);
          });
        });
      }) : l.globalData.locationFlag && l.globalData.menuLoginFlag ? this.loadGlobalData() : l.globalData.menuLocationFlag ? a.default.getLoginStatus().then(function(e) {
        e ? (l.globalData.menuLoginFlag = !0, t.setData({
          locationDialog: 0
        }, function() {
          t.loactionLife();
        })) : t.loactionLife();
      }) : (l.globalData.menuLocationFlag = !0
      
      // d.getLocation().then(function(e) {

      //   d.loadNearShop().then(function(e) {
      //     t.dealShop(e), a.default.getLoginStatus().then(function(e) {
      //       e ? (l.globalData.menuLoginFlag = !0, t.setData({
      //         locationDialog: 0
      //       }, function() {
      //         t.loactionLife();
      //       })) : t.loactionLife();
      //     });
      //   });

      // })
    

      ), 
      
    this.renderExperiments(), 
      l.testin.track("bbb", 1), 
      s.isActivityStart()
      .then(function(e) {
        t.setData({
          millionObj: e
        });
      });
    this.setData({
      delivery: l.globalData.delivery,
      addressInfo: l.globalData.delivery == 'pick' ? l.globalData.shopInfo : l.globalData.addressInfo,
      shopInfo: l.globalData.shopInfo,
      locationSuccess: l.globalData.locationFlag
    })

    // this.getShopInfo();
    this.loadFlData();
    this.showIndexGoods();

    wx.showTabBar({
      animation: true //是否需要过渡动画
    });

  },




  onHide: function() {
    this.hideProductDetailLayer();
  },
  onUnload: function() {},
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading(), this.loadProductListData().then(function() {
      wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
    }).catch(function(t) {
      wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
    });
  },
  onReachBottom: function() {},
  onTabItemTap: function(t) {},
  browseAddImageToCart: function(t) {
    if (void 0 != this.data.products && this.data.products.length > 0) {
      t.currentTarget.id.split("_")[1];
      var e = t.currentTarget.dataset.product,
        a = new c.BusinessProperties();
      if (a.element_content = "", a.item_id = e.productId, a.item_name = e.name, a.item_price = e.discountPrice + "",
        a.standard_id = e.standardCode + "", a.temperature_id = e.temperAttributeCode + "",
        void 0 != e.additionDefaultList && e.additionDefaultList.length > 0) {
        var o = "";
        for (var i in e.additionDefaultList) 0 != o.length && (o += ","), o += e.additionDefaultList[i].code;
        a.default_info = o;
      }
      a.item_first_label = t.currentTarget.dataset.kindname, c.event("menu_ck_shoppingcart", a);
    }
  },
  browseAddCartForDetail: function(t) {
    if (this.data.product) {
      var e = new c.BusinessProperties();
      if (e.element_content = "加入购物车", e.item_id = this.data.product.productId, e.item_name = this.data.product.name,
        e.item_price = this.data.product.discountPrice + "", e.standard_id = this.data.detailStandardCode + "",
        e.temperature_id = this.data.detailTemperCode + "", e.item_number = this.data.detailProductCount + "",
        void 0 != this.data.detailAdditionList && this.data.detailAdditionList.length > 0) {
        var a = "";
        for (var o in this.data.detailAdditionList) 0 != a.length && (a += ","), a += this.data.detailAdditionList[o].code;
        e.default_info = a;
      }
      c.event("menudetail_ck_shoppingcart", e);
    }
  },
  browseShopInfo: function() {
    if ("pick" == this.data.delivery) {
      var t = this.data.shopInfo;
      if (t) {
        var e = {};
        e.name = t.name, e.distance = t.distanceText, e.city = t.cityName, e.longitude = t.longitude,
          e.latitude = t.latitude, e.store_id = t.deptId, c.event("menu_bw_store", e, 2);
      }
    }
  },
  bannerChange: function(t) {
    this.data.topBannerIndex = t.detail.current;
  },
  loadFlData: function() {
    let that = this;
    var storeid = wx.getStorageSync('storeid');
    util.request(api.CatalogList, { storeId: storeid}).then(function(res) {
      that.setData({
        navList: res.data,
        currentCategory: res.data[0].id
      });
      that.getCurrentCategory();
    });

    this.calcContentHeight();



  },
  getCurrentCategory: function() {
    let that = this;
    var storeid = wx.getStorageSync('storeid');
    util.request(api.CatalogCurrent, {
      categoryId: that.data.currentCategory,
      storeId: storeid
    }, 'POST').then(function(res) {
      if (res.code === 200) {
        that.setData({
          categoryList: res.data
        });
      }
    });
  },
  switchCate: function(event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory == event.currentTarget.dataset.id) {
      return false;
    }

    that.setData({
      currentCategory: event.currentTarget.dataset.id
    });

    this.getCurrentCategory();
  },
  // getShopInfo: function () {
  //   var a = this;
  //   var storeid = wx.getStorageSync('storeid');

  //   if (storeid){

  //     a.setData({
  //       shopInfo: wx.getStorageSync('shopinfo')
  //     });
      
  //   }else{
  //     //现在本地查询是否有店铺id。没有就默认第一个。
  //     util.request(api.ShopList).then(function (res) {
  //       if (res.code == 200) {
  //         a.setData({
  //           shopInfo: res.data[0]
  //         });
  //         wx.setStorageSync('storeid', res.data[0].id);
  //         wx.setStorageSync('shopinfo', res.data[0]);
  //       }
  //     });
  //   }
  // },

  showIndexGoods: function () {
    var that = this;
    var goods = l.globalData.indexGoods;
    
    if (goods && goods != null){


      that.setData({
        currentCategory: goods.cid,
        showDetailLayer: 1,
        product: goods
      });
      
      this.getCurrentCategory();

      this.changeSpecInfo();



      l.globalData.indexGoods = null;
    }








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