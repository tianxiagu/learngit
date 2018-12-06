
import React,{Component}from'react'
import {connect} from 'dva';
import styles from './mymember.css'

import {mymember} from '@/services/api'

// import icon from '../../assets/1_vip_icon.png'
// require();
//我的店铺会员
class Mymember extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId:1111,
            page:1,
            pageSize:20,
            total:"",
            memberData:[],

        };
    }
    componentDidMount() {
        this.getmember()
    }
    getmember(){
        var data = {
            userId: this.state.userId,
            page: this.state.page,
            pageSize: this.state.pageSize
        }
        mymember(data).then(res => {
            this.setState({
                memberData: res.entry,
                total:res.totalRecordSize
            })
            console.log(this.state.memberData)
        })
    }



    render(){
        return(
            <div >
                <div className={styles.titl}>
                    <div>我的店铺会员</div>
                    <div  className={styles.member_num}>{this.state.total}</div>
                </div>
                {
                    this.state.memberData.map((item,index)=>{
                        return(
                            <div className={styles.item} key={index}>
                                <div className={styles.flexs}>
                                    <img className={styles.photo} src={item.wxHeadUrl}  alt=""/>
                                    <span className={ styles.nickname}>{item.wxNickName}</span>
                                </div>
                                <span>{item.orderTotalNumber}个订单</span>
                            </div>
                        )
                    })
                }

            </div>
        )
    }

}
export default connect()(Mymember);
