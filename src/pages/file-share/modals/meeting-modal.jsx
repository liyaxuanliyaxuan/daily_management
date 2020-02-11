import React, { Component } from 'react';

import { Modal } from 'antd'

import './modal.scss'

import {
    Form,
    Button,
    Upload,
    Icon,
    Input,
    DatePicker
} from 'antd';

class UpLoadMeetingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingName:'',
            confirmLoading: false,

        }
    }
    handleInputChandge(type, e){
        let newState = {}
        newState[type] = e.target.value
        console.log(e.target.value);
        this.setState(newState)
    }
    handleOk(){
        this.props.handleOk.call(this)
        //表单检验、发送数据、处理回调
    }
    pickDate(date,dateString){

        console.log(date,dateString);
    }
    render() {
        const uploadMeetingConfigs = {
            customRequest(){
                return false
            }
        }
        const { meetingName, confirmLoading} = {...this.state}
        const { handleOk, handleCancel, visible } = { ...this.props }
        return (

            <Modal
                title="上传会议"
                okText={'确定上传'}
                cancelText={'取消'}
                confirmLoading={confirmLoading}
                visible={visible}
                onOk={this.handleOk.bind(this)}
                onCancel={handleCancel.bind(this)}
                centered={true}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <Input
                            value={meetingName}
                            onChange={this.handleInputChandge.bind(this,'meetingName')}
                            size='small'
                            style={{ width: '80%' }}
                            addonBefore='会议名称'
                            placeholder='某某项目项目汇报、某某平台技术交流、会议纪要' />
                    </Form.Item>
                    <Form.Item >
                        <DatePicker 
                        onChange={this.pickDate.bind(this)}
                        placeholder='选择会议时间' />
                    </Form.Item>
                    <Form.Item>
                        <Upload {...uploadMeetingConfigs}>
                            <Button>
                                <Icon type="upload" /> 点击上传会议记录
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default UpLoadMeetingModal;