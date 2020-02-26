import React, { Component } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom'

import cookie from 'react-cookies'

import './header.scss'




const FileDrop = (props) =>{
 
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
            path:this.props.path,
            ifLogin:''//username
            
        }
      
    } 
    componentWillMount(){
        this.state.ifLogin = cookie.load('ifLogin')
    }   
    handleLogState(){
        if(this.state.ifLogin){

          cookie.remove('ifLogin',{path:'/'})
        }else{
        
            
        }
    }
    
    render() { 
        const { path, ifLogin } = { ...this.state }
        const { fileNav } = {...this.props}
        return ( 
            <div className="header">
                <div className='header-content'>
                    <a className='logo' href=' '><img width='120' height='36' src={require('../../static/head-nmid-logo.png')} alt=""/></a>
                
                <span className={path==='/personal'?'main-nav main-nav--active':'main-nav'}>
                    个人主页</span>
                <span className={path ==='/blog'?'main-nav main-nav--active':'main-nav'}>
                    博客</span>
                <span className={path ==='/display'?'main-nav main-nav--active':'main-nav'}>
                    <Link to='/display'>
                        成果展示
                        </Link>
                        </span>
                <span className={(path.includes('/file-share')||path==='/meeting'||path==='/vip-source')?'main-nav--active main-nav-file main-nav':'main-nav-file main-nav'}>
                    资源共享
                <FileDrop />
                </span>
                <span className='main-nav main-nav-login'>
                    <span className='usr-portrait'>
                        <img width='42' height='42' src={ require('../../static/usr-por.png')} alt=""/></span>
                    <span className='usr-name'>{ifLogin?ifLogin:`游客`}</span>
                    <button 
                    onClick={this.handleLogState.bind(this)}
                    className='exit-button'>
                        <Link to={ifLogin?'/display':'/'}>
                        {ifLogin?`退出`:`点击登录`}
                        </Link>
                    </button>
                    </span>
                </div>
                
               
            </div>
         );
    }
}
 
export default Header;