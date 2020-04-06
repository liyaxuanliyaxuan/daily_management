import React, { Component } from 'react';
import './Pubilcidea.css'
import pubilcidea_submit from '../../img/pubilcidea_submit.png'
import cookie from 'react-cookies'
import Header from '../../components/header/header'
import axios from 'axios';
import idea_logo from '../../img/idea_logo.png'
import userimg from '../../img/userimg.jpg'

///////////////////////////////////////////////////////////////////////////
////↓↓↓用户名(username),不是真实名字(realname),字符型
var User = "admin"//admin是默认值，你直接删了就ok
/*
    说明：
        1.这个页面有两个从其他页面传来的参数，但是你只用给这一个()赋值，下面那一个参数(Data)你不用管
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
//   ↓↓↓  这个参数由公共博客页面传递过来，使用的的link的state传递参数
var Data = "" //用于接收由公共博客页面传递的参数，数据为目前的idea id
////////////////////////////////////////




class Pubilcidea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameData:'',
            sign: "1",
            ideaword: [
                '啦啦啦啦啦啦啦啦啦啦', '啦啦啦啦啦啦啦1啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦', '啦啦啦啦啦啦啦', '啦啦啦啦啦啦啦'
            ],
            ideaimgs: [
                '../../img/personblog_collect.png', 
                '../../img/personblog_collect.png', 
                '../../img/personblog_collect.png', 
                '../../img/personblog_collect.png'
            ],
            now: 2,
            chatimg: [
                '../../img/personblog_collect.png',
                '../../img/personblog_collect.png'
            ],
            chatname: [
                "张三","张三", "张三", "张","张","张","张三","张三","张三"
            ],
            chatmessage: [
                '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦','啦啦啦啦啦啦啦啦啦啦'
            ],
            username: "",
            userimg: "",
            /////////////////////////////
            nowtitle: [

            ],
            thiscomment: [

            ],
            thisfrom: [

            ],
            thisid: [

            ],
            thisname: [

            ],
            thisimg: [

            ],
            //////////////////////
            tid: [

            ],
            title: [

            ],
            ideaimg: [

            ]

        }
    }
    render() {
        return (
            <div>
                <div id="pubilcidea_bg">
                    <Header path='/pages/Publicidea'/>
                    <div id="pubilcidea_left">
                        <div className="pubilcidea_elseidea">其他IDEA</div>
                        <ul>
                            {
                                this.state.tid.map((item, index) => {
                                    return (
                                        <li key={index} onClick={this.changetoIdea.bind(this, index)}>
                                            <img src={this.state.ideaimg[index]} />
                                            <p className="pubilcidea_left_num">{"IDEA  " + this.state.tid[index]}</p>
                                            <p className="pubilcidea_left_word">{this.state.title[index]}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div id="pubilcidea_right">
                        <div className="pubilcidea_right_head">
                            <p className="pubilcidea_right_p1">{"IDEA  " + Data}</p>
                            <p className="pubilcidea_right_p2">{this.state.nowtitle}</p>
                        </div>
                        <div className="pubilcidea_chat_hidden">
                            <ul className="pubilcidea_chat">
                                {
                                    this.state.thiscomment.map((item, index) => {
                                        return (
                                            <li key={index} className={this.state.thisname[index] == this.state.username ? "mychat" : "otherchat"}>
                                                <div className="pubilcidea_chat_logo"
                                                    style={{
                                                        background: 'url(' + this.state.thisimg[index] + ')'
                                                    }}
                                                ></div>
                                                <p className="pubilcidea_chat_name">{this.state.thisname[index]}</p>
                                                <p className="pubilcidea_chat_word">{this.state.thiscomment[index]}</p>
                                                <div className="clear"></div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <input className="pubilcidea_input" placeholder="请自由发表言论" type="word" />
                        <img className="pubilcidea_submit" src={pubilcidea_submit} onClick={this.submitChat.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
    componentWillMount() {
        //////////////////////////////////
        // ↓↓↓
        Data = this.props.location.state;
        //console.log(Data)
        ///////////////////////////////////
        this.setState({
            username: '',
            now: Data
        })

    }

    componentDidMount() {
        const userNameData = localStorage.getItem('userName')
        this.setState({
            userNameData,
            username:userNameData,

        });
        let a = document.querySelector(".pubilcidea_chat_hidden")
        a.scrollTop = a.scrollHeight
        let This = this

        this.$axios.get("/user/getUserInfoByUnam?username=" + Data)
        .then(function (response) {
            This.setState({      
                userimg: response.data.data.upath,
            })
        })
        .catch(function (error) {
            console.log(error)
        })



        this.$axios.get("/brainchats/bybrainid?brainid=" + This.state.now)
            .then(function (response) {
                //////////获取某一idea下的聊天信息
                console.log(response.data)
                if (response.data.length == 0) {
                    This.setState({

                    })
                } else {
                    var mythiscomment = new Array()
                    var mythisfrom = new Array()
                    var mythisid = new Array()
                    var mythisname = new Array()
                    var mythisimg = new Array()
                    for (var i = 0; i < response.data.length; i++) {
                        mythiscomment[i] = response.data[i].brainChat.comment
                        mythisfrom[i] = response.data[i].brainChat.from
                        mythisid[i] = response.data[i].brainChat.cid
                        mythisname[i] = response.data[i].userinfo[0]
                        mythisimg[i] = response.data[i].userinfo[1]
                    }
                    This.setState({
                        thiscomment: mythiscomment,
                        thisfrom: mythisfrom,
                        thisid: mythisid,
                        thisname: mythisname,
                        thisimg: mythisimg,
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        this.$axios.get("/brainstorms").then(function (response) {
            //////获取当前idea的内容
            let i = 0
            //console.log("data"+Data)
            //console.log(response.data.data)
            while (response.data[i].tid != Data && i < 1000) {
                //console.log(response.data.data[i].tid)
                i++
            }
            This.setState({
                nowtitle: response.data[i].title
            })
        }).catch(function (error) {
            console.log(error)
        })

        this.$axios.get("/brainstorms")
            ////////////////获取所有头脑风暴
            .then(function (response) {
                //console.log(response.data.data)
                if (response.data.length == 0) {
                    This.setState({

                    })
                } else {
                    var mytid = new Array()
                    var mytitle = new Array()
                    var myideaimg = new Array()
                    for (var i = 0; i < response.data.length; i++) {
                        mytid[i] = response.data[i].tid
                        mytitle[i] = response.data[i].title
                        myideaimg[i] = idea_logo

                    }
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

    }

    componentDidUpdate() {
        let This = this
        //console.log("页面已刷新")
        let a = document.querySelector(".pubilcidea_chat_hidden")
        a.scrollTop = a.scrollHeight
    }

    submitChat() {
        ///////////发表聊天
        let This = this
        let value = document.querySelector(".pubilcidea_input").value
        //let from = 1 //this.state.username
        let cid = ""
        let mythiscomment = This.state.thiscomment
        let mythisfrom = This.state.thisfrom
        let mythisname = This.state.thisname
        let mythisimg = This.state.thisimg
        let sign = This.state.sign
        let FormDatafile = new FormData()
        FormDatafile.append("brainid", Data)
        FormDatafile.append("comment", value)
        FormDatafile.append("name", this.state.userNameData)
        sign++
        mythiscomment.push(value)
        mythisfrom.push(This.state.username)
        mythisname.push(This.state.username)
        mythisimg.push(This.state.userimg)
        This.setState({
            thiscomment: mythiscomment,
            thisfrom: mythisfrom,
            thisimg: mythisimg,
            thisname: mythisname,
            sign: sign
        })
        //console.log(Data)
        //console.log(value)
        this.$axios.post("/brainchat/publish", FormDatafile).then(function (response) {
            //console.log(response.data)
            document.querySelector(".pubilcidea_input").value = ""
        }).catch(function (error) {
            console.log(error)
        })
    }


    async changetoIdea(index) {
        /////////切换到某一个idea的聊天窗口（左边栏用）
        let This = this
        index++
        Data = index
        await this.$axios.get("/brainchats/bybrainid?brainid=" + index)
        .then(function (response) {
            //////////获取某一idea下的聊天信息
            console.log(response.data)
            if (false) {
                This.setState({
                     
                })
            } else {
                var mythiscomment = new Array()
                var mythisfrom = new Array()
                var mythisid = new Array()
                var mythisname = new Array()
                var mythisimg = new Array()
                for (var i = 0; i < response.data.length; i++) {
                    mythiscomment[i] = response.data[i].brainChat.comment
                    mythisfrom[i] = response.data[i].brainChat.from
                    mythisid[i] = response.data[i].brainChat.cid
                    mythisname[i] = response.data[i].userinfo[0]
                    mythisimg[i] = response.data[i].userinfo[1]
                }
                This.setState({
                    thiscomment: mythiscomment,
                    thisfrom: mythisfrom,
                    thisid: mythisid,
                    thisname: mythisname,
                    thisimg: mythisimg,
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        })

        await this.$axios.get("/brainstorms").then(function (response) {
            //////获取当前idea的内容
            let i = 0
            //console.log("data"+Data)
            //console.log(response.data.data)
            while (response.data[i].tid != index && i < 1000) {
                //console.log(response.data.data[i].tid)
                i++
            }
            This.setState({
                nowtitle: response.data[i].title
            })
        }).catch(function (error) {
            console.log(error)
        })

    }
}

export default Pubilcidea;