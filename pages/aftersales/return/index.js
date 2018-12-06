// pages/aftersales/return.js
import http from '../../../util/https.js';
import {warn} from '../../../util/utils.js';
let app=getApp();
let baseUrl=app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      labelList:{
        address:'退货地址',
        company:'物流公司',
        orderNumber:'物流单号',
        returnIntro:'退货说明'
      },
    returnItem: [],
      returnInfo:{
        name:'叶不修',
        mobile:'13456789632',
        address:'浙江省&nbsp;杭州市&nbsp;西湖区&nbsp;蒋村街道&nbsp;文一西路西溪银泰城三楼3F501'
      },
      array: ['顺丰', '韵达', '圆通', 'EMS'],
      orderNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      subOrderId:options.orderid
    });
    let data={
      userId:'1234556789',
      subOrderId:options.orderid
    };
    let returnData = {
      supplier_id: 1,
      supplier_shop_id: 1
    };
    let params={
      load:1,
      url:`${baseUrl}/trade/buyer/refundOrder/detail`,
      data
    };
    http.gets({ url: '/trade/returnAddress/get', data: returnData }).then(res => {
      if (res.responseCode === 0) {
        let returnInfo = {
          name: res.entry.consigneeName,
          mobile: res.entry.consigneeMobile,
          address: res.entry.returnAddress
        };
        that.setData({
          returnInfo
        });
      }
    });
    http.gets(params).then(res=>{
      let returnItem = [{}];
      let list = [];
      if (res.responseCode === 0) {
        let tags = [];
        if (res.entry.itemPorpValue) {
          res.entry.itemPorpValue.split(';').map((item) => {
            tags.push(item.split(':')[1]);
          });
        }
        list.push({
          pic: res.entry.mainImgUrl,
          title: res.entry.itemTitle,
          price: res.entry.price,
          num: res.entry.quantity,
          tag: tags
        });
        that.setData({
          returnItem: [{ list }]
        });
      } else {
        app.showMsg(res.message);
      }
    });
    http.gets({url:`${baseUrl}/trade/express/list`,data:{}}).then(res=>{
      if (res.responseCode === 0) {
        let array = [];
        if (res.entry) {
          res.entry.map((item) => {
            array.push(item.expressName);
          });
        }
        that.setData({
          array
        });
      }
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
  //请选择物流
  bindPickerChange(e){
    this.setData({
      index: e.detail.value
    })
  },
  // 提交
  submit:function(e){
    let that=this;
    if(this.data.index===undefined){
      warn('请先选择物流公司');
    }else if(e.detail.value.logisticsNumber===''){
      warn('请输入物流单号');
    }else{
      let data={
        userId:'1234556789',
        subOrderId:this.data.subOrderId,
        logisticsCompany:this.data.array[this.data.index],
        logisticsNo:e.detail.value.logisticsNumber,
        returnDesc:e.detail.value.returnPolicy
      };
      let params={
        url:`${baseUrl}/trade/buyer/return/submit`,
        data
      };
      http.post(params).then(res=>{
         res.responseCode===0?wx.navigateTo({
             url: `/pages/aftersales/return_success/index?company=${that.data.array[that.data.index]}&ordernum=${e.detail.value.logisticsNumber}&desc=${e.detail.value.returnPolicy}`
           }):warn(res.message)
      });
    }
  }
})

