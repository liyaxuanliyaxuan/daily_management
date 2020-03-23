import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import createHistory from 'history/createHashHistory'


import configStore from './store'
import Index from './pages/index/index'
import './app.scss'

const store = configStore()
const history = createHistory()
export default class App extends Component {
    render() {
        return (
            <HashRouter history={history}>
            <Provider store={ store }>
               <div className="App">
               <Index/>
            </div> 
            </Provider>
            </HashRouter>
        )
    }
}