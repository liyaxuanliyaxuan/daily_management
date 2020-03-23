import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import cookie from 'react-cookies'

import './login.css'
import sendLoginForm from './sendUserForm'
import paintCanvas from './paintCanvas'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
            ifLogin:false,
            
         }
        this.canvas = React.createRef()
    }
    componentWillMount() {
        this.state.ifLogin = cookie.load('ifLogin')
        
        
      }
    componentDidMount(){
  
        const that = this
        paintCanvas(that)

  
    }
    componentWillUnmount(){
        
    }
    handleChange(name,e){
        let newState = {}
        newState[name] = e.target.value
        this.setState(
            newState
        )
    }
    handleSubmit() {

        //表单验证

        //发送请求
        const that = this  
        sendLoginForm(that)
        //window.location.assign('/#/home')

    }
    handleEnterBtn(e){
        if(e.keyCode === 13){
            this.handleSubmit()
        }
    }
    render() { 
        let {username, password, ifLogin} = {...this.state}
      if(ifLogin){
          return(
              <Redirect to='/home'></Redirect>
          )
      }else{
          return(
            <div className='login-page'>
        
            <img className='login-illus' src={require('./imgs/login-inluustration.png')} alt=""/>
            <canvas width='588' height='714' ref={this.canvas}>
            </canvas>
            
          <div className='content'>
              <div className='usr-content'>
                  <span className='login-icon'><img src={require('./imgs/login-logo.png')} alt=""/></span>
                  <form className='usr-login-form' type='' action="http://localhost:3003" method='POST'>
                      <span>
                          <i className='usr-icon'></i>
                          <input 
                          onChange={this.handleChange.bind(this, 'username')}
                          onKeyDown={this.handleEnterBtn.bind(this)}
                          value={username}
                           name='username' 
                           type="text" 
                           placeholder='用户名'
                            autoComplete='off'/>
                          </span>
                      <span>
                          <i className='pass-icon'></i>
                          <input 
                          onChange={this.handleChange.bind(this, 'password')}
                          onKeyDown={this.handleEnterBtn.bind(this)}
                          value={password}
                          name='password' 
                          type="password"
                           placeholder='密码' 
                           autoComplete='off'/>
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
            
        </div>
          )
      }
    }
}
 
export default Login;