import request  from '@/utils/request';

//会员中心(信息)
export function getMemberInfo(params) {
  console.log('ddf', params);
  return request(`/trade/seller/member/get`,{
    method: 'GET',   
    data: params
  });
}

//个人中心(信息)
export function getPersonalInfo(params) {
  return request(`/trade/seller/userInfo/get`,{
    method: 'GET',   
    data: params
  });
}
//会员续费升级
export function upgradeMember(data) {
  return request('/usercenter/member/upgrade', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json; charset=utf-8'
    // },
    body: JSON.stringify(data)
  });
}

//我的店铺信息修改(店铺描述、店铺名称)
export function shopInfoModify(data) {
  return request('/trade/seller/shopInfo/update', {
    method: 'POST',    
    body: JSON.stringify(data)
  });
}

//账户明细
export function accountDetail(params) {
  return request('/trade/seller/accountDetail/list', {
    method: 'GET',
    data: params
  })
}

//订单收益
export function getOrderProfit(params) {
  return request('/trade/seller/bizOrder/profit/get', {
    method: 'GET',    
    data: params
  })
}



//我的店铺订单
export function getOrderList(params) {
  return request('/trade/seller/bizOrder/list', {
    method: 'GET',
    data: params
  });
}

//添加银行卡
export function addBankCard(data) {
  return request('/usercenter/withdraw/bankCard/binding', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

//用户添加的银行卡列表
export function getBankList(data) {
  return request('/usercenter/withdraw/binding/bank/list', {
    method: 'GET',
    data: {}
  })
}

//获取所有(第三方)银行卡列表(提现)
export function getAllBankList() {
  return request('/usercenter/withdraw/bank/list', {
    method: 'GET',
    data: {}
  })
}

//最多可提现余额
export function getBalanceAmount(params) {
  return request('/usercenter/withdraw/amount', {
    method: 'GET',
    data: params
  })
}

//发送验证码
export function sendMobileCode(data) {
  return request('/usercenter/smsCode/get', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

//手机+验证码登陆
export function userLogin(data) {
  return request('/usercenter/login/do', {
    method: 'POST',    
    body: JSON.stringify(data)
  });
}


//我的粉丝列表
export function myfans(data) {
    return request('/trade/seller/fans/list', {
        method: 'GET',
        data:data
        // body: JSON.string ify(values)
    });
}
//我的粉丝总数
export function myfanstotal(data) {
    return request('/trade/seller/fans/count/get', {
        method: 'GET',
        data:data
        // body: JSON.string ify(values)
    });
}
//我的会员
export function mymember(data) {
    return request('/trade/seller/shop/member/list', {
        method: 'GET',
        data:data
        // body: JSON.string ify(values)
    });
}
//我的团队
export function myteam(data) {
    return request('/trade/seller/team/list', {
        method: 'GET',
        data:data
        // body: JSON.string ify(values)
    });
}
// //我的个人信息
// export function myuserInfo(data) {
//     return request('/trade/seller/userInfo/get', {
//         method: 'GET',
//         data:data
//         // body: JSON.string ify(values)
//     });
// }
//我的邀请码
export function myinvite(data) {
    return request('/trade/seller/inviteCode/list', {
        method: 'GET',
        data:data
        // body: JSON.string ify(values)
    });
}
// 我的订单
export function myOrder(params){
  return request('/trade/seller/bizOrder/list',{
      method:'GET',
      data:params
  });
}

// 今日销量-我的今日销量统计
export function todaySales(params){
  return request('/trade/seller/salesStatistics/get',{
    method:'GET',
    data:params
  })
}
// 今日销量-我销售的商品
export function todaySalesGoods(params){
  return request('/trade/seller/salesItem/list',{
     method:'GET',
     data:params
  })
}

// 账户明细
export function account(params){
  return request('/trade/seller/accountDetail/list',{
    method:'GET',
    data:params
  })
}

// 订单收益
export function earnings(params){
  return request('/trade/seller/bizOrder/profit/get',{
    method:'GET',
    data:params
  })
}

