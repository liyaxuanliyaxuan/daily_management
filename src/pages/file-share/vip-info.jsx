import React, { Component } from 'react';

class VipInfo extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            path:this.props.location.pathname,
            vipName:this.props.match.params.vipName
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
    render() { 
        return (<main className='vip-info'>
            <div className='vip-title'>
                <i></i>
                <div className='vip-img'>
                    <img width='82' height='22' src={require('../../static/爱奇艺-01.png')} alt=""/>
                </div>
                <p className='vip-url'>网址：<a href="">https://www.iqiyi.com</a></p>
            </div>
            <div className='vip-info-list'>
                {
                    this.VipInfoList.map((item, index) =>{
                        return(
                            <div key={item.num} className='vip-info-list-item'>
                                <p className='vip-num'>账号：{item.num}</p>
                                <p className='vip-pass'>密码：{item.passwrd}</p>
                                <p className='vip-time'>截至日期：{item.deadTime}</p>
                            </div>
                        )
                    })
                }

            </div>
        </main> );
    }
}
 
export default VipInfo;