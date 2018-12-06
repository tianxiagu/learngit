import { hex_md5 } from "./md5";
import { warn, showloading, hideloading } from './utils.js';

let app = getApp();
const DEFAULT = {
  GET: "GET",
  POST: "POST",
  PUT: 'PUT',
  DELETE: 'DELETE'
};
class http {
  post = (params) => {
    params.method = DEFAULT.POST;
    return this.http_request(params);
  }
  gets = (params) => {
    params.method = DEFAULT.GET;
    return this.http_request(params);
  }
  generateSN = (data) => {
    // let datas=Object.assign(data,{timestamp:new Date().getTime()}); 
    let keys = Object.keys(data);
    let sn = "";
    console.log('data：', data);
    // console.log('keys：', keys);
    keys.sort().forEach(function (key) {
      sn += key;      
      sn += '=';
      sn += data[key];
      sn += '&'
    });
    sn += `timestamp=${new Date().getTime()}`;
    sn = hex_md5(sn);
    return sn
  }
  http_request = (params) => {
    // 判断参数中type参数是否存在，如果存在则显示wx.showLoading，不存在则不显示wx.showLoading
    if (params.load !== undefined) {
      showloading();
    }
    // 判断传的url参数是否带有http如果有的话则为第一个三元运算符的表达式，否则没有
    let url = params.url.indexOf('http')>-1?`${params.url}`:`${app.globalData.url}${params.url}`
    let method = params.method || REQ_METHOS.GET
    let header = params.header || { 'content-type': 'application/json', 'duozheng_client': 3 } //默认设置为json
    let data = params.data
    let sn = this.generateSN(data)
    data.sn = sn
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: method,
        header: header,
        success: (res) => {
          if (params.load !== undefined) {
            hideloading();
          }
          if(res.data.responseCode===0){
            resolve(res.data);
          }else if(res.data.responseCode===0){
            wx.navigateTo({
              url: '../authorized/index'
            })
          } 
        },
        fail: res => {
          if (params.load !== undefined) {
            hideloading();
          }
          warn('网络错误');
        }
      })
    })
  }
};

export default new http();

