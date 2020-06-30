import {
  _post,
  _get
} from '../../../utils/api.js'
Page({
  data: {
    taskPo: {
      customerName: ' ',
      customerPhone: '',
      current: 0,
      size: 0,
      taskCode: "",
      inputKeyWord: "",
    },
    noruler: [],
    haveruler: [],
    active: 2
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 请求未量词的数据
  norulers() {
    let that = this;
    _post("/crmsdesign/task/list/wait-lf", {
      customerName: '',
      // customerPhone: '177457878787',
      customerPhone: '',
      current: 0,
      size: 200,
      taskCode: "",
      inputKeyWord: "",

    }).then(res => {
      let data = res.data.data;
	  let notruler = [];//未量尺
	  let ruler = [];//已量尺
	  let date = new Date();
	  let Y,M,D,D1,h,m,s,nowdatetime
	  Y = date.getFullYear() + '-';
	  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	  D = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
	  D1 = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate());
	  h = (date.getHours()< 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
	  m = (date.getMinutes()< 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
	  s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds());
	  nowdatetime = Y+M+D+h+m+s;
	  for(let i = 0;i<data.records.length;i++){
		  if(data.records[i].taskState == '1'){
			  data.records[i].timediff = parseInt((new Date(nowdatetime) - new Date(data.records[i].createdTime)) / 3600000);//时间差
			  notruler.push(data.records[i]);
		  }else{
			  data.records[i].timediff = parseInt((new Date(nowdatetime) - new Date(data.records[i].updatedTime)) / 3600000);//时间差
			  ruler.push(data.records[i]);
		  }
	  }
	  that.setData({
			'haveruler': ruler
	  })
	  that.setData({
			'noruler': notruler
	  })
    })
  },
  // 传参
  personinfo(e) {
    let taskid = e.currentTarget.dataset.taskid;
    let customerid = e.currentTarget.dataset.customerid;
    let type = e.currentTarget.dataset.type;
    let customerdemandid = e.currentTarget.dataset.customerdemandid;
    // 储存到本地
    // wx.setStorage({
    //   key: 'norulerList',
    //   data: this.data.noruler,
    // })
    // wx.setStorage({
    //   key: 'haverulerList',
    //   data: this.data.haveruler,
    // })
    wx.navigateTo({
      url: '/pages/measuringRuler/index?taskid=' + taskid +'&customerid=' +customerid +'&type=' +type +'&customerdemandid=' +customerdemandid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.norulers()
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