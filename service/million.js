function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var n = t(require("../utils/api.js")),
  e = t(require("../utils/store.js")),
  i = t(require("./login.js")),
  a = require("../utils/promise/es6-promise.min.js"),
  o = function() {
    return getApp();
  };

module.exports = {
  getMillionFlag: function() {
    return e.default.getStore("MILLIONOPENFLAG");
  },
  setMillionFlag: function() {
    e.default.setStore("MILLIONOPENFLAG", !0);
  },
  removeMillionFlag: function() {
    e.default.removeStore("MILLIONOPENFLAG");
  },
  isActivityStart: function() {
    var t = this;
    return new a(function(n, e) {
      i.default.getLoginStatus().then(function(i) {
        i ? t.getActivityData().then(function(t) {
          n(t);
        }).catch(function(t) {
          e(t);
        }) : e(!1);
      });
    });
  },
  formatStr: function(t, n) {
    if (String(t).indexOf("{{") > -1 && n.start) return t = t.replace("{{", n.start),
      t = t.replace("}}", n.end);
  },
  formatMsg: function(t, n, e) {
    if (String(t).indexOf("\n") > -1 && 1 === e) {
      i = String(t).split("\n")[0];
      i = this.formatStr(i, {
        start: "<span class='buyNum'>",
        end: "</span>"
      });
      a = String(t).split("\n")[1];
      return a = this.formatStr(a, {
        start: "<span class='needBuyNum'>",
        end: "</span>"
      }), "<div class='noInLine'><div class='lineOne'>" + i + "</div><div class='lineTwo'>" + a;
    }
    var i = String(t).split("\n")[0],
      a = String(t).split("\n")[1];
    return a = this.formatStr(a, {
      start: "<span class='needBuyNum'>",
      end: "</span>"
    }), "<div class='inLine'><div class='inLine_lineOne'>" + i + "</div><div class='lineTwo'>" + a + "</div>";
  },
  getActivityData: function() {
    var t = this;
    return new a(function(e, i) {
      n.default.ajax({
        url: "/resource/m/promotion/cashAward/home",
        data: {
          firstOpen: !Boolean(t.getMillionFlag())
        },
        options: {
          loading: !1,
          needlogin: !0
        }
      }).then(function(n) {
        if (n && n.content && "SUCCESS" === n.status) {
          if (n.content.showType = 1, n.content.boughtNum >= n.content.totalAmount)
            if (3 === n.content.activityStatus || 2 === n.content.activityStatus) {
              var i = n.content.activityBannerMsg.split("{{"),
                a = i[1].split("}}");
              n.content.activityBannerMsgArr = [], n.content.activityBannerMsgArr.push(i[0]),
                n.content.activityBannerMsgArr.push(a[0]), n.content.activityBannerMsgArr.push(a[1]),
                n.content.showType = 2;
            } else {
              var s = /\{*/gi,
                r = /\}*/gi;
              c = (c = n.content.activityBannerMsg.replace(s, "")).replace(r, ""), n.content.activityBannerMsg = c;
            }
          else {
            var s = /\{*/gi,
              r = /\}*/gi,
              c = n.content.activityBannerMsg.replace(s, "");
            c = c.replace(r, ""), n.content.activityBannerMsg = c;
          }
          var l = n.content.becomeMsg.split("\n");
          n.content.becomeMsgArr = l;
          var u = n.content.activityPeriod.split("\n");
          n.content.activityPeriodArr = u;
          var g = !1;
          if (n.content.activityBannerMsg && (2 !== n.content.activityStatus && 4 !== n.content.activityStatus && 5 !== n.content.activityStatus || (g = !0),
              3 === n.content.activityStatus && n.content.boughtNum >= n.content.totalAmount && (g = !0)),
            n.content.streamer = g, n.content.showMsg && n.content.boughtNum < n.content.totalAmount && 1 !== n.content.teamReachStatus) {
            var v = [];
            n.content.showMsgHtml = t.formatMsg(n.content.showMsg, v, 1);
          } else {
            var f = [];
            n.content.showMsgHtml = t.formatMsg(n.content.showMsg, f, 2);
          }
          n.content.lotteryMsgHtml = "<div class='lineThree'>" + t.formatStr(n.content.lotteryMsg, {
            start: "<span class='totalMoney'>",
            end: "</span>"
          }) + "</div>", o().globalData.millionStart = !0, o().globalData.millionObj = n.content;
        } else o().globalData.millionObj = "";
        e(o().globalData.millionObj);
      }).catch(function(t) {
        i(t);
      });
    });
  }
};