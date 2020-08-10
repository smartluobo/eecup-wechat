function e() {
    var e = d();
    return {
        version: p.localVersion,
        clientId: e,
        apps: {},
        debugApps: {},
        timeDown: 0,
        timeUp: 0,
        records: []
    };
}

function t(e, t, n) {
    var r;
    try {
        r = wx.getStorageSync(p.storageKey);
    } catch (e) {}
    r && (n ? r.debugApps[e] = t : (r.apps[e] = t, r.timeDown = t.timeDown));
    try {
        wx.setStorageSync(p.storageKey, r);
    } catch (e) {}
}

function n(e, t, n) {
    wx.request({
        url: e,
        data: t,
        method: "POST",
        header: {
            "content-type": "application/json;charset=UTF-8"
        },
        success: function(e) {
            n && n(null, e.data);
        },
        fail: function(e) {}
    });
}

function r(e, r) {
    function o(t) {
        e._set("data", t), e._set("dataLoaded", !0);
        var n = e._get("varsData");
        if (t && t.exps) for (var r = t.exps, o = 0; o < r.length; o++) for (var i in r[o].componentsValues) n[i] = r[o].componentsValues[i];
        for (var a = e._get("getExperimentsCallback") || [], s = 0; s < a.length; s++) a[s]();
        a.splice(0);
    }
    function i() {
        d.dataTags = JSON.stringify(g), n(e._get("url") + p.expUrl, d, function(n, i) {
            var c;
            if (n) s(e, {
                msg: n.msg || n.message
            }); else {
                if (0 === i.errNo) try {
                    wx.setStorageSync("testin_first", !1);
                } catch (e) {} else 10001 === i.errNo || i.errNo;
                i.data.timeDown = new Date().getTime(), c = i.data, e._get("isDebug") ? t(e._get("expVersionId"), c, !0) : t(e._get("appKey"), c, !1);
            }
            a || n || (o(c), r(e._get("vars")));
        });
    }
    var a, c;
    try {
        c = wx.getStorageSync(p.storageKey);
    } catch (e) {}
    c && (a = e._get("isDebug") ? c.debugApps[e._get("expVersionId")] : c.apps[e._get("appKey")]) && (o(a), 
    r(e._get("vars")));
    var g = {
        appKey: e._get("appKey"),
        testin_id: e._get("clientId"),
        pl: "weapp",
        sv: p.sdkVersion,
        testin_time: new Date().getTime(),
        testin_first: !0,
        vid: "_",
        di: {
            testin_av: u.appVersion,
            testin_ov: u.os.version,
            testin_pa: p.packageName,
            testin_lan: u.language,
            testin_type: "track",
            testin_model: u.device.model,
            testin_dw: u.device.screenWidth,
            testin_dh: u.device.screenHeight,
            testin_net: "",
            testin_os: u.deviceType
        }
    };
    !1 === wx.getStorageSync("testin_first") ? g.testin_first = g.di.testin_isNew = !1 : g.testin_first = g.di.testin_isNew = !0;
    var d = {
        appKey: e._get("appKey"),
        clientId: e._get("clientId"),
        appVersion: u.appVersion,
        sdkVersion: p.sdkVersion,
        deviceinfo: {
            osVersionCode: "",
            osVersion: u.os.version,
            platform: u.os.name,
            packageName: p.packageName,
            language: u.language,
            country: u.country || "",
            deviceType: u.deviceType,
            deviceModel: u.device.model,
            displayWidth: u.device.screenWidth,
            displayHeight: u.device.screenHeight,
            net: ""
        },
        expVersionId: "0",
        newPV: !0
    }, l = e._get("tags");
    if (l) for (var f in l) d.customerLabel = d.customerLabel || {}, d.customerLabel[f] = l[f];
    e._get("isDebug") && (d.expVersionId = e._get("expVersionId")), wx.getNetworkType({
        success: function(e) {
            d.deviceinfo.net = g.di.testin_net = e.networkType, i();
        },
        fail: function() {
            i();
        }
    });
}

