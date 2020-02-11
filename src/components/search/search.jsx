import React, { Component } from 'react';
import './search.scss'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            path: this.props.path,
            value:'',
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

        this.setState({
            value:e.target.value
        })
        let path = this.state.path
        if (path.includes('/meeting')) {
            
        } else if (path.includes('/file-share')) {
            
        } else if (path.includes('/vip-source')) {
            
        } else {
            return null;
        }
        
    }
    handleClickBtn(){
        
    }
    render() { 
        let {path, value, placeTxt} = {...this.state}
        return ( 
            <div className='search'>
                <i></i>
                <input onChange={this.handleInput.bind(this)}
                 type="text" 
                 value={value}
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