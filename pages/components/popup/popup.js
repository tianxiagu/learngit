// components/ck-popup/ck-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    downing: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //阻止冒泡
    stopBubble() {},
    //隐藏弹窗
    hidePopup() {
      this.setData({
        downing: true
      });
      setTimeout(() => {
        this.setData({
          downing: false
        });
        this.triggerEvent("cancelEvent");
      }, 300)
    },
  }
})