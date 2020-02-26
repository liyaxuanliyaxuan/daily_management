import React, { Component } from 'react';
import Header from '../../components/header/header'


import { Switch, Route, Link } from 'react-router-dom'

import './display.scss'

class ResultInfoText extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            currentPrj: {},
            defaultPrj: {}
        }//通过项目名称获取项目的相关信息
        this.deFaultName = '日常管理系统'
    }
    componentDidMount(){
        const allPrj = [...JSON.parse(localStorage.getItem('ing')),...JSON.parse(localStorage.getItem('end'))]
        console.log(allPrj);
        this.setState({
            defaultPrj:allPrj[0]
        })
        const prjName = this.props.match.params.prjName
        for(let prjItem of allPrj){
            if(prjName === prjItem.pname){
                this.setState({
                    currentPrj: prjItem
                })
            }

        }
    }
    componentWillReceiveProps(nextProps){
        const allPrj = [...JSON.parse(localStorage.getItem('ing')),...JSON.parse(localStorage.getItem('end'))]
        const prjName = nextProps.match.params.prjName
        for(let prjItem of allPrj){
            if(prjName === prjItem.pname){
                this.setState({
                    currentPrj: prjItem
                })
            }

        }
    }

    render() {
        const {currentPrj, defaultPrj} = {...this.state}
        return (
           
            <section className='info-txt'>
                {
                    currentPrj.pname ? (
                        <p>{currentPrj.pname}</p>
                    ):(
                    <p>{defaultPrj.pname}</p>)
                }
            </section>
        );
    }

}
class RewardsInfoText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrj:{},
            defaultPrj:{}
        }//通过项目名称获取项目的相关信息
      
    }
    componentDidMount(){
        const allPrj = [...JSON.parse(localStorage.getItem('ing')),...JSON.parse(localStorage.getItem('end'))]
        console.log(allPrj);
        const prjName = this.props.match.params.prjName
        this.setState({
            defaultPrj:allPrj[0]
        })
        for(let prjItem of allPrj){
            if(prjName === prjItem.pname){
                this.setState({
                    currentPrj: prjItem
                })
            }

        }
    }
    componentWillReceiveProps(nextProps){
        const allPrj = [...JSON.parse(localStorage.getItem('ing')),...JSON.parse(localStorage.getItem('end'))]
        const prjName = nextProps.match.params.prjName
        for(let prjItem of allPrj){
            if(prjName === prjItem.pname){
                this.setState({
                    currentPrj: prjItem
                })
            }

        }
    }

    render() { 
        const {currentPrj, defaultPrj} = {...this.state}
        return (
           
            <section className='info-txt'>
                {
                    (currentPrj.pname)?(
                        <p>项目名称：{currentPrj.pname}</p>
                        
                    ):(
                        <p>{defaultPrj.pname}</p>
                    )
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

                    <Route path={['/display/:prjName','/display']}
                     component={ResultInfoText}>

                    </Route>

                </div>
                <div className='rewards-info'>
                    <div className='rewards-info-title'>
                        <i></i>
                        <h1>相关奖项</h1>
                    </div>

                    <Route path={['/display/:prjName','/display']} 
                    component={RewardsInfoText}>

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
            ifSeeMoreIng: false,
            ifSeeMoreEnd: false,
            studyingPrj:[],
            endPrj:[]
        }
     
    }
    componentDidMount(){
        const _this = this
        this.$axios.get('/show/ing')
        .then((res)=>{
        
            _this.setState({
                studyingPrj: res.data
            })
            localStorage.setItem('ing',JSON.stringify(res.data))
            // console.log(JSON.parse(localStorage.getItem('ing')));
        }).catch((err)=>{
            console.log(err);
        })
        this.$axios.get('/show/end')
        .then((res)=>{
            _this.setState({
                endPrj: res.data
            })
            localStorage.setItem('end',JSON.stringify(res.data))
        }).catch((err)=>{
            console.log(err);
        })

    }
    handleSeeEnd(){
        this.setState({
            ifSeeMoreEnd: !this.state.ifSeeMoreEnd
        })

    }

    handleSeeStudying(){
        this.setState({
            ifSeeMoreIng: !this.state.ifSeeMoreIng
        })
    }
    render() {
    
        const { endPrj, studyingPrj, ifSeeMoreEnd, ifSeeMoreIng } = {...this.state}
        const renderIngPrj = ifSeeMoreIng? studyingPrj:studyingPrj.slice(0,1)
        const renderEndPrj = ifSeeMoreEnd? endPrj:endPrj.slice(0,1)  
        return (
            <div className='navs-left'>
                <nav className='studying-prj'>
                    <title className='studying-prj-title'>
                        <i></i>
                        在研项目
                            </title>
                    <ul className='studying-prj-list'>
                        {
                           
                        
                           renderIngPrj.map((item, index) => {
                                return (
                                <li onClick={()=>{this.setState({

                                    currentPrjName: item.pname
                                })}} 
                                className={ this.state.currentPrjName===item.pname?'studying-prj-list-item--active':'studying-prj-list-item'}
                                 key={index}>
                                        <Link className='studying-prj-list-item-name' to={'/display/' + item.pname}>{item.pname}</Link>
                                        <i className='see-info'>></i>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className='more' onClick={this.handleSeeStudying.bind(this)}>
                        {
                            ifSeeMoreIng?(<span>收起</span>):(<span>更多</span>)
                        }
                    </p>
                </nav>
                <nav className='end-prj'>
                    <title className='end-prj-title'>
                        <i></i>
                        已结项目
                            </title>
                    <ul className='end-prj-list'>
                        {
                           renderEndPrj.map((item, index) => {
                                return (
                                    <li key={index} 
                                    onClick={()=>{
                                        this.setState({
                                            currentPrjName: item.pname
                                        })
                                    }}
                                    className={this.state.currentPrjName===item.pname?'end-prj-list-item--active':'end-prj-list-item'}>
                                        <Link className='end-prj-list-item-name' to={'/display/' + item.pname}>{item.pname}</Link>
                                        <i className='see-info'>></i>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p onClick={this.handleSeeEnd.bind(this)} className='more'>
                        {
                            ifSeeMoreEnd?(<span>收起</span>):(<span>更多</span>)
                        }
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