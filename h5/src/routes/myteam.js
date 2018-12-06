import React, {Component} from 'react'
import {connect} from 'dva';
import styles from './myteam.css'
import codepic from '../assets/code.png';
import {myteam,getPersonalInfo} from '@/services/api'
// import icon from '../../assets/1_vip_icon.png'
// require();

//我的团队

class Myteam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            ismodel: false,
            codenum: "",

            userId: 1111,
            page: 1,
            pageSize: 20,
            memberLevel: 1,
            memberData: [],
            wxQrCodePicUrl:"",
            userinfo:""
        };
    }

    componentDidMount() {
        this.getteam()
    }

    getteam() {
        var data = {
            userId: this.state.userId,
            memberLevel: this.state.memberLevel,
            page: this.state.page,
            pageSize: this.state.pageSize
        }
        myteam(data).then(res => {
            this.setState({
                memberData: res.entry
            })
        })
    }
    getuserinfo(){
        var data={
            userId: this.state.userId
        }
        getPersonalInfo(data).then(res=>{
            this.setState({
                userinfo:res.entry
            })
        })
    }

    changetab(e) {
        console.log(e)
        this.setState({
            tab: e
        })
    }


    showModel() {
        return(
                <div onClick={this.showModel1}>
                    <div className={styles.dely}></div><div className={styles.model}>
                    <span> TA的微信二维码 </span>
                    <img src={this.state.wxQrCodePicUrl} className={styles.model_pic} alt=""/>
                    < button className = {styles.model_btn}>保存二维码到手机 </button>
                </div>
                    </div>

        )
    }

    showModel1=(e)=>{
        console.log(e)
        this.setState({
            ismodel:!this.state.ismodel,
            wxQrCodePicUrl:e
        });
    }


    render() {
        return (
            <div>
                <div className={`${styles.title} ${styles.flexb}`}>
                    <div className={styles.personal}>
                        <img className={styles.myphoto} alt=""/>
                        <div>
                            <div> {this.state.userinfo.wxNickName}</div>
                            <div className={styles.fans_nums}>邀请人</div>
                        </div>
                    </div>
                    <img src={this.state.userinfo.wxHeadimgUrl} onClick={this.showModel1.bind(this,this.state.userinfo. wxQrUrl)} className={styles.code} alt=""/>

                </div>
                <div className={`${styles.flexb} ${styles.tab}`}>
                    <span className={this.state.tab === 1 ? styles.border : styles.border_none}
                          onClick={this.changetab.bind(this, 1)}>普通会员</span>
                    <span className={this.state.tab === 2 ? styles.border : styles.border_none}
                          onClick={this.changetab.bind(this, 2)}>95VIP</span>
                </div>

                {
                    this.state.memberData.map((item,index)=>{
                        return(
                            <div className={styles.item}  key={index}>
                                <div className={styles.flex}>
                                    <img src={item.wxHeadimgUrl} className={styles.photo} alt=""/>
                                    <span>{item.wxNickName}</span>

                                </div>
                                <img src={codepic} onClick={this.showModel1.bind(this, item.wxQrCodeUrl)} className={styles.code} alt=""/>
                            </div>
                        )
                    })
                }



            {this.state.ismodel?this.showModel():""}
            </div>
        )
    }
}

export default connect()(Myteam);
        
