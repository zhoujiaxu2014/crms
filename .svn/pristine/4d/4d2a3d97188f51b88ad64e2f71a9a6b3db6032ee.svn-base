// pages/clientSide/index/myArdu/demandCollection/demandCollection.js
import { _post, _get, _put, _delete } from '../../../../../utils/api'
import Toast from '../../../../../miniprogram_npm/@vant/weapp/toast/toast'
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cityShow: false,
    city: '',
    province: '无',
    huxingList: [
      //户型
      { type: '一室' },
      { type: '二室' },
      { type: '三室' },
      { type: '复式大宅' },
    ],
    radioHu: 99, //户型单选
    zhuangxiuType: [
      //装修类型
      { type: '局部' },
      { type: '精装' },
      { type: '毛胚' },
      { type: '工装' },
    ],
    radioType: 999,
    zhuangMethods: [{ type: '清包' }, { type: '半包' }, { type: '全包' }], //装修方式
    radioMethods: 999,
    dangciList: [
      { type: '经济实用', img: '/image/table.jpg' },
      { type: '舒适享受', img: '/image/sofa.jpg' },
      { type: '豪华高档', img: '/image/best.jpg' },
    ],
    region: [], //城市
    customItem: '全部',
    areaList: {
      province_list: {
        110000: '北京市',
        120000: '天津市',
      },
      city_list: {
        110100: '北京市',
        110200: '县',
        120100: '天津市',
        120200: '县',
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
        110105: '朝阳区',
        110106: '丰台区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区',
        // 完整地区内容地址https://github.com/youzan/vant/blob/dev/src/area/demo/area.js
      },

      typeData: '', //选择的户型
      renovaType: 99, //选择的装修类型
      levelData: 99, //装修档次
      flag: 9999, //
      tag: 9999,
      btn: 999,
      leval: 9999,
      bugetNum: 0,
      showBtn: 0,
    },
  },
  /**
   * 展示城市选择框
   */
  showCityPopup() {
    this.setData({
      cityShow: true,
    })
  },
  /**
   * 点击确定选择城市
   */
  selectCity(event) {
    let province = event.detail.values[0].name
    let city = event.detail.values[1].name
    this.setData({
      province: province,
      city: city,
      cityShow: false,
    })
  },
  /**
   * 取消选择城市
   */
  cancel() {
    this.setData({
      cityShow: false,
    })
  },
  /**
   * 提交我的装修需求
   */
  //获取户型值
  // getHuXing: function (e) {
  //   let self = this
  //   let typeData = e.currentTarget.dataset.type
  //   self.setData({
  //     huxingType: typeData,
  //     flag: e.currentTarget.dataset.num,
  //   })
  // },
  onChangeHu(event) {
    // debugger
    let self = this
    let typeData = parseInt(event.detail)
    self.setData({
      radioHu: event.detail,
      huxingType: self.data.huxingList[typeData].type,
    })
    console.log(self.data.huxingType)
  },
  //获取装修类型的值
  // renovationType: function (e) {
  //   let self = this
  //   let typeRe = e.currentTarget.dataset.type
  //   self.setData({
  //     renovaType: parseInt(typeRe),
  //     tag: typeRe,
  //   })
  // },
  onChangeType(event) {
    this.setData({
      radioType: event.detail,
      renovaType: parseInt(event.detail),
    })
  },
  //获取装修方式的值
  // demandMethod: function (e) {
  //   let self = this
  //   let typeRe = e.currentTarget.dataset.method
  //   self.setData({
  //     reMethod: parseInt(typeRe),
  //     btn: typeRe,
  //   })
  // },
  onChangeMethods(event) {
    this.setData({
      radioMethods: event.detail,
      reMethod: parseInt(event.detail),
    })
  },
  //获取装修档次的值
  levalChange: function (e) {
    let self = this
    let typeRe = e.currentTarget.dataset.num
    self.setData({
      levelData: parseInt(typeRe),
      leval: typeRe,
    })
  },
  //获取城市
  bindRegionChange: function (e) {
    let self = this
    let province = e.detail.value[0]
    let city = e.detail.value[1]
    this.setData({
      // city: province +  ' ' + city,
      province: province,
      city: city,
    })
  },
  //房屋面积
  onChangeMesure: function (e) {
    let self = this
    self.setData({
      mesureNum: e.detail,
    })
  },
  //预算
  onChangeBuget: function (e) {
    let self = this
    self.setData({
      bugetNum: e.detail,
    })
  },

  //提交接口
  submitDemand() {
    let self = this
    let jsonStr = {}
    jsonStr['demandRoom'] = self.data.huxingType //户型
    jsonStr['demandHomeState'] = self.data.renovaType //装修类型
    jsonStr['demandMethod'] = self.data.reMethod //装修方式
    jsonStr['housingArea'] = self.data.mesureNum //房屋面积
    jsonStr['demandPower'] = self.data.levelData //消费能力---装修档次
    jsonStr['province'] = self.data.province //省
    jsonStr['city'] = self.data.city //市
    jsonStr['demandBudget'] = self.data.bugetNum
    _post('/customersales/crms-customer-demand/insertCustDem', jsonStr)
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 2000,
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/clientSide/index/myArdu/myArdu',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000,
          })
        }
      })
      .catch(() => {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000,
        })
      })
  },
  //查询详情
  listDetail: function (id) {
    let self = this
    _get('/customersales/crms-customer-demand/findCustDem/' + id)
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          self.setData({
            amountList: data.responseBody,
          })
          let listData = self.data.amountList
          self.setData({
            bugetNum: listData.demandBudget, //预算
            mesureNum: listData.housingArea, //面积
            province: listData.province, //区域
            city: listData.city,
            // radioHu:listData.demandRoom == null ? 999 : listData.demandRoom,//户型
            radioType:listData.demandHomeState == null ? 999 : parseInt(listData.demandHomeState), //装修类型
            radioMethods:listData.demandMethod == null ? 999 : parseInt(listData.demandMethod), //装修方式
            // tag:
            //   listData.demandHomeState == null ? 999 : listData.demandHomeState, //装修类型
            // btn: listData.demandMethod == null ? 999 : listData.demandMethod, //装修方式
            leval: listData.demandPower == null ? 999 : listData.demandPower, //装修等级
          })
          if (listData.demandRoom == '一室') {//户型
            self.setData({
              radioHu: 0,
            })
          } else if (listData.demandRoom == '二室') {
            self.setData({
              radioHu: 1,
            })
          } else if (listData.demandRoom == '三室') {
            self.setData({
              radioHu: 2,
            })
          } else if (listData.demandRoom == '复试大宅') {
            self.setData({
              radioHu: 3,
            })
          }
        } else {
          Toast.fail('网络错误请稍后再试')
          // Toast.fail('领取失败')
        }
      })
      .catch(() => {
        Toast.fail('网络错误请稍后再试')
      })
  },
  //删除接口
  deleteDemond: function () {
    let self = this
    let jsonStr = {}
    // jsonStr['demandId']=self.data.demond;
    _delete(
      '/customersales/crms-customer-demand/delCustDem/' + self.data.demond
    )
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000,
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/clientSide/index/myArdu/myArdu',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000,
          })
        }
      })
      .catch(() => {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000,
        })
      })
  },
  //修改接口
  auditDemond: function () {
    let self = this
    let jsonStr = self.data.amountList
    jsonStr.city = self.data.city //市
    jsonStr.province = self.data.province //
    jsonStr.demandRoom = self.data.huxingType //户型
    jsonStr.demandMethod = self.data.reMethod //装修方式
    jsonStr.demandPower = self.data.levelData //装修当次
    jsonStr.demandHomeState = self.data.renovaType //装修类型
    jsonStr.housingArea = self.data.mesureNum //面积
    jsonStr.demandBudget = self.data.bugetNum //预算

    _put('/customersales/crms-customer-demand/updateCustDem', jsonStr)
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000,
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/clientSide/index/myArdu/myArdu',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '网络错误请稍后再试',
            icon: 'none',
            duration: 2000,
          })
        }
      })
      .catch(() => {
        wx.showToast({
          title: '网络错误请稍后再试',
          icon: 'none',
          duration: 2000,
        })
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
    }else if(num==2){//社区店
      wx.redirectTo({
        //不带返回
        url: '/pages/nearRoom/room',
      })
    }else if(num==3){//我的
      wx.redirectTo({
        //不带返回
        url: '/pages/clientSide/index/myArdu/myArdu',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger
    let typeNum=getApp().globalData.typeNum
    let deId=getApp().globalData.deId
    let phoneNum=getApp().globalData.phoneNum
    let self = this
    // let type = options.type
    if (typeNum == 1) {
      self.setData({
        showBtn: 2,
        demond: deId,
      })
      self.listDetail(phoneNum)
    } else {
      self.setData({
        showBtn: 1,
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
  onShow: function (options) {
    // debugger
    let self=this;
    let typeNum=getApp().globalData.typeNum
    let deId=getApp().globalData.deId
    let phoneNum=getApp().globalData.phoneNum
    if (typeNum == 1) {
      self.setData({
        showBtn: 2,
        demond: deId,
      })
      self.listDetail(phoneNum)
    } else {
      self.setData({
        showBtn: 1,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let self=this
    //离开页面时清空页面数据
    getApp().globalData.typeNum=0
    self.setData({
      bugetNum: 0, //预算
      mesureNum: 0, //面积
      province: '', //区域
      city: '',
      radioHu:99,//户型
      radioType:99, //装修类型
      radioMethods:99, //装修方式
      leval: 999, //装修等级
    })
  },

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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
