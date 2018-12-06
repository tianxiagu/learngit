import React,{Component} from 'react';
import {connect} from 'dva';
import style from './storeRevision.css';
import { shopInfoModify } from '@/services/api';
import { message } from 'antd';

class StoreRevision extends Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            length:50,
            userId: 1,
            shopId: 2,
            shopIntroduction: ''
        }
    }
    shopInfoModify() {
        let self = this;
        let params = {
            userId: self.state.userId,
            shopId: self.state.shopId,
            shopIntroduction: self.state.shopIntroduction
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
    handleValue=(e)=>{
        this.setState({
            value:e.target.value,
            length:50-e.target.value.length
        });
    }
    handleKeyDown=(e)=>{
        // 回车事件
        if(e.keyCode===13){
            
        }
    }
    render(){
        return(
            <div className={style.store}>
                <textarea placeholder="请输入要修改的店铺简介信息" value={this.state.shopIntroduction} maxLength="50" onChange={this.handleValue.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}></textarea>
                <p className={style.iptNum}>还可输入 {this.state.length} 个字符</p>
                <div className={style.modal} style={{display:'none'}}>
                     <div className={style.mask}></div>
                     <div className={style.modalAlert}>
                       <p>操作不成功,请修改或稍后再试</p>
                       <a className={style.modalBtn}>确定</a>
                     </div>
                </div>
            </div>
        )
    }
}
export default connect()(StoreRevision);