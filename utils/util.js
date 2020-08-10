var e = function() {
    function e(e, n) {
      var t = [],
        r = !0,
        i = !1,
        a = void 0;
      try {
        for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (t.push(o.value), !n || t.length !== n); r = !0);
      } catch (e) {
        i = !0, a = e;
      } finally {
        try {
          !r && u.return && u.return();
        } finally {
          if (i) throw a;
        }
      }
      return t;
    }
    return function(n, t) {
      if (Array.isArray(n)) return n;
      if (Symbol.iterator in Object(n)) return e(n, t);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  n = function(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }(require("../service/login.js")),
  t = wx.getFileSystemManager(),
  r = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
  };

module.exports = {
  formatTime: function(e) {
    var n = e.getFullYear(),
      t = e.getMonth() + 1,
      i = e.getDate(),
      a = e.getHours(),
      o = e.getMinutes(),
      u = e.getSeconds();
    return [n, t, i].map(r).join("/") + " " + [a, o, u].map(r).join(":");
  },
  formatSeconds: function(e) {
    if (!e) return null;
    var n = parseInt(e),
      t = 0,
      r = 0;
    return n > 60 && (r = parseInt(n / 60), t = parseInt(n % 60)), r > 0 ? r + "分" + t + "秒" : n + "秒";
  },
  redirect: function(e) {
    wx.redirectTo({
      url: e
    });
  },
  toast: function(e, n, t) {
    wx.showToast({
      title: e,
      icon: n || "none",
      duration: 2e3,
      success: function() {
        t && t();
      }
    });
  },
  trim: function(e) {
    return !e || e.length < 1 ? null : e = e.replace(/(^\s*)|(\s*$)/g, "");
  },
  isMobile: function(e) {
    return /^1[3-9]\d{9}/.test(e);
  },
  navigate: function(e, t) {
    getApp();
    t && t.needLogin ? n.default.getLoginStatus().then(function(n) {
      if (!n) {
        var r = t.needForward ? "/pages/index/wxlogin?returnUrl=" + encodeURIComponent(e.url) + "&type=" + (t.navigateType || "redirect") : "/pages/index/wxlogin";
        return wx.navigateTo({
          url: r
        }), !1;
      }
      wx.navigateTo(e);
    }) : wx.navigateTo(e);
  },
  getUrlParam: function(e) {
    if (e) {
      var n = e + "",
        t = {};
      if (0 !== n.indexOf("?")) return n.split("?")[1].split("&").map(function(e) {
        var n = e.split("=")[0],
          r = e.split("=")[1];
        t[n] = r;
      }), t;
    }
  },
  getQueryString: function(e, n) {
    if (0 !== e.indexOf("?")) {
      var t = new RegExp("(^|&)" + n + "=([^&]*)(&|$)"),
        r = e.split("?")[1].match(t);
      return null != r ? unescape(r[2]) : null;
    }
  },
  parseMoney: function(e) {
    return String(e).indexOf(".") > -1 ? parseFloat(parseFloat(e).toFixed(2)) : parseInt(e);
  },
  base64src: function(n) {
    return new Promise(function(r, i) {
      var a = /data:image\/(\w+);base64,(.*)/.exec(n) || [],
        o = e(a, 3),
        u = o[1],
        s = o[2];
      u || i(new Error("ERROR_BASE64SRC_PARSE"));
      var c = wx.env.USER_DATA_PATH + "/tmp_base64src." + u,
        l = wx.base64ToArrayBuffer(s);
      t.writeFile({
        filePath: c,
        data: l,
        encoding: "binary",
        success: function() {
          r(c);
        },
        fail: function() {
          i(new Error("ERROR_BASE64SRC_WRITE"));
        }
      });
    });
  },
  shareEvent: function(option, obj){
console.info(obj)
    let shareObj = {
  
      title: obj.title,
  
      path: obj.path,
  
      imgUrl: obj.imgUrl,
  
      success(res){
  
        // 转发成功之后的回调
  
  　　　 if (res.errMsg == 'shareAppMessage:ok') {}
  
      }, 
  
      fail(res){
  
         // 转发失败之后的回调
  
  　　　 if (res.errMsg == 'shareAppMessage:fail cancel') {
  
  　　　 // 用户取消转发
  
  　　　  } else if (res.errMsg == 'shareAppMessage:fail') {
  
  　　　  // 转发失败，其中 detail message 为详细失败信息
  
  　　　　}
  
      },
  
      complete(){
  
          // 转发结束之后的回调（转发成不成功都会执行）
  
      }
  
    };
  
    if (option.from === 'button') {
  
      // 来自页面内转发按钮
  
      console.log(option.target)
  
    }
  
    return shareObj;
  
  }
};