import React, { Component } from 'react';

import {Modal} from 'antd'

import './modal.scss'

import {
    Form,
    Button,
    Upload,
    Icon,
    Input,
    DatePicker
  } from 'antd';


class VipModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
           vipId:'',
           vipPassword:'',
           vipUrl:'',
           completed: false
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
        const { vipUrl, vipId, vipPassword, vipName } ={...this.state}
        const {handleOk, handleCancel, visible} = {...this.props}
        return (
            
            <Modal
                title="会员资源上传"
                visible={visible}
                okText={'确定'}
                cancelText={'取消'}
                
                onOk={this.handleOk.bind(this)}
                onCancel={handleCancel.bind(this)}
                centered={true}
            >
                    <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
            <Input 
            value={vipName}
            onChange={this.handleInputChandge.bind(this,'vipName')}
            addonBefore="会员名称" 
            style={{width:'50%'}}
            placeholder='如：百度云会员'/>
        </Form.Item>
        <Form.Item>
        <Input 
           value={vipId}
           onChange={this.handleInputChandge.bind(this,'vipId')}
            addonBefore="会员账号" 
            />
        </Form.Item>
        <Input 
        value={vipPassword}
        onChange={this.handleInputChandge.bind(this,'vipPassword')}
            addonBefore="会员密码" 
            />
        <Form.Item>
        <Input 
        value={vipUrl}
        onChange={this.handleInputChandge.bind(this,'vipUrl')}
            addonBefore="会员网址" 
            />
        </Form.Item>
        <Form.Item>
      <DatePicker 
      onChange={this.pickDate.bind(this)}
      placeholder='截止日期'/>
        </Form.Item>
      </Form>
            </Modal>
        );
    }
}
export default VipModal;