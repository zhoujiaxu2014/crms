import {
  _post,
  _get
} from '../../utils/api.js'
var app = getApp();
var deviceId;
var i = 0;
var serviceId = "0000ffb0-0000-1000-8000-00805f9b34fb"; //服务值
var characteristicId = "0000ffb2-0000-1000-8000-00805f9b34fb"; //特征值
Page({
  data: {
    fileList:[],
    fileImg:[],
    filePath:'',
    updataView: {
      name: '',
      width: '',
      height: '',
      long: '',
      x: 0,
      y: 0,
      men: [],
      chuang: [],
    },
    movableView: [
      {
        name: '客厅',
        width: 3181,
        height: 5331,
        long: 5331,
        x: 150,
        y: 150,
        red: '#a6a6a6',
        men: [{
          direction: '右',
          width: 1500,
          dis: 1000
        }],
        chuang: [{
          direction: '左',
          width: 3500,
          dis: 1000
        }]
      }
    ],
    updateIndex: -1, //当前选中模块的索引
    //以下为门窗
    pkArray: ['门', '窗'],
    pkArray_index: 0,
    positionArray: ['上', '下', '左', '右'],
    positionArray_index: 0,
    pkList: ['请选择'],
    pkList_index: 0,
    Mshow: false,
    rulerWidth: "", //门窗宽度
    rulerLeft: "", //门窗距离墙的距离
    taskidandcustomerid: {}, //任务id与用户id
    onshowaddlable: true, //是否需要显示或者隐藏新增按钮面板 默认加载需要
    isDrag: true, //是否支持拖动
    bluetoothOpen: false, //开启蓝牙
    focuName: 'x', //焦点对象

    imgHuxing:'',
  },
  //户型图预览
  clickHuxingImg(e){
    let self=this;
    let img=e.currentTarget.dataset.path
    let imgList=[]
    imgList.push(img)
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  //文件上传
  afterRead(file){
    let self=this;
    // let baseApi='http://zlxkdev.ardu.cn:8888/crmssw/' //测试服
    let baseApi='https://crms.ardu.cn/crmssw/' //正式服
    // debugger
    self.data.fileList.push({url:file.detail.file.path})
    self.setData({
      fileList:self.data.fileList
    })
    console.log(self.data.fileList)
    let fileImg=file.detail
    let token=wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
    let header={
      'token':token
    }
    wx.uploadFile({
      url: baseApi + '/customersales/file-info/upload', // 
      filePath: fileImg.file.path,
      header: header,
      name: 'file',
      formData: { user: 'text' },
      success(res) {
        let data=JSON.parse(res.data)
        console.log('上传文件成功',res)
        console.log(data)
        if(data.code==='10000'){
          self.setData({
            filePath:data.responseBody.previewPath
          })
          console.log(self.data.filePath)
          wx.showToast({
            title: '图片上传成功',
            icon: 'success',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: '图片上传失败',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail(err){
        wx.showToast({
          title: '图片上传失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  //删除
  deleteImg(file){
    // debugger
    let self=this;
    self.setData({
      fileList:[],
      filePath:'',
      fileImg:[]
    })
    console.log(self.data.fileList)
  },
  //开启蓝牙
  bluetoothOpenCHG: function() {
    this.setData({
      bluetoothOpen: !this.data.bluetoothOpen
    });
    //是否开启蓝牙
    if (this.data.bluetoothOpen) {
      //开启适配器
      wx.openBluetoothAdapter({
        success: function(res) {
          console.log(res, "适配器开启成功")
          wx.startBluetoothDevicesDiscovery({
            services: [],
            success: function(res) {
              console.log(res, "搜索开启成功")
            },
            fail: function(res) {
              wx.showToast({
                title: '搜索失败蓝牙,请重新打开',
                icon: 'none',
                duration: 2000
              })
            },
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '蓝牙未开启',
            icon: 'none',
            duration: 2000
          })
        },
      })
    } else {
      //关闭适配器
      wx.closeBluetoothAdapter({
        success: function(res) {
          console.log(res, "success")
        },
        fail: function(res) {
          console.log(res, "fail")
        },
      })
    }
  },
  clickbluetooth: function() {
    let _this = this;
    wx.getBluetoothDevices({
      success: function(res) {
        console.log(res)
        i = 0;
        let flag = true;
        while (res.devices[i]) {
          console.log(res.devices[i].name, res.devices[i].deviceId);
          if (res.devices[i].name == 'T7') {
            flag = false;
            deviceId = res.devices[i].deviceId;
            wx.createBLEConnection({
              deviceId: deviceId,
              success: function(res) {
                wx.showToast({
                  title: '设备连接成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.notifyBLECharacteristicValueChange({
                  state: true,
                  deviceId: deviceId,
                  serviceId: serviceId,
                  characteristicId: characteristicId,
                  success: function(res) {
                    console.log('notifyBLECharacteristicValueChange success', res.errMsg)
                  }
                })

                function ab2str(buf) {
                  return String.fromCharCode.apply(null, new Uint8Array(buf));
                }
                wx.onBLECharacteristicValueChange(function(res) {
                  //获取到的值
                  console.log('characteristic value comed:', ab2str(res.value));
                  let vlues = ab2str(res.value);
                  vlues = (parseFloat(vlues.substring(0, vlues.length - 3)) * 1000).toFixed(0);
                  if (_this.data.focuName == 'x') {
                    _this.setData({
                      "updataView.width": vlues
                    })
                  } else if (_this.data.focuName == 'y') {
                    _this.setData({
                      "updataView.long": vlues
                    })
                  } else if (_this.data.focuName == 'z') {
                    _this.setData({
                      "updataView.height": vlues
                    })
                  }
                })
              },
            })
          }
          i++;
        }
        if (flag) {
          wx.showToast({
            title: '连接失败,确认是否打开设备蓝牙',
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
  },
  clickFocux: function() {
    this.setData({
      focuName: 'x'
    })
  },
  clickFocuy: function() {
    this.setData({
      focuName: 'y'
    })
  },
  clickFocuz: function() {
    this.setData({
      focuName: 'z'
    })
  },
  onLoad: function(options) {
    this.data.taskidandcustomerid = options; //页面加载后获取到任务id与用户id赋值
    this.setData({
      id: options.taskid
    });
    if (options.type == 9) {
      // 区分是否需要请求尺寸详情接口 type = 9时需要type = 1时不需要
      this.initbase(options.taskid);
      this.setData({
        onshowaddlable: false
      });
    } else {
      this.setData({
        onshowaddlable: true
      });
    }
  },
  initbase(taskid) {
    _get("/crmsdesign/ruler/querydatile/" + taskid).then(res => {
      if (res.data.code == 10000) {
        this.setData({
          movableView: JSON.parse(res.data.responseBody[0].rulers[0].rulerDigest),
          imgHuxing:res.data.responseBody[0].rulers[0].layoutPlan
        })
      }
    })
  },
  // 保存功能
  tapSave() {
    let _this = this;
    var param = {
      customerId: this.data.taskidandcustomerid.customerid,
      taskId: this.data.taskidandcustomerid.taskid,
      customerDemandId: this.data.taskidandcustomerid.customerdemandid,
      rulerAccess: '',
      rulerDigest: JSON.stringify(this.data.movableView),
      layoutPlan:this.data.filePath
    };
    _post("/crmsdesign/ruler/add", param).then(res => {
      if (res.data.code == "10000") {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/ruler/isruler/ruler'
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  //点击其他取消选中
  tapClose: function() {
    //清空点击获取的数据
    let updata = {
      name: '',
      width: '',
      height: '',
      long: '',
      x: 0,
      y: 0,
      men: [],
      chuang: [],
    };
    if (this.data.updateIndex < 0) return true;
    this.setData({
      ["movableView[" + this.data.updateIndex + "].red"]: "#a6a6a6",
      Mshow: false,
      updataView: updata,
      pkList: ['请选择'],
      pkList_index: 0,
      rulerWidth: "",
      rulerLeft: "",
      pkArray_index: 0,
      positionArray_index: 0
    })
  },
  //点击事件 获取对呀的
  setDom: function(e) {
    var index = parseInt(e.currentTarget.id.substring(6)); //截取id  获取索引
    //赋值
    this.data.movableView.forEach((item, i) => {
      this.setData({
        ["movableView[" + i + "].red"]: "#a6a6a6",
      })
    })
    //获取点击的所有门窗
    let pkList = ['请选择'];
    this.data.movableView[index].men.forEach((item, index) => {
      pkList.push("门" + item.direction + (index + 1));
    })
    this.data.movableView[index].chuang.forEach((item, index) => {
      pkList.push("窗" + item.direction + (index + 1));
    })
    this.setData({
      updataView: JSON.parse(JSON.stringify(this.data.movableView[index])),
      ["movableView[" + index + "].red"]: "#dd7a7a",
      updateIndex: index,
      Mshow: true,
      pkList: pkList
    })
  },
  //修改
  tapModify: function(e) {
    let _this = this;
    var index = parseInt(_this.data.updateIndex); //截取id  获取索引
    if (index > -1) {
      wx.showModal({
        title: '提示',
        content: '确认是否修改',
        success(res) {
          if (res.confirm) {
            _this.setData({
              ["movableView[" + index + "]"]: JSON.parse(JSON.stringify(_this.data.updataView))
              // updateIndex: ''
            })
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '当前没有选中模块',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //删除
  tapDel: function() {
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确认是否修改',
      success(res) {
        if (res.confirm) {
          var index = parseInt(_this.data.updateIndex); //截取id  获取索引
          if (index > -1) {
            let list = JSON.parse(JSON.stringify(_this.data.movableView));
            list.splice(index, 1);
            _this.setData({
              movableView: []
            })
            setTimeout(function() {
              _this.setData({
                movableView: list,
                updateIndex: '-1',
                Mshow: false
              })
            }, 10)
          }
        }
      }
    })
  },
  //拖拽事件
  setChange: function(e) {
    if (this.data.isDrag) {
      var index = parseInt(e.currentTarget.id.substring(6)); //截取id  获取索引
      this.setData({
        ["movableView[" + index + "].x"]: e.detail.x,
        ["movableView[" + index + "].y"]: e.detail.y,
      })
    }
  },
  touchStart: function(e) {
    this.data.isDrag = true;
  },
  touchEnd: function(e) {
    this.data.isDrag = false;
  },
  //新增块
  tapAdd: function() {
    this.onReady();
    this.data.updataView['x'] = 10;
    this.data.updataView['y'] = 10;
    if (this.data.updataView.name == '') {
      wx.showToast({
        title: '请输入模型名称',
        icon: 'none',
        duration: 1000
      })
      return true;
    } else if (this.data.updataView.width == '') {
      wx.showToast({
        title: '请输入模型长度',
        icon: 'none',
        duration: 1000
      })
      return true;
    } else if (this.data.updataView.height == '') {
      wx.showToast({
        title: '请输入模型高度',
        icon: 'none',
        duration: 1000
      })
      return true;
    } else if (this.data.updataView.long == '') {
      wx.showToast({
        title: '请输入模型宽度',
        icon: 'none',
        duration: 1000
      })
      return true;
    }
    this.setData({
      ["movableView[" + this.data.movableView.length + "]"]: JSON.parse(JSON.stringify(this.data.updataView))
    })
    console.log(this.data.movableView)
    wx.showToast({
      title: '新增成功',
      icon: 'none',
      duration: 1000
    })
  },
  //选择类型
  bindPickerChange: function(e) {
    this.setData({
      pkArray_index: e.detail.value
    })
  },
  //位置类型
  bindposChange: function(e) {
    this.setData({
      positionArray_index: e.detail.value
    })
  },
  bindPkList: function(e) {
    let inList = this.data.pkList[e.detail.value];
    let json = '';
    if (inList.indexOf('门') > -1) {
      json = this.data.movableView[this.data.updateIndex].men[inList.substring(2) - 1];
      this.setData({
        pkArray_index: 0
      })
    } else if (inList.indexOf('窗') > -1) {
      json = this.data.movableView[this.data.updateIndex].chuang[inList.substring(2) - 1];
      this.setData({
        pkArray_index: 1
      })
    }
    if (inList.substring(1, 2) == '上') {
      this.setData({
        positionArray_index: 0
      })
    } else if (inList.substring(1, 2) == '下') {
      this.setData({
        positionArray_index: 1
      })
    } else if (inList.substring(1, 2) == '左') {
      this.setData({
        positionArray_index: 2
      })
    } else if (inList.substring(1, 2) == '右') {
      this.setData({
        positionArray_index: 3
      })
    }
    this.setData({
      pkList_index: e.detail.value,
      rulerWidth: json.width,
      rulerLeft: json.dis,
    })
  },
  //修改门窗
  updataDoors: function() {
    //以下为门窗
    let inList = this.data.pkList[this.data.pkList_index];
    let json = '';
    let list = {
      direction: this.data.positionArray[this.data.positionArray_index],
      width: this.data.rulerWidth,
      dis: this.data.rulerLeft
    }
    //0为门  1为窗
    if (this.data.pkArray_index == 0) {
      this.setData({
        ["movableView[" + this.data.updateIndex + "].men[" + (parseInt(inList.substring(2)) - 1) + "]"]: list
      })
    } else if (this.data.pkArray_index == 1) {
      this.setData({
        ["movableView[" + this.data.updateIndex + "].chuang[" + (parseInt(inList.substring(2)) - 1) + "]"]: list
      })
    } else {
      wx.showToast({
        title: '没有可修改数据',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //删除门窗
  delDoors: function() {
    let _this = this;
    var index = this.data.updateIndex;
    let inList = this.data.pkList[this.data.pkList_index];
    //判断是否是门窗 0为新增门 反之 为窗
    if (inList != '请选择') {
      wx.showModal({
        title: '提示',
        content: '确认是否删除',
        success(res) {
          if (res.confirm) {
            if (_this.data.pkArray_index == 0) {
              _this.data.movableView[_this.data.updateIndex].men.splice((parseInt(inList.substring(2)) - 1), 1);
              let pkList = ['请选择'];
              _this.data.movableView[index].men.forEach((item, index) => {
                pkList.push("门" + item.direction + (index + 1));
              })
              _this.data.movableView[index].chuang.forEach((item, index) => {
                pkList.push("窗" + item.direction + (index + 1));
              })
              _this.setData({
                ["movableView[" + _this.data.updateIndex + "].men"]: _this.data.movableView[_this.data.updateIndex].men,
                pkList: pkList,
                pkList_index: 0,
                rulerWidth: "",
                rulerLeft: "",
                pkArray_index: 0,
                positionArray_index: 0
              })
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 1000
              })
            } else if (_this.data.pkArray_index == 1) {
              _this.data.movableView[_this.data.updateIndex].chuang.splice((parseInt(inList.substring(2)) - 1), 1);
              let pkList = ['请选择'];
              _this.data.movableView[index].men.forEach((item, index) => {
                pkList.push("门" + item.direction + (index + 1));
              })
              _this.data.movableView[index].chuang.forEach((item, index) => {
                pkList.push("窗" + item.direction + (index + 1));
              })
              _this.setData({
                ["movableView[" + _this.data.updateIndex + "].chuang"]: _this.data.movableView[_this.data.updateIndex].chuang,
                pkList: pkList,
                pkList_index: 0,
                rulerWidth: "",
                rulerLeft: "",
                pkArray_index: 0,
                positionArray_index: 0
              })
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: '没有可删除数据',
                icon: 'none',
                duration: 1000
              })
            }

          }
        }
      })

    } else {
      wx.showToast({
        title: '没有可删除数据',
        icon: 'none',
        duration: 1000
      })
    }
  },
  //新增门窗
  addDoors: function() {
    let list = {
      direction: this.data.positionArray[this.data.positionArray_index],
      width: this.data.rulerWidth,
      dis: this.data.rulerLeft
    }
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确认是否新增',
      success(res) {
        if (res.confirm) {
          //判断是否是门窗 0为新增门 反之 为窗
          if (_this.data.pkArray_index == 0) {
            _this.setData({
              ["movableView[" + _this.data.updateIndex + "].men"]: _this.data.movableView[_this.data.updateIndex].men.concat(list)
            })
          } else {
            _this.setData({
              ["movableView[" + _this.data.updateIndex + "].chuang"]: _this.data.movableView[_this.data.updateIndex].chuang.concat(list)
            })
          }
          let pkList = ['请选择'];
          _this.data.movableView[index].men.forEach((item, index) => {
            pkList.push("门" + item.direction + (index + 1));
          })
          _this.data.movableView[index].chuang.forEach((item, index) => {
            pkList.push("窗" + item.direction + (index + 1));
          })
          _this.setData({
            pkList: pkList,
            pkList_index: 0,
            rulerWidth: "",
            rulerLeft: "",
            pkArray_index: 0,
            positionArray_index: 0
          })
          wx.showToast({
            title: '新增成功',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },

  //以下是双向绑定设置
  bind_name(e) {
    this.setData({
      ["updataView.name"]: e.detail.value
    })
  },
  bind_long(e) {
    this.setData({
      ["updataView.long"]: parseInt(e.detail.value)
    })
  },
  bind_width(e) {
    this.setData({
      ["updataView.width"]: parseInt(e.detail.value)
    })
  },
  bind_height(e) {
    this.setData({
      ["updataView.height"]: parseInt(e.detail.value)
    })
  },
  bind_Menwidth(e) {                                    
    this.setData({
      rulerWidth: parseInt(e.detail.value)
    })
  },
  bind_MenDis(e) {
    this.setData({
      rulerLeft: parseInt(e.detail.value)
    })
  }
})