// pages/order/index.js
var app = getApp()
const order = require("../../util/utils.js");
// var config=require('../../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ["全部", "待付款", "待发货", "待收货"],
    tabIndex: 0,
    // 删除弹窗
    delmodel: false,
    // 展示数
    pageSize: 2,
    page: 1,
    orderList: [],
    // 请求路径
    getorderlist: "",
    // 是否有更多数据
    isHasNext: true,
    // 提醒发货
    remind: false,
    // 删除订单
    delurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/del",
    // 确认收货
    confirmurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/del",
    // 取消订单
    cancelurl: "http://192.168.1.199:3000/mock/33/buyer/bizOrder/cancel",
    delorderID:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        tabIndex: options.id
      })
    }
    this.req()
    this.resetTime(1543040400)

  },

  // 切换选项卡
  choosetab(e) {
    var id = e.currentTarget.id
    this.setData({
      tabIndex: id,
      page: 1,
      isHasNext: true
    })
    this.req(id)
  },
  // 去首页
  toshop() {
    wx.switchTab({
      url: '../home/index',
    })

  },
  // to商品详情
  todetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: './detail/index?id=' + id,
    })
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
    })
  },

// 查看物流
  logistics(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../logistics/index?orderid=' + id,
    })
  },
// 支付
  pay(e) {
    console.log("支付")
  },
  // 提醒发货
  tips(e) {
    order.success("已提醒发货")
    this.setData({
      remind: true
    })
    console.log("提醒发货")
  },

  // 出现弹窗
  delorder(e) {
    this.setData({
      delmodel: !this.data.delmodel,
      delorderID:e.currentTarget.dataset.id
    })
  },
  // 删除订单
  delsure(e) {
    var data = {
      bizOrderId: this.data.delorderID
    }
    app.req(this.data.delurl, "GET", data).then(res => {

      this.setData({
        delmodel: true,
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var id = this.data.tabIndex == 0 ? '' : this.data.tabIndex
    if (this.data.isHasNext) {
      this.req(id)
    }
  },
  // 请求数据
  req(id) {
    order.loading("加载中")
    id == 0 ? id = "" : id
    var reqdata = {
      userid: 111,
      status: id,
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    var data = this.data.reqdata
    app.req("http://192.168.1.199:3000/mock/33/trade/buyer/bizOrder/list", "GET", reqdata).then(res => {
      wx.hideLoading()
      if (res.responseCode === 0) {
        var orderList = this.data.orderList
        var allover = res.isHasNext;
        res.entry[0].status==2
        if (this.data.page == 1) {
          orderList = res.entry
        } else {
          orderList = orderList.concat(res.entry)
        }
        this.setData({
          orderList: orderList,
          page: ++this.data.page,
          isHasNext: allover
        })
        this.resetTime()
      }
    })
  },
  // 倒计时
  resetTime() {
    var timer = null;
    var nowDate = Date.parse(new Date()) / 1000;
    timer = setInterval(() => {
      let orderList = this.data.orderList;
      orderList.map((value, index) => {
        if (value.status == 1) {
          value.minute = "00"
          value.second = "00"
          value.endTime - 1
          if (nowDate < value.endTime) {
            let {
              day,
              hour,
              min,
              sec
            } = app.countDown(value.endTime);
            value.minute = min
            value.second = sec
          } else {
            value.minute = "00"
            value.second = "00"
          }
          return value;
        }

      })
      this.setData({
        orderList: orderList
      })

    }, 1000);
  },
})