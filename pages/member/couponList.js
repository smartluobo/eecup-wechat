
 var o = require("../../utils/api.js"),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js');

var app = getApp();
Page({
    data: {
        curHdIndex: 0,
        curBdIndex: 0,
        validCurPage: 1,
        usedCurPage: 1,
        overdueCurPage: 1,
        validList: [],
        usedList: [],
        overdueList: [],
        currentList: [],
        // uuid: util.generateUUID()
    },
    onLoad: function(options) {
        this.getCouponList();
        if(options.type=='1'){
            this.setData({
                curHdIndex:'1',
            })
        }
    },
    // //下拉刷新
    // onPullDownRefresh() {
    //     var self = this;
    //     let curHdIndex=this.data.curHdIndex;
    //     setTimeout(() => {
    //         self.data.curHdIndex == curHdIndex
    //         self.getCouponList();
    //         //停止下拉刷新
    //         wx.stopPullDownRefresh();
    //     }, 500);
    // },

    getCouponList: function() {
        let that = this;
        var oppenid = wx.getStorageSync('oppenid');
        var storeid = wx.getStorageSync('storeid');
        util.request(api.GetUserCoupons, {
        oppenId: oppenid,
        storeId: storeid,
        useWay:0
        }, 'POST').then(function(res) {
            console.info(res.data)
            if (res.code == 200 && res.data) {
                that.setData({
                    currentList0:res.data,
                    CouponCount0:res.data.length
                });
                if(that.data.curHdIndex==0){
                    that.setData({
                        currentList:res.data
                    });
                }
            }
        });
        util.request(api.GetUserCoupons, {
            oppenId: oppenid,
            storeId: storeid,
            useWay:1
            }, 'POST').then(function(res) {
                console.info(res.data)
                if (res.code == 200 && res.data) {
                    that.setData({
                        currentList1:res.data,
                        CouponCount1:res.data.length
                    });
                    if(that.data.curHdIndex==1){
                        that.setData({
                            currentList:res.data
                        });
                    }
                }
            });
    },
    tab: function(e) {
        //0商城劵  1门店券
        wx.pageScrollTo({
            scrollTop: 0
        })
        let dataId = e.currentTarget.id;
        this.setData({
            curHdIndex: dataId,
            curBdIndex: dataId,
        })
        if (dataId == 0) {
            this.setData({ currentList: this.data.currentList0})
        } else if (dataId == 1) {
            this.setData({ currentList: this.data.currentList1})
        }
    },
    // //下拉刷新
    // onReachBottom: function() {
    //     let curHdIndex = this.data.curHdIndex;
    //     if (curHdIndex == 0) {
    //         this.getCouponList(this.data.validCurPage, curHdIndex)
    //     } else if (curHdIndex == 1) {
    //         this.getCouponList(this.data.usedCurPage, curHdIndex)
    //     } else if (curHdIndex == 2) {
    //         this.getCouponList(this.data.overdueCurPage, curHdIndex)
    //     }
    // },
    // toUse(e) {
    //     //tab栏页面，不支持传递参数。后台返回了优惠券id,本来打算是传到h5页面，然后传到后台方便统计的。
    //     let link = e.currentTarget.dataset.link;
    //     let use_range = e.currentTarget.dataset.useRange;
    //     let couponId = e.currentTarget.dataset.couponId;
    //     let useRangeTarget = e.currentTarget.dataset.useRangeTarget;
    //     if (use_range != 0) {
    //         if (use_range == 1) { //跳转商品
    //             wx.navigateTo({
    //                 url: "/pages/goodsDetails/goodsDetails?id=" + useRangeTarget
    //             });
    //         } else {
    //             wx.navigateTo({
    //                 url: "/pages/couponUseRange/couponUseRange?couponId=" + couponId
    //             });
    //         }
    //     };
    //     if (link) {
    //         if (link.indexOf('/pages/webView/webView') != -1) {
    //             wx.switchTab({
    //                 url: "/pages/webView/webView"
    //             });
    //         }
    //     }

    // }
})