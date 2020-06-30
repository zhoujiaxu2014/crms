
Page({
  data: {
    show:false,//保存成功提示
    width:600,//卡片宽
    height:760,//卡片高度
    bgImage:'../../../image/best.jpg',//背景图
    // shareQrImg: '../../../image/qr.png',// 分享小程序二维码
    shareQrImg: '../../../image/qr2.png',// 分享小程序二维码
    logo:"../../../image/logo.png",//logo图
    shareTitle: '',//分享标题
    shareDetail: '还有更多活动等你哟~',
    resultImage:""//最终生成的图片
  },
  onLoad: function(options){
    let self=this;
    try {
      var value = wx.getStorageSync('activity')
      if (value) {
        wx.getImageInfo({//网络图片需要先下载再保存
            src:JSON.parse(value).activityTpic,
            success (res) {
            // console.log("本地保存",res.path)
            self.setData({
              bgImage:res.path,
             })
  // console.log(1)
            },
            fail:function(err){
              console.log("本地保存失败",err)
            }
          })

       self.setData({
        shareTitle:JSON.parse(value).activityName
       })
      //  console.log("2",self.data)
      }
    } catch (e) {
    
    }
    wx.showLoading({
      title: '加载中',
    })
  },
  onReady: function () {

  },
  onShow: function () {
    let self=this
    // console.log(3)
    self.draw();
    // const canvas=wx.createCanvasContext("shareCanvas",this);
    // //2.绘制图片和文字
    // canvas.setFillStyle('#FFF')//绘制一个白色矩形
    // canvas.fillRect(0,0,600,760);
    // canvas.drawImage(
    //           this.data.bgImage,//背景图
    //           0,//背景图片在画布中x坐标
    //           0,//背景图片在画布中y坐标
    //           600,//图片宽
    //           200//图片高
    //       );
    //   canvas.drawImage(this.data.logo,3,3,60,15);//logo
    //   canvas.drawImage(this.data.shareQrImg,0,300,120,80);//二维码
    //   canvas.setFontSize(16)//文字绘制
    //   canvas.setFillStyle('#111111')
    //   canvas.fillText(this.data.shareTitle,20,230)  
    //   canvas.setFontSize(12)//文字绘制
    //   canvas.setFillStyle('#a2a2a2')
    //   canvas.fillText(this.data.shareDetail,20,260) 
    //   canvas.setFontSize(12)
    //   canvas.setFillStyle('#a2a2a2')
    //   canvas.fillText('长按二维码',100,340)
    //   canvas.fillText('进入天积查看详情',100,360)
     
    //   canvas.draw(false,self.canvasToImage())//在回调函数中调用图片转化
  },
  draw(){
    let self=this
    setTimeout(()=>{
      const canvas=wx.createCanvasContext("shareCanvas",this);
      //2.绘制图片和文字
      canvas.setFillStyle('#FFF')//绘制一个白色矩形
      canvas.fillRect(0,0,600,760);
      canvas.drawImage(
                this.data.bgImage,//背景图
                0,//背景图片在画布中x坐标
                0,//背景图片在画布中y坐标
                300,//图片宽
                200//图片高
            );
        // canvas.drawImage(this.data.logo,3,3,60,15);//logo
        canvas.drawImage(this.data.shareQrImg,0,300,120,80);//二维码
        canvas.setFontSize(16)//文字绘制
        canvas.setFillStyle('#111111')
        canvas.fillText(this.data.shareTitle,20,230)  
        canvas.setFontSize(12)//文字绘制
        canvas.setFillStyle('#a2a2a2')
        canvas.fillText(this.data.shareDetail,20,260) 
        canvas.setFontSize(12)
        canvas.setFillStyle('#a2a2a2')
        canvas.fillText('长按或扫二维码',100,340)
        canvas.fillText('进入天积查看详情',100,360)
       
        canvas.draw(false,self.canvasToImage())//在回调函数中调用图片转化
    
    },2000)

  },
   //3.转化成图片
canvasToImage:function () {
              var _this = this;
              setTimeout(() => {//加定时器，防止生成图片失败
                  wx.canvasToTempFilePath({
                      canvasId: 'shareCanvas',
                      x:0,
                      y:0,
                      width:_this.data.width,
                      height:_this.data.height,
                      destWidth:_this.data.width,//输出的图片的宽度是画布区域的宽度的2倍
                      destHeight:_this.data.height,
                      success: res => {
                          wx.hideLoading()
                          console.log("图片绘制成功",res)
                          _this.setData({
                              resultImage:res.tempFilePath
                          });
                      _this.onClickHide()
                      },
                      fail: (err) => {
                          wx.showToast({
                              title: '加载失败',
                              icon: 'none',
                              duration: 2000
                          });
                          console.log("图片绘制失败",err)
                  }
              },this);//在自定义组件中使用canvas，第二个参数必须传入this
          },2000)},

//4.用户点击保存
onClickHide(){
  // wx.downloadFile({//图片保存失败可先下载再保存
  //   url:this.data.resultImage, 
  //   success (res) {
  //   console.log("图片下载",res.tempFilePath)
  //   let path=res.tempFilePath;
  //   wx.saveImageToPhotosAlbum({
  //   filePath:path,
  //     success: res => {
  //          wx.showToast({
  //              title:'保存成功',
  //              icon:'none',
  //              duration:2000
  //          });
  //      },
  //       fail(err) {
  //       console.log("保存失败",err)
  //           wx.showToast({
  //               title: '保存失败',
  //               icon:'none',
  //               duration: 2000
  //           });
  //       }
  //  })
  //   },
  //   fail:function(err){
  //     console.log("图片保存失败",err)
  //   }
  // })
  wx.saveImageToPhotosAlbum({
    filePath:this.data.resultImage,
      success: res => {
      this.setData({show:true});
       },
        fail(err) {
        console.log("保存失败",err)
            wx.showToast({
                title: '图片保存失败',
                icon:'none',
                duration: 2000
            });
        }
   })





  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})