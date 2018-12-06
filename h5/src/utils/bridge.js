import {bridge} from '@/utils/jsBridge';

var bridgeUtil = {      
    call(fac, params) {
        try {
            if(!bridge) return;
            params ? bridge.call(`${fac}`, params) : bridge.call(`${fac}`)
        }catch(e) {
            console.log('接口异常，稍后再试~');
        }
    },
    /**
     * 
     * @param {*} fac 
     * @param {*} params 
     * @param {*} cb 
     * @desc {*} 异步调用方法
     */
    callAsync(fac, params, cb){
        try{
            if(!bridge) return;
            params ? bridge.call(`${fac}`, params, cb) : bridge.call(`${fac}`, cb)            
        }catch(e) {
            console.log('接口异常，稍后再试~');
        }
    },
    /**
     * @param {obj} params 
     * @description 存储对象到缓存同步
     */
    saveStorage(params) {
        this.call('saveStorage', params);
    },
    /**
     * @param {obj} params key
     * @param {func} cb callback
     * @description 存储对象到缓存异步
     */
    saveStorageAsync(params, cb) {
        this.callAsync('saveStorage', params, cb);
    },
    /**
     * @param {obj} params key
     * @description 从native缓存中取数据同步
     */
    getStorage(params) {
        this.call('getStorage', params);
    },
    /**
     * @param {obj} params key
     * @param {func} cb callback
     * @description 从native缓存中取数据异步
     */
    getStorageAsync(params, cb) {
        this.callAsync('getStorage', params, cb);
    },

    /**
     * @param {obj} params key
     * @description 删除缓存同步
     */
    deleteStorage(params) {
        this.call('deleteStorage', params);
    },

    /**
     * @param {obj} params key(缓存key)
     * @param {func} cb callback
     * @description 删除缓存异步
     */
    deleteStorageAsync(params, cb) {
        this.callAsync('deleteStorage', params, cb);
    },
   
    /**
     * @param {obj} params needCrop[boolean](是否裁剪)
     * @param {func} cb callback
     * @description 打开系统相册选择图片     
     */
    openImagePickerAsync(params, cb) {
        this.callAsync('openImagePicker', params, cb);
    },

    /**
     * @param {obj} url(push页面的url) 
     * @param {func} cb callback
     * @description 推送一个新界面到当前页面 异步 
     */
    navigationPushAsync(params, cb) {
        this.callAsync('navigationPush', params, cb);
    },
    /**     
     * @param 无参数 null
     * @param {*} cb callback
     * @description 导航回退
     */
    navigationPopAsync(cb) {
        this.callAsync('navigationPop', null, cb);
    },
    /**
     * @param {obj} params url(modal界面url)
     * @description 显示一个modal页面
     */
    navigationShowModal(params) {
        this.call('navigationShowModal', params);
    },
    /**
     * @param 无参数 null
     * @param cb: callback
     * @description 关闭当前Modal页面 异步
     */
    navigationDismissModalAsync(cb) {
        this.callAsync('navigationDismissModal', null, cb);
    },
    /**
     * @param null
     * @description 获取缓存大小
     */
    getCacheSize() {
        this.call('getCacheSize', null);
    },
    /**
     * @param null
     * @description 清除缓存
     */
    clearCache() {
        this.call('getCacheSize', null);
    },
    /**
     * @param null
     * @description 显示loading
     */
    showLoading() {
        this.call('showLoading', null);
    },
    /**
     * @param null
     * @description 隐藏loading
     */
    hideLoading() {
        this.call('hideLoading', null);
    },
    /**
     * @param null
     * @description 设置显示导航栏
     */
    showNavigationeBar() {
        this.call('showNavigationeBar', null);
    },
    /**
     * @param null
     * @description 设置隐藏导航栏
     */
    hideNavigationeBar() {
        this.call('hideNavigationeBar', null);
    },
    /**
     * @param {obj} params text(标题)、textSize(标题尺寸)、textColor(颜色hex值)、iconName(图标)、iconColor(图标颜色Hex值)
     * @description 设置titleBar左边按钮样式、功能
     */
    setTitleBarLeft(params) {
        this.call('setTitleBarLeft', params);
    },
    setTitleBarMiddle(params) {
        this.call('setTitleBarMiddle', params);
    },
    setTitleBarRight(params) {
        this.call('setTitleBarRight', params);
    },
    /**
     * @param null
     * @description 开始下拉刷新动画
     */
    pullRefreshStart() {
        this.call('pullRefreshStart', null);
    },
    /**
     * @param null
     * @description 结束下拉刷新动画
     */
    pullRefreshFinish() {
        this.call('pullRefreshFinish', null);
    },
    /**     
     * @param {obj} params text(文案)、duration(文案显示多久)
     * @description 显示一个成功的HUD，默认1.5秒后自动消失
     */
    showSuccessHUD(params) {
        this.call('showSuccessHUD', params);
    },    
    showErrorHUD(params) {
        this.call('showErrorHUD', params)
    },
    /**
     * @param null
     * @description 显示网络出错页面
     */
    netWorkError() {
        this.call('netWorkError', null)
    }
};

export default bridgeUtil;