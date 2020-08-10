var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, n = {
    domain: "appadhoc.com",
    getFlags: "https://experiment.appadhoc.com/get_flags_async",
    tracker: "https://tracker.appadhoc.com/tracker",
    forceExp: "https://experiment.appadhoc.com/force_clients",
    rebuildDomain: function(e) {
        n.getFlags = e.getFlagsURL, n.tracker = e.trackerURL, n.forceExp = e.forceExpURL;
    }
}, o = function() {
    function e() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
    }
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
}, r = {
    set: function(e, t) {
        return wx.setStorageSync(e, t);
    },
    get: function(e) {
        return wx.getStorageSync(e);
    }
}, i = {
    indexOf: function(e, t) {
        var n = e.length >>> 0, o = Number(arguments[1]) || 0;
        for ((o = o < 0 ? Math.ceil(o) : Math.floor(o)) < 0 && (o += n); o < n; o++) if (o in e && e[o] === t) return o;
        return -1;
    },
    uniquePush: function(e, t) {
        -1 === i.indexOf(e, t) && e.push(t);
    }
}, a = function() {
    var e = {
        sdk_api_version: "2.0",
        sdk_version: "2.1.0",
        OS: "wx",
        os_version: "",
        os_version_name: "",
        device_model: "",
        country: "",
        language: "",
        locale: "",
        display_height: "",
        display_width: "",
        screen_size: "",
        app_version: ""
    };
    try {
        var t = wx.getSystemInfoSync(), n = t.language.split("_");
        e.OS = t.system.toLowerCase().indexOf("ios") > -1 ? "iOS" : "google_android", e.os_version_name = e.os_version = t.system.split(" ")[1], 
        e.device_model = t.model, e.country = n[1], e.language = n[0], e.locale = t.language, 
        e.display_height = t.windowHeight, e.display_width = t.windowWidth, e.screen_size = t.pixelRatio;
    } catch (e) {}
    return e;
}(), s = void 0, u = void 0, c = {}, l = [], f = [], p = null, d = null, m = null, y = [];

y.run = function(e) {
    for (;y.length > 0; ) {
        var t = y.shift();
        "function" == typeof t && t(e);
    }
};

var g = function e(t) {
    if (!e.start) {
        e.start = !0;
        var o = {
            app_key: s,
            client_id: u,
            summary: a,
            custom: c
        };
        wx.request({
            url: n.getFlags,
            data: o,
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            complete: function(n) {
                if (e.start = !1, 200 == n.statusCode) {
                    var o = n.data;
                    if (!o) return;
                    if (o.hasOwnProperty("error_code")) throw new Error(o.reason_display);
                    var r = [], i = [];
                    o.experiments && o.experiments.forEach(function(e, t) {
                        e.name || (e.name = e.id), r.push(e.id), i.push({
                            id: e.id,
                            flags: e.flags,
                            name: e.name
                        });
                    }), p = r, d = i, m = o.flags, "function" == typeof t && t(), y.run(_(m));
                }
            }
        });
    }
};

g.start = !1;

var h = function(e) {
    var t = !1;
    i.indexOf(l, e) < 0 ? l.push(e) : t = !0, (f = v(l, f)).length > 0 && (t || S());
}, v = function(e, t) {
    for (var n = 0, o = d.length; n < o; n++) {
        var r = d[n], a = r.flags;
        if (a && a.length) {
            for (var s = 0, u = 0, c = a.length; u < c; u++) {
                var l = a[u];
                i.indexOf(e, l) > -1 && s++;
            }
            s == a.length && i.uniquePush(t, r.id);
        }
    }
    return t.slice();
}, _ = function(e) {
    if (!e) throw new Error("init flags object error");
    return {
        get: function(t) {
            var n = e[t];
            return e.hasOwnProperty(t) && h(t), n;
        }
    };
}, w = function() {
    var e = arguments, o = void 0, r = void 0, i = void 0, l = [];
    if (e[0] instanceof Array) {
        var p = e[0];
        i = e[1];
        var d = Math.round(new Date().getTime() / 1e3), m = 0 == f.length ? [ "CONTROL" ] : f;
        p.forEach(function(e) {
            var n = void 0, o = void 0;
            if ("string" == typeof e) n = e, o = 1; else {
                if ("object" !== (void 0 === e ? "undefined" : t(e)) || null == e) throw new Error("increment params error");
                n = e.key, o = e.val;
            }
            l.push({
                key: n,
                value: o,
                timestamp: d,
                experiment_ids: m
            });
        });
    } else {
        if ("string" != typeof e[0]) throw new Error("increment params error");
        o = e[0], r = e[1], i = e[2], l = [ {
            key: o,
            value: r,
            timestamp: Math.round(new Date().getTime() / 1e3),
            experiment_ids: 0 == f.length ? [ "CONTROL" ] : f
        } ];
    }
    var y = {
        app_key: s,
        client_id: u,
        summary: a,
        custom: c,
        stats: l
    };
    // wx.request({
    //     url: n.tracker,
    //     data: y,
    //     header: {
    //         "content-type": "application/json"
    //     },
    //     method: "POST",
    //     complete: function(e) {
    //         console.log(e);
    //         var t = !1;
    //         200 == e.statusCode || (t = !0), "function" == typeof i && i(t);
    //     }
    // });
}, S = function() {
    w("Event-GET_EXPERIMENT_FLAGS", 1);
};

module.exports = {
    init: function(e, t) {
        var n = "ADHOC_MEMBERSHIP_CLIENT_ID";
        if (!e) throw new Error("Needs an appKey, get it from web console please.");
        t || (t = r.get(n)), t || (t = o()), r.set(n, t), u = t, s = e, g();
    },
    getExperimentFlags: function(e) {
        null == p && null == d && null == m ? y.push(e) : e(_(m));
    },
    increment: function() {
        w.apply(void 0, arguments);
    },
    setCustomTags: function(e) {
        for (var t in e) c[t] = e[t];
    },
    setAPI: function(e) {
        n.rebuildDomain(e);
    }
};