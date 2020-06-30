import { _post, _get } from '../../utils/api'
let app = getApp()
Page({
  data: {
    background: [],
    indicatorDots: true,
    circular: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    activeList: [],
    showStart: false, //是否开启弹框
    region: [],
    customItem: '全部',
    dealerActivityList: [],
    dia_show: true, //是否授权
    //活动图片 和 内容
    activeData: '',
    activeHotList: [], //热门活动列表数据
    hotDataHas: 0, //热门活动列表数据有无数据；0--有，1--无
  },
  //查看更多活动
  SeeMoreActivities() {
    wx.navigateTo({
      url: `/pages/moreActiveList/active`,
    })
  },
  //根据图片 跳转到不同活动
  participateActivity(flag) {
    // debugger
    // 0 -转盘  1-砸金蛋
    console.log(flag.currentTarget.dataset.gid)
    if (flag.currentTarget.dataset.gid.luckyDrawType == 0) {
      wx.navigateTo({
        url: `/pages/RotaryTable/index?id=${flag.currentTarget.dataset.gid.lotteryId}`,
      })
    } else if (flag.currentTarget.dataset.gid.luckyDrawType == 1) {
      wx.navigateTo({
        url: `/pages/ageActive/age?id=${flag.currentTarget.dataset.gid.lotteryId}`,
      })
    }
  },
  //获取活动图片
  getActiveData() {
    _get('/customersales/draw-lottery-manage/showEvent').then((res) => {
      console.log('活动信息', res.data)
      if (res.data.code == '10000') {
        let list = res.data.responseBody
        list.forEach((item, index) => {
          if (item.luckyDrawCode == 0) {
            //要换成企业的抽奖活动
            //0-企业；1--经销商
            this.setData({
              activeData: item,
            })
          }
        })
      }
    })
  },
  //跳转更多活动
  moreActivity() {
    wx.navigateTo({
      url: `/pages/active/activityCenter/activityCenter`,
    })
  },
  myphoneChang(event) {
    this.setData({
      Myphone: event.detail,
    })
  },
  gotoActivityDetails(e) {
    //轮播图跳转到详情页
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/active/activeDetail/activeDetail?activityId=' + id,
    })
  },
  bindRegionChange: function (e) {
    //选择地址
    this.setData({
      region: e.detail.value,
    })
    this.searchActivited()
  },
  searchActivited: function () {
    //根据地址查询活动列表
    let self = this
    _get(
      '/customersales/crms-activity/getCrmsActivitys?areaList=' +
        self.data.region
    ).then((res) => {
      console.log('活动信息', res)
      if (res.data.responseBody.corporateActivity.length > 0) {
        self.setData({
          background: res.data.responseBody.corporateActivity,
        })
      }
      if (res.data.responseBody.dealerActivity.length > 0) {
        self.setData({
          dealerActivityList: res.data.responseBody.dealerActivity,
        })
      }
    })
  },
  getPhoneNumber(e) {},
  onReady: function () {
    this.getActiveData()
  },
  //智慧报价
  seeOffer() {
    wx.switchTab({
      //不带返回
      url: '/pages/clientSide/index/myArdu/demandCollection/demandCollection',
    })
  },
  //热门活动数据查询----首页只保留3条数据
  hotDataList() {
    let _this = this
    _post('/customersales/crms-activity/getPageCrmActivitys', {
      //进入页面加载数据
      current: 1,
      searchCount: true,
      size: 10,
      total: 0,
    })
      .then((res) => {
        console.log('data=', res)
        if (res.data.code === '10000') {
          if (res.data.responseBody.records.length > 0) {
            if (res.data.responseBody.records.length > 3) {
              _this.setData({
                activeHotList: res.data.responseBody.records.slice(0, 4),
              })
            } else {
              _this.setData({
                activeHotList: res.data.responseBody.records,
              })
            }
          } else {
            _this.setData({
              hotDataHas: 1,
            })
          }
        } else {
          _this.setData({
            hotDataHas: 1,
          })
        }
      })
      .catch((res) => {
        _this.setData({
          hotDataHas: 1,
        })
      })
  },
  //导航跳转
  jump(e){
    let self=this;
    let num=e.currentTarget.dataset.num
    if(num==1){//智慧报价
      wx.redirectTo({
        //不带返回
        url: '/pages/clientSide/index/myArdu/demandCollection/demandCollection',
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
   * 生命周期函数--监听页面显示
   */
  onLoad: function (options) {
    let _this = this
    _this.hotDataList()
  },
  onShow: function () {
    let _this = this
    _this.searchActivited()
    _this.getActiveData()
  },
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
