// pages/aftersales/return_success.js.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelList: {
      company: '物流公司',
      logisticsNum: '物流单号',
      returnPolicy: '退货说明'
    },
    successInfo: {
      logisticsCom: '顺丰速达',
      logisticsOrd: '123456789',
      exitDesc: '这里是一段说明这里是一段说明这里是一段说明这里是一段说明这里是一段说明这里是一段说明'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let successInfo = {
      logisticsCom: options.company,
      logisticsOrd: options.ordernum,
      exitDesc: options.desc
    };
    this.setData({
      successInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },
  // 返回首页
  gotoIndex: function () {
    wx.switchTab({
      url: '/pages/home/index',
    })
  }
})