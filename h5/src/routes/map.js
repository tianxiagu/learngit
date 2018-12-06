import React from 'react';
import { connect } from 'dva';
import styles from './map.css';
import {bridge} from '../utils/jsBridge';

function setTitle() {

    // objectHash.setTitleBarMiddle(data, func)
    try{
      if(!bridge) return; 
      bridge.call('setTitleBarMiddle', {text: '会员中心', textSize: 14})
      // bridge.call('openImagePicker', {needCrop: true }, function(v){
      //   alert(v);
      // });
      // bridge.call('setTitleBarMiddle', {text: '会员中心', textSize: 14}, function(v){
      //   alert(v);
      // });
    }catch(e) {
      console.log('接口异常', e);
    }  

}
function MapPage() {
  setTitle();
  return (
    <div className={styles.mapPage}>
      <ul>
          <li><a href="/member">会员中心</a></li>
          <li><a href="/personal">个人中心</a></li>
          <li><a href="/shopintro">权益介绍</a></li>
          <li><a href="/upgrade">升级权益</a></li>
          <li><a href="/myorder">我的订单</a></li>
          <li><a href="/todaysales">今日销量</a></li>
          <li><a href="/setting">设置</a></li>
          <li><a href="/account">账户明细</a></li>
          <li><a href="/earnings">订单收益</a></li>
          <li><a href="/cashwithdrawal">提现</a></li>
          <li><a href="/addcard">添加银行卡</a></li>
          <li><a href="/cashverifica">提现验证</a></li>
          <li><a href="/modifynick">修改昵称</a></li>
          <li><a href="/storerevision">修改店铺简介</a></li>
          <li><a href="/fans">我的粉丝</a></li>
          <li><a href="/mymember">我的店铺会员</a></li>
          <li><a href="/myteam">我的团队</a></li>
          <li><a href="/invite">邀请码</a></li>
      </ul>   
    </div>
  );
}

MapPage.propTypes = {
};

export default connect()(MapPage);