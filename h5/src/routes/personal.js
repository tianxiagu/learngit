import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import { connect } from 'dva';
import styles from './personal.css';
import bridge from '@/utils/bridge';
import {getPersonalInfo} from '@/services/api';



class Personal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      popStatus: false,
      wxNickName: '',
      mobile: '',
      wxHeadimgUrl: 'http://www.17qq.com/img_qqtouxiang/76490995.jpeg',
      wxQrUrl: 'http://pic.58pic.com/58pic/11/68/32/08658PICred.jpg',
      shopIntroduction: '店铺简介',
      shopName: '店铺名称'
    }
  }
  
  getPersonalInfo() {
    let self = this;
    let params = {
      userId: 1
    };    
    getPersonalInfo(params).then((res)=>{
      let resData = res.entry;
      if(res.responseCode !== 0) {
        // return;
        console.log('接口异常，稍后再试~');
      }
      self.setState({
        wxNickName: resData.wxNickName,
        mobile: resData.mobile,
        wxHeadimgUrl: resData.wxHeadimgUrl,
        wxQrUrl: resData.wxQrUrl,
        shopIntroduction: resData.shopIntroduction,
        shopName: resData.shopName
      })
      console.log('返回值state：', self);
    }).catch((err)=> {
      console.log('网络异常，稍后再试~');
    }); 
  }
  popFunc() {
    let self = this;
    let status = this.state.popStatus;   
    let wxQrUrl = this.state.wxQrUrl;

    if(status === true) {
      return (
        <div className={styles.popLayout}>         
            <div className={styles.msk} onClick={()=>self.closeWxEwmPop()}></div>
                <div className={styles.prevImg}>
                  <span className={styles.ewmTxt}>微信二维码</span>
                  <a href="javascript:" className={styles.imgSize}>
                    <img src={wxQrUrl} />
                  </a>
                  <a href="javascript:" className={styles.uploadEwmBtn} onClick={()=>self.uploadImg()}>上传二维码图片</a>
                  {/* <input className={styles.onChangeBtn} type="file" name="file" id="file_more1" value="" accept="image/jpeg,image/png,image/jpg,image/gif" onChange={()=>self.previewImg(this)} />  */}
                  {/* <a className={styles.close} href="javascript:" onClick={()=>self.closeWxEwmPop()}>X</a> */}
            </div>
        </div>      
      )  
    }
        
  }
  closeWxEwmPop() {
    this.state.popStatus = false;
    console.log('state', this);
    this.setState({
      popStatus: false
    })
  }
  openWxEwmPop(e) {
    this.setState({
      popStatus: true
    })
  }
  setTitle() {
    bridge.setTitleBarMiddle({text: '个人中心', textSize: 14});
  }
  uploadImg() {
        
  }
  /**
   * h5上传图片
   */
  previewImg() {

  }
  /**
   * 跳转到修改店铺昵称
   */
  goToModifyNick() {
    window.location.href = '/modifynick'
  }
  /**
   * 跳转到修改店铺简介
   */
  goToStorereVision() {
    window.location.href = '/storerevision'
  }
  /**
   * 改变昵称
   */
  handleChangeValue(e) {
    let self = this;  
    let o = {};
    o[e.target.name] = e.target.value;
    self.setState(o);
  }
  componentDidMount() {
    this.setTitle();
    this.getPersonalInfo();
  }  
  render() {    
    let self = this;
    let headImgUrl = self.state.wxHeadimgUrl;
    let mobile = self.state.mobile;
    let wxNickName = self.state.wxNickName;
    let shopName = self.state.shopName;
    let shopIntroduction = self.state.shopIntroduction;
    return (
      <div className={styles.personal}>
  
       <div className={styles.personalAvatar}>
          <div className={styles.avatarRow}>
            <span className={styles.txt}>头像</span>
            <div className={styles.avatarImg}>
              <img src={headImgUrl} />
              <span className={styles.arrow}></span>
            </div>          
          </div>        
       </div>
  
        <div className={styles.personalTwo}>
          <div className={styles.personalRow}>
            <label>手机号</label>
            <input className={styles.tel} type="number" maxLength = "4" placeholder='13689082345' name='mobile' value={mobile} onChange={self.handleChangeValue.bind(this)} />
          </div>
          <div className={styles.personalRow}>
            <label>昵称</label>
            <input className={styles.name} type="text" placeholder="三毛" value={wxNickName} name='wxNickName' onChange={self.handleChangeValue.bind(this)}/>
          </div>          
        </div>
  
        <div className={styles.personalThree}>
          <div className={styles.personalRow} onClick={()=>self.goToModifyNick()}>
            <label className={styles.label}>店铺名称</label>
            <div className={styles.personalRight}>
              <span className={styles.txt}>{shopName}</span>
              <span className={styles.arrow}></span>
            </div>          
          </div>   
          <div className={styles.personalRow} onClick={()=>self.goToStorereVision()}>
            <label className={styles.label}>店铺简介</label>
            <div className={styles.personalRight}>
              <span className={styles.txt}>{shopIntroduction}</span>
              <span className={styles.arrow}></span>
            </div>          
          </div> 
          <div className={styles.personalRow} onClick={()=> {self.openWxEwmPop()}}>
            <label className={styles.label}>微信二维码</label>
            <div className={styles.personalRight}>
              <span className={styles.txt}>一乐拉面-木叶村店</span>
              <span className={styles.arrow}></span>
            </div>          
          </div>      
       </div>
        <div>
          {self.popFunc()}
        </div>  
      </div>
    )
  }
}

export default connect()(Personal);