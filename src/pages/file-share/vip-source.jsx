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
            vipList:[]
        }
       
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
                                <Link to={'/vip-source/vip-info/' + item.vtname}>
                                    <div className='vip-list-img'>
                                        <img className='vip-list-img-get' src={item.vtpath} alt="" />
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

class VipSearchList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            
            path:this.props.location.pathname,//此处父组件props改变不能影响他的state，使用时用props来区分，请求数据
            vipModalVisible: false,
            vipList:[]
        }
       
    }
    componentDidMount(){
 
        this.setState({
            vipList:JSON.parse(localStorage.getItem('vipSearch'))
        })
    }

    render() {
        const { vipModalVisible, vipList } = { ...this.state }
        return (
            <main className='vip-info'> 
           
            <div className='vip-info-list'>
                 {
                    vipList.map((item, index) => {
                        return (
                            <div key={item.vid} className='vip-info-list-item'>
                                <p>{item.vnam}</p>
                                <p className='vip-num'>账号：{item.vaccount}</p>
                                <p className='vip-pass'>密码：{item.vpassword}</p>
                                <p className='vip-time'>截至日期：{item.endTime}</p>
                                
                            </div>
                        )
                        
                    })
                }
            </div>
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
                <Route path='/vip-source/vip-info/:vipName' component={VipInfo}>
                </Route>
                <Route path='/vip-source/search/:vipName' component={VipSearchList}></Route>
            </Switch>


        </div>);
    }
}

export default VipSource;