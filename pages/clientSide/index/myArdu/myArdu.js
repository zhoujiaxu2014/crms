import { _post, _get } from '../../../../utils/api'
let app = getApp()
import QRCode from '../../../../utils/weapp-qrcode.js'
// var menus  = require('../../../../components/zhuanpan/templateBar/menuList');
Page({
  data: {
    dialogShow: false,
    page: 1, //客户活动
    size: 10,
    notData: 1, //没有更多
    activeList: [],
    amountList: '',
    active: 0, //tab栏
    current: 1, //客户需求
    noMore: 0,//0--需求有数据；1--需求没数据
    roomPage: 1, //样板间
    roomList: [], //样板间
    imgList: [],
    noMoreRoom: 0, //我的样板间是否有数据
    notRoom: 0, //样板间列表是否有数据
    phone: '', //授权获取的手机号
    roles: '', //==39  为设计师权限  直接跳转到量尺页面
    isCustomer: true, //当前身份是否为客户
    new: false, //方案是否有更新
    //获取中奖列表
    winningList: '',

    rolesDesign:0,//

    // PageCur: "datas",
    // /* 声明菜单数据 */
    // menus: {}
  },
  /* ColorUI页面跳转方式 */
  // NavChange(e) {
  //   var cur = e.currentTarget.dataset.cur;
  //   if(cur){
  //     this.setData({
  //       PageCur: cur,
  //       "menus.activeUrl": cur
  //     })
  //   }
  // },

  /*
   *tab栏切换
   */
  //关闭二维码弹框
  closeQrcode() {
    this.setData({
      Qrshow: false,
    })
  },
  //查看兑奖麻
  lockQr(flag) {
    //获取兑奖码
    this.getPrizecode(flag.currentTarget.dataset.gid)
  },
  //生成二维码
  getQrCode(eqid) {
    new QRCode('myQrcode', {
      text: eqid,
      width: 200,
      height: 200,
      padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
      callback: (res) => {
        console.log(res.path)
      },
    })
  },
  //获取奖品code 领奖
  getPrizecode(id) {
    _get(`/customersales/reward-history/redemption/${id.rewardHistoryId}`)
      .then(({ data: res }) => {
        if (res.code == '10000') {
          let url =
            'https://crms.ardu.cn//crms-drm/html/logding.html?' +
            res.responseBody
          this.getQrCode(url)
          this.setData({
            Qrshow: true,
          })
        } else if (res.code == '20001') {
          //没完善信息的
          // 跳转到完善信息列表
          //完善信息
          //鸡蛋1 转盘0
          wx.navigateTo({
            url: `/pages/Perfectinformation/index?&id=${
              id.rewardHistoryId
            }&flag=${id.rewardState == '0' ? '0' : '1'}&activeID=${
              id.lotteryId
            }&orgid=${id.issuingOrgId}&phone=${this.data.phone}`,
          })
        } else {
          this.showlandingDialog = true
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000,
          })
        }
      })
      .catch((e) => {
        console.log(e)
        wx.showToast({
          title: '获取兑奖码失败',
          icon: 'none',
          duration: 2000,
        })
      })
  },
  changeTab: function (event) {
    let self = this
    self.setData({
      active: event.detail.index,
    })
    if (self.data.active == 0) {
      self.data.page = 1
      self.data.activeList = []
      self.searchList() //查询活动信息
    } else if (self.data.active == 1) {
      self.data.current = 1
      self.data.amountList = []
      // self.searchAmount() //查询需求信息
    } else {
      self.setData({
        roomPage: 0,
        roomList: [],
        imgList: [],
      })
      self.searchAllRoom() //查询所有样板间列表
      self.searchRoom() //查询样板间信息
      self.getPrize() //查询奖品信息
    }
  },
  //跳转需求页
  goToPage: function (e) {
    let self = this
    var n = e.currentTarget.dataset.type
    switch (n) {
      case '2':
        // _get(
        //   '/customersales/crms-customer-demand/findCustDem/' + this.data.phone
        // ).then((res) => {
        //   let data = res.data
        //   if (data.code === '10000') {
        //     if (res.data.responseBody == null) {
        //       wx.navigateTo({
        //         //不带返回
        //         url:
        //           '/pages/clientSide/index/myArdu/demandCollection/demandCollection?type=1',
        //       })
        //     } else {
        //       let num = e.currentTarget.dataset.type
        //       let id = e.currentTarget.dataset.id
        //       wx.navigateTo({
        //         //不带返回
        //         url:
        //           '/pages/clientSide/index/myArdu/demandCollection/demandCollection?type=' +
        //           num +
        //           '&deId=' +
        //           id +
        //           '&phone=' +
        //           this.data.phone,
        //       })
        //     }
        //   }
        // })
        // debugger
        // let num = e.currentTarget.dataset.type
        let id = e.currentTarget.dataset.id
        getApp().globalData.typeNum=1
        getApp().globalData.deId=id
        getApp().globalData.phoneNum=this.data.phone
        wx.switchTab({
          //不带返回
          url:
            '/pages/clientSide/index/myArdu/demandCollection/demandCollection'
        })
        break
      case '3':
        wx.navigateTo({
          url: '/pages/ruler/isruler/ruler',
        })
        break
      case '5': //我的方案
        wx.navigateTo({
          url: '/pages/my/chooicePlan/chooicePlan',
        })
        break
      case '6': //中奖纪录
        wx.navigateTo({
          url: '/pages/myPrince/myPrince',
        })
        break
      case '7': //我的活动
        wx.navigateTo({
          url: '/pages/myActivity/myActivity',
        })
        break
      case '8': //量房
        wx.navigateTo({
          url: '/pages/ruler/isruler/ruler',
        })
        break
      case '99':
        wx.navigateTo({
          url: '/pages/nearRoom/room',
        })
        break
    }
  },
  //获取奖品
  getPrize() {
    // debugger
    _get('/customersales/reward-history/listDetail')
      .then((res) => {
        console.log(res)
        if (res.data.code == '10000') {
          this.setData({
            winningList: res.data.responseBody,
          })
        } else {
          wx.showToast({
            title: '获取奖品信息失败！',
            icon: 'none',
          })
        }
      })
      .catch((err) => {
        console.log(err)
        wx.showToast({
          title: '获取奖品信息失败！',
          icon: 'none',
        })
      })
  },
  //跳转详情页
  gotoDetail(e) {
    let self = this
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:
        '/pages/marketing/index/roomDetail/roomDetail?cusid=' +
        id +
        '&flag=' +
        1,
    })
  },
  //跳转样板间
  goToRoom: function () {
    let self = this
    wx.navigateTo({
      url: '/pages/marketing/index/myRoom/myRoom',
    })
  },
  //授权
  getPhone: function (e) {
    let self = this
    let json = e.detail
    _get('/customersales/userScanCode/wxUserInfo/' + app.globalData.code)
      .then((res) => {
        json['session_key'] = res.data.responseBody.session_key
        if (res.data.responseBody.session_key == null) {
          wx.login({
            success: (res) => {
              app.globalData.code = res.code
              _get(
                '/customersales/userScanCode/wxUserInfo/' + app.globalData.code
              )
                .then((res) => {
                  json['session_key'] = res.data.responseBody.session_key
                  _post('/customersales/userScanCode/binding/phoneNumber', json)
                    .then((res) => {
                      // debugger
                      self.setData({
                        phone: res.data.responseBody,
                      })
                      app.globalData.phone = res.data.responseBody
                      self.searchAmount() //查询需求信息
                      //登录
                      wx.request({
                        url:'https://crms.ardu.cn/crmssw/crms-admin/login/auth',//线上地址
                        // url: "http://zlxkdev.ardu.cn:8888/crmssw/crmsadmin/login/auth", //测试地址
                        data: {
                          userPhone: res.data.responseBody,
                        },
                        method: 'POST',
                        success: function (res) {
                          if (res.data.code === '10000') {
                            let data = res.data.responseBody
                            wx.setStorageSync('token', data.token) //将userIdEnc存入本地缓存
                            let tag = data.tag
                            app.globalData.tag = tag //全局用户权限
                            app.globalData.Jurisdiction = tag //当前去aNXIAN
                            if (app.globalData.tag == 'emp') {
                              self.setData({
                                isCustomer: false,
                              })
                              wx.showToast({
                                title: '员工授权成功',
                                icon: 'none',
                                duration: 2000,
                              })
                              app.globalData.userID = data.user.userId //获取登录用户信息 用做分享 员工权限
                              // debugger
                              if (
                                data.user.roles == '9' ||
                                data.user.roles == '39' ||
                                data.user.roles == '9,39'
                              ) {
                                //量尺设计师 登录跳转
                                self.setData({
                                  roles: data.user.roles,
                                })
                                app.globalData.roles = data.user.roles
                                if(self.data.roles.indexOf('39')>-1){
                                  self.setData({
                                    rolesDesign: 1,//个人中心显示量尺按钮
                                  })
                                }
                                console.log(self.data.rolesDesign)
                                // wx.navigateTo({
                                //   url: '/pages/ruler/isruler/ruler',
                                // })
                              }
                            } else if (app.globalData.tag == 'customer') {
                              wx.showToast({
                                title: '授权成功',
                                icon: 'none',
                                duration: 1000,
                              })
                              app.globalData.userID = data.customer.customerId //获取登录用户信息 用做分享 客户权限
                              app.globalData.tag = true
                              self.setData({
                                dialogShow: false,
                              })
                              self.searchAmount() //查询需求信息
                              if (self.data.active == 0) {
                                self.searchList() //查询活动信息
                              } else if (self.data.active == 0) {
                                // self.searchAmount() //查询需求信息
                              } else {
                                self.searchRoom() //查询样板间信息
                                self.searchAllRoom() //查询所有样板间列表
                              }
                            } else {
                              wx.showToast({
                                title: '请您参加活动后再登录查看',
                                icon: 'none',
                                duration: 2000,
                              })
                              setTimeout(function () {
                                wx.switchTab({
                                  url: '/pages/index/index',
                                })
                              }, 1500)
                            }
                          } else {
                            wx.showToast({
                              title: '登录失败,请重新登录小程序授权',
                              icon: 'none',
                              duration: 2000,
                            })
                            setTimeout(function () {
                              self.setData({
                                dialogShow: true,
                              })
                            }, 2000)
                          }
                        },
                      })
                    })
                    .catch((err) => {
                      wx.showToast({
                        title: '登录失败,请重新登录小程序，重新授权',
                        icon: 'none',
                        duration: 2000,
                      })
                      setTimeout(function () {
                        self.setData({
                          dialogShow: true,
                        })
                      }, 1000)
                    })
                })
                .catch((err) => {
                  // wx.showToast({
                  //   title: '登录失败,请重新登录小程序，重新授权',
                  //   icon: 'none',
                  //   duration: 2000
                  // })
                  // setTimeout(function (){
                  //   self.setData({
                  //     dialogShow: true
                  //   })
                  // },1000)
                })
            },
          })
        } else {
          _post('/customersales/userScanCode/binding/phoneNumber', json)
            .then((res) => {
              self.setData({
                phone: res.data.responseBody,
              })
              app.globalData.phone = res.data.responseBody
              self.searchAmount() //查询需求信息
              //登录
              wx.request({
                url: 'https://crms.ardu.cn/crms-admin/login/auth', //线上地址
                // url: "https://u2.ardu.cn/crms-admin/login/auth", //线上地址
                // url: "http://zlxkdev.ardu.cn:8888/crmssw/crmsadmin/login/auth", //测试地址
                // url: "http://192.168.234.245:8084",
                data: {
                  userPhone: res.data.responseBody,
                },
                method: 'POST',
                success: function (res) {
                  console.log(res)
                  if (res.data.code === '10000') {
                    let data = res.data.responseBody
                    wx.setStorageSync('token', data.token) //将userIdEnc存入本地缓存
                    let tag = data.tag
                    app.globalData.tag = tag //全局用户权限
                    app.globalData.Jurisdiction = tag //当前去aNXIAN
                    if (app.globalData.tag == 'emp') {
                      self.setData({
                        isCustomer: false,
                      })
                      wx.showToast({
                        title: '员工授权成功',
                        icon: 'none',
                        duration: 2000,
                      })
                      app.globalData.userID = data.user.userId //获取登录用户信息 用做分享 员工权限
                      // debugger
                      if (
                        data.user.roles == '9' ||
                        data.user.roles == '39' ||
                        data.user.roles == '9,39'
                      ) {
                        //量尺设计师 登录跳转
                        self.setData({
                          roles: data.user.roles,
                        })
                        app.globalData.roles = data.user.roles
                        if(self.data.roles.indexOf('39')>-1){
                          self.setData({
                            rolesDesign: 1,//个人中心显示量尺按钮
                          })
                        }
                        console.log(self.data.rolesDesign)
                        // wx.navigateTo({
                        //   url: '/pages/ruler/isruler/ruler',
                        // })
                      }
                    } else if (app.globalData.tag == 'customer') {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'none',
                        duration: 2000,
                      })
                      self.setData({
                        dialogShow: false,
                      })
                      app.globalData.userID = data.customer.customerId //获取登录用户信息 用做分享 客户权限
                      _get(
                        '/crmsdesign/task/prompt/' + data.customer.customerId
                      ).then((res) => {
                        //提示信息
                        if (res.data.responseBody == 1) {
                          self.setData({
                            new: true,
                          })
                        }
                      })
                      app.globalData.tag = true
                      self.setData({
                        dialogShow: false,
                      })
                      self.searchAmount() //查询需求信息
                      if (self.data.active == 0) {
                        self.searchList() //查询活动信息
                      } else if (self.data.active == 1) {
                        // self.searchAmount() //查询需求信息
                      } else {
                        self.searchRoom() //查询样板间信息
                        self.searchAllRoom() //查询所有样板间列表
                      }
                    } else {
                      wx.showToast({
                        title: '请您参加活动后,再登录查看',
                        icon: 'none',
                        duration: 2000,
                      })
                      setTimeout(function () {
                        wx.switchTab({
                          url: '/pages/index/index',
                        })
                      }, 1500)
                    }
                  } else {
                    wx.showToast({
                      title: '登录失败,请重新登录小程序，重新授权',
                      icon: 'none',
                      duration: 2000,
                    })
                    setTimeout(function () {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }, 1500)
                  }
                },
              })
            })
            .catch((err) => {
              wx.showToast({
                title: '登录失败,请重新登录小程序，重新授权',
                icon: 'none',
                duration: 2000,
              })
              setTimeout(function () {
                self.setData({
                  dialogShow: true,
                })
              }, 1000)
            })
        }
      })
      .catch((err) => {
        // wx.showToast({
        //   title: '登录失败,请重新登录小程序，重新授权',
        //   icon: 'none',
        //   duration: 2000
        // })
        // setTimeout(function () {
        //   self.setData({
        //     dialogShow: true
        //   })
        // }, 1000)
      })
  },
  //查询客户活动信息
  searchList: function () {
    let self = this
    let jsonStr = {}
    jsonStr['current'] = self.data.page
    jsonStr['searchCount'] = true
    jsonStr['size'] = self.data.size
    jsonStr['total'] = 0
    _post('/customersales/crms-customer/getCustActPage', jsonStr)
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          self.setData({
            activeList: self.data.activeList.concat(data.responseBody.records),
          })
          self.data.page++
          if (self.data.activeList.length >= data.responseBody.total) {
            self.setData({
              notData: 1,
            })
          }
        } else {
          self.setData({
            notData: 1,
          })
        }
      })
      .catch(() => {
        // Toast.fail(`${data.message}`)
        self.setData({
          notData: 1,
        })
      })
  },
  //查询客户需求信息
  searchAmount: function () {
    // debugger
    let self = this
    // -this.data.phone
    _get('/customersales/crms-customer-demand/findCustDem/' + app.globalData.phone)
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          // if (data.responseBody == null) return false
          // self.setData({
          //   amountList: data.responseBody,
          // })
          if (data.responseBody == null||data.responseBody == '') {
            self.setData({
              noMore: 1,
            })
          } else {
            self.setData({
              noMore: 0,
              amountList: data.responseBody,
            })
          }
        } else {
          self.setData({
            noMore: 1,
          })
        }
      })
      .catch(() => {
        self.setData({
          noMore: 1,
        })
      })
  },
  //点击查看更多
  clickMoreRoom() {
    let self = this
    self.data.roomPage++
    self.searchRoom()
  },
  //查询我的样板间
  searchRoom: function () {
    let self = this
    let jsonStr = {}
    jsonStr['current'] = self.data.roomPage
    jsonStr['searchCount'] = true
    jsonStr['size'] = 2
    jsonStr['total'] = 0
    ;(jsonStr['records'] = [
      {
        customerId: app.globalData.userID, //"3e48957239427394"
      },
    ]),
      _post('/customersales/crmsCustomerVisitInfo/getPage', jsonStr)
        .then((res) => {
          let data = res.data
          if (data.code === '10000') {
            self.setData({
              roomList: self.data.roomList.concat(data.responseBody.records),
            })
            if (self.data.roomList.length >= data.responseBody.total) {
              self.setData({
                noMoreRoom: 1, //没有数据了
              })
            }
          } else {
            // Toast.fail(`${data.message}`)
            self.setData({
              noMoreRoom: 1,
            })
          }
        })
        .catch(() => {
          self.setData({
            noMoreRoom: 1,
          })
        })
  },
  //查询所有样板间列表
  searchAllRoom() {
    let self = this
    let long = 0 //经度
    let lati = 0 //纬度
    let style = '' //风格
    let type = '' //房型longitude=0&latitude=0&sampleRoomType=''&sampleRoomStyle=''
    _get(
      '/customersales/crmsSampleRoomInfo/getSampleRoomList?longitude=' +
        long +
        '&latitude=' +
        lati +
        '&sampleRoomType=' +
        type +
        '&sampleRoomStyle=' +
        style
    )
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          self.setData({
            imgList: data.responseBody,
          })
          if (self.data.imgList.length > 0) {
            self.setData({
              notRoom: 0,
            })
          } else {
            self.setData({
              notRoom: 1, //没有数据
            })
          }
        } else {
          Toast.fail('查询样板间列表失败，请稍后再试')
          self.setData({
            notRoom: 1,
          })
        }
      })
      .catch(() => {
        Toast.fail('网络错误，请稍后再试')
        self.setData({
          notRoom: 1,
        })
      })
  },
  gotemplateDetail() {
    //样板间详情
    wx.navigateTo({
      url: '/pages/my/templateRoom/templateDetail/templateDetail',
    })
  },
   //导航跳转
   jump(e){
    let self=this;
    let num=e.currentTarget.dataset.num
    if(num==1){//首页
      wx.redirectTo({
        //不带返回
        url: '/pages/index/index',
      })
    }else if(num==2){//智慧报价
      wx.redirectTo({
        //不带返回
        url: '/pages/clientSide/index/myArdu/demandCollection/demandCollection',
      })
    }else if(num==3){//社区店
      wx.redirectTo({
        //不带返回
        url: '/pages/nearRoom/room',
      })
    }else if(num==4){//量房
      wx.redirectTo({
        //不带返回
        url: '/pages/ruler/isruler/ruler',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    // if(app.globalData.phone!==''||app.globalData.phone!==undefined){
    //   debugger
    //   self.searchAmount() //查询需求信息
    // }
    if (app.globalData.tag) {
      self.setData({
        dialogShow: false,
      })
    } else {
      self.setData({
        dialogShow: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // debugger
    let self = this
    if(app.globalData.phone!==undefined&&app.globalData.phone!==''){
      // debugger
      self.searchAmount() //查询需求信息
    }
    if (self.data.roles == '39') {
      wx.showModal({
        title: '提示',
        content: '是否去量尺？',
        success(res) {
          if (res.confirm) {
            // wx.navigateTo({
            //   url: '/pages/ruler/isruler/ruler',
            // })
          } else if (res.cancel) {
          }
        },
      })
    }
    self.setData({
      current: 1,
      amountList: [],
    })
    // self.searchAmount() //查询需求信息
    
    // if (self.data.active == 0) {
    //   self.searchList() //查询活动信息
    // } else if (self.data.active == 1) {
    //   // self.searchAmount() //查询需求信息
    // } else {
    //   self.searchRoom() //查询样板间信息
    //   self.searchAllRoom() //查询所有样板间列表
    // }
    if (app.globalData.tag) {
      self.setData({
        dialogShow: false,
      })
    } else {
      self.setData({
        dialogShow: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let self = this
    // if (self.data.active == 0) {
    //   self.searchList() //查询活动信息
    // } else if (self.data.active == 1) {
    //   // self.searchAmount() //查询需求信息
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  //取消授权
  onClose: function () {
    let self = this
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
})
