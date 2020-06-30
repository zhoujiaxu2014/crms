import {
  _post,
  _get
} from '../../../../utils/api'
import {
  formatTime
} from '../../../../utils/util'
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast'
var QQMapWX = require('../../../../pages/common/sdk/qqmap-wx-jssdk');
var qqmapsdk = new QQMapWX({
  key: '3JRBZ-LDYCP-KAADB-V25Q2-7IX7J-LTFJ5'
});
Page({
  data: {
    customerInfo: {
      customerName: '', //客户姓名
      customerPhone: '', //客户电话
      customerTag: '', //客户标签
      customerSource: '', //客户来源
      customerAddress: '', //客户地址
      fileId: '', //附件ID
      customerRemark: '', //备注信息
      customerDealerId: 0, //经销商ID 默认传0
      customerSalesId: 0, //销售ID 默认传0
      createdTime: "",
      customerLatitude: 0, //纬度
      customerLongitude: 0, //经度
      revision: 0, //乐观锁
      customerNickName: '', //用户昵称
      customerPortrait: '', //用户头像
      customerWxid: '', //微信id
      customer_receive: 0, //领取状态 默认传0
      activityId: 0,
      activityName: "",
      createdBy: "",
      customerId: 0,
      customerProvinceZone: 0,
      customerWarZone: "",
      updatedBy: "",
      updatedTime: "",
      customerReceive: 0,
      customerState: 0,
      recommendUserId: 0, //获取用户id
    },
    demondList: [{
      name: '全屋定制',
      id: 1,
      checked: false
    }, {
      name: '衣柜定制',
      id: 2,
      checked: false
    }, {
      name: '儿童房定制',
      id: 3,
      checked: false
    }, {
      name: '书房定制',
      id: 4,
      checked: false
    }, {
      name: '客餐厅定制',
      id: 5,
      checked: false
    }, {
      name: '厨房空间定制',
      id: 6,
      checked: false
    }, {
      name: '卧室定制',
      id: 7,
      checked: false
    }, {
      name: '榻榻米定制',
      id: 8,
      checked: false
    }, {
      name: '卫浴空间定制',
      id: 9,
      checked: false
    }],
    selectedDemondList: [],
  },
  go(e) {
    let num = e.currentTarget.dataset.num
    console.log(num)
    switch (num) {
      case "1":
        wx.navigateTo({
          url: '/pages/marketing/toker/customerScan/customerScan'
        });
        break;
      case "2":
        wx.navigateTo({
          url: '/pages/marketing/toker/productList/productList'
        });
        break;
    }
  },
  /**
   * 双向绑定客户姓名
   */
  setName(e) {
    this.setData({
      'customerInfo.customerName': e.detail.value
    })
  },
  /**
   * 双向绑定客户电话值
   */
  setPhone(e) {
    this.setData({
      'customerInfo.customerPhone': e.detail.value
    })
  },
  /**
   * 双向绑定客户地址
   */
  setAddr(e) {
    this.setData({
      'customerInfo.customerAddress': e.detail.value
    })
  },
  //获取定位
  getLocationList(){
    let self=this;
      wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度wgs84
          success: function (res) {
               console.log(res);
              var latitude = res.latitude//维度
              var longitude = res.longitude//经度
              qqmapsdk.reverseGeocoder({//腾讯地图api 逆解析方法 首先设计经纬度
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                success: function (addressRes) {
                  self.setData({
                    'customerInfo.customerAddress':addressRes.result.address
                  })
                  console.log('正确的城市名', addressRes.result.address)
                },
                fail: function (error) {
                 
                 },
                 complete: function (addressRes) {
                   wx.showToast({
                     title: addressRes,
                     icon: 'success',
                     duration: 2000
                   })
                 }
              })
              //逆解析成功回调函数
              
          }
      })
  },
  /**
   * 提交0元预约全屋定制
   */
  addCustomer(event) {
    let self = this;
    let isValidate = self.validateInfo();
    if (!isValidate) {
      return;
    }
    let shijian = formatTime(new Date());
    self.setData({
      'customerInfo.createdTime': shijian,
      'customerInfo.updatedTime': shijian,
      'customerInfo.customerTag': self.data.selectedDemondList.join(',')
    });
    // console.log('推荐人id', self.data.customerInfo);
    _post("/customersales/crms-customer/insertCustomer", self.data.customerInfo).then((res) => {
      let data = res.data;
      if (data.code === '10000') {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: function() {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }
        })
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none',
          duration: 2000
        })
        // console.log('提交客户信息失败，请联系开发人员解决');
      }
    }).catch((e) => {
      wx.showToast({
        title: '提交客户信息失败，请检查网络配置',
        icon: 'none',
        duration: 2000
      })
      // console.error('提交客户信息失败，请检查网络配置');
    });
  },
  /**
   * 提交前校验信息
   */
  validateInfo() {
    let self = this;
    let waitValidate = self.data.customerInfo;
    if (waitValidate.customerName === '') {
      wx.showToast({
        title: '您还未填写姓名，请完善后再提交',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (waitValidate.customerPhone === '') {
      wx.showToast({
        title: '您还未填写电话，请完善后再提交',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (waitValidate.customerPhone.length != 11) {
      wx.showToast({
        title: '请填写11位手机号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (waitValidate.customerAddress === '') {
      wx.showToast({
        title: '您还未填写地址，请完善后再提交',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (self.data.selectedDemondList.length <= 0) {
      wx.showToast({
        title: '您还未选择居家需求，请完善后再提交',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      return true;
    }
  },
  /*
   * 选择居家需求
   */
  selectDemond(event) {
    let self = this;
    let id = event.currentTarget.dataset.id;
    if (self.data.selectedDemondList.indexOf(id) === -1) {
      self.data.selectedDemondList.push(id);
      self.data.demondList[id - 1].checked = true;
      self.setData({
        selectedDemondList: self.data.selectedDemondList.sort(),
        demondList: self.data.demondList
      });
    } else {
      self.data.selectedDemondList.splice(self.data.selectedDemondList.indexOf(id), 1);
      self.data.demondList[id - 1].checked = false;
      self.setData({
        selectedDemondList: self.data.selectedDemondList,
        demondList: self.data.demondList
      });
    }
  },
   //页面初始加载
  onLoad: function(options) {
    this.getUserID();
    this.getNickName();
    this.getLocationList();
    let self = this;
    _get("/customersales/crms-activity/activity-info/" + options.activityId).then(res => {
      if (res.data.responseBody.activityBelong == 0) {
        self.setData({
          'customerInfo.customerSource': '企业活动'
        })
      } else {
        self.setData({
          'customerInfo.customerSource': '经销商活动'
        })
      }
    })
    // wx.showToast({
    //   title: '推荐人id:' + options.recommendUserId,
    //   icon: 'none',
    //   duration: 2000
    // })
    this.setData({
      ['customerInfo.activityId']: options.activityId == undefined ? '' : options.activityId,
      ['customerInfo.activityName']: options.activityName == undefined ? '' : options.activityName,
      // ['customerInfo.recommendUserId']: "0",//推荐人id
      ['customerInfo.recommendUserId']: options.recommendUserId, //推荐人id
    })
  },
  getUserID() {
    let self = this;


    //获取微信ID：baseInfo.customerWxid
    wx.login({
      success: res => {
        if (res.code) {
          _get("/customersales/userScanCode/wxUserInfo/" + res.code).then(res => {
            if (res.data.code === '10000') {
              let returnInfo = res.data.responseBody; //returnInfo.session_key用于获取手机号，暂时不用
              self.setData({
                'customerInfo.customerWxid': returnInfo.openId == null ? '' : returnInfo.openId
              }); //设置微信ID
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  /**
   * 获取用户信息
   */
  getNickName() {
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //已经授权，可以直接调用getUserInfo获取头像昵称
          wx.getUserInfo({
            success: res => {
              //可以将res发送给后台解码出unionId
              // this.globalData.userInfo = res.userInfo
              //由于getUserInfo是网络请求，可能会在Page.onLoad之后返回
              //所以此处加入callback以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onReady: function() {

  },
  onShow: function() {

  },
 
 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})