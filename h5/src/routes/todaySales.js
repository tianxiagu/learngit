import React,{Component} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import style from './todaySales.css';
import good from '../assets/goods.png';
import {todaySales,todaySalesGoods} from '@/services/api';
import ReactPullLoad, {STATS} from 'react-pullload';


class TodaySales extends Component{
    constructor(props){
        super(props);
        this.state={
            page:1,
            pageSize:10,
            topList:[
                {
                    tab:0,
                    name:'今日销量',
                    num:1257
                },
                {
                    tab:1,
                    name:'今日销售额',
                    money:1257
                }
            ],
            saleList:[{
                    itemId:1001,
                    mainImgUrl:good,
                    itemTitle:'这里是商品标题文字这里是商品标题文字这里是商品标题文字这里是商品标题文字这里是商品标题文字',
                    quantity:10
            }],
            action: STATS.init,
            hasMore:true,
            hasData:true,
            pullload:true
        }
    }
    componentDidMount(){
        let params1={
            sellerUserId:111
        };
        let params2={
            sellerUserId:111,
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        this.getTodaySales(params1,params2);
    }
    getTodaySales(params1,params2){
        let that=this;
        todaySales(params1).then(res=>{
            if(res.responseCode===0){
                that.state.topList[0].num=res.entry.todaySaleNum;
                that.state.topList[1].money=res.entry.todaySaleAmount;
                that.setState({
                    topList:that.state.topList
                });
            }else{
                message.warning(res.message);
            }
        });
        todaySalesGoods(params2).then(res=>{
            if(res.responseCode===0){
                that.setState({
                    saleList:res.entry
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
                    sellerUserId:111,
                    page:1,
                    pageSize:that.state.pageSize
                };
                todaySalesGoods(params).then(res=>{
                    if(res.responseCode===0){
                        that.setState({
                            saleList:res.entry
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
                    sellerUserId:111,
                    page:++that.state.page,
                    pageSize:that.state.pageSize
                };
                todaySalesGoods(params).then(res=>{
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
                    that.state.saleList=that.state.saleList.concat(res.entry);
                    that.setState({
                        saleList:that.state.saleList
                    });
                });
            }, 500);
            this.setState({
              action: STATS.loading
            });
    }  
    render(){
        let salesTab=<ul className={style.topul}>
                        {this.state.topList.map((item)=>{
                            return(
                                <li key={item.tab}>
                                  <span>{item.name}</span>
                                  <em>{item.tab===1?`￥${item.money}`:`${item.num}`}</em>
                                </li>
                            )
                        })}
                     </ul>;
        let saleList=<ReactPullLoad downEnough={10}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={this.state.hasMore}
                        distanceBottom={10}>
                                <ul className={style.saleul}>
                                    {this.state.saleList.map((item,index)=>{
                                        return(
                                            <li key={index*2}>
                                                <img src={item.mainImgUrl}/>
                                                <div className={style.intro}>
                                                    <p className={style.two_overflow}>{item.itemTitle}</p>
                                                    <span>X{item.quantity}</span>
                                                </div>
                                            </li> 
                                        )
                                    })}
                                </ul>
                    </ReactPullLoad>;             
        return(
            <div className={style.todaySales}>
                {salesTab}
                {saleList}
            </div>
        )
    }
}

export default connect()(TodaySales);
