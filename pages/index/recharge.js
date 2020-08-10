function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = e(require("../../service/coupon.js")), 
o = e(require("./../../config/config.js")),
util = require('./../../utils/mydev/util.js'),
api = require('./../../utils/mydev/api.js'),
 t = require("../../utils/monitor/monitor.js");

Page({
    data: {
        getCode:'',
        curHdIndex:'0',
        inputValue:''
    },
    onLoad: function(e) {
        t.onLoad(this);
    },
    onReady: function() {
        
    },
     // 拿到手机号
    getCode: function (e) {
        var val = e.detail.value;
        this.setData({
            couponsCode: val
        });
    },
    tab: function(e) {
        //0充值卡充值  1现金充值
        wx.pageScrollTo({
            scrollTop: 0
        })
        let dataId = e.currentTarget.id;
        console.info(dataId)
        this.setData({
            curHdIndex: dataId
        })
    },
    search(){
        if(!this.data.couponsCode){
            wx.showToast({
                title: '请先输入劵码~',
                icon: 'none',
                duration: 1500
            }); 
            return
        }else if(this.data.couponsCode.length!=10){
            wx.showToast({
                title: '券码已被使用或不存在~',
                icon: 'none',
                duration: 1500
            }); 
            return
        }
        let that = this;
        var oppenid = wx.getStorageSync('oppenid');
        let couponsCode=that.data.couponsCode;
        util.request(api.findShoppingCardInfo, {
          oppenId: oppenid,
          couponsCode: couponsCode
        }, 'POST').then(function(res) {
          if (res.code ==200) {
            console.log(res);
            if(res.data.useStatus==0){
                that.setData({
                    couponsInfo: res.data,
                })
                console.info('dsfdsg')
            }else{
                wx.showToast({
                    title: '优惠劵已被使用~',
                    icon: 'none',
                    duration: 1500
                });
            }
          }else{
            wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 1500
            });
          }
        })   
    },
    //领取
    getCoupon(){
        if(!this.data.couponsCode){
            wx.showToast({
                title: '请先输入劵码~',
                icon: 'none',
                duration: 1500
            }); 
            return
        }else if(this.data.couponsCode.length!=10){
            wx.showToast({
                title: '券码已被使用或不存在~',
                icon: 'none',
                duration: 1500
            }); 
            return
        }
        let that = this;
        var oppenid = wx.getStorageSync('oppenid');
        let couponsCode=that.data.couponsCode;
        util.request(api.rechargeByShoppingCard, {
          oppenId: oppenid,
          couponsCode: couponsCode
        }, 'POST').then(function(res) {
          if (res.code === 200) {
            wx.showModal({
                content: '领取成功~',
                cancelText:'继续兑换',
                confirmText:'去查看',
                success (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                        url: "/pages/member/couponList"
                      });
                  } else if (res.cancel) {
                    that.setData({
                        couponsCode:'',
                        couponsInfo:null,
                        inputValue:''
                    })
                    console.log('用户点击取消')
                  }
                }
              })
          }else{
            wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 1500
            });
          }
        })   
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},

});