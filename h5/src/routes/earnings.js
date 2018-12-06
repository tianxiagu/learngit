
import React,{Component}from'react';
import {connect} from 'dva';
import styles from './earnings.css';
import {earnings} from '@/services/api';
import {message} from 'antd';
import ReactPullLoad, {STATS} from 'react-pullload';
class Fans extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tab:0,
            page:1,
            pageSize:10,
            earnList:[
                {
                    accountFlowNoDesc: "veniam id enim",
                    amountChangeDesc: "-100",
                    statusDesc: "",
                    time: "11-25 13:21",
                    title: "店铺销售收入--直接推广"
                }
            ],
            action: STATS.init,
            hasMore:true,
            hasData:true,
            pullload:true
        };
    }
    changetab(e){
        this.setState({
            tab:e,
            page:1,
            pageSize:10,
            action: STATS.reset,
            hasMore: true
        });
        let params={
            type:e,
            userId:111,
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        this.getEarnData(params);
    }
    componentDidMount(){
        let params={
            type:0,
            userId:111,
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        this.getEarnData(params);
    }
    getEarnData(params){
        let that=this;
        earnings(params).then(res=>{
            if(res.responseCode===0){
                that.setState({
                    earnList:res.entry
                });
            }else{
                message.warning(res.message);
            }
        });
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
                    type:that.state.tab,
                    userId:111,
                    page:1,
                    pageSize:this.state.pageSize
                };
                earnings(params).then(res=>{
                    if(res.responseCode===0){
                        that.setState({
                            earnList:res.entry
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
                    type:that.state.tab,
                    userId:111,
                    page:++that.state.page,
                    pageSize:this.state.pageSize
                };
                earnings(params).then(res=>{
                    that.setState({
                        pullload:true
                    });
                    if(res.entry&&res.entry.length<10){
                        that.setState({
                            action: STATS.reset,
                            hasMore: false
                        });
                    }else if(res.entry&&res.entry.length===10){
                        that.setState({
                            action: STATS.reset,
                            hasMore: true
                        });
                    }
                    that.state.earnList=that.state.earnList.concat(res.entry);
                    that.setState({
                        earnList:that.state.earnList
                    });
                });
            }, 500);
            this.setState({
              action: STATS.loading
            });
    } 
    render(){
        return(
            <div>
                <div className={`${styles.tab} ${styles.flexb}`}>
                        <span className={this.state.tab===0?styles.border:styles.boder_none} onClick={this.changetab.bind(this,0)}>全部</span>
                        <span className={this.state.tab===1?styles.border:styles.boder_none} onClick={this.changetab.bind(this,1)}>待结算</span>
                        <span className={this.state.tab===2?styles.border:styles.boder_none} onClick={this.changetab.bind(this,2)}>已结算</span>

               </div>
                    <ReactPullLoad
                        downEnough={10}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={this.state.hasMore}
                        distanceBottom={10}
                    >
                        {this.state.earnList.map((item,index)=>{
                            return(
                                <div className={`${styles.item} ${styles.flexb}`} key={index}>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className={styles.item_order}>订单号： {item.accountFlowNoDesc}</div>
                                        <div className={styles.item_date}>{item.time}</div>
                                    </div>
                                    <div className={styles.item_right}>
                                        <div className={styles.item_wait}>{item.statusDesc}</div>
                                        <div className={styles.item_num}>{item.amountChangeDesc}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </ReactPullLoad>
            </div>
        )
    }

}
export default connect()(Fans);

