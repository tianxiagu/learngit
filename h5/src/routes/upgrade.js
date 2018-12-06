import React, { useLayoutEffect, Component } from 'react';
import { connect } from 'dva';
import styles from './upgrade.css';
import models from '../models';
import {upgradeMember} from '@/services/api';

let shopRightList = [
  {txt: '专属店铺', id: 1},
  {txt: '赚商品差价', id: 2},
  {txt: '进货价95折', id: 3},
  {txt: '锁粉', id: 4},
  {txt: '邀请VIP赚奖励', id: 5},
  {txt: 'VIP专属商品', id: 6}  
];

let data = {
  currentId: 0
}

/**
 * 有状态组件
 */

class upgradePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rightList: [
        {txt: '专属店铺', id: 1, src: require('../assets/1_vip_icon.png')},
        {txt: '赚商品差价', id: 2, src: require('../assets/2_vip_icon.png')},
        {txt: '进货价95折', id: 3, src: require('../assets/3_vip_icon.png')},
        {txt: '锁粉', id: 4, src: require('../assets/4_vip_icon.png')},
        {txt: '邀请VIP赚奖励', id: 5, src: require('../assets/5_vip_icon.png')},
        {txt: 'VIP专属商品', id: 6, src: require('../assets/6_vip_icon.png')}
      ],
      payWays: [
        {
          id: 1,
          name: '微信',
          val: ''
        },
        {
          id: 2,
          name: '支付宝',
          val: ''
        }
      ]
    }
  }
  componentDidMount() {
    let self = this;
    self.upgradeMember();
  }
  upgradeMember() {
    let data = {
      userId: 123
    }
    upgradeMember(data);
  }
  getCardList() {
    let rightList = this.state.rightList;
    return (
      <ul className={styles.cardUl}>
        {
          rightList.map((item, id) => {
            return(
              <li key={item.id} className={styles.cardLi}>
                <img src={item.src} />
                <span className={styles.txt}>{item.txt}</span>
              </li>
            )
          })
        }        
      </ul>
    )
  }
  getAlipayWay() {
    let payWaysList = this.state.payWays;
    return (
      <ul className={styles.payUl}>
        {
          payWaysList.map((item, id)=>{
            return(
              <li key={item.id} className={styles.payLi} >{item.name}</li>
            )
          })
        }
      </ul>
    )
  }
  immedPayBtn() {
    console.log('立即支付');
  }
  render() {
    let self = this;
    return (
      <div className={styles.upgradePage}>
        <div className={styles.cardArea}>
          <div className={styles.cardTop}>
            <span className={styles.txt1}>95VIP会员</span>
            <span className={styles.txt2}>￥95.00/年</span>
          </div>
          <div className={styles.cardBottom}>
            {self.getCardList()}
          </div>
          <div className={styles.payArea}>
            <div className={styles.payList}>
              {self.getAlipayWay()}
            </div>
            <div className={styles.priceTxt}>￥95.00</div>
            <a href="JavaScript:" onClick={()=>self.immedPayBtn()} className={styles.payBtn}>立即支付</a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(upgradePage);



