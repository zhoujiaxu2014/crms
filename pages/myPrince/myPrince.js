import { _post, _get } from '../../utils/api'
let app = getApp()
Page({
  data: {
    winningList: [],
    dataHas:0,//0--有
  },
  //获取奖品
  getPrize() {
    // debugger
    _get('/customersales/reward-history/listDetail')
      .then((res) => {
        console.log(res)
        if (res.data.code == '10000') {
          // debugger
          if(res.data.responseBody.length>0){
            // debugger
            this.setData({
              winningList: res.data.responseBody,
              dataHas:0
            })
          }else{
            this.setData({
              dataHas:1
            })
          }
        } else {
          this.setData({
            dataHas:1
          })
          wx.showToast({
            title: '获取奖品信息失败！',
            icon: 'none',
          })
        }
      })
      .catch((err) => {
        console.log(err)
        this.setData({
          dataHas:1
        })
        wx.showToast({
          title: '获取奖品信息失败！',
          icon: 'none',
        })
      })
  },
  //查看兑奖麻
  lockQr(flag) {
    //获取兑奖码
    this.getPrizecode(flag.currentTarget.dataset.gid)
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
      },
    })
  },
  //获取奖品code 领奖
  getPrizecode(id) {
    _get(`/customersales/reward-history/redemption/${id.rewardHistoryId}`)
      .then(({ data: res }) => {
        if (res.code == '10000') {
          let url =
            'https://crms.ardu.cn//crms-drm/html/logding.html?' +
            res.responseBody
          this.getQrCode(url)
          this.setData({
            Qrshow: true,
          })
        } else if (res.code == '20001') {
          //没完善信息的
          // 跳转到完善信息列表
          //完善信息
          //鸡蛋1 转盘0
          wx.navigateTo({
            url: `/pages/Perfectinformation/index?&id=${
              id.rewardHistoryId
            }&flag=${id.rewardState == '0' ? '0' : '1'}&activeID=${
              id.lotteryId
            }&orgid=${id.issuingOrgId}&phone=${getApp().globalData.phone}`,
          })
        } else {
          this.showlandingDialog = true
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000,
          })
        }
      })
      .catch((e) => {
        console.log(e)
        wx.showToast({
          title: '获取兑奖码失败',
          icon: 'none',
          duration: 2000,
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    self.getPrize() //查询奖品信息
  },
})
