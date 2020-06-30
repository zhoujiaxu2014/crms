// pages/ageActive/age.js
let app = getApp();
let animationShowHeight = 20;
import {
	_put,
	_post,
	_get
} from '../../utils/api'
import QRCode from '../../utils/weapp-qrcode.js'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activePrize: ['电饭锅', '电视剧', '冰箱', '老婆'],
		//控制中奖记录
		show: false,
		isOpportunity: false,
		//活动信息
		activeData: '',
		//把动画存起来
		animationSession: '',
		isLanding: '',
		showlandingDialog: false,
		canvasShow: true,
		userPhone: '',
		//奖品
		ProductPrize: '',
		//抽奖次数
		lotteryNumber: 0,
		//中奖记录
		TheWinningRecord: '',
		//二维码弹出框
		Qrshow: false,
		//奖品展示
		ThePrizelist: [],
		//抽奖弹窗
		LuckyDrawShow: false,
		//动画
		animation: '',
		animation1: '',
		animation2: '',
		//鸡蛋
		ageShow: false,
		ageShow1: false,
		ageShow2: false,
		// 锤子
		chuiziShow: false,
		chuiziShow1: false,
		chuiziShow2: false,
		chuizianimation: '',
		chuizianimation1: '',
		chuizianimation2: '',
		//重复提交
		repeatSubFlag: true,
		//中奖信息
		winningInformation: '',
		//二维码弹出框
		Qrshow: false,
		//活动ID
		activeID: '',
		//客户ID
		customerID: '',
		//分享进来的客户ID
		ShareID:null,
		userID:'',
		userPhone:'',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let that = this
		console.log(options)
		//如果客户是通过点击分享链接进来的
		if (options.customerID) {
			this.setData({
				ShareID: options.customerID
			})
		}
		this.setData({
			activeID: options.id
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function(options) {
		let that = this
		//获取token
		if (wx.getStorageSync('token')) {
			//获取新token（再执行其他操作）
			this.getNewToken()
		} else {
			wx.login({
			  success: res => {
			    // _this.globalData.code=res.code;
				that.setData({
					userID:res.code
				})
				console.log(that.data.userID)
			  }
			})
			//未获取到token
			this.setData({
				isLanding: false
			})
			this.setData({
				canvasShow: false
			})
			this.setData({
				showlandingDialog: true
			})
			//获取活动信息
			this.getActiveData()
		}
		//蛋
		var animation = wx.createAnimation({
			duration: 1000,
			timingFunction: 'ease',
		})
		var animation1 = wx.createAnimation({
			duration: 1000,
			timingFunction: 'ease',
		})
		var animation2 = wx.createAnimation({
			duration: 1000,
			timingFunction: 'ease',
		})
		this.animation = animation
		this.animation1 = animation1
		this.animation2 = animation2
		var next = true;
		let a = setInterval(function() {
			//调用动画实例方法来描述动画
			if (next) {
				animation.translateX(1).step();
				animation.rotate(2).step()
				next = !next;
			} else {
				animation.translateX(-1).step();
				animation.rotate(-2).step()
				next = !next;
			}
			if (next) {
				animation1.translateX(1).step();
				animation1.rotate(2).step()
				next = !next;
			} else {
				animation1.translateX(-1).step();
				animation1.rotate(-2).step()
				next = !next;
			}
			if (next) {
				animation2.translateX(1).step();
				animation2.rotate(2).step()
				next = !next;
			} else {
				animation2.translateX(-1).step();
				animation2.rotate(-2).step()
				next = !next;
			}
			//3: 将动画export导出，把动画数据传递组件animation的属性 
			this.setData({
				animation: animation.export()
			})
			this.setData({
				animation1: animation1.export()
			})
			this.setData({
				animation2: animation2.export()
			})
		}.bind(this), 500)
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

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

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	//用户分享
	onShareAppMessage: function(options) {
		// this.data.activeData
		let userID = this.data.customerID; //客户ID
		var activityId = this.data.activeID; //活动ID
		var activityName = this.data.activeData.luckyDrawName;
		debugger
		return {
			title: '砸金蛋赢大奖',
			desc: activityName,
			path: `/pages/ageActive/age?customerID=${userID}&id=${activityId}`
		}
	},
	//关闭二维码弹框
	closeQrcode() {
		this.setData({
			Qrshow: false
		})
	},
	//生成二维码
	getQrCode(eqid) {
		new QRCode('myQrcode', {
			text: eqid,
			width: 200,
			height: 200,
			padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
			correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
			callback: (res) => {
				console.log(res.path)
			}
		})
	},
	//抽奖
	LuckyDraw() {
		//抽奖
		_get(`/zuul/customersales/draw-lottery-manage/draw/${this.data.activeID}`).then(({
			data: res
		}) => {
			if (res.code == '3003') {
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
				return false
			}
			//开始抽奖 获取奖品
			if (res.code == '10000') {
				console.log(res)
				this.setData({
					winningInformation: res.responseBody
				})
				this.setData({
					repeatSubFlag: true
				})
				wx.showToast({
					image: 'assets/gift.png',
					title: this.data.winningInformation.awardName,
					duration: 2000,
					mask: true,
				})
				//获取抽奖次数
				this.getUserInfo()
				//判断鸡蛋
				if (this.data.ageShow && this.data.ageShow1 && this.data.ageShow2) {
					// var chuizianimation = wx.createAnimation({
					// 	duration: 100,
					// 	timingFunction: 'ease-in-out',
					// })
					// var chuizianimation1 = wx.createAnimation({
					// 	duration: 100,
					// 	timingFunction: 'ease-in-out',
					// })
					// var chuizianimation2 = wx.createAnimation({
					// 	duration: 100,
					// 	timingFunction: 'ease-in-out',
					// })
					//没有蛋可以砸了
					this.setData({
						animation: '',
						animation1: '',
						animation2: '',
						ageShow: false,
						ageShow1: false,
						ageShow2: false,
						chuiziShow: false,
						chuiziShow1: false,
						chuiziShow2: false,
						chuizianimation: '',
						chuizianimation1: '',
						chuizianimation2: '',
						// chuizianimation : chuizianimation,
						// chuizianimation1 : chuizianimation1,
						// chuizianimation2 : chuizianimation2
					})
				}
			} else {
				this.setData({
					repeatSubFlag: true
				})
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			this.setData({
				repeatSubFlag: true
			})
			console.log(e)
			wx.showToast({
				title: '获取奖品失败，请稍后再试',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//获取活动信息
	getActiveData: function() {
		_get(`/zuul/customersales/draw-lottery-manage/${this.data.activeID}`).then(({
			data: res
		}) => {
			console.log(res)
			if (res.code == '10000') {
				this.setData({
					activeData: res.responseBody
				})
				// ThePrizelist
				//处理奖品列表展示
				let a = []
				this.data.activeData.awardList.forEach(item => {
					if (item.awardName != '谢谢惠顾') {
						a.push({
							name: item.awardName,
							level: item.awardLevel
						})
					}
				})
				this.setData({
					ThePrizelist: a
				});
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
	//获取奖品code 领奖
	getPrizecode(id) {
		_get(`/customersales/reward-history/redemption/${id}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				console.log(res)
				// let url = 'http://zlxkdev.ardu.cn:8888//crms-drm/html/logding.html?'+res.responseBody
				let url = 'https://crms.ardu.cn/crms-drm/html/logding.html?'+res.responseBody
				this.getQrCode(url)
				this.setData({
					Qrshow: true
				})
			} else {
				this.showlandingDialog = true
				wx.showToast({
					title: '获取兑奖码失败',
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			console.log(e)
			wx.showToast({
				title: '获取兑奖码失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//完善信息/领取奖品
	receivePrize(flag) {
		console.log(flag.currentTarget.dataset.gid)
		if (flag.currentTarget.dataset.gid.rewardState == 0) {
			//完善信息
			wx.navigateTo({
				url: `/pages/Perfectinformation/index?&id=${flag.currentTarget.dataset.gid.rewardHistoryId}&flag=1&activeID=${this.data.activeID}&orgid=${this.data.activeData.issuingOrgId}&phone=${this.data.userPhone}`
			})
		} else if (flag.currentTarget.dataset.gid.rewardState == 1) {
			//领取奖品
			//获取兑奖码
			this.getPrizecode(flag.currentTarget.dataset.gid.rewardHistoryId)
		} else if (flag.currentTarget.dataset.gid.rewardState == 2) {
			wx.showToast({
				title: '您已经领取该奖品啦',
				icon: 'none',
				duration: 2000
			})
		}
	},
	//获取新token
	getNewToken() {
		_get("/zuul/crmsadmin/token/refresh").then(({
			data: res
		}) => {
			console.log(res)
			if (res.code == '10000') {
				wx.setStorageSync('token', res.responseBody)
				//获取到token
				this.setData({
					isLanding: true
				})
				//获取活动信息
				this.getActiveData()
				//获取抽奖次数
				this.getUserInfo()
				//获取中奖记录
				this.getWinningRecord()
				//获取用户抽奖次数
			} else {
				wx.showToast({
					title: '获取token失败，用户登陆失败',
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			wx.showToast({
				title: '获取token失败，用户登陆失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//获取中奖记录
	getWinningRecord() {
		let obj = {
			"current": 1,
			"size": 100,
			"eventId":this.data.activeID
		}
		_post(`/customersales/reward-history/list`, obj).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				console.log(res)
				this.setData({
					TheWinningRecord: res.responseBody
				})
			} else {
				wx.showToast({
					title: '获取中奖列表失败',
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			console.log(e)
			wx.showToast({
				title: '获取中奖列表失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//登陆后获取用户信息
	getUserInfo() {
		let obj = {
			phone: this.data.userPhone,
			//活动ID
			eventId: this.data.activeID,
			shareId:this.data.ShareID
		}
		_post("/zuul/customersales/draw-users/enter", obj).then(({
			data: res
		}) => {
			console.log(res)
			if (res.code == '10000') {
				//手机号
				this.setData({
					userPhone:res.responseBody.userPhone
				})
				//用户没有授权 存token
				wx.setStorageSync('token', res.responseBody.token)
				//获取到token
				//查用户抽奖次数
				this.getLotteryNumber()
				//获取中奖记录
				this.getWinningRecord()
			} else {
				this.showlandingDialog = true
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
			}
			this.setData({
				canvasShow: true
			})
		}).catch((e) => {
			this.showlandingDialog = true
			console.log(e)
			wx.showToast({
				title: '获取用户信息失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//授权登陆
	getPhone(e) {
		let self = this;
		let json = e.detail;
		console.log(e)
		_get("/customersales/userScanCode/wxUserInfo/" + self.data.userID).then(res => {
			console.log(res)
			json.session_key = res.data.responseBody.session_key;
			_post("/customersales/userScanCode/binding/phoneNumber", json).then(({
				data: res
			}) => {
				if (res.code == '10000') {
					//获取到手机号
					self.setData({
						userPhone: res.responseBody
					})
					console.log(this.data.userPhone)
					//获取用户信息
					this.getUserInfo()
				} else {
					wx.showToast({
						title: '用户登陆失败',
						icon: 'none',
						duration: 2000
					})
				}
			})
		})
	},
	//授权登陆关闭
	onClose() {
		this.showlandingDialog = false
		wx.showToast({
			title: '用户取消授权',
			icon: 'none',
			duration: 2000
		})
	},
	closeLuckyDrawShow() {
		this.setData({
			LuckyDrawShow: false
		})
	},
	//获取用户抽奖次数
	getLotteryNumber(text) {
		_get(`/customersales/user-draw-times/getTimes/${this.data.activeID}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				this.setData({
					lotteryNumber: res.responseBody
				})
				if (this.data.lotteryNumber > 0 && text == '点击金蛋开始抽奖') {
					//弹窗
					this.setData({
						LuckyDrawShow: true
					})
					this.LuckyDraw()
				}
				if (this.data.lotteryNumber < 1 && text == '点击金蛋开始抽奖') {
					//没有抽奖次数
					wx.showToast({
						title: '没有抽奖次数了哦',
						icon: 'none',
						duration: 2000
					})
				}
			} else {
				this.showlandingDialog = true
				wx.showToast({
					title: '获取抽奖信息失败',
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			console.log(e)
			wx.showToast({
				title: '获取抽奖信息失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	// 砸金蛋
	smashingAge(flag) {
		if (this.data.lotteryNumber < 1) {
			//没有抽奖次数
			wx.showToast({
				title: '没有抽奖次数了哦',
				icon: 'none',
				duration: 2000
			})
			return false
		}
		if (!flag.currentTarget.dataset.gid) {
			return false
		}
		if (this.data.repeatSubFlag == false) {
			console.log('提交中')
			return false
		}
		this.setData({
			repeatSubFlag: false
		})
		var animation = wx.createAnimation({
			duration: 1000,
			timingFunction: 'ease',
		})
		var chuizianimation = wx.createAnimation({
			duration: 100,
			timingFunction: 'ease-in-out',
		})
		switch (flag.currentTarget.dataset.gid) {
			case 1:
				// this.animation = animation
				this.chuizianimation = chuizianimation
				this.setData({
					chuiziShow: !this.data.chuiziShow
				})
				break;
			case 2:
				// this.animation1 = animation
				this.chuizianimation2 = chuizianimation
				this.setData({
					chuiziShow1: !this.datachuiziShow1
				})
				break;
			case 3:
				// this.animation2 = animation
				this.chuizianimation3 = chuizianimation
				this.setData({
					chuiziShow2: !this.data.chuiziShow2
				})
				break;
		}
		var next = true;
		//连续动画关键步骤
		let a = setInterval(function() {
			//调用动画实例方法来描述动画
			// if (next) {
			// 	animation.translateX(1).step();
			// 	animation.rotate(2).step()
			// 	next = !next;
			// } else {
			// 	animation.translateX(-1).step();
			// 	animation.rotate(-2).step()
			// 	next = !next;
			// }
			chuizianimation.rotate(50).step()
			chuizianimation.rotate(-50).step()
			//3: 将动画export导出，把动画数据传递组件animation的属性 
			switch (flag.currentTarget.dataset.gid) {
				case 1:
					// this.setData({
					// 	animation: animation.export()
					// })
					this.setData({
						chuizianimation: chuizianimation.export()
					})
					break;
				case 2:
					// this.setData({
					// 	animation1: animation.export()
					// })
					this.setData({
						chuizianimation1: chuizianimation.export()
					})
					break;
				case 3:
					// this.setData({
					// 	animation2: animation.export()
					// })
					this.setData({
						chuizianimation2: chuizianimation.export()
					})
					break;
			}
		}.bind(this), 500)
		setTimeout(() => {
			// clearInterval(a);
			// switch (flag.currentTarget.dataset.gid) {
			// 	case 1:
			// 		this.setData({
			// 			animation: animation.export()
			// 		})
			// 		break;
			// 	case 2:
			// 		this.setData({
			// 			animation1: animation.export()
			// 		})
			// 		break;
			// 	case 3:
			// 		this.setData({
			// 			animation2: animation.export()
			// 		})
			// 		break;
			// }
			setTimeout(() => {
				switch (flag.currentTarget.dataset.gid) {
					case 1:
						this.setData({
							ageShow: !this.data.ageShow,
							chuiziShow: !this.data.chuiziShow,
						})
						break;
					case 2:
						this.setData({
							ageShow1: !this.data.ageShow1,
							chuiziShow1: !this.data.chuiziShow1,
						})
						break;
					case 3:
						this.setData({
							ageShow2: !this.data.ageShow2,
							chuiziShow2: !this.data.chuiziShow2
						})
						break;
				}
				this.getLotteryNumber('点击金蛋开始抽奖')
				clearInterval(a);
			}, 500)
		}, 500)
	},
	//分享活动 生成客户ID 
	getCustomer() {
		_put(`/zuul/customersales/share/record/${this.data.activeID}`).then(({
			data: res
		}) => {
			console.log(res)
			if (res.code == '10000') {
				this.setData({
					customerID: res.responseBody
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
				title: '获取客户信息失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	// 分享活动
	SharingActivities() {
		this.getCustomer()
		wx.showToast({
			title: '请点击右上角进行分享',
			icon: 'none',
			duration: 2000
		})
	},
	//中奖记录table显示
	showWinningTable() {
		this.setData({
			show: true
		});
	},
	//关闭中奖记录table
	closeWinning() {
		this.setData({
			show: false
		});
	},
})
