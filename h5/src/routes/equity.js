import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './equity.css';

class storeIntroPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rightList: [
                {
                    id: 1,
                    txt: '专属店铺',
                    iconImg: require('../assets/1_vip_icon.png'),
                    iconImgSlt: require('../assets/1_vip_icon_inst.png')
                },
                {
                    id: 2,
                    txt: '赚商品差价',
                    iconImg: require('../assets/2_vip_icon.png'),
                    iconImgSlt: require('../assets/2_vip_icon_inst.png')
                },
                {
                    id: 3,
                    txt: '进货价95折',
                    iconImg: require('../assets/3_vip_icon.png'),
                    iconImgSlt: require('../assets/3_vip_icon_inst.png')
                },
                {
                    id: 4,
                    txt: '锁粉',
                    iconImg: require('../assets/4_vip_icon.png'),
                    iconImgSlt: require('../assets/4_vip_icon_inst.png')
                },
                {
                    id: 5,
                    txt: '邀请VIP赚奖励',
                    iconImg: require('../assets/5_vip_icon.png'),
                    iconImgSlt: require('../assets/5_vip_icon_inst.png')
                },
                {
                    id: 6,
                    txt: 'VIP专属商品',
                    iconImg: require('../assets/6_vip_icon.png'),
                    iconImgSlt: require('../assets/6_vip_icon_inst.png')
                }
            ],
            storeInfoList: [
                {title: '专属店铺', desc: '专属店铺信息描述'},
                {title: '赚商品差价', desc: '赚取商品差价信息描述'},
                {title: '进货价95折', desc: '进货价95折信息描述'},
                {title: '锁粉', desc: '锁粉信息描述'},
                {title: '邀请VIP赚奖励', desc: '邀请VIP赚奖励'},
                {title: 'VIP专属商品', desc: 'VIP专属商品'},
            ],
            storeName: '专属店铺',
            storeDesc: '这里是权益店铺这里是权益店铺这里是权益店铺这里是权益店铺这里是权益店铺',
            storeBgImg: require('../assets/bg_intro.png'),

            currentId: 0,//当前显示card index
            startX: 0,//触摸开始的x位置
            endX: 0,//触摸结束的x位置
        }
    }


    getBannerList() {
        let self = this;
        let shopRightList = this.state.rightList;
        let crtId = this.state.currentId;

        let storeName = this.state.storeName;
        let storeDesc = this.state.storeDesc;
        let storeBgImg = this.state.storeBgImg;

        return (
            <div className={styles.sliderBox}>

                {
                    shopRightList.map((item, idx) => {
                        return (
                            <div
                                className={`${styles.sliderItem} ${crtId === idx ? styles.active : ''} ${item.direction == 'right' ? styles.sliderRight : item.direction == 'left' ? styles.sliderLeft : ''}`}
                                onTouchStart={self.touchStart} onTouchMove={self.touchMove}
                                onTouchEnd={() => self.touchEnd(idx)} key={idx}>
                                <img class="" src={storeBgImg}/>
                                <p>{storeName}</p>
                                <div>{storeDesc}</div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }


    touchStart = (e) => {
        let touch = e.touches[0];
        this.setState({
            startX: touch.pageX
        })
    }

    touchMove = (e) => {
        let touch = e.touches[0];
        this.setState({
            endX: touch.pageX
        })
    }

    touchEnd = (idx) => {
        let distance = 50;
        let endX = this.state.endX;
        let startX = this.state.startX;
        let rightList = this.state.rightList;
        let currentId = this.state.currentId;
        if (endX - startX > distance && currentId !== rightList.length) { //右

            rightList[idx].direction = "right";
            this.setState({
                rightList: rightList
            });

            window.timer && clearTimeout(window.timer);
            window.timer = setTimeout(() => {
                rightList[idx].direction = null;
                this.setState({
                    rightList: rightList,
                    currentId: currentId + 1
                })
            }, 250)

        } else if (endX - startX < -distance && currentId) {//左

            rightList[idx].direction = "left";
            this.setState({
                rightList: rightList
            });
            window.timer && clearTimeout(window.timer);
            window.timer = setTimeout(() => {
                rightList[idx].direction = null;
                this.setState({
                    rightList: rightList,
                    currentId: currentId - 1
                })
            }, 250)

        } else {

        }
    }


    getPaginationList() {
        let self = this;
        let rightList = this.state.rightList;
        let crtId = this.state.currentId;
        return (
            <div className={styles.paginationBox}>
                {
                    rightList.map((item, idx) => {
                        return (
                            <div key={idx} data-id={idx} className={`${crtId === idx ? styles.active : ''}`}
                                 onClick={() => self.changeItemStatus(idx)}>
                                <img src={idx === crtId ? item.iconImgSlt : item.iconImg}/>
                                <p>{item.txt}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    changeItemStatus(id) {
        this.setState({
            currentId: id,
            storeName: this.state.storeInfoList[id].title,
            storeDesc: this.state.storeInfoList[id].desc
        })
    }

    render() {
        let self = this;
        return (
            <div class={styles.equityBox}>
                {
                    self.getBannerList()
                }
                {
                    self.getPaginationList()
                }
            </div>
        )
    }

    componentDidMount() {
        console.log('组件更新完成~');

    }

    componentWillUnmount() {

    }
}

export default connect()(storeIntroPage);
