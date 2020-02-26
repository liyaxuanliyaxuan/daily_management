import React, { Component } from 'react';

class VipInfo extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            path:this.props.location.pathname,
            vipName:this.props.match.params.vipName,
            VipInfoList:[]
         }
        this.VipInfoList = [
            {
                num:'123456789',
                passwrd:'987654321',
                deadTime:'2021.10.3'
            },
            {
                num:'123456789',
                passwrd:'987654321',
                deadTime:'2021.10.3'
            },
            {
                num:'123456789',
                passwrd:'987654321',
                deadTime:'2021.10.3'
            },
            {
                num:'123456789',
                passwrd:'987654321',
                deadTime:'2021.10.3'
            },
            {
                num:'123456789',
                passwrd:'987654321',
                deadTime:'2021.10.3'
            },
            {
                num:'123456789',
                passwrd:'987654321',
                deadTime:'2021.10.3'
            },
            {
                num:'123456789',
                passwrd:'987654321',
                deadTime:'2021.10.3'
            }
        ]
    }
    componentDidMount(){
     
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