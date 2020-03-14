import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'

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


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/home" exact component={Homepage} /> 
                <Route path="/pages/Summary" component={Summary} />
                <Route path="/pages/Personmessage" component={Personmessage} />
                <Route path="/pages/Personword" component={Personword} />
                <Route path="/pages/Personblog" component={Personblog} />
                <Route path="/pages/Pubilcblog" component={Pubilcblog} />
                <Route path="/pages/Pubilcidea" component={Pubilcidea} />
                <Route path='/file-share' component={FileShare}></Route>
                <Route path='/display' component={Display}></Route>
                <Route path='/meeting' component={Meeting}></Route>
                <Route path='/vip-source' component={VipSource}></Route>
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default Index;
