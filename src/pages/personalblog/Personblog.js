import React, { Component } from 'react';
import './Personblog.css'
import axios from 'axios';
import cookie from 'react-cookies'

import personblog_zhan1 from '../../img/personblog_zhan1.png'
import personblog_zhan2 from '../../img/personblog_zhan2.png'
import personblog_collect1 from '../../img/personblog_collect1.png'
import personblog_collect2 from '../../img/personblog_collect2.png'

import Header from '../../components/header/header'
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

var isLike = false

class Personbolg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameData:'',
            comment: [

            ],
            bid: [

            ],
            filepath: [

            ],
            type: [

            ],
            author: [

            ],
            likenum: [

            ],
            iscollection: [

            ],
            islike: [

            ],
            bloguser: [

            ],
            bloguserimg: [

            ],
            ///////////////////////
            realname: "",
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
                   /////////////////////////
                   submittype: "",
        }
    }
    render() {
        return (
            <div>
                <div id="personblog_bg">
                    <Header path='/personblog'/>
                    <div id="personblog_left">
                        <div className="personblog_left_logo"
                            style={{
                                backgroundImage: 'url(' + this.state.userimg + ')'
                            }}
                        ></div>
<div className="personblog_upload" onClick={() => { document.querySelector("#submitblog").style.display = 'block' }}>我要上传</div>                    
    <div className="personblog_collect" onClick={this.myCollect.bind(this)}>我的收藏</div>
                    </div>
                    <div className="personblog_right_container">
                        <div id="personblog_right">
                            {
                                this.state.comment.map((item, index) => {
                                    return (
                                        <div className="personblog_blog" key={index} >
                <div className="personblog_blog_logo1"
                                                style={{
                                                    backgroundImage: 'url(' + this.state.bloguserimg[index] + ')'
                                                }}
                                            ></div>
                                            <p className="personblog_blog_name">{this.state.bloguser[index]}</p>
                                            <p className="personblog_blog_word">{this.state.comment[index]}</p>
                                            <div className="personblog_blog_div">
                                            <div className="personblog_blog_img"
                                                    style={{
                                                        backgroundImage: 'url(' + this.state.filepath[index] + ')'
                                                    }}
                                                ></div>
                                                {/* <a className="personblog_blog_link" href={this.state.links[index]}>{this.state.links[index]}</a> */}
                                            </div>
                                            <img className="personblog_blog_logo2" src={this.state.islike[index] ? personblog_zhan2 : personblog_zhan1} onClick={this.dianZhan.bind(this, index)} />
                                            <img className="personblog_blog_logo3" src={this.state.iscollection[index] ? personblog_collect2 : personblog_collect1} onClick={this.collect.bind(this, index)} />
                                            <div className="personblog_blog_logo4">{this.state.type[index]}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div id="submitblog">
                        <div className="submitblog_body">
                            <div className="submitblog_body_head">
                                <p className="submitblog_body_head_p">上传</p>
                                <button className="submitblog_body_back" onClick={() => { document.querySelector("#submitblog").style.display = 'none' }}>取消</button>
                                <button className="submitblog_body_submit" onClick={this.submitBlog.bind(this)}>发表</button>
                            </div>
                            <div className="submitblog_body_left">
                                <p className="submitblog_body_left_p">请选择平台</p>
                                <input type="radio" name="platform" onChange={() => { this.setState({ submittype: "服务器" }) }} />服务器<br />
                                <input type="radio" name="platform" onChange={() => { this.setState({ submittype: "客户端" }) }} />客户端<br />
                                <input type="radio" name="platform" onChange={() => { this.setState({ submittype: "产品" }) }} />产品<br />
                                <input type="radio" name="platform" onChange={() => { this.setState({ submittype: "硬件" }) }} />硬件<br />
                                <input type="radio" name="platform" onChange={() => { this.setState({ submittype: "其他" }) }} />其他<br />
                            </div>
                            <div className="submitblog_body_right">
                                <textarea className="submitblog_message"></textarea>
                                <p>选择图片 :</p>
                                <input type="file" className="submitblog_img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }




    ///////////////////////////////交互

    componentDidMount() {
        let This = this
        const userNameData = cookie.load('ifLogin')
        this.setState({
            userNameData
        });
        this.$axios.get("/user/getUserInfoByUnam?username=" + userNameData)
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

        this.$axios.get("/blogs/by/userid?name=" + this.state.userNameData)
            ///////////////////////获取用户相关博客
            .then(function (response) {
                console.log(response.data)
                if (response.data.length == 0) {
                    This.setState({
                        bid: [],
                        comment: [],
                        filepath: [],
                        type: [],
                    })
                } else {
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
                    for (var i = 0; i < response.data.length; i++) {
                        mybid[i] = response.data[i].blog.bid
                        mycomment[i] = response.data[i].blog.comment
                        myfilepath[i] = response.data[i].blog.filepath
                        mytype[i] = response.data[i].blog.type
                        myauthor[i] = This.state.username
                        mylikenum[i] = response.data[i].blog.likenum
                        myiscollection[i] = response.data[i].iscollection
                        myislike[i] = response.data[i].islike
                        mybloguser[i] = response.data[i].userinfo[0]
                        mybloguserimg[i] = response.data[i].userinfo[1]
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
            //document.querySelector('.personblog_collect').click();


    }

    submitBlog() {
        /////////上传博客
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data;charset=UTF-8'  //'application/x-www-form-urlencoded' 
            }
        }
        let This = this
        let type = this.state.submittype
        let file = document.querySelector(".submitblog_img").files[0]
        let FormDatafile = new FormData()
        FormDatafile.append("file", file)
        FormDatafile.append("name", This.state.username)
        FormDatafile.append("type", type)
        FormDatafile.append("comment", document.querySelector(".submitblog_message").value)
        //console.log(FormDatafile)
        this.$axios.post("/blog/publish", FormDatafile, config)
            // {
            //     file: file,
            //     userId: "1",
            //     type: type,
            //     comment: document.querySelector(".submitblog_message").value
            // }
            .then(function (response) {
                console.log(response.data)
                alert("发表成功")
                document.querySelector("#submitblog").style.display = "none"
            }).catch(function (error) {
                console.log(error)
            })
    }



    // dianZhan(e) {
    //     if (e.target.src == personblog_zhan1) {
    //         e.target.src = personblog_zhan2
    //     } else {
    //         e.target.src = personblog_zhan1
    //     }
    // }
    // collect(e) {
    //     if (e.target.src == personblog_collect1) {
    //         e.target.src = personblog_collect2
    //     } else {
    //         e.target.src = personblog_collect1
    //     }
    // }

    async dianZhan(index, e) {
        let This = this
        let FormDatafile = new FormData()
        FormDatafile.append("blogId", This.state.bid[index])

        if (e.target.src == personblog_zhan1) {
            /////////点赞
            e.target.src = personblog_zhan2
            FormDatafile.append("model", "-1")
            await this.$axios.post("/blog/like", FormDatafile).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            /////////取消点赞
            e.target.src = personblog_zhan1
            FormDatafile.append("model", "1")
            await this.$axios.post("/blog/like", FormDatafile).then(function (response) {
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
        FormDatafile.append("name", This.state.username)
        console.log(This.state.username)
        console.log(This.state.bid[index])
        if (e.target.src == personblog_collect1) {
            /////////收藏博客
            e.target.src = personblog_collect2
            await this.$axios.post("/blog/collection", FormDatafile).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            ////////取消收藏博客
            e.target.src = personblog_collect1
            await this.$axios.post("/blog/collection/cancel", FormDatafile).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        }
    }

    myCollect(e) {
        let This = this
        let FormDatafile = new FormData()
        FormDatafile.append("name", This.state.username)
        if (isLike) {
            console.log("获取所有")
            //////////////////////////获取所有博客
            e.target.style.backgroundColor = '#fff'
            isLike = false
            this.$axios.get("/blogs/by/userid?name=" + This.state.username)
                ///////////////////////获取所有博客
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.length == 0) {
                        This.setState({
                            bid: [],
                            comment: [],
                            filepath: [],
                            type: [],
                        })
                    } else {
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
                        for (var i = 0; i < response.data.length; i++) {
                            mybid[i] = response.data[i].blog.bid
                            mycomment[i] = response.data[i].blog.comment
                            myfilepath[i] = response.data[i].blog.filepath
                            mytype[i] = response.data[i].blog.type
                            myauthor[i] = "lin"//this.state.username
                            mylikenum[i] = response.data[i].blog.likenum
                            myiscollection[i] = response.data[i].iscollection
                            myislike[i] = response.data[i].islike
                            mybloguser[i] = response.data[i].userinfo[0]
                            mybloguserimg[i] = response.data[i].userinfo[1]
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

        } else {
            //////////////////////////筛选已经被收藏的博客
            e.target.style.backgroundColor = '#5fb1ff'
            isLike = true
            console.log("获取收藏")
            this.$axios.post("/blog/user/collection", FormDatafile)
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.length == 0) {
                        This.setState({
                            bid: [],
                            comment: [],
                            filepath: [],
                            type: [],
                        })
                    } else {
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
                        for (var i = 0; i < response.data.length; i++) {
                            mybid[i] = response.data[i].blog.bid
                            mycomment[i] = response.data[i].blog.comment
                            myfilepath[i] = response.data[i].blog.filepath
                            mytype[i] = response.data[i].blog.type
                            myauthor[i] = "lin"//this.state.username
                            mylikenum[i] = response.data[i].blog.likenum
                            myiscollection[i] = response.data[i].iscollection
                            myislike[i] = response.data[i].islike
                            mybloguser[i] = response.data[i].userinfo[0]
                            mybloguserimg[i] = response.data[i].userinfo[1]
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
        }



    }
}

export default Personbolg;