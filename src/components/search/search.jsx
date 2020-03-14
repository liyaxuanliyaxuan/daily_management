import React, { Component } from 'react';
import './search.scss'
import Meeting from '../../pages/file-share/meeting';
import axios from 'axios'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            path: this.props.path,
            currentValue:'',
            value:{
                meeting:'',
                file:'',
                vip:''
            },
            placeTxt:''
         }
    }
    componentDidMount() {
        let path = this.state.path
        if (path.includes('/meeting')) {
            this.setState({
                placeTxt: '搜索会议资源。。。'
            })
        } else if (path.includes('/file-share')) {
            this.setState({
                placeTxt: '搜索书籍资源。。。'
            })
        } else if (path.includes('/vip-source')) {
            this.setState({
                placeTxt: '搜索会员资源。。。'
            })
        } else {
            return null;
        }
    }
    handleInput(e){

        let path = this.state.path
        this.setState({
            currentValue:e.target.value
        })
        if (path.includes('/meeting')) {
            this.setState({
                value:{
                    ...this.state.value,
                    meeting:e.target.value
                }
            })
            
        } else if (path.includes('/file-share')) {
            this.setState({
                value:{
                    ...this.state.value,
                    file:e.target.value
                }
            })
            
        } else if (path.includes('/vip-source')) {
            this.setState({
                value:{
                    ...this.state.value,
                   vip:e.target.value
                }
            })
            
        } else {
            return null;
        }
        
    }
    handleClickBtn(){
        //搜索\存储\跳转
        //if(res.code === 200)才进行跳转
        const {meeting, file, vip} = {...this.state.value}
        const _this = this
        let path = this.state.path
        if (path.includes('/file-share')) {
           axios.get(`http://39.105.232.155:8081/infoshare/findbook?bname=${file}`)
            .then((res)=>{

                console.log(res);
                localStorage.setItem('fileSearch',JSON.stringify(res.data))
                // window.location.assign('/meeting/search')
                if(res.code == 200){

                    window.location.assign(`/file-share/search/${file}`)
                }else{
                    return null
                }
            })
            .catch((err)=>{
                console.log(err);
            })
            
        } else if (path.includes('/meeting')) {
           axios.get(`http://39.105.232.155:8081/infoshare/finddoc?fname=${meeting}`)
            .then((res)=>{

                console.log(res);
                localStorage.setItem('meetSearch',JSON.stringify(res.data))
                // window.location.assign('/file-share/search')
                if(res.code == 200){

                    window.location.assign(`/meeting/search/${meeting}`)
                }else{
                    return null
                }
            })
            .catch((err)=>{
                console.log(err);
            })
            
        } else if (path.includes('/vip-source')) {
            axios.get(`http://39.105.232.155:8081/infoshare/findvip?vnam=${vip}`)
            .then((res)=>{

                console.log(res);
                localStorage.setItem('vipSearch',JSON.stringify(res.data))
                if(res.code == 200){

                    window.location.assign(`/vip-source/search/${vip}`)
                }else{
                    return null
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
           
        } else {
            return null;
        }
        
    }
    handleEnterBtn(e){

        if(e.keyCode === 13){
            this.handleClickBtn()
        }
    }
    render() { 
        let {path, currentValue, placeTxt} = {...this.state}
        return ( 
            <div className='search'>
                <i></i>
                <input  
                onKeyDown={this.handleEnterBtn.bind(this)}
              
                onChange={this.handleInput.bind(this)}
                 type="text" 
                 value={currentValue}
                 name=""
                  className='search-input'  
                  placeholder={ placeTxt }
                   id=""/>
                <button 
                onClick={this.handleClickBtn.bind(this)}
             
                className='search-btn'>搜索</button>
            </div>
         );
    }
}
 
export default Search;