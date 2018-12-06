// pages/order/detail/detail.js
var app = getApp()

const order = require("../../../util/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 删除弹窗
    delmodel: false,
    oderID:"",
    state: [{
        name: "等待买家付款",
        pic: "../../../images/order/wallet.png"
      },
      {
        name: "等待卖家发货",
        pic: "../../../images/order/goods.png"
      },
      {
        name: "卖家已发货",
        pic: "../../../images/order/car.png"
      },
      {
        name: "订单已完成",
        pic: "../../../images/order/finish.png"
      }, {
        name: "订单已关闭",
        pic: "../../../images/order/close.png"
      }, {
        name: "订单已关闭",
        pic: "../../../images/order/close.png"
      }
    ],
    orderid: "",
    // 获取订单详情
    detailurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/detai/get",
    orderdata: [],
    adresdata: [],
    m: '',
    s: "",
    // 提醒发货
    remind: false,
    // 删除订单
    delurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/del",
    // 确认收货
    confirmurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/del",
    // 取消订单
    cancelurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/cancel",
    // 获取时间和收货地址
    addressurl: "http://192.168.1.199:3000/mock/33/trade/payOrder/receiving/address/get",

  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options) {
    console.log(options)
    this.setData({
      orderid: options.id
    })
    app.req(this.data.detailurl, "GET", options.id).then(res => {
      this.setData({
        orderdata: res.entry
      })
    })
    app.req(this.data.addressurl, "GET", options.id).then(res => {
      this.setData({
        adresdata: res.entry
      })
      // this.resetTime(res.entry.remainingTime)
      this.resetTime(1234)
    })
  },

  toshop(){
wx.switchTab({
  url: '../../home/index',
})
  },

  onPullDownRefresh: function() {},

  // 提醒发货
  tips(e) {
    order.success("已提醒发货")
    this.setData({
      remind: true
    })
    console.log("提醒发货")
  },

  //取消，确认收货
  action(e) {
    console.log(e)
    var id = e.currentTarget.id
    var data = {
      bizOrderId: e.currentTarget.dataset.ids
    }
    var url = id == 1 ? this.data.cancelurl : this.data.confirmurl
    app.req(url, "GET", data).then(res => {
      console.log(res)
      order.success("删除成功")
      
    })
  },

  // 倒计时
  resetTime(time) {
  console.log(time)
    var timer = null;
    var nowDate = Date.parse(new Date()) / 1000;
    
    timer = setInterval(() => {
      if (time>0) {
        var s = nowDate+time
        let {
          day,
          hour,
          min,
          sec
        } = app.countDown(s);
        this.setData({
          m: min,
          s: sec
        })
      } else {      
        console.log(2343535)
        this.setData({
          m: "00",
          s: "00"
        })
      }

    }, 1000);
  },

  // 出现弹窗
  delorder(e) {
    console.log(e)
    this.setData({
      delmodel: !this.data.delmodel,
    })
  },
  // 删除订单
  delsure(e) {
    var data={
      bizOrderId: this.data.orderdata.bizOrderId
    }
    app.req(this.data.delurl,"GET",data).then(res=>{
      
      this.setData({
        delmodel:true,
      })
    })
    wx.showToast({
      title: '删除成功',
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1500)
  },
  toaftersale(e){
    var id=e.currentTarget.id
    var orderid = e.currentTarget.dataset.idx

    if(id==1){
      wx.navigateTo({
        url: '../../aftersales/make_after_sales/index?id=' + orderid,
      })
    }else{
      wx.navigateTo({
        url: '../../aftersales/make_after_sales/index?id=' + orderid,
      })
    }  
  },
  viewLogistics(e) {
    let ids = e.currentTarget.id;    
    console.log('查看物流ids：', ids);
    wx.navigateTo({
      url: `/pages/order/logistics/index?id=${ids}`,
    })

  }




})