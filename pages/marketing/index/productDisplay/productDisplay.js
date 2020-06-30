// pages/marketing/index/productDisplay/productDisplay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dia_show: false, //弹窗口输入手机号的展示
  },
  myphoneChang(event) {
    this.setData({
      Myphone: event.detail
    })
  },
  /*
   * 获取用户手机号
   */
  getUserPhone(event) {
    let _this = this;
    let json = event.detail;
    if (app.globalData.tag == "emp") {
      //员工跳转
      wx.navigateTo({
        url: '/pages/marketing/index/myArdu/myArdu'
      });
    } else if (app.globalData.tag == "customer") {
      wx.showToast({
        title: '请您参加活动后再查看',
        icon: 'none',
        duration: 2000
      })
      // //用户跳转
      // wx.navigateTo({
      //   url: '/pages/clientSide/index/myArdu/myArdu'
      // });
    } else {
      _get("/userScanCode/wxUserInfo/" + app.globalData.code).then(res => {
        json['session_key'] = res.data.responseBody.session_key;
        _post("/userScanCode/binding/phoneNumber", json).then(res => {
          console.log("手机号", res.data.responseBody)
          //登录
          wx.request({
            url: "https://u2.ardu.cn/crms-admin/login/auth",
            data: {
              'userPhone': res.data.responseBody
            },
            method: 'POST',
            success: function (res) {
              let data = res.data.responseBody;
              if (data.tag) {
                wx.setStorageSync('token', data.token); //将userIdEnc存入本地缓存
                //emp 员工  
                let tag = data.tag;
                app.globalData.tag = tag; //全局用户权限
                if (app.globalData.tag == "emp") {
                  wx.navigateTo({
                    url: '/pages/marketing/index/myArdu/myArdu'
                  });
                } else if (app.globalData.tag == "customer") {
                  wx.showToast({
                    title: '请您参加活动后再查看',
                    icon: 'none',
                    duration: 2000
                  })
                  _this.setData({
                    dia_show: true
                  })
                }
              } else {
                wx.showToast({
                  title: res.data.responseBody,
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          })
        })
      })

    }
  },
  /**
   * 关闭弹出框
   */
  onClose() {
    this.setData({
      close: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // _this.searchActivited();
    // if (app.globalData.tag == "emp") {

    // } else if (app.globalData.tag == "customer") {

    // } else {
    //   _this.setData({
    //     dia_show: false
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    go(e) {//页面跳转
    let n = e.currentTarget.dataset.tab;
    switch (n) {
      case "1":
        wx.navigateTo({ url: '/pages/index/index'});
        break;
      case "2":
        wx.navigateTo({ url: '/pages/marketing/index/productDisplay/productDisplay' });
        break;
      case "3":
        wx.navigateTo({ url: '/pages/marketing/index/activityCenter/activityCenter' });
        break;
      case "4":
        if (app.globalData.tag == "emp") {
          //员工跳转
          wx.navigateTo({
            url: '/pages/marketing/index/myArdu/myArdu'
          });
        } else if (app.globalData.tag == "customer") {
          wx.showToast({
            title: '请您参加活动后再查看',
            icon: 'none',
            duration: 2000
          })
          // //用户跳转
          // wx.navigateTo({
          //   url: '/pages/clientSide/index/myArdu/myArdu'
          // });
        }
        // else {
        //   _this.setData({
        //     dia_show: true
        //   })
        // }
        break;
    }
  }
})