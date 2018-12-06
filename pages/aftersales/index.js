// pages/aftersales/index.js
let app = getApp();
let config = require('../../config.js');
import {warn} from '../../util/utils.js';
import http from '../../util/https.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {    
    imgs: [],
    loading: {
      isLoad: false,
      hasData: false
    },
    saleListLen: 0,
    saleOrderList:[],
    page:1,
    pageSize:10,
    isOnReach:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodList();
  },

  /**
   * 获取所有店铺的产品
   */
  getGoodList: function() {
    let that=this;    
    let data = {
      userId: '1234556789',
      page:this.data.page,
      pageSize:this.data.pageSize
    };

    http.gets({load:1,url:`/trade/buyer/refundOrder/list`,data}).then(res=>{
        if (res.responseCode !== 0) {
          warn('接口异常，稍后再试~');
          return;
        } else {
          if(res.entry.length!==0){
            res.entry.map((item, index) => {
              if (item.itemPorpValue) {
                item.tags = [];
                item.itemPorpValue.split(';').map((items, indexs) => {
                  item.tags.push({
                    'name': items.split(':')[1]
                  });
                });
            }
          });        
          that.data.saleOrderList = that.data.saleOrderList.concat(res.entry);

          that.setData({
            saleListLen: (res.entry).length,
            saleOrderList: that.data.saleOrderList
          });          
        }
      }
    })
  },

  /**
   * 跳转到对应的店铺
   */
  goToHome: function() {
    console.log('跳转到对应的店铺');
    wx.redirectTo({
      url: '/pages/home/index',
    })
  },
  /**
   * 跳转到对应的详情页面
   */
  goToDetail: function(e) {  
    console.log(123);
    wx.navigateTo({
      url: `/pages/aftersales/sale_detail/index?subOrderId=${e.currentTarget.dataset.orderid}&tab=${e.currentTarget.dataset.type}`
    })
  },
  // 去退货
  gotoReturn:function(e){
    wx.navigateTo({
      url: `/pages/aftersales/return/index?orderid=${e.currentTarget.dataset.orderid}`
    })
  },
  /**
   * 选择图片上传
   */
  chooseImage(e) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = that.data.images.concat(res.tempFilePaths)

        that.data.images = images.length <= 9 ? images : images.slice(0, 3)

        that.setData({
          images: that.data.images
        });
        console.log('that', that.data.images);

      }
    })
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
    console.log('用户下拉刷新');
  },
  /**
   * 页面相关事件处理函数--监听用户上拉动作
   */
  pullUpLoad: function() {
    console.log('用户上拉动作');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    let self = this;
    let len = self.data.saleListLen;
    if(len <= 0) {
      return;
    };
    this.setData({
      page: ++self.data.page
    })
    self.getGoodList();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})
