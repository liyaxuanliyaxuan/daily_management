 import React, { Component } from 'react';
import axios from 'axios'
import { Modal } from 'antd'

import './modal.scss'

import {
    Form,
    Button,
    Upload,
    Icon,
    Input,
    DatePicker,
    Select,
    message
} from 'antd';

const { Option } = Select;
const vipTypeOpts = ['迅雷', '爱奇艺', '腾讯视频', '百度网盘', 'CSDN', '百度文库', '寻图', '千图网', '其他']
class VipModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vipId: '',
            vipPassword: '',
            vipTime: '',
            completed: false,
            vipName: '',
            loading: false,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            this.setState({
                vipId: '',
                vipPassword: '',
                vipTime: '',
                completed: false,
                vipName: '',
                loading: false,
            })
        }
    }
    handleTypeChange(val) {

        console.log(val);
        this.setState({
            vipName: val
        })
    }
    handleInputChandge(type, e) {
        let newState = {}
        newState[type] = e.target.value
        console.log(e.target.value);
        this.setState(newState)
    }
    handleOk() {
        const _this = this
        const { vipName, vipTime, vipId, vipPassword } = { ...this.state }
        
        //表单检验、发送数据、处理回调
        if(vipName&&vipTime&&vipId&&vipPassword){
               axios.post('http://39.105.232.155:8081/infoshare/insertvip', {

            vnam: vipName,
            vaccount: vipId,
            vpassword: vipPassword,
            endTime: vipTime
        }).then((res) => {
            console.log(res);
            message.success('上传成功')
            _this.props.handleOk.call(_this)
            window.location.assign('/vip-source')
        }).catch((err) => {
            message.error('似乎出现了一些错误~~')
            console.log(err);
            
        })
        }else{
            message.error('会员账号、密码、截止日期不可为空哦 >_<')
        }
    
    }
    pickDate(date, dateString) {
        console.log(date, dateString);
        this.setState({

            vipTime: dateString
        })
    }
    render() {
        const { vipId, vipPassword, vipName } = { ...this.state }
        const { handleOk, handleCancel, visible } = { ...this.props }
        return (

            <Modal
                title="会员资源上传"
                visible={visible}
                okText={'确定上传'}
                cancelText={'取消'}

                onOk={this.handleOk.bind(this)}
                onCancel={handleCancel.bind(this)}
                centered={true}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='会员名称'>

                        <Select defaultValue="其他会员"
                            style={{ width: 120 }}
                            onChange={this.handleTypeChange.bind(this)}>
                            {
                                vipTypeOpts.map((item, index) => {
                                    return (
                                        <Option value={item} key={index}>{item}</Option>
                                    )


                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            value={vipId}
                            onChange={this.handleInputChandge.bind(this, 'vipId')}
                            addonBefore="会员账号"
                        />
                    </Form.Item>
                    <Input
                        value={vipPassword}
                        onChange={this.handleInputChandge.bind(this, 'vipPassword')}
                        addonBefore="会员密码"
                    />
                    <Form.Item>
                        <DatePicker
                            onChange={this.pickDate.bind(this)}
                            placeholder='截止日期' />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default VipModal;