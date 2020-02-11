import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configStore from './store'
import Index from './pages/index/index'
import './app.scss'

const store = configStore()

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <Provider store={ store }>
               <div className="App">
               <Index/>
            </div> 
            </Provider>
            </BrowserRouter>
        )
    }
}