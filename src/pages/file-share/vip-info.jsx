import React, { Component } from 'react';
import axios from 'axios'

class VipInfo extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
           
            vipName:this.props.match.params.vipName,
            VipInfoList:[]
         }
    }
    getRenderVipList = (path) =>{

        if(path.includes('search')){
            this.setState({
                vipInfoList:JSON.parse(localStorage.getItem('vipSearch'))
            })
        }else{
            const _this = this
            this.$axios.get(`/infoshare/findvip?vnam=${this.state.vipName}`
            )
            .then((res)=>{
    
                _this.setState({
                    VipInfoList: res.data
                })
    
            }).catch((err)=>{
                console.log(err);
            })
        }


    }
    componentDidMount(){
    const path = this.props.location.pathname
     this.getRenderVipList(path)

    }
    render() { 
        const { VipInfoList, vipName } = {...this.state}
        return (<main className='vip-info'>
            <div className='vip-title'>
                <i></i>
                <div className='vip-img'>
                   {vipName}
                </div>
                <p className='vip-url'>网址：<a href="">https://www.iqiyi.com</a></p>
            </div>
            <div className='vip-info-list'>
                {
                    VipInfoList.map((item, index) =>{
                        return(
                            <div key={item.vid} className='vip-info-list-item'>
                                <p className='vip-num'>账号：{item.vaccount}</p>
                                <p className='vip-pass'>密码：{item.vpassword}</p>
                                <p className='vip-time'>截至日期：{item.endTime}</p>
                            </div>
                        )
                    })
                }

            </div>
        </main> );
    }
}
 
export default VipInfo;