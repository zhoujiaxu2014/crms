//获取应用实例
const app = getApp();

var deviceId = ''; //设备ID
var serviceId=''; //服务ID，一个设备下能有多个服务
var characteristicId = ''; //特征值ID，一个服务下能有多个特征值，其中某个才是可写的（可发送二进制数据给设备）

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

//字符串转ArrayBuffer
function string2buffer(str) {
  // 首先将字符串转为16进制
  let val = ""
  for (let i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16)
    } else {
      val += ',' + str.charCodeAt(i).toString(16)
    }
  }
  // 将16进制转化为ArrayBuffer
  return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  })).buffer
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  openblue:function(){
    
   var that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(res); 
        that.setData({ motto: "开启蓝牙：" + res.errMsg });
      }
      ,fail:function(res){
		  console.log(res); 
        that.setData({motto:"蓝牙开启失败："+res});
      } 
    }) 
    
  }, 
  getallblue:function(){
    var that = this;
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res.devices)
		for(var i = 0;i<res.devices.length;i++){
			if (res.devices[i].name == 'T7') {
			  deviceId = res.devices[i].deviceId;
			  that.setData({ motto: "第一个蓝牙设备：\n name: "+res.devices[i].name+"\n deviceId:"+res.devices[i].deviceId });
			}
		}
      }
    })
  },
  connectblue:function(){
    var that = this;
    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
      deviceId: deviceId,
      success: function (res) {
        console.log(res)
        that.setData({ motto:"连接蓝牙设备："+res.errMsg});
      }
      ,fail:function(res){
		  console.log(res)
        that.setData({ motto: "连接蓝牙设备失败：" + res.errMsg });
      }
    })
  },
  getservice:function(){
    var that = this;
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
      deviceId: deviceId,
      success: function (res) {
        console.log('device services:', res.services)
        serviceId = res.services[2].uuid; //2-0,1,2,3 3-0,1,2,4
        that.setData({ motto: res.errMsg + " \n uuid:" + serviceId });
      }
      ,fail:function(){
        that.setData({ motto: "失败：" + res.errMsg });
      }
    })
  },
  getchara:function(){
    var that = this;
    wx.getBLEDeviceCharacteristics({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: serviceId,
      success: function (res) {
        characteristicId = res.characteristics[0].uuid;
        console.log('device getBLEDeviceCharacteristics:', res.characteristics);
        that.setData({ motto: res.errMsg + "\n 特征值UUID：" + characteristicId });
      }
      ,fail:function(res){
        that.setData({ motto:"失败："+ res.errMsg });
      }
    })
  },
   lanyatest9(event){
      wx.notifyBLECharacteristicValueChange({
        state: true, // 启用 notify 功能
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        success: function (res) {
          console.log('notifyBLECharacteristicValueChange success', res)
        },
        fail: function () {
          console.log('启动notify:',res);
        },
      })
   
   
    },
  startread:function(){
	    var that = this;
	    wx.readBLECharacteristicValue({
	    
	    deviceId: deviceId,
	    
	    serviceId: serviceId,
	    
	    characteristicId: characteristicId,
	    
	    success: function (res) {
	    
	    console.log('readBLECharacteristicValue:', res);
		wx.onBLECharacteristicValueChange(function (res) {
			  // console.log("characteristicId：" + res.characteristicId)
			  // console.log("serviceId:" + res.serviceId)
			  // console.log("deviceId" + res.deviceId)
			  // console.log("Length:" + res.value.byteLength)
			  console.log(res.value)
			  console.log("hexvalue1:" + ab2hex(res.value))
			   
			})
	    }
	    })
  },
  writedata:function(){
    var that = this;
    // 向蓝牙设备发送一个0x00的16进制数据
    /*let buffer = new ArrayBuffer(1)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, 0)
    */
    let buffer = string2buffer("000000UA0100000");
    console.log("buffer :"+buffer);

    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: serviceId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: characteristicId,
      // 这里的value是ArrayBuffer类型
      value: buffer,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg);
        that.setData({ motto: "写入蓝入设备（降）：" + res.errMsg });
      }
      ,fail:function(res){
        that.setData({motto:"写数据到蓝牙设备失败："+res.errMsg});
      }
    })
  },
  writedata2:function(){
    var that = this;
    // 向蓝牙设备发送一个0x00的16进制数据
    /*let buffer = new ArrayBuffer(1)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, 0)
    */
    let buffer = string2buffer("000000UA0200000");
    console.log("buffer :" + buffer);

    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: serviceId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: characteristicId,
      // 这里的value是ArrayBuffer类型
      value: buffer,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg);
        that.setData({ motto: "写入蓝入设备（升）：" + res.errMsg });
      }
      , fail: function (res) {
        that.setData({ motto: "写数据到蓝牙设备失败：" + res.errMsg });
      }
    })
  },
  shaomiao:function(){
    var that = this;
    // 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
    wx.startBluetoothDevicesDiscovery({ 
      //services: ['YH000001222'],
      success: function (res) {
        console.log(res);
        that.setData({ motto:   res.errMsg });
      }
      , fail: function (res) {
        that.setData({ motto: "失败：" + res.errMsg });
      }
    }) 


   /* 
    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
      deviceId: 'YH000001222',
      success: function (res) {
        console.log(res);
        that.setData({ motto: "连接蓝牙设备：" + res.errMsg });
      }
      ,fail:function(res){
        that.setData({ motto: "连接蓝牙设备失败：" + res.errMsg });
      }
    })*/
  },
  closeblue:function(){
    var that = this;
    wx.closeBluetoothAdapter({
      success: function (res) {
        console.log(res);
        that.setData({ motto: "关闭蓝牙:"+res.errMsg });
      }
    })
   
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})