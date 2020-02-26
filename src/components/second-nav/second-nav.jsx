import React, { Component } from 'react';
 
import {Switch, Route, Link} from 'react-router-dom'

import './second-nav.scss'

const meetingNav = [{name:'全部', key:'all'},{name:'项目汇报',key:'prj'},{name:'技术交流',key:'tech'},{name:'会议纪要',key:'meet-record'}]
const fileNav=[{name:'服务器',key:'server'},{name:'产品',key:'product'}, {name:'客户端',key:'client'},{name:'硬件',key:'hardware'}]

class SecondNav extends Component {
    constructor(props) {
        super(props);     
        this.state = { 
            path:this.props.path,
            fileNavIndex: 0,
            meetingNavIndex: 0,
         }       
    }
    componentDidMount(){
        this.setState({
            fileNavIndex: localStorage.getItem('fileNavIndex')||0,
            meetingNavIndex: localStorage.getItem('meetingNavIndex')||0,
        })
    }

    render() { 
        const { path, fileNavIndex, meetingNavIndex } = {...this.state}
       
        return (  
            <ul className='second-nav'>
                <Switch>
                    <Route path='/file-share'>
                        {
                            fileNav.map((item, index) => {
                                return (
                                    <li key={index+item.key} 
                                    onClick={()=>{
                                        this.setState({
                                            fileNavIndex: index,
                                            

                                        })
                                        localStorage.setItem('fileNavIndex',index)
                                    }}
                                    className={(fileNavIndex==index)?'second-nav-item--active':'second-nav-item'} 
                                    >
                                        <Link to={'/file-share/'+item.key}>{ item.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </Route>
                    <Route path='/meeting'>
                        {
                            meetingNav.map((item, index) =>{
                                return(
                                    <li 
                                    onClick={()=>{
                                        this.setState({
                                            meetingNavIndex: index
                                        })
                                        localStorage.setItem('meetingNavIndex',index)
                                    }}
                                    className={(meetingNavIndex==index)?'second-nav-item--active':'second-nav-item'} 
                                    key={ index+item.key }>
                                    <Link to={'/meeting/'+item.key}>{ item.name }</Link></li>
                                )
                            })
                        }
                    </Route>
                    <Route></Route>
                </Switch>
            </ul>
        );
    }
}
 
export default SecondNav;