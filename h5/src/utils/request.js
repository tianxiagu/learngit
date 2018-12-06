import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default async function request(url, options) {
  let paramsArray = [];
  if(options.method === 'GET') {
    Object.keys(options.data).forEach(key=>{
      paramsArray.push(key +'='+ (options.data)[key]);
    })
    
    if(url.search(/\?/) === -1) {
      url += '?'+ paramsArray.join('&');
    }else{
      url += '&'+ paramsArray.join('&');
    }
  }

  let response = await fetch(url, options);  
  checkStatus(response);
  const data = await response.json();  
  return data;
 }


