import React,{Component} from 'react';
import {connect} from 'dva';
import style from './cashWithdrawal.css';
import Bank from '../assets/bank.png';
import Right from '../assets/right.png';
import CashMoney from '../components/CashMoney';
import Btn from '../assets/btn.png';
import Folder from '../assets/folder.png';
import {getBankList, getBalanceAmount} from '@/services/api';


class CashWithdrawal extends Component{
    constructor(props){
        super(props);
        console.log(this.props.location.query);
        this.state={
            bankTab:-1,
            bankList:[
                {
                    tab:0,
                    pic:Bank,
                    name:'杭州银行',
                    lastNum: '1234',
                    code: 0
                },
                {
                    tab:1,
                    pic:Bank,
                    name:'宁波银行',
                    lastNum: '5678',
                    code: 0
                },
                {
                    tab: 2,
                    pic: Bank,
                    name: '北京银行',
                    lastNum: '9101',
                    code: 0
                }
            ],
            bankInfo:{
                Bank,
                name:'招商银行',
                lastNum:'1234',
                code: 0
            },
            userId: 1,
            balanceAmount: 0,
            openChooseBank:0
        }
    }
    getBankList() {
        getBankList().then((res)=>{
            let self = this;
            let resData = res.entry;
            let tempList = [];
            if(res.responseCode !== 0) {
                return;
            }
            resData.map((item,index)=> {
                tempList.push({
                    name: item.bankName,
                    code: item.bankCode,
                    pic: item.bankLogo,
                    lastNum: item.cardNoPart,
                })
            })
            self.setState({
                bankList: tempList
            });
            console.log('返回值：', resData);
        }).catch((err)=>{
            console.log('网络异常，稍后再试~');
        })
    }
    getBalanceAmount() {
        let userId = this.state.userId;
        let params = {
            userId: userId
        };
        getBalanceAmount(params).then((res)=>{
            let self = this;
            let resData = res.entry;
            if(res.responseCode !== 0) {
                return;
            }            
            self.setState({
                balanceAmount: resData.balanceAmount
            })
            
            console.log('返回值：', self.state);
        }).catch((err)=>{
            console.log('网络异常，稍后再试~');
        })
    }
    componentDidMount() {
        let self = this;
        self.getBalanceAmount();
        self.getBankList();
    }
    handleChoose=(index, e)=>{
        let code = e.currentTarget.code;
        let bankInfo={
            Bank:this.state.bankList[index].pic,
            name:this.state.bankList[index].name,
            lastNum: this.state.bankList[index].lastNum,
            code: this.state.bankList[index].code
        };
        this.setState({
            bankInfo
        });
        this.handleClose();
    }
    confirmBtn() {
        console.log('确认接口');
    }
    handleAddCard=(e)=>{
        this.props.history.push('/addcard');
    }
    // 选择银行
    handleChooseBank=(e)=>{
        this.setState({
            openChooseBank:1
        });
    }
    // 关闭选择银行卡
    handleClose=(e)=>{
        this.setState({
            openChooseBank: 0
        });
    }
    render(){
        let self = this;
        let BankList=<ul className={style.banklist}>
                        {this.state.bankList.map((item,index)=>{
                            return(
                                 <li key={item.tab} code={item.code} onClick={this.handleChoose.bind(this,index)}>
                                    <div>
                                        <img src={item.pic} className={style.bankpic}/>
                                        <span className={style.banknames}>{item.name}{item.lastNum}</span>
                                    </div>
                                    <img src={Btn} className={style.btnInfo} style={{display:item.tab===this.state.bankTab?'flex':'none'}}/>
                                </li>
                            )
                        })}
                     </ul>;
        // 添加银行卡
        let addBank=<div className={style.addbank} onClick={this.handleAddCard.bind(this)}>
                        <span>添加银行卡</span>
                        <img src={Right}/>
                    </div>;
        let hasBank=<div className={style.cashbank} code={this.state.bankInfo.code} onClick={this.handleChooseBank.bind(this)}>
                        <div className={style.cashinfo}>
                            <img src={this.state.bankInfo.Bank}/>
                            <div className={style.cashaccount}>
                                <span>{this.state.bankInfo.name}</span>
                                <em>尾号{this.state.bankInfo.lastNum} 储蓄卡</em>
                            </div>
                        </div>
                        <img src={Right} className={style.right}/>
                    </div>; 
        { /* 判断是否有银行卡 */ }
        let bankShow=JSON.stringify(this.state.bankInfo);                                   
        return(
            <div className={style.withdrawal}>
                {/* 判断是否有银行卡 */}
                {bankShow!=='{}'?hasBank:addBank}
                <CashMoney></CashMoney>
                <ul className={style.cashMsgInfo}>
                    <li><span>•</span>每次提现最少10元，最多20000元</li>
                    <li><span>•</span>每月最多可提现2次</li>
                    <li><span>•</span>暂无手续费</li>
                    <li><span>•</span>恶意提现一经发现将直接封号</li>
                </ul>
                <button className={style.nextStep} onClick={()=>self.confirmBtn()}>确定</button>
                <div className={style.choosebank} style={{display:this.state.openChooseBank===1?'flex':'none'}}>
                    <div className={style.choosemask} onClick={this.handleClose.bind(this)}></div>
                    <div className={style.bankinfo}>
                        <p className={style.bankTop}><span onClick={this.handleClose.bind(this)}>关闭</span><em>选择银行卡</em></p>
                        <div className={style.bankScroll}>
                            <div className={style.bankScrollInfo}>
                                {BankList}
                                <div className={style.addBank} onClick={this.handleAddCard.bind(this)}>
                                    <div>
                                        <img src={Folder} className={style.folder}/>
                                        <span>添加银行卡</span>
                                    </div>
                                    <img src={Right} className={style.right}/>
                                </div>
                            </div>    
                        </div>    

                    </div>
                </div>
            </div>
        )
    }
}
 export default connect()(CashWithdrawal);