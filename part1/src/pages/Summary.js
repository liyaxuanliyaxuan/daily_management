import React, { Component } from 'react';
import './Summary.css'
import axios from 'axios';
import mysummary_logo1 from '../img/mysummary_logo1.png'
import mysummary_logo2 from '../img/mysummary_logo2.png'
import mysummary_logo3 from '../img/mysummary_logo3.png'
import mysummary_logo4 from '../img/mysummary_logo4.png'
import mysummary_logo5 from '../img/mysummary_logo5.png'

///////////////////////////////////////////////////////////////////////////
////↓↓↓用户名(username),不是真实名字(realname),字符型
var Data = "admin"//admin是默认值，你直接删了就ok
/*
    说明：
        1.我的每一个页面都会有一个这样的变量，这个变量会在后面交互以及生命周期函数里面用到，所以
        请优先给这个变量赋值。
        2.因为你是用的你的header，所以请将我页面中render函数里面id=xxxxx_header(第一个div)的那一个div以及
        里面的所有东西删掉，这是我的header。然后把你的header拿过来用，包括它的样式和交互，我的交
        互不用改，不会报错
    特别说明：
        下面那个变量你不要管
*/
///////////////////////////////////////////////////////////////////////////



var nowid = "" //一个全局变,用于记录当前id,这个你不管

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sign: "1", //////////////////用于触发cmd
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
            mysummarylogo: [
                mysummary_logo1, mysummary_logo2, mysummary_logo3, mysummary_logo4, mysummary_logo5
            ]
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
                                            <img className="summary_day_img" src={this.state.mysummarylogo[(index % 5)]} />
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
                        {/* <button className="summary_submit_btn1" onClick={this.changeWork.bind(this)}>更改</button> */}
                        <button className="summary_submit_btn2" onClick={this.submitWork.bind(this)}>提交</button>
                        <button className="summary_submit_btn3" onClick={this.deleteWork.bind(this)}>删除</button>
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
        axios.get("/user/getUserInfoByUnam?username=" + Data)
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

        axios.get("/user/getUserPaSs?username=" + Data)
            .then(function (response) {
                //console.log(response.data.data)
                if (response.data.data.length == 0) {
                    This.setState({
                        /////////////获取计划与总结
                        dataid: [],
                        data: []
                    })
                } else {
                    var myData = new Array()
                    var myDataid = new Array()
                    for (var i = 0; i < response.data.data.length; i++) {
                        myData[i] = response.data.data[i].writeTime.substring(0, 10)
                        myDataid[i] = response.data.data[i].id
                    }
                    myData.reverse()
                    myDataid.reverse()
                    //console.log(response.data.data[0])
                    This.setState({
                        /////////////获取计划与总结
                        data: myData,//////////////////////////////////////////////
                        dataid: myDataid
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })

    }



    // changeWork() {
    //     /////////更改计划和总结
    //     let This = this
    //     let sign = this.state.sign
    //     sign++
    //     if (nowid != "") {
    //         axios.post("/user/updatePlanAndSummary", {
    //             "id": nowid,
    //             "summary": document.querySelector(".pensonsummary").value,
    //             "plan": document.querySelector(".workplan").value,
    //             "unam": this.state.username,
    //         })
    //             .then(function (response) {
    //                 This.setState({
    //                     sign: sign
    //                 })
    //                 console.log(response.data.data)
    //                 console.log("修改成功")
    //                 document.querySelector(".pensonsummary").value = ""
    //                 document.querySelector(".workplan").value = ""
    //                 alert("修改成功")
    //             })
    //             .catch(function (error) {
    //                 console.log(error)
    //                 alert(error)
    //             })
    //     }

    // }

    submitWork() {
        let This = this
        let sign = this.state.sign
        sign++
        if (nowid != "") {
            axios.post("/user/updatePlanAndSummary", {
                "id": nowid,
                "summary": document.querySelector(".pensonsummary").value,
                "plan": document.querySelector(".workplan").value,
                "unam": this.state.username,
            })
                .then(function (response) {
                    This.setState({
                        sign: sign
                    })
                    console.log(response.data.data)
                    console.log("修改成功")
                    document.querySelector(".pensonsummary").value = ""
                    document.querySelector(".workplan").value = ""
                    alert("修改成功")
                })
                .catch(function (error) {
                    console.log(error)
                    alert(error)
                })
        } else {
            axios.post("/user/updatePlanAndSummary", {
                "summary": document.querySelector(".pensonsummary").value,
                "plan": document.querySelector(".workplan").value,
                "unam": this.state.username,
            })
                .then(function (response) {
                    console.log(response.data.data)
                    console.log("提交成功")
                    alert('提交成功')
                    document.querySelector(".pensonsummary").value = ""
                    document.querySelector(".workplan").value = ""
                    This.setState({})
                })
                .catch(function (error) {
                    console.log(error)
                    alert(error)
                })
        }
    }

    deleteWork() {
        let This = this
        let sign = this.state.sign
        let i = 0
        sign++
        if (nowid != "") {
            axios.get("/user/" + nowid + "/deleteDetailPaS?username=" + This.state.username)
                .then(function (response) {
                    let mydata = This.state.data
                    let mydataid = This.state.dataid
                    while (This.state.dataid[i] != nowid && i < This.state.dataid.length && i < 100) {
                        i++
                    }
                    mydata.splice(i, 1)
                    mydataid.splice(i, 1)
                    This.setState({
                        sign: sign,
                        data: mydata,
                        dataid: mydataid
                    })
                    //console.log(response.data)
                    alert("删除成功")
                    console.log("修改成功")
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
        axios.get("/user/" + index + "/getDetailPaS?username=" + Data)
            .then(function (response) {
                //console.log(response.data.data)
                document.querySelector(".pensonsummary").value = response.data.data.summary//////////////////////////
                document.querySelector(".workplan").value = response.data.data.plan////////////////////////
            })
            .catch(function (error) {
                console.log(error)
            })

    }
}

export default Summary;