import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from '../login/login'

import NotFound from '../not-found/not-found'
import FileShare from '../file-share/file-share'
import VipSource from '../file-share/vip-source'
import Meeting from '../file-share/meeting'
import Display from "../display/display";

import Homepage from '../homepage/Homepage';
import Summary from '../summary/Summary';
import Personmessage from '../personalmessage/Personmessage';
import Personword from '../personword/Personword';
import Personblog from '../personalblog/Personblog';
import Pubilcblog from '../publicblog/Pubilcblog';
import Pubilcidea from '../publicidea/Pubilcidea';

import { connect } from 'react-redux'

class Index_ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //ifLogin: localStorage.getItem('userName')
        }
    }
    render() {
        const { userName } = {...this.props}//根据userName判断登录状态
    
        return (
            
            <Switch>
                <Route  exact path='/' component={Login} />
                <Route path={"/home"}>
                { userName?<Homepage/>:<Redirect to='/'/>} 
                </Route>
                <Route path="/pages/Summary" >
                { userName?<Summary/>:<Redirect to='/'/>} 
                </Route>
                <Route path="/pages/Personmessage" >
                { userName?<Personmessage/>:<Redirect to='/'/>} 
                </Route>
                <Route path="/pages/Personword/:state" component={Personword} />
                <Route path="/pages/Personblog" >
                { userName?<Personblog/>:<Redirect to='/'/>} 
                </Route>
                <Route path="/pages/Pubilcblog" >
                { userName?<Pubilcblog/>:<Redirect to='/'/>} 
                </Route>
                <Route path={"/pages/Pubilcidea/:state"}  component={Pubilcidea}>
               
                </Route>
                <Route path='/file-share' component={FileShare}></Route>
                <Route path='/display' component={Display}></Route>
                <Route path='/meeting' component={Meeting}></Route>
                <Route path='/vip-source' component={VipSource}></Route>
        
                <Route component={NotFound} />
            </Switch>
        );
    }
}

const Index = connect(({logger})=>{
    return{
        userName:logger.userName
    }

},()=>{

})(Index_)

export default Index;
