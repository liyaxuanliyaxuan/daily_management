import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { Modal } from 'antd'

import VipInfo from './vip-info'

import Header from '../../components/header/header'

import Search from '../../components/search/search';

import VipModal from './modals/vip-modal'



class VipList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            path:this.props.location.pathname,//此处父组件props改变不能影响他的state，使用时用props来区分，请求数据
            vipModalVisible: false,
        }
        this.vipList = [
            {
                name: '百度会员',
                pic: '',
            },
            {
                name: '爱奇艺会员',
                pic: '',
            },
            {
                name: 'CSDN会员',
                pic: '',
            },
            {
                name: '百度会员',
                pic: '',
            },
            {
                name: '百度会员',
                pic: '',
            },
            {
                name: '百度会员',
                pic: '',
            }
        ]
    }
    handleVipOk = e => {
        this.setState({
            vipModalVisible: false,
        });
    };
    handleVipCancel = e => {
        this.setState({
            vipModalVisible: false
        })
    }
    render() {
        const { vipModalVisible } = { ...this.state }
        return (
            <main className='vip-list'>
                <VipModal
                    handleCancel={this.handleVipCancel.bind(this)}
                    handleOk={this.handleVipOk.bind(this)}
                    visible={vipModalVisible} />
                <div
                    onClick={() => {
                        this.setState({
                            vipModalVisible: !vipModalVisible
                        })
                    }}
                    className='add-btn vip-list-item'>
                    <div className='vip-list-img'>
                        <img src={require('../../static/add-icon.png')} alt="" />
                    </div>

                    <p className='vip-list-name'>点击此处添加</p>
                </div>
                {
                    this.vipList.map((item, index) => {
                        return (
                            <div key={item.name + index} className='vip-list-item'>
                                <Link to={'/vip-source/vip-info/' + item.name}>
                                    <div className='vip-list-img'>
                                        <img src={require('../../static/baidu-logo.png')} alt="" />
                                    </div>
                                </Link>
                                <p className='vip-list-name'>
                                    {item.name}
                                </p>
                            </div>
                        )
                    })
                }

            </main>
        );
    }
}



class VipSource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: this.props.location.pathname
        }
    }
    render() {
        let { path } = { ...this.state }
        return (<div>
            <Header path={path} />

            <Route exact path='/vip-source'>
                <Search path={path} />
            </Route>
            <Switch>
                <Route exact path='/vip-source' component={VipList}></Route>
                <Route path='/vip-source/vip-info/:vipName' component={VipInfo}>

                </Route>
            </Switch>


        </div>);
    }
}

export default VipSource;