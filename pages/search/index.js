// pages/search/index.js
import http from '../../util/https.js';
import { warn } from '../../util/utils.js';
let app = getApp();
let baseUrl = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList1: [],
    searchList: [],
    height: 0,
    searchVal: '',
    searchTab: 0,
    loading: {
      isLoad: false,
      hasData: false
    },
    page: 1,
    pageSize: 10,
    isNoReach: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      searchList: [],
      iptValue: options.searchVal ? options.searchVal : '',
      searchTab: options.searchVal ? 1 : 0
    });
    this.data.searchList1.map((item, index) => {
      if (item.title.indexOf(options.searchVal) > -1) {
        this.data.searchList.push(item);
      }
    })
    this.setData({
      searchList: this.data.searchList
    });
    this.getData(options.searchVal ? options.searchVal : '');
  },

  // 请求接口
  getData(keyword) {
    let that = this;
    let contentType = app.globalData.contentType;
    let data = {
      keyword: keyword,
      page: that.data.page,
      pageSize: that.data.pageSize,
      sortField: '',
      sortType: ''
    };
    let params = { url: `/itemcenter/buyer/search/item/list`, header: contentType, data };
    // 请求接口
    http.gets(params).then(res => {
      if (res.responseCode === 0) {
        if (res.entry.length < 10) {
          that.setData({
            isNoReach: false
          });
        }
        that.setData({
          searchList: res.entry
        });
      } else {
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
    let that = this;
    let contentType = app.globalData.contentType;
    let data = {
      keyword: this.data.iptValue,
      page: ++that.data.page,
      pageSize: that.data.pageSize,
      sortField: '',
      sortType: ''
    };
    let params = { url: `/itemcenter/buyer/search/item/list`, header: contentType, data };
    // 请求接口
    if (this.data.isNoReach) {
      this.setData({
        'loading.isLoad': true
      });
      setTimeout(() => {
        http.gets(params).then(res => {
          if (res.responseCode === 0) {
            if (res.entry.length !== 0 && res.entry.length === 10) {
              res.entry.map((item) => {
                that.data.searchList.push(item);
              });
            } else if (res.entry.length !== 0 && res.entry.length < 10) {
              res.entry.map((item) => {
                that.data.searchList.push(item);
              });
              that.setData({
                isNoReach: false,
                'loading.isLoad': false,
                'loading.hasData': true
              });
            } else {
              that.setData({
                isNoReach: false,
                'loading.isLoad': false,
                'loading.hasData': true
              });
            }
            that.setData({
              searchList: that.data.searchList
            });
          }
        });
      }, 500);
    } else {
      this.setData({
        'loading.isLoad': false
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 搜索提示
  searchValue: function (e) {
    this.setData({
      searchVal: e.detail.value,
      searchTab: e.detail.value === '' ? 0 : 1
    });
  },
  // 搜索回车事件
  keyCodeBtn: function (e) {
    let that = this;
    this.setData({
      searchList: [],
      iptValue: e.detail.value,
      isNoReach: true,
      'loading.isLoad': false,
      'loading.hasData': false
    });
    if (e.detail.value === '') {
      this.setData({
        searchList: []
      });
    } else {
      this.data.searchList1.map((item, index) => {
        if (item.title.indexOf(e.detail.value) > -1) {
          this.data.searchList.push(item);
        }
      });
      this.setData({
        searchList: this.data.searchList
      });
    }
    this.getData(e.detail.value);
  }
})

