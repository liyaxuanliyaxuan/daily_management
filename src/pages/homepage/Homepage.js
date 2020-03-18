import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import './Homepage.css'

import cookie from 'react-cookies'
import homeword_logo1 from '../../img/homeword_logo1.png'
import homeword_logo2 from '../../img/homeword_logo2.png'
import homeword_logo3 from '../../img/homeword_logo3.png'
import addword_close from '../../img/addword_close.png'

import Header from '../../components/header/header'


var a = 0;
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
*/ 
///////////////////////////////////////////////////////////////////////////

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xiaoren: ["homeword_logo1", "homeword_logo2", "homeword_logo3"],
            width: [],
            backgroundColor: ["#ffd100", "#f0842d", "#f36868"],
            ////////
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
            ///////////////
            oldpsw: "",
            newpsw1: "",
            newpsw2: "",
            ////////////////
            beginTime: "",
            closeTime: "",
            image: "",
            introduction: "",
            members: "",
            pRealname: "",
            //pid: "",
            pname: "",
            //////////////
            porgressImg: [
                '../../img/homeword_left.png', 
                '../../img/homeword_left.png',
                 '../../img/homeword_left.png', 
                 '../../img/homeword_left.png', 
                 '../../img/homeword_left.png', 
                 '../../img/homeword_left.png'
            ],
            porgress: [
                0, 0.2, 0.3, 0.5, 0.8, 1
            ],
            porgressname: [

            ],
            url: "",
            pid:[

            ],
            ifAdmin:false,
            ifLogin: ''//username
        }
    }
    render() {
        const { ifAdmin } = {...this.state}
         const renderNavTitle = ifAdmin?
         {prj:`葫芦娃的项目`,sum:'葫芦娃的总结',blog:'个人博客'}
         :{sum:`总结展望`,prj:'个人项目',blog:'个人博客'}
        return (
            <div>
                <div id="Homepage_bg">
            <Header path='/home'/>
                    <div className="Homepage_loge"
                        style={{
                            backgroundImage: 'url(' + this.state.userimg + ')'
                        }}
                    ></div>
                    <p className="name">姓名：{this.state.username}</p>
                    <p className="tel">电话：{this.state.tel}</p>
                    <p className="qq">QQ：{this.state.qq}</p>
                    <p className="weibo">微博：{this.state.weibo}</p>
                    <p className="e_mail">邮箱：{this.state.e_mail}</p>
                    <a className="Homepage_more" href="/pages/Personmessage" >更多信息</a>
                    <a className="Homepage_change" onClick={this.changepswOut.bind(this)}>修改密码</a>
                    <a href="/pages/Summary"><div className={ifAdmin?"Homepage_zhongjie Homepage_zhongjie-vip":"Homepage_zhongjie"}><div><p>{renderNavTitle.sum}</p></div></div></a>
                    <a href="/pages/Personblog"><div className={ifAdmin?'Homepage_bolg-vip Homepage_bolg':'Homepage_bolg'}><div><p>{renderNavTitle.blog}</p></div></div></a>
                    <a><div className={ifAdmin?'Homepage_wendang-vip Homepage_wendang':'Homepage_wendang'} onClick={this.homewordShow.bind(this)}><div><p>{renderNavTitle.prj}</p></div></div></a>
                </div>
                <div id="Homeword_bg" >
                    <div id="Homeword_back" onClick={this.homewordBack.bind(this)} ></div>
                    <div id="Homeword">
                        <div className="Homeword_body">
                            <div className="Homeword_warp">
                                <div className="Homeword_add" onClick={() => { document.querySelector("#addword").style.display = "block" }}></div>
                                {
                                    this.state.porgress.map((item, index) => {
                                        let This = this
                                        let b = this.state.porgress[index]
                                        if (b >= 0 && b <= 0.3) {
                                            return (
                                                <Link to={{pathname:"/pages/Personword", state:this.state.pid[index]}} key={index} title={this.state.porgressname[index]}>
                                                    <div className="Homeword_progress" key={index} >
                                                        <div className="Homeword_progress_img1"
                                                            style={{
                                                                background: 'url(' + This.state.porgressImg[index] + ')'
                                                            }}
                                                        ></div>
                                                        <div className="Homeword_progress_div1"></div>
                                                        <div className="Homeword_progress_div2"
                                                            style={{
                                                                width: b * 180 + 'px',
                                                                background: "#ffd100"
                                                            }}
                                                        ></div>
                                                        <img className="Homeword_progress_img2" src={homeword_logo1}
                                                            style={{
                                                                left: this.state.porgress[index] * 180 + 'px'
                                                            }}
                                                        />
                                                    </div>
                                                </Link>
                                            )

                                        } else if (b > 0.3 && b <= 0.6) {
                                            return (
                                                <Link to={{pathname:"/pages/Personword", state:this.state.pid[index]}} key={index} title={this.state.porgressname[index]}>
                                                    <div className="Homeword_progress" key={index} >
                                                        <div className="Homeword_progress_img1"
                                                            style={{
                                                                background: 'url(' + this.state.porgressImg[index] + ')'                                                            }}
                                                        ></div>
                                                        <div className="Homeword_progress_div1"></div>
                                                        <div className="Homeword_progress_div2"
                                                            style={{
                                                                width: b * 180 + 'px',
                                                                background: "#f0842d"
                                                            }}
                                                        ></div>
                                                        <img className="Homeword_progress_img2" src={homeword_logo2}
                                                            style={{
                                                                left: this.state.porgress[index] * 180 + 'px'
                                                            }}
                                                        />
                                                    </div>
                                                </Link>
                                            )
                                        } else {
                                            return (
                                                <a key={index} href={"/pages/Personword?id=" + index} >
                                                    <div className="Homeword_progress" key={index} >
                                                        <div className="Homeword_progress_img1"
                                                            style={{
                                                                background: 'url(' + This.state.porgressImg[index] + ')'
                                                            }}
                                                        ></div>
                                                        <div className="Homeword_progress_div1"></div>
                                                        <div className="Homeword_progress_div2"
                                                            style={{
                                                                width: b * 180 + 'px',
                                                                background: "#f36868"
                                                            }}
                                                        ></div>
                                                        <img className="Homeword_progress_img2" src={homeword_logo3}
                                                            style={{
                                                                left: this.state.porgress[index] * 180 - 10 + 'px'
                                                            }}
                                                        />
                                                    </div>
                                                </a>
                                            )
                                        }
                                        // return (
                                        //     <a key={index} href={"/pages/Personword?id=" + index} >
                                        //         <div className="Homeword_progress" key={index} >
                                        //             <div className="Homeword_progress_img1" ref={this.progressStylechangeimg1.bind(this, index)}></div>
                                        //             <div className="Homeword_progress_div1" ></div>
                                        //             <div className="Homeword_progress_div2" ref={this.progressStylechangediv2.bind(this, index)}></div>
                                        //             <img className="Homeword_progress_img2" src={homeword_logo1} ref={this.progressStylechangeimg2.bind(this, index)} />
                                        //         </div>
                                        //     </a>
                                        // )
                                    })
                                }
                            </div>
                        </div>
                        <img className="Homeword_left" src={require('../../img/homeword_left.png')} onClick={this.moveleft.bind(this, this.state.porgress.length)} />
                        <img className="Homeword_right" src={require('../../img/homeword_right.png')} onClick={this.moveright.bind(this, this.state.porgress.length)} />
                    </div>

                </div>
                <div id="changepsw">
                    <div className="changepsw_body">
                        <p className="changepsw_body_p1">请输入原密码:</p>
                        <input className="changepsw_body_input1" type="password" value={this.state.oldpsw} onChange={this.changeInput1.bind(this)} />
                        <p className="changepsw_body_p2">请输入新密码:</p>
                        <input className="changepsw_body_input2" type="password" value={this.state.newpsw1} onChange={this.changeInput2.bind(this)} />
                        <p className="changepsw_body_p3">请再次输入新密码:</p>
                        <input className="changepsw_body_input3" type="password" value={this.state.newpsw2} onChange={this.changeInput3.bind(this)} />
                        <button className="changepsw_body_btn1" onClick={this.changePsw.bind(this)}>确定</button>
                        <button className="changepsw_body_btn2" onClick={this.changepswBack.bind(this)}>返回</button>
                    </div>
                </div>
                <div id="addword">
                    <div className="addword_body">
                        <img src={addword_close} onClick={() => { document.querySelector("#addword").style.display = "none" }} />
                        <div className="addword_left" >
                            <p className="addword_left_head">文档上传(选择其中一种)</p>
                            <ul>
                                <li>
                                    <p>项目进度文档</p>
                                    <input type="file" onChange={(e) => { if (e.target.value != "") { e.target.className = "addwordfile" } else { e.target.className = "" } }} />
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
                        </div>
                        <div className="addword_right">
                            <p className="addword_right_head">信息填写</p>
                            <ul>
                                <li>
                                    <p>项目名称：</p>
                                    <input type="text" className="addword_right_input1" value={this.state.pname} onChange={(e) => { this.setState({ pname: e.target.value }) }} />
                                </li>
                                <li>
                                    <p>牵头人：</p>
                                    <input type="text" className="addword_right_input2" value={this.state.pRealname} onChange={(e) => { this.setState({ pRealname: e.target.value }) }} />
                                </li>
                                <li>
                                    <p>项目成员：</p>
                                    <input type="text" className="addword_right_input3" value={this.state.members} onChange={(e) => { this.setState({ members: e.target.value }) }} />
                                </li>
                                <li>
                                    <p>立项时间：</p>
                                    <input type="text" className="addword_right_input4" value={this.state.beginTime} onChange={(e) => { this.setState({ beginTime: e.target.value }) }} placeholder="如2000-01-01" />
                                </li>                            
                                <li>
                                    <p>结题时间：</p>
                                    <input type="text" className="addword_right_input5" value={this.state.closeTime} onChange={(e) => { this.setState({ closeTime: e.target.value }) }} placeholder="如2000-01-01" />                                </li>
                                <li>
                                    <p>项目简介：</p>
                                    <textarea type="text" className="addword_right_input5" value={this.state.introduction} onChange={(e) => { this.setState({ introduction: e.target.value }) }} />
                                </li>
                                <li className="addword_right_li6">
                                    <p>上传图片：</p>
                                    <input type="file" className="addword_right_input6" />
                                </li>
                                <button onClick={this.addwordFile.bind(this)}>确定</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    moveleft(num) {
        if (a > 0) {
            a--
            document.querySelector(".Homeword_warp").style.left = 0 - a * 223 + 'px'
        }
    }
    moveright(num) {
        if (a <= num - 4) {
            a++
            document.querySelector(".Homeword_warp").style.left = 0 - a * 223 + 'px'
        }
    }

    // progressStylechangeimg1(index, e) {
    //     //e.style.backgroundImage = "url(" + require('../img/homepage_bg.png') + ")"
    // }
    // progressStylechangediv2(index, e) {
    //     let b = this.state.porgress[index]
    //     if (b >= 0 && b <= 0.3) {
    //         e.style.backgroundColor = "#ffd100"
    //         e.style.width = b * 180 + 'px'
    //     } else if (b > 0.3 && b <= 0.6) {
    //         e.style.backgroundColor = "#f0842d"
    //         e.style.width = b * 180 + 'px'
    //     } else {
    //         e.style.backgroundColor = "#f36868"
    //         e.style.width = b * 180 + 'px'
    //     }
    // }
    // progressStylechangeimg2(index, e) {
    //     let b = this.state.porgress[index]
    //     if (b >= 0 && b <= 0.3) {
    //         e.src = homeword_logo1
    //         e.style.left = this.state.porgress[index] * 180 + 'px'
    //     } else if (b > 0.3 && b <= 0.6) {
    //         e.src = homeword_logo2
    //         e.style.left = this.state.porgress[index] * 180 + 'px'
    //     } else {
    //         e.src = homeword_logo3
    //         e.style.left = this.state.porgress[index] * 180 - 10 + 'px'
    //     }
    // }

    homewordBack() {
        document.querySelector("#Homeword_bg").style.display = "none"
    }

    changepswBack() {
        document.querySelector("#changepsw").style.display = "none"
    }
    changepswOut() {
        document.querySelector("#changepsw").style.display = "block"
    }
    changeInput1(e) {
        this.setState({
            oldpsw: e.target.value
        })
    }
    changeInput2(e) {
        this.setState({
            newpsw1: e.target.value
        })
    }
    changeInput3(e) {
        this.setState({
            newpsw2: e.target.value
        })
    }
    /////////////////////////////////////////交互
    componentWillMount(){
        this.state.ifLogin = cookie.load('ifLogin')
    }

    componentDidMount() {
        let ifAdmin = (this.state.ifLogin && sessionStorage.getItem('ifAdmin'))?true:false
        this.setState({
            ifAdmin
        });
        let This = this
        this.$axios.get( axios.get("/user/getUserInfoByUnam?username=" + Data)
            .then(function (response) {
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
        )
    }


    changePsw() {
        let This = this
        if (This.state.newpsw1 != This.state.newpsw2) {
            alert("两次输入密码不一致。请重新输入")
            This.setState({
                newpsw2: ""
            })
        } else if (This.state.newpsw1 == "" || This.state.newpsw2 == "" || This.state.oldpsw == "") {
            alert("密码不能为空")
        } else {
            axios.post("user/updatePassword", {
                newpw: This.state.newpsw1,
                oldpw: This.state.oldpsw1
            }).then(function (response) {
                console.log(response.data)
                if (response.data.code == 200) {
                    alert("修改成功")
                    document.querySelector("#changepsw").style.display = "none"
                } else {
                    alert("修改失败")
                }
            }).catch(function (error) {
                console.log(error)
                alert("修改失败！！！  原密码错误或服务器异常")
            })
        }

    }

    homewordShow() {
        document.querySelector("#Homeword_bg").style.display = "block"
        let This = this
        axios.get("/user/getUserProjects?username=" + This.state.realname)////////////////真实姓名
            .then(function (response) {
                console.log(response.data.data)
                if (response.data.data.length == 0) {
                    This.setState({
                        /////////////获取计划与总结
                        porgressImg: [],
                        porgress: []

                    })
                } else {
                    var myporgressImg = new Array()
                    var myporgress = new Array()
                    var myporgressname = new Array()
                    var mypid = new Array()
                    for (var i = 0; i < response.data.data.length; i++) {
                        myporgressImg[i] = response.data.data[i].image
                        myporgress[i] = 0.2//response.data.data[i].porgress 
                        myporgressname[i] = response.data.data[i].pname
                        mypid[i] = response.data.data[i].pid
                    }
                    This.setState({
                        porgress: myporgress,
                        porgressImg: myporgressImg,
                        porgressname: myporgressname,
                        pid: mypid
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    async addwordFile() {
        let This = this
        let pid = ""
        let fid = ""
        let url = ""
        let ture = 0
        ////////////////先上传图片
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data;charset=UTF-8'  //'application/x-www-form-urlencoded' 
            }
        }
        let img = document.querySelector(".addword_right_input6").files[0]
        let FormDataimg = new FormData()
        FormDataimg.append("image", img)
        await axios.post("/user/uploadImages", FormDataimg)
            .then(function (response) {
                /////////////////得到返回的url
                This.setState({
                    url: response.data.data[0] 
                })
                url = response.data.data[0]
                console.log("上传图片成功" + response.data)
                console.log(response.data)
                
            })
            .catch(function (error) {
                console.log(error)
                alert("上传图片出错")
                ture = 1
            })

        //console.log(url)
        //////////////上传项目文件
        let file = document.querySelector(".addword_right_input6").files[0]
        let FormDatafile = new FormData()
        FormDatafile.append("file", file)
        try {
            FormDatafile.append("doctype", document.querySelector(".addwordfile").previousElementSibling.innerHTML)
        } catch{
            alert("请正确填写信息")
            return
        }
        FormDatafile.append("username", Data)
        await axios.post("/user/uploadFiles", FormDatafile, config)
            .then(function (response) {
                //////////////获取文件id
                fid = response.data.data[0] ////////////////////////////////////////
                console.log("上传文件成功" + response.data)
                //console.log(fid)
            })
            .catch(function (error) {
                console.log(error)
                alert("上传文件出错")
                ture = 1
            })


        //////////////上传项目信息
        await axios.post("/user/saveProject", {
            "beginTime": this.state.beginTime,
            "closeTime": this.state.closeTime,
            "image": url,
            "introduction": this.state.introduction,
            "members": [
                this.state.members
            ],
            "pRealname": this.state.pRealname,
            "pname": this.state.pname
        })
            .then(function (response) {
                pid = response.data.data.pid
                console.log("上传项目信息成功" + response.data)
            })
            .catch(function (error) {
                console.log(error)
                alert("上传项目信息出错,请按格式正确填写信息")
                ture = 1
            })

        console.log("pid:" + pid)
        console.log("fid:" + fid)
        if (ture == 0) {
            //////////////文件与项目关联
            await axios.post("user/updateProjectDoc", {
                "fid": fid,
                "pid": pid
            })
                .then(function (response) {
                    if (response.data.code == 200) {
                        alert("上传成功")
                        document.querySelector("#addword").style.display = "none"
                    }
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                    alert("未知错误")
                })
        } else {
            ture = 0
        }

    }

}

export default Homepage;