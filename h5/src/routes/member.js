import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './member.css';

import bridge from '@/utils/bridge';
import {getMemberInfo} from '@/services/api';

class MemberPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      avatar: '',
      nickName: '',
      vipStatus: 1, //1、普通 2、95VIP
      price: 0,
      expTime: '',
      userId: 1
    }
  }

  componentDidMount() {
    let self = this;
    self.setTitle();
    self.getMemberInfo();
  }
  setTitle() {
    bridge.setTitleBarMiddle({text: '会员中心', textSize: 14});
  }
  getMemberInfo() {
    let self = this;
    let params = {
      userId: self.state.userId
    };
    console.log('11111');
    getMemberInfo(params).then((res)=> {
      let resData = res.entry;
      if(res.responseCode !== 0) {
        // return;
      }
      self.setState({
        avatar: resData.wxHeadimgUrl,
        nickName: resData.wxNickName,
        price: resData.vipMemberCommission,
        expTime: resData.vipExpireDate,
        vipStatus: resData.memberLevel
      })

    }).catch((err) => {
      console.log('网络异常，请稍后再试~');
    })
  }
  goToUpgrade() {
    console.log('升级页面');
  }
 
  render() {
    let self = this;
    let vipStatus = self.state.vipStatus;
    let avatar = self.state.avatar;
    let nickName = self.state.nickName;
    let price = self.state.price;
    return (
      <div className={styles.normal}>
      

      <div className={vipStatus === 1 ? styles.cardVip : styles.cardArea}>
        <div className={styles.card}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <img className={styles.avatar} src={avatar} />
              <span className={styles.userName}>{nickName}</span>
            </div>
            <span className={styles.upgradeBtn} onClick={()=>self.goToUpgrade()}>立即升级</span>
          </div>
          <p className={styles.note}>正友们升级后平均每天多挣￥{price}</p>
        </div>
      </div>

      <div className={styles.right95}>
        <p className={styles.title}><em className={styles.splitIcon}></em>95VIP会员权益</p>
        <ul className={styles.numUl}>
           <li className={styles.numLi}><img src={require('../assets/1_vip_icon.png')} /> 专属店铺</li>
           <li className={styles.numLi}><img src={require('../assets/2_vip_icon.png')} /> 转商品差价</li>
           <li className={styles.numLi}><img src={require('../assets/3_vip_icon.png')} /> 进货价95折</li>         
         </ul>
         <ul className={styles.numUl}>
           <li className={styles.numLi}><img src={require('../assets/4_vip_icon.png')} /> 锁粉</li>
           <li className={styles.numLi}><img src={require('../assets/5_vip_icon.png')} /> 邀请VIP赚奖励</li>
           <li className={styles.numLi}><img src={require('../assets/6_vip_icon.png')} /> VIP专属奖品</li>
         </ul>
      </div>
 
      <div className={styles.right95}>
        <p className={styles.title}><em className={styles.splitIcon}></em>普通会员权限</p>
        <ul className={styles.numUl}>
           <li className={styles.numLi}><img src={require('../assets/1_vip_icon.png')} /> 专属店铺</li>
          <li className={styles.numLi}><img src={require('../assets/2_vip_icon.png')} /> 转商品差价</li>
          <li className={styles.numLi}><img src={require('../assets/3_vip_icon.png')} /> 进货价95折</li>         
         </ul>
         <ul className={styles.numUl}>
           <li className={styles.numLi}><img src={require('../assets/4_vip_icon.png')} /> 锁粉</li>
          <li className={styles.numLi}><img src={require('../assets/5_vip_icon.png')} /> 邀请VIP赚奖励</li>
          <li className={styles.numLi}><img src={require('../assets/6_vip_icon.png')} /> VIP专属奖品</li>
         </ul>
      </div> 
     </div>
   )
  }
}

MemberPage.propTypes = {
};

export default connect()(MemberPage);
