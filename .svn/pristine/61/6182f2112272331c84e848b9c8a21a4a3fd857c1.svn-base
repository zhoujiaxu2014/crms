import {
  _post,
  _get
} from '../../../../utils/api'
var app = getApp();
Page({
  data: {
    activeList: [],
    pageSize: 10, //数据分页每一页多少条数据
    ismore: true, //是否有更多数据
    pageindex: 2,
    dia_show: true, //是否授权

  },
  onLoad: function(options) {
    let _this = this;
    if (app.globalData.tag == "emp") {
    
    } else if (app.globalData.tag == "customer") {
     
    } else {
      _this.setData({
        dia_show: false
      })
    }
    _post("/customersales/crms-activity/getPageCrmActivitys", { //进入页面加载数据
      "current": 1,
      "searchCount": true,
      "size":10,
      "total":0
    }).then(res => {
      _this.setData({
        activeList: res.data.responseBody.records
      })
    })
  },
  paging() { //分页查询数据
    let self = this;
    _post("/customersales/crms-activity/getPageCrmActivitys", { //进入页面加载数据
      "current": self.data.pageindex, //当前第几次加载
      "searchCount": true,
      "size": 10, //每一页数据的个数
      "total": 0
    }).then(res => {
      var oldData = self.data.activeList //原有的数据
      var newData = res.data.responseBody.records //新加载出来的数据
      if (newData.length < self.data.pageSize) {
        oldData = oldData.concat(newData)
        self.setData({
          activeList: oldData,
          ismore: false
        })
      } else {
        oldData = oldData.concat(newData)
        self.setData({
          activeList: oldData,
          ismore: true,
          pageindex: pageindex + 1
        })

      }
    }).catch(err => {
      wx.showToast({
        title: '加载失败！',
      })
    })
  },
  gotoActivityDetails(e) {
    var activityId = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../../toker/activeDetail/activeDetail?activityId=' + activityId
    })
  },
  onReady: function() {

  },
  onShow: function() {
    let _this=this;
    _post("/customersales/crms-activity/getPageCrmActivitys", { //进入页面加载数据
      "current": 1,
      "searchCount": true,
      "size": 10,
      "total": 0
    }).then(res => {
      _this.setData({
        activeList: res.data.responseBody.records
      })
    })
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
    let self = this;
    if (this.data.ismore == true) {
      self.paging();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})