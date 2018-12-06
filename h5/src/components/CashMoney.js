import React,{Component} from 'react';
import style from './cashMoney.css';

export default class CashMoney extends Component{
   constructor(props){
       super(props);
       this.state={
           count: 9000
       }
   }
   render(){
       return(
           <div className={style.cashmoney}>
               <p className={style.cashtitle}>提现金额</p>
               <div className={style.cashIpt}>
                    <div>
                        <span>￥</span>
                        <input type="number" placeholder="最多可提现500"/>
                    </div> 
                     <em>全部提取</em>
               </div>
               <p className={style.cash}>本月还可提现 2 次</p>
           </div>
       )
   }
}