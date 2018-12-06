var app=getApp()

const order = require("../../../util/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
     logistics:[ ],
    //  物流请求地址
    logisticsurl:"http://192.168.1.199:3000/mock/33/trade/buyer/bizOrder/logistics/list",
    goodsInfo:[],
    // 订单详情地址
    goodsurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/detai/get",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data={
      userId:"",
      bizOrderId:options.id
    }

    app.req(this.data.logisticsurl, "GET", data).then(res => {
      this.setData({
        logistics:res.entry
      })
    })
    app.req(this.data.goodsurl, "GET", data).then(res => {
      this.setData({
        goodsInfo: res.entry
      })
    })
  },
  gotoPhone:function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.logistics.logisticsCompanyPhone,
    })
  },
copy(){
 wx.setClipboardData({
   data: this.data.logistics.logisticsNo,
   success:res=>{
     order.success("复制成功")
   },
   fail:res=>{
     order.warn("复制失败")
   }
 })
}

})