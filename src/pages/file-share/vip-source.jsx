import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';


import VipInfo from './vip-info'

import Header from '../../components/header/header'

import Search from '../../components/search/search';

import VipModal from './modals/vip-modal'



class VipList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            vipModalVisible: false,
            vipList:[]
        }
       this.nameMap = [undefined,'xunlei','aiqiyi','tengxun','baiduwangpan',
    'csdn','baiduwenku','xuntu','qiantuwang','others']
    }
    componentDidMount(){
        const _this = this
        this.$axios.get('/infoshare/allviptype')
        .then((res)=>{

            _this.setState({
                vipList: res.data
            })
            localStorage.setItem('vipList',JSON.stringify(res.data))
        }).catch((err)=>{
            console.log(err);
        })
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
        const { vipModalVisible, vipList } = { ...this.state }
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
                    vipList.map((item, index) => {
                        return (
                            <div key={item.vtid + index} className='vip-list-item'>
                                <Link to={'/vip-source/vip-info/' + this.nameMap[item.vtid]}>
                                    <div className='vip-list-img'>
                                        <img className='vip-list-img-get' src={item.vtpath} alt={item.vtname} />
                                    </div>
                                </Link>
                                <p className='vip-list-name'>
                                    {item.vtname}
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
    componentDidMount(){
        
    }
    render() {
        let { path } = { ...this.state }
        return (<div>
            <Header path={path} />

            <Route  path='/vip-source'>
                <Search path={path} />
            </Route>
            <Switch>
                <Route exact path='/vip-source' component={VipList}></Route>
                <Route path='/vip-source/vip-info/:vipName' component={VipInfo}></Route>
                <Route path='/vip-source/search/:vipName' component={VipInfo}></Route>
            </Switch>


        </div>);
    }
}

export default VipSource;