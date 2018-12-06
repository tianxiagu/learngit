var app = getApp();
let baseUrl = app.globalData.url;
import http from '../../util/https.js';
Page({
  data: {
    proList: [], //购物车商品数据列表
    page: 1, //下次请求页码
    isHasNext: true, //是否有下一页
    loading: false, //加载动画的显示


    isSelectAll: false, //全选
    totalPrice: "0.00", //总价
    delBtnWidth: 100, //删除按钮的宽度
    startX: "", //手指触摸开始滑动的位置
  },

  //获取购物车商品数据列表 数据
  getProListData() {
    if (!this.data.loading && this.data.isHasNext) {
      this.setData({
        loading: true, //加载动画的显示
      })
      http.gets({
        url: `${baseUrl}/trade/shoppcar/show/list`,
        data: {
          userId: 1,
          page: this.data.page,
          pageSize: 20
        },
        load: true
      }).then((res) => {
        res.entry = [{
            skuId: "1",
            status: true,
            skuNum: 5,
            itemTitle: "屋之宝 五斗柜简约现代五斗橱卧室储物柜六斗柜子客厅抽屉收纳柜",
            itemProperty: ["白色", "二次元", "中码"],
            price: 120,
            quantity: 1,
            mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2Pzb7X5qfF1Jjy0FcXXcLdFXa_!!1768813141.jpg_430x430q90.jpg",
            shopId: "1"
          },
          {
            skuId: "1",
            status: false,
            skuNum: 5,
            itemTitle: "口袋妖怪日月 NP306 mega 波士可多拉 可可多拉 短袖t恤 长袖卫衣",
            itemProperty: ["黑色", "熊猫版", "中码"],
            price: 68,
            quantity: 1,
            mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2MS1BXVXXXXaxXpXXXXXXXXXX_!!1768813141.jpg_430x430q90.jpg",
            shopId: "1"
          },
          {
            skuId: "1",
            status: true,
            skuNum: 5,
            itemTitle: "口袋妖怪日月 NP306 mega 波士可多拉 可可多拉 短袖t恤 长袖卫衣",
            itemProperty: ["黑色", "熊猫版", "中码"],
            price: 68,
            quantity: 1,
            mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2MS1BXVXXXXaxXpXXXXXXXXXX_!!1768813141.jpg_430x430q90.jpg",
            shopId: "1"
          },
          {
            skuId: "1",
            status: true,
            skuNum: 5,
            itemTitle: "口袋妖怪日月 NP306 mega 波士可多拉 可可多拉 短袖t恤 长袖卫衣",
            itemProperty: ["黑色", "熊猫版", "中码"],
            price: 68,
            quantity: 1,
            mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2MS1BXVXXXXaxXpXXXXXXXXXX_!!1768813141.jpg_430x430q90.jpg",
            shopId: "1"
          }, {
            skuId: "1",
            status: true,
            skuNum: 5,
            itemTitle: "口袋妖怪日月 NP306 mega 波士可多拉 可可多拉 短袖t恤 长袖卫衣",
            itemProperty: ["黑色", "熊猫版", "中码"],
            price: 68,
            quantity: 1,
            mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2MS1BXVXXXXaxXpXXXXXXXXXX_!!1768813141.jpg_430x430q90.jpg",
            shopId: "1"
          },
          {
            skuId: "1",
            status: false,
            skuNum: 5,
            itemTitle: "口袋妖怪日月 NP306 mega 波士可多拉 可可多拉 短袖t恤 长袖卫衣",
            itemProperty: ["黑色", "熊猫版", "中码"],
            price: 68,
            quantity: 1,
            mainImgUrl: "https://img.alicdn.com/imgextra/i2/1768813141/TB2Pzb7X5qfF1Jjy0FcXXcLdFXa_!!1768813141.jpg_430x430q90.jpg",
            shopId: "1"
          }
        ];
        res.isHasNext = true;
        let proList = this.data.proList;
        let entry = res.entry;
        if (entry && entry.length) {
          for (let i = 0; i < entry.length; i++) {
            if (entry[i].skuNum < entry[i].quantity) {
              entry[i].quantity = entry[i].skuNum
            }
            entry[i].is_selected = false; //是否被选中
            entry[i].left = ""; //left定位
          }
          proList = proList.concat(entry);
        }
        this.setData({
          loading: false, //加载动画的显示
          isHasNext: res.isHasNext, //是否有下一页
          page: this.data.page + 1, //下次请求页码
          proList: proList, //请求后数据
        });
      }).catch((err) => {
        this.setData({
          loading: false, //加载动画的显示
        })
      })
    }
  },

  //上滑加载更多
  onReachBottom: function() {
    this.getProListData();
  },

  onLoad: function(options) {
    this.getProListData();
    this.initEleWidth();
  },


  //商品增加
  increaseProNum(e) {
    let index = e.currentTarget.dataset.index;
    let proList = this.data.proList;
    if (proList[index].quantity < proList[index].skuNum) {
      app.req("http://192.168.1.199:3000/mock/33/trade/shoppcar/edit", "POST", "application/json", {
        userId: "",
        skuList: [{
          skuId: "",
          quantity: proList[index].quantity + 1,
          isChecked: 1,
        }]
      }).then((res) => {
        if (true) {
          proList[index].quantity += 1,
            this.setData({
              proList: proList
            });
          this.totalPrice();
        } else {

        }
      })
    } else {
      wx.showToast({
        title: '该商品还剩' + proList[index].skuNum + "件",
        icon: 'none'
      })
    }
  },



  //商品减少
  decreaseProNum(e) {
    let index = e.currentTarget.dataset.index;
    let proList = this.data.proList;
    if (proList[index].quantity > 1) {
      proList[index].quantity--;
    }
    this.setData({
      proList: proList
    });
    this.totalPrice();
  },

  //商品直接输入
  blurProNum(e) {
    let index = e.currentTarget.dataset.index;
    let proList = this.data.proList;
    let num = Math.floor(e.detail.value);
    if (num > proList[index].skuNum) {
      num = proList[index].skuNum
    }
    if (!num || num < 1) {
      proList[index].quantity = 1;
    } else {
      proList[index].quantity = num;
    }
    this.setData({
      proList: proList
    });
    this.totalPrice();
  },

  //计算总价
  totalPrice() {
    let totalPrice = 0;
    let proList = this.data.proList;
    for (let i = 0; i < proList.length; i++) {
      if (proList[i].is_selected && proList[i].status) {
        totalPrice += proList[i].quantity * proList[i].price
      };
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      totalPrice: totalPrice
    });
  },

  //选中结算商品
  selectPro(e) {
    let index = e.currentTarget.dataset.index;
    let proList = this.data.proList;
    proList[index].is_selected = true;
    this.setData({
      proList: proList
    });
    this.totalPrice();
  },

  //取消选中结算商品
  cancalPro(e) {
    let index = e.currentTarget.dataset.index;
    let proList = this.data.proList;
    proList[index].is_selected = false;
    this.setData({
      proList: proList,
      isSelectAll: false
    });
    this.totalPrice();
  },

  //全选商品
  selectAll() {
    let proList = this.data.proList;
    for (let i = 0; i < proList.length; i++) {
      proList[i].is_selected = true;
    }
    this.setData({
      proList: proList,
      isSelectAll: true
    });
    this.totalPrice();
  },

  //取消全选商品
  cancelSelectAll() {
    let proList = this.data.proList;
    for (let i = 0; i < proList.length; i++) {
      proList[i].is_selected = false;
    }
    this.setData({
      proList: proList,
      isSelectAll: false
    });
    this.totalPrice();
  },

  //点击删除按钮事件
  delItem: function(e) {
    //获取列表中要删除项的下标
    let index = e.currentTarget.dataset.index;
    let proList = this.data.proList;
    //移除列表中下标为index的项
    proList.splice(index, 1);
    this.setData({
      proList: proList
    });
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },

  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  // 开始滑动事件
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    // if (e.touches.length == 1) {
    //   //手指移动时水平方向位置 
    //   var moveX = e.touches[0].clientX;
    //   //手指起始点位置与移动期间的差值 
    //   var disX = this.data.startX - moveX;
    //   var delBtnWidth = this.data.delBtnWidth;
    //   // var txtStyle = "";
    //   if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变 
    //     // txtStyle = "left:0px";
    //   } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离 
    //     // txtStyle = "left:-" + disX + "px";
    //     if (disX >= delBtnWidth) {
    //       //控制手指移动距离最大值为删除按钮的宽度 
    //       // txtStyle = "left:-" + delBtnWidth + "px";
    //     }
    //   }
    // }
  },
  // 滑动中事件
  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项 
      var index = e.currentTarget.dataset.index;
      var proList = this.data.proList;
      proList[index].left = txtStyle;
      //更新列表的状态 
      this.setData({
        proList: proList
      });
    } else {
      console.log("2");
    }
  },
  //提交订单
  submit() {
    let proList = this.data.proList;
    let buyList = [];
    for (let i = 0; i < proList.length; i++) {
      if (proList[i].is_selected && proList[i].status) {
        buyList.push({
          buySkuId: proList[i].skuId,
          buyNum: proList[i].quantity
        })
      }
    }
    if (buyList.length) {
      wx.removeStorageSync('buyList');
      wx.setStorageSync("buyList", JSON.stringify(buyList));
      wx.navigateTo({
        url: '/pages/buy/index'
      })
    } else {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      })
    }
  }
})