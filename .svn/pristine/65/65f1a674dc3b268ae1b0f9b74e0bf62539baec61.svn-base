// pages/Perfectinformation/index.js
import {
	_post,
	_get
} from '../../utils/api'
import QRCode from '../../utils/weapp-qrcode.js'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		//奖品历史id
		prizeHistoryId: '',
		//手机号
		phone: '',
		//地址
		address: '',
		//验证码
		Verificationcode: '',
		//手机号错误提升
		errorPhoneText: '',
		errorCodeText: '',
		timer: '', //定时器名字
		countDownNum: '60', //倒计时初始值
		//控制按钮
		loadingBtn: false,
		//提交按钮
		loadingSubBtn: false,
		//返回页面判断
		pageFlag: '',
		activeID: '',
		Qrshow: false,
		btnFlag: false,
		orgID: '',
		zzlocation: '',
		VerificationCode: '',
		codeImgae: '',
	},
	//关闭二维码弹框
	closeQrcode() {
		// this.setData({
		// 	Qrshow: false
		// })
	},
	changeImgcode(){
		this.getYanCode()
	},
	//获取验证码
	getYanCode: function() {
		_get(`/crmsadmin/send-message/captcha.jpg`).then((data) => {
			this.setData({
				codeImgae:data.data.responseBody
			})
		}).catch((e) => {
			console.log(e)
			// wx.showToast({
			// 	title: '获取验证码失败',
			// 	icon: 'none',
			// 	duration: 2000
			// })
		});
	},
	onchangeCode(event){
		 console.log(event.detail);
		 this.setData({
			 VerificationCode:event.detail
		 })
	},
	//验证码
	checkCode(){
		_get(`/crmsadmin/send-message/captchaCheck?captcha=${this.data.VerificationCode}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				console.log(res)

			} else {
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			wx.showToast({
				title: '验证码失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//获取附近的店铺
	getMylocation: function() {
		_get(`/customersales/crmsSampleRoomInfo/nearBy/${this.data.orgID}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				console.log(res)
				this.setData({
					zzlocation: res.responseBody
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
				title: '获取附近的店铺失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	gotoHome(){
		wx.switchTab({
			url: `/pages/clientSide/index/myArdu/myArdu`
		})
	},
	//去样板间
	gotoActive() {
		if (this.data.pageFlag == 'age') {
			wx.navigateTo({
				url: `/pages/ageActive/age?id=${this.data.activeID}`
			})
		} else {
			wx.navigateTo({
				url: `/pages/RotaryTable/index?id=${this.data.activeID}`
			})
		}
	},
	gotoroom() {
		wx.navigateTo({
			url: `/pages/nearRoom/room`
		})
	},
	//获取奖品code 领奖
	getPrizecode(id) {
		_get(`/customersales/reward-history/redemption/${id}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				console.log(res)
				// let url = 'http://zlxkdev.ardu.cn:8888//crms-drm/html/logding.html?'+res.responseBody
				let url = 'https://crms.ardu.cn/crms-drm/html/logding.html?' + res.responseBody
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
	//倒计时
	countDown: function() {
		let that = this;
		that.setData({
			loadingBtn: true
		})
		let countDownNum = that.data.countDownNum; //获取倒计时初始值
		//如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
		that.setData({
			timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
				//每隔一秒countDownNum就减一，实现同步
				countDownNum--;
				//然后把countDownNum存进data，好让用户知道时间在倒计着
				that.setData({
					countDownNum: countDownNum
				})
				//在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
				if (countDownNum == 0) {
					//这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
					//因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
					clearInterval(that.data.timer);
					//关闭定时器之后，可作其他处理codes go here
					that.setData({
						loadingBtn: false
					})
					that.setData({
						countDownNum: '60'
					})
				}
			}, 1000)
		})
	},
	//提交基本信息
	sub() {
		if (this.data.phone.trim() == '') {
			this.setData({
				errorPhoneText: '请输入正确的手机号'
			})
			return false
		} else {
			this.setData({
				errorPhoneText: ''
			})
		}
		if (this.data.Verificationcode.trim() == '') {
			this.setData({
				errorCodeText: '请输入正确的验证码'
			})
			return false
		} else {
			this.setData({
				errorCodeText: ''
			})
		}
		this.setData({
			loadingSubBtn: true
		})
		let obj = {
			"phone": this.data.phone,
			"address": this.data.address,
			"historyId": this.data.prizeHistoryId,
			"code": this.data.Verificationcode
		}
		_post(`/customersales/reward-history/pull`, obj).then(({
			data: res
		}) => {
			if (res.responseBody) {
				wx.showToast({
					title: '信息完善成功',
					icon: 'success',
					duration: 2000
				})
				//获取领奖信息
				this.getPrizecode(this.data.prizeHistoryId)
				//按钮
				this.setData({
					btnFlag: true,
					loadingSubBtn: false
				})
				// setTimeout(() => {
				// 	if (this.data.pageFlag == 'age') {
				// 		wx.navigateTo({
				// 			url: `/pages/ageActive/age?id=${this.data.activeID}`
				// 		})
				// 	} else {
				// 		wx.navigateTo({
				// 			url: `/pages/RotaryTable/index?id=${this.data.activeID}`
				// 		})
				// 	}
				// }, 1000)
			} else {
				this.setData({
					loadingSubBtn: false
				})
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
			}
		}).catch((e) => {
			this.setData({
				loadingSubBtn: false
			})
			console.log(e)
			wx.showToast({
				title: '用户信息提交失败',
				icon: 'none',
				duration: 2000
			})
		});
	},
	//获取随机验证码
	GetVerificationCode() {
		if(this.data.VerificationCode.trim()==''){
			wx.showToast({
				title: '请输入正确验证码',
				icon: 'none',
				duration: 1500
			})
			return false
		}
		_get(`/crmsadmin/send-message/captchaCheck?captcha=${this.data.VerificationCode}`).then(({
			data: res
		}) => {
			if (res.code == '10000'&&res.responseBody=='OK') {
				var myreg = /^1[3-9]\d{9}$/;
				if (this.data.phone.length == 0) {
					wx.showToast({
						title: '输入的手机号为空',
						icon: 'none',
						duration: 1500
					})
					return false;
				} else if (this.data.phone.length < 11) {
					wx.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 1500
					})
					return false;
				} else if (!myreg.test(this.data.phone)) {
					wx.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 1500
					})
					return false;
				} else {
				
				}
				if (this.data.loadingBtn == false) {
					if (this.data.phone == '') {
						this.setData({
							errorPhoneText: '请输入正确的手机号'
						})
						return false
					} else {
						this.setData({
							errorPhoneText: ''
						})
						this.countDown()
					}
					let obj = {
						customerPhone: this.data.phone
					}
					_post(`/crmsadmin/send-message`, obj).then(({
						data: res
					}) => {
						if (res.code == '20022') {
							wx.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
							this.setData({
								loadingBtn: false
							})
							this.setData({
								countDownNum: 60
							})
						}
					}).catch((e) => {
						console.log(e)
						this.setData({
							loadingBtn: false
						})
						this.setData({
							countDownNum: 60
						})
						wx.showToast({
							title: '获取验证码失败',
							icon: 'none',
							duration: 2000
						})
					});
				}
			} else {
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				})
			}
		})
	},
	//验证码
	onChange2(event) {
		this.setData({
			Verificationcode: event.detail
		})
	},
	//地址
	onChange1(event) {
		this.setData({
			address: event.detail
		})
	},
	//输入框change
	onChange(event) {
		//手机号
		this.setData({
			phone: event.detail
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		this.getYanCode()
		if (options.flag == '1') {
			//返回砸蛋
			this.setData({
				pageFlag: 'age',
			})
		} else {
			//返回别的
			this.setData({
				pageFlag: 'kez'
			})
		}
		//得到奖品的 ID
		// this.data.prizeHistoryId = '1251059165284798465'
		this.setData({
			prizeHistoryId: options.id,
			activeID: options.activeID,
			phone: options.phone,
			orgID: options.orgid
		})
		this.getMylocation()
		//生成二维码（测试用）
		// this.getQrCode()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

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

	}
})
