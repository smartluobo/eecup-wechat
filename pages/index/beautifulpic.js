function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var i = t(require("./../../utils/api.js")), e = t(require("./../../utils/util.js")), n = t(require("./../../utils/promise/es6-promise.min.js")), a = require("./../../utils/qrcode.js"), o = require("../../utils/monitor/monitor.js");

Page({
    data: {
        canvasHidden: !1,
        maskHidden: !0,
        imagePath: "",
        placeholder: "",
        qrLink: "",
        imgUrls: [],
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 500,
        current: 0,
        swiperHeight: 0,
        footerFlag: !1,
        productList: []
    },
    cancelHander: function() {
        wx.navigateBack();
    },
    savePic: function() {
        var t = this;
        wx.getSetting({
            success: function(i) {
                i.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                    filePath: t.data.productList[t.data.current],
                    success: function() {
                        wx.showToast({
                            title: "保存成功"
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "保存失败",
                            icon: "none"
                        });
                    }
                }) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.data.productList[t.data.current],
                            success: function() {
                                wx.showToast({
                                    title: "保存成功"
                                });
                            },
                            fail: function() {
                                wx.showToast({
                                    title: "保存失败",
                                    icon: "none"
                                });
                            }
                        });
                    },
                    fail: function() {
                        t.setData({
                            openSet: !0
                        });
                    }
                });
            }
        }), this.data.imgUrls && this.data.imgUrls.length > 0 && o.event("generatepic_ck_savepicture", {
            pic_id: this.data.imgUrls[this.data.current].picId,
            from_page: this.options.pageFrom
        });
    },
    changeHander: function(t) {
        t && t.detail && this.setData({
            current: t.detail.current
        });
    },
    savePicList: function(t, i) {
        var e = this;
        wx.canvasToTempFilePath({
            canvasId: t,
            fileType: "jpg",
            quality: 1,
            success: function(t) {
                var i = e.data.productList;
                i.push(t.tempFilePath), e.setData({
                    productList: i
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        }, this);
    },
    dealOnePic: function(t) {
        var i = 2e3 * this.data.sysData.windowWidth / 1125, e = this.data.picListRes.qrPosterH5Config.marginTop * i / 2e3, n = this.data.picListRes.qrPosterH5Config.marginLeft * this.data.sysData.windowWidth / 1125, a = this.data.picListRes.qrPosterH5Config.width * this.data.sysData.windowWidth / 1125, o = 66 * this.data.sysData.windowWidth / 1125, s = e + (a - o) / 2, c = n + (a - o) / 2, r = this;
        wx.downloadFile({
            url: this.data.picListRes.posterImgUrls[t].picUrl,
            success: function(u) {
                var d = wx.createCanvasContext("canvas-" + t, this);
                d.drawImage(u.tempFilePath, 0, 0, r.data.sysData.windowWidth, i), d.drawImage(r.data.qrLink, n, e, a, a), 
                d.drawImage("./../../resources/images/index/icon_qrcode_logo.png", c, s, o, o), 
                d.draw(!1, function() {
                    r.savePicList("canvas-" + t, t), t < 6 && r.dealOnePic(++t);
                }), wx.hideLoading(), r.setData({
                    footerFlag: !0
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "轮播图下载失败",
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    dealList: function() {
        var t = this;
        this.getPicList().then(function(i) {
            i && t.getShareContent().then(function(e) {
                try {
                    t.buildQRCode(e, i.qrPosterH5Config.width), t.dealOnePic(0), t.setData({
                        imgUrls: i.posterImgUrls
                    });
                } catch (t) {}
            });
        });
    },
    getPicList: function() {
        var t = this;
        return new n.default(function(e, n) {
            i.default.ajax({
                url: "/resource/m/user/invite/qrposterh5",
                options: {
                    loading: !1
                }
            }).then(function(i) {
                i && i.content && i.content.posterImgUrls.length > 0 ? (t.setData({
                    picListRes: i.content
                }), e(i.content)) : (wx.showToast({
                    title: "海报列表为空",
                    icon: "none",
                    mask: !0
                }), wx.hideLoading());
            }).catch(function(t) {
                wx.showToast({
                    title: "获取海报列表失败",
                    icon: "none",
                    mask: !0
                }), n(), wx.hideLoading();
            });
        });
    },
    getShareContent: function() {
        var t = this;
        return new n.default(function(e, n) {
            var a = t;
            i.default.ajax({
                url: "/resource/m/user/invite/shareContent",
                data: {
                    target: a.options.target,
                    activityNo: a.options.activityNo,
                    from: a.options.locationType
                },
                options: {
                    loading: !1
                }
            }).then(function(i) {
                i && i.content && (t.setData({
                    shareRes: i.content.shareContents[0]
                }), e(i.content.shareContents[0]));
            }).catch(function(t) {
                wx.showToast({
                    title: "获取分享数据失败",
                    icon: "none",
                    mask: !0
                }), n(), wx.hideLoading();
            });
        });
    },
    buildQRCode: function(t, i) {
        var n = this, o = t.shareLink + "&title=" + encodeURIComponent(t.shareTitle) + "&timestamp=" + Date.now(), s = a.createQrCodeImg(o, {
            size: i
        });
        e.default.base64src(s).then(function(t) {
            n.setData({
                qrLink: t
            });
        });
    },
    getSystem: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(i) {
                var e = 2e3 * i.windowWidth / 1125;
                t.setData({
                    swiperHeight: e,
                    sysData: i
                }), t.dealList();
            },
            fail: function(t) {
                wx.showToast({
                    title: "获取系统数据失败，请重试",
                    icon: "none",
                    mask: !0
                }), wx.hideLoading();
            }
        });
    },
    onLoad: function(t) {
        o.onLoad(this), wx.showLoading({
            title: "加载中..."
        }), this.getSystem();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});