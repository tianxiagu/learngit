// pages/aftersales/makeaftersales.js
let api = getApp();
let config = require('../../../config.js');
let util = require('../../../util/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      {        
        img: '/images/gItem.png',
        title: '这里是商品的标题这里是商品的标题',
        tags: [{
          id: 0,
          name: '标签一'
        }, {
          id: 1,
          name: '标签二'
        }],
        price: 38,
        count: 1        
      },
      {        
        img: '/images/gItem.png',
        title: '这里是商品的标题这里是商品的标题',
        tags: [{
          id: 0,
          name: '标签一'
        }, {
          id: 1,
          name: '标签二'
        }],
        price: 38,
        count: 1        
      },
      {       
        img: '/images/gItem.png',
        title: '这里是商品的标题这里是商品的标题',
        tags: [{
          id: 0,
          name: '标签一'
        }, {
          id: 1,
          name: '标签二'
        }],
        price: 38,
        count: 1       
      }
    ],
    images: [
      '/images/gItem.png',
      '/images/goods.png',
      '/images/img1.png'
    ],
    pickerList: [
      '七天无理由',
      '商品质量问题',
      '七天无理由11',
      '商品质量问题22'
    ],
    pickerIndex: 0,
    pickerStatus: 0,
    refundAmount: 24,
    pickerVal: '七天无理由',
    returnDoc: '得分方式发送到',
    page: 0
  },
  returnDoc: function (e) {
    this.data.returnDoc = e.detail.value;
  },
  /**
   * 拒绝原因选项
   */
  onRefundCasePop: function() {
    this.setData({
      pickerStatus: 1,      
    })
  }, 
  /**
   * picker confirm 
   */
  onConfirm: function() {
    let tempPickerVal = this.data.pickerList[this.data.pickerIndex];
    this.setData({
      pickerStatus: 0,
      // pickerVal: tempPickerVal
    })
  },
  /**
   * picker cannel
   */
  onCannel: function () {
    this.setData({
      pickerStatus: 0
    })
  },
  /**
   * picker 选中事件
   */
  bindPickerChange: function(e) {
    const index = (e.detail.value)[0];
    const tempVal = this.data.pickerList[index];
    this.setData({
      pickerVal: tempVal
    });
  },
  /**
   * 上传凭证 拍照 && 选择照片
   */
  chooseImage: function() {
    let that = this;
    let images = that.data.images;    
    if(images.length >= 6) {
      that.toast('最多上传6张图哦~，亲', 2000);      
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = that.data.images.concat(res.tempFilePaths)
        that.data.images = images.length <= 6 ? images : images.slice(0, 6)
        if(images.length <= 6) {
          that.data.images = images;
        }else{
          that.data.images = images.slice(0, 3);          
          that.toast('最多上传6张图哦~，亲', 2000);
          return;
        }
        that.setData({
          images: that.data.images
        });     
        let arrOp = that.data.images;
      }
    })
  },
  toast: function (text, duration) {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: duration
    })
  },
  removeImage: function (e) {
    let that = this;
    let imgs = that.data.images;
    let idx = e.currentTarget.dataset.index;
    let tempArr = imgs.splice(idx, 1);
    console.log('temImg', imgs);
    that.setData({
      images: imgs
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  /**
   * 发起售后
   */
  sendSaleAfter: function() {
    let self = this;
    let returnDoc = this.data.returnDoc;
    let refundReason = this.data.pickerIndex;
    let refundAmount = this.data.refundAmount;
    let images = this.data.images;
    let imgUrls = images.join(',');
    let data = {
      userId: '123',
      subOrderId: '3456',
      refundReason: refundReason,
      refundAmount: refundAmount,
      imgUrls: imgUrls,
      returnDesc: returnDoc
    };
    self.goSaleSuccessPage();
    api.req(config.host + 'trade/buyer/refundOrder/submit', 'POST', data).then((res) => {
      if (res.responseCode !== 0) {
        // util.warn('接口异常，稍后再试~');
        return;
      }
      wx.showToast({
        title: '提交售后成功~',
        duration: 2000
      });
      wx.navigateTo({
        url: '/pages/aftersales/return_success/index',
      })      

    }, (err) => {
      util.warn('网络异常，稍后再试~');
    })
  },

  goSaleSuccessPage: function () {
    wx.redirectTo({
      url: './success',
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let page = this.data.page++;
    // console.log('page：', page); 
    console.log('页面下拉动作');
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})