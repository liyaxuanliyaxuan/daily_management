import React, { Component } from 'react';
import Header from '../../components/header/header'

import { Route, Link } from 'react-router-dom'

import { Menu } from 'antd'
import './display.scss'
import { MenuItem } from 'rc-menu';


//状态
class ResultInfoText extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currentPrj: {},
            defaultPrj: ``,

        }//通过项目id获取项目的相关信息

    }
    componentDidMount() {
        const pid = this.props.match.params.pid;
        let allPrj;
        if (localStorage.getItem('ing')) {
            allPrj = [...JSON.parse(localStorage.getItem('ing')), ...JSON.parse(localStorage.getItem('end'))]
            for (let prjItem of allPrj) {
                if (pid == prjItem.pid) {
                    this.setState({
                        currentPrj: prjItem
                    })
                }

            }
        }



    }
    componentWillReceiveProps(nextProps) {
        const allPrj = [...JSON.parse(localStorage.getItem('ing')), ...JSON.parse(localStorage.getItem('end'))]
        const pid = nextProps.match.params.pid
        for (let prjItem of allPrj) {
            if (pid == prjItem.pid) {
                this.setState({
                    currentPrj: prjItem
                })
            }

        }
    }

    render() {
        const { currentPrj, defaultPrj } = { ...this.state }

        return (
            <div>
                <div className='result-info-title'>
                    <i></i>
                    <h1>{currentPrj.pname}</h1>
                </div>
                <p className='sub-nav'>状态:</p>
                <p className='status'><svg t="1588737857704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8034" width="16" height="16">
                    <path d="M520.533333 597.333333l128-128 29.866667 29.866667-153.6 153.6-110.933333-110.933333 29.866666-29.866667 76.8 85.333333zM640 256v42.666667h-213.333333V234.666667c0-8.533333 0-12.8 4.266666-21.333334H298.666667v640h469.333333V213.333333h-132.266667c4.266667 8.533333 4.266667 12.8 4.266667 21.333334V256z m-42.666667 0v-21.333333c0-34.133333-29.866667-64-64-64S469.333333 200.533333 469.333333 234.666667V256h128z m-149.333333-85.333333c21.333333-25.6 51.2-42.666667 85.333333-42.666667s64 17.066667 85.333334 42.666667H810.666667v725.333333H256V170.666667h192z" fill="#1296db" p-id="8035"></path></svg>已参赛</p>
                <section className='info-txt'>

                    <p>开始时间：{currentPrj.beginTime}</p>
                    <p>截止日期：{currentPrj.closeTime}</p>
                    <p>负责人： {currentPrj.pRealname}</p>
                </section>
                <p className='status'><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" width="16" height="16" p-id="7866" version="1.1" t="1588737467812">
                    <defs><style type="text/css" /></defs><path fill="#1296db" d="M 682.667 896 l -149.333 -42.6667 L 384 896 v -166.4 c -102.4 -55.4667 -170.667 -162.133 -170.667 -281.6 C 213.333 273.067 358.4 128 533.333 128 S 853.333 273.067 853.333 448 c 0 123.733 -68.2667 230.4 -170.667 281.6 V 896 Z m -42.6667 -55.4667 v -89.6 c -25.6 8.53333 -55.4667 17.0667 -85.3333 17.0667 v 51.2 l 85.3333 21.3333 Z m -213.333 0 l 85.3333 -25.6 V 768 c -29.8667 0 -59.7333 -8.53333 -85.3333 -17.0667 v 89.6 Z m 106.667 -115.2 c 153.6 0 277.333 -123.733 277.333 -277.333 S 686.933 170.667 533.333 170.667 S 256 294.4 256 448 S 379.733 725.333 533.333 725.333 Z m 0 -85.3333 C 426.667 640 341.333 554.667 341.333 448 S 426.667 256 533.333 256 S 725.333 341.333 725.333 448 S 640 640 533.333 640 Z m 0 -42.6667 c 81.0667 0 149.333 -68.2667 149.333 -149.333 S 614.4 298.667 533.333 298.667 S 384 366.933 384 448 s 68.2667 149.333 149.333 149.333 Z" p-id="7867" /></svg>已获奖</p>
                <section className='info-txt'>

                    <p>开始时间：{currentPrj.beginTime}</p>
                    <p>截止日期：{currentPrj.closeTime}</p>
                    <p>负责人： {currentPrj.pRealname}</p>
                </section>
            </div>


        );
    }

}
//简介
class RewardsInfoText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrj: {},

        }

    }
    componentDidMount() {
        const pid = this.props.match.params.pid;
        let allPrj;
        if (localStorage.getItem('ing')) {
            allPrj = [...JSON.parse(localStorage.getItem('ing')), ...JSON.parse(localStorage.getItem('end'))]
            for (let prjItem of allPrj) {
                if (pid == prjItem.pid) {
                    this.setState({
                        currentPrj: prjItem
                    })
                }
            }
        }



    }
    componentWillReceiveProps(nextProps) {
        const allPrj = [...JSON.parse(localStorage.getItem('ing')), ...JSON.parse(localStorage.getItem('end'))]
        const pid = nextProps.match.params.pid
        for (let prjItem of allPrj) {
            if (pid == prjItem.pid) {
                this.setState({
                    currentPrj: prjItem
                })
            }
        }
    }

    render() {
        const { currentPrj } = { ...this.state }

        return (
            <div>
                   <p className='sub-nav'>简介:</p>
                 <section className='info-txt info-introduc'>
                {
                    currentPrj.introduction
                }
            </section> 
            </div>

          
        )

    }

}

