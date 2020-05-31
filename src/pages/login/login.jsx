import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'


import Axios from '../../axios'

import { connect } from 'react-redux'
import { checkAdmin, setUser } from '../../actions/logger'

import './login.css'

import paintCanvas from './paintCanvas'



class Login_ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '', 
        }
        this.canvas = React.createRef()
    }
    componentWillMount() {
       


    }
    componentDidMount() {

        const that = this
        paintCanvas(that)
        // window.history.pushState(null, null, document.URL);
        // window.addEventListener('popstate',function () {
        //     window.history.pushState(null, null, document.URL);
        // })


    }
    componentWillUnmount() {

        // window.removeEventListener('popstate',function () {
        //     window.history.pushState(null, null, document.URL);
        // })
    }
    handleChange(name, e) {
        let newState = {}
        newState[name] = e.target.value
        this.setState(
            newState
        )
    }
    handleSubmit() {
        const { ifAdmin, userName, checkAdmin, setUser } = { ...this.props }
    

        //表单验证

        //发送请求
        const { username, password } = { ...this.state }

        // let user = that.$qs.stringify({
        //     password,
        //     username
        // })
        const userData = JSON.stringify(
            {
                username,
                password
            }
        )

        this.$axios.post(`/login`, userData,
            {

                headers: { 'Content-Type': 'application/json' }
            })
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setUser(username)
                    if (username === 'admin'){
                       checkAdmin(true);//根据名字判断是否是管理员身份 
                       localStorage.setItem('ifAdmin', '1')
                    } 
                    localStorage.setItem('token', res.data)//TODO
                    localStorage.setItem('userName', username)
                    Axios.defaults.headers.common['token'] = window.localStorage.getItem('token')
                    window.location.assign('/#/home')
             

                } else {
                    alert(res.message)
                }

            }).catch((err) => {
                console.log(err);
            })


    }
    handleEnterBtn(e) {
        if (e.keyCode === 13) {
            this.handleSubmit()
        }
    }
    render() {
        const { username, password } = { ...this.state }
        const { userName } = { ...this.props }

        return (
            
            <div className='login-page'>
                <img className='login-illus' src={require('./imgs/login-inluustration.png')} alt="" />
                <canvas width='720' height='714' ref={this.canvas}>
                </canvas>
                <div className='content'>
                    <div className='usr-content'>
                        <span className='login-icon'><img src={require('./imgs/login-logo.png')} alt="" /></span>
                        <form className='usr-login-form' type='' method='POST'>
                            <span>
                                <i className='usr-icon'></i>
                                <input
                                    onChange={this.handleChange.bind(this, 'username')}
                                    onKeyDown={this.handleEnterBtn.bind(this)}
                                    className={'name-input'}
                                    value={username}
                                    name='username'
                                    type="text"
                                    placeholder='用户名'
                                    autoComplete='off' />
                            </span>
                            <span>
                                <i className='pass-icon'></i>
                                <input
                                    onChange={this.handleChange.bind(this, 'password')}
                                    onKeyDown={this.handleEnterBtn.bind(this)}
                                    className={'pass-input'}
                                    value={password}
                                    name='password'
                                    type="password"
                                    placeholder='密码'
                                    autoComplete='off' />
                            </span>
                            <button
                                onClick={this.handleSubmit.bind(this)}
                                className='login-button'
                                type='button'>
                                登录
                                </button>
                        </form>
                    </div>
                </div>
                <div className='footer'>
                <a target='_blank' href='http://www.beian.miit.gov.cn'>渝ICP备19017063号</a>
            </div>
            </div>)
        
    }

}


const Login = connect(({logger}) => {
    return ({
        ifAmin: logger.ifAdmin,
        userName: logger.userName
    })

}, (dispatch) => (
    {
        checkAdmin(ifAdmin) {
            dispatch(checkAdmin(ifAdmin))
        },
        setUser(name) {
            dispatch(setUser(name))
        }

    }
))(Login_)

export default Login;