function o(e, t, r) {
    if (e._get("localStorageSupported")) {
        var o;
        try {
            o = wx.getStorageSync(p.storageKey);
        } catch (e) {}
        try {
            o.records = o.records ? o.records.concat(t) : t;
        } catch (e) {}
        try {
            wx.setStorageSync(p.storageKey, o);
        } catch (e) {}
        var i;
        o.records.length < p.maxUploadCount ? (i = o.records, o.records = []) : i = o.records.splice(0, p.maxUploadCount), 
        o.timeUp = new Date().getTime();
        try {
            wx.setStorageSync(p.storageKey, o);
        } catch (e) {}
        var a = parseInt(new Date().getTime() / 1e3), s = e._get("appKey"), c = {
            appKey: s,
            clientId: e._get("clientId"),
            stime: a,
            sign: g(s + a).substring(0, 6),
            debug: e._get("isDebug") ? 1 : 0,
            records: i
        };
        n(e._get("url") + p.trackUrl, c, function(e, t) {
            r && r(!e && t && 0 === t.errNo ? null : new Error("上报失败"));
        });
    } else r && r(null);
}

function i(e, t) {
    if (t.varName || t.opName) {
        for (var n, r, i = e._get("data"), a = i && i.exps || [], s = 0; s < a.length; s++) if (a[s].isUpload) if (t.varName) {
            for (var c in a[s].componentsValues) if (c == t.varName && !e._get("versionPV")[a[s].componentsKey]) {
                e._get("versionPV")[a[s].componentsKey] = !0, n = a[s].expId, r = a[s].componentsKey;
                break;
            }
        } else for (var p = a[s].events, u = 0; u < p.length; u++) if (p[u] === t.opName && !e._get("versionPV")[a[s].componentsKey]) {
            e._get("versionPV")[a[s].componentsKey] = !0, n = a[s].expId, r = a[s].componentsKey;
            break;
        }
        n && r && o(e, [ {
            expId: n,
            componentsKey: r,
            metrics: [ {
                name: "PV",
                count: 1,
                time: parseInt(new Date().getTime() / 1e3)
            } ]
        } ]);
    }
}

function a(e, t, n) {
    function r(e, t) {
        for (var n = 0; n < s.length; n++) if (s[n].expId == e && s[n].componentsKey == t) return s[n].metrics;
        return null;
    }
    var i = e._get("data"), a = i && i.exps || [], s = [];
    for (var c in t) !function(e, t) {
        for (var n = 0; n < a.length; n++) {
            var o = a[n].events;
            if (a[n].isUpload) for (var i = 0; i < o.length; i++) if (o[i] === e) {
                var c = r(a[n].expId, a[n].componentsKey);
                return void (c ? c.push({
                    name: e,
                    count: t,
                    time: parseInt(new Date().getTime() / 1e3)
                }) : s.push({
                    expId: a[n].expId,
                    componentsKey: a[n].componentsKey,
                    metrics: [ {
                        name: e,
                        count: t,
                        time: parseInt(new Date().getTime() / 1e3)
                    } ]
                }));
            }
        }
    }(c, t[c]);
    return s.length ? void o(e, s, n) : void (n && n());
}

function s(e, t) {
    n(e._get("url") + p.errUrl, {
        appKey: e._get("appKey"),
        clientId: e._get("clientId"),
        appVersion: u.appVersion,
        sdkVersion: p.sdkVersion,
        from: "weapp",
        platform: u.os.name,
        platformVersion: u.os.version,
        model: u.device.model,
        records: JSON.stringify([ {
            errorTime: parseInt(new Date().getTime() / 1e3),
            errorData: t.msg
        } ])
    }, function(e, t) {
        console.error(e, t);
    });
}

