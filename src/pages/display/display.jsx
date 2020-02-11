import React, { Component } from 'react';
import Header from '../../components/header/header'


import { Switch, Route, Link } from 'react-router-dom'

import './display.scss'

class InfoText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prjName: ''
        }
        this.deFaultName = '日常管理系统'
    }

    render() {
        return (
            <section className='info-txt'>
                {
                    this.props.match.params ? this.props.match.params.prjName : this.deFaultName
                }
            </section>
        );
    }

}




class PrjDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='prj-detail'>
                <div className='result-info'>
                    <div className='result-info-title'>
                        <i></i>
                        <h1>相关成果</h1>
                    </div>

                    <Route path={'/display/:prjName'} component={InfoText}>

                    </Route>

                </div>
                <div className='rewards-info'>
                    <div className='rewards-info-title'>
                        <i></i>
                        <h1>相关奖项</h1>
                    </div>

                    <Route path={'/display/:prjName'} component={InfoText}>

                    </Route>

                </div>
            </div>
        );
    }
}

class Navs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrjName:'',
        }
        this.studingPrj = [
            {
                name: '日常管理系统',
                rewards: {

                },
                result: {

                }
            },
            {
                name: '微信展览助手',
                rewards: {

                },
                result: {

                }
            },
            {
                name: 'homework提交系统',
                rewards: {

                },
                result: {

                }
            },
            {
                name: 'AR图趣',
                rewards: {

                },
                result: {

                }
            }
        ]
        this.endPrj = [
            {
                name: '日常管理',
                rewards: {

                },
                result: {

                }
            },
            {
                name: '微信展览',
                rewards: {

                },
                result: {

                }
            },
            {
                name: 'homework提交',
                rewards: {

                },
                result: {

                }
            },
            {
                name: '图趣',
                rewards: {

                },
                result: {

                }
            }
        ]
    }
    handleSeeEnd(){

    }
    handleSeeStudying(){
        
    }
    render() {
        return (
            <div className='navs-left'>
                <nav className='studying-prj'>
                    <title className='studying-prj-title'>
                        <i></i>
                        在研项目
                            </title>
                    <ul className='studying-prj-list'>
                        {
                            this.studingPrj.map((item, index) => {
                                return (
                                <li onClick={()=>{this.setState({

                                    currentPrjName: item.name
                                })}} 
                                className={ this.state.currentPrjName===item.name?'studying-prj-list-item--active':'studying-prj-list-item'}
                                 key={index}>
                                        <Link className='studying-prj-list-item-name' to={'/display/' + item.name}>{item.name}</Link>
                                        <i className='see-info'>></i>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className='more' onClick={this.handleSeeStudying.bind(this)}>
                        <span>更多</span>
                    </p>
                </nav>
                <nav className='end-prj'>
                    <title className='end-prj-title'>
                        <i></i>
                        已结项目
                            </title>
                    <ul className='end-prj-list'>
                        {
                            this.endPrj.map((item, index) => {
                                return (
                                    <li key={index} 
                                    onClick={()=>{
                                        this.setState({
                                            currentPrjName: item.name
                                        })
                                    }}
                                    className={this.state.currentPrjName===item.name?'end-prj-list-item--active':'end-prj-list-item'}>
                                        <Link className='end-prj-list-item-name' to={'/display/' + item.name}>{item.name}</Link>
                                        <i className='see-info'>></i>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p onClick={this.handleSeeEnd.bind(this)} className='more'>
                        <span>更多</span>
                    </p>
                </nav>
            </div>
        );
    }
}





class Display extends Component {
    constructor(props) {
        super(props);
        this.path = this.props.location.pathname
        this.state = {}
        this.studingPrj = [
            {
                name: '日常管理系统',
                rewards: {

                },
                result: {

                }
            },
            {
                name: '微信展览助手',
                rewards: {

                },
                result: {

                }
            },
            {
                name: 'homework提交系统',
                rewards: {

                },
                result: {

                }
            },
            {
                name: 'AR图趣',
                rewards: {

                },
                result: {

                }
            }
        ]
        this.endPrj = [
            {
                name: '日常管理系统',
                rewards: {

                },
                result: {

                }
            },
            {
                name: '微信展览助手',
                rewards: {

                },
                result: {

                }
            },
            {
                name: 'homework提交系统',
                rewards: {

                },
                result: {

                }
            },
            {
                name: 'AR图趣',
                rewards: {

                },
                result: {

                }
            }
        ]
    }
    render() {
        return (
            <div className='display-page'>
                <Header path={ this.path }/>
                <div className='diaplay-top'>
                    <div className='display-top-contnet'>
                        <h1 className='display-top-title'>NMID简介</h1>
                        <p className='display-top-txt'>
                            {`互联网移动工程研究中心,我愿意加入通信学院信息工程开放平台用自己的坚定意志维护研究中心的荣誉。
                            增长自己的学习能力，并且坚持以成为研究中心的一员而感到骄傲。`}
                        </p>
                    </div>
                    <div className='diaplay-top-right-pic'>
                        <img width='225' height='167' src={require('./imgs/undraw_mobile.png')} alt="" />
                    </div>
                </div>
                <div className='display-bottom'>
                    <Navs />
                    <PrjDetail />
                </div>
            </div>
        );
    }
}

export default Display;