function Introduc(props) {
    const defaultList = [
        { pname: '微信展览助手', pid: 1, pgame: 'xx大赛一等奖' },
        { pname: '微信展览助手', pid: 1, pgame: 'xx大赛一等奖' },
        { pname: '微信展览助手', pid: 1, pgame: 'xx大赛一等奖' },
        { pname: '微信展览助手', pid: 1, pgame: 'xx大赛一等奖' }
    ]
    return (
        <div>
            <div className='result-info'>
                <div className='result-info-title'>
                    <i></i>
                    <h1>相关成果</h1>
                </div>

                <section className='info-txt related-result'>
                    {
                        `互联网移动工程研究中心,我愿意加入通信学院信息工程开放平台用自己的坚定意志维护研究中心的荣誉。
    增长自己的学习能力，并且坚持以成为研究中心的一员而感到骄傲。互联网移动工程研究中心,我愿意加入通信学院信息工程开放平台用自己的坚定意志维护研究中心的荣誉。
    增长自己的学习能力，并且坚持以成为研究中心的一员而感到骄傲。`
                    }
                </section>

            </div>
            <div className='rewards-info'>
                <div className='rewards-info-title'>
                    <i></i>
                    <h1>相关奖项</h1>
                </div>

                <section className='info-txt'>
                    {
                        defaultList.map((item, index) => {
                            return (
                                <p key={item.pid}>{item.pname}<span className='space'></span>{item.pgame}</p>
                            )
                        })
                    }
                </section>

            </div>
        </div>

    )
}

function Detail(props) {
    return (
        <div>
            <div className='result-info'>


                <Route path={['/display/:pid', '/display']}
                    component={ResultInfoText}>

                </Route>

            </div>
            <div className='rewards-info'>
               

                <Route path={['/display/:pid', '/display']}
                    component={RewardsInfoText}>

                </Route>

            </div>
        </div>
    )
}

class PrjDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'introduc'
        }

    }
    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }
    render() {
        const { current } = { ...this.state }
        const { ifChooseOne } = { ...this.props }
        return (
            <div className='prj-detail'>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <MenuItem style={{ marginLeft: 10 }} key='introduc'>总览</MenuItem>
                    <MenuItem style={{ marginLeft: 10 }} key='detail' disabled={ifChooseOne}>查看详情</MenuItem>
                </Menu>
                {
                    current == 'introduc' ? <Introduc /> : <Detail />
                }

            </div>
        );
    }
}

