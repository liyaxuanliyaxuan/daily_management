import React, { Component } from 'react';
import './Pubilcidea.css'
import pubilcidea_submit from '../../img/pubilcidea_submit.png'

import Header from '../../components/header/header'
class Pubilcidea extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            username: "张三"
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
                                this.state.ideaword.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={require("../../img/pubilcblog_add.png")} />
                                            <p className="pubilcidea_left_num">{"IDEA  " + (index + 1)}</p>
                                            <p className="pubilcidea_left_word">{this.state.ideaword[index]}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div id="pubilcidea_right">
                        <div className="pubilcidea_right_head">
                            <p className="pubilcidea_right_p1">{"IDEA  " + this.state.now}</p>
                            <p className="pubilcidea_right_p2">{this.state.ideaword[this.state.now - 1]}</p>
                        </div>
                        <div className="pubilcidea_chat_hidden">
                            <ul className="pubilcidea_chat">
                                {
                                    this.state.chatname.map((item, index) => {
                                        return (
                                            <li key={index} className={this.state.chatname[index]==this.state.username?"mychat":"otherchat"}>
                                                <div className="pubilcidea_chat_logo"></div>
                                                <p className="pubilcidea_chat_name">{this.state.chatname[index]}</p>
                                                <p className="pubilcidea_chat_word">{this.state.chatmessage[index]}</p>
                                                <div className="clear"></div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <input className="pubilcidea_input" placeholder="请自由发表言乱" type="word" />
                        <img className="pubilcidea_submit" src={pubilcidea_submit} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let a = document.querySelector(".pubilcidea_chat_hidden")
        a.scrollTop = a.scrollHeight
    }
}

export default Pubilcidea;