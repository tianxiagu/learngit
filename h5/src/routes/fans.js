



import React,{Component}from'react'
import {connect} from 'dva';
import styles from './fans.css'
import {myfans,myfanstotal} from '@/services/api'
// import icon from '../../assets/1_vip_icon.png'
// require();
//我的粉丝
class Fans extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId:111,
            fansdata:[],
            total: {
                myFansNum: '',
                directFansNum: '',
                indirectFansNum: ''
            }
        };
    }
    componentDidMount() {
        this.getfans()
        this.getfanstotal()
    }
    getfans(){
        var data={
            userId:this.state.userId
        }
        myfans(data).then(res=>{
            // if(res.responseCode==0){
            //     this.setState({
            //         fansdata:res.entry
            //     })
            // }else {
            //     console.log("接口异常",res)
            // }
            this.setState({
                fansdata:res.entry
            })
            console.log(this.state.fansdata);
        })

    }


    getfanstotal(){
        var data={
            userId:this.state.userId
        }
        myfanstotal(data).then(res=>{
            this.setState({
                total:res.entry
            })
        })
    }
    render(){
        return(
            <div>
                <div className={`${styles.header} ${styles.flexb}`} >
                    <div >
                        <div>我的店铺会员</div>
                        <div className={styles.fans_nums}>{this.state.total.myFansNum}</div>
                    </div>

                    <div className={`${styles.flexs} ${styles.headerend}`}>
                        <div>
                            <div>直接获取</div>
                            <div className={styles.fans_num}>{this.state.total.directFansNum}</div>
                        </div>
                        <div >
                            <div>间接获取</div>
                            <div className={styles.fans_num}>{this.state.total.indirectFansNum}</div>
                        </div>
                    </div>
                </div>

                {/*content*/}
                {
                    this.state.fansdata.map((item,index)=>{
                        return(
                            <div className={styles.item} key={index}>
                                <div className={styles.flexs}>
                                    <img className={styles.photo} src={item.wxHeadimgUrl}  alt=""/>
                                    <span>{item.wxNickName}</span>
                                </div>

                                <span> 贡献{item.providedFansNum}个粉丝</span>
                            </div>
                        )
                    })
                }

            </div>
        )
    }

}
export default connect()(Fans);
