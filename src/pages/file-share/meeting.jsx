import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import {Modal} from 'antd'

import Header from '../../components/header/header'

import Search from '../../components/search/search'

import SecondNav from '../../components/second-nav/second-nav'


import UpLoadMeetingModal from './modals/meeting-modal'

class MeetingList extends Component {
    constructor(props) {
        super(props);
  
        this.state = { 
            path:this.props.location.pathname,//根据path请求数据list//此处父组件props改变不能影响他的state，使用时用props来区分，请求数据

            MeetingModalVisible: false,
         }
        this.meetingList = [
            {
                pic:'',
                name:'前端技术交流',
                time:'2020.2.2'
            },
            {
                pic:'',
                name:'前端技术交流',
                time:'2020.2.2'
            },
            {
                pic:'',
                name:'前端技术交流',
                time:'2020.2.2'
            },
            {
                pic:'',
                name:'前端技术交流',
                time:'2020.2.2'
            },
            {
                pic:'',
                name:'前端技术交流',
                time:'2020.2.2'
            },
            {
                pic:'',
                name:'前端技术交流',
                time:'2020.2.2'
            }
        ]
    }
    handleMeetOk = e => {
        this.setState({
            MeetingModalVisible: false,
        });
    };
    handleMeetCancel = e =>{
        this.setState({
            MeetingModalVisible:false
      })
    }
    render() { 
        const { MeetingModalVisible } = {...this.state}
        return ( 
            <main className='meeting-list'>
                <UpLoadMeetingModal
                handleCancel = {this.handleMeetCancel.bind(this)}
                handleOk = {this.handleMeetOk.bind(this)}
                visible={MeetingModalVisible}/>
                <div 
                onClick={()=>{
                    this.setState({
                        MeetingModalVisible: !MeetingModalVisible
                    })
                }}
                className='addBtn meeting-list-item'>
                    <img src={require('../../static/add-icon.png')} alt=""/>
                </div>
                {
                    this.meetingList.map((item, index) =>{
                        return(
                            <div
                            onClick={()=>{alert(`点击下载${item.name}`)}}
                            key={item.name+index} 
                            className='meeting-list-item'>
                                <div className='file-list-item-img'>
                                    <img width='180' height='144' src={require('../../static/bk-null.png')} alt=""/>
                                    </div>
                                    <div className='meeting-list-detail'>
                                    <p className='meet-name'>{item.name}</p>
        
                                    <p className='meet-time'>{item.time}</p>
                                    </div>
                            </div>
                        )
                    })
                }

            </main>
         );
    }
}




class Meeting extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            path: this.props.location.pathname
         }
    }
    render() { 
        let { path } = {...this.state}
        return ( <div>
            <Header path={ path }/>
            <Search path={ path }/>
            <SecondNav path={ path }/>
            <Switch>
                <Route exact path='/meeting'>
                    <Redirect to='/meeting/all'></Redirect>
                </Route>
                <Route path='/meeting/all' component={ MeetingList }></Route>
                <Route path='/meeting/prj' component={ MeetingList }></Route>
                <Route path='/meeting/tech' component={ MeetingList }></Route>
                <Route path='/meeting/meet-record' component={ MeetingList }></Route>
                
            </Switch>
            会议
        </div> );
    }
}
 
export default Meeting;