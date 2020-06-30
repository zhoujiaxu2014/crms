import {
  _post,
  _get
} from '../../../utils/api'
let app = getApp();
Page({
  data: {
    activity: [],
    activityId: 0,
    activityName: '',
    show:false
  },
  onLoad: function(options) {
    if (options.recommendUserId) {
      app.globalData.userID = options.recommendUserId;
      wx.setStorageSync('recommendUserId', options.recommendUserId)
      this.setData({
        activityId: options.activityId,
        activityName: options.activityName,
      })
    }

    // wx.showToast({
    //   title: '推荐人id:' + options.recommendUserId,
    //   icon: 'none',
    //   duration: 2000
    // })
    let _this = this;
    _get("/customersales/crms-activity/activity-info/" + options.activityId).then(res =>{
      _this.setData({
        activity: res.data.responseBody
      })
    })
  },
  goCustomerScan(e) { //跳转至报名页面
    let flag = app.globalData.Jurisdiction; //emp员工 customer客户分享
    let userID = app.globalData.userID; //登录用户的id
    var activityId = this.data.activity.activityId;
    var activityName = this.data.activity.activityName;
    let kehuID = '';
    try {
      var value = wx.getStorageSync('recommendUserId')
      if (value) {
        wx.navigateTo({
          url: '/pages/marketing/toker/customerScan/customerScan?activityId=' + activityId + '&activityName=' + activityName + "&recommendUserId=" + value
        })
      }else{
        if (flag == 'emp'){
          kehuID = userID;
        } else if (flag == "customer"){
          kehuID = userID;
        }
        wx.navigateTo({
          url: '/pages/marketing/toker/customerScan/customerScan?activityId=' + activityId + '&activityName=' + activityName + "&recommendUserId=" + kehuID
        })
      }
    }catch(e){
    }
  },
  goDetail(e) {
    var url = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/marketing/toker/weixinLink/weixinLink?url=' + url
    })
  },
  confirm(){
    wx.navigateTo({url:'/pages/active/share/share'})
    this.setData({show:false})
    try {
      wx.setStorageSync('activity',JSON.stringify(this.data.activity))
    } catch (e) { }
  },
  onClickShow(){//拉起分享弹框
    this.setData({ show: true });
  },
  onClickHide() {//取消分享
    this.setData({ show: false });
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
//用户分享
  onShareAppMessage:function(options) {
    let flag = app.globalData.Jurisdiction; //emp 员工 customer 客户 分享
    let userID = app.globalData.userID; //登录用户的id
    var activityId = this.data.activity.activityId;
    var activityName = this.data.activity.activityName;
    return {
      title:'拎包入住,就是亚度',
      desc: activityName,
      path: '/pages/active/activeDetail/activeDetail?activityId=' + activityId + '&activityName=' + activityName + "&recommendUserId=" + userID
      // path: '/pages/marketing/toker/activeDetail/activeDetail?activityId=' + activityId + '&activityName=' + activityName + "&recommendUserId=" + userID
    }
  }
})