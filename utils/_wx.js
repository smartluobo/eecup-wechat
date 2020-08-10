function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = function() {
    function t() {
        e(this, t);
    }
    return n(t, [ {
        key: "showModal",
        value: function(e) {
            return wx.showModal(e);
        }
    }, {
        key: "navigateTo",
        value: function(e) {
            return wx.navigateTo(e);
        }
    }, {
        key: "navigateBack",
        value: function(e) {
            return wx.navigateBack(e);
        }
    }, {
        key: "redirectTo",
        value: function(e) {
            return wx.redirectTo(e);
        }
    }, {
        key: "switchTab",
        value: function(e) {
            return wx.switchTab(e);
        }
    }, {
        key: "reLaunch",
        value: function(e) {
            return wx.reLaunch(e);
        }
    }, {
        key: "getSystemInfo",
        value: function(e) {
            return wx.getSystemInfo(e);
        }
    }, {
        key: "getSystemInfoSync",
        value: function(e) {
            return wx.getSystemInfoSync(e);
        }
    }, {
        key: "canIUse",
        value: function(e) {
            return wx.canIUse(e);
        }
    }, {
        key: "getUpdateManager",
        value: function(e) {
            return wx.getUpdateManager(e);
        }
    }, {
        key: "login",
        value: function(e) {
            return wx.login(e);
        }
    }, {
        key: "showLoading",
        value: function(e) {
            return wx.showLoading(e);
        }
    }, {
        key: "hideLoading",
        value: function(e) {
            return wx.hideLoading(e);
        }
    }, {
        key: "showToast",
        value: function(e) {
            return wx.showToast(e);
        }
    }, {
        key: "hideToast",
        value: function(e) {
            return wx.hideToast(e);
        }
    }, {
        key: "getLocation",
        value: function(e) {
            return wx.getLocation(e);
        }
    }, {
        key: "stopPullDownRefresh",
        value: function(e) {
            return wx.stopPullDownRefresh(e);
        }
    }, {
        key: "setNavigationBarTitle",
        value: function(e) {
            return wx.setNavigationBarTitle(e);
        }
    }, {
        key: "vibrateShort",
        value: function(e) {
            return wx.vibrateShort(e);
        }
    }, {
        key: "hideNavigationBarLoading",
        value: function(e) {
            return wx.hideNavigationBarLoading(e);
        }
    }, {
        key: "getSetting",
        value: function(e) {
            return wx.getSetting(e);
        }
    }, {
        key: "getUserInfo",
        value: function(e) {
            return wx.getUserInfo(e);
        }
    }, {
        key: "createSelectorQuery",
        value: function(e) {
            return wx.createSelectorQuery(e);
        }
    }, {
        key: "createAnimation",
        value: function(e) {
            return wx.createAnimation(e);
        }
    }, {
        key: "getStorage",
        value: function(e) {
            return wx.getStorage(e);
        }
    }, {
        key: "getStorageSync",
        value: function(e) {
            return wx.getStorageSync(e);
        }
    }, {
        key: "setStorage",
        value: function(e) {
            return wx.setStorage(e);
        }
    }, {
        key: "setStorageSync",
        value: function(e) {
            return wx.setStorageSync(e);
        }
    }, {
        key: "removeStorage",
        value: function(e) {
            return wx.removeStorage(e);
        }
    }, {
        key: "removeStorageSync",
        value: function(e) {
            return wx.removeStorageSync(e);
        }
    }, {
        key: "chooseImage",
        value: function(e) {
            return wx.chooseImage(e);
        }
    }, {
        key: "makePhoneCall",
        value: function(e) {
            return wx.makePhoneCall(e);
        }
    }, {
        key: "setTabBarBadge",
        value: function(e) {
            return wx.setTabBarBadge(e);
        }
    }, {
        key: "removeTabBarBadge",
        value: function(e) {
            return wx.removeTabBarBadge(e);
        }
    }, {
        key: "requestPayment",
        value: function(e) {
            return wx.requestPayment(e);
        }
    }, {
        key: "getNetworkType",
        value: function(e) {
            return wx.getNetworkType(e);
        }
    }, {
        key: "request",
        value: function(e) {
            return wx.request(e);
        }
    }, {
        key: "uploadFile",
        value: function(e) {
            return wx.uploadFile(e);
        }
    } ]), t;
}();

module.exports = new t();