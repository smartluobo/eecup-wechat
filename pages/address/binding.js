//logs.js
// const util = require('../../utils/util.js')
// const req = require('../../utils/request/index.js');
// const util = require('../../utils/util.js');
// var mta = require('../../utils/mta_analysis.js');
var util = require('./../../utils/mydev/util.js'),
    api = require('./../../utils/mydev/api.js')
var app = getApp();
Page({
    data: {
        time: '获取验证码', //倒计时 
        currentTime: 61,
        uid: '',
    },
    onLoad: function (option) {
        let that = this;
                
           
        wx.getStorage({
            key: "uid",
            complete: function (res) {
                if (res.data) {
                    that.setData({
                        uid: res.data
                    });
                }

            }
        });
    },

    userTell: function (e) {
        this.setData({
            tell: e.detail.value
        })
    },
    Verification: function (e) {
        this.setData({
            Verification: e.detail.value
        })
    },
    sendCode: function () {
        var that = this;
        let tell = this.data.tell;
        let reg = /^1\d{10}$/;
        if (!tell) {
            wx.showToast({
                title: '请先填写手机号码',
                icon: "none",
            });
        } else if (!reg.test(tell)) {
            wx.showToast({
                title: '请填写正确的手机号',
                icon: "none",
            });
        } else {
            util.request(api.SendVerificationCode, {
                phoneNum: tell
            }, 'POST').then(function (res) {
                if (res.code === 200) {
                    that.setData({
                        disabled: true
                    })
                    wx.showToast({
                        title: '发送成功',
                        icon: "none",
                    });
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon: "none",
                    });
                }
            });





            // let data = {
            //     mobile: tell,
            //     smsType: 'webRegAndLogin', //注册账号
            //     token: res.token,
            //     reqId: that.data.uuid
            // }
            // req.user.SendVerificationCode(data).then((res) => {
            //     if (res.code == '200') {
            //         that.setData({
            //             userInfo: res.result
            //         });
            //         if (res.result.resultCode == '01') {
            //             
            //             
            //             that.getCode();
            //         } else {
            //             wx.showToast({
            //                 title: res.result.resultMsg,
            //                 icon: "none",
            //             });
            //         }
            //     } 
            // });

        }
    },
    getCode() {
        var that = this;
        let tell = this.data.tell;
        let reg = /^1\d{10}$/;
        if (!tell) {
            wx.showToast({
                title: '请先填写手机号码',
                icon: "none",
            });
            return false;
        } else if (!reg.test(tell)) {
            wx.showToast({
                title: '请填写正确的手机号',
                icon: "none",
            });
            return false;
        }
        var currentTime = that.data.currentTime;
        let interval = setInterval(function () {
            currentTime--;
            that.setData({
                time: currentTime + '秒',
                disabled: true
            })
            if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                    time: '重新发送',
                    currentTime: 61,
                    disabled: false
                })
            }
        }, 1000)
    },
    //登录
    login() {
        var that = this;
        let tell = this.data.tell;
        let verification = this.data.Verification;
        let uid = this.data.uid;
        let reg = /^1\d{10}$/;
        if (!tell) {
            wx.showToast({
                title: '请先填写手机号码',
                icon: "none",
            });
            return false;
        } else if (!reg.test(tell)) {
            wx.showToast({
                title: '请填写正确的手机号',
                icon: "none",
            });
            return false;
        } else if (!verification) {
            wx.showToast({
                title: '验证码不能为空!',
                icon: "none",
            });
            return false;
        }
        var oppenid = wx.getStorageSync('oppenid');
        util.request(api.bindPhoneNum, {
            phoneNum: tell,
            oppenId: oppenid,
            verificationCode:verification
        }, 'POST').then(function (res) {
            if (res.code === 200) {
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2]; //上一个页面
                console.info(prevPage)
                //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                
                if(prevPage.route=='pages/member/center'){
                    prevPage.setData({
                        ['userDetails.userBindPhoneNum']: tell
                    });
                }else{
                    prevPage.setData({
                        ['order.phoneNum']: tell
                    });
                }
                wx.navigateBack({
                  delta: 1,
                })
            }
        });
    },


})