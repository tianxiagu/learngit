// pages/aftersales/sale_detailStatus.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnInfo: {
      name: '叶不修',
      mobile: '13456789632',
      address: '浙江省&nbsp;杭州市&nbsp;西湖区&nbsp;蒋村街道&nbsp;文一西路西溪银泰城三楼3F501'
    },
    labelList:{
      returnMoney: '退款金额',
      returnLogistics: '退款物流',
      returnAccount: '退回支付账号',
      returnReson: '退款原因',
      payMoney: '实付金额',
      applyTime: '申请时间',
      returnTime: '退货时间',
      successTime: '成功时间',
      returnOrder: '退款编号'
    },
    detailSale:{
      //6制作售后单提交成功
      tab: 6,
      detail:{
        title:'待审核',
        desc:'等待客服审核',
        endTime:'',
        returnMoney: '666.00',//退回金额
        returnAccount: '771484168@qq.com',//退回支付宝账号
        returnReson: '商品质量原因',//退款原因
        payMoney: '666.00',//实付金额
        applyTime: '2018.09.02 11:49:59',//申请时间
        returnTime: '2018.09.02 11:49:59',//退货时间
        successTime: '2018.09.02 11:49:59',//成功时间
        returnOrder: '201811141612'//退款编号
      }
    },
    // 商店列表
    returnItem:[
      {
        storeInfo: {
          icon: '../../../images/store_icon.png',
          name: '官方旗舰店'
        },
        list: [
          {
            pic: '../../../images/store_item.png',
            title: '这里是商品标题这里是商品标题这里是商品标题',
            price: '38.00',
            num: 1,
            tag: ['白色', '38']
          },
          {
            pic: '../../../images/store_item.png',
            title: '这里是商品标题这里是商品标题这里是商品标题',
            price: '38.00',
            num: 1,
            tag: ['白色', '38']
          }
        ]
      }
    ],
    timer:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 倒计时
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
      this.setData({
        timer:null
      });
      clearInterval(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      this.setData({
        timer: null
      });
      clearInterval(this.data.timer);
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