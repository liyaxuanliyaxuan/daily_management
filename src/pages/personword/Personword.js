import React, { Component } from 'react';
import './Personword.css'
import personword_img1 from '../../img/personword_img1.png'
import Header from '../../components/header/header'

import axios from 'axios';
import addword_close from '../../img/addword_close.png'



///////////////////////////////////////////////////////////////////////////
////↓↓↓用户名(username),不是真实名字(realname),字符型
var User = "admin"//admin是默认值，你直接删了就ok
/*
    说明：
        1.这个页面有两个从其他页面传来的参数，但是你只用给这一个(User)赋值，下面那一个参数(Data)你不用管
        2.我的每一个页面都会有一个这样的变量，这个变量会在后面交互以及生命周期函数里面用到，所以
        请优先给这个变量赋值。
        3.因为你是用的你的header，所以请将我页面中render函数里面id=xxxxx_header(第一个div)的那一个div以及
        里面的所有东西删掉，这是我的header。然后把你的header拿过来用，包括它的样式和交互，我的交
        互不用改，不会报错
    
    特别说明：
        这个页面传递参数的方法最好别用link的state来传递，因为我的另一个参数会用到这个方法，如果你只能用
        这个方法来传递参数，你需要改动一下我下面那一个参数获取值的代码，好让两个参数都能被正确赋值，方式
        在componentWillMount里面。如果你不用link的state来传值，请无视这段话
*/
///////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////
//   这个参数你不要管，不要赋值，我已经安排了！！！！！
//   ↓↓↓  这个参数由个人主页页面传递过来，使用的的link的state传递参数
var Data = "" //用于接收由个人主页页面传递的参数，数据为目前的项目 id
////////////////////////////////////////


