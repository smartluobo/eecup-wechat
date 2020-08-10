/**
 * 用户相关服务
 */

const util = require('./util.js');
const api = require('./api.js');


/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {
  console.info(userInfo)

  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code;
      wx.setStorageSync('userInfo', userInfo.userInfo);
      return userInfo;
    }).then((userInfo) => {
      let obj={
        code: code, 
        authorize : 1
      }
      if(!!wx.getStorageSync('referrerOppenId')){
        obj.referrerOppenId=wx.getStorageSync('referrerOppenId');
      }
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, obj, 'POST').then(res => {
        if (res.code === 200) {
          if(!!wx.getStorageSync('referrerOppenId')){
            wx.removeStorageSync('referrerOppenId');
          }
          let oppenid=res.data;
          console.info(userInfo.userInfo)
          //存储用户信息
          // wx.setStorageSync('userInfo', res.data.userInfo);
          // wx.setStorageSync('token', res.data.token);
          // wx.setStorageSync('userId', res.data.userId);
          wx.setStorageSync('oppenid', res.data);
          util.request(api.reportUserInfo, {
        oppenId: oppenid,
        nickName:userInfo.userInfo.nickName,
        userHeadImage:userInfo.userInfo.avatarUrl,
      }, 'POST').then(function (res) {
        if (res.code==200){
        }
      })
          resolve(userInfo);
        } else {
          // util.showErrorToast(res.errmsg)
          reject(res);
        }






      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('oppenid') && wx.getStorageSync('storeid')) {
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  checkLogin,
};











