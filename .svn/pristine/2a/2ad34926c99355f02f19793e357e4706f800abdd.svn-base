import {
	_put,
	_post,
	_get
} from '../../utils/api'
const DEFAULT_PAGE = 0;
// let city = require('../../assets/data/allCity');
Page({
	startPageX: 0,
	currentView: DEFAULT_PAGE,
	/**
	 * 页面的初始数据
	 */
	data: {
    
		addmissage: '',
		// markers	 Array	标记点
		stitle: '',
		latitude: "",
		longitude: "",
		scale: 8,
		markers: [],
		//controls控件 是左下角圆圈小图标,用户无论放大多少,点这里可以立刻回到当前定位(控件（更新一下,即将废弃，建议使用 cover-view 代替）)
		controls: [{
			id: 1,
			iconPath: './assect/zuobiao.png',
			position: {
				left: 20,
				top: 300 - 50,
				width: 20,
				height: 20
			},
			clickable: true
		}],
		distanceArr: [],
		skj: '',
		//当前坐标
		currentCoordinates: '',
		toView: `card_${DEFAULT_PAGE}`,
		list: '',
		seTOUT: false,
		searchKey: '',
		//当前位置
		mylat: '',
		mylong: '',
		//活动列表
		popupsShow: false,
		popupsActive: '',
		mapCtx: '',
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	// onReady: function(e) {
	// 	// 使用 wx.createMapContext 获取 map 上下文
	// 	this.mapCtx = wx.createMapContext('myMap')
  // },
  //城市组件
  goAddress(){
    let self=this;
    wx.navigateTo({
			url: "/pages/searchCity/searchCity"
		})
  },
	onLoad: function(options) {
    // debugger
    this.addMap()
    // let citySearch=getApp().globalData.cityNameSearch
    // if(citySearch){
    //   this.getLnglat(citySearch)
    // }
  },
  onShow: function(options) {
    // debugger
    let self=this
    // self.addMap()
    self.setData({
      myCity:getApp().globalData.cityNameSearch
    })
    let citySearch=getApp().globalData.cityNameSearch
    if(citySearch){
      this.getLnglat(citySearch)
    }
	},
	//打电话给我
	payPhone(data) {
		wx.makePhoneCall({
			phoneNumber:data.currentTarget.dataset.gid
		})
	},
	//查看720
	lockserve(data) {
		wx.navigateTo({
			url: "/pages/my/sto/sto?url=" + data.currentTarget.dataset.gid.sampleRoom720
		})
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
	//关闭弹窗
	onClose() {
		this.setData({
			popupsShow: false
		})
	},
	//查看活动
	ViewActivities(data) {
		// data.currentTarget.dataset.gid.sampleRoomDealerId = '690197283194535936'
		_get(
			`/zuul/customersales/draw-lottery-manage/showEvent/byDealerId/${data.currentTarget.dataset.gid.sampleRoomDealerId}`
		).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				this.setData({
					popupsActive: res.responseBody.records,
					popupsShow: true
				})
			} else {
				wx.showToast({
					title: '获取活动信息失败',
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			console.log(e)
			wx.showToast({
				title: '获取活动信息失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	searchapi() {
		// let obj ={
		// 	longitude:this.data.mylong
		// 	latitude:this.data.mylat,
		// 	keyWord:this.data.searchKey
		// }
		// /crmsSampleRoomInfo/getSampleRoomList/search 
		// longitude 经度 latitude 纬度    keyWord 关键字
		_get(
			`/zuul/customersales/crmsSampleRoomInfo/getSampleRoomList/search?longitude=${this.data.mylong}&latitude=${this.data.mylat}&keyWord=${this.data.searchKey}`
		).then(({
			data: res
		}) => {
			console.log(res)
			if (res.code == '10000') {
				if (this.data.searchKey == '' && res.responseBody.length == 0) {
					this.addMap()
					return false
				}
				if (res.responseBody.length == 0) {
					wx.showToast({
						title: '暂无搜索到到相关数据',
						icon: 'none',
						duration: 2000
					})
				} else {
					this.setData({
						list: res.responseBody
					})
					let a = []
					res.responseBody.forEach(item => {
						a.push({
							id: item.sampleRoomId,
							latitude: item.sampleRoomLatitude,
							longitude: item.sampleRoomLongitude,
							iconPath: './assect/myloccc.png',
							callout: {
								content: item.sampleRoomCity + item.sampleRoomArea + item.sampleRoomDistrict + item.sampleRoomNumber,
								bgColor: "#FA3E42",
								color: "#fff",
								padding: "2px",
								borderRadius: "1px",
								borderWidth: "1px",
								borderColor: "#FA3E42",
							}
						})
					})
					// this.translateMarker(this.data.list[0])
					this.setData({
						skj: a
          })
          //不知道是何作用，先注释------获取附近的店同理
					// var that = this
					// //获取当前的地理位置
					// wx.getLocation({
					// 	success: function(res) {
					// 		console.log(res)
					// 		that.setData({
					// 			currentCoordinates: res
					// 		})
					// 		//赋值经纬度
					// 		that.setData({
					// 			latitude: res.latitude,
					// 			longitude: res.longitude,
					// 			markers: that.data.skj
					// 		})
					// 	}
					// })
				}
			} else {
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			wx.showToast({
				title: '搜索失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	onChange(event) {
		this.setData({
			searchKey: event.detail.trim()
		})
	},
	//移动
	// translateMarker: function(data) {
	// 	console.log(data)
	// 	let z = data.sampleRoomLatitude
	// 	let x = data.sampleRoomLongitude
	// 	console.log(parseInt(data.sampleRoomId))
	// 	this.mapCtx.translateMarker({
	// 		markerId: parseInt(data.sampleRoomId),
	// 		autoRotate: true,
	// 		duration: 1000,
	// 		destination: {
	// 			latitude: z,
	// 			longitude: x,
	// 		},
	// 		animationEnd() {
	// 			console.log('animation end')
	// 		},
	// 		fail: function(res) {
	// 			console.log(res)
	// 		}
	// 	})
	// 	debugger
	// },
	//地图
	addMap() {
		var that = this
    //获取当前的地理位置
    let QQMapWX =  require("../../pages/common/sdk/qqmap-wx-jssdk.js");
    let qqmapsdk = new QQMapWX({
      key: '3JRBZ-LDYCP-KAADB-V25Q2-7IX7J-LTFJ5'
    });
		wx.getLocation({
			success: function(res) {
				console.log(res)
				that.setData({
					currentCoordinates: res
				})
				//获取附近的店
				that.getnearRoom()
				//赋值经纬度
				that.setData({
					latitude: res.latitude,
					longitude: res.longitude,
					markers: that.data.skj
				})
				that.setData({
					mylat: res.latitude,
					mylong: res.longitude
        })
        //获取当前城市名
        qqmapsdk.reverseGeocoder({//腾讯地图api 逆解析方法 首先设计经纬度
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            // debugger
            that.setData({
              myCity:addressRes.result.address_component.city
            })
            console.log('正确的城市名', addressRes.result.address)
          },
          fail: function (error) {
           
           },
           complete: function (addressRes) {
            //  wx.showToast({
            //    title: addressRes,
            //    icon: 'success',
            //    duration: 2000
            //  })
           }
        })
			}
		})
	},
	touchEnd(e) {
		//开发工具无bug 手机测试有bug 先不用 4.26zjx 根据滑动来显示卡片动画
		// const moveX = e.changedTouches[0].pageX - this.startPageX;
		// const maxPage = this.data.list.length - 1;
		// if (Math.abs(moveX) >= 150) {
		// 	if (moveX > 0) {
		// 		this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
		// 	} else {
		// 		this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
		// 	}
		// }
		// this.setData({
		// 	toView: `card_${this.currentView}`
		// });
	},
	touchStart(e) {
		this.startPageX = e.changedTouches[0].pageX;
	},
	//获取附近的店
	getnearRoom() {
		_get(
			`/zuul/customersales/crmsSampleRoomInfo/getSampleRoomList?longitude=${this.data.currentCoordinates.longitude}&latitude=${this.data.currentCoordinates.latitude}`
		).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				this.setData({
					list: res.responseBody
				})
				let a = []
				res.responseBody.forEach(item => {
					a.push({
						id: item.sampleRoomId,
						latitude: item.sampleRoomLatitude,
						longitude: item.sampleRoomLongitude,
						iconPath: './assect/myloccc.png',
						callout: {
							content: item.sampleRoomCity + item.sampleRoomArea + item.sampleRoomDistrict + item.sampleRoomNumber,
							bgColor: "#FA3E42",
							color: "#fff",
							padding: "2px",
							borderRadius: "1px",
							borderWidth: "1px",
							borderColor: "#FA3E42",
						}
					})
				})
				this.setData({
					skj: a
				})
				var that = this
				//获取当前的地理位置
				wx.getLocation({
					success: function(res) {
						console.log(res)
						that.setData({
							currentCoordinates: res
						})
						//赋值经纬度
						that.setData({
							latitude: res.latitude,
							longitude: res.longitude,
							markers: that.data.skj
						})
					}
				})
			} else {
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			wx.showToast({
				title: '获取活动信息失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//controls控件的点击事件
	bindcontroltap(e) {
		var that = this;
		if (e.controlId == 1) {
			that.setData({
				latitude: this.data.latitude,
				longitude: this.data.longitude,
				scale: 14,
			})
		}
	},
	//获取点击到经纬度 
	bindmarkertap(e) {
		console.log(e.markerId)
		this.data.skj.forEach((item, index) => {
			if (item.id == e.markerId) {
				this.setData({
					toView: `card_${index}`
				});
			}
		})
  },
  //知道城市名，获取经纬度
  getLnglat: function (addressName) { 
    // debugger
    let self=this
    wx.request({    	
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',    	
      data: {    	  
        address: addressName,    	  
        output: 'json',
        key: '3JRBZ-LDYCP-KAADB-V25Q2-7IX7J-LTFJ5'    	
      },    	
      success: function (res) {  
        console.log(res); 
        // debugger
        self.setData({
          latitude:res.data.result.location.lat,
          longitude:res.data.result.location.lng,
          mylat: res.data.result.location.lat,
          mylong: res.data.result.location.lng,
          ['currentCoordinates.longitude']:res.data.result.location.lng,
          ['currentCoordinates.latitude']:res.data.result.location.lat,
        })

        _get(
          `/zuul/customersales/crmsSampleRoomInfo/getSampleRoomList?longitude=${self.data.mylong}&latitude=${self.data.mylat}`
        ).then(({
          data: res
        }) => {
          if (res.code == '10000') {
            // debugger
            self.setData({
              list: res.responseBody
            })
            let a = []
            res.responseBody.forEach(item => {
              a.push({
                id: item.sampleRoomId,
                latitude: item.sampleRoomLatitude,
                longitude: item.sampleRoomLongitude,
                iconPath: './assect/myloccc.png',
                callout: {
                  content: item.sampleRoomCity + item.sampleRoomArea + item.sampleRoomDistrict + item.sampleRoomNumber,
                  bgColor: "#FA3E42",
                  color: "#fff",
                  padding: "2px",
                  borderRadius: "1px",
                  borderWidth: "1px",
                  borderColor: "#FA3E42",
                }
              })
            })
            self.setData({
              skj: a
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        }).catch((e) => {
          wx.showToast({
            title: '获取活动信息失败',
            icon: 'none',
            duration: 2000
          })
        });
      }
    });
  },
	//导航
	onGuideTap: function(event) {
		var lat = Number(event.currentTarget.dataset.gid.sampleRoomLatitude);
		var lon = Number(event.currentTarget.dataset.gid.sampleRoomLongitude);
		var bankName = event.currentTarget.dataset.gid.sampleRoomName;
		wx.openLocation({
			type: 'gcj02',
			latitude: lat,
			longitude: lon,
			name: bankName,
			scale: 28
		})
  },
  //导航跳转
  jump(e){
    let self=this;
    let num=e.currentTarget.dataset.num
    if(num==1){//首页
      wx.redirectTo({
        //不带返回
        url: '/pages/index/index',
      })
    }else if(num==2){//智慧报价
      wx.redirectTo({
        //不带返回
        url: '/pages/clientSide/index/myArdu/demandCollection/demandCollection',
      })
    }else if(num==3){//我的
      wx.redirectTo({
        //不带返回
        url: '/pages/clientSide/index/myArdu/myArdu',
      })
    }
  },
})
