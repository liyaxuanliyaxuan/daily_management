import React, { Component } from 'react';
import axios from 'axios'

import { TimePicker } from 'antd'

import './Personword.css'
import personword_img1 from '../../img/personword_img1.png'
import Header from '../../components/header/header'


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
            userNameData: '',
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
            nowprogress: "0",
        }
    }
    render() {
        return (
            <div>
                <div id="personword_bg">
                    <Header path='/pages/Personword' />
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
                            <a className="delectflie" onClick={() => { document.querySelector("#delectprj").style.display = "block" }}>删除</a>
                            <a href="javascript:history.back(-1)" className="personword_back">返回</a>

                            <a className="personword_change" onClick={() => { document.querySelector("#changeword").style.display = "block" }}>信息修改</a>
                            <a className="personword_addfile" onClick={() => { document.querySelector("#addword").style.display = "block" }}>提交文件</a>
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

                                    <input type="date" className="changeword_right_input4" value={this.state.beginTime} onChange={(e) => { this.setState({ beginTime: e.target.value }) }} placeholder="如2000-01-01" />
                                </li>
                                <li>
                                    <p>结题时间：</p>

                                    <input type="date" className="changeword_right_input5" value={this.state.closeTime} onChange={(e) => { this.setState({ closeTime: e.target.value }) }} placeholder="如2000-01-01" />
                                </li>
                                <li>
                                    <p>项目简介：</p>
                                    <textarea type="text" className="changeword_right_input6" value={this.state.introduction} onChange={(e) => { this.setState({ introduction: e.target.value }) }} />
                                </li>
                                <p className="changeword_right_input7_P">项目图片：</p>
                                <input type="file" className="changeword_right_input7"></input>
                                <li className="changeword_right_li8" >
                                    <p>项目进度：</p>
                                    <input type="range" className="changeword_right_input8 slider1" value={this.state.nowprogress} min="0" max="100" onChange={(e) => {
                                        this.setState({
                                            nowprogress: e.target.value
                                        })
                                        document.querySelector(".changeword_right_li8 span").innerHTML = e.target.value + "%"
                                    }} />
                                    <span className="slider1_p">0%</span>
                                </li>
                                <button onClick={this.changewordFile.bind(this)}>确定</button>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="delectprj">
                    <div className="delectprj_body">
                        <div className="delectprj_body1">
                            <p>是否删除该项目</p>
                            <button className="delectprj_btn1" onClick={this.delectFile.bind(this)}>确定</button>
                            <button className="delectprj_btn2" onClick={() => { document.querySelector("#delectprj").style.display = "none" }}>取消</button>
                        </div>
                    </div>
                </div>
                <div id="addword">
                    <div className="personword_addword_body">
                        <img src={addword_close} onClick={() => { document.querySelector("#addword").style.display = "none" }} />
                        <div className="addword_left" >
                            <p className="addword_left_head">文档上传(选择其中一种)</p>
                            <ul>
                                <li>
                                    <p>项目进度文档</p>
                                    <input type="file" onChange={
                                        (e) => {
                                            if (e.target.value != "") {
                                                e.target.className = "addwordfile"
                                            } else {
                                                e.target.className = ""
                                            }
                                        }
                                    } />
                                </li>
                                <li>
                                    <p>项目计划文档</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>项目会议纪要文档</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>接口文档</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>详细功能介绍文档</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>项目合同书</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>项目结题验收书</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>课题研究报告</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>学院结业报告</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>结业答辩评价表</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                                <li>
                                    <p>项目实施过程</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
                                </li>
                            </ul>
                            <button onClick={this.changeFile.bind(this)}>提交</button>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                <a target='_blank' href='http://www.beian.miit.gov.cn'>渝ICP备19017063号</a>
            </div>
            </div>
        );
    }


    //////////////////////////////交互

    componentWillMount() {
        // Data = this.props.location.state;////获取项目id
        // console.log(Data)
    }

    componentDidMount() {
        let This = this
        const id = This.props.match.params.state
        const userNameData = localStorage.getItem('userName')
        this.setState({
            userNameData
        });
        this.$axios.get("/user/getUserInfoByUnam?username=" + userNameData)
            ///////////////////////获取用户信息
            .then(function (response) {
                //console.log(response.data)
                This.setState({
                    realname: response.data.realname,
                    username: response.data.unam,
                    userimg: response.data.upath,
                    tel: response.data.phone,
                    qq: response.data.qq,
                    weibo: response.data.weibo,
                    e_mail: response.data.mail,
                })
            })
            .catch(function (error) {
                console.log(error)
            })

        this.$axios.get("/user/getUserProjects/" + id)
            /////////////////////////获取某一项目的具体信息
            .then(function (response) {
                let mybeginTime = response.data.beginTime
                let mycloseTime = response.data.closeTime
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
                //console.log(response.data.data)
                This.setState({
                    beginTime: mybeginTime,
                    closeTime: mycloseTime,
                    image: response.data.image,
                    introduction: response.data.introduction,
                    members: response.data.members,
                    pRealname: response.data.pRealname,
                    pid: response.data.pid,
                    pname: response.data.pname,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    pickCreateTime = (data, dataStr) => {
        this.setState({
            beginTime: dataStr

        })
    }
    pickEndTime = (data, dataStr) => {
        this.setState({
            closeTime: dataStr
        })
    }

    async changewordFile() {
        /////////////////////////修改项目信息
        let This = this
        let url = ""
        if (document.querySelector(".changeword_right_input7").files.length != 0) {////如果有选择图片
            let img = document.querySelector(".changeword_right_input7").files[0]
            let FormDataimg = new FormData()
            FormDataimg.append("image", img)
            await this.$axios.post("/user/uploadImages", FormDataimg)
                .then(function (response) {
                    /////////////////得到返回的url
                    This.setState({
                        url: response.data[0]
                    })
                    url = response.data[0]
                    console.log("上传图片成功" + response.data)
                    //console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                    alert("上传图片出错")
                })

            await this.$axios.post("/user/updateProject", {
                ////修改项目信息
                beginTime: This.state.beginTime,
                closeTime: This.state.closeTime,
                introduction: This.state.introduction,
                members: This.state.members,
                pRealname: This.state.pRealname,
                pname: This.state.pname,
                pid: This.props.match.params.state,
                image: url,
                progress:  Number(document.querySelector(".slider1").value)//this.state.nowprogress
            }).then(function (response) {
                console.log(response.data)
                alert("上传成功")
                document.querySelector("#changeword").style.display = "none"
            }).catch(function (error) {
                console.log(error)
                alert("上传失败")
            })
        } else {
            console.log("未上传图片")
            await this.$axios.post("/user/updateProject", {
                ////修改项目信息
                beginTime: This.state.beginTime,
                closeTime: This.state.closeTime,
                introduction: This.state.introduction,
                members: This.state.members,
                pRealname: This.state.pRealname,
                pname: This.state.pname,
                pid: This.props.match.params.state,
                progress:  Number(document.querySelector(".slider1").value)
            }).then(function (response) {
                console.log(response.data)
                alert("上传成功")
                document.querySelector("#changeword").style.display = "none"
            }).catch(function (error) {
                console.log(error)
                alert("上传失败")
            })
        }



    }

    async downloadFile(e) {
        ////////////////////////下载相应项目文件
        let This = this
        let type = e.target.innerHTML
        let fid = ""
        let fname = ""
        const id = This.props.match.params.state
        //console.log(e.target.innerHTML)
        // let isdownload = confirm("是否下载该文件")
        // if( isdownload){

        // }else{

        // }
        console.log("id:" + id + "type:" + type)
        await this.$axios.get("/user/getProjectDocs?pid=" + id + "&doctype=" + type)
            .then(function (response) {
                console.log(response.data)
                if (response.data.length == 0) {
                    fid = ""
                    fname = ""
                } else {
                    fid = response.data[0].fid
                    fname = response.data[0].fname
                }
            }).catch(function (error) {
                console.log(error)
            })
        console.log(fid)
        // await this.$axios.get("/user/getFile/" + fid)
        //     .then(function (res) {
        //         let url = window.URL.createObjectURL(new Blob([res.data]))
        //         let link = document.createElement('a')
        //         link.style.display = 'none'
        //         link.href = url
        //         link.setAttribute('download', "fileName")    // 自定义下载文件名（如exemple.txt）
        //         document.body.appendChild(link)
        //         link.click()
        //     }).catch(function (error) {
        //         console.log(error)
        //     })
        /**
 * 下载文件
 * @param content 文件流
 * @param fileName 文件名称
 */

        await axios({
            url: '/user/getFile/' + fid,
            method: 'get',
            responseType: 'blob'
        }).then((res) => {
            download(res, fname)
        })

    }

    delectFile() {
        ///删除项目
        let This = this
        const id = This.props.match.params.state
        const userNameData = localStorage.getItem('userName')

        axios.delete("/user/project/" + id + "?username=" + This.state.realname)
            .then(res => {
                console.log(res)
                if (res.code == 200) {
                    alert("删除成功")
                    document.querySelector('.personword_back').click()
                }else{
                    alert(res.message)
                }

                
            })
            .catch(res => {
                console.log(res)
                alert("删除失败")
            })
    }

    async changeFile() {
        let This = this
        let fid = ""
        const id = This.props.match.params.state
        const userNameData = localStorage.getItem('userName')
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data;charset=UTF-8'  //'application/x-www-form-urlencoded' 
            }
        }

        let file = document.querySelector(".addwordfile").files[0]
        console.log(document.querySelector(".addwordfile").value)
        let FormDatafile = new FormData()
        FormDatafile.append("file", file)
        FormDatafile.append("doctype", document.querySelector(".addwordfile").previousElementSibling.innerHTML)
        FormDatafile.append("username", this.state.userNameData)
        await this.$axios.post("/user/uploadFiles", FormDatafile, config)
            .then(function (response) {
                //////////////获取文件id
                fid = response.data[0] ////////////////////////////////////////
                console.log("上传文件成功" + response.data)
                //console.log(fid)
            })
            .catch(function (error) {
                console.log(error)
                alert("上传文件出错")
            })

        await this.$axios.post("user/updateProjectDoc", {
            "fid": fid,
            "pid": id
        })
            .then(function (response) {
                if (response.code == 200) {
                    alert("上传成功")
                    document.querySelector("#addword").style.display = "none"
                }
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
                alert("未知错误")
            })
    }



}

export default Personword;

export const download = (content, fileName) => {
    const blob = new Blob([content], {
        type: 'application/octet-stream'
    });
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    const filename = fileName;
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}