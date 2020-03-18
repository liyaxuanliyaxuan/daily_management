import React, { Component } from 'react';
import './Pubilcblog.css'
import axios from 'axios';
import pubilcblog_zhan1 from '../../img/personblog_zhan1.png'
import pubilcblog_zhan2 from '../../img/personblog_zhan2.png'
import pubilcblog_collect1 from '../../img/personblog_collect1.png'
import pubilcblog_collect2 from '../../img/personblog_collect2.png'
import addword_close from '../../img/addword_close.png'
import idea_logo from '../../img/idea_logo.png'
import userimg from '../../img/userimg.jpg'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Header from '../../components/header/header'
var Data = 'admin'
class Pubilcblog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [
                "我找到了一个很有用的网站", "我找到了一个很有用的网站", "我找到了一个很有用的网站"
            ],
            links: [
                'https://www.ui.cn/', 'https://www.ui.cn/', 'https://www.ui.cn/'
            ],
            imgs: [
                '../../img/personblog_collect.png', 
                '../../img/personblog_collect.png', '../../img/personblog_collect.png'
            ],
            ideaword:[
                '啦啦啦啦啦啦啦','啦啦啦啦啦啦啦','啦啦啦啦啦啦啦','啦啦啦啦啦啦啦'
            ],
            ideaimgs:[
                '../../img/personblog_collect.png', '../../img/personblog_collect.png', '../../img/personblog_collect.png', '../../img/personblog_collect.png'
            ],
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
            ///////////////
            comment: [
                ""
            ],
            bid: [
                ""
            ],
            filepath: [
                ""
            ],
            type: [
                ""
            ],
            author: [
                ""
            ],
            likenum: [
                ""
            ],
            iscollection: [

            ],
            islike: [

            ],
            bloguser: [

            ],
            bloguserimg: [

            ],
            //////////////////////
            tid: [

            ],
            title: [

            ],
            ideaimg: [

            ],
            /////////////////////
            listname: [

            ],
            listimg: [

            ]

        }
    }
    render() {
        return (
            <div>
                <div id="pubilcblog_bg">
                    <Header path='/pages/Pubilcblog'/>
                    <div id="pubilcblog_left">
                        <button className="pubilcblog_left_btn1" onClick={this.selectBlog.bind(this)}>服务器</button>
                        <button className="pubilcblog_left_btn2" onClick={this.selectBlog.bind(this)}>客户端</button>
                        <button className="pubilcblog_left_btn3" onClick={this.selectBlog.bind(this)}>产品</button>
                        <button className="pubilcblog_left_btn4" onClick={this.selectBlog.bind(this)}>硬件</button>
                        <button className="pubilcblog_left_btn5" onClick={this.selectBlog.bind(this)}>其他</button>
                    </div>
                    <div className="pubilcblog_right_container">
                        <div id="pubilcblog_right">
                            {
                                this.state.comment.map((item, index) => {
                                    return (
                                        <div className="pubilcblog_blog" key={index} >
                                            <div className="pubilcblog_blog_logo1"
                                                style={{
                                                    backgroundImage: 'url(' + this.state.bloguserimg[index] + ')'
                                                }}
                                            ></div>
                                            <p className="pubilcblog_blog_name">{this.state.bloguser[index]}</p>
                                            <p className="pubilcblog_blog_word">{this.state.comment[index]}</p>
                                            <div className="pubilcblog_blog_div">
                                                <div className="pubilcblog_blog_img"
                                                    style={{
                                                        backgroundImage: 'url(' + this.state.filepath[index] + ')'
                                                    }}
                                                ></div>
                                                {/* <a className="pubilcblog_blog_link" href={this.state.links[index]}>{this.state.links[index]}</a> */}
                                            </div>
                                            <img className="pubilcblog_blog_logo2" src={this.state.islike[index] ? pubilcblog_zhan2 : pubilcblog_zhan1} onClick={this.dianZhan.bind(this, index)} />
                                            <img className="pubilcblog_blog_logo3" src={this.state.iscollection[index] ? pubilcblog_collect2 : pubilcblog_collect1} onClick={this.collect.bind(this, index)} />
                                            <div className="pubilcblog_blog_logo4">{this.state.type[index]}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div id="pubilcblog_list">
                        <p className="pubilcblog_list_h1">表扬榜</p>
                        <ul>
                            <il className="first">
                                <p className="firstnum">1</p>
                                <p className="firstname">{this.state.listname[0]}</p>
                                <div className="firstimg"
                                    style={{
                                        backgroundImage: 'url(' + this.state.listimg[0] + ')'
                                    }}
                                ></div>
                            </il>
                            <il className="second">
                                <p className="secondnum">2</p>
                                <p className="secondname">{this.state.listname[1]}</p>
                                <div className="secondimg"
                                    style={{
                                        backgroundImage: 'url(' + this.state.listimg[1] + ')'
                                    }}
                                ></div>
                            </il>
                            <il className="third">
                                <p className="thirdnum">3</p>
                                <p className="thirdname">{this.state.listname[2]}</p>
                                <div className="thirdimg"
                                    style={{
                                        backgroundImage: 'url(' + this.state.listimg[2] + ')'
                                    }}
                                ></div>
                            </il>
                        </ul>
                    </div>
                    <div id="pubilcblog_idea">
                        <p className="pubilcblog_idea_h1">头脑风暴</p>
                        <button className="pubilcblog_add" onClick={() => { document.querySelector("#addnewidea").style.display = "block" }}></button>
                        <ul>
                            {
                                this.state.tid.map((item, index) => {
                                    return (
                                        <Link to={{ pathname: "/pages/Pubilcidea", state: this.state.tid[index] }}>
                                            <li key={index}>
                                                <div
                                                    style={{
                                                        background: 'url(' + this.state.ideaimg[index] + ')'
                                                    }}
                                                ></div>
                                                <p>{this.state.title[index]}</p>
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div id="addnewidea">
                    <div className="addnewidea_body">
                        <div className="addnewidea_body_head">
                            <p>新增IDEA</p>
                            <img src={addword_close} onClick={() => { document.querySelector("#addnewidea").style.display = "none" }} />
                        </div>
                        <div className="addnewidea_body_text">
                            <p>我的idea：</p>
                            <textarea className="addnewidea_body_message" />
                            <button className="addnewidea_body_back" onClick={() => { document.querySelector("#addnewidea").style.display = "none" }}>取消</button>
                            <button className="addnewidea_body_submit" onClick={this.addNewidea.bind(this)}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    // myCollect(e) {
    //     e.target.style.backgroundColor = '#5fb1ff'
    // }


    //////////////////////////////交互

    componentDidMount() {
        let This = this
        axios.get("/user/getUserInfoByUnam?username=" + Data)
            .then(function (response) {
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

        axios.get("/blogs?name=" + Data)
            .then(function (response) {
                console.log(response.data)
                if (response.data.data.length == 0) {
                    // This.setState({

                    // })
                } else {
                    //console.log(response.data.data)
                    var mybid = new Array()
                    var mycomment = new Array()
                    var myfilepath = new Array()
                    var mytype = new Array()
                    var myauthor = new Array()
                    var mylikenum = new Array()
                    var myiscollection = new Array()
                    var myislike = new Array()
                    var mybloguser = new Array()
                    var mybloguserimg = new Array()
                    for (var i = 0; i < response.data.data.length; i++) {
                        mybid[i] = response.data.data[i].blog.bid
                        mycomment[i] = response.data.data[i].blog.comment
                        myfilepath[i] = response.data.data[i].blog.filepath
                        mytype[i] = response.data.data[i].blog.type
                        myauthor[i] = ""//"admin"//Data
                        mylikenum[i] = response.data.data[i].blog.likenum
                        myiscollection[i] = response.data.data[i].iscollection
                        myislike[i] = response.data.data[i].islike
                        mybloguser[i] = response.data.data[i].userinfo[0]
                        mybloguserimg[i] = response.data.data[i].userinfo[1]
                    }
                    myauthor.reverse()
                    mybid.reverse()
                    mycomment.reverse()
                    myfilepath.reverse()
                    myislike.reverse()
                    mylikenum.reverse()
                    mytype.reverse()
                    myiscollection.reverse()
                    mybloguser.reverse()
                    mybloguserimg.reverse()
                    This.setState({
                        bid: mybid,
                        comment: mycomment,
                        filepath: myfilepath,
                        type: mytype,
                        author: myauthor,
                        likenum: mylikenum,
                        iscollection: myiscollection,
                        islike: myislike,
                        bloguser: mybloguser,
                        bloguserimg: mybloguserimg
                    })
                }

            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get("/brainstorms")
            ////////////////获取所有头脑风暴
            .then(function (response) {
                //console.log(response.data.data)
                if (response.data.data.length == 0) {
                    This.setState({

                    })
                } else {
                    var mytid = new Array()
                    var mytitle = new Array()
                    var myideaimg = new Array()
                    for (let i = 0; i < response.data.data.length; i++) {
                        mytid[i] = response.data.data[i].tid
                        mytitle[i] = response.data.data[i].title
                        myideaimg[i] = idea_logo
                    }
                    myideaimg.reverse()
                    mytitle.reverse()
                    mytid.reverse()
                    This.setState({
                        tid: mytid,
                        title: mytitle,
                        ideaimg: myideaimg,
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        let FormDatablog = new FormData()
        FormDatablog.append("name", Data)
        axios.post("/blogs/rankinglist", FormDatablog)
            /////////////////获取排行榜信息
            .then(function (response) {
                console.log(response.data)
                var mylistname = new Array()
                var mylistimg = new Array()
                for (let i = 0; i < response.data.data.length; i++) {
                    mylistname[i] = response.data.data[i].userinfo[0]
                    mylistimg[i] = response.data.data[i].userinfo[1]
                }
                This.setState({
                    listimg: mylistimg,
                    listname: mylistname
                })
            }).catch(function (error) {
                console.log(error)
            })
    }

    async selectBlog(e) {
        let This = this
        /////根据平台筛选博客种类
        let nowplatform = e.target.innerHTML
        //console.log(nowplatform)
        document.querySelector(".pubilcblog_left_btn1").style.backgroundColor = "#fff"
        document.querySelector(".pubilcblog_left_btn2").style.backgroundColor = "#fff"
        document.querySelector(".pubilcblog_left_btn3").style.backgroundColor = "#fff"
        document.querySelector(".pubilcblog_left_btn4").style.backgroundColor = "#fff"
        document.querySelector(".pubilcblog_left_btn5").style.backgroundColor = "#fff"
        e.target.style.backgroundColor = "#1d91ff"
        await axios.get("/blogs?name=" + Data)
            .then(function (response) {
                if (response.data.data.length == 0) {
                    // This.setState({

                    // })
                } else {
                    //console.log(response.data.data)
                    var mybid = new Array()
                    var mycomment = new Array()
                    var myfilepath = new Array()
                    var mytype = new Array()
                    var myauthor = new Array()
                    var mylikenum = new Array()
                    var mybloguser = new Array()
                    var mybloguserimg = new Array()
                    for (var i = 0, j = 0; j < response.data.data.length;) {
                        if (response.data.data[j].blog.type == nowplatform) {
                            mybid[i] = response.data.data[j].blog.bid
                            mycomment[i] = response.data.data[j].blog.comment
                            myfilepath[i] = response.data.data[j].blog.filepath
                            mytype[i] = response.data.data[j].blog.type
                            myauthor[i] = ""//"admin"//Data
                            mylikenum[i] = response.data.data[j].blog.likenum
                            mybloguser[i] = response.data.data[j].userinfo[0]
                            mybloguserimg[i] = response.data.data[j].userinfo[1]
                            i++
                            j++
                        } else {
                            j++
                        }
                    }
                    This.setState({
                        bid: mybid,
                        comment: mycomment,
                        filepath: myfilepath,
                        type: mytype,
                        author: myauthor,
                        likenum: mylikenum,
                        bloguser: mybloguser,
                        bloguserimg: mybloguserimg
                    })
                }

            })
            .catch(function (error) {
                console.log(error)
            })
    }


    addNewidea() {
        let This = this
        let FormDatafile = new FormData()
        FormDatafile.append("title", document.querySelector(".addnewidea_body_message").value)
        FormDatafile.append("name", Data)
        axios.post("/brainstorm/publish", FormDatafile).then(function (response) {
            console.log(response.data)
            alert("发布成功")
            document.querySelector("#addnewidea").style.display = "none"
        }).catch(function (error) {
            console.log(error)
        })
    }

    async dianZhan(index, e) {
        let This = this
        let FormDatafile = new FormData()
        FormDatafile.append("blogId", This.state.bid[index])

        if (e.target.src == pubilcblog_zhan1) {
            /////////点赞
            e.target.src = pubilcblog_zhan2
            FormDatafile.append("model", "-1")
            await axios.post("/blog/like", FormDatafile).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            /////////取消点赞
            e.target.src = pubilcblog_zhan1
            FormDatafile.append("model", "1")
            await axios.post("/blog/like", FormDatafile).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        }
    }

    async collect(index, e) {
        let This = this
        let FormDatafile = new FormData()
        FormDatafile.append("blogId", This.state.bid[index])
        FormDatafile.append("name", Data)
        console.log(Data)
        console.log(This.state.bid[index])
        if (e.target.src == pubilcblog_collect1) {
            /////////收藏博客
            e.target.src = pubilcblog_collect2
            await axios.post("/blog/collection", FormDatafile).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            ////////取消收藏博客
            e.target.src = pubilcblog_collect1
            await axios.post("/blog/collection/cancel", FormDatafile).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
}

export default Pubilcblog;