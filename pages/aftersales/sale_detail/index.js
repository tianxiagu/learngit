// pages/aftersales/sale_detail.js
// tab为1表示待审核,2表示待退货,3表示已退货,4表示已退款成功,5表示审核失败
import http from '../../../util/https.js';
import {warn} from '../../../util/utils.js';
let app=getApp();
let baseUrl=app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnItem:[{
        storeInfo:{
          icon:'../../../images/store_icon.png',
          name:'官方旗舰店'
        },
        list:[
          {
            pic: '../../../images/store_item.png',
            title: '这里是商品标题这里是商品标题这里是商品标题',
            price: '38.00',
            num: 1,
            tag: ['白色', '38']
          }
        ]
    }],
    detailSale:{
      // tab为1表示待审核,2表示待退货,3表示已退货,4表示已退款成功,5表示审核失败
      tab:2,
      detail:{
        title:'售后成功',//标题
        desc:'提供的资料无法证明商品质量问题',
        returnMoney:'666.00',//退回金额
        returnReson:'商品质量原因',//退款原因
        payMoney:'666.00',//实付金额
        applyTime:'2018.09.02&nbsp;11:49:59',//申请时间
        returnTime:'2018.09.02&nbsp;11:49:59',//退货时间
        successTime:'2018.09.02&nbsp;11:49:59',//成功时间
        returnOrder:'201811141612'//退款编号
      }
    },
    labelList:{
      returnMoney:'退款金额',
      returnLogistics:'退货物流',
      returnAccount:'退款方式',
      returnReson:'退款原因',
      payMoney:'实付金额',
      applyTime:'申请时间',
      returnTime:'退货时间',
      successTime:'成功时间',
      returnOrder:'退款编号'
    },
    timer:null,
    statusTime:{
      day:0,
      hour:0,
      min:0,
      sec:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let returnData={
      supplier_id:1,
      supplier_shop_id:1
    };
    let data={
      userId:'1234556789',
      subOrderId:options.subOrderId
    };
    if(options.tab==2){
      http.gets({url:'/trade/returnAddress/get',data:returnData}).then(res=>{
        if(res.responseCode===0){
          let returnInfo={
            name:res.entry.consigneeName,
            mobile:res.entry.consigneeMobile,
            address:res.entry.returnAddress
          };
          that.setData({
            returnInfo
          });
        }
      });
    }
    http.gets({load:1,url:`/trade/buyer/refundOrder/detail`,data}).then(res=>{
      if (res.responseCode === 0) {
        let tag = [];
        if (res.entry.itemPorpValue) {
          res.entry.itemPorpValue.split(';').map((item) => {
            tag.push(item.split(':')[1]);
          })
        }
        let returnItem = [{
          storeInfo: {
            icon: res.entry.sellerShopLogo,
            name: res.entry.sellerShopName
          },
          list: [
            {
              pic: res.entry.mainImgUrl,
              title: res.entry.itemTitle,
              price: res.entry.price,
              num: res.entry.quantity,
              tag: tag
            }
          ]
        }];
        let detailSale = {
          // tab为1表示待审核,2表示待退货,3表示已退货,4表示已退款成功,5表示审核失败
          tab: options.tab,
          detail: {
            title: options.tab == 1 ? '待审核' : options.tab == 2 ? '待退货' : options.tab == 3 ? '已退货' : options.tab == 4 ? '售后成功' : '售后失败',//标题
            desc: options.tab == 1 ? '等待客服审核' : options.tab == 2 ? '请在0天0小时内寄出' : options.tab == 3 ? '等待商户确认' : options.tab == 4 ? '' : '提供的资料无法证明商品质量问题',
            returnMoney: res.entry.refundAmount,//退回金额
            returnReson: res.entry.refundReason,//退款原因
            payMoney: res.entry.payment,//实付金额
            applyTime: res.entry.applyTime,//申请时间
            returnTime: res.entry.returnTime,//退货时间
            successTime: res.entry.successTime,//成功时间
            returnOrder: res.entry.refundOrderId//退款编号
          }
        };
        if(options.tab==2){
          if(that.data.timer){
            clearInterval(that.data.timer);
          }else{
            that.data.timer =setInterval(()=>{
              let t = --res.entry.returnRemainingTime;
              if(t<=0){
                clearInterval(that.data.timer);
              }else{
                let {day,hour,min,sec}=that.statusTwoCountDown(t);
                let statusTime={
                  day:parseInt(day),
                  hour:parseInt(hour),
                  min:parseInt(min),
                  sec:parseInt(sec)
                };
                that.setData({
                  'detailSale.detail.desc':`请在${day}天${hour}小时内寄出`,
                  statusTime
                });
              }
            },1000);
          }
        }
        that.setData({
          returnItem,
          detailSale
        });
      }else{
        warn(res.message);
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
    clearInterval(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if(this.data.timer){
      clearInterval(this.data.timer);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  // 售后单状态为2时的退货倒计时
  statusTwoCountDown:function(t){
      let day = Math.floor(t / 86400) <= 9 ? ('0' + Math.floor(t / 86400)) : Math.floor(t / 86400); //天
      let hour = Math.floor(t % 86400 / 3600) <= 9 ? ('0' + Math.floor(t % 86400 / 3600)) : Math.floor(t % 86400 / 3600); //时
      let min = Math.floor(t % 86400 % 3600 / 60) <= 9 ? ('0' + Math.floor(t % 86400 % 3600 / 60)) : Math.floor(t % 86400 % 3600 / 60); //分
      let sec = t % 60 <= 9 ? ('0' + t % 60) : t % 60; //秒 
      return {day,hour,min,sec}; 
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
  // 去退货
  gotoReturnGoods:function(){
    if(this.data.statusTime.day==0&&this.data.statusTime.hour==0&&this.data.statusTime.min==0&&this.data.statusTime.sec==0){
       warn('您已过了待退货时间');
    }else{
      wx.navigateTo({
        url: '../return/index'
      })
    }
  }
})


