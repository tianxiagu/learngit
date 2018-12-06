import React,{Component} from 'react';
import {connect} from 'dva';
import {message} from 'antd';
import myorder from './myOrder.css';
import {myOrder} from '@/services/api';
import ReactPullLoad, {STATS} from 'react-pullload';
class MyOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            tabTop:0,
            topList:[
                {tab:0,name:'全部'},
                {tab:1,name:'待支付'},
                {tab:2,name:'待发货'},
                {tab:3,name:'待收货'},
                {tab:4,name:'已完成'},
                {tab:5,name:'已关闭'},
                {tab:6,name:'退款中'},
                {tab:7,name:'已退款'},
                {tab:8,name:'退款失败'}
            ],
            orderList:[
                {
                    "sellerShopName":"小B店铺",
                    "sellerShopId":1,
                    "totalNum":1,
                    "bizOrderId":1,
                    "status":1,
                    "statuDesc":"待发货",
                    "paymentYuan":"78.99",
                    "remainTime":1,
                    "endTime":1,
                    "allowCancelOrder":1,
                    "itemList":[
                        {
                            "itemId":1,
                            "skuId":1,
                            "mainImgUrl":"http://duozheng-public-daily.oss-cn-hangzhou.aliyuncs.com/goods.png",
                            "itemTitle":"商品标题商品标题商品标题商品标题商品标题5",
                            "itemProperty":[
                                "白色 38码 "
                            ],
                            "paymentYuan":"10.77",
                            "quantity":9,
                            "status":2,
                            "subOrderId":-55030438
                        },
                        {
                            "itemId":1,
                            "skuId":1,
                            "mainImgUrl":"http://duozheng-public-daily.oss-cn-hangzhou.aliyuncs.com/goods.png",
                            "itemTitle":"商品标题商品标题商品标题商品标题4",
                            "itemProperty":[
                                "白色 38码 "
                            ],
                            "paymentYuan":"8.89",
                            "quantity":1,
                            "status":7,
                            "subOrderId":36161573
                        },
                        {
                            "itemId":1,
                            "skuId":1,
                            "mainImgUrl":"http://duozheng-public-daily.oss-cn-hangzhou.aliyuncs.com/goods.png",
                            "itemTitle":"商品标题商品标题商品标题商品标题4",
                            "itemProperty":[
                                "白色 38码 "
                            ],
                            "paymentYuan":"7.00",
                            "quantity":2,
                            "status":2,
                            "subOrderId":-21237572
                        },
                        {
                            "itemId":1,
                            "skuId":1,
                            "mainImgUrl":"http://duozheng-public-daily.oss-cn-hangzhou.aliyuncs.com/goods.png",
                            "itemTitle":"商品标题商品标题2",
                            "itemProperty":[
                                "白色 38码 "
                            ],
                            "paymentYuan":"8.89",
                            "quantity":8,
                            "status":6,
                            "subOrderId":40703330
                        },
                        {
                            "itemId":1,
                            "skuId":1,
                            "mainImgUrl":"http://duozheng-public-daily.oss-cn-hangzhou.aliyuncs.com/goods.png",
                            "itemTitle":"商品标题商品标题商品标题商品标题商品标题5",
                            "itemProperty":[
                                "白色 38码 "
                            ],
                            "paymentYuan":"10.77",
                            "quantity":5,
                            "status":6,
                            "subOrderId":-6129572
                        }
                    ],
                    "payTime":"1",
                    "consignTime":1,
                    "confirmTime":1,
                    "payMode":1,
                    "orderCreateTime":1,
                    "fee":"9.99",
                    "logisticsFee":"0",
                    "buyerName":"黑土",
                    "buyerHeadImg":"http://duozheng-public-daily.oss-cn-hangzhou.aliyuncs.com/avator_header.png",
                    "sellerProfit":"6.99"
                }],
            page:1,
            pageSize:10,
            isLoadingMore:false,
            action: STATS.init,
            hasMore:true,
            hasData:true,
            pullload:true
        }
    }
    componentDidMount(){
        let params={
            sellerUserId:11, //小b的userId
            status:'',
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        this.getOrderData(params);
    }
    getOrderData(params){
        let that=this;
        myOrder(params).then(res=>{
            if(res.responseCode===0){
                that.setState({
                    orderList:res.entry
                });
            }else{
                message.warning(res.exception);
            }
        })
    }
    handleChooseTab=(e)=>{
        this.setState({
            tabTop:e,
            page:1,
            pageSize:10,
            action: STATS.reset,
            hasMore: true
        });
        var params={
            sellerUserId:11, //小b的userId
            status:e===0?'':e,
            page:this.state.page,
            pageSize:this.state.pageSize
        };
        this.getOrderData(params);
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
                sellerUserId:11,
                status:that.state.tabTop===0?'':that.state.tabTop,
                page:1,
                pageSize:that.state.pageSize
            };
            that.getOrderData(params);
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
                sellerUserId:11,
                status:that.state.tabTop===0?'':that.state.tabTop,
                page:++that.state.page,
                pageSize:that.state.pageSize
            };
            myOrder(params).then(res=>{
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
                that.state.orderList=that.state.orderList.concat(res.entry);
                that.setState({
                    orderList:that.state.orderList
                });
            });
        }, 500);
        this.setState({
          action: STATS.loading
        });
      }  

    render(){
        let topList=(<ul className={myorder.topul}>
            {this.state.topList.map((item)=>{
                return(
                    <li key={item.tab} className={item.tab===this.state.tabTop?myorder.active:myorder.default} onClick={this.handleChooseTab.bind(this,item.tab)}>
                      <span>{item.name}</span>
                      <em className={this.state.tabTop===item.tab?myorder.lineActive:myorder.lineDefault}></em>
                    </li>
                )
            })}
        </ul>);

        let orderUl = <ReactPullLoad 
                            downEnough={10}
                            action={this.state.action}
                            handleAction={this.handleAction}
                            hasMore={this.state.hasMore}
                            distanceBottom={10}>
                        <ul className={myorder.orderul}>
                            {this.state.orderList.map((item)=>{
                                return(
                                    <li key={item.key} className={myorder.orderli}>
                                        <p className={`${myorder.user}`}>
                                            <img src={item.buyerHeadImg} />
                                            <span>{item.buyerName}</span>
                                        </p>
                                        {item.itemList.map((items,indexs)=>{
                                            return(
                                                <div className={myorder.goods} key={indexs}>
                                                    <img src={items.mainImgUrl} />
                                                    <div className={myorder.goods_intro}>
                                                    <div className={`${myorder.intro}`}>
                                                        <p className={`${myorder.two_overflow} ${myorder.userp}`}>
                                                        {items.itemTitle}
                                                        </p>
                                                        <div className={myorder.number}>
                                                            <span>￥{items.paymentYuan}</span>
                                                            <em>X{items.quantity}</em>
                                                        </div>
                                                    </div>
                                                    <div className={myorder.tags}>
                                                        {items.itemProperty.map((itemss,indexss)=>{
                                                            return(
                                                                <span key={indexss}>{itemss}</span>
                                                            )
                                                        })}
                                                    </div>
                                                    <p className={myorder.numAndPrice}>共{item.totalNum}件商品 合计:￥<span>{item.paymentYuan}</span></p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <p className={myorder.status}>
                                            <em>{item.statuDesc}</em>
                                            <span>订单利润：￥{item.sellerProfit}</span>
                                        </p>
                                    </li>
                                )
                            })}
                      </ul></ReactPullLoad>;
       
       return(
            <div className={myorder.order}>
                {topList}
                {orderUl}
            </div>
        )
    }
}

export default connect()(MyOrder);


