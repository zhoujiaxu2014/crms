// pages/index/index.js
var util = require('../../utils/util.js')
var app = getApp();
var xiaojuedingArr = require('../../utils/xiaojueding.js')
wx.setStorageSync('all', xiaojuedingArr);
wx.setStorageSync('num', 100);
import {
	_post,
	_get,
	_put
} from '../../utils/api'
import QRCode from '../../utils/weapp-qrcode.js'

function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
}

var page = {
	data: {
		size: { //转盘大小可配置
			w: 599,
			h: 600
		},
		musicflg: true,
		fastJuedin: false,
		repeat: false,
		xiaojuedingArr: xiaojuedingArr.sort(randomsort),
		s_awards: '？', //结果
		share: true,
		//画布--------------------------------
		canvasWidth: 400,
		canvasHeight: 650,
		showCanvasFlag: false,
		colorArr: [
			'#EE534F',
			'#FF7F50',
			'#FFC928',
			'#66BB6A',
			'#42A5F6',
			'#5C6BC0',
			'#AA47BC',
			'#EC407A',
			'#FFB6C1',
			'#FFA827'
		],
		fontArr: ['italic', 'oblique', 'normal'],
		sizeArr: [12, 14, 16, 18, 20, 22, 24, 26, 28],

		eweimaUrl: '../../images/erweima.jpg',

		shengchengUrl: '',

		saveFrameFlag: false,
		windowWidth: 0,
		windowHeight: 0,
		wheelImg: 'assets/wheel.png',
		pointImg: 'assets/point.png',
		touch: {
			x: 0,
			y: 0,
			isPressed: false
		},
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
		//
		activeID: '',
		customerID: '',
		//分享进来的客户ID
		ShareID: null,
		Qrshow: false,
		showlandingDialog: false,
		GenerateAnimation: true,
		show1:false,
		userID:'',
		userPhone:'',
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
	//获取奖品code 领奖
	getPrizecode(id) {
		_get(`/customersales/reward-history/redemption/${id}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				// let url = 'http://zlxkdev.ardu.cn:8888//crms-drm/html/logding.html?'+res.responseBody
				let url = 'https://crms.ardu.cn//crms-drm/html/logding.html?' + res.responseBody
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
				url: `/pages/Perfectinformation/index?&id=${flag.currentTarget.dataset.gid.rewardHistoryId}&flag=0&activeID=${this.data.activeID}&orgid=${this.data.activeData.issuingOrgId}&phone=${this.data.userPhone}`
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
	//获取中奖记录
	getWinningRecord() {
		let obj = {
			"current": 1,
			"size": 100,
			"eventId": this.data.activeID
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
	//中奖记录table显示
	showWinningTable() {
		this.getWinningRecord()
		this.setData({
			show: true
		});
		this.setData({
			canvasShow: false
		});
	},
	//中奖记录table显示
	showWinningTable1() {
		this.setData({
			show1: true
		});
	},
	//获取用户抽奖次数
	getLotteryNumber() {
		_get(`/customersales/user-draw-times/getTimes/${this.data.activeID}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				console.log(res)
				this.setData({
					lotteryNumber: res.responseBody
				})
				wx.setStorageSync('asdfasdfsadfqewlfvj',this.data.lotteryNumber)
			} else {
				this.showlandingDialog = true
				wx.showToast({
					title: '获取抽奖信息失败',
					icon: 'none',
					duration: 2000
				})
				wx.setStorageSync('asdfasdfsadfqewlfvj',this.data.lotteryNumber)
			}
		}).catch((e) => {
			console.log(e)
			wx.showToast({
				title: '获取抽奖信息失败',
				icon: 'none',
				duration: 2000
			})
			wx.setStorageSync('asdfasdfsadfqewlfvj',this.data.lotteryNumber)
		});
	},
	//登陆后获取用户信息
	getUserInfo() {
		let obj = {
			phone: this.userPhone,
			//活动ID
			eventId: this.data.activeID,
			shareId: this.data.ShareID
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
					this.userPhone = res.responseBody
					//获取用户信息
					this.getUserInfo()
					if (this.data.GenerateAnimation) {
						this.animation(this.activeData.activeList)
					}
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

	//获取活动信息
	getActiveData: function() {
		_get(`/zuul/customersales/draw-lottery-manage/${this.data.activeID}`).then(({
			data: res
		}) => {
			if (res.code == '10000') {
				this.setData({
					activeData: res.responseBody
				})
			} else {
				wx.showToast({
					title: res.message,
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

	//接收当前转盘初始化时传来的参数
	getData(e) {
		this.setData({
			awardsConfig: e.detail,
		})
		console.log(this.data.awardsConfig)
	},
	//接收当前转盘结束后的答案选项
	getAwards(e) {
		//转完了
		console.log('转完了')
		wx.setStorageSync('zhuanFlag',true)
		//获取抽奖次数
		this.getUserInfo()
		this.setData({
			s_awards: e.detail.end ? "？" : e.detail.s_awards,
			share: e.detail.end ? true : false,
		})
	},

	//开始转
	startZhuan(e) {
		this.setData({
			zhuanflg: e.detail ? true : false
		})
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
				//获取抽奖次数
				this.getUserInfo()
				// this.getLotteryNumber()
				//获取中奖记录
				this.getWinningRecord()
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
	//关闭中奖记录弹框
	closeWinning() {
		this.setData({
			show: false
		})
		this.setData({
			canvasShow: true
		});
	},
	//关闭中奖记录弹框
	closeWinning1() {
		this.setData({
			show1: false
		})
	},
	//关闭二维码弹框
	closeQrcode() {
		this.setData({
			Qrshow: false
		})
	},
	onLoad: function(options) {
		console.log('=========onload============');
		console.log(options)
		this.zhuanpan = this.selectComponent("#zhuanpan");
		//如果客户是通过点击分享链接进来的
		if (options.customerID) {
			this.setData({
				ShareID: options.customerID
			})
		}
		this.setData({
			activeID: options.id
		})
		wx.setStorageSync('optionsActiveID',this.data.activeID)
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
		}
		this.getActiveData()
	},

	//点击切换转盘选项
	xiaojueding(e) {
		var that = this,
			idx = e.currentTarget.dataset.idx,
			xiaojuedingArr = that.data.xiaojuedingArr;

		if (!that.data.zhuanflg) {
			for (let x in xiaojuedingArr) {
				if (idx == x && xiaojuedingArr[x].option != that.data.awardsConfig.option) {
					that.zhuanpan.switchZhuanpan(xiaojuedingArr[x]); //切换当前转盘数据选项 
					return;
				}
			}
		}
	},

	onShow: function(e) {
		console.log('============onShow============');
		var that = this,
			switchTab = wx.getStorageSync('switchTab'),
			all = wx.getStorageSync('all'),
			xiaojuedingArr = that.data.xiaojuedingArr;
		//判断从热门小决定 还是个人小决定跳转过来的 还是编辑页面跳过来的
		all = app.globalData.defaultJueding ? xiaojuedingArr : app.globalData.myJueding ? all : xiaojuedingArr;

		that.setData({
			musicflg: !app.globalData.musicflg ? true : false,
			fastJuedin: app.globalData.juedin ? true : false,
			repeat: app.globalData.repeat ? true : false,
		})

		//跳转过来的
		if (!util.isNull(switchTab)) {

			wx.showLoading({
				title: '加载中',
			})
			switchTab = switchTab == '00' ? '0' : switchTab;
			setTimeout(function() {
				for (let i in all) {
					if (all[i].id == switchTab) {
						that.zhuanpan.switchZhuanpan(all[i], true); //切换当前转盘数据选项 
						that.setData({
							zhuanflg: false
						})
						break;
					}
				}
				wx.hideLoading();
			}, 500)
		}
	},

	//关闭保存图片的框
	closeSaveFrame: function() {
		var that = this;
		that.zhuanpan.reset();
		that.setData({
			saveFrameFlag: false,
		});
	},

	//保存图片
	saveImage: function() {
		var that = this;
		var filePath = that.data.shengchengUrl;

		wx.saveImageToPhotosAlbum({
			filePath: filePath,
			success: function(res) {
				wx.showToast({
					title: '保存图片成功！',
					icon: 'none',
					duration: 1000,
					mask: true,
				})
			}
		})
	},

	//分享到朋友圈
	generate() {
		wx.showLoading({
			title: '正在生成中',
		})

		var that = this;
		that.setData({
			showCanvasFlag: true,
		})

		var textArr = [];
		for (var i = 0; i < that.data.awardsConfig.awards.length; i++) {
			textArr.push(that.data.awardsConfig.awards[i].name);
		}


		that.makeImageCanvas('shareCanvas', that.data.awardsConfig.option, textArr, that.data.colorArr, that.data.fontArr,
			that.data.sizeArr, 600, 20, 20, 40, that.data.canvasWidth, that.data.canvasHeight, 120, 400, that.data.eweimaUrl);

		setTimeout(function() {
			wx.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: that.data.canvasWidth,
				height: that.data.canvasHeight,
				canvasId: 'shareCanvas',
				success: function(res) {
					console.log(res.tempFilePath);

					that.setData({
						showCanvasFlag: false,
						saveFrameFlag: true,
						shengchengUrl: res.tempFilePath,
					})

					wx.hideLoading();
				}
			})
		}, 2000)

	},

	//用户分享
	onShareAppMessage: function(options) {
		// this.data.activeData
		let userID = this.data.customerID; //客户ID
		var activityId = this.data.activeID; //活动ID
		var activityName = this.data.activeData.luckyDrawName;
		debugger
		return {
			title: '幸运大转盘',
			desc: activityName,
			path: `/pages/RotaryTable/index?customerID=${userID}&id=${activityId}`
		}
	},

	//画图--画布:canvasName画布ID名，title标题，textArr内容数组，colorArr字体颜色数组，fontArr字体样式数组，sizeArr字体大小数组，num总数量，rowNum一行数量--最大为5，distance同行中词的距离，spacing第二行与第一行隔多少距离，canvasWidth画布宽度，canvasHeight画布高度，midWidth中间宽度，midHeight中间高度，imgUrl二维码图片路径
	makeImageCanvas: function(canvasName, title, textArr, colorArr, fontArr, sizeArr, num, rowNum, distance, spacing,
		canvasWidth, canvasHeight, midWidth, midHeight, imgUrl) {
		var that = this;

		var contentArr = [];
		for (var a = 0; a < num; a++) {
			var neirong = that.arrayRandomTakeOne(textArr); //内容
			contentArr.push(neirong);
		}
		//console.log(contentArr);

		const ctx = wx.createCanvasContext(canvasName)
		ctx.clearRect(0, 0, canvasWidth, canvasHeight) //清除画布区域内容
		ctx.setFillStyle('white') //填充背景色--白色
		ctx.fillRect(0, 0, canvasWidth, canvasHeight)

		var daxiaoArr = [];
		for (var i = 0; i < contentArr.length; i++) {
			var hang = parseInt(i / rowNum) + 1; //第几行
			var hangDj = i % rowNum; //每行第几
			var yanse = that.arrayRandomTakeOne(colorArr); //颜色
			var ziti = that.arrayRandomTakeOne(fontArr); //字体
			var daxiao = that.arrayRandomTakeOne(sizeArr); //大小
			daxiaoArr.push(daxiao);
			//console.log(yanse, ziti, daxiao);

			var rowStart = 0; //水平起点
			var columnStart = hang * spacing; //竖直起点

			if (hangDj == 0) {
				rowStart = 0;
			} else if (hangDj > 0) {
				for (var e = 1; e < hangDj + 1; e++) {
					rowStart = rowStart + contentArr[i - e].length * daxiaoArr[i - e];
				}
				rowStart = rowStart + distance * hangDj;
			}
			//console.log('起点', rowStart);

			ctx.fillStyle = yanse; //字体颜色
			ctx.font = ziti + ' small-caps normal ' + daxiao + 'px Arial';
			ctx.fillText(contentArr[i], rowStart, columnStart)
		}

		ctx.setFillStyle('white') //填充背景色--白色
		ctx.fillRect((canvasWidth - midWidth) / 2, (canvasHeight - midHeight) / 2, midWidth, midHeight)

		var titleArr = [];
		for (var n = 0; n < title.length; n++) {
			titleArr.push(title[n]);
		}
		//console.log(titleArr);

		var titleHeight = midHeight - 10 - midWidth;
		var titleDaxiao = parseInt(titleHeight / title.length);
		//console.log(titleHeight, titleDaxiao);

		titleDaxiao = titleDaxiao > 50 ? 50 : titleDaxiao;

		for (var m = 0; m < titleArr.length; m++) {
			ctx.fillStyle = '#000000'; //字体颜色
			ctx.font = 'normal small-caps normal ' + titleDaxiao + 'px Arial';
			ctx.setTextAlign('center')
			ctx.fillText(titleArr[m], canvasWidth / 2, (canvasHeight - midHeight) / 2 + 5 + titleDaxiao * (m + 1))
		}

		ctx.drawImage(imgUrl, (canvasWidth - midWidth) / 2 + 5, canvasHeight - (midWidth + (canvasHeight - midHeight) / 2),
			midWidth - 10, midWidth - 10) //二维码

		wx.drawCanvas({
			canvasId: canvasName,
			actions: ctx.getActions()
		})
	},

	//数组随机取出一个数
	arrayRandomTakeOne: function(array) {
		var index = Math.floor((Math.random() * array.length + 1) - 1);
		return array[index];
	},
}
Page(page);
