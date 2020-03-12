import React, { Component } from 'react';
import './Summary.css'
import axios from 'axios';
import mysummary_logo1 from '../img/mysummary_logo1.png'
import mysummary_logo2 from '../img/mysummary_logo2.png'
import mysummary_logo3 from '../img/mysummary_logo3.png'
import mysummary_logo4 from '../img/mysummary_logo4.png'
import mysummary_logo5 from '../img/mysummary_logo5.png'

var nowid = "" //用于记录当前id

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sign: 0, //////////////////用于触发cmd
            //////////
            dataid: [
                //"1", "2", "3", "4", "5", "6", "7", "8"
            ],

            data: [
                //'2019.12.10', '2019.12.10', '2019.12.10', '2019.12.10', '2019.12.10', '2019.12.10', '2019.12.10', '2019.12.10'
            ],
            //////////////////////////////
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
            ////////////////////////////
        }
    }
    render() {
        return (
            <div>
                <div id="summary_bg">
                    <div id="summary_header">
                        <a href="/" className="summary_header_a summary_header_a3">个人主页</a>
                        <a href="/pages/Pubilcblog" className="summary_header_a summary_header_a1">博客</a>
                        <a className="summary_header_a">资料共享</a>
                        <a className="summary_header_a">成果展示</a>
                        <div className="summary_header_loge"
                            style={{
                                backgroundImage: 'url(' + this.state.userimg + ')'
                            }}
                        ></div>
                        <p>{this.state.username}</p>
                        <a className="summary_header_a2 summary_header_a">退出</a>
                    </div>
                    <div id="mysummary">
                        <p className="mysummary_p1">我的计划与总结</p>
                        <div className="mysummary_body">
                            <div className="mysummary_add"></div>
                            {
                                this.state.data.map((item, index) => {
                                    return (
                                        <div className={"summary_day"} key={index} onClick={this.getPlan.bind(this, this.state.dataid[index])}>
                                            <img className="summary_day_img" src={mysummary_logo1} />
                                            <p className="summary_data">{this.state.data[index]}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="mysummary_hidden">
                            <a onClick={this.mysummaryShow.bind(this)}>展开</a>
                        </div>
                    </div>
                    <div id="summary_submit">
                        <p className="summary_submit_p1">在线提交</p>
                        <textarea className="pensonsummary" placeholder="      个人总结   ......"></textarea>
                        <textarea className="workplan" placeholder="      工作计划   ......"></textarea>
                        <button className="summary_submit_btn1" onClick={this.changeWork.bind(this)}>更改</button>
                        <button className="summary_submit_btn2" onClick={this.submitWork.bind(this)}>提交</button>
                    </div>
                </div>
            </div>
        );
    }

    mysummaryShow() {
        document.querySelector(".mysummary_hidden").style.display = "none"
    }

    //////////////////////////交互

    componentDidMount() {
        let This = this
        axios.get("/user/getUserInfoByUnam?username=admin")
            .then(function (response) {
                This.setState({
                    //////////////获取基本信息
                    realname: response.data.data.realname,
                    username: response.data.data.unam,
                    userimg: response.data.data.upath,
                    tel: response.data.data.phone,
                    qq: response.data.data.qq,
                    weibo: response.data.data.weibo,
                    e_mail: response.data.data.mail

                })
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get("/user/getUserPaSs?username=admin")
            .then(function (response) {
                console.log(response.data.data)
                if(response.data.data.length == 0){
                    This.setState({
                        /////////////获取计划与总结
                        dataid: [],
                        data: []
                    })
                }else{
                    This.setState({
                        /////////////获取计划与总结
                        dataid: response.data.data.id,//////////////////////////////////////////////
                        data: response.data.data.updateTime
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    submitWork() {
        let This = this
        this.state.sign++
        axios.post("/user/updatePlanAndSummary", {
            "plan": document.querySelector(".pensonsummary").value,
            "summary": document.querySelector(".workplan").value,
            "unam": this.state.username,
        })
            .then(function (response) {
                console.log(response.data.data)
                console.log("提交成功")
                This.setState({
                    /////////////
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    changeWork() {
        /////////更改计划和总结
        let This = this
        this.state.sign++
        if(nowid != ""){
            axios.post("/user/updatePlanAndSummary", {
                "id": nowid,
                "plan": document.querySelector(".pensonsummary").value,
                "summary": document.querySelector(".workplan").value,
                "unam": this.state.username,
            })
                .then(function (response) {
                    console.log(response.data.data)
                    console.log("修改成功")
                    This.setState({
                        /////////////
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        
    }

    getPlan(index) {
        /////////获取某一计划和总结的内容
        console.log(index)
        nowid = index;
        axios.get("/user/" + this.state.dataid[index - 1] + "/getDetailPaS?username=admin")
            .then(function (response) {
                console.log(response.data.data)
                document.querySelector(".pensonsummary").value = response.data.data.summary//////////////////////////
                document.querySelector(".workplan").value = response.data.data.plan////////////////////////
            })
            .catch(function (error) {
                console.log(error)
            })

    }
}

export default Summary;