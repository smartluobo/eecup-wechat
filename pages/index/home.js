function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var t = e(require("../../service/coupon.js")),
  n = (e(require("./../../utils/store.js")),
    e(require("./../../service/login.js"))),
  o = e(require("./../../service/million.js")),
  i = e(require("./../../utils/api.js")),
  a = require("../../service/location.js"),
  l = require("../../service/openid.js"),
  s = require("../../utils/util.js"),
  c = getApp(),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  u = require("../../utils/monitor/monitor.js");

Page({
  data: {
    sendTip: "",
    locationSuccess: null,
    location: {},
    delivery: null,
    shopInfo: {},
    isShowEnvelope: !1,
    isReceived: !1,
    systemInfo: {},
    indicatorDots: !0,
    autoplay: !0,
    interval: 5e3,
    duration: 500,
    adPics: [{
      sourceUrl: "./../../resources/images/index/banner_default.png"
    }],
    colseImg: !1,
    millionObj: "",
    millionStart: !1,
    imgSize: 0,
    inviterObj: "",
    inviterImg: "",
    millionDialog: !1,
    topBannerIndex: 0,
    noInLineHtml: "<div class='noInLine'><div class='lineOne'>本周你已消费<span class='buyNum'>2</span>件商品</div><div class='lineTwo'>再消费<span class='needBuyNum'>1</span>件",
    inLineHtml: "<div class='inLine'><div class='inLine_lineOne'>恭喜您成为百万大咖</div><div class='lineTwo'>本周消费<span class='needBuyNum'>7</span>件，等待开奖</div></div>",
    lineThreeHtml: "<div class='lineThree'>周日即分<span class='totalMoney'>500</span>万现金</div>",
    locationDialog: 0,
    couponList: [],
    locationShop: [],
    isAwakenCoupon: !1,
    awakenCouponList: [],
    couponBackground: "https://www.eecup.cn/tea/image/eecup/icon/index/icon2.0_homeDefault.png",
    recommendList: {},
    showModalStatus: 0,
    isScroll: 0,
    activityInfo: {},
    activitybuttonName: '',
    imgWidth: 0,
    imgHeight: 0,
    chouDialog: !1,
    chouResultDialog:!1,//抽奖结果统一弹框
    chouResultImg:'',//抽到体验卷弹框图片
    extractResultDialog:!1,//抽到体验卷弹框
    noActivityDialog:!1,//今日无活动
    // loadingSucceed:false//加载完成
  },
  //下拉刷新
  onPullDownRefresh() {
    var self = this;
    setTimeout(() => {
        self.setData({
          locationDialog: 0
        });
         //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 400);
},
tea(){
  wx.navigateTo({
    url: "/pages/index/tea"
  });
},
store(){
  
  wx.navigateTo({
    url: "/pages/index/store"
  });
},
  goCoupon: function() {
    this.setData({
        isAwakenCoupon: !1
      }),
      wx.switchTab({
        url: "/pages/index/menu"
      });
  },
  goExtractCoupon: function() {
    this.setData({
      extractResultDialog: !1,
      isAwakenCoupon: !1
      }),
      wx.navigateTo({
        url: "/pages/member/couponList?type=1"
      });
  },
  closeOpen: function() {
    this.setData({
      isAwakenCoupon: !1
    });
  },
  //新人大礼包
  new(){
    wx.navigateTo({
      url: "/pages/index/newExclusive"
    });
  },
  //优惠卷
  goCouponList(){
    wx.navigateTo({
      url: "/pages/member/couponList"
    });
  },
  //分享
  share(){
    wx.navigateTo({
      url: "/pages/member/share"
    });
  },
  //充值中心
  recharge(){
    wx.navigateTo({
      url: "/pages/index/recharge"
    });
  },
  loadGlobalData: function() {
    this.setData({
      delivery: c.globalData.delivery,
      shopInfo: c.globalData.shopInfo,
      locationSuccess: c.globalData.locationFlag,
      location: c.globalData.location,
      windowHeight: c.globalData.windowHeight
    });
  },
  goImgLink: function(e) {
    var t = "";
    if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.clickurl && (t = e.currentTarget.dataset.clickurl),
      t) {
      if (t.includes("pages/"))
        if (t.includes("pages/index/menu") || t.includes("pages/index/home") || t.includes("pages/order/list") || t.includes("pages/index/cart") || t.includes("pages/member/center")) {
          if ((t + "").split("?").length > 1) {
            var o = s.getUrlParam(t);
            c.globalData.kindId = o.kindId, t = t.split("?")[0];
          }
          wx.switchTab({
            url: t
          });
        } else t.includes("pages/") && (t.includes("million") || t.includes("walletbuy") || t.includes("giftcardmain") ? n.default.getLoginStatus().then(function(e) {
          e ? wx.navigateTo({
            url: t
          }) : wx.navigateTo({
            url: "./wxlogin"
          });
        }) : wx.navigateTo({
          url: t
        }));
      else t.includes("million_big_shot") ? n.default.getLoginStatus().then(function(e) {
        e ? wx.navigateTo({
          url: "./millionbigshot?type=million"
        }) : n.default.loginRouter();
      }) : (c.globalData.webViewUrl = t + "&frommini=mini", wx.navigateTo({
        url: "./imgwebview"
      }));
      u.event("home_ck_banner", {
        element_id: e.currentTarget.id,
        element_index: this.data.topBannerIndex
      });
    }
  },
  bottomBanner: function(e) {
    n.default.getLoginStatus().then(function(t) {
      if (t && e.currentTarget.dataset.clickurl) {
        var o = e.currentTarget.dataset.clickurl;
        o.includes("million_big_shot") ? wx.navigateTo({
          url: "./millionbigshot?type=million"
        }) : (c.globalData.webViewUrl = o + "&frommini=mini", wx.navigateTo({
          url: "./imgwebview"
        }));
      } else n.default.loginRouter();
    });
  },
  receiveCoupon: function(e) {
    var n = this,
      o = c.globalData.openid;
    e && e.detail && i.default.collectFormId(e.detail.formId);
    var a = this;
    this.data.isReceived ? (t.default.setShowEnvelope(!1), this.setData({
      isShowEnvelope: !1
    })) : i.default.ajax({
      url: "/resource/m/promotion/wechatCard/get",
      data: {
        openid: o,
        formid: e.detail.formId || ""
      },
      options: {
        loading: !1,
        needOriginResult: !0
      }
    }).then(function(e) {
      1 === e.code ? (t.default.setCouponReceived(!0), n.setData({
        isReceived: !0
      })) : 7 === e.code ? (wx.showToast({
        title: e.msg || "活动未开始，敬请期待",
        icon: "none"
      }), "mini100" === e.busiCode && setTimeout(function() {
        t.default.setCouponReceived(!0), t.default.setShowEnvelope(!1), a.setData({
          isShowEnvelope: !1
        });
      }, 1e3)) : wx.showToast({
        title: "活动未开始，敬请期待",
        icon: "none"
      });
    });
  },
  coupon: function(e) {
    e && e.detail && i.default.collectFormId(e.detail.formId), wx.navigateTo({
      url: "./coupon"
    });
  },
  closeEnvelope: function(e) {
    this.setData({
      isShowEnvelope: !1,
      colseImg: !0
    }), this.data.isReceived && t.default.setShowEnvelope(!1);
  },
  closeMillion: function(e) {
    this.setData({
      millionDialog: !1,
      chouDialog: !1,
      chouResultDialog:!1,
      extractResultDialog:!1,
      noActivityDialog:!1
    });
  },
  

  getTip: function() {
    var e = {
      lon: c.globalData.location.longitude,
      lat: c.globalData.location.latitude,
      channel: c.globalData.mapChannel
    };
    c.globalData.selectedCityInfo ? Object.assign(e, {
      cityID: c.globalData.selectedCityInfo.cityId
    }) : c.globalData.locationCityInfo && Object.assign(e, {
      cityID: c.globalData.locationCityInfo.cityId
    });
  },
  getAdImage: function() {
    var e = this;
    wx.getSystemInfo({
      success: function(t) {
        e.setData({
          systemInfo: t
        }), i.default.ajax({
          url: "/resource/m/sys/app/adpos",
          data: {
            Width: t.pixelRatio * t.screenWidth,
            Height: t.pixelRatio * t.screenHeight,
            source: t.system.includes("Android") ? 1 : 2,
            displayLocation: 0
          },
          options: {
            loading: !1
          }
        }).then(function(t) {
          if (t && t.content) {
            var n = t.content.length > 0 ? t.content : e.data.adPics,
              o = !!n[0].imageSize && 2 * n[0].imageSize / 3 + "rpx";
            e.setData({
              adPics: n,
              imgSize: o
            });
          }
        });
      }
    });
  },

  getAdImage1: function(storeid) {
    let that = this;
    var storeid = wx.getStorageSync('storeid');
    util.request(api.IndexUrl, {
        storeId: storeid
      },
      'POST'
    ).then(function(res) {
      if (res.code === 200) {
        that.getImageSize(res.data);
        that.setData({
          adPics: res.data
        });
      }
    });
  },


  getBootomBanner: function() {
    var e = this;
    wx.getSystemInfo({
      success: function(t) {
      }
    });
  },
  toMenu: function() {
    wx.switchTab({
      url: "./menu"
    });
  },
  toWallet: function() {
    n.default.getLoginStatus().then(function(e) {
      e ? wx.navigateTo({
        url: "./../coupon/wallet"
      }) : n.default.loginRouter();
    });
  },
  toSend: function() {
    wx.navigateTo({
      url: "./sendcoffee"
    });
  },
  onLoad: function(e) {
    console.info(e)
    wx.showLoading();
    if(e.openid){
      wx.setStorageSync('referrerOppenId', e.openid);
    }
    this.setData({
      locationDialog: 0
    });
    console.info("FAdsfs")
    this.getActivityInfo();
  },
  onReady: function() {},
  onShow: function() {
    var e = this;

    c.globalData.locationFlag && c.globalData.shopInfo ? this.getTip() : a.getLocation().then(function(t) {
      a.loadNearShop().then(function(t) {
        var n = a.shopDistanceConvert(t.content.nearShop);
        c.globalData.shopInfo = n, 
        c.globalData.location.cityId = t.content.cityId, 
        c.globalData.location.cityName = t.content.cityName,
        c.globalData.locationCityInfo = {
            cityId: t.content.cityId,
            cityName: t.content.cityName,
            cityIdHere: t.content.cityIdHere,
            cityNameHere: t.content.cityNameHere,
            provinceNameHere: t.content.provinceNameHere,
            provinceIdHere: t.content.provinceIdHere,
            countryIdHere: t.content.countryIdHere,
            countryNameHere: t.content.countryNameHere
          }, 
        c.globalData.dispatchMsg = t.content.dispatchMsg, 
        e.loadGlobalData(), 
        e.getTip();
      });
    }), 


    // this.getBootomBanner(),
      // this.getAwakenCoupon().then(function(n) {
      //   if (!n) {
      //     var i = t.default.getCouponReceived(),
      //       a = !e.data.colseImg && t.default.getShowEnvelope();
      //     e.setData({
      //       isReceived: i
      //     }), o.default.isActivityStart().then(function(t) {
      //       if (t.activityBannerMsg) {
      //         var n = !1;
      //         t.popup && (2 !== t.activityStatus && 4 !== t.activityStatus && 3 !== t.activityStatus || (n = !0,
      //             o.default.setMillionFlag(), u.event("appstart_millionpopupwindow_start", null, 2))),
      //           e.setData({
      //             millionObj: t,
      //             millionDialog: n,
      //             isShowEnvelope: !n && a,
      //             noInLineHtml: t.showMsgHtml,
      //             inLineHtml: t.showMsgHtml,
      //             lineThreeHtml: t.lotteryMsgHtml
      //           });
      //       } else e.setData({
      //         isShowEnvelope: a
      //       }), o.default.setMillionFlag();
      //     }).catch(function(t) {
      //       e.setData({
      //         isShowEnvelope: a
      //       }), o.default.setMillionFlag();
      //     });
      //   }
      // });

    this.getShopInfo();
    this.getRecommendList();

    // this.getImageSize();



  },
  onHide: function(e) {},
  onUnload: function(e) {},
  // onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onTabItemTap: function(e) {},
  bannerChange: function(e) {
    this.data.topBannerIndex = e.detail.current;
  },

  dododo: function(e) {
    var t = e.currentTarget.dataset.link;
    t.indexOf("pages/") > 0 ? wx.navigateTo({
      url: t
    }) : wx.navigateTo({
      url: "../webView2/webView2?url=" + t
    });
  },

  getShopInfo: function() {
    var a = this;
    var storeid = wx.getStorageSync('storeid');

    if (storeid) {
      this.getAdImage1(storeid);
    } else {

      //现在本地查询是否有店铺id。没有就默认第一个。
      // util.request(api.ShopList).then(function(res) {

      //   if (res.code == 200) {

      //     wx.setStorageSync('storeid', res.data[0].id);
      //     wx.setStorageSync('shopinfo', res.data[0]);
      //     a.getAdImage1(res.data[0].id);
      //   }
      // });


    }
  },

  getActivityInfo: function() {
    var a = this;
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');
    //现在本地查询是否有店铺id。没有就默认第一个。
    util.request(api.GetActivityInfo, {
      oppenId: oppenid,
      storeId: storeid
    }, 'POST').then(function(res) {
      if (res.code == 200) {
        // type = 1点击查看奖池  返回关闭  type = 2点击调用抽奖 调抢劵接口   type = 3是优惠券 点优惠劵引导下单
        //type = 4 没有弹框不做任何处理 
        // type=5显示图片点击不做任何处理 点击上方的小叉关闭弹框就ok

        if (res.data.type == 3){
          a.setData({
            couponsPoster: res.data.info.couponsPoster,
            chouDialog: 1,
            millionDialog: 1//弹框
          });
        }else{
          var millionDialogFlg = 1;
          if (res.data.type == 4) {
            a.setData({
              noActivityDialog: 1,
              millionDialog: millionDialogFlg//弹框
            });
            
          }
          a.setData({
            
            activityInfo: res.data,
            millionDialog: millionDialogFlg//弹框
          });
        }
      }
    });
  },


  getRecommendList: function() {
    var a = this;
    var oppenid = wx.getStorageSync('oppenid');
    var storeid = wx.getStorageSync('storeid');

    util.request(api.GetRecommendList, {
      oppenId: oppenid,
      storeId: storeid
    }, 'POST').then(function(res) {
      if (res.code == 200) {
        a.setData({
          // loadingSucceed:true,
          recommendList: res.data,
          showModalStatus: 1,
          isScroll: 1
        })
        wx.hideLoading();
        // wxLoading();
          
      }
    });
  },

  kind: function(e) {

    if (e.currentTarget.dataset.goods.num == 0) {
      return;
    }

    c.globalData.indexGoods = e.currentTarget.dataset.goods;
    wx.hideTabBar({
      animation: true //是否需要过渡动画
    });
    wx.switchTab({
      url: './menu'
    })

  },


  getImageSize: function(e){
    var that = this;
    // 获得一个图片的高度即可
    wx.getImageInfo({
      src: e[0].imageUrl+"",
      success: function (res) {
        // 获取当前屏幕的宽度
        var attr = wx.getStorageSync('phoneattr')
        // console.log("获取当前屏幕的宽度");
        // console.log(attr.screenWidth);
        // console.log(res.width);
        // console.log(res.height);
        var imgHeight = (res.height * attr.screenWidth) / (res.width)
        that.setData({
          imgWidth: attr.screenWidth,
          imgHeight: imgHeight
        })
      }
    });
  },


  navigateToActivityInfo: function(){

    var activityInfo = this.data.activityInfo;
   // type = 1点击查看奖池 type = 2点击调用抽奖 type = 3是优惠券
   // type = 4 没有弹框不做任何处理 type=5显示图片点击不做任何处理 点击上方的小叉关闭弹框就ok
  //type = 6 调用体验卷接口
    if (activityInfo.type == 1) {
      c.globalData.activityid = activityInfo.info.id;
      this.setData({
        millionDialog: !1,
      })
      wx.navigateTo({
        url: '/pages/coupon/jc'
      })
    } else if (activityInfo.type == 2) {
      var a = this;
      var oppenid = wx.getStorageSync('oppenid');
      var storeid = wx.getStorageSync('storeid');
      util.request(api.ExtractPrize, {
        oppenId: oppenid,
        storeId: storeid,
        activityId : activityInfo.info.id
      }, 'POST').then(function (res) {
        if (res.code == 200) {
          if(!!res.data){
            console.info(res.data.type)
            if(res.data.type=='1'){
              a.setData({
                chouDialog: 1,
                couponsPoster: res.data.poster,
              })
            }else{
              console.info("dsgf")
              a.setData({
                chouDialog:!1,
                chouResultDialog: 1,
                couponsPoster: res.data.poster,
              })
            }
            // a.setData({
            //   millionDialog: 1,
            //   chouDialog: 1,
            //   couponsPoster: res.data.poster,
            // })
          }
        }else{
          wx.showToast({
            title: res.msg,
            icon: "none"
          });
        }
      });
      
    } else if (activityInfo.type == 4){
      console.info("Sdf")
      this.setData({
        millionDialog: 1,
        noActivityDialog: 1
      })
    }else if (activityInfo.type == 5){
      
    } else if (activityInfo.type == 6){
      var a = this;
      var oppenid = wx.getStorageSync('oppenid');
      var storeid = wx.getStorageSync('storeid');
      util.request(api.extractExperience, {
        oppenId: oppenid,
        storeId: storeid,
        activityId : activityInfo.info.id
      }, 'POST').then(function (res) {
        if (res.code == 200) {
          if(!!res.data){
            if(res.data.type=='1'){
              a.setData({
                millionDialog: !1,
                extractResultDialog: 1,
                // chouDialog: 1,
                couponsPoster: res.data.poster,
              })
            }else{
              console.info("dsgf")
              a.setData({
                millionDialog: 1,
                chouResultDialog:1,
                couponsPoster:res.data.poster
              })
            }
          }else{
            wx.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        }else{
          wx.showToast({
            title: res.msg,
            icon: "none"
          });
        }
      });
    }else{
      this.setData({
        millionDialog: !1,
      })
    }

  },

  navigateToMenu: function () {

    this.setData({
      chouDialog: !1,
      millionDialog: !1
    });

    wx.switchTab({
      url: '/pages/index/menu',
    })



  },


});