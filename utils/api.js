// const baseURL ="http://zlxkdev.ardu.cn:8888/crmssw"//本地测试服
// const baseURL ="http://192.168.235.18:8888"//本地测试服
// const baseURL = "http://192.168.234.245:8084"
// const baseURL = "https://u2.ardu.cn/crmssw"//线上地址
// const baseURL ="http://zlxkdev.ardu.cn:8888/crmssw"//本地测试服
// const baseURL ="http://192.168.235.18:8888"//本地测试服
// const baseURL = "http://192.168.234.245:8084"
// const baseURL = "https://u2.ardu.cn/crmssw"//线上地址
// const baseURL = 'http://zlxkdev.ardu.cn:8888/crmssw' //本地测试服
const baseURL = "https://crms.ardu.cn/crmssw"//线上地址
function _post(url, data) {
  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data: data,
      method: 'POST',
      header: {
        'content-Type': 'application/json',
        // "token":'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyUGhvbmUiOiIxODc4MjkwMjM1NCJ9._QZNbaC7xNgpvvTpRzrnMO0Nf7ne8K4NpbNH_YoXHSM'
        token: token,
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
function _get(url, data) {
  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : []
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method: 'GET',
      header: {
        'content-Type': 'application/json;charset=UTF-8',
        token: token,
        // "token":'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyUGhvbmUiOiIxODc4MjkwMjM1NCJ9._QZNbaC7xNgpvvTpRzrnMO0Nf7ne8K4NpbNH_YoXHSM'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
function _delete(url, data) {
  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : []
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      // data:data,
      method: 'DELETE',
      header: {
        'content-Type': 'application/json;charset=UTF-8',
        token: token,
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
function _put(url, data) {
  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : []
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data: data,
      method: 'PUT',
      header: {
        'content-Type': 'application/json;charset=UTF-8',
        token: token,
        // "token":'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyUGhvbmUiOiIxODg1Njc0MTU2OCIsInJvbGVzIjoiNyJ9.qgcv_GsAHXhZsUFhdq4DbU02lFXPIOsVanenqZYQnqU',//战区总监
      },
      // header: {
      //   "application/x-www-form-urlencoded;charset=utf-8"
      // },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
export { _get, _post, _delete, _put }
