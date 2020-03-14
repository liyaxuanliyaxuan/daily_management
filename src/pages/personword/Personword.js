import React, { Component } from 'react';
import './Personword.css'
import personword_img1 from '../../img/personword_img1.png'
import Header from '../../components/header/header'
class Personword extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div id="personword_bg">
                 <Header path='/pages/Personword'/>
                    <div id="personword_left">
                        <button className="personword_button1">项目进度文档</button>
                        <button className="personword_button2">项目计划文档</button>
                        <button className="personword_button3">项目讨论会议纪要</button>
                        <button className="personword_button4">接口文档</button>
                        <button className="personword_button5">详细功能介绍文档</button>
                        <button className="personword_button6">项目合同书</button>
                        <button className="personword_button7">项目结题验收书</button>
                        <button className="personword_button8">课题研究报告</button>
                        <button className="personword_button9">学员结业报告</button>
                        <button className="personword_button10">结业答辩评价表</button>
                        <button className="personword_button11">项目实施过程</button>
                    </div>
                    <div id="personword_right">
                        <div className="personword_right_up">
                            <a href="javascript:history.back(-1)" className="personword_back">返回</a>
                            <a className="personword_change">信息修改</a>
                            <img src={personword_img1} />
                            <p className="personword_right_up_p1">项目名称：</p>
                            <p className="personword_right_up_p2">项目牵头人：</p>
                            <p className="personword_right_up_p3">项目创建时间：</p>
                            <p className="personword_right_up_p4">项目结束时间：</p>
                        </div>
                        <div className="personword_right_down">
                            <p className="personword_right_down_p1">项目负责人</p>
                            <textarea className="personword_right_down_text1" readOnly value="xxx,xxx,xxxx,xxx,xxxxx,xxxx,xxxx,xx"></textarea>                       
                            <textarea className="personword_right_down_text2" readOnly value="xxx,xxx,xxxx,xxx,xxxxx,xxxx,xxxx,xxxxx,xxx,xxxx,xxx,xxxxx,xxxx,xxxx,xxxxx,xxx,xxxx,xxx,xxxxx,xxxx,xxxx,xxxxx,xxx,xxxx,xxx,xxxxx,xxxx,xxxx,xxxxx,xxx,xxxx,xxx,xxxxx,xxxx,xxxx,xx"></textarea>
                            <p className="personword_right_down_p2">项目简介</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Personword;