import React,{Component} from 'react';
import {connect} from 'dva';
import style from './accountDetail.css';
import {account} from '@/services/api';
import {message} from 'antd';
import ReactPullLoad, {STATS} from 'react-pullload';

class AccountDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            page:1,
            pageSize:10,
            balance:'0.00',
            accountList:[
                // tab为0表示直接推广，tab为1表示提现中，tab为2表示提现成功
                {
                    accountFlowNoDesc: "magna mollit",
                    amountChangeDesc: "-900",
                    time: "11-15 13:23",
                    title: "提现"
                }
            ],
            action: STATS.init,
            hasMore:true,
            hasData:true,
            pullload:true
        }
    }
    componentDidMount(){
        let params={
            userId:111,
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        this.getAccountData(params);
    }
    getAccountData(params){
        let that=this;
        account(params).then(res=>{
            console.log(res);
            if(res.responseCode===0){
                that.setState({
                    balance:res.entry.balance,
                    accountList:res.entry.userAccountDetailList
                });
            }else{
                message.warning(res.message);
            }
        })
    }
    // 上拉加载下拉刷新
    handleAction = action => {
            if (action === this.state.action) {
              return false;
            }
            if(action === STATS.refreshing){
                this.handRefreshing();
            }else if (action === STATS.loading){
                if(this.state.pullload){
                    this.handLoadMore();
                }else{
                    this.setState({
                        hasMore:false
                    });
                }
            } else {
              this.setState({
                action: action
              });
            }
          };
        //   下拉刷新
        handRefreshing(){
              let that=this;
              if(STATS.refreshing === this.state.action){
                return false
              }
              setTimeout(()=>{
                let params={
                    userId:111,
                    page:1,
                    pageSize:this.state.pageSize
                };
                account(params).then(res=>{
                    if(res.responseCode===0){
                        that.setState({
                            accountList:res.entry.userAccountDetailList
                        });
                    }else{
                        message.warning(res.message);
                    }
                })
                this.setState({
                  hasMore: true,
                  action: STATS.refreshed,
                  page:1
                });
              }, 500)
           
              this.setState({
                action: STATS.refreshing
              })
          
        }
        //加载更多
        handLoadMore = () => {
            let that=this;
            if(STATS.loading === this.state.action){
                return false
            }
            //无更多内容则不执行后面逻辑
            if(!this.state.hasMore){
                return;
            }      
            that.setState({
                action: STATS.reset,
                hasMore: true
            });
            setTimeout(() => {
                let params={
                    userId:111,
                    page:++this.state.page,
                    pageSize:this.state.pageSize
                };
                account(params).then(res=>{
                    that.setState({
                        pullload:true
                    });
                    if(res.entry.userAccountDetailList&&res.entry.userAccountDetailList.length<10){
                        that.setState({
                            action: STATS.reset,
                            hasMore: false
                        });
                    }else if(res.entry.userAccountDetailList&&res.entry.userAccountDetailList.length===10){
                        that.setState({
                            action: STATS.reset,
                            hasMore: true
                        });
                    }
                    that.state.accountList=that.state.accountList.concat(res.entry.userAccountDetailList);
                    that.setState({
                        accountList:that.state.accountList
                    });
                });
            }, 500);
            this.setState({
              action: STATS.loading
            });
    } 
    render(){
        let accountUl=<ul className={style.accountul}>
                        {this.state.accountList.map((item,index)=>{
                            return(
                                <li key={index}>
                                   <div className={style.accountLeft}>
                                        <span>{item.title}</span>
                                        <em>{item.tab===0?'订单号：':'提现单号：'}{item.accountFlowNoDesc}</em>
                                        <b>{item.time}</b>
                                   </div>
                                   <div className={style.statusPrice}>
                                        <em style={{display:item.statusDesc?'block':'none'}}>{item.statusDesc}</em>
                                        <span>{item.amountChangeDesc}</span>
                                   </div>
                                </li>
                            )
                        })}
                      </ul>;
        return(
            <ReactPullLoad
                downEnough={10}
                action={this.state.action}
                handleAction={this.handleAction}
                hasMore={this.state.hasMore}
                distanceBottom={10}
                className={style.account}>
                <div className={style.balance}>
                    <span>账户余额</span>
                    <em>{this.state.balance}</em>
                </div>
                {accountUl}
            </ReactPullLoad>
        )
    }
}

export default connect()(AccountDetail);
