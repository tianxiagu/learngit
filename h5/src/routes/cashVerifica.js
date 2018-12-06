import React,{Component} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import style from './cashVerifica.css';
import {sendMobileCode, userLogin} from '@/services/api';

class CashVerifica extends Component{
    constructor(props){
        super(props);
        this.state={
           first:'',
           second:'',
           three:'',
           four:'',
           time:60,
           showDown:false,
           disabled:'disabled',
           timer:null,
           mobile: '13809873765',
           mobileCode: '444334'
        };
        message.config({
            top: 100,
            duration: 2,
            maxCount: 1,
        });
    }
    handleChangeFirst=(e)=>{
        this.setState({
            first:e.target.value
        });
        if(e.target.value&&!this.state.second){
            this.input2.focus();
        }
    }
    handleChangeTwo=(e)=>{
        this.setState({
            second: e.target.value
        });
        if(e.target.value&&!this.state.three) {
            this.input3.focus();
        }
    }
    handleChangeThree=(e)=>{
        this.setState({
            three:e.target.value
        });
        if(e.target.value&&!this.state.four) {
            this.input4.focus();
        }
    }
    handleChangeFour=(e)=>{
        this.setState({
            four:e.target.value
        });        
    }
    handleKeyDown= (e) => {
        if(this.state.first!==''&&this.state.second!==''&&this.state.three!==''&&this.state.four===''){
            console.log('不能为空');
        }else{
            console.log('做校验处理');
        }
    }
    /**
     * 发送验证码
     */
    sendCode() {
        let data = {
            mobile: this.state.mobile,
            mobileCode: this.state.mobileCode
        };
        sendMobileCode(data).then((res)=>{
            if(res.reponseCode !== 0) {
                return;
            }
        }).catch((err)=> {
            console.log('网络异常，稍后再试~');
        })
    }
    /**
     * 提交手机号及验证码
     */
    userLogin() {
        let params = {
            mobile: this.state.mobile,
            smsCode: this.state.mobileCode
        };
        userLogin(params).then((res)=>{
            if(res.reponseCode !== 0) {
                return;
            }
        }).catch((err)=>{
            console.log('网络异常,稍后再试！');
        })

    }
    componentDidMount() {
        this.input1.focus();
    }
    handleGetCode=(e)=>{
        let that=this;
        this.setState({
            showDown:true,
            disabled:'',
            time:60
        });
        this.input1.focus();
        let timer=null;
        if(timer){
            clearInterval(timer);
        }
        timer=setInterval(function(){
            if (that.state.time <= 1) {
                that.setState({
                    showDown: false,
                    timer:null
                });
                clearInterval(timer);
            }else{
                that.setState({
                    time:--that.state.time
                });
            }
        },1000);
    }
     render(){
         return(
             <div className={style.cashverifica}>
                 <div className={style.code}>
                    <span className={style.codespan}>输入验证码</span>
                    <p className={style.codemsg}>我们向您+8613456784569发送了一个 4 位验证码</p>
                 </div>
                 <div className={style.iptInfo}>
                        <div className={style.iptcode}>
                            <input type="tel" disabled={this.state.disabled} value={this.state.first} maxLength="1" ref={(input) => this.input1 = input} onChange={this.handleChangeFirst.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}/>
                            <input type="tel" disabled={this.state.disabled} value={this.state.second} maxLength="1" ref={(input) => this.input2 = input} onChange={this.handleChangeTwo.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}/>
                            <input type="tel" disabled={this.state.disabled} value={this.state.three} maxLength="1" ref={(input) => this.input3 = input} onChange={this.handleChangeThree.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}/>
                            <input type="tel" disabled={this.state.disabled} value={this.state.four} maxLength="1" ref={(input) => this.input4 = input} onChange={this.handleChangeFour.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}/>
                        </div>
                        {
                            this.state.showDown?<p className={style.againget}>重新获取·{this.state.time}s</p>:<p className={style.getcode} onClick={this.handleGetCode.bind(this)}>点我获取验证码</p>
                        }
                </div>   
             </div>
         )
     }
}

export default connect()(CashVerifica);