function c() {
    var e = this, t = {
        data: null,
        isCrawler: !1,
        appKey: "",
        clientId: "",
        isDebug: !1,
        expVersionId: void 0,
        defVars: {},
        varsData: {},
        versionPV: {},
        tags: null,
        timeout: 3e3,
        minTimeout: 1e3,
        url: p.url,
        dataLoaded: !1,
        getExperimentsCallback: [],
        localStorageSupported: !0,
        vars: {
            get: function(n, r) {
                return r && r.noPV || i(e, {
                    varName: n
                }), t.varsData[n];
            }
        }
    };
    if (!(this instanceof c)) throw new Error("实例化ABTest错误");
    this._get = function(e) {
        return t[e];
    }, this._set = function(e, n) {
        t[e] = n;
    };
}

var p, u, g = function() {
    function e(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
    }
    function t(e, t) {
        return e << t | e >>> 32 - t;
    }
    function n(n, r, o, i, a, s) {
        return e(t(e(e(r, n), e(i, s)), a), o);
    }
    function r(e, t, r, o, i, a, s) {
        return n(t & r | ~t & o, e, t, i, a, s);
    }
    function o(e, t, r, o, i, a, s) {
        return n(t & o | r & ~o, e, t, i, a, s);
    }
    function i(e, t, r, o, i, a, s) {
        return n(t ^ r ^ o, e, t, i, a, s);
    }
    function a(e, t, r, o, i, a, s) {
        return n(r ^ (t | ~o), e, t, i, a, s);
    }
    function s(t, n) {
        t[n >> 5] |= 128 << n % 32, t[14 + (n + 64 >>> 9 << 4)] = n;
        var s, c, p, u, g, d = 1732584193, l = -271733879, f = -1732584194, m = 271733878;
        for (s = 0; s < t.length; s += 16) c = d, p = l, u = f, g = m, l = a(l = a(l = a(l = a(l = i(l = i(l = i(l = i(l = o(l = o(l = o(l = o(l = r(l = r(l = r(l = r(l, f = r(f, m = r(m, d = r(d, l, f, m, t[s], 7, -680876936), l, f, t[s + 1], 12, -389564586), d, l, t[s + 2], 17, 606105819), m, d, t[s + 3], 22, -1044525330), f = r(f, m = r(m, d = r(d, l, f, m, t[s + 4], 7, -176418897), l, f, t[s + 5], 12, 1200080426), d, l, t[s + 6], 17, -1473231341), m, d, t[s + 7], 22, -45705983), f = r(f, m = r(m, d = r(d, l, f, m, t[s + 8], 7, 1770035416), l, f, t[s + 9], 12, -1958414417), d, l, t[s + 10], 17, -42063), m, d, t[s + 11], 22, -1990404162), f = r(f, m = r(m, d = r(d, l, f, m, t[s + 12], 7, 1804603682), l, f, t[s + 13], 12, -40341101), d, l, t[s + 14], 17, -1502002290), m, d, t[s + 15], 22, 1236535329), f = o(f, m = o(m, d = o(d, l, f, m, t[s + 1], 5, -165796510), l, f, t[s + 6], 9, -1069501632), d, l, t[s + 11], 14, 643717713), m, d, t[s], 20, -373897302), f = o(f, m = o(m, d = o(d, l, f, m, t[s + 5], 5, -701558691), l, f, t[s + 10], 9, 38016083), d, l, t[s + 15], 14, -660478335), m, d, t[s + 4], 20, -405537848), f = o(f, m = o(m, d = o(d, l, f, m, t[s + 9], 5, 568446438), l, f, t[s + 14], 9, -1019803690), d, l, t[s + 3], 14, -187363961), m, d, t[s + 8], 20, 1163531501), f = o(f, m = o(m, d = o(d, l, f, m, t[s + 13], 5, -1444681467), l, f, t[s + 2], 9, -51403784), d, l, t[s + 7], 14, 1735328473), m, d, t[s + 12], 20, -1926607734), f = i(f, m = i(m, d = i(d, l, f, m, t[s + 5], 4, -378558), l, f, t[s + 8], 11, -2022574463), d, l, t[s + 11], 16, 1839030562), m, d, t[s + 14], 23, -35309556), f = i(f, m = i(m, d = i(d, l, f, m, t[s + 1], 4, -1530992060), l, f, t[s + 4], 11, 1272893353), d, l, t[s + 7], 16, -155497632), m, d, t[s + 10], 23, -1094730640), f = i(f, m = i(m, d = i(d, l, f, m, t[s + 13], 4, 681279174), l, f, t[s], 11, -358537222), d, l, t[s + 3], 16, -722521979), m, d, t[s + 6], 23, 76029189), f = i(f, m = i(m, d = i(d, l, f, m, t[s + 9], 4, -640364487), l, f, t[s + 12], 11, -421815835), d, l, t[s + 15], 16, 530742520), m, d, t[s + 2], 23, -995338651), f = a(f, m = a(m, d = a(d, l, f, m, t[s], 6, -198630844), l, f, t[s + 7], 10, 1126891415), d, l, t[s + 14], 15, -1416354905), m, d, t[s + 5], 21, -57434055), f = a(f, m = a(m, d = a(d, l, f, m, t[s + 12], 6, 1700485571), l, f, t[s + 3], 10, -1894986606), d, l, t[s + 10], 15, -1051523), m, d, t[s + 1], 21, -2054922799), f = a(f, m = a(m, d = a(d, l, f, m, t[s + 8], 6, 1873313359), l, f, t[s + 15], 10, -30611744), d, l, t[s + 6], 15, -1560198380), m, d, t[s + 13], 21, 1309151649), f = a(f, m = a(m, d = a(d, l, f, m, t[s + 4], 6, -145523070), l, f, t[s + 11], 10, -1120210379), d, l, t[s + 2], 15, 718787259), m, d, t[s + 9], 21, -343485551), 
        d = e(d, c), l = e(l, p), f = e(f, u), m = e(m, g);
        return [ d, l, f, m ];
    }
    function c(e) {
        var t, n = "", r = 32 * e.length;
        for (t = 0; t < r; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n;
    }
    function p(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
        var r = 8 * e.length;
        for (t = 0; t < r; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n;
    }
    function u(e) {
        return c(s(p(e), 8 * e.length));
    }
    function g(e, t) {
        var n, r, o = p(e), i = [], a = [];
        for (i[15] = a[15] = void 0, o.length > 16 && (o = s(o, 8 * e.length)), n = 0; n < 16; n += 1) i[n] = 909522486 ^ o[n], 
        a[n] = 1549556828 ^ o[n];
        return r = s(i.concat(p(t)), 512 + 8 * t.length), c(s(a.concat(r), 640));
    }
    function d(e) {
        var t, n, r = "0123456789abcdef", o = "";
        for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), o += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
        return o;
    }
    function l(e) {
        return unescape(encodeURIComponent(e));
    }
    function f(e) {
        return u(l(e));
    }
    function m(e) {
        return d(f(e));
    }
    function v(e, t) {
        return g(l(e), l(t));
    }
    function h(e, t) {
        return d(v(e, t));
    }
    return function(e, t, n) {
        return t ? n ? v(t, e) : h(t, e) : n ? f(e) : m(e);
    };
}(), d = function() {
    function e() {
        var e = new Date().getTime();
        e = (e %= 16).toString(16);
        var t = Math.floor(65536 * (1 + Math.random())).toString(16).substring(1), n = parseInt(4 * Math.random()), r = t.split("");
        return r[n] = e, r.join("");
    }
    var t = "" + new Date().getTime();
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + t.substring(1);
};

p = {
    storageKey: "testinABWeAppStorage",
    localVersion: "v1.0.3",
    url: "https://abapi.testin.cn",
    expUrl: "/abtest-api/api/getexperiment",
    trackUrl: "/abtest-api/api/sendlog",
    errUrl: "/abtest-api/api/senderrorlog",
    packageName: "cn.testin.ab.weapp",
    sdkVersion: "v3.1.2",
    asyncTime: 20,
    maxUploadCount: 10
}, function() {
    u = {};
    try {
        var e = wx.getSystemInfoSync(), t = e.system.split(" ");
        u.os = {
            name: t[0].toLocaleLowerCase(),
            version: t[1].toLocaleLowerCase()
        }, u.language = e.language, u.weAppSDKVersion = e.SDKVersion, u.appVersion = "_", 
        u.device = {
            screenWidth: e.screenWidth,
            screenHeight: e.screenHeight,
            model: e.model
        }, u.deviceType = e.platform;
    } catch (e) {
        u.os = {}, u.device = {}, u.language = "", u.country = "", u.weAppSDKVersion = "", 
        u.appVersion = "_";
    }
}(), c.prototype = {
    constructor: c,
    init: function(t, n) {
        var r = this;
        if (!t) throw new Error("appKey required");
        var o;
        try {
            o = wx.getStorageSync(p.storageKey);
        } catch (t) {}
        if (!o || o.version != p.localVersion) {
            o = e();
            try {
                wx.setStorageSync(p.storageKey, o);
            } catch (t) {}
        }
        n || (n = o.clientId), r._set("appKey", t), r._set("clientId", n);
    },
    setDefVars: function(e) {
        var t = this._get("defVars"), n = this._get("varsData");
        for (var r in e) t[r] = e[r], n[r] = e[r];
    },
    setTags: function(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        this._set("tags", t);
    },
    setTimeout: function(e) {
        return isNaN(e) || e < this._get("minTimeout") ? this._set("timeout", this._get("minTimeout")) : void this._set("timeout", e);
    },
    setUrl: function(e) {
        "/" == e.substr(e.length - 1) && (e = e.substr(0, e.length - 1)), this._set("url", e);
    },
    getVars: function(e) {
        function t(t) {
            o || (o = !0, setTimeout(function() {
                e && e(t);
            }, p.asyncTime));
        }
        if (e = e || function() {}, !this._get("appKey")) throw new Error("请先调用init方法设置appKey");
        var n = this, o = !1;
        this._get("localStorageSupported") ? (setTimeout(function() {
            t(n._get("vars"));
        }, this._get("timeout")), r(this, t)) : t(this._get("vars"));
    },
    getExperiments: function(e) {
        function t() {
            setTimeout(function() {
                for (var t = n._get("data"), r = (t = t || {}).exps || [], o = [], i = "CONTROL", a = 0; a < r.length; a++) {
                    var s = {
                        layerId: r[a].layerId,
                        layerName: r[a].layerName,
                        expId: r[a].expId,
                        expName: r[a].expName,
                        expVersionId: r[a].componentsKey,
                        expVersionName: r[a].expVersionName
                    };
                    r[a].componentsKey || (s.expId = i, s.expName = i, s.expVersionId = i, s.expVersionName = i), 
                    o.push(s);
                }
                e(o);
            }, p.asyncTime);
        }
        var n = this;
        this._get("localStorageSupported") ? this._get("dataLoaded") ? t() : this._get("getExperimentsCallback").push(t) : t();
    },
    track: function() {
        function e() {
            t && (s || (s = !0, setTimeout(function() {
                t();
            }, p.asyncTime)));
        }
        var t, n = arguments, r = {};
        if ("string" == typeof n[0]) {
            if (!n[1] || "function" == typeof n[1]) return;
            r[n[0]] = n[1], 3 == n.length && (t = n[2]);
        } else {
            for (var o in n[0]) n[0][o] && (r[o] = n[0][o]);
            2 == n.length && (t = n[1]);
        }
        var s = !1;
        if (!this._get("localStorageSupported")) return e();
        if (!this._get("dataLoaded")) return e();
        setTimeout(function() {
            e();
        }, this._get("timeout"));
        for (var c in r) i(this, {
            opName: c
        });
        a(this, r, e);
    },
    getVersion: function() {
        return p.sdkVersion;
    }
}, module.exports = new c();