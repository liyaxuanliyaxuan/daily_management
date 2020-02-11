import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Modal } from 'antd'

import Header from '../../components/header/header'
import Search from '../../components/search/search'

import SecondNav from '../../components/second-nav/second-nav'
import AddModal from './modals/add-modal'
import BookModal from './modals/book-modal'
import './file-share.scss';



class FileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: this.props.location.pathname,//此处父组件props改变不能影响他的state，使用时用props来区分，请求数据
            currentBookName:'',
            addModalVisible: false,
            bookModalVisible: false
        }
        this.bookList = [
            {
                name: '循序渐进linux',
                intruduction: '循序渐进linux循序渐进linux循序渐进linux',
                pic: '../../static/linux-bk.png',
                time: '2019.12.19',
            },
            {
                name: '网络技术',
                intruduction: '网络技术网络技术网络发第五二公分技术网络技术网络技术网络技术',
                pic: '../../static/bk-inter.png',
                time: '2019.12.19',
            },
            {
                name: '循序渐进linux',
                intruduction: '循序渐进linux循序渐进linux循序渐进linux',
                pic: '../../static/linux-bk.png',
                time: '2019.12.19',
            },
            {
                name: '网络技术',
                intruduction: '网络技术网络技术网络技术网络技术网络技术网络技术',
                pic: '../../static/bk-inter.png',
                time: '2019.12.19',
            },
            {
                name: '网络技术',
                intruduction: '暂无',
                time: '2020.2.2',
                pic: '',
            },

        ]
    }
    componentDidMount() {
         console.log(this.state.path);
    }
    handleAddOk = e => {
        console.log(e);
        this.setState({
            addModalVisible: false,
        });
    };

    handleAddCancel = e => {
        console.log(e);
        this.setState({
            addModalVisible: false,
        });
    };
    handleBookCancel = e =>{
        this.setState({
            bookModalVisible: false,
        })
    }
    handleBookOk = e =>{
        this.setState({
            bookModalVisible: false,
        })
    }
    render() {
        let { addModalVisible, bookModalVisible, currentBookName } = { ...this.state }
        return (

            <main className='file-list'>
                     <AddModal 
                visible={addModalVisible} 
                handleCancel={this.handleAddCancel.bind(this)}
                handleOk={this.handleAddOk.bind(this)}/>

                <BookModal 
                visible={bookModalVisible} 
                currentBookName={currentBookName}
                handleCancel={this.handleBookCancel.bind(this)}
                handleOk={this.handleBookOk.bind(this)}      
                />
                <div 
                onClick={() => { 
                    this.setState({ 
                        addModalVisible: !addModalVisible}) }} 
                        className='addBtn file-list-item'>
                    <img src={require('../../static/add-icon.png')} alt="" />
                </div>
                {
                    this.bookList.map((item, index) => {
                        return (
                            <div key={ index } 
                            onClick={() => { 
                                this.setState({
                                     bookModalVisible: !bookModalVisible,
                                     currentBookName: item.name 
                                    }) }} 
                            className='file-list-item'>
                                <div className='file-list-item-img'>
                                    <img width='180' height='144' src={require('../../static/bk-inter.png')} alt="" />
                                </div>
                                <div className='file-list-detail'>
                                    <p className='bk-name'><span>书名：</span>{'《' + item.name + '》'}</p>
                                    <p className='bk-introduction'>
                                        <span className='bk-intrduction-label'>简介：</span>
                                        <span className='bk-intrduction-txt'>
                                            {item.intruduction}
                                        </span>
                                    </p>
                                    <p className='bk-time'>{item.time}</p>
                                </div>
                                
                            </div>
                        )
                    })
                }

            </main>
        );
    }
}


class FileShare extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: this.props.location.pathname
        }
    }
    componentDidMount() {
        //console.log(this.path);
    }
    render() {
        let { path } = { ...this.state }
        return (<div>
            <Header path={path} />
            <Search path={path} />
            <SecondNav path={path} />
            <Switch>
                <Route exact path='/file-share'>
                    <Redirect to='/file-share/server' />
                </Route>
                <Route path='/file-share/server' component={FileList}>

                </Route>
                <Route exact path='/file-share/product' component={FileList}></Route>
                <Route exact path='/file-share/client' component={FileList}></Route>
                <Route exact path='/file-share/hardware' component={FileList}></Route>
            </Switch>

        </div>)
    }
}

export default FileShare;