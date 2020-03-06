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
            currentBookName: '',
            addModalVisible: false,
            bookModalVisible: false,
            bookList: []
        }

    }
    componentDidMount() {
        const _this = this
        const currentPathName = this.state.path
                  if (currentPathName.includes('server')) {


                this.$axios
                    .get('/infoshare/book1')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })
                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (currentPathName.includes('product')) {
                this.$axios
                    .get('/infoshare/book2')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })
                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (currentPathName.includes('client')) {
                this.$axios
                    .get('/infoshare/book3')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })

                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (currentPathName.includes('hardware')) {
                this.$axios
                    .get('/infoshare/book4')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })

                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (currentPathName.includes('search')) {
                this.setState({
                    bookList: JSON.parse(localStorage.getItem('fileSearch'))
                })

            } else {
                return null
            }

    }
    componentWillReceiveProps(nextprops) {
        const _this = this
        const nextPathName = nextprops.location.pathname
        const currentPathName = this.props.location.pathname
        // console.log(nextprops);
        // console.log(pathname);
        if (nextPathName !== currentPathName) {
            if (nextPathName.includes('server')) {


                this.$axios
                    .get('/infoshare/book1')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })
                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (nextPathName.includes('product')) {
                this.$axios
                    .get('/infoshare/book2')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })
                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (nextPathName.includes('client')) {
                this.$axios
                    .get('/infoshare/book3')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })

                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (nextPathName.includes('hardware')) {
                this.$axios
                    .get('/infoshare/book4')
                    .then(
                        res => {

                            _this.setState({
                                bookList: res.data
                            })

                        }

                    )
                    .catch((err) => {
                        console.log(err);
                    })

            } else if (nextPathName.includes('search')) {
                this.setState({
                    bookList: JSON.parse(localStorage.getItem('fileSearch'))
                })

            } else {
                return null
            }

        } else {
            return null
        }

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
    handleBookCancel = e => {
        this.setState({
            bookModalVisible: false,
        })
    }
    handleBookOk = e => {
        this.setState({
            bookModalVisible: false,
        })
    }
    render() {
        const { addModalVisible,
            bookModalVisible,
            currentBookName,
            bookList } = { ...this.state }
        return (

            <main className='file-list'>
                <AddModal
                    visible={addModalVisible}
                    handleCancel={this.handleAddCancel}
                    handleOk={this.handleAddOk} />

                <BookModal
                    visible={bookModalVisible}
                    currentBookName={currentBookName}
                    handleCancel={this.handleBookCancel}
                    handleOk={this.handleBookOk}
                />
                <div
                    onClick={() => {
                        this.setState({
                            addModalVisible: !addModalVisible
                        })
                    }}
                    className='addBtn file-list-item'>
                    <img src={require('../../static/add-icon.png')} alt="" />
                </div>
                {
                    bookList.map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    this.setState({
                                        bookModalVisible: !bookModalVisible,
                                        currentBookName: item.bname
                                    })
                                }}
                                className='file-list-item'>
                                <div className='file-list-item-img'>
                                    <img width='180' height='144' src={item.ipath} alt="" />
                                </div>
                                <div className='file-list-detail'>
                                    <p className='bk-name'><span>书名：</span>{'《' + item.bname + '》'}</p>
                                    <p className='bk-introduction'>
                                        <span className='bk-intrduction-label'>简介：</span>
                                        <span className='bk-intrduction-txt'>
                                            {item.introduction}
                                        </span>
                                    </p>
                                    <p className='bk-time'>{item.edition}</p>
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
            path: this.props.location.pathname,
            fileNav:''
        }
    }
    componentDidMount() {
        //console.log(this.path);
        const fileNavIndex = localStorage.getItem('fileNavIndex') || '0'
        switch(fileNavIndex){
            case '0':this.setState({
                fileNav:'server'
            })
            break;
            case '1':this.setState({
                fileNav:'product'
            })
            break;
            case '2':this.setState({
                 fileNav:'client'
            })
            break;
            case '3':this.setState({
                fileNav:'hardware'
            })
            break;
           
        }
    }
    render() {
        const { path, fileNav } = { ...this.state }
        
        return (<div>
            <Header path={path}/>
            <Search path={path} />
            <SecondNav path={path} />
            <Switch>
                <Route exact path='/file-share'>
                    <Redirect to={`/file-share/${fileNav}`}/>
                </Route>
                <Route path='/file-share/server' component={FileList}>

                </Route>
                <Route exact path='/file-share/product' component={FileList}></Route>
                <Route exact path='/file-share/client' component={FileList}></Route>
                <Route exact path='/file-share/hardware' component={FileList}></Route>
                <Route path='/file-share/search' component={FileList}></Route>
            </Switch>

        </div>)
    }
}

export default FileShare;