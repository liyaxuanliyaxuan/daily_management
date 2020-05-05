import React, { Component } from 'react';


class VipInfo extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
           
            vipName:this.props.match.params.vipName,
            vipInfoList:[]
         }
         
    }
  
    componentDidMount(){
    const path = this.props.location.pathname
    const getRenderVipList = ((path) =>{

        if(path.includes('search')){
            this.setState({
                vipInfoList:JSON.parse(localStorage.getItem('vipSearch')),
                vipName:JSON.parse(localStorage.getItem('vipSearch'))[0].vnam
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


    })(path);
   

    }
    render() { 
        const { vipInfoList, vipName } = {...this.state}
        return (<main className='vip-info'>
            <div className='vip-title'>
                <i></i>
                <div className='vip-img'>
                   {vipName}
                </div>
                {/* <p className='vip-url'>网址<a href=""></a></p> */}
            </div>
            <div className='vip-info-list'>
                {
                    vipInfoList.map((item, index) =>{
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