import {_post,_get} from "../../../utils/api"
let app=getApp();
Page({
  data:{
    quotationDeatil:[],
    noMore:0,//0有数据；1没有数据
  },
  search(id){
    _get("/crmsdesign/quotation/get-scheme-quotation/"+id).then(res=>{//获取报价信息
      console.log("报价信息",res)
      if(res.data.code==10000){
        // debugger
        if(res.data.responseBody.quotationDetails.length>0){
          this.setData({
            // quotationSummary:res.data.responseBody.spaceTypes,//报价汇总
            quotationDeatil:res.data.responseBody.quotationDetails,//报价详情
            // "okQuotation.quotationId":res.data.responseBody.quotationDetails[0].quotationId//报价id
          })
        }else{
          this.setData({
            noMore:1
          })
        }
        
      }
    })
  },
  onLoad(options){
    let self=this;
    let schemId=options.id
    self.search(schemId)
  }
})