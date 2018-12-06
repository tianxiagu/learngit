import { hex_md5 } from "./md5"

// 这里对小程序内的url请求做了简单的封装，参数与微信官方wx.request基本相同，调用方式略微简化
// 主要增加了两个功能
// 1. 对参数自动进行加签(逻辑看generateSN函数）
// 2. url参数在没写完整路径的情况下，会自动拼接域名(逻辑参考addHttpPrefixToUrl函数)

const REQ_METHOS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

let http = {}

http.get = (dict) => {
  dict.method = REQ_METHOS.GET
  http_request(dict)
}

http.post = (dict) => {
  dict.method = REQ_METHOS.POST
  http_request(dict)
}

function http_request(dict) {
  let url = addHttpPrefixToUrl(dict.url)
  let method = dict.method || REQ_METHOS.GET
  let header = dict.header || {'content-type': 'application/json'} //默认设置为json
  let data = dict.data 
  let sn = generateSN(data)
  console.log(data)
  console.log(sn)
  data.sn = sn

  wx.request({
    url: url,
    data: data,
    header: header,
    method: method,
    dataType: dict.dataType,
    responseType: dict.responseType,
    success: dict.success,
    fail: dict.fail,
    complete: dict.complete
  })
}

function generateSN(data) {
  var keys = Object.keys(data);
  var sn = "";
  keys.sort().forEach(function(key) {
    sn += key;
    sn += '=';
    // sn += encodeURIComponent(data[key]);
    sn += data[key];
    sn += '&'
  });
  sn += `timestamp=${new Date().getTime()}`;
  console.log(sn);
  sn = hex_md5(sn);
  return sn
}

function addHttpPrefixToUrl(url) {
  if (url.indexOf('http') < 0) {
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    url = getApp().globalData.url + url;
  }
  return url;
}

module.exports = {
  http: http,
  http_request: http_request
}