class Personword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
            ///////////////
            beginTime: "",
            closeTime: "",
            image: "",
            introduction: "",
            members: [],
            pRealname: "",
            pid: "",
            pname: "",
            //////////////
        }
    }
    render() {
        return (
            <div>
                <div id="personword_bg">
                 <Header path='/pages/Personword'/>
                 <div id="personword_left">
                        <button className="personword_button1" onClick={this.downloadFile.bind(this)}>项目进度文档</button>
                        <button className="personword_button2" onClick={this.downloadFile.bind(this)}>项目计划文档</button>
                        <button className="personword_button3" onClick={this.downloadFile.bind(this)}>项目讨论会议纪要</button>
                        <button className="personword_button4" onClick={this.downloadFile.bind(this)}>接口文档</button>
                        <button className="personword_button5" onClick={this.downloadFile.bind(this)}>详细功能介绍文档</button>
                        <button className="personword_button6" onClick={this.downloadFile.bind(this)}>项目合同书</button>
                        <button className="personword_button7" onClick={this.downloadFile.bind(this)}>项目结题验收书</button>
                        <button className="personword_button8" onClick={this.downloadFile.bind(this)}>课题研究报告</button>
                        <button className="personword_button9" onClick={this.downloadFile.bind(this)}>学员结业报告</button>
                        <button className="personword_button10" onClick={this.downloadFile.bind(this)}>结业答辩评价表</button>
                        <button className="personword_button11" onClick={this.downloadFile.bind(this)}>项目实施过程</button>
                    </div>
                    <div id="personword_right">
                        <div className="personword_right_up">
                            <a href="javascript:history.back(-1)" className="personword_back">返回</a>
                            <a className="personword_change" onClick={() => { document.querySelector("#changeword").style.display = "block" }}>信息修改</a>
                            <img src={this.state.image} />
                            <p className="personword_right_up_p1">项目名称：{this.state.pname}</p>
                            <p className="personword_right_up_p2">项目牵头人：{this.state.pRealname}</p>
                            <p className="personword_right_up_p3">项目创建时间：{this.state.beginTime}</p>
                            <p className="personword_right_up_p4">项目结束时间：{this.state.closeTime}</p>
                        </div>
                        <div className="personword_right_down">
                            <p className="personword_right_down_p1">项目负责人</p>
                            <textarea className="personword_right_down_text1" readOnly value={
                                /*
                                this.state.members.map((item, index) => {
                                    return (this.state.members[index] + "")
                                })
                                */
                                this.state.members
                            }></textarea>
                            <textarea className="personword_right_down_text2" readOnly value={this.state.introduction}></textarea>
                            <p className="personword_right_down_p2">项目简介</p>
                        </div>
                    </div>
                </div>
                <div id="changeword">
                    <div className="changeword_body">
                        <img src={addword_close} onClick={() => { document.querySelector("#changeword").style.display = "none" }} />
                        <div className="changeword_right">
                            <p className="changeword_right_head">信息填写</p>
                            <ul>
                                <li>
                                    <p>项目名称：</p>
                                    <input type="text" className="changeword_right_input1" value={this.state.pname} onChange={(e) => { this.setState({ pname: e.target.value }) }} />
                                </li>
                                <li>
                                    <p>牵头人：</p>
                                    <input type="text" className="changeword_right_input2" value={this.state.pRealname} onChange={(e) => { this.setState({ pRealname: e.target.value }) }} />
                                </li>
                                <li>
                                    <p>项目成员：</p>
                                    <input type="text" className="changeword_right_input3" value={this.state.members}
                                        onChange={(e) => {
                                            let mymenbers = new Array()
                                            mymenbers[0] = e.target.value
                                            this.setState({ members: mymenbers })
                                        }}
                                    />
                                </li>
                                <li>
                                    <p>立项时间：</p>
                                    <input type="text" className="changeword_right_input4" value={this.state.beginTime} onChange={(e) => { this.setState({ beginTime: e.target.value }) }} placeholder="如2000-01-01" />
                                </li>
                                <li>
                                    <p>结题时间：</p>
                                    <input type="text" className="changeword_right_input5" value={this.state.closeTime} onChange={(e) => { this.setState({ closeTime: e.target.value }) }} placeholder="如2000-01-01" />
                                </li>
                                <li>
                                    <p>项目简介：</p>
                                    <textarea type="text" className="changeword_right_input5" value={this.state.introduction} onChange={(e) => { this.setState({ introduction: e.target.value }) }} />
                                </li>
                                <button onClick={this.changewordFile.bind(this)}>确定</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    //////////////////////////////交互

    componentWillMount() {
        Data = this.props.location.state;////获取项目id
        console.log(Data)
    }

    componentDidMount() {
        let This = this
        axios.get("/user/getUserInfoByUnam?username=" + User)
            ///////////////////////获取用户信息
            .then(function (response) {
                console.log(response.data.data)
                This.setState({
                    realname: response.data.data.realname,
                    username: response.data.data.unam,
                    userimg: response.data.data.upath,
                    tel: response.data.data.phone,
                    qq: response.data.data.qq,
                    weibo: response.data.data.weibo,
                    e_mail: response.data.data.mail,
                })
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get("/user/getUserProjects/" + Data)
            /////////////////////////获取某一项目的具体信息
            .then(function (response) {
                let mybeginTime = response.data.data.beginTime
                let mycloseTime = response.data.data.closeTime
                if (mybeginTime == null) {
                    mybeginTime = ""
                } else {
                    mybeginTime = mybeginTime.substring(0, 10)
                }
                if (mycloseTime == null) {
                    mycloseTime = ""
                } else {
                    mycloseTime = mycloseTime.substring(0, 10)
                }
                console.log(response.data.data)
                This.setState({
                    beginTime: mybeginTime,
                    closeTime: mycloseTime,
                    image: response.data.data.image,
                    introduction: response.data.data.introduction,
                    members: response.data.data.members,
                    pRealname: response.data.data.pRealname,
                    pid: response.data.data.pid,
                    pname: response.data.data.pname,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    changewordFile() {
        /////////////////////////修改项目信息
        let This = this
        console.log("aaa")
        axios.post("/user/updateProject", {
            beginTime: This.state.beginTime,
            closeTime: This.state.closeTime,
            introduction: This.state.introduction,
            members: This.state.members,
            pRealname: This.state.pRealname,
            pname: This.state.pname,
            pid: Data
        }).then(function (response) {
            console.log(response.data)
            alert("上传成功")
            document.querySelector("#changeword").style.display = "none"
        }).catch(function (error) {
            console.log(error)
            alert("上传失败")
        })
    }

    downloadFile(e) {
        ////////////////////////下载相应项目文件
        let This = this
        let type = e.target.innerHTML
        //console.log(e.target.innerHTML)
        // let isdownload = confirm("是否下载该文件")
        // if( isdownload){

        // }else{

        // }
        axios.get("/user/getProjectDocs?pid=" + Data + "&doctype=" + type)
            .then(function(response){
                console.log(response.data)
            }).catch(function(error){
                console.log(error)
            })
    }
}

export default Personword;