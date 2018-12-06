// pages/detail/detail.js
let app = getApp();
Page({
  data: {
    itemId: "", //商品id
    status: 5, //在售中
    swiperImgs: [], //轮播循环图
    swiperImgStyle: [], //轮播循环图样式
    proObj: {}, //商品详情页数据对象
    remainTime: 0, //倒计时剩余时间
    countDownobj: {}, //倒计时时间对象
    textImgs: [], //图文详情图
    skus: [], //商品sku列表
    skuids: [], //商品skuid列表
    showPrice: "1.00", //弹框中展示价格
    showShareBtn: false, //是否显示分享按钮弹出框
    showShareCicle: false, //是否显示分享朋友圈弹出框
    hasAuthSaveImage: true, //是否授权过保存图片
    showSku: false, //是否显示sku弹出框
    selectSku: [], //选中的sku
    skuType: 0, //购物车1;立即购买2;
    buyNum: 1, //购买数量
    selectSkuid: "", //选中skuid
  },

  //数据监听
  watch: {

  },

  //设置监听器
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },

  //监听属性 并执行监听函数
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function() {
        return val;
      }
    })
  },

  //轮播图片宽度/高度监听
  imageLoad: function(e) {
    let $width = e.detail.width; //获取图片真实宽度
    let $height = e.detail.height; //获取图片真实高度
    let width = $width * 720 / $height; //图片的真实宽高比例
    let swiperImgStyle = this.data.swiperImgStyle;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    swiperImgStyle[e.target.dataset.index] = width;
    this.setData({
      swiperImgStyle: swiperImgStyle
    })
  },

  //预览轮播图片
  prevImage(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.item, // 当前显示图片的http链接
      urls: this.data.swiperImgs // 需要预览的图片http链接列表
    })
  },

  //倒计时
  downtime() {
    setInterval(() => {
      let t = this.data.remainTime;
      if(t<0){
        this.setData({
          status:6
        })
      }
      let day = Math.floor(t / 86400) <= 9 ? ('0' + Math.floor(t / 86400)) : Math.floor(t / 86400); //天
      let hour = Math.floor(t % 86400 / 3600) <= 9 ? ('0' + Math.floor(t % 86400 / 3600)) : Math.floor(t % 86400 / 3600); //时
      let min = Math.floor(t % 86400 % 3600 / 60) <= 9 ? ('0' + Math.floor(t % 86400 % 3600 / 60)) : Math.floor(t % 86400 % 3600 / 60); //分
      let sec = t % 60 <= 9 ? ('0' + t % 60) : t % 60; //秒
      this.setData({
        countDownobj: {
          day,
          hour,
          min,
          sec
        },
        remainTime: this.data.remainTime - 1
      })
    }, 1000)
  },

  //分享按钮弹出框取消
  shareBtnCancel() {
    this.setData({
      showShareBtn: false
    })
  },

  //分享按钮弹出框弹出
  shareBtnShow() {
    this.setData({
      showShareBtn: true
    })
  },

  //分享给朋友
  onShareAppMessage: function() {
    return {
      title: '商品详情页分享文案',
      path: '/pages/detail/index',
      imageUrl: ''
    }
  },

  //分享朋友圈弹出框取消
  shareCicleCancel() {
    this.setData({
      showShareCicle: false
    })
  },

  //分享朋友圈弹出框弹出
  shareCicleShow() {
    this.setData({
      showShareCicle: true,
      showShareBtn: false
    })
  },

  //分享保存图片 朋友圈到相册
  saveimage() {
    wx.getImageInfo({
      src: 'http://g.hiphotos.baidu.com/image/pic/item/42166d224f4a20a4f8e466989d529822730ed0f3.jpg',
      success: (responce) => {
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.writePhotosAlbum'] === false) {
              this.setData({
                hasAuthSaveImage: false
              })
            } else {
              wx.saveImageToPhotosAlbum({
                filePath: responce.path,
                success: (result) => {
                  console.log(result)
                },
                fail: (err) => {
                  if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                    this.setData({
                      hasAuthSaveImage: false
                    })
                  }
                  console.log(err);
                }
              })
            }
          },
          fail: (err) => {
            console.log(err);
          }
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  //sku弹出框取消
  skuCancel() {
    this.setData({
      showSku: false
    })
  },

  //sku弹出框弹出
  skuShow(e) {
    let skuType = e.currentTarget.dataset.type;
    this.setData({
      showSku: true,
      skuType: skuType
    })
  },

  //购买数量增加
  increaseNum() {
    var buyNum = this.data.buyNum;
    this.setData({
      buyNum: buyNum + 1
    });
  },

  //购买数量减少
  decreaseNum() {
    var buyNum = this.data.buyNum;
    if (buyNum > 1) {
      buyNum--;
    }
    this.setData({
      buyNum: buyNum
    });
  },

  //购买数量输入
  blurNum(e) {
    var buyNum = Math.floor(e.detail.value);
    if (!buyNum || buyNum < 1) {
      buyNum = 1;
    }
    this.setData({
      buyNum: buyNum
    });
  },

  //选择属性
  selectProp(e) {
    let skus = this.data.skus; //sku属性列表
    let skuids = this.data.skuids; //skuid列表
    let selectSku = this.data.selectSku; //已选择的sku属性值
    let nowIndex = e.currentTarget.dataset.index; //当前点选的第几组属性
    let nowValue = e.detail.value; //当前点选的属性value
    selectSku[nowIndex] = nowValue;
    for (let i = 0; i < skus.length; i++) {
      skus[i].styleValue = [];
    }
    for (let num = 0; num < selectSku.length; num++) {
      if (selectSku[num]) {
        let propsName = skus[num].propName;
        let propsKeyValue = propsName + ":" + selectSku[num];
        let propsValues = skus[num].propValues;
        let ableSelect = [];
        for (let i = 0; i < skuids.length; i++) {
          if (skuids[i].skuidvalue.indexOf(propsKeyValue) > -1) {
            ableSelect = ableSelect.concat(skuids[i].skuidvalue)
          }
        }
        ableSelect = [...new Set(ableSelect)];
        for (let i = 0; i < propsValues.length; i++) {
          let keyValue = propsName + ":" + propsValues[i];
          let testIndex = ableSelect.indexOf(keyValue);
          if (testIndex > -1) {
            ableSelect.splice(testIndex, 1);
          }
        }
        for (let i = 0; i < skus.length; i++) {
          if (i !== num) {
            let listValues = skus[i].propValues;
            let listname = skus[i].propName;
            for (let j = 0; j < listValues.length; j++) {
              let listKeyValue = listname + ":" + listValues[j];
              if (ableSelect.indexOf(listKeyValue) === -1) {
                skus[i].styleValue[j] = true;
              }
            }
          }
        }
      }
    }
    this.setData({
      selectSku: selectSku,
      skus: skus
    });
    this.selectSku(selectSku);
  },

  //选择属性-监听价格区间
  selectSku: function(newValue) {
    let skus = this.data.skus;
    let skuids = this.data.skuids;
    let listKeyValue = [];
    for (let i = 0; i < newValue.length; i++) {
      if (newValue[i]) {
        listKeyValue.push(skus[i].propName + ":" + newValue[i]);
      }
    }
    let str = listKeyValue.sort().join(";");
    let priceValue = [];
    for (let i = 0; i < skuids.length; i++) {
      let str2 = skuids[i].skuidvalue.sort().join(";")
      if (str2.indexOf(str) !== -1) {
        priceValue.push(skuids[i].price)
      }
    }
    priceValue.sort((a, b) => {
      return a - b;
    })
    if (priceValue.length > 1) {
      this.setData({
        showPrice: priceValue[0] + "-" + priceValue[priceValue.length - 1]
      });
    } else if (priceValue.length == 1) {
      this.setData({
        showPrice: priceValue[0]
      });
    }
  },

  // 立即购买 加入购物车
  submitSku: function() {
    let skus = this.data.skus;
    let skuids = this.data.skuids;
    let selectSku = this.data.selectSku;
    let buyNum = this.data.buyNum;
    let selectSkuValue = [];
    for (let i = 0; i < skus.length; i++) {
      if (!selectSku[i]) {
        wx.showToast({
          title: "请选择" + skus[i].propName,
          icon: "none"
        });
        return;
      } else {
        selectSkuValue.push(skus[i].propName + ":" + selectSku[i])
      }
    }
    let str = selectSkuValue.sort().join(";");
    let selectSkuid = "";
    for (let i = 0; i < skuids.length; i++) {
      if (skuids[i].skuidvalue.sort().join(";") === str) {
        selectSkuid = skuids[i].skuid;
        if (skuids[i].quantity < buyNum) {
          wx.showToast({
            title: "库存不足" + "，还剩" + skuids[i].quantity + "件",
            icon: "none"
          });
          return;
        }
      }
    }

    console.log(selectSkuid);
    console.log(buyNum);

    if (this.data.skuType === '1') { //购物车
      app.req('http://192.168.1.199:3000/mock/33/itemcenter/shopp/cart/add', 'POST', 'application/json', {
          userId: "",
          skuList: [{
            skuId: selectSkuid,
            quantity: this.data.buyNum,
            isChecked: 0
          }]
        })
        .then((res) => {
          if (true) { //加入购物车成功
            wx.switchTab({
              url: '/pages/cart/index'
            })
          }
        })
    } else { //立即购买
      wx.removeStorageSync('buyList');
      wx.setStorageSync("buyList", JSON.stringify([{
        buySkuId: selectSkuid,
        buyNum: buyNum
      }]));
      wx.navigateTo({
        url: '/pages/buy/index'
      })
    }
  },

  onShow: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.writePhotosAlbum"] === false) {
          this.setData({
            hasAuthSaveImage: false
          });
        } else {
          this.setData({
            hasAuthSaveImage: true
          });
        }
      }
    })
  },

  onLoad: function(options) {
    // this.setWatcher(this.data, this.watch); // 设置监听器
    let itemId = this.data.itemId || 1;
    this.getProInfo(itemId);
    this.getProSku(itemId);
  },

  //获取产品详情info数据
  getProInfo(itemId) {
    app.req(`http://192.168.1.199:3000/mock/33/itemcenter/item/detail/get?itemId=${itemId}`, 'GET')
      .then((res) => {
        const resData = {
          "itemTitle": "冰箱",
          "price": "6789.10",
          "tagPrice": "34",
          "notesImgUrl": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg,http://pic.58pic.com/58pic/12/96/82/24U58PIC2kj.jpg",
          "showImgUrls": "http://pic.58pic.com/58pic/11/68/32/08658PICred.jpg,http://g.hiphotos.baidu.com/image/pic/item/42166d224f4a20a4f8e466989d529822730ed0f3.jpg",
          "specImgUrls": "http://wx4.sinaimg.cn/large/a1b61d0aly1fn2h3xwat6j20dw0dwtbp.jpg,http://g.hiphotos.baidu.com/image/pic/item/42166d224f4a20a4f8e466989d529822730ed0f3.jpg",
          "remainTime": 9,
          "itemId": "1"
        }
        let showImgUrls = resData.showImgUrls.split(",");
        let specImgUrls = resData.specImgUrls.split(",");
        let notesImgUrl = resData.notesImgUrl.split(",");
        this.setData({
          swiperImgs: showImgUrls.concat(specImgUrls),
          textImgs: showImgUrls.concat(specImgUrls, notesImgUrl),
          remainTime: resData.remainTime,
          showPrice: resData.price,
          proObj: resData
        });
        this.downtime();
        wx.setNavigationBarTitle({
          title: "店铺名称"
        })
      })
  },

  //获取sku信息
  getProSku(itemId) {
    app.req(`http://192.168.1.199:3000/mock/33/itemcenter/item/skuInfo/get?itemId=${itemId}`, 'GET')
      .then((res) => {
        const resData = {
          skus: [{
              propValues: ["黑色", "白色", "黄色"],
              styleValue: [],
              propName: "颜色"
            },
            {
              propValues: ["m", "l", "xl", "xxl"],
              styleValue: [],
              propName: "尺码"
            }
          ],
          skuids: [{
              skuid: "121312",
              skuidvalue: ["颜色:黑色", "尺码:m"],
              price: "18.45",
              quantity: 12
            },
            {
              skuid: "121313",
              skuidvalue: ["颜色:黑色", "尺码:xxl"],
              price: "12.45",
              quantity: 3
            },
            {
              skuid: "121314",
              skuidvalue: ["颜色:白色", "尺码:xxl"],
              price: "133.45",
              quantity: 9
            }
          ]
        }
        this.setData({
          skus: resData.skus,
          skuids: resData.skuids
        });
      })
  }

})