// pages/personal/personal.js
var app = getApp()
const order = require("../../util/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址授权
    isaddress: false,
    // 弹窗
    isSend: true,
    time: 60,
    phoneNum: '',
    phoneCode: "",
    sendMsg: "/agent/v2/Base/sendMsg",
    timer: "",
    tab: [{
        name: "全部订单",
        pic: "../../images/order/allorder.png"
      },
      {
        name: "待支付",
        pic: "../../images/order/waitpay.png"
      },
      {
        name: "待发货",
        pic: "../../images/order/waitgoods.png"
      },
      {
        name: "待收货",
        pic: "../../images/order/befor.png"
      },
      {
        name: "售后退款",
        pic: "../../images/order/allorder.png"
      }
    ],
    showModel: false,
    userinfourl: "http://192.168.1.199:3000/mock/33/trade/buyer/userinfo/get",
    userInfo: '',
    addresurl: "http://192.168.1.199:3000/mock/33/trade/receiver/submit",
    getcodeurl: "http://192.168.1.199:3000/mock/28/usercenter/smsCode/get",
    boundPhoneurl: "http://192.168.1.199:3000/mock/33/usercenter/bindMobile/submit",

  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function(options) {
    var data = {
      userId: wx.getStorageInfoSync("userid")
    }
    app.req(this.data.userinfourl, "GET", data).then(res => {
      // res.entry.mobile=""
      this.setData({
        userInfo: res.entry
      })
    })
  },
  toorder(e) {
    var id = e.currentTarget.id
    if (id == 4) {
      wx.navigateTo({
        url: '../aftersales/index',
      })

    } else {
      wx.navigateTo({
        url: '../order/index?id=' + id,
      })
    }
  },
  // 弹窗
  showModel() {
    this.setData({
      showModel: !this.data.showModel
    })
  },
  // 选择地址
  chooseAddress() {
    var data = {}
    wx.chooseAddress({
      success: res => {
        console.log(res)
        data = {
          userId: wx.getStorageInfoSync("userid"),
          receiverName: res.userName,
          mobile: res.telNumber,
          province: res.provinceName,
          city: res.cityName,
          district: res.countyName,
          address: res.detailInfo,
        }
        app.req(this.data.addresurl, "POST", data).then(res => {
          console.log(res)
        })
      },
      fail: res => {
        this.setData({
          isaddress: true
        })
        console.log(res)
      }
    })
  },
  // 到设置页授权
  getopenSetting(e) {
    wx.openSetting({
      success: res => {
        if (res.authSetting["scope.address"] == false) {
          this.setData({
            isaddress: true
          })
        } else if (res.authSetting["scope.address"] == true) {
          wx.chooseAddress({
            success: res => {
              console.log(res)
            }
          })
          this.setData({
            isaddress: false
          })
        }
      },
      fail: res => {
        order.warn("授权失败，请稍后尝试")
      }
    })
  },


  onReady: function() {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 取得授权信息
  onShow: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.address"] == false) {
          this.setData({
            isaddress: true
          })
        }
      }
    })
  },

  //绑定手机


  // 点击发送
  sendCode: function() {
    this.setData({
      time: 60
    });
    if (this.data.phoneNum == '') {
      order.warn("请输入手机号")
    } else if (!(/^1[3456789]\d{9}$/.test(this.data.phoneNum))) {
      order.warn("请输正确的手机号")
    } else {
      var data = {
        mobile: this.data.phoneNum,
      }
      // 此处做发送验证码操作
      wx.showLoading({
        title: '正在发送验证码',
      })
      app.req(this.data.getcodeurl, "POST", data).then(res => {
          if (res.responseCode === 0) {
            wx.hideLoading()
            order.success('短信发送成功');
            this.setData({
              // sendAndTime: '倒计时（' + this.data.time + '）',
              isSend: false
            });
            this.setIntervalInfo();
          } else {
            order.warn(res.data.msg)
          }
        }

      )

    }
  },

  // 定时
  setIntervalInfo: function() {
    let that = this;
    this.data.timer = setInterval(() => {
      that.setData({
        time: --that.data.time,
        sendAndTime: '倒计时（' + that.data.time + '）'
      });
      if (that.data.time <= 0) {
        clearInterval(that.data.timer);
        that.setData({
          // sendAndTime: '发送验证码',
          isSend: true
        });
      }
      wx.setStorageSync('time', that.data.time);
    }, 1000);
  },
  //填写电话
  iptPhone: function(e) {
    this.setData({
      phoneNum: e.detail.value
    });
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({
        time: 0,
        isSend: true
      });
      wx.setStorageSync('time', '');
    }
  },



  // 填写验证码
  iptCode: function(e) {
    this.setData({
      phoneCode: e.detail.value
    })
  },

  // 确认开通
  phoneLogin(e) {
    let that = this;
    if (this.data.phoneNum == '') {
      order.warn("请输入您的手机号")

    } else if (!(/^1[3456789]\d{9}$/.test(this.data.phoneNum))) {
      order.warn("请检查您填写的手机号格式是否正确")

    } else if (this.data.phoneCode == '') {
      order.warn("验证码不正确")

    } else if (this.data.phoneCode.length != 4) {
      order.warn("您输入的验证码位数不对哦")

    } else {
      var data = {
        userId: wx.getStorageInfoSync("userID"),
        mobile: that.data.phoneNum,
        smsCode: that.data.phoneCode,
      }
      app.req(this.data.boundPhoneurl, "POST", data).then(res => {
        if (res.status){
          console.log(res.status)
          order.success("绑定成功")
          this.data.userInfo.mobile = this.data.phoneNum
          this.setData({
            userInfo:this.data.userInfo,
            showModel:false
          })
        }else{
          console.log(res.status)
          console.log(345454)
        }
      })
    }
  }

})



