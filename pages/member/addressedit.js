var a = require("../../utils/api.js"),
  t = require("../../utils/util.js"),
  e = getApp(),
  user = require('./../../utils/mydev/user.js'),
  util = require('./../../utils/mydev/util.js'),
  api = require('./../../utils/mydev/api.js'),
  s = require("../../utils/monitor/monitor.js");

Page({
  data: {
    fromPage: null,
    addressTagList: null,
    dulplication: !1,
    addressCountLimit: -1,
    allowAddAddress: !0,
    showUserNameClear: !1,
    showTelClear: !1,
    showAddrDetailCleaer: !1,
    saveBtnEnable: !1,
    addrId: null,
    userName: "",
    sex: "",
    tel: "",
    address: "",
    addrDetail: "",
    lon: "",
    lat: "",
    tag: "",
    isDefault: 0,
    clearTelFlag: !1,
    showMsgCodeClear: !1,
    msgCode: null,
    clearMsgCodeFlag: !1,
    codename: '获取验证码',
    iscode: !1,
    disabled: !1,
    selectAddress: [],
    houseNumber: ""
  },
  loadGlobalData: function() {
    this.data.tel || this.setData({
      tel: this.data.addrId || !e.globalData.mobile || this.data.clearTelFlag ? "" : e.globalData.mobile
    });
  },
  clearInputData: function() {
    this.setData({
      addrId: null,
      userName: "",
      sex: 2,
      tel: "",
      address: "",
      houseNumber: "",
      addrDetail: "",
      lon: "",
      lat: "",
      tag: "",
      isDefault: "",
      isIpx: !1
    }), e.globalData.nearbyAddressInfo = null, e.globalData.searchAddressInfo = null;
  },
  userNameInputHandler: function(a) {
    var e = t.trim(a.detail.value);
    this.setData({
      userName: e,
      showUserNameClear: null !== e
    }), 
    this.toggleSubmitBtnStatus();
  },
  userNameFocusHandler: function() {
    null !== this.data.userName && this.data.userName.length > 0 ? this.setData({
      showUserNameClear: !0
    }) : this.setData({
      showUserNameClear: !1
    });
  },
  userNameBlurHandler: function() {
    this.setData({
      showUserNameClear: !1
    });
  },
  userNameClearHandler: function(a) {
    this.setData({
      userName: "",
      showUserNameClear: !1
    }), this.toggleSubmitBtnStatus();
  },
  telInputHandler: function(a) {
    var t = a.detail.value;
    (t = (t = t.replace(/\D/g, "")).replace(/^86/, "")).length > 11 && (t = this.data.tel),
      this.setData({
        tel: t,
        clearTelFlag: !1,
        showTelClear: null !== t
      }), this.toggleSubmitBtnStatus();
  },

  msgCodeInputHandler: function (a) {
    var t = a.detail.value;
      this.setData({
        msgCode: t,
        clearMsgCodeFlag: !1,
        showMsgCodeClear: null !== t
      }), this.toggleSubmitBtnStatus();
  },





  telFocusHandler: function() {
    null !== this.data.tel && this.data.tel.length > 0 ? this.setData({
      showTelClear: !0
    }) : this.setData({
      showTelClear: !1
    });
  },
  telBlurHandler: function() {
    this.setData({
      showTelClear: !1
    });
  },

  msgCodeBlurHandler: function () {
    this.setData({
      showMsgCodeClear: !1
    });
  },

  telClearHandler: function(a) {
    this.setData({
      tel: "",
      clearTelFlag: !0,
      showTelClear: !1
    }), this.toggleSubmitBtnStatus();
  },


  msgCodeClearHandler: function (a) {
    this.setData({
      msgCode: "",
      clearMsgCodeFlag: !0,
      showMsgCodeClear: !1
    }), this.toggleSubmitBtnStatus();
  },

  addrDetailInputHandler: function(a) {
    var e = t.trim(a.detail.value);
    this.setData({
      houseNumber: e,
      showAddrDetailClear: null !== e
    }), this.toggleSubmitBtnStatus();
  },
  addrDetailFocusHandler: function() {
    null !== this.data.houseNumber && this.data.houseNumber.length > 0 ? this.setData({
      showAddrDetailClear: !0
    }) : this.setData({
      showAddrDetailClear: !1
    });
    this.toggleSubmitBtnStatus();
  },
  addrDetailBlurHandler: function() {
    this.setData({
      showAddrDetailClear: !1
    });
    this.toggleSubmitBtnStatus();
  },
  addrDetailClearHandler: function(a) {
    this.setData({
      houseNumber: "",
      showaddrDetailClear: !1
    }), this.toggleSubmitBtnStatus();
  },
  addressTagClickHandler: function(a) {
    var t = a.target.dataset.tagid;
    this.setData({
      tag: t
    }), this.toggleSubmitBtnStatus();
  },
  sexClickHandler: function(a) {
    var t = a.currentTarget.dataset.sex;
    this.setData({
      sex: 1 * t
    }), this.toggleSubmitBtnStatus();
  },
  defaultClickHandler: function(a) {
    this.setData({
      isDefault: this.data.isDefault ? 0 : 1
    }), this.toggleSubmitBtnStatus();
  },
  gotoSelectAddress: function(a) {
    a.targetUrl = "/pages/member/addresssearch?from=addressedit", wx.navigateTo({
      url: a.targetUrl
    });
  },
  addressDeleteClickHandler: function(s) {
    var l = this;
    wx.showModal({
      title: "",
      content: "删除后信息将无法恢复，是否确定删除？",
      showCancel: !0,
      confirmColor: e.globalData.modal.confirmColor,
      cancelColor: e.globalData.modal.cancelColor,
      success: function(e) {
        var oppenid = wx.getStorageSync('oppenid');
        util.request(api.AddressDelete, {
          oppenId: oppenid,
          id: l.data.addrId
        }, 'POST').then(function (res) {
          if (res.code === 200) {
            t.toast("删除成功", "success", function () {
              wx.navigateBack();
            });
          } else {
            util.showErrorToast(res.msg);
            return false;
          }
        });
      }
    });
  },
  addressSaveClickHandler: function(e) {


    if (this.data.userName == '') {
      util.showErrorToast('请输入姓名');

      return false;
    }


    if (this.data.addrId == null ) {

      if (this.data.tel == '') {
        util.showErrorToast('请输入手机号码');
        return false;
      }

    }


    if (this.data.address == '') {
      util.showErrorToast('请输入地址');
      return false;
    }
    // if (this.data.addrDetail == '') {
    //   util.showErrorToast('请输入门牌号');
    //   return false;
    // }

    var oppenid = wx.getStorageSync('oppenid');
    var storeId = wx.getStorageSync('storeid');
    let that = this;
    var a = that.data.selectAddress;
    if (that.data.addrId) {
      util.request(api.AddressUpdate, {
        id: that.data.addrId,
        oppenId: oppenid,
        userName: that.data.userName,
        phoneNum: that.data.tel,
        addressName: that.data.address,
        houseNumber: that.data.houseNumber,
        storeId: storeId,
        isDefault: that.data.isDefault,
        verificationCode: that.data.msgCode,
        address: a.address,
        adname: a.adname,
        location: a.location,
        name: a.name,
      }, 'POST').then(function (res) {
        if (res.code === 200) {
          wx.navigateBack();
        }else {
          util.showErrorToast(res.msg);
          return false;
        }
      });
    }else {
      util.request(api.AddressSave, {
        oppenId: oppenid,
        userName: that.data.userName,
        phoneNum: that.data.tel,
        addressName: that.data.address,
        houseNumber: that.data.houseNumber,
        storeId: storeId,
        isDefault: that.data.isDefault,
        verificationCode: that.data.msgCode,
        address: a.address,
        adname: a.adname,
        location: a.location,
        name: a.name,
      }, 'POST').then(function (res) {
        if (res.code === 200) {
          wx.navigateBack();
        } else {
          util.showErrorToast(res.msg);
          return false;
        }
      });
    }






    // var s = this;
    // if (e && e.detail && a.collectFormId(e.detail.formId), this.data.saveBtnEnable)
    //   if (this.data.allowAddAddress) {
    //     var l = null !== this.data.addrId ? "/resource/m/user/address/update" : "/resource/m/user/address/add";
    //     a.ajax({
    //       url: l,
    //       data: {
    //         addrId: this.data.addrId,
    //         userName: this.data.userName,
    //         sex: this.data.sex,
    //         tel: this.data.tel,
    //         address: this.data.address,
    //         addrDetail: this.data.addrDetail,
    //         lon: this.data.lon,
    //         lat: this.data.lat,
    //         tag: this.data.tag,
    //         isDefault: this.data.isDefault ? 1 : 0
    //       }
    //     }).then(function(a) {
    //       a && "SUCCESS" === a.status && t.toast("保存成功", "success", function() {
    //         s.clearInputData(), wx.navigateBack();
    //       });
    //     });
    //   } else t.toast("您最多可添加" + this.data.addressCountLimit + "条地址");
  },


  loadAddressList: function() {
    var t = this;
    a.ajax({
      url: "/resource/m/user/address/list"
    }).then(function(a) {
      if (a && a.content) {
        t.setData({
          addressCountLimit: a.content.countLimt
        });
        var e = a.content.addrList,
          s = null;
        if (e && e.length > 0 && null !== t.data.addrId)
          for (var l in e)
            if (e[l].addrId === t.data.addrId) {
              s = e[l];
              break;
            }
        s && t.setData({
          dulplication: !0,
          addrId: s.addrId,
          userName: t.data.userName ? t.data.userName : s.userName,
          sex: t.data.sex ? t.data.sex : s.sexInt,
          tel: t.data.tel || t.data.clearTelFlag ? t.data.tel : s.tel,
          address: t.data.address ? t.data.address : s.address,
          houseNumber: t.data.houseNumber ? t.data.houseNumber : s.houseNumber,
          lon: t.data.lon ? t.data.lon : s.lon,
          lat: t.data.lat ? t.data.lat : s.lat,
          tag: t.data.tag ? t.data.tag : 1 * s.tagId,
          isDefault: "" === t.data.isDefault ? s.isDefault : t.data.isDefault
        }), null !== e && 0 !== e.length || null !== t.data.isDefault || t.setData({
          isDefault: 1
        }), t.toggleSubmitBtnStatus();
      }
    });
  },
  loadNearbyAddressDetail: function() {
    var a = e.globalData.nearbyAddressInfo;
    a && this.setData({
      address: a.name,
      lon: a.lon,
      lat: a.lat
    });
  },
  loadSearchAddressDetail: function() {
    var that = this;
    var a = e.globalData.searchAddressInfo;
    a && this.setData({
      address: a.name + " " + a.address,
      selectAddress: a
      // lon: a.lon,
      // lat: a.lat
    });




  },
  loadAddressTag: function() {
    var t = this;
    a.ajax({
      url: "/resource/m/sys/base/dicts"
    }).then(function(a) {
      a && a.content && t.setData({
        addressTagList: a.content
      });
    });
  },
  toggleSubmitBtnStatus: function() {
    "" !== this.data.userName && "" !== this.data.tel && t.isMobile(this.data.tel) && "" !== this.data.address ? this.setData({
      saveBtnEnable: !0
    }) : this.setData({
      saveBtnEnable: !1
    });
  },
  onLoad: function(a) {
    this.setData({
      isIpx: e.globalData.isIpx
    }), 

    this.barTitle = "修改地址", 

    a && a.from && this.setData({
      fromPage: a.from
    }), 

    a && a.addrid ? this.setData({
      addrId: 1 * a.addrid,
      dulplication: 1
    }) : (this.barTitle = "添加地址", this.setData({
      sex: 2
    })), 
    wx.setNavigationBarTitle({
      title: this.barTitle
    });
  },
  onReady: function() {},
  onShow: function() {
    a.scanHandler({
        title: this.barTitle || "添加地址",
        route: this.route
      });

    this.loadAddress();
      // this.loadGlobalData()
      // this.loadAddressList(), 
      // this.loadNearbyAddressDetail(),
      this.loadSearchAddressDetail();
      // this.loadAddressTag(), 
      // this.toggleSubmitBtnStatus();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return e.globalData.share;
  },


  loadAddress:function (){
    let that = this;
    var a = e.globalData.searchAddressInfo;
    if (a == null && that.data.addrId){
      util.request(api.AddressDetail, {
        id: that.data.addrId
      }, 'POST').then(function (res) {
        if (res.code === 200) {
            that.setData({
              userName: res.data.userName,
              houseNumber: res.data.houseNumber,
              tel: res.data.phoneNum,
              address: res.data.addressName,
              isDefault: res.data.isDefault,
              'selectAddress.adname': res.data.adname,
              'selectAddress.name': res.data.name,
              'selectAddress.address': res.data.address,
            });
        }
      });
    }
  },


  getCode: function () {
    var a = this.data.tel;
    var that = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.tel == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {

      var oppenid = wx.getStorageSync('oppenid');
      var storeId = wx.getStorageSync('storeid');

      util.request(api.SendVerificationCode, {
        oppenId: oppenid,
        phoneNum: that.data.tel,
      }, 'POST').then(function (res) {
        if (res.code === 200  ) {
          that.setData({
            iscode: 1
          })
          var num = 61;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              that.setData({
                codename: '重新发送',
                disabled: false
              })
            } else {
              that.setData({
                codename: num + "s"
              })
            }
          }, 1000)
     
          that.setData({
            disabled: true
          })

        }
      });


    }
  },
  //获取验证码
  getVerificationCode: function() {
    this.getCode();
  },




});