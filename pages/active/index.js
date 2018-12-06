// pages/active/index.js
let app = getApp();
import http from '../../util/https.js';
import util from '../../util/utils.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityImgUrl: '',
    activityName: '',
    activityDesc: '',
    activityStatus: 0, //0、活动结束 1、活动未开始 2、活动进行中
    endTime: '', //活动结束时间
    remainTime: '', //活动剩余时间
    day: 0,
    hours: 0,
    min: 0,
    sec: 0,
    
    activityListLen: 0,
    activityList: [],
    page: 1,
    pageSize: 10,
    timer: null    
  },
  addGoodsToCarts: function() {
    let data = {
      userId: 122,
      shopId: 4434,
      skuId: 89,
      quantity: 1
    };
    http.post({ load: 1, url: `${app.globalData.url}/trade/shoppcar/add`, data}).then(res => {
      if(res && res.responseCode !==0) {
        // return;
      }
      util.success('添加到购物车');
    })
  },
  getActivityList: function (options) {
    let self = this;
    let data = {
      activityId: 111,
      page: self.data.page,
      pageSize: self.data.pageSize
    };
    http.gets({ load: 1, url: `${app.globalData.url}/itemcenter/activity/item/list`, data }).then(res => {
      let resList = res.entry;
      if (res.responseCode !== 0) {
        // util.warn('接口异常，稍后再试~');
        // return;
      }
      self.data.activityList = self.data.activityList.concat(resList);
      self.setData({
        activityList: self.data.activityList,
        activityListLen: resList.length
      })
      // console.log('activeList：', self.data.activityList);
    })
  },
  getActivityDetail: function (options) {
    let self = this;
    let data = {
      activityId: 34
    };
    http.gets({ load: 1, url: `${app.globalData.url}/itemcenter/activity/get`, data }).then(res => {
      let detailData = res.entry;
      if(res.responseCode !== 0) {
        // return;
      }
      self.setData({
        activityImgUrl: detailData.activityImgUrl,
        activityName: detailData.activityName,
        activityDesc: detailData.activityDesc
      })
      self.data.timer = setInterval(() => {
        self.countDownTime(detailData.endTime);
        // self.cutTimeFunc(detailData.endTime);
      }, 1000);
    });
  },
  timeFormat: function(param) {
    return param < 10 ? '0' + param : param;
  },
  countDownTime: function(endTime) {
    let self = this;
    let timeObj = null;
    let day, hour, min, sec, actStatus;
    let nowTime = Math.round(new Date() / 1000);
    var endTime = 1543913519;
    if(endTime - nowTime > 0) {
      let time = endTime - nowTime;
      day = parseInt(time/(60*60*24));
      hour = parseInt(time%(60*60*24)/3600);
      min = parseInt(time%(60*60*24)%3600/60);
      sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);

      day = self.timeFormat(day);
      hour = self.timeFormat(hour);
      min = self.timeFormat(min);
      sec = self.timeFormat(sec);
      actStatus = 2;
    }else{
      day = '00';
      hour = '00';
      min = '00';
      sec = '00';      
      actStatus = 0;
      clearInterval(self.data.timer);
    }
    self.setData({
      day: day,
      hours: hour,
      min: min,
      sec: sec,
      activityStatus: actStatus
    })
  },
  cutTimeFunc: function (remainTime) {
    let self = this;
    let { day, hour, min, sec } = app.countDown(parseInt(remainTime));    
    if (parseInt(day) <= 0 && parseInt(hour) <= 0 && parseInt(min) <= 0 && parseInt(sec) <= 0) {
      clearInterval(self.data.remainTime)
      // this.setData({
      //   day: 0,
      //   hours: 0,
      //   min: 0,
      //   sec: 0
      // })
      // return;
    }
    this.setData({
      day: day.replace('0-', ''),
      hours: hour.replace('0-', ''),
      min: min.replace('0-', ''),
      sec: sec.replace('0-', '')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    this.getActivityDetail(options);
    this.getActivityList(options);
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
    let self = this;
    let len = self.data.activeListLen;

    if(len <= 0) {
      return;
    }
    self.setData({
      page: ++self.data.page
    })
    self.getActivityList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})