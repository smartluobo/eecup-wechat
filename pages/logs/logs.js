var t = require("../../utils/util.js"), o = require("../../utils/monitor/monitor.js");

Page({
    data: {
        logs: []
    },
    onLoad: function() {
        this.setData({
            logs: (wx.getStorageSync("logs") || []).map(function(o) {
                return t.formatTime(new Date(o));
            })
        }), o.onLoad(this);
    }
});