import http from '../../util/https.js';
import { warn } from '../../util/utils.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ewmList: {
      ewmShow: 0,
      clientHeight: wx.getSystemInfoSync().screenHeight,
      tabList: [{
        pic: '../../images/share_firend.jpg',
        title: '分享给好友',
        tap: 'share',
        isButton: 1
      },
      {
        pic: '../../images/share_circle.jpg',
        title: '分享到朋友圈',
        tap: 'shareCircle',
        isButton: 0
      }
      ],
      cancel: '取消'
    },
    swiper: {
      imgUrls: [],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      indicatorColor: '#bdbdbd',
      indicatorActiveColor: '#ffffff'
    },
    // tab切换
    tab: 0,
    controlPrice: 0,
    tabList: [{
      title: '默认',
      index: 0
    },
    {
      title: '价格',
      index: 1
    }
    ],
    allGoodsList: [],
    storeTemplate: {
      title: '铺主推荐',
      desc: '铺主精心挑选',
      tab: 0
    },
    goodsTemplate: {
      title: '好货会场',
      desc: '精选好物看这里',
      tab: 0
    },
    allTemplate: {
      title: '全部商品',
      desc: '精选好物看这里',
      tab: 0
    },
    timer: null,
    timer1:null,
    searchVal: '',
    searchTab: 0,
    loading: {
      isLoad: false,
      hasData: false
    },
    alertEwm: 0,
    isCanvas: 0,
    tagList: ['假货必退', '全场包邮', '贴心客服'],
    saveShare: 0,
    productList: [],
    height: wx.getSystemInfoSync().screenHeight,
    swiperTab: 0,
    dataInfo: '',
    page: 1,
    pageSize: 10,
    priceTab: 0,
    priceSort: [{
      tab: 1,
      name: '价格升序',
      tap: 'descPrice'
    },
    {
      tab: 2,
      name: '价格降序',
      tap: 'ascPrice'
    }
    ],
    gotoTop: 1,
    dataInfo: {},
    ctrlprice: -1,
    showtab: 1, //1时展开，2时收起
    isNoReach: true,
    shopid:'123456'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
  },
  // 好货会场活动封装
  activeEnd:function(entry){
    entry.activityList.map((item, index) => {
      let { day, hour, min, sec } = app.countDown(parseInt(item.activityEndTime / 1000));
      if (parseInt(day) != 0 || (parseInt(day) == 0) && parseInt(hour) >= 12) {
        item.EndTime = this.dateFormat(parseInt(item.activityEndTime), 'MM-dd hh:mm') + '结束';
      } else {
        if (parseInt(day) <= 0 && parseInt(hour) <= 0 && parseInt(min) <= 0 && parseInt(sec) <= 0) {
          entry.activityList.splice(index, 1);
        } else {
          item.EndTime = `${hour}时${min}分${sec}秒后结束`
        }
      }
    });
  },
  // 时间戳转换为日期
  dateFormat:function(millionsTime, pattern) {
    var d = new Date();
    d.setTime(millionsTime);
    var date = {
      "M+": d.getMonth() + 1,
      "d+": d.getDate(),
      "h+": d.getHours(),
      "m+": d.getMinutes(),
      "s+": d.getSeconds(),
      "q+": Math.floor((d.getMonth() + 3) / 3),
      "S+": d.getMilliseconds()
    };
    if (/(y+)/i.test(pattern)) {
      pattern = pattern.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return pattern;
  },
  // 请求接口倒计时封装
  getCountDown: function (datashop) {
    let arr = [];
    this.encapsulationCountDown(datashop.shopRecommendList);
    if (datashop.shopRecommendList.length <= 2) {
      arr = datashop.shopRecommendList;
    } else {
      arr.push(datashop.shopRecommendList[0]);
      arr.push(datashop.shopRecommendList[1]);
    }
    this.setData({
      dataInfo1: datashop,
      dataInfo: datashop,
      'dataInfo.shopRecommendList': arr
    });
  },
  // 封装倒计时
  encapsulationCountDown: function (data) {
    if (data.length !== 0) {
      data.map((item, index) => {
        if (item.recommendBizEndTime !== '') {
          let { day, hour, min, sec } = app.countDown(parseInt(item.recommendBizEndTime / 1000));
          if (parseInt(day) <= 0 && parseInt(hour) <= 0 && parseInt(min) <= 0 && parseInt(sec) <= 0) {
            item.time = '00:00:00'
          } else {
            let hours = (parseInt(hour) + day * 24)<=9?('0'+(parseInt(hour) + day * 24)):(parseInt(hour) + day * 24);
            item.time = `${hours}:${min}:${sec}`
          }
        }
      });
    }
  },
  // 展开收起
  showAndHide: function () {
    // 1是展开,2是隐藏
    clearInterval(this.data.timer);
    // 展开
    if (this.data.showtab === 1) {
      this.showRecommend();
      this.data.timer = setInterval(() => {
        this.showRecommend();
      }, 1000);
      this.setData({
        showtab: 2
      });
    } else {
      this.setData({
        showtab: 1
      });
      this.hideRecomend();
      this.data.timer = setInterval(() => {
        this.hideRecomend();
      }, 1000);
    }
  },
  // 铺主推荐展开
  showRecommend: function () {
    this.encapsulationCountDown(this.data.dataInfo1.shopRecommendList);
    this.setData({
      dataInfo: this.data.dataInfo1
    });
  },
  // 铺主推荐收起
  hideRecomend: function () {
    this.encapsulationCountDown(this.data.dataInfo1.shopRecommendList);
    let arr = [];
    arr.push(this.data.dataInfo1.shopRecommendList[0]);
    arr.push(this.data.dataInfo1.shopRecommendList[1]);
    this.setData({
      'dataInfo.shopRecommendList': arr
    });
  },
  // 价格升序
  descPrice: function () {
    this.setData({
      priceTab: 1
    });
    let datas = {
      keyword: '',
      page: 1,
      pageSize: this.data.pageSize,
      sortField: 'price',
      sortType: 'desc'
    };
    this.getData(datas);
  },
  // 价格降序
  ascPrice: function () {
    this.setData({
      priceTab: 2
    });
    let datas = {
      keyword: '',
      page: 1,
      pageSize: this.data.pageSize,
      sortField: 'price',
      sortType: 'asc'
    };
    this.getData(datas);
  },
  // 请求接口
  getData(datas) {
    let that = this;
    let contentType = app.globalData.contentType;
    let params = { url: `/itemcenter/buyer/search/item/list`, header: contentType, data: datas };
    // 请求搜索接口
    http.gets(params).then(res => {
      if (res.responseCode === 0) {
        that.setData({
          allGoodsList: res.entry
        });
      } else {
        warn(res.message);
      }
    });
  },
  // tab事件
  tabTap(e) {
    // ctrlprice为2时升序 为1时降序
    let ctrlprice = e.currentTarget.dataset.index === 0 ? -1 : (e.currentTarget.dataset.index === 1 && this.data.ctrlprice === 2) ? 1 : 2;
    this.setData({
      tab: e.currentTarget.dataset.index,
      ctrlprice,
      isNoReach: true,
      'loading.hasData': false,
      'loading.isLoad':false
    });
    let datas = {
      keyword: '',
      page: 1,
      pageSize: this.data.pageSize,
      sortField: 'price',
      sortType: ctrlprice === 2 ? 'desc' : ctrlprice === 1 ? 'asc' : ''
    };
    if (e.currentTarget.dataset.index === 0) {
      this.getData(datas);
    } else {
      this.getData(datas);
    }
  },
  // 显示二维码
  showEwm() {
    this.setData({
      alertEwm: 1
    });
  },
  // 隐藏二维码
  hideEwm() {
    this.setData({
      alertEwm: 0
    });
  },
  // 返回顶部
  gotoTop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 50
      })
    }
  },
  gotoShare() {
    this.setData({
      'ewmList.ewmShow': 1
    });
  },
  hideShare() {
    this.setData({
      'ewmList.ewmShow': 0
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
    this.setData({
      searchVal: '',
      searchTab: 0,
    });
    let that = this;
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    if (this.data.timer1) {
      clearInterval(this.data.timer1);
    }
    // 请求banner
    let bdata = {
      position: 5,
      type: 1,
      resourceFrom: 2
    };
    http.gets({ url: `${app.globalData.baseUrl}/trade/resourceConfig/get`, data: bdata }).then(res => {
      if (res.responseCode === 0) {
        that.setData({
          'swiper.imgUrls': res.entry
        });
      } else {
        warn(res.message);
      }
    });
    // 请求活动
    let data = {
      sellerShopId: '1001'
    };
    http.gets({ url: `/trade/buyer/shopRelated/get`, data }).then(res => {
      if (res.responseCode === 0) {
        if (res.entry.activityList.length !== 0) {
          for (let i = 0; i < res.entry.activityList.length; i++) {
            res.entry.activityList[i].tag = res.entry.activityList[i].activitySign.split(',');
          }
          this.activeEnd(res.entry);
          // 此处做好货会场倒计时
          this.data.timer1 = setInterval(() => {
            // 好货会场活动倒计时
            this.activeEnd(res.entry);
          }, 1000);
        }
        that.getCountDown(res.entry);

        this.data.timer = setInterval(() => {
          that.getCountDown(res.entry);
        }, 1000);
        that.setData({
          showtab: res.entry.shopRecommendList.length <= 2 ? 3 : 1,
        });
      } else {
        warn(res.message);
      }
    });
    let datas = {
      keyword: '',
      page: this.data.page,
      pageSize: this.data.pageSize,
      sortField: '',
      sortType: ''
    };
    that.getData(datas);
  },
  // 监听滚动
  onPageScroll: function (e) {
    if (e.scrollTop > parseInt(this.data.height / 2)) {
      this.setData({
        gotoTop: 0
      });
    } else {
      this.setData({
        gotoTop: 1
      });
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if(this.data.timer) {
      clearInterval(this.data.timer);
    }
    if(this.data.timer1){
      clearInterval(this.data.timer1);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    if (this.data.timer1) {
      clearInterval(this.data.timer1);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  //保存到相册 
  saveImageToPhotosAlbum: function () {
    let that = this;
    wx.downloadFile({
      url: that.data.dataInfo.sellerInfo.sellerWxQrcodeUrl,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            app.showMsg('保存成功');
          },
          fail: function (err) {
            app.showMsg('保存失败');
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("用户一开始拒绝了，我们想再次发起授权")
              console.log('打开设置窗口')
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  //保存到相册分享到朋友圈  
  saveImageToPhotosAlbum1: function () {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareTempFilePath1,
      success: (res) => {
        app.showMsg('保存成功');
        setTimeout(() => {
          that.setData({
            saveShare: 0,
          });
        }, 1000);
      },
      fail: (err) => {
        app.showMsg('保存失败');
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let contentType = app.globalData.contentType;
    let datas = {
      keyword: '',
      page: ++this.data.page,
      pageSize: this.data.pageSize,
      sortField: (this.data.ctrlprice === 2 || this.data.ctrlprice === 1) ? 'price' : '',
      sortType: this.data.ctrlprice === 2 ? 'desc' : this.data.ctrlprice === 1 ? 'asc' : ''
    };
    let params = { url: `/itemcenter/buyer/search/item/list`, header: contentType, data: datas };
    // 请求接口
    if (this.data.isNoReach) {
      http.gets(params).then(res => {
        if (res.responseCode === 0) {
          if (res.entry.length !== 0 && res.entry.length === 10) {
            res.entry.map((item) => {
              that.data.allGoodsList.push(item);
            });
          } else if (res.entry.length !== 0 && res.entry.length < 10) {
            res.entry.map((item) => {
              that.data.allGoodsList.push(item);
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
          // res.entry.map((item) => {
          //   that.data.allGoodsList.push(item);
          // });
          that.setData({
            allGoodsList: that.data.allGoodsList
          });
        } else {
          warn(res.message);
        }
      });
    } else {
      this.setData({
        'loading.hasData': true
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return{
      title:'方糖的零食店',
      path:'/pages/home/index?shopid='+this.data.shopid
    }
  },
  // 搜索输入
  searchIpt: function (e) {
    this.setData({
      searchVal: e.detail.value,
      searchTab: e.detail.value === '' ? 0 : 1
    });
  },
  // 回车搜索
  searchConfirm: function (e) {
    wx.navigateTo({
      url: `../search/index?searchVal=${e.detail.value}`
    })
  },
  // 分享到朋友圈
  shareCircle: function () {
    this.setData({
      saveShare: 1,
      'ewmList.ewmShow': 0
    });
  },
  hideShareCircle: function () {
    this.setData({
      saveShare: 0
    });
  },
  // swiper改变
  changeSwiper: function (e) {
    this.setData({
      swiperTab: e.detail.current
    });
  }
})


