import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  _post,
  _get
} from '../../../../utils/api'
let app = getApp();
Page({
    data: {
        name: "",//姓名
        phone:'',//电话
        room:'',//样板间
        roomId:'',//样板间ID
        people:'',//访问人数
        //开始时间
        time:'',//开始时间
        showTime:false,//时间选择器
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),

        timeEnd:'',//结束时间
        showTimeEnd:false,//
        currentDateEnd: new Date().getTime(),
        minDateEnd: new Date().getTime(),

        showDialog:false,//弹框
    },
    /**
     * 时间选择
     * */
    //开始时间 选择
    getTime:function(){
        let self=this;
        self.setData({
            showTime:true
        })
    },
    //确认按钮---开始时间
    getTimeData(e){
        let self=this;
        let time=self.forTime(e.detail);
        app.globalData.time=time
        var arr2 = Date.parse(self.data.timeEnd);//结束时间
        if(new Date(e.detail).getTime()>=arr2){
            Toast.fail('开始日期必须早于结束日期')
            // self.setData({
            //   showTime:false
            // })
        }else{
          self.setData({
              time:time,
              showTime:false
          })
        }
    },
    bindTimeChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        time: e.detail.value
      })
    },
    //结束时间选泽
    getTimeEnd(){
      let self=this;
        self.setData({
          showTimeEnd:true
        })
    },
    //确认按钮---结束时间
    getTimeDataEnd(e){
      let self=this;
      let time=self.forTime(e.detail);
      app.globalData.timeEnd=time
      var arr1 = Date.parse(self.data.time);//结束时间
        if(new Date(e.detail).getTime()<=arr1){
            Toast.fail('开始日期必须早于结束日期')
            // self.setData({
            //   showTime:false
            // })
        }else{
            self.setData({
              timeEnd:time,
              showTimeEnd:false
          })
        }
  },
  //时间格式转换
  forTime(date){
    let time=new Date(date);
    var Y = time.getFullYear()+'-';
    var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1)+'-';
    var D = time.getDate()< 10 ? '0' + time.getDate() : time.getDate() +' ';
    var H=time.getHours()< 10 ? '0' + time.getHours()+':' : time.getHours()+':';
    var m=time.getMinutes()< 10 ? '0' + time.getMinutes()+':' : time.getMinutes()+':';
    var S=time.getSeconds()< 10 ? '0' + time.getSeconds() : time.getSeconds();
    return Y+M+D+H+m+S
},
    /*
    *监听输入框
    */
  //  nameChange(e){//姓名
  //      let self=this;
  //      self.setData({
  //          name:e.detail
  //      })
  //  },
  //  phoneChange(e){//电话
  //       let self=this;
  //       self.setData({
  //           phone:e.detail
  //       })
  //   },
    timeChange(e){//开始时间
        let self=this;
        self.setData({
            time:e.detail
        })
    },
    timeChangeEnd(e){//结束时间
      let self=this;
      self.setData({
        timeEnd:e.detail
      })
  },
    roomChange(e){//样板间
        let self=this;
        self.setData({
            room:e.detail
        })
    },
    peopleChange(e){//访问人数
        let self=this;
        app.globalData.people=e.detail
        self.setData({
            people:e.detail
        })
    },
    /**
   * 提交
   */
  validateInfo() {
    let self = this;
    // if (self.data.name === '') {
    //   wx.showToast({
    //     title: '您还未填写姓名，请完善后再提交',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false;
    // } else if (self.data.phone === '') {
    //   wx.showToast({
    //     title: '您还未填写电话，请完善后再提交',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false;
    // } else if (self.data.phone.length != 11) {
    //   wx.showToast({
    //     title: '请填写11位手机号码',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false;
    // } else 
    if (self.data.time === '') {
      wx.showToast({
        title: '您还未选择访问时间，请完善后再提交',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (self.data.room === '') {
      wx.showToast({
        title: '您还未选择样板间，请完善后再提交',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      self.setData({
        showDialog:true
      })
    }
  },
  //提交
  submitRoom(){
    let self = this;
    let jsonStr = {};
    // jsonStr['customerName'] = self.data.name;//姓名
    // jsonStr['customerTel'] = self.data.phone;//电话
    jsonStr['customerId'] = app.globalData.userID;//登陆人id
    jsonStr['sampleRoomId'] = self.data.roomId;//样板房ID
    jsonStr['startTime'] = self.data.time;//开始时间
    jsonStr['expireTime'] = self.data.timeEnd;//结束时间
    jsonStr['visitorNum'] = self.data.people;//访问人数
    _post("/customersales/crmsCustomerVisitInfo", jsonStr).then((res) => {
      let data = res.data;
      if (data.code === '10000') {
        Toast.success('新增访问信息成功')
        setTimeout(function(){
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/clientSide/index/myArdu/myArdu',
            })
          },2000)
        },2000)
      } else {
        Toast.fail('新增访问信息失败')
      }
    }).catch(() => {
      Toast.fail('网络错误，请稍后再试')
    });
  },
    /*
    *跳转样板间
    */
   goto(){
       let self=this;
       wx.navigateTo({ url: '/pages/marketing/index/roomList/roomList?type='+1 });
   },
    //取消按钮
    cancelTime:function(){
        let self=this;
        self.setData({
            showTime:false
        })
    },
    //页面初始加载
    onLoad: function (options) {
        let self=this;
        self.setData({
          room:options.room,
          roomId:options.id,
          time:app.globalData.time,//开始时间
          timeEnd:app.globalData.timeEnd,//结束时间
          people:app.globalData.people,//访问人数
        })
    },
})