import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import {Modal, message} from 'antd'

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
            meetingList:[]
         }
       
    }
    componentDidMount(){
        const path = this.props.location.pathname
        const _this = this
        if(path.includes('all')){

            this.$axios.get('/infoshare/alldoc')
            .then((res)=>{
    
                _this.setState({
                    meetingList: res.data
                })
                localStorage.setItem('meetingList',JSON.stringify(res.data))
    
            }).catch((err)=>{
                console.log(err);
            })

        }else if(path.includes('prj')){

            this.$axios.get('/infoshare/doc1')
            .then((res)=>{
    
                _this.setState({
                    meetingList: res.data
                })
                
    
            }).catch((err)=>{
                console.log(err);
            })

        }else if(path.includes('tech')){

            this.$axios.get('/infoshare/doc2')
            .then((res)=>{
    
                _this.setState({
                    meetingList: res.data
                })
            
    
            }).catch((err)=>{
                console.log(err);
            })

        }else if(path.includes('meet-record')){

            this.$axios.get('/infoshare/doc3')
            .then((res)=>{
    
                _this.setState({
                    meetingList: res.data
                })
              
            }).catch((err)=>{
                console.log(err);
            })

        }else if(path.includes('search')){
            this.setState({
                meetingList: JSON.parse(localStorage.getItem('meetSearch'))
            })
        }
        else{
            return null
        }
   
    }
    componentWillReceiveProps(nextprops){
        const nextPathName = nextprops.location.pathname
        const currentPathName = this.props.location.pathname
        const _this = this
        if( nextPathName !== currentPathName){

            if(nextPathName.includes('all')){

                this.$axios.get('/infoshare/alldoc')
                .then((res)=>{
        
                    _this.setState({
                        meetingList: res.data
                    })
                    localStorage.setItem('meetingList',JSON.stringify(res.data))
        
                }).catch((err)=>{
                    console.log(err);
                })
    
            }else if(nextPathName.includes('prj')){
    
                this.$axios.get('/infoshare/doc1')
                .then((res)=>{
        
                    _this.setState({
                        meetingList: res.data
                    })
                    
        
                }).catch((err)=>{
                    console.log(err);
                })
    
            }else if(nextPathName.includes('tech')){
    
                this.$axios.get('/infoshare/doc2')
                .then((res)=>{
        
                    _this.setState({
                        meetingList: res.data
                    })
                
        
                }).catch((err)=>{
                    console.log(err);
                })
    
            }else if(nextPathName.includes('meet-record')){
    
                this.$axios.get('/infoshare/doc3')
                .then((res)=>{
        
                    _this.setState({
                        meetingList: res.data
                    })
                  
                }).catch((err)=>{
                    console.log(err);
                })
    
            }else if(nextPathName.includes('search')){
                this.setState({
                    meetingList: JSON.parse(localStorage.getItem('meetSearch'))
                })
            }
            else{
                return null
            }

        }else{
            return null

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
                                window.location.href = item.fpath
                                console.log(item);
                                                           
                            }}
                            key={item.fid+`${index}`} 
                            className='meeting-list-item'>
                                <div className='file-list-item-img'>
                                    <a className='file-list-item-img-a' href={item.fpath}>
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
        const meetingNavIndex = localStorage.getItem('meetingNavIndex') || '0'
        switch(meetingNavIndex){
            case '0':this.setState({
                meetingNav:'all'
            })
            break;
            case '1':this.setState({
                meetingNav:'prj'
            })
            break;
            case '2':this.setState({
                 meetingNav:'tech'
            })
            break;
            case '3':this.setState({
                meetingNav:'meet-record'
            })
            break;
           
        }
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