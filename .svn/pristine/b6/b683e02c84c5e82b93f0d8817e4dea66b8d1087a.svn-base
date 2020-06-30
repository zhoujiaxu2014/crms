import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast'
var QQMapWX = require('../../../../pages/common/sdk/qqmap-wx-jssdk');
import {
  _post,
  _get
} from '../../../../utils/api'
// let app = getApp();
Page({
    data: {
        value1:0,//房型
        option1: [],
        value2:0,//风格
        option2: [],
        
        radio:'1',//单选框

        longitude:0,//经度
        latitude:0,//纬度
        sampleRoomType:'',//样板间房型
        sampleRoomStyle:'',//样板间风格
        roomList:[],
        noMore:0,//暂无数据

        showRoom:false,//弹框
        type:0,//1:新增页面跳转的；2：修改页面跳转的
        city:'定位',
    },
    //房型模搜
    changeType(e){//value
      let self=this;
      let type=self.data.option1[e.detail].text;
      if(type=='房型'){
        self.setData({
          sampleRoomType:''
        })
      }else{
        self.setData({
          sampleRoomType:type
        })
      }
      self.roomListSearch();//查询列表
    },
    //风格模搜
    changeStyle(e){//value
      let self=this;
      let style=self.data.option2[e.detail].text;
      if(style=='风格'){
        self.setData({
          sampleRoomStyle:''
        })
      }else{
        self.setData({
          sampleRoomStyle:style
        })
      }
      self.roomListSearch();//查询列表
    },
    //查询风格和房型
    searchStyleType(){
      let self=this;
      _get("/customersales/crmsSampleRoomInfo/getSampleRoomTypeAndStyle").then((res) => {
        console.log('正确的-风格和房型列表'+res)
        let data = res.data;
        if (data.code === '10000') {
          let type=data.responseBody.sampleRoomType;//房型
          let style=data.responseBody.sampleRoomStyle;//风格
          let roomType=[{ text: '房型', value: 0 }];
          let roomStyle=[{ text: '风格', value: 0 }];
          type.forEach((item,index)=>{
            roomType.push({text:item,value:index+1})
            self.setData({
              option1:roomType
            })
          })
          style.forEach((item,index)=>{
            roomStyle.push({text:item,value:index+1})
            self.setData({
              option2:roomStyle
            })
          })
        } else {
          Toast.fail('网络错误，请稍后再试')
         
        }
      }).catch(() => {
        Toast.fail('网络错误，请稍后再试')
      });
    },
    //单选
    onChange(event) {
        // debugger
        let self=this;
        let num=event.detail;//选中的索引
        //地址
        let add=self.data.roomList[num].sampleRoomProvince+self.data.roomList[num].sampleRoomCity+self.data.roomList[num].sampleRoomArea+self.data.roomList[num].sampleRoomDistrict+self.data.roomList[num].sampleRoomNumber
        let room=self.data.roomList[num].sampleRoomName;//样板间名字
        let roomId=self.data.roomList[num].sampleRoomId;//样板间id
        let name=self.data.roomList[num].sampleRoomSalesName;//样板间负责人
        let phone=self.data.roomList[num].sampleRoomSalesTel;//样板间负责人电话
        this.setData({
            radio: num,
            showRoom:true,
            address:add,
            room:room,
            roomId:roomId,
            name:name,
            phone:phone
        });
    },
    //确定选择样板房
    choiceRoom(){
        let self=this;
        let roomName=self.data.room;//样板间名字
        let id=self.data.roomId;//样板间id
        let add=self.data.address;//样板间地址
        let name=self.data.name;//样板间负责人
        let tel=self.data.phone;//样板间负责人电话
        if(self.data.type==1){//跳转新增样板间
            wx.redirectTo({ url: '/pages/marketing/index/myRoom/myRoom?room='+roomName+'&id='+id });
        }else if(self.data.type==2){//跳转样板间详情---修改
            wx.redirectTo({ url: '/pages/marketing/index/roomDetail/roomDetail?room='+roomName+'&id='+id+'&address='+add+'&name='+name+'&phone='+tel });
        }
    },
    //样板间列表查询
    roomListSearch(){
        let self=this;
        let long=self.data.longitude;//经度
        let lati=self.data.latitude;//纬度
        let type=self.data.sampleRoomType;//样板间房型'&latitude=0&sampleRoomType=''&sampleRoomStyle=''
        let style=self.data.sampleRoomStyle;//样板间风格
        _get("/customersales/crmsSampleRoomInfo/getSampleRoomList?longitude="+long+'&latitude='+lati+'&sampleRoomType='+type+'&sampleRoomStyle='+style).then((res) => {
            console.log('正确的-样板间列表'+res)
            let data = res.data;
            if (data.code === '10000') {
              self.setData({
                roomList: data.responseBody
              })
              if(self.data.roomList.length>0){
                self.setData({
                    noMore: 0
                  })
              }else{
                self.setData({
                    noMore: 1
                  })
              }
            } else {
              Toast.fail('网络错误，请稍后再试')
              self.setData({
                noMore: 1
              })
            }
          }).catch(() => {
            Toast.fail('网络错误，请稍后再试')
            self.setData({
              noMore: 1
            })
          });
    },
    //获取定位
    getLocationList(){
      let self=this;
      var qqmapsdk = new QQMapWX({
          key: '3JRBZ-LDYCP-KAADB-V25Q2-7IX7J-LTFJ5'
        });
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度wgs84
            success: function (res) {
                // console.log(res);
                var latitude = res.latitude//维度
                var longitude = res.longitude//经度
                self.setData({
                    latitude:latitude,
                    longitude:longitude
                })
                self.roomListSearch();
                qqmapsdk.reverseGeocoder({//腾讯地图api 逆解析方法 首先设计经纬度
                  location: {
                    latitude: res.latitude,
                    longitude: res.longitude
                  },
                  success: function (addressRes) {
                    // let city=addressRes.result.address_component.district
                    self.setData({
                      city:addressRes.result.address_component.district
                    })
                    console.log('正确的城市名',city)
                  },
                  fail: function (error) {
                    console.error('错误的城市',error);
                    Toast.fail('网络错误，请稍后再试')
                   },
                   complete: function (addressRes) {
                    console.log('111222',addressRes);
                   }
                })
                //逆解析成功回调函数
                
            }
        })
    },
    //页面初始加载
    onLoad: function (options) {
        // debugger
        let self=this;
        self.roomListSearch();//样板间列表查询
        self.searchStyleType();//查询风格和房型
        self.setData({
            type:options.type,//1:新增页面跳转的；2：修改页面跳转的
        })
    },
})