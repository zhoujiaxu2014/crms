import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  _post,
  _get,
  _put
} from '../../../../utils/api'
let app = getApp();
Page({
    data: {
        cusName:'无',//姓名
        status:'无',//状态
        cusPhone:'无',//电话
        room:'无',//样板间
        people:'无',//样板间负责人
        phone:'无',//负责人电话
        address:'无',//地址
        name:'0',//来访人数
        passWord:'',//参观密码
        startShow:false,//开始时间
        startTime:'',
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        endShow:false,//结束时间
        endTime:'',
        currentDateEnd: new Date().getTime(),
        minDateEnd: new Date().getTime(),

        cusId:'',//列表的id
        showDialog:false,//修改弹框
    },
    //跳转选择样板间
    choiceRoom(){
        let self=this;
        wx.navigateTo({ url: '/pages/marketing/index/roomList/roomList?type='+2 });
    },
    /*
    *时间选择
     */
    time(e){
        let self=this;
        let num=e.currentTarget.dataset.num;
        if(num==1){
            self.setData({
                startShow:true
            })
        }else{
            self.setData({
                endShow:true
            })
        }
    },
    //取消按钮
    cancelStartTime(){//开始
        let self=this;
        self.setData({
            startShow:false
        })
    },
    cancelEndTime(){//结束
        let self=this;
        self.setData({
            endShow:false
        })
    },
    //确定按钮
    getStartTime(e){//开始
        let self=this;
        let time=self.forTime(e.detail);
        app.globalData.starttime = time; //开始时间
        // let Y = time.getFullYear() + '-';
        // let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';        
        // let D = time.getDate();
        var arr2 = Date.parse(self.data.endTime);
        // var date2=new Date(parseInt(arr2[0]),parseInt(arr2[1])-1,parseInt(arr2[2]),0,0,0);
        if(new Date(e.detail).getTime()>=arr2){
            Toast.fail('开始日期必须早于结束日期')
            // self.setData({
            //     startShow:false
            // })
        }else{
            self.setData({
                startTime:app.globalData.starttime,
                startShow:false
            })
        }
    },
    getEndTime(e){//结束
        let self=this;
        let time=self.forTime(e.detail);
        var arr1 = Date.parse(self.data.startTime);
        app.globalData.endTime=time;//结束时间
        if(new Date(e.detail).getTime()<=arr1){
            Toast.fail('开始日期必须早于结束日期')
        }else{
            self.setData({
                endTime:app.globalData.endTime,
                endShow:false
            })
        }
    },
    //时间格式转换
    forTime(date){
        var time=new Date(date);
        var Y = time.getFullYear()+'-';
        var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1)+'-';
        var D = time.getDate()< 10 ? '0' + time.getDate() : time.getDate() +' ';
        var H=time.getHours()< 10 ? '0' + time.getHours()+':' : time.getHours()+':';
        var m=time.getMinutes()< 10 ? '0' + time.getMinutes()+':' : time.getMinutes()+':';
        var S=time.getSeconds()< 10 ? '0' + time.getSeconds() : time.getSeconds();
        return Y+M+D+H+m+S
    },
    //访问人数输入框监听
    onChange(e){
        let self=this;
        app.globalData.visitnum=e.detail;
        self.setData({
            name:app.globalData.visitnum
        })
    },
    //数据查询
    searchData(){
        let self=this;
        _get("/customersales/crmsCustomerVisitInfo/"+self.data.cusId).then((res) => {
            console.log('正确的-样板间列表'+res)
            let data = res.data;
            if (data.code === '10000') {
                let state=self.changeWord(data.responseBody.visitStatus,data.responseBody.expireTime);//状态
                let add=data.responseBody.sampleRoomProvince+data.responseBody.sampleRoomCity
                        +data.responseBody.sampleRoomArea+data.responseBody.sampleRoomDistrict
                        +data.responseBody.sampleRoomNumber
                app.globalData.cusName = data.responseBody.customerName; //全局用户权限,姓名
                app.globalData.cusstatus = state; //状态
                app.globalData.cusphone = data.responseBody.customerTel; //电话
                app.globalData.starttime = data.responseBody.startTime; //开始时间
                app.globalData.endTime = data.responseBody.expireTime; //结束时间
                app.globalData.visitnum=data.responseBody.visitorNum;//访问人数
                self.setData({
                    cusName:app.globalData.cusName,//姓名
                    status:app.globalData.cusstatus,//状态
                    cusPhone:app.globalData.cusphone,//电话
                    startTime:app.globalData.starttime,//开始时间
                    endTime:app.globalData.endTime,//结束时间
                    room:data.responseBody.sampleRoomName,//样板间
                    people:data.responseBody.sampleRoomSalesName,//样板间负责人
                    phone:data.responseBody.sampleRoomSalesTel,//负责人电话
                    name:app.globalData.visitnum,//访问人数
                    address:add,//地址
                    passWord:data.responseBody.visitPass,//参观密码
                })
            } else {
              Toast.fail('网络错误，请稍后再试')
            //   self.setData({
            //     noMore: 1
            //   })
            }
          }).catch(() => {
            Toast.fail('网络错误，请稍后再试')
            // self.setData({
            //   noMore: 1
            // })
        });
    },
    changeWord(str,time){
        let myTime=new Date().getTime();
        let endTime= Date.parse(time);
        if (str!==2&&myTime>endTime){
            return '已过期'
        }
        else if(str==0){
            return '待审核'
        }else if(str==1){
            return '待参观'
        }else if(str==2){
            return '已结束'
        }
    },
    //修改信息
    auditRoom(){//弹框
        let self=this;
        self.setData({
            showDialog:true
        })
    },
    auditRoonInfo(){
        let self=this;
        let json={};
        json['sampleRoomId']=self.data.roomId;//样板间id
        json['startTime']=self.data.startTime;//开始时间
        json['expireTime']=self.data.endTime;//结束时间
        json['visitorNum']=self.data.name;//访问人数
        _put("/customersales/crmsCustomerVisitInfo/"+app.globalData.cusId,json).then((res) => {
            console.log('正确的-修改访问信息'+res)
            let data = res.data;
            if (data.code === '10000') {
                if(data.responseBody === true){
                    Toast.success('恭喜您!修改信息成功')
                    setTimeout(function(){
                        wx.switchTab({
                          url: '/pages/clientSide/index/myArdu/myArdu',
                        })
                      },2000)
                }else{
                    Toast.fail('修改信息失败')
                }
            } else {
              Toast.fail('网络错误，请稍后再试')
            //   self.setData({
            //     noMore: 1
            //   })
            }
          }).catch(() => {
            Toast.fail('网络错误，请稍后再试')
            // self.setData({
            //   noMore: 1
            // })
        });
    },
    //页面初始加载
    onLoad: function (options) {
        // debugger
        let self=this;
        if(options.flag){
            app.globalData.cusId = options.cusid;
            self.setData({
                cusId:options.cusid,//我的样板间列表id
            })
            self.searchData();
        }else{
            self.setData({
                cusName:app.globalData.cusName,//姓名
                status:app.globalData.cusstatus,//state,//状态
                cusPhone:app.globalData.cusphone,//data.responseBody.customerTel,//电话
                startTime:app.globalData.starttime,//data.responseBody.startTime,//开始时间
                endTime:app.globalData.endTime,//data.responseBody.expireTime,//结束时间
                name:app.globalData.visitnum,//访问人数
                room:options.room,//样板间
                roomId:options.id,//样板间ID
                people:options.name,//样板间负责人
                phone:options.phone,//负责人电话
                address:options.address,//地址
            });
        }
        
        
    },
})