let app = getApp();
let baseUrl = app.globalData.url;
import http from '../../util/https.js';
Page({
  data: {
    address: {}, //收集到的地址对象
    hasAddress: false, //是否收集到地址
    hasAuthAddress: true, //是否获取过地址授权
    order: {}, //请求预订单数据
  },

  //选择地址
  chooseOrderAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          address: res,
          hasAddress: true,
          hasAuthAddress: true
        });
      },
      fail: (err) => {
        this.setData({
          hasAuthAddress: false
        });
        console.log(err);
      }
    })
  },

  //获取待提交商品列表信息
  getProList() {
    let buyList = wx.getStorageSync('buyList');
    if (!buyList) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      buyList = JSON.parse(buyList);
      http.post({
        url: `${baseUrl}/trade/payOrder/pre/create`,
        data: {
          userId: "1",
          shopId: "11",
          skuList: buyList
        },
      }).then((res) => {
        res.entry = {
          fee: 298.00,
          logisticsFee: 10,
          paymentYuan: 1140.00,
          sellerShopName: "万柳园",
          quantity: 3,
          payMode: "微信支付",
          skuList: [{
              itemId: "1",
              skuId: "1",
              mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2Pzb7X5qfF1Jjy0FcXXcLdFXa_!!1768813141.jpg_430x430q90.jpg",
              itemTitle: "屋之宝 五斗柜简约现代五斗橱卧室储物柜六斗柜子客厅抽屉收纳柜",
              paymentYuan: 890.00,
              quantity: 1,
              itemProperty: ["白色", "二次元", "中码"],
            },
            {
              itemId: "1",
              skuId: "1",
              mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2MS1BXVXXXXaxXpXXXXXXXXXX_!!1768813141.jpg_430x430q90.jpg",
              itemTitle: "多功能拼色储物柜 美国上市企业 工厂直销",
              paymentYuan: 120,
              quantity: 2,
              itemProperty: ["白色", "二次元", "中码"],
            }
          ]
        }
        this.setData({
          order: res.entry
        })
      }).catch((err) => {
        console.log(err);
      })
    }
  },

  // 提交订单
  submitOrder: function() {
    let buyList = wx.getStorageSync('buyList');
    if (!buyList) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      if (!this.data.hasAddress) {
        wx.showToast({
          title: '请选择收货地址',
          icon: "none"
        })
        return
      }
      buyList = JSON.parse(buyList);

      http.post({
        url: `${baseUrl}/trade/payOrder/submit`,
        data: {
          userId: "1",
          shopId: "1",
          addressId: "1",
          itemParam: buyList
        },
      }).then((res) => {
        if (res == 1) { //该地区无货

        } else if (res == 2) { //订单提交失败

        } else { //支付成功
          wx.reLaunch({
            url: '/pages/paysucess/index'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  onShow: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.address"] === false) {
          this.setData({
            hasAuthAddress: false
          });
        } else {
          this.setData({
            hasAuthAddress: true
          });
        }
      }
    })
  },

  onLoad: function(options) {
    this.getProList();
  }

})