class Navs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrjId: '',
            ifSeeMoreIng: false,
            ifSeeMoreEnd: false,
            studyingPrj: [],
            endPrj: []
        }

    }
    componentDidMount() {
        const _this = this
        this.$axios.get('/show/ing')
            .then((res) => {

                _this.setState({
                    studyingPrj: res.data
                })
                localStorage.setItem('ing', JSON.stringify(res.data))

            }).catch((err) => {
                console.log(err);
            })
        this.$axios.get('/show/end')
            .then((res) => {
                _this.setState({
                    endPrj: res.data
                })
                localStorage.setItem('end', JSON.stringify(res.data))
            }).catch((err) => {
                console.log(err);
            })

    }
    handleSeeEnd() {
        this.setState({
            ifSeeMoreEnd: !this.state.ifSeeMoreEnd
        })

    }

    handleSeeStudying() {
        this.setState({
            ifSeeMoreIng: !this.state.ifSeeMoreIng
        })
    }
    render() {

        const { endPrj, studyingPrj, ifSeeMoreEnd, ifSeeMoreIng } = { ...this.state }
        const { ChangeChooseState, ifChooseOne } = { ...this.props }
        const renderIngPrj = ifSeeMoreIng ? studyingPrj : studyingPrj.slice(0, 3)
        const renderEndPrj = ifSeeMoreEnd ? endPrj : endPrj.slice(0, 3)
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
                                    <li onClick={() => {
                                        this.setState({

                                            currentPrjId: item.pid
                                        })
                                        ChangeChooseState();
                                    }}
                                        className={this.state.currentPrjId === item.pid ? 'studying-prj-list-item--active' : 'studying-prj-list-item'}
                                        key={index}>
                                        <Link className='studying-prj-list-item-name' to={'/display/' + item.pid}>{item.pname}</Link>
                                        <i className='see-info'>></i>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className='more' onClick={this.handleSeeStudying.bind(this)}>
                        {
                            ifSeeMoreIng ? (<span>收起</span>) : (<span>更多</span>)
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
                                        onClick={() => {
                                            this.setState({
                                                currentPrjId: item.pid
                                            })
                                        }}
                                        className={this.state.currentPrjId === item.pid ? 'end-prj-list-item--active' : 'end-prj-list-item'}>
                                        <Link className='end-prj-list-item-name' to={'/display/' + item.pid}>{item.pname}</Link>
                                        <i className='see-info'>></i>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p onClick={this.handleSeeEnd.bind(this)} className='more'>
                        {
                            ifSeeMoreEnd ? (<span>收起</span>) : (<span>更多</span>)
                        }
                    </p>
                </nav>
            </div>
        );
    }
}





class Display extends Component {
    static defaultProps = {
        introduc: `互联网移动工程研究中心,我愿意加入通信学院信息工程开放平台用自己的坚定意志维护研究中心的荣誉。
        增长自己的学习能力，并且坚持以成为研究中心的一员而感到骄傲。互联网移动工程研究中心,我愿意加入通信学院信息工程开放平台用自己的坚定意志维护研究中心的荣誉。
        增长自己的学习能力，并且坚持以成为研究中心的一员而感到骄傲。互联网移动工程研究中心,我愿意加入通信学院信息工程开放平台用自己的坚定意志维护研究中心的荣誉。
        增长自己的学习能力，并且坚持以成为研究中心的一员而感到骄傲。`
    }
    constructor(props) {
        super(props);
        this.path = this.props.location.pathname
        this.state = {
            ifChooseOne: true
        }

    }
    ChangeChooseState = () => {
        this.setState({
            ifChooseOne: false
        })
    }
    render() {
        return (
            <div className='display-page'>
                <Header path={this.path} />
                <div className='diaplay-top'>
                    <div className='display-top-contnet'>
                        <h1 className='display-top-title'>NMID简介</h1>
                        <p className='display-top-txt'>
                            {this.props.introduc}
                        </p>
                    </div>
                    <div className='diaplay-top-right-pic'>
                        <img width='225' height='167' src={require('./imgs/undraw_mobile.png')} alt="" />
                    </div>
                </div>
                <div className='display-bottom'>
                    <Navs
                        ChangeChooseState={this.ChangeChooseState}
                        ifChooseOne={this.state.ifChooseOne} />
                    <PrjDetail ifChooseOne={this.state.ifChooseOne} />
                </div>
            </div>
        );
    }
}

export default Display;