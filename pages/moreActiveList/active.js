// pages/moreActiveList/active.js
import {
	_post,
	_get
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  //
	  list:[],
	  //页数
	  pageindex:1
  },
  //根据图片 跳转到不同活动
  participateActivity(flag) {
	  console.log(flag)
  	// 0 -转盘  1-砸金蛋
  	console.log(flag.currentTarget.dataset.gid)
  	if (flag.currentTarget.dataset.gid.luckyDrawType == 0) {
  		wx.navigateTo({
  			url: `/pages/RotaryTable/index?id=${flag.currentTarget.dataset.gid.lotteryId}`
  		})
  	} else if (flag.currentTarget.dataset.gid.luckyDrawType == 1) {
  		wx.navigateTo({
  			url: `/pages/ageActive/age?id=${flag.currentTarget.dataset.gid.lotteryId}`
  		})
  	}
  },
  //获取数据
  getData(){
	  _post("/customersales/draw-lottery-manage/showEvent", { //进入页面加载数据
	    "current": this.data.pageindex, 
	    "size": 100, 
	  }).then(res => {
		  console.log(res.data)
		  this.setData({
			  list:[...this.data.list,...res.data.responseBody.records]
		  })
	  }).catch(err => {
		  console.log(err)
	    wx.showToast({
	      title: '加载失败！',
		  icon:'none'
	    })
	  })
  },
  //上拉加载
  onReachBottom:function(){
	  console.log('1')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	this.getData()
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

  }
})