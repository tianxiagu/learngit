import React,{Component} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import style from './addCard.css';
import IosSelect from 'iosselect';
import right from '../assets/right.png';

import {getAllBankList, addBankCard} from '@/services/api';


class AddCard extends Component{
    constructor(props) {
        super(props);
        this.state={
            name:'',
            bankcard:'',
            cardName:'',
            bankList:[{'id': '10001', 'value': '工商银行'},
                    {'id': '10002', 'value': '农业银行'},
                    {'id': '10003', 'value': '建设银行'},
                    {'id': '10004', 'value': '中国银行'},
                    {'id': '10005', 'value': '交通银行'},
                    {'id': '10006', 'value': '浦发银行'},
                    {'id': '10007', 'value': '上海银行'},
                    {'id': '10008', 'value': '汇丰银行'},
                    {'id': '10009', 'value': '光大银行'},
                    {'id': '10010', 'value': '招商银行'},
                    {'id': '10011', 'value': '中信银行'},
                    {'id': '10012', 'value': '民生银行'},
                    {'id': '10013', 'value': '平安银行'},
                    {'id': '10014', 'value': '华夏银行'},
                    {'id': '10015', 'value': '广发银行'},
                    {'id': '10016', 'value': '北京银行'}
            ],
            userId: 1,
            bankName: ''
        }
    }    
    componentDidMount(){
        
    }
    handleChangeName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    handleChangeBank=(e)=>{
        console.log(e.target.value);
    }
    handleChangeCard=(e)=>{
        this.setState({
            bankcard:e.target.value
        });
    }
    getBankList() {
        getAllBankList().then((res)=>{
            let self = this;
            let resData = res.entry;
            if(res.responseCode !== 0) {
                return;
            }
            resData.map((item,index)=> {
                self.setState({
                    name: item.bankName,
                    code: item.bankCode,
                    pic: item.bankLogo,
                    lastNum: item.cardNoPart,
                })
            })
            console.log('返回值：', resData);
        }).catch((err)=>{
            console.log('网络异常，稍后再试~');
        })
    }
    handleNext=(e)=>{
        let self = this;
        let data = {};
        if(this.state.name===''){
            message.warning('请输入您的名字');
        }else if(this.state.cardName===''){
            message.warning('请选择您的银行名称');
        }else if(this.state.bankcard===''){
            message.warning('请输入您的银行卡号');
        }
        data={
            userId: self.state.userId,
            cardholder:self.state.name,
            bankName:self.state.cardName,
            bankCardNo:self.state.bankcard
        };
        addBankCard(data).then((res)=>{
            // let resData = res.entry;
            if(res.responseCode !== 0) {
                return;
            }            
            self.props.history.push({
                pathname:'/cashwithdrawal',
                query:data
            });
        }).then((err)=>{
            message.warning('网络异常，请稍后再试~');
        })



    }

    handleScroll=(e)=>{
        console.log(e);
    }
    handleChangeBankName=(e)=>{
        let that=this;
        new IosSelect(1,
            [that.state.bankList], {
                container: '.container',
                title: '',
                itemHeight: 40,
                itemShowCount: 3,
                callback: function (selectOneObj) {
                    that.setState({
                        cardName:selectOneObj.value
                    });
                    // bankIdDom.value = selectOneObj.id;
                    // showBankDom.innerHTML = selectOneObj.value;
                    // showBankDom.dataset['id'] = selectOneObj.id;
                    // showBankDom.dataset['value'] = selectOneObj.value;
                },
                fallback: function () {
                    console.log(1);
                },
                maskCallback: function () {
                    console.log(2);
                }
            });
    }
    render(){
        let scrollBank=<div className={style.chooseBank} onScroll={this.handleScroll.bind(this)}>
                            {this.state.bankList.map((item)=>{
                                return(
                                    <p className={style.chooseBankp} key={item.value}>{item.name}</p>
                                )
                            })}
                       </div>;
        return(
            <div className={style.addcard}>
                <div className={style.cardname}>
                    <span>持卡人</span>
                    <input type="text" placeholder="请输入持卡人名字" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                </div>
                <div className={style.bank}>
                    <div className={style.bankchoose} onClick={this.handleChangeBankName.bind(this)}>
                        <span>银行名称</span>
                        <div className={style.bankright}>
                            <em>{this.state.cardName}</em>
                            <img src={right}/>
                        </div>
                    </div>
                    <div className={`${style.cardname} ${style.card}`}>
                            <span>银行卡号</span>
                            <input type="number" placeholder="请输入银行卡号" value={this.state.bankcard} onChange={this.handleChangeCard.bind(this)}/>
                        </div>
                </div>
                <button className={style.nextStep} onClick={this.handleNext.bind(this)}>下一步</button>
                <div className="container"></div>
                {/* <div className={style.modal}>
                    <div className={style.mask}></div>
                    <div className={style.modalChoose}>
                       <p className={style.modalBtn}>
                          <span className={style.cancel}>取消</span>
                          <span className={style.ok}>确定</span>
                       </p>
                       {scrollBank}
                    </div>
                </div> */}

            </div>
        )
    }
}

export default connect()(AddCard)