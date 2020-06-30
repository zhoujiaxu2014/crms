import {_post,_get} from "../../../utils/api"
let app=getApp();
Page({
  data:{
    userid:"",//用户id
    taskid:"",//任务id
    schemeid:"",//选中的方案id
    name:"",//当前弹框方案名称
    index:"",//当前选择方案的index
    show:false,//确认方案弹框
    showQ:false,//签约提示弹框
    isChoose:true,//是否显示方案
    alreadyCase:false,//已选择方案
    isOffer:false,//是否已确认报价
    isSigning:false,//是否已签约合同
    isShowOffer:false,//是否显示确认报价按钮
    isShowSigning:false,//是否显示签约合同
    tip1:false,//核算报价提示
    tip2:false,//生成合同提示
    result:"",//页面数据
    list:[],//方案列表
    allMon:"",//总价
    livingRoom:'',//客厅
    kitchen:'',//厨房
    bedroom:'',//卧室
    quotationSummary:[],//报价汇总
    quotationDeatil:[],//报价详情
    okParams:{//用户确认方案传参
      // "taskId":0,
      "customerComments":"",//意见
      "schemeConfirm":1,
      // "revision":0,
      "schemeId":0,//方案id
  },
  okQuotation:{//确认报价传参
    "quotationId":0,
    "taskId":0,//必须
  },   
  contractId:"",//合同id
  contractNum:"",//合同编号
  path:'',//合同地址

  indicatorDots: true,//我的方案轮播图
    circular: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 2200,

    hasCase:false,//受否有方案
    hasMoney:false,//是否有报价
    hasContract:false,//是否有合同
    isBaojia:false,//是否有报价数据
    qianyue:false,//签约成功

    showPrince:false,//报价详情
    showBaojia:false,//确认报价弹窗

    imgScheList:[],//方案数据
    hasDataCase:false,//有无报价数据
    changeCaseColor:99,
    caseLine:false,//确认方案后时间线
    baojiaLine:false,//确认报价后的时间线

    // hasContract:0,//是否有合同信息
  },
  //查看报价详情
  princeDetail(e){
    // debugger
    let self=this
    let id=e.currentTarget.dataset.id
    wx.navigateTo({url:"/pages/my/offerDetail/offerDetail?id="+id})
    // self.setData({
    //   showPrince:true
    // })
  },
  imagePre(value){//图片预览
    console.log("图片预览",value)
    let res=value.currentTarget.dataset;
    wx.previewImage({
      current:res.picture[res.index], // 当前显示图片的http链接
      urls:res.picture //需要预览的图片http链接列表
    })
  },
  gosto(e){
    // console.log("720地址",e.currentTarget.dataset.url)
    wx.navigateTo({url:"/pages/my/sto/sto?url="+e.currentTarget.dataset.url})
  },
  Choice(e){//拉起选择方案弹框
    // debugger
    let self=this;
    if(self.data.changeCaseColor==99){
      wx.showToast({
        title: '请先选择方案',
        icon: 'none',
        duration: 2000,
      })
    }else{
      this.setData({
        show:true,
        // name:e.currentTarget.dataset.name,
        // index:e.currentTarget.dataset.index,
        // "okParams.schemeId":e.currentTarget.dataset.schemeid,
        // "okParams.revision":e.currentTarget.dataset.revision
      })
    }
  },
  choiceCaseImg(e){
    this.setData({
      // show:true,
      name:e.currentTarget.dataset.name,
      index:e.currentTarget.dataset.index,
      "okParams.schemeId":e.currentTarget.dataset.schemeid,
      changeCaseColor:e.currentTarget.dataset.index,
      autoplay:false,//停止轮播图自动播放
      // "okParams.revision":e.currentTarget.dataset.revision
    })
  },
  gainMessage(e){//留言
    this.setData({"okParams.customerComments":e.detail.value})
  },
  onConfirm(){//确认选择方案
    // debugger
    let _this=this;
    _post("/crmsdesign/scheme/confirm",this.data.okParams).then(res=>{
      console.log("客户确认",res)
      if(res.data.code==10000){
        _this.setData({
          list:[_this.data.list[_this.data.index]],
          tip1:true,
          isChoose:true,
          isBaojia:true,
          caseLine:true,
          alreadyCase:true
          // hasDataCase:true
          // list:[_this.data.list]
        })
        // debugger
        console.log("确认后的方案",_this.data.list)
        // _get("/crmsdesign/scheme/checkPlanDetail/"+this.data.userid).then(item=>{//用户方案列表
        //   let res=item.data.responseBody[0]
        //   res.scheme.map((items)=>{
        //     items.schemeAccess=items.schemeAccess.split(",")
        //   })
        //   debugger
        //   _this.setData({//所有情况都要的页面数据
        //     list:[res.scheme],
        //   })
        //   console.log("宝宝",this.data.list)
        //   // if(res.taskCode=="01002"){
        //   //   _get("/crmsdesign/quotation/get-scheme-quotation/"+_this.data.schemeid).then(res=>{//获取报价信息
        //   //     console.log("报价信息",res)
        //   //     if(res.data.code==10000){
        //   //       var all=0
        //   //       res.data.responseBody.spaceTypes.map(res=>{
        //   //         all+=Number(res.totalMon)
        //   //       })
        //   //       this.setData({
        //   //         isChoose:true,
        //   //         allMon:all,//总价
        //   //         quotationSummary:res.data.responseBody.spaceTypes,//报价汇总
        //   //         quotationDeatil:res.data.responseBody.quotationDetails,//报价详
        //   //         "okQuotation.quotationId":res.data.responseBody.quotationDetails[0].quotationId//报价id
        //   //       })
        //   //     }
        //   //   })
        //   // }
        // })




        wx.showToast({
          title:'成功确认',
          icon:'success',
          duration:1000
        })
      }
  }).catch(err=>{
    console.log("方案确定出错",err)
  
  })
  this.setData({//清空客户意见
    "show":false,
    "okParams.customerComments":""
  })
  },
  onCancel(){//取消选择方案
    this.setData({
      show:false,
      "okParams.customerComments":""
    })
  },
  goOfferClick(){//确认报价
    let self=this;
    self.setData({
      showBaojia:true
    })
  },
  goOffer(){//确认报价
    _post("/crmsdesign/quotation/quotation-sure",this.data.okQuotation).then(res=>{
      console.log("确认报价",res)
      if(res.data.code=='10000'){
        this.setData({
          isOffer:true,
          tip2:true,
          isBaojia:true,
          baojiaLine:true,//确认报价后的时间线
          isShowOffer:false})
        wx.showToast({
          title:'成功确认！',
          icon:'success',
          duration:1000
        })
        wx.navigateTo({url:'/pages/clientSide/index/myArdu/myArdu'})
      }
    
    })

  },
  goContract(){//拉起签约弹框
    this.setData({
      showQ:true
    })
  },
  onConfirmQ(){//确认签约合同
    this.setData({
      showQ:false,
      isSigning:true
    })
    _post("/crmsdesign/contract/confrim",{
      contractId:this.data.contractId,taskId:this.data.taskid
    }).then(res=>{
      console.log("签约合同",res)
      if(res.data.code==10000){
        wx.showToast({
          title:'您已成功签约',
          icon:'success',
          duration:1000
        })
        this.setData({
          isShowSigning:false,
          qianyue:true
        })
        wx.navigateTo({
          url:'/pages/clientSide/index/myArdu/myArdu',
        })
        
      }
    })
  },
  onCancelQ(){//取消签约
    this.setData({
      showQ:false
    })
  },
  //查看合同
  clickContract(e){
    let self=this;
    let img=e.currentTarget.dataset.path
    let imgList=[]
    imgList.push(img)
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  goContractss(){
    wx.navigateTo({url:'/pages/my/contract/contract?path='+this.data.path})
    // wx.downloadFile({
    //   // 示例 url，并非真实存在
    //   url:this.data.path,
    //   success: function (res) {
    //     const filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })
  },
  onLoad:function(options){
    let self=this;
    
    this.data.userid=app.globalData.userID//'704726595734077440'//app.globalData.userID
    // console.log("用户id",this.data.userid)
    _get("/crmsdesign/scheme/checkPlanDetail/"+this.data.userid).then(item=>{//用户方案列表
      console.log("我的方案",item)
      if(item.data.code==10000){
        if(item.data.responseBody.length>0){
          let res=item.data.responseBody[0]
          self.data.okQuotation.taskId=res.taskId
          self.data.taskid=res.taskId
          res.scheme.map((items)=>{
            items.schemeAccess=items.schemeAccess
          })
          self.setData({//所有情况都要的页面数据
            result:res,
            list:res.scheme,
            // schemeid:res.scheme[0].schemeId,
            // isChoose:true,
          })
          let scheList=res.scheme
          if(scheList.length>0){
            scheList.forEach((item)=>{
              // debugger
              item.img = {};
              if(item.schemeAccess.indexOf(',')>-1){
                let imgurl=item.schemeAccess.split(',')[0]
                item.img=imgurl
              }else{
                item.img=item.schemeAccess
              }
            })
          }
          // console.log("方案列表",this.data.list)
          self.setData({
            imgScheList:scheList
          })
          console.log("方案列表改后",this.data.imgScheList)
          if(res.taskCode=='01009'){//已签约
            self.setData({
              isSigning:true,
              isOffer:true,
              isChoose:true,
              isBaojia:true,//已选择方案
              qianyue:true,//已签约合同，隐藏签订合同按钮
              caseLine:true,//时间线
              baojiaLine:true,//
              schemeid:res.scheme[0].schemeId,
              contractId:res.contracts[0].contractId,
              path:res.contracts[0].contractAccess,
              contractNum:res.contracts[0].contractNum
            })
            _get("/crmsdesign/quotation/get-scheme-quotation/"+self.data.schemeid).then(res=>{//获取报价信息
              console.log("报价信息",res)
              if(res.data.code==10000){
                var all=0
                var keting=0
                var chufang=0
                var woshi=0
                res.data.responseBody.spaceTypes.map(res=>{
                  all+=Number(res.totalMon)
                  if(res.spaceTypeName=='客厅'){
                    keting+=Number(res.totalMon)
                  }else if(res.spaceTypeName=='厨房'){
                    chufang+=Number(res.totalMon)
                  }else if(res.spaceTypeName=='卧室'){
                    woshi+=Number(res.totalMon)
                  }
                })
                this.setData({
                  hasDataCase:true,//有报价数据
                  isChoose:true,
                  allMon:all,//总价
                  livingRoom:keting,//客厅
                  kitchen:chufang,//厨房
                  bedroom:woshi,//卧室
                  caseLine:true,//时间线
                  baojiaLine:true,//
                  alreadyCase:true,//已经选择方案
                  quotationSummary:res.data.responseBody.spaceTypes,//报价汇总
                  quotationDeatil:res.data.responseBody.quotationDetails,//报价详
                  "okQuotation.quotationId":res.data.responseBody.quotationDetails[0].quotationId//报价id
                })
              }else{
                self.setData({
                  hasDataCase:false,//没有报价数据
                })
              }
            })
            console.log("地址",self.data.path)
          }else if(res.taskCode=='01003'){//已确认报价，待签合同
            // debugger
            self.setData({
              isOffer:true,
              isChoose:true,
              tip2:true,
              isBaojia:true,
              schemeid:res.scheme[0].schemeId,
            })
            if(res.contracts.length>0){
              self.setData({ 
                isShowSigning:true,
                tip2:false,
                contractId:res.contracts[0].contractId,
                contractNum:res.contracts[0].contractNum,
                path:res.contracts[0].contractAccess})
            }
            // console.log("地址",self.data.path)
            _get("/crmsdesign/quotation/get-scheme-quotation/"+self.data.schemeid).then(res=>{//获取报价信息
              console.log("报价信息",res)
              // debugger
              if(res.data.code==10000){
                var all=0
                var keting=0
                var chufang=0
                var woshi=0
                res.data.responseBody.spaceTypes.map(res=>{
                  all+=Number(res.totalMon)
                  if(res.spaceTypeName=='客厅'){
                    keting+=Number(res.totalMon)
                  }else if(res.spaceTypeName=='厨房'){
                    chufang+=Number(res.totalMon)
                  }else if(res.spaceTypeName=='卧室'){
                    woshi+=Number(res.totalMon)
                  }
                })
                this.setData({
                  hasDataCase:true,//有报价数据
                  isChoose:true,
                  allMon:all,//总价
                  livingRoom:keting,//客厅
                  kitchen:chufang,//厨房
                  bedroom:woshi,//卧室
                  alreadyCase:true,//已经选择方案
                  caseLine:true,//时间线
                  baojiaLine:true,//
                  quotationSummary:res.data.responseBody.spaceTypes,//报价汇总
                  quotationDeatil:res.data.responseBody.quotationDetails,//报价详
                  "okQuotation.quotationId":res.data.responseBody.quotationDetails[0].quotationId//报价id
                })
              }else{
                self.setData({
                  hasDataCase:false,//没有报价数据
                })
              }
            })

          }else if(res.taskCode=="01002"){//已选择方案，待确认报价
            // debugger
            if(res.scheme.length>0){
              self.setData({
                isChoose:true,
                schemeid:res.scheme[0].schemeId,
                isBaojia:true
              })
              console.log(self.data.isChoose)
              _get("/crmsdesign/quotation/get-scheme-quotation/"+self.data.schemeid).then(res=>{//获取报价信息
                console.log("报价信息",res)
                if(res.data.code==10000){
                  var all=0
                  var keting=0
                  var chufang=0
                  var woshi=0
                  res.data.responseBody.spaceTypes.map(res=>{
                    all+=Number(res.totalMon)
                    if(res.spaceTypeName=='客厅'){
                      keting+=Number(res.totalMon)
                    }else if(res.spaceTypeName=='厨房'){
                      chufang+=Number(res.totalMon)
                    }else if(res.spaceTypeName=='卧室'){
                      woshi+=Number(res.totalMon)
                    }
                  })
                  this.setData({
                    hasDataCase:true,
                    isChoose:true,
                    tip1:false,
                    isShowOffer:true,
                    allMon:all,//总价
                    livingRoom:keting,//客厅
                    kitchen:chufang,//厨房
                    bedroom:woshi,//卧室
                    isBaojia:true,//是否有报价数据
                    caseLine:true,//时间线
                    alreadyCase:true,//已经选择方案
                    // baojiaLine:true,//
                    quotationSummary:res.data.responseBody.spaceTypes,//报价汇总
                    quotationDeatil:res.data.responseBody.quotationDetails,//报价详
                    "okQuotation.quotationId":res.data.responseBody.quotationDetails[0].quotationId//报价id
                  })
                }else{
                  self.setData({
                    hasDataCase:false,//没有报价数据
                  })
                }
              })
            }else{
              self.setData({
                isChoose:false,
                isBaojia:true
              })
            }
          }
        }else{
          self.setData({
            isBaojia:false,//是否显示报价
            isOffer:false,//合同
            tip2:true
          })
        }
      }
    }).catch((res)=>{
      self.setData({
        isBaojia:false,//是否显示报价
        isOffer:false,//合同
        tip2:true
      })
    })
  },
  //我的方案获取
  // getImgData(){
  //   let self=this;
  // },
  onReady: function (){

  },
  onShow: function () {

  },
  onPullDownRefresh: function (){

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})