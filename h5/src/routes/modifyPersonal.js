import React from 'react';
import { connect } from 'dva';
import styles from './modifyPersonal.css';
import {Modal} from 'antd';

function openWxEwm() {
  
}
function closeFunc() {
  console.log('关闭');
}
function popFunc() {

}
function IndexPage() {
  return (
    <div className={styles.modifyPersonalPage}>
      {/* 修改个人信息 */}
      <div className={styles.modifyUserInfo}> 
        <div className={styles.userName}>
          <input className={styles.userNameIpt} type="text" />
          <span className={styles.clearUserNameIpt}>x</span>
        </div>
      </div>

      <div className={styles.userInfoText}>
        <textarea placeholder="请修改你的介绍">
          这是用户店铺的介绍，请输入~
        </textarea>
      </div>

      <div className={styles.userInfoArea}>
        <div className={styles.msk}></div>
        <div className={styles.userInfoText}>
          <textarea placeholder='请输入你的介绍信息'></textarea>
        </div>
      </div>

     <div className={styles.personalAvatar}>
        <div className={styles.avatarRow}>
          <span className={styles.txt}>头像</span>
          <div className={styles.avatarImg}>
            <img src={require('../assets/avator_img.png')} />
            <span className={styles.arrow}></span>
          </div>          
        </div>        
     </div>

      

      <div className={styles.personalThree}>
        <div className={styles.personalRow}>
          <label className={styles.label}>店铺名称</label>
          <div className={styles.personalRight}>
            <span className={styles.txt}>一乐拉面-木叶村店</span>
            <span className={styles.arrow}></span>
          </div>          
        </div>   
        <div className={styles.personalRow}>
          <label className={styles.label}>店铺简介</label>
          <div className={styles.personalRight}>
            <span className={styles.txt}>一乐拉面</span>
            <span className={styles.arrow}></span>
          </div>          
        </div> 
        <div className={styles.personalRow} onClick={openWxEwm}>
          <label className={styles.label}>微信二维码</label>
          <div className={styles.personalRight}>
            <span className={styles.txt}>一乐拉面-木叶村店</span>
            <span className={styles.arrow}></span>
          </div>          
        </div>      
     </div>

      <model>
        
        <div className={styles.popLayout}>
          <div className={styles.msk} onClick={closeFunc}></div>
          <div className={styles.prevImg}>
            <a href="javascript:" className={styles.imgSize}>
              <img src={require('../assets/avator_img.png')} />
            </a>
            <a className={styles.close} href="javascript:" onClick={closeFunc}>X</a>
          </div>

        </div>
      </model>


    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
