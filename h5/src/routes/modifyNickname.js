import React,{Component} from 'react';
import {connect} from 'dva';
import style from './modifyNickname.css';
import close from '../assets/close.png';
import { shopInfoModify } from '@/services/api';
import { message } from 'antd';

class ModifyNickname extends Component{
    constructor(props){
        super(props);
        this.state={
            nickname:'',
            userId: 1,
            shopId: 2,
            shopName: ''
        }
    }
    shopInfoModify() {
        let self = this;
        let params = {
            userId: self.state.userId,
            shopId: self.state.shopId,
            shopName: self.state.shopName
        };
        shopInfoModify(params).then((res)=> {
            let resData = res.entry;
            if(res.responseCode !== 0) {
                return;
            }
            message.warning('修改成功');
            
        }).catch((err)=>{
            message.warning('网络异常，请稍后再试~');
        })
    }
    handleChangeName=(e)=>{
        this.setState({
            nickname:e.target.value
        });
    }
    handleClearName=(e)=>{
        this.setState({
            nickname:''
        })
    }
    render(){
        return(
            <div className={style.nickname}>
                <div className={style.nickIpt}>
                     <input type="text" placeholder="请输入您的昵称" value={this.state.shopName} onChange={this.handleChangeName.bind(this)}/>
                     <img src={close} style={{display:this.state.shopName?'flex':'none'}} onClick={this.handleClearName.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default connect()(ModifyNickname);