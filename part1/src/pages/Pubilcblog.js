import React, { Component } from 'react';
import './Pubilcblog.css'
import axios from 'axios';
import pubilcblog_zhan1 from '../img/personblog_zhan1.png'
import pubilcblog_zhan2 from '../img/personblog_zhan2.png'
import pubilcblog_collect1 from '../img/personblog_collect1.png'
import pubilcblog_collect2 from '../img/personblog_collect2.png'
import addword_close from '../img/addword_close.png'

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
                '../img/personblog_collect.png', '../img/personblog_collect.png', '../img/personblog_collect.png'
            ],
            ideaword:[
                '啦啦啦啦啦啦啦','啦啦啦啦啦啦啦','啦啦啦啦啦啦啦','啦啦啦啦啦啦啦'
            ],
            ideaimgs:[
                '../img/personblog_collect.png', '../img/personblog_collect.png', '../img/personblog_collect.png', '../img/personblog_collect.png'
            ],
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
            ///////////////

        }
    }
    render() {
        return (
            <div>
                <div id="pubilcblog_bg">
                    <div id="pubilcblog_header">
                        <a href="/" className="pubilcblog_header_a pubilcblog_header_a3">个人主页</a>
                        <a className="pubilcblog_header_a pubilcblog_header_a1">博客</a>
                        <a className="pubilcblog_header_a">资料共享</a>
                        <a className="pubilcblog_header_a">成果展示</a>
                        <div className="pubilcblog_header_loge"
                            style={{
                                backgroundImage: 'url(' + this.state.userimg + ')'
                            }}
                        ></div>
                        <p>{this.state.username}</p>
                        <a className="pubilcblog_header_a2 pubilcblog_header_a">退出</a>
                    </div>
                    <div id="pubilcblog_left">
                        <button className="pubilcblog_left_btn1">服务器</button>
                        <button className="pubilcblog_left_btn2">客户端</button>
                        <button className="pubilcblog_left_btn3">产品</button>
                        <button className="pubilcblog_left_btn4">硬件</button>
                        <button className="pubilcblog_left_btn5">其他</button>
                    </div>
                    <div className="pubilcblog_right_container">
                        <div id="pubilcblog_right">
                            {
                                this.state.blogs.map((item, index) => {
                                    return (
                                        <div className="pubilcblog_blog" key={index} >
                                            <div className="pubilcblog_blog_logo1"></div>
                                            <p className="pubilcblog_blog_name">张三</p>
                                            <p className="pubilcblog_blog_word">{this.state.blogs[index]}</p>
                                            <div className="pubilcblog_blog_div">
                                                <img className="pubilcblog_blog_img" src={require("../img/homepage_bg.png")} />
                                                <a className="pubilcblog_blog_link" href={this.state.links[index]}>{this.state.links[index]}</a>
                                            </div>
                                            <img className="pubilcblog_blog_logo2" src={pubilcblog_zhan1} onClick={this.dianZhan.bind(this)} />
                                            <img className="pubilcblog_blog_logo3" src={pubilcblog_collect1} onClick={this.collect.bind(this)} />
                                            <div className="pubilcblog_blog_logo4">产品</div>
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
                                <p className="firstname">张三</p>
                                <div className="firstimg"></div>
                            </il>
                            <il className="second">
                                <p className="secondnum">2</p>
                                <p className="secondname">张三</p>
                                <div className="secondimg"></div>
                            </il>
                            <il className="third">
                                <p className="thirdnum">3</p>
                                <p className="thirdname">张三</p>
                                <div className="thirdimg"></div>
                            </il>
                        </ul>
                    </div>
                    <div id="pubilcblog_idea">
                        <p className="pubilcblog_idea_h1">头脑风暴</p>
                        <button className="pubilcblog_add" onClick={()=>{document.querySelector("#addnewidea").style.display = "block"}}></button>
                        <ul>
                            {
                                this.state.ideaword.map((item, index) => {
                                    return (
                                        <a href="/pages/Pubilcidea" key={index}>
                                        <li key={index}>
                                            <img src={require("../img/pubilcblog_add.png")}/>
                                            <p>{this.state.ideaword[index]}</p>
                                        </li>
                                        </a>
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
                            <img src={addword_close} onClick={()=>{document.querySelector("#addnewidea").style.display = "none"}}/>
                        </div>
                        <div className="addnewidea_body_text">
                            <p>我的idea：</p>
                            <textarea className="addnewidea_body_message" />
                            <button className="addnewidea_body_back" onClick={()=>{document.querySelector("#addnewidea").style.display = "none"}}>取消</button>
                            <button className="addnewidea_body_submit">提交</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    dianZhan(e) {
        if (e.target.src == pubilcblog_zhan1) {
            e.target.src = pubilcblog_zhan2
        } else {
            e.target.src = pubilcblog_zhan1
        }
    }
    collect(e) {
        if (e.target.src == pubilcblog_collect1) {
            e.target.src = pubilcblog_collect2
        } else {
            e.target.src = pubilcblog_collect1
        }
    }
    myCollect(e) {
        e.target.style.backgroundColor = '#5fb1ff'
    }


    //////////////////////////////交互

    componentDidMount() {
        let This = this
        axios.get("/user/getUserInfoByUnam?username=admin")
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

    }

}

export default Pubilcblog;