import React, { Component } from 'react';
import './Personmessage.css'
import { DatePicker } from 'antd'
import personmessage_logo1 from '../../img/personmessage_logo1.png'
import personmessage_logo2 from '../../img/personmessage_logo2.png'


import Header from '../../components/header/header'
var Data = "admin"
class Personmessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameData:'',
            username: "",
            userimg: "",
            tel: "",
            qq: "",
            weibo: "",
            e_mail: "",
            sex: "",
            school: "",
            jointime: "",
            major: "",
            birthday: "",
            prjHistory: "",
            skill: "",
            title: "",
            platform: "",
            realname: "",
           
            
        }
    }
    render() {
        return (
            <div>
                <div id="personmessage_bg">
                    <Header path='/pages/personalmessage'/>
                    <div id="personmessage_left">
                        <div className="personmessage_logo1"
                            style={{
                                backgroundImage: 'url(' + this.state.userimg + ')'
                            }}></div>
                        <p className="personmessage_name">{this.state.username}</p>
                        <a className="personmessage_change" onClick={this.personmessagechangeOut.bind(this)}>信息修改</a>
                        <p className="personmessage_sign1">基本信息</p>
                        <p className="personmessage_p1">性别：{this.state.sex}</p>
                        <p className="personmessage_p2">学院：{this.state.school}</p>
                        <p className="personmessage_p3">专业：{this.state.major}</p>
                        <p className="personmessage_p4">生日：{this.state.birthday}</p>
                        <p className="personmessage_p5">加入时间：{this.state.jointime}</p>
                        <img src={personmessage_logo2} />
                    </div>
                    <div id="personmessage_right">
                        <div className="personmessage_message1">
                            <p className="personmessage_message_sign">自身经历</p>
                            <textarea readOnly value={this.state.prjHistory}>
                            </textarea>
                        </div>
                        <div className="personmessage_message2">
                            <p className="personmessage_message_sign">自身技能</p>
                            <textarea readOnly value={this.state.skill}>
                            </textarea>
                        </div>
                        <div className="personmessage_message3">
                            <p className="personmessage_message_sign">证书荣誉</p>
                            <textarea readOnly value={this.state.title}>
                            </textarea>
                        </div>
                    </div>
                    <img id="personmessage_logo" src={personmessage_logo1} />
                </div>
                <div id="personmessage_change">
                    <div className="personmessage_change_body">
                        <p className="personmessage_change_body_p1">性别：</p>
                        <input className="personmessage_change_body_input1_a" type="radio" name="sex" onChange={this.personmessageChange1.bind(this)} value="男" />   男
                        <br />
                        <input className="personmessage_change_body_input1_b" type="radio" name="sex" onChange={this.personmessageChange1.bind(this)} value="女" />   女
                        <p className="personmessage_change_body_p12">真实姓名：</p>
                        <input className="personmessage_change_body_input12" type="text" value={this.state.realname} onChange={this.personmessageChange12.bind(this)} />
                        <p className="personmessage_change_body_p2">学院：</p>
                        <input className="personmessage_change_body_input2" type="text" value={this.state.school} onChange={this.personmessageChange2.bind(this)} />
                        <p className="personmessage_change_body_p3">专业：</p>
                        <input className="personmessage_change_body_input3" type="text" value={this.state.major} onChange={this.personmessageChange3.bind(this)} />
                        <p className="personmessage_change_body_p4">生日：</p>
                        <DatePicker
                        onChange={this.pickBirthData}
                        placeholder='选择生日'
                        />
                       
                        <p className="personmessage_change_body_p5">加入时间：</p>
                        <DatePicker 
                        onChange={this.pickJoinData}
                         placeholder='选择加入时间'/>
                        
                        <p className="personmessage_change_body_p6">电话：</p>
                        <input className="personmessage_change_body_input6" type="text" value={this.state.tel} onChange={this.personmessageChange6.bind(this)} />
                        <p className="personmessage_change_body_p7">邮箱：</p>
                        <input className="personmessage_change_body_input7" type="text" value={this.state.e_mail} onChange={this.personmessageChange7.bind(this)} />
                        <p className="personmessage_change_body_p8">QQ：</p>
                        <input className="personmessage_change_body_input8" type="text" value={this.state.qq} onChange={this.personmessageChange8.bind(this)} />
                        <p className="personmessage_change_body_p13">微博：</p>
                        <input className="personmessage_change_body_input13" type="text" value={this.state.weibo} onChange={this.personmessageChange13.bind(this)} />
                        <p className="personmessage_change_body_p9">项目经历：</p>
                        <textarea className="personmessage_change_body_input9" type="text" value={this.state.prjHistory} onChange={this.personmessageChange9.bind(this)} />
                        <p className="personmessage_change_body_p10">相关能力：</p>
                        <textarea className="personmessage_change_body_input10" type="text" value={this.state.skill} onChange={this.personmessageChange10.bind(this)} />
                        <p className="personmessage_change_body_p11">证书荣誉：</p>
                        <textarea className="personmessage_change_body_input11" type="text" value={this.state.title} onChange={this.personmessageChange11.bind(this)} />
                        <p className="personmessage_change_body_p14">用户头像：</p>
                        <input className="personmessage_change_body_input14" type="file" data-value={this.state.userimg} onChange={this.personmessageChange14.bind(this)} style={{
                            paddingLeft: "4px"
                        }}/>
                        <button className="personmessage_change_body_btn1" onClick={this.personmessagechangeBack.bind(this)}>返回</button>
                        <button className="personmessage_change_body_btn2" onClick={this.personmessageChange.bind(this)}>确定</button>

                    </div>
                </div>
                <div className='footer'>
                <a target='_blank' href='http://www.beian.miit.gov.cn'>渝ICP备19017063号</a>
            </div>
            </div>
        );
    }

    personmessagechangeBack() {
        document.querySelector("#personmessage_change").style.display = "none"
    }
    personmessagechangeOut() {
        document.querySelector("#personmessage_change").style.display = "block"
    }


    personmessageChange1(e) {
        this.setState({
            sex: e.target.value
        })
    }
    personmessageChange2(e) {
        this.setState({
            school: e.target.value
        })
    }
    personmessageChange3(e) {
        this.setState({
            major: e.target.value
        })
    }
    pickJoinData = (data, dataStr)=>{
        this.setState({
           jointime:dataStr
        })

    }
    pickBirthData = (data, dataStr) => {
        this.setState({
            birthday: dataStr
        })

    }
 
    personmessageChange6(e) {
        this.setState({
            tel: e.target.value
        })
    }
    personmessageChange7(e) {
        this.setState({
            e_mail: e.target.value
        })
    }
    personmessageChange8(e) {
        this.setState({
            qq: e.target.value
        })
    }
    personmessageChange9(e) {
        this.setState({
            prjHistory: e.target.value
        })
    }
    personmessageChange10(e) {
        this.setState({
            skill: e.target.value
        })
    }
    personmessageChange11(e) {
        this.setState({
            title: e.target.value
        })
    }
    personmessageChange12(e) {
        this.setState({
            realname: e.target.value
        })
    }
    personmessageChange13(e) {
        this.setState({
            weibo: e.target.value
        })
    }
    personmessageChange14(e) {
        this.setState({
            userimg: e.currentTarget.getAttribute("data-value")
        })
    }

    //////////////////////////////////////交互

    componentDidMount() {
        let This = this
        const userNameData = localStorage.getItem('userName')
        this.setState({
            userNameData
        });
        this.$axios.get("/user/getUserInfoByUnam?username=" + userNameData)
            .then(function (response) {
                console.log('yeap');
                This.setState({
                    realname: response.data.realname,
                    username: response.data.unam,
                    userimg: response.data.upath,
                    tel: response.data.phone,
                    qq: response.data.qq,
                    weibo: response.data.weibo,
                    e_mail: response.data.mail,
                    sex: response.data.sex,
                    school: response.data.school,
                    jointime: response.data.jointime?response.data.jointime.substring(0, 10):'',
                    major: response.data.major,
                    birthday: response.data.birthday?response.data.birthday.substring(0, 10):'',
                    prjHistory: response.data.prjHistory,
                    skill: response.data.skills,
                    title: response.data.title,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    async personmessageChange() {
        //console.log(document.querySelector(".personmessage_change_body_input14").files[0])
        let This = this
        let url = ""
        let img = document.querySelector(".personmessage_change_body_input14").files[0]
        let FormDataimg = new FormData()
        FormDataimg.append("image", img)
        await this.$axios.post("/user/uploadImages", FormDataimg)
            .then(function (response) {
                /////////////////得到返回的url
                This.setState({
                    url: response.data[0] 
                })
                url = response.data[0]
                //console.log("上传图片成功" + response.data)
            })
            .catch(function (error) {
                console.log(error)
                //alert("上传图片出错")
            })
        await this.$axios.post("/user/updateUser", {
            "birthday": this.state.birthday,
            "jointime": this.state.jointime,
            "mail": this.state.e_mail,
            "major": this.state.major,
            "phone": this.state.tel,
            "platform": this.state.platform,
            "prjHistory": this.state.prjHistory,
            "qq": this.state.qq,
            "realname": this.state.realname,
            "school": this.state.school,
            "sex": this.state.sex,
            "skills": this.state.skill,
            "title": this.state.title,
            "unam": this.state.username,
            "upath": url,//document.querySelector(".personmessage_change_body_input14").files[0],
            "weibo": this.state.weibo,
        })
            .then(function (response) {
                console.log(response.data)
                if(response.code == 200){
                    alert("修改成功")
                    document.querySelector("#personmessage_change").style.display = "none"
                }else{
                    alert(response.code)
                }
                
            })
            .catch(function (error) {
                console.log(error)
                alert("修改失败！！！  未找到用户信息或服务器异常，请刷新页面重试")
            })
    }



}

export default Personmessage;