import React, {Component} from 'react'
import {connect} from 'dva';
import styles from './invite.css'
import {myinvite} from '@/services/api'

// import icon from '../../assets/1_vip_icon.png'
// require();
//邀请码
class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:1111,
            inviteData:{
                isUsedInviteCodeList:[1,2],
                notUsedInviteCodeList:[2,3,4]
            }


        };
    }
    componentDidMount() {
        this.getinvite()
    }
    getinvite(){
        var data={
            userId:this.state.userId
        }
        myinvite(data).then(res=>{
            this.setState({
                inviteData:res.entry
            })
            console.log(this.state.inviteData.isUsedInviteCodeList)
        })
    }

    render() {
        return (
            <div >
                <div className={`${styles.title} ${styles.flexb}`}>
                    <div src={this.state.inviteData.wxHeadimgUrl} className={styles.personal}>
                        <img  className={styles.myphoto} alt=""/>
                        <div>{this.state.inviteData.wxNickName}</div>
                    </div>
                    <div className={styles.header_right}>95VIP每月赠送10个邀请码</div>
                </div>
                <div className={styles.invite_code}>
                    <div className={styles.smal_title}>可用</div>
                    <span>次月自动失效</span>
                </div>
                {/*{*/}
                    {/*this.state.inviteData.isUsedInviteCodeList.map((item,index)=>{*/}
                        {/*return(*/}
                            {/*<div key={index}>item</div>*/}
                        {/*)*/}
                    {/*})*/}
                {/*}*/}

                {
                    this.state.inviteData.isUsedInviteCodeList.map((item,index)=>{
                        return(
                            <div className={`${styles.item} ${styles.item}`}  key={index}>
                                <span>{item}</span>
                                <div>
                                    <button className={styles.btn}>复制</button>
                                    <button className={styles.btn}>分享</button>
                                </div>
                            </div>
                        )
                    })
                }


                    <div className={styles.can_use}>可用</div>

                {
                     this.state.inviteData.notUsedInviteCodeList.map((item,index)=>{
                         return(
                             <div className={`${styles.item}`} key={index}>
                                 <span>{item}</span>
                                 <span className={styles.used}>已使用</span>
                             </div>
                         )
                     })
                }


            </div>
        )
    }

}

export default connect()(Invite);
