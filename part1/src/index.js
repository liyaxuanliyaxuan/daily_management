import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Summary from './pages/Summary';
import Personmessage from './pages/Personmessage';
import Personword from './pages/Personword';
import Personblog from './pages/Personblog';
import Pubilcblog from './pages/Pubilcblog';
import Pubilcidea from './pages/Pubilcidea';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" exact component={Homepage} />  
            <Route path="/pages/Summary" component={Summary} /> 
            <Route path="/pages/Personmessage" component={Personmessage} /> 
            <Route path="/pages/Personword" component={Personword} />    
            <Route path="/pages/Personblog" component={Personblog} /> 
            <Route path="/pages/Pubilcblog" component={Pubilcblog} /> 
            <Route path="/pages/Pubilcidea" component={Pubilcidea} /> 
        </div>
   </Router>
, document.getElementById('root'));

