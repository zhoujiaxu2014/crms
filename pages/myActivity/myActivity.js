import { _post, _get } from '../../utils/api'
Page({
  data: {
    notData: 0,
    activeList: [],
    page: 0,
    size: 10,
  },
  //查询客户活动信息
  searchList: function () {
    let self = this
    let jsonStr = {}
    jsonStr['current'] = self.data.page
    jsonStr['searchCount'] = true
    jsonStr['size'] = self.data.size
    jsonStr['total'] = 0
    _post('/customersales/crms-customer/getCustActPage', jsonStr)
      .then((res) => {
        let data = res.data
        if (data.code === '10000') {
          self.setData({
            activeList: self.data.activeList.concat(data.responseBody.records),
          })
          self.data.page++
          if (self.data.activeList.length >= data.responseBody.total) {
            self.setData({
              notData: 1,
            })
          }
        } else {
          self.setData({
            notData: 1,
          })
        }
      })
      .catch(() => {
        // Toast.fail(`${data.message}`)
        self.setData({
          notData: 1,
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    self.searchList() //查询奖品信息
  },
})
