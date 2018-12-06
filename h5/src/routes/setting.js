import React,{Component} from 'react';
import {connect} from 'dva';
import style from './setting.css';
import right from '../assets/right.png';

class Setting extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className={style.setting}>
               <p className={style.setInfo}><span>个人信息</span><img src={right}/></p>
               <div className={style.setInfo}><span>清理缓存</span><div className={style.capacity}><em>3.2M</em><img src={right}/></div></div>
               <div className={style.setPrivate}>
                  <p className={`${style.setInfo} ${style.clearInfo}`}><span>用户协议</span><img src={right}/></p>
                  <p className={`${style.setInfo} ${style.clearInfo}`}><span>隐私政策</span><img src={right}/></p>
               </div>
                <p className={style.setInfo}><span>关于我们</span><img src={right}/></p>
            </div>
        )
    }
}
export default connect()(Setting)