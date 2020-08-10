var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
  } : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  o = function(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }(require("../service/login.js")),
  t = require("./promise/es6-promise.min.js"),
  i = require("./crypto.js"),
  n = require("../config/config.js"),
  a = require("./util.js"),
  r = require("./store.js"),
  s = function(o) {
    var a = getApp();
    return new t(function(t, s) {
      if (!o) return "";
      o.data || (o.data = {});
      var l = n.api.code + "" + n.api.version,
        u = n.api.key,
        d = n.api.replaceSpecial,
        c = "object" === e(o.data) ? JSON.stringify(o.data) : o.data,
        p = i.aes.en(c, u, d),
        g = ["cid=" + l, "q=" + p],
        f = a.globalData.uid || r.getStore("uid");
      f && f.length > 0 && g.push("uid=" + f), t({
        cid: l,
        q: p,
        sign: i.md5(g.sort().join(";") + u),
        uid: f
      });
    });
  },
  l = function(e) {
    var l = getApp();
    return e.data ? e.data.miniversion = l.globalData.version : e.data = {
      miniversion: l.globalData.version
    }, new t(function(t, u) {
      var d = n.api.domain + e.url;
      s(e).then(function(s) {
        e.options && !1 === e.options.loading || wx.showLoading({
          title: "加载中...",
          mask: !0
        }), wx.request({
          url: d,
          data: s,
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function(s) {
            e.options && !1 === e.options.loading || wx.hideLoading();
            var d = s.data || null;
            if (s.data && "string" == typeof s.data && (d = i.aes.de(s.data, n.api.key, n.api.replaceSpecial),
                d = JSON.parse(d)), n.api.debug && console.log("请求参数：", e, "返回结果", d), d && (l.globalData.uid = d.uid,
                r.setStore("uid", d.uid)), d) {
              if (1 === d.code && e.url.indexOf("/resource/m/user/logout") > -1 && (l.globalData.loginStatistic = {}),
                5 === d.code) return wx.hideLoading(), o.default.setLoginStatus(!1), e.options && !1 === e.options.needLogin ? void t(d) : void(void 0 === l.globalData.loginStatistic[e.url] || 0 === l.globalData.loginStatistic[e.url] ? (l.globalData.loginStatistic[e.url] = 1,
                o.default.loginRouter()) : (l.globalData.loginStatistic[e.url] = 0, e.options && e.options.switchUrl ? (t(d),
                wx.switchTab({
                  url: e.options.switchUrl
                })) : e.options && e.options.redirectUrl ? wx.redirectTo({
                url: e.options.switchUrl
              }) : wx.navigateBack()));
              if ("BASE101" !== d.BASE101)
                if (7 !== d.code) {
                  if (1 !== d.code) return e.options && !0 === e.options.needOriginResult ? t(d) : a.toast(d.msg),
                    void u(d);
                  t && t(d);
                } else {
                  if (e.options && !0 === e.options.needOriginResult) t(d);
                  else {
                    var c = d.msg || "业务处理错误";
                    a.toast(c);
                  }
                  u(d);
                }
              else wx.navigateTo({
                url: "/pages/member/supplement"
              });
            } else t(null);
          },
          fail: function(o) {
            e.options && !1 === e.options.loading || wx.hideLoading(), wx.showToast({
              title: "网络连接失败",
              icon: "none",
              duration: 2e3
            }), console.error(o), u("network timeout");
          },
          complete: function() {}
        });
      });
    });
  };

module.exports = {
  ajax: l,
  upload: function(e) {
    var l = getApp();
    return new t(function(t, u) {
      s(e).then(function(s) {
        var d = n.api.domain + e.url + "?",
          c = [];
        for (var p in s) c.push(p + "=" + s[p]);
        d += c.join("&"), e.options && !1 !== e.loading && wx.showLoading({
          title: "加载中...",
          mask: !0
        }), wx.uploadFile({
          url: d,
          filePath: e.filePath,
          name: e.name,
          header: {
            "content-type": "multipart/form-data"
          },
          success: function(s) {
            e.options && !1 === e.options.loading || wx.hideLoading();
            var u = null;
            if (s.data && "string" == typeof s.data && (u = i.aes.de(s.data, n.api.key, n.api.replaceSpecial),
                u = JSON.parse(u)), n.api.debug && console.log("请求参数：", e, "返回结果", u), u && (l.globalData.uid = u.uid,
                r.setStore("uid", u.uid)), 5 !== u.code)
              if ("BASE101" !== u.BASE101)
                if (7 !== u.code) 1 === u.code ? t && t(u) : a.toast(u.msg);
                else if (e.options && !0 === e.options.needOriginResult) t(u);
            else {
              var d = u.msg || "业务处理错误";
              a.toast(d);
            } else wx.navigateTo({
              url: "/pages/member/supplement"
            });
            else {
              if (o.default.setLoginStatus(!1), e.options && !1 === e.options.needLogin) return;
              o.default.loginRouter();
            }
          },
          fail: function(o) {
            e.options && !1 === e.options.loading || wx.hideLoading(), wx.showToast({
              title: "网络连接失败",
              icon: "none",
              duration: 2e3
            }), console.error(o), u("network timeout");
          }
        });
      });
    });
  },
  scanHandler: function(e) {
    var o = getApp(),
      t = wx.getSystemInfoSync(),
      i = {
        title: e.title || "",
        urlPath: e.route,
        openid: o.globalData.openid,
        manufacturer: t.brand,
        model: t.model,
        os: t.platform,
        osVersion: t.system,
        screenHeight: t.screenHeight,
        screenWidth: t.screenWidth,
        browser: t.platform,
        browserVersion: t.SDKVersion
      };
    wx.getNetworkType({
      success: function(e) {
        switch (e.networkType) {
          case "wifi":
            i.networkType = 1;
            break;

          case "2g":
            i.networkType = 2;
            break;

          case "3g":
            i.networkType = 3;
            break;

          case "4g":
            i.networkType = 4;
        }
      },
      complete: function() {
   
      }
    });
  },
  collectFormId: function(e) {
   
  }
};