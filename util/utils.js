const warn= function (msg) {
  wx.showToast({
    title: msg,
    icon: "none",
    mask: true
  })
}
const success=function (msg) {
  wx.showToast({
    title: msg,
  })
}
const loading=function(msg){
  wx.showLoading({
    title: msg,
  })
}
const showmodel=function(title, msg){
  wx.showModal({
    title: title,
    content: msg,
    showCancel: false
  })
}
const showloading=function(){
  wx.showLoading({
    title: '加载中',
    mask:true
  })
}
const hideloading=function(){
  wx.hideLoading();
}
  module.exports = {
    warn,
    success,
    showmodel,
    loading,
    showloading,
    hideloading,
    loading
  }