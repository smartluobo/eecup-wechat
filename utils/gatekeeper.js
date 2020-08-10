var e = require("../config/config.js"), t = require("./store.js"), o = require("./api.js"), n = {
    MODEL_MONITOR_ENABLE: {
        key: "weixin_monitor_enable",
        defValue: !1
    }
};

module.exports = {
    GATEKEEPER: n,
    refresh: function(n, i) {
        o.ajax({
            url: "",
            data: {
                moduleName: n.key,
                uid: getApp().globalData.uid || t.getStore("uid"),
                appVersion: getApp().globalData.version,
                mapiVersion: e.api.version
            },
            options: {
                needLogin: !1,
                loading: !1
            }
        }).then(function(e) {
            void 0 != e && void 0 != e.content && void 0 != e.content.flag && 0 == e.content.status ? (t.setStore(n.key, e.content.flag), 
            i && "function" == typeof i && i(e.content.flag)) : (t.setStore(n.key, n.defValue), 
            i && "function" == typeof i && i(n.defValue));
        });
    },
    getFlag: function(e) {
        var o = t.getStore(e.key);
        return void 0 == o || null == o || "" == o ? e.defValue : o;
    }
};