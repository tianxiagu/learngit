// pages/authorized/index.js
const order = require("../../util/utils.js");
import http from '../../util/https.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "../../images/order/logo.png",
    authurl: app.globalData.url+"/usercenter/login/wxmini/auth",
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    if (options.id) {
      wx.setStorageSync('id', options.id)
    }
  },
  onGotUserInfo(e) {
    console.log(e)
    if (e.detail.rawData) {
      var data = {
        authCode: app.globalData.code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sellerShopId:wx.getStorageInfoSync("shopID"),
        sellerShopId: 23
      }
      http.gets({ url: this.data.authurl, data: data }).then(res=>{
        if (res.entry && res.entry.wxUnionid) {
          wx.setStorageSync('shopID', res.entry.sellerShopId)
          wx.setStorageSync('userId', res.entry.userId)
          wx.setStorageSync('wxUnionid', res.entry.wxUnionid)
          wx.setStorageSync('token', res.entry.token)
          console.log(wx.getStorageSync("goodsId"))
          if(wx.getStorageSync("goodsId")){
            console.log(13231)
            wx.redirectTo({
              url: '../detail/index',
            })
          }else{
            console.log(876)
            wx.switchTab({
              url: '../home/index',
            })
          }
        }
      })
    //   app.req(this.data.authurl.authurl, 'GET', data).then(res => {
    //     console.log(res.entry)
    //     if (res.entry && res.entry.wxUnionid) {
    //       wx.setStorageSync('user', res.entry)
    //     }
    //   })
    } else {
      order.showmodel("提示", "授权才能使用小程序哦")
    }

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

  }
})