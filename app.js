function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function n(e, n, t) {
  return n in e ? Object.defineProperty(e, n, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[n] = t, e;
}

var t, i = e(require("./service/cart.js")),
  o = e(require("./service/login.js")),
  a = e(require("./service/million")),
  l = e(require("./service/openid")),
  r = (e(require("./utils/api.js")),
    e(require("./utils/store.js"))),
  u = e(require("./utils/monitor/monitor.js")),
  d = (e(require("./utils/gatekeeper.js")),
    e(require("./config/config.js"))),
  c = e(require("./abtest/ab.wx")),
  user = require('./utils/mydev/user.js'),
  util = require('./utils/mydev/util.js'),
  api = require('./utils/mydev/api.js'),
  s = e(require("./abtest/testin-ab-weapp-v3.1.2"));

App({
  adhoc: c.default,
  testin: s.default,
  onLaunch: function(e) {
    var n = this;
    a.default.removeMillionFlag();
    var t = this;
    wx.getSystemInfo({
      success: function(e) {
        t.globalData.windowHeight = e.windowHeight || "", 
        e.model.toLowerCase().indexOf("iphone x") > -1 && (t.globalData.isIpx = !0),
        wx.setStorageSync('phoneattr', e);
      }
    }), setTimeout(function() {
      l.default.getOpenId().then(function(e) {
        c.default.init("ADHOC_d3b6a4b2-72ce-4209-96fd-cbcfcb6238a7", n.globalData.openid),
          s.default.init("TESTIN_wf5e23d8e-8e0f-4f2d-8e13-a772699f681d", n.globalData.openid);
      });
    }, 100);



    var i = {
      funGetTokenId: function() {
        return t.globalData.uid || r.default.getStore("uid");
      },
      funGetLoginId: function() {
        return t.globalData.mobile ? t.globalData.mobile : "";
      },
      funGetUserId: function() {
        return r.default.getStore("userId");
      },
      funGetOpenId: function() {
        return t.globalData.openid ? t.globalData.openid : "";
      },
      funGetUnionId: function() {
        return "";
      },
      funGetAppVersion: function() {
        return t.globalData.version;
      },
      funGetAppName: function() {
        return "Eecup e杯好茶";
      },
      funGetLocationInfo: function() {
        var e = {},
          n = t.globalData.location;
        void 0 != n && null != n && (void 0 != n.longitude && (e.longitude = "" + n.longitude),
          void 0 != n.latitude && (e.latitude = "" + n.latitude));
        var i = t.globalData.locationCityInfo;
        return void 0 != i && null != i && (e.city = i.cityNameHere, e.province = i.provinceNameHere,
          e.country = i.countryNameHere, e.city_id = i.cityIdHere, e.province_id = i.provinceIdHere,
          e.country_id = i.countryIdHere), e;
      },
      funGetDepartmentId: function() {
        var e = t.globalData.shopInfo;
        return void 0 != e && null != e ? "" + e.deptId : "";
      }
    };
    u.default.init("7", e, d.default.api.env, i);


if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function(res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function() {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function(res) {
                                if (res.confirm) {
                                    // wx.clearStorage();
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function() {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        })
                    })
                }
            })
        } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }

    //获取用户的登录信息
    user.checkLogin().then(res => {
      console.log('app login')
      t.globalData.oppenId = wx.getStorageSync('oppenid');
      t.globalData.storeId = wx.getStorageSync('storeid');
    }).catch(() => {
      console.log('no login')
      // 需要登录后才可以操作
      wx.showModal({
        title: '',
        content: '请先登录',
        success: function (res) {  
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/index/wxlogin'
            });
          }
        }
      });
    });




  },
  onShow: function(e) {
    i.default.setTabBarCount(), void 0 != e && void 0 != e.scene && (this.globalData.scene = e.scene);
    this.getTabBarCount();
  },

  getTabBarCount:function(){
    var oppenid = wx.getStorageSync('oppenid');

    if (oppenid && oppenid != ""){


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


    }
  },

  onHide: function() {
    this.globalData.hideTime = Date.now();
  },
  onError: function(e) {
    e && u.default.onError(e);
  },
  onPageNotFound: function(e) {
    wx.switchTab({
      url: "/pages/index/home"
    });
  },
  globalData: (t = {
      version: "2020",
      mobile: o.default.getLoginMobile(),
      dataset: {},
      openid: "",
      scene: "",
      sessionKey: "",
      uid: "",
      delivery: "pick",
      eatway: "",
      locationFlag: !1,
      location: {},
      locationCityInfo: null,
      selectedCityInfo: null,
      shopFlag: !1,
      shopInfo: null,
      addressInfo: null,
      addressList: null,
      nearbyAddressInfo: null,
      searchAddressInfo: null,
      mapChannel: "GCJ-02",
      dispatchMsg: "",
      deviceNo: {
        ios: "WC39ZUyXRgdE/uPSGGGRKFQZWbwjq+nDb6Ncnfb4hbQIsUl9eyN0fi9Hut8i43TiXx2vbhTga2ptX8UJlcRodkX1I3dbt6CMkrDXshh2MZA1+OHVHozjxtBglkFwtMx+yo4sUfxtxrE3rRo7JG2f8p0NI8mX7/mbxDRzv6L59KU0JtOtyGfeSX3T4fG2FWJDUjpQOtuy1hKV0xH3COYIQ1yfHcDoH/FTLhkq3pE+MRQk/8slNy9spNCr4frWO7MTBDccr2HlqkJs=1487577677129",
        android: "android_3f109ee2-d413-37b9-9bbc-ecd180d1ad96"
      },
      modal: {
        confirmText: "确定",
        confirmColor: "#f2cba4",
        cancelText: "取消",
        cancelColor: "#999999"
      },
      loginStatistic: {},
      share: {
        title: "",
        imageUrl: "https://www.eecup.cn/tea/image/eecup/icon/tangwei.jpg",
        path: "/pages/index/home"
      },
      hideTime: "",
      webViewUrl: "",
      clearFlag: !1,
      inviterObj: {},
      isIpx: !1,
      kindId: "",
      bannerHeight: "",
      walletConfirmData: null,
      wxMobile: null,
      millionStart: !1,
      millionObj: "",
      windowHeight: "",
      _fmOpt: {
        partnerCode: "",
        appName: "tongdun_web",
        env: "PRODUCTION"
      },
      isPreset: !1,
      time: "",
      blackBox: "",
      invoiceList: [],
      invoiceType: "1",
      headType: "",
      allInvoiceList: null,
      invoiceHead: {},
      choseHead: {},
      invoiceImgList: ""
    }, n(t, "blackBox", ""), n(t, "userFlag", !1), n(t, "menuLocationFlag", !1), n(t, "selectAddress", ""),
    n(t, "menuLoginFlag", !1), n(t, "storeDeptId", ""), n(t, "awakenCoupon", !1), t)
});