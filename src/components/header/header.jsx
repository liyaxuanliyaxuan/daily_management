/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import './header.scss'

import { checkAdmin, setUser, setImg } from '../../actions/logger'




const FileDrop = (props) => {

    return (
        <div className='filedrop'>
            <Link className='file-drop-item' to={`/file-share`}>书籍借阅</Link>
            <Link className='file-drop-item' to='/vip-source'>会员资源</Link>
            <Link className='file-drop-item' to='/meeting'>会议资料</Link>
        </div>
    )

}


class Header_ extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: this.props.path,
        }

    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {


    }
    componentDidMount() {
        const { ifAdmin, userName, userImg, setImg } = { ...this.props }
    
        //let username = localStorage.getItem('userName')
        if (userImg) {

        } else {
            this.$axios.get(`/user/getUserInfoByUnam?username=${userName}`)
            .then(res => {
                setImg(res.data.upath)
            })
        }



    }
    handleLogState() {
        const { setUser, checkAdmin, userName } = { ...this.props }
        if (userName) {
            //已登录状态-》登出状态
          

            localStorage.removeItem('userName')
            localStorage.removeItem('ifAdmin')
            localStorage.removeItem('token');
        } else {

        }
        window.location.assign('')
    }

    render() {
        const { path} = { ...this.state }
        const { ifAdmin, userName, userImg } = { ...this.props }
        const mainNav = [
            {
                title: '个人主页',
                url: '/home',
                active: false
            },
            {
                title: '博客',
                url: '/pages/Pubilcblog',
                active: false
            },
            {
                title: '成果展示',
                url: '/display',
                active: false
            }
        ]
        const renderActiveNav = (fixedPath, currentPath = path) => {
            let className = 'main-nav'
            if (currentPath === fixedPath) {
                className = 'main-nav main-nav--active'
            }
            return className;
        }
        return (

            <div className="header">
                <div className='header-content'>
                    <a className='logo' href=' '>
                        <img width='120' height='36' src={require('../../static/head-nmid-logo.png')} alt="" /></a>

                    {
                        mainNav.map((navItem, index) => {
                            return (
                                <span className={renderActiveNav(navItem.url)} key={index}>
                                    <Link to={navItem.url}>{navItem.title}</Link>
                                </span>
                            )
                        })
                    }
                    <span className={(path.includes('/file-share') || path === '/meeting' || path === '/vip-source') ? 'main-nav--active main-nav-file main-nav' : 'main-nav-file main-nav'}>
                        资源共享
                <FileDrop />
                    </span>
                    <span className='main-nav main-nav-login'>
                        <span className='usr-portrait'>
                            <img className='usr-portrait-img' src={userName ? userImg : require('../../static/usr-por.png')} alt="" />
                            <img className={ifAdmin ? 'usr-vip-icon' : 'usr-vip-icon-none'} src={require('../../static/vip.png')} alt="" />
                        </span>
                        <span className='usr-name'>{userName ? userName : `游客`}</span>
                        <button
                            onClick={this.handleLogState.bind(this)}
                            className='exit-button'>
                            <a src=''>
                                {userName ? `退出` : `点击登录`}
                            </a>
                        </button>
                    </span>
                </div>


            </div>
        );
    }
}

const Header = connect(({ logger }) => {
    return {
        ifAdmin: logger.ifAdmin,
        userName: logger.userName,
        userImg: logger.userImg
    }

}, (dispatch) => ({
    checkAdmin(ifAdmin) {
        dispatch(checkAdmin(ifAdmin))
    },
    setUser(name) {
        dispatch(setUser(name))
    },
    setImg(url) {
        dispatch(setImg(url))
    }
}))(Header_)

export default Header;