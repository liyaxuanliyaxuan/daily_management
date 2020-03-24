import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import { message} from 'antd'

import Header from '../../components/header/header'

import Search from '../../components/search/search'

import SecondNav from '../../components/second-nav/second-nav'


import UpLoadMeetingModal from './modals/meeting-modal'

class MeetingList extends Component {
    static defaultProps = {
        test:''
    }
    constructor(props) {
        super(props);
  
        this.state = { 
            //path:this.props.location.pathname,//根据path请求数据list//此处父组件props改变不能影响他的state，使用时用props来区分，请求数据

            MeetingModalVisible: false,
            meetingList:[]
         }
       
    }
    renderMeetingList = ((path) =>{
    
 
        const pathToUrl = new Map([
            ['all','/infoshare/alldoc'],
            ['tech','/infoshare/doc1'],
            ['prj','/infoshare/doc2'],
            ['meet-record','/infoshare/doc3']
        ])
        if(path.includes('search')){
            this.setState({

                meetingList: JSON.parse(localStorage.getItem('meetSearch'))
            })
            
        }
        pathToUrl.forEach((url,key)=>{
            if(path.includes(key)){
                this.$axios.get(url)
                .then((res)=>{
        
                   this.setState({
                       meetingList: res.data
                   })
                }).catch((err)=>{
                    console.log(err);
                })
            }
        })
       
    })
    componentDidMount(){
        const path = this.props.location.pathname
        this.renderMeetingList(path)
     
    }
    componentWillReceiveProps(nextprops){
        const nextPathName = nextprops.location.pathname
        const currentPathName = this.props.location.pathname
    
        if( nextPathName !== currentPathName){
            this.renderMeetingList(nextPathName)

    }
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
        const { MeetingModalVisible, meetingList } = {...this.state}
        return ( 
            <main className='meeting-list'>
                <UpLoadMeetingModal
                handleCancel = {this.handleMeetCancel}
                handleOk = {this.handleMeetOk}
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
                    meetingList.map((item, index) =>{
                        return(
                            <div
                            onClick={()=>{
                               
                                message.success(`为您下载：${item.fname}~`);
                                window.open(item.fpath)
                                
                                console.log(item);
                                                           
                            }}
                            key={item.fid+`${index}`} 
                            className='meeting-list-item'>
                                <div className='file-list-item-img'>
                                    <a className='file-list-item-img-a' href={item.fpath} download>
                                    <img width='180' height='144' src={item.ftype==='会议纪要'?require('../../static/会议纪要 .png'):null} alt=""/>
                                    </a>
                                    </div>
                                    <div className='meeting-list-detail'>
                                    <p className='meet-name'>{item.fname}</p>     
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
            path: this.props.location.pathname,
            meetingNav:''
           
         }
    }
    componentDidMount(){
        const meetingNavIndex = JSON.parse(localStorage.getItem('meetingNavIndex')) || 0
        const meetingNavArr = ['all','prj','tech','meet-record']
        this.setState({
            meetingNav: meetingNavArr[meetingNavIndex]
        })
    }
    render() { 
        let { path, meetingNav } = {...this.state}
        return ( <div>
            <Header path={ path }/>
            <Search path={ path } />
            <SecondNav 
            path={ path } 
            />
            <Switch>
                <Route exact path='/meeting'>
                <Redirect to={`/meeting/${meetingNav}`}></Redirect>
                </Route>
                <Route path='/meeting/all' component={ MeetingList }></Route>
                <Route path='/meeting/prj' component={ MeetingList }></Route>
                <Route path='/meeting/tech' component={ MeetingList }></Route>
                <Route path='/meeting/meet-record' component={ MeetingList }></Route>
                <Route path='/meeting/search' component={ MeetingList}></Route>
            </Switch>

        </div> );
    }
}
 
export default Meeting;