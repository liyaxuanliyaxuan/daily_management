/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom'

import cookie from 'react-cookies'

import './header.scss'




const FileDrop = (props) => {

    return (
        <div className='filedrop'>
            <Link className='file-drop-item' to={`/file-share`}>书籍借阅</Link>
            <Link className='file-drop-item' to='/vip-source'>会员资源</Link>
            <Link className='file-drop-item' to='/meeting'>会议资料</Link>
        </div>
    )

}


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: this.props.path,
            ifAdmin: false,
            ifLogin: '',//username
            imgUrl:''
        }

    }
    componentWillMount() {
        this.state.ifLogin = cookie.load('ifLogin')
    }
    componentDidMount(){
        const _this = this
       let ifAdmin = (this.state.ifLogin && sessionStorage.getItem('ifAdmin'))?true:false
       let username = cookie.load('ifLogin')
       this.$axios.get(`/user/getUserInfoByUnam?username=${username}`).then(res=>{
           _this.setState({ 
               imgUrl:res.data.upath
           })
       })
        this.setState({
            ifAdmin
        })

    }
    handleLogState() {
        if (this.state.ifLogin) {
            cookie.remove('ifLogin', { path: '/' })
            localStorage.removeItem('token');
        } else {


        }
        window.location.assign('/#/')
    }

    render() {
        const { path, ifLogin, ifAdmin, imgUrl } = { ...this.state }
        const { fileNav } = { ...this.props }
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
                            <img className='usr-portrait-img' src={ifLogin?imgUrl:require('../../static/usr-por.png')} alt="" />
                            <img className={ifAdmin? 'usr-vip-icon':'usr-vip-icon-none'} src={require('../../static/vip.png')} alt=""/>
                            </span>
                        <span className='usr-name'>{ifLogin ? ifLogin : `游客`}</span>
                        <button
                            onClick={this.handleLogState.bind(this)}
                            className='exit-button'>
                            <a src=''>
                                {ifLogin ? `退出` : `点击登录`}
                            </a>
                        </button>
                    </span>
                </div>


            </div>
        );
    }
}

export default Header;