let app = getApp();
import WxParse from '../../wxParse/wxParse';



Page({
  d: {
    hostUrl: 'h',
    hostImg: '',
    hostVideo: '',
    userId: 1,
    appId: "wxe00c724c4bf1bc40",
    appKey: "3d2b949e3da196d43384a1ec53b79e41",
    ceshiUrl: '',
  },
  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }, {
      mode: 'aspectFit',
      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    }],
    images: [],
    tags: [{
      "id": 1,
      "name": "标签一"
    }, {
      "id": 2,
      "name": "标签二"
    }],
    "currentItem": 0,
    goodsList: [
      {
        icon: '/images/goods.png',
        arrow: '/images/arrow.png',
        storeName: '官方旗舰店',
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
        count: 1,
        reason: '商品质量问题',
        status: '待审核',
        btnType: 0, //0查看详情、1、去退货
      },
      {
        icon: '/images/goods.png',
        arrow: '/images/arrow.png',
        storeName: '官方旗舰店',
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
        count: 1,
        reason: '商品质量问题',
        status: '待审核',
        btnType: 0, //0查看详情、1、去退货
      },
      {
        icon: '/images/goods.png',
        arrow: '/images/arrow.png',
        storeName: '官方旗舰店',
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
        count: 1,
        reason: '商品质量问题',
        status: '待退货',
        btnType: 1, //0查看详情、1、去退货
      },
      {
        icon: '/images/goods.png',
        arrow: '/images/arrow.png',
        storeName: '官方旗舰店',
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
        count: 1,
        reason: '商品质量问题',
        status: '售后失败',
        btnType: 2, //0查看详情、1、去退货 2、售后失败
      },
      {
        icon: '/images/goods.png',
        arrow: '/images/arrow.png',
        storeName: '官方旗舰店',
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
        count: 1,
        reason: '商品质量问题',
        status: '售后成功',
        btnType: 3, //0查看详情、1、去退货 2、售后失败 3、售后成功
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.login();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // getData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getPhoneNumber: function(e) {
    console.log('e', e);
  },
  login: function() {
    wx.login({
      success: function(res) {
        console.log('loginCode:', res.code)
      }
    });
  },
  tagChoose: function(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      "currentItem": id
    })
    console.log('this：', this);
  },
  /**
   * 得到用户信息
   */
  getUserInfo: function(cb) {
    var that = this
    if (this.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function(res) {
          var code = res.code;
          //get wx user simple info
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.userInfo);
              //get user sessionKey
              //get sessionKey
              that.getUserSessionKey(code);
            }
          });
        }
      });
    }
  },
  getUserSessionKey: function() {
    wx.request({
      url: that.d.ceshiUrl + '/Api/Login/getsessionkey',
      method: 'post',
      data: {
        code: code
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //--init data        
        var data = res.data;
        if (data.status == 0) {
          wx.showToast({
            title: data.err,
            duration: 2000
          });
          return false;
        }

        that.globalData.userInfo['sessionId'] = data.session_key;
        that.globalData.userInfo['openid'] = data.openid;
        that.onLoginUser();
      },
      fail: function(e) {
        wx.showToast({
          title: '网络异常！err:getsessionkeys',
          duration: 2000
        });
      },
    });
  },
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
  removeImage(e) {
    let that = this;
    let imgs = that.data.images;
    const idx = e.target.dataset.idx;
    let tempArr = imgs.splice(idx, 1);
    that.setData({
      images: imgs
    });
  },
  getData() {
    let url = 'http://192.168.1.199:3000/mock/33/trade/user/refundOrder/list';
    wx.request({
      url: url,
      success: function(res) {
        console.log('res：', res);
      } 
    })
  },
  /**
   * 保存图片到本地相册
   */
  saveImageToLocal() {
    wx.downloadFile({
      url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3944680232,2054173354&fm=27&gp=0.jpg', //仅为示例，并非真实的资源
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(dres) {
            console.log('oopp', dres);
          }
        })
      }
    })
  },
  getPhotosAuth() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功');
            }
          })
        }
      }
    })
  }
})