import React, { Component } from "react";
import { Route, Switch} from 'react-router-dom'

import Login from '../login/login'

import NotFound from '../not-found/not-found'
import FileShare  from '../file-share/file-share'
import VipSource from '../file-share/vip-source'
import Meeting from '../file-share/meeting'
import VipInfo from '../file-share/vip-info'
import Display from "../display/display";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/file-share' component={FileShare}></Route>
                <Route path='/display' component={Display}></Route>
                <Route path='/meeting' component={Meeting}></Route>
                <Route path='/vip-source' component={VipSource}></Route>
                <Route  component={NotFound}/>
            </Switch>
         );
    }
}
 
export default Index;
