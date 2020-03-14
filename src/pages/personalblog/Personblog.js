import React, { Component } from 'react';
import './Personblog.css'
import axios from 'axios';
import personblog_zhan1 from '../../img/personblog_zhan1.png'
import personblog_zhan2 from '../../img/personblog_zhan2.png'
import personblog_collect1 from '../../img/personblog_collect1.png'
import personblog_collect2 from '../../img/personblog_collect2.png'

import Header from '../../components/header/header'
class Personbolg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [
                "我找到了一个很有用的网站"
            ],
            links: [
                'https://www.ui.cn/'
            ],
            imgs: [
                '../../img/personblog_collect.png'
            ],
            ///////////////////////
            realname: "",
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
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
                        <div className="personblog_upload" onClick={()=>{document.querySelector("#submitblog").style.display = 'block'}}>我要上传</div>
                        <div className="personblog_collect" onClick={this.myCollect.bind(this)}>我的收藏</div>
                    </div>
                    <div className="personblog_right_container">
                        <div id="personblog_right">
                            {
                                this.state.blogs.map((item, index) => {
                                    return (
                                        <div className="personblog_blog" key={index} >
                                            <div className="personblog_blog_logo1"></div>
                                            <p className="personblog_blog_name">张三</p>
                                            <p className="personblog_blog_word">{this.state.blogs[index]}</p>
                                            <div className="personblog_blog_div">
                                                <img className="personblog_blog_img" src={require("../../img/homepage_bg.png")} />
                                                <a className="personblog_blog_link" href={this.state.links[index]}>{this.state.links[index]}</a>
                                            </div>
                                            <img className="personblog_blog_logo2" src={personblog_zhan1} onClick={this.dianZhan.bind(this)} />
                                            <img className="personblog_blog_logo3" src={personblog_collect1} onClick={this.collect.bind(this)} />
                                            <div className="personblog_blog_logo4">产品</div>

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
                                <button className="submitblog_body_back" onClick={()=>{document.querySelector("#submitblog").style.display = 'none'}}>取消</button>
                                <button className="submitblog_body_submit">发表</button>
                            </div>
                            <div className="submitblog_body_left">
                                <p className="submitblog_body_left_p">请选择平台</p>
                                <input type="radio" name="platform"/>服务器<br/>
                                <input type="radio" name="platform"/>客户端<br/>
                                <input type="radio" name="platform"/>产品<br/>
                                <input type="radio" name="platform"/>硬件<br/>
                                <input type="radio" name="platform"/>其他<br/>
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

    dianZhan(e) {
        if (e.target.src == personblog_zhan1) {
            e.target.src = personblog_zhan2
        } else {
            e.target.src = personblog_zhan1
        }
    }
    collect(e) {
        if (e.target.src == personblog_collect1) {
            e.target.src = personblog_collect2
        } else {
            e.target.src = personblog_collect1
        }
    }
    myCollect(e){
        e.target.style.backgroundColor = '#5fb1ff'
    }

    ///////////////////////////////交互

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

export default Personbolg;