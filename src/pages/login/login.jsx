import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import cookie from 'react-cookies'
import axios from 'axios'
import './login.scss'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
            ifLogin:false,
            usrId:''
         }
        this.canvas = React.createRef()
    }
    componentWillMount() {
        this.state.ifLogin = cookie.load('cid')
        this.state.usrId = cookie.load('cid')
        
      }
    componentDidMount(){
        const canvas = this.canvas.current;
        if (canvas&&canvas.getContext) {
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = '#bce0f0';
            ctx.shadowOffsetX = 20;
            ctx.shadowOffsetY = -10;
            ctx.shadowBlur = 14;
            ctx.shadowColor = "#b9ddef";
            ctx.strokeStyle = '#fff'
            ctx.beginPath();
            ctx.moveTo(468, 0);
            ctx.lineTo(572, 28);
            ctx.lineTo(0,28);
            ctx.lineTo(0, 0);
            ctx.fill();
            ctx.shadowOffsetY = 0;
            ctx.shadowOffsetX = 20;
            ctx.shadowBlur = 14;
       
            ctx.beginPath();
            
            ctx.moveTo(572, 28);
            ctx.lineTo(408, 714);
            ctx.lineTo(0, 714);
            ctx.lineTo(0, 0);
            ctx.fill();
       

            ctx.shadowColor = "#b9ddef";
            ctx.beginPath();
            ctx.moveTo(468, 0);
            ctx.lineTo(572, 28);
            ctx.lineTo(408, 714);
            ctx.stroke();
    

        }

    }
    handleChange(name,e){
        let newState = {}
        newState[name] = e.target.value
        this.setState(
            newState
        )
    }
    handleSubmit(){
        
            axios.defaults.baseURL = ''
            axios.post('/login',{
            password:this.state.password,
            username:this.state.username,
            
        }).then((res)=>{
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
        })
    }
    render() { 
        let {username, password, ifLogin} = {...this.state}
      if(ifLogin){
          return(
              <Redirect to='/file-share'></Redirect>
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
                          value={password}
                          name='password' 
                          type="password"
                           placeholder='密码' 
                           autoComplete='off'/>
                          </span>
                      <button 
                      onClick={this.handleSubmit.bind(this)}
                      className='login-button'
                        type='button'>登录</button>
                  </form>
              </div>
            
          </div>
            
        </div>
          )
      }
    }
}
 
export default Login;