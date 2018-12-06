App({
  onLaunch(option) {
    if (option.goodsId){
      wx.setStorageSync("goodsId", option.goodsId)
    }
    wx.setStorageSync("shopId", option.shopId)
    if (wx.getStorageSync('userinfo')) {
      
    } else {
      console.log(4566)
      wx.redirectTo({
        url: './pages/authorized/index',
      })
      this.login()
    }
  },
  showMsg:function(msg){
    wx.showToast({
      title:msg,
      icon:'none'
    })
  },
  // 倒计时
  countDown:function(time){
    let t=time-(Date.parse(new Date())/1000);
    let day=Math.floor(t/86400)<=9?('0'+Math.floor(t/86400)):Math.floor(t/86400); //天
    let hour=Math.floor(t%86400/3600)<=9?('0'+Math.floor(t%86400/3600)):Math.floor(t%86400/3600); //时
    let min=Math.floor(t%86400%3600/60)<=9?('0'+Math.floor(t%86400%3600/60)):Math.floor(t%86400%3600/60); //分
    let sec=t%60<=9?('0'+t%60):t%60; //秒    
    return {
      day,
      hour,
      min,
      sec
    }
  },
  req(url, method, contentType ='application/json', data) {
    var promise = new Promise(function(resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: method,
        header:{
          'content-type': contentType['content-type']?'application/x-www-form-urlencoded':'application/json',
          'duozheng_client': 3
        },
        success: function success(res) {
          resolve(res.data);
        },
        fail: function fail(res) {
          reject('网络错误');
        }
      });
    });
    return promise;
  },
  login(back) {
    wx.login({
      success: res => {
        this.globalData.code=res.code
        console.log(this.globalData.code)
      }
    })
  },
  globalData:{
    url:'http://192.168.1.199:3000/mock/33',
    baseUrl:'http://192.168.1.199:3000/mock/28',
    contentType:{ 'content-type': 'application/x-www-form-urlencoded','duozheng_client':3 },
    code:""
  }
})