import React, { Component } from 'react';

import { Modal } from 'antd'

import './modal.scss'

import {
    Form,
    Button,
    Upload,
    Icon,
    Input,
    DatePicker,
    Select
} from 'antd';

const {Option} = Select;
class UpLoadMeetingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingName:'',
            confirmLoading: false,
            fileList:[]

        }
    }
    handleTypeChange(){

    }
    handleInputChandge(type, e){
        let newState = {}
        newState[type] = e.target.value
        console.log(e.target.value);
        this.setState(newState)
    }
    handleOk(){
        this.props.handleOk.call(this)//关闭选择框
        //表单检验、发送数据、处理回调
        const { fileList } = this.state;
        const formData = new FormData();

        formData.append('file', fileList[fileList.length]);
    }
    pickDate(date,dateString){

        console.log(date,dateString);
    }
    beforeUpload(file) {

        // this.setState(state => ({
        //     fileList: [...state.fileList, file],
        // }))

        return false
        // return isJpgOrPng && isLt2M;
    }
    handleChange = ({ fileList }) => this.setState({ fileList });
    render() {
        const uploadButton = (
            <Button>
            <Icon type="upload" /> 选择上传会议记录
           </Button>
        )
        const reselectButton = (
            <Button>
            <Icon type="upload" /> 重新选择
           </Button>
        )
      
     
        const { meetingName, confirmLoading, fileList} = {...this.state}
        const { handleOk, handleCancel, visible } = { ...this.props }
        
        return (

            <Modal
                title="上传会议"
                okText={'确定上传'}
                cancelText={'取消'}
                destroyOnClose={true}
                confirmLoading={confirmLoading}
                visible={visible}
                onOk={()=>{
                    handleOk.call(this) 
                    this.setState({
                        fileList:[]
                    })
                 }}
                onCancel={()=>{
                   handleCancel.call(this) 
                   this.setState({
                       fileList:[]
                   })
                }
                    }
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
                    <Form.Item label='会议类型'>
                        <Select defaultValue="项目汇报" 
                        style={{ width: 120 }} 
                        onChange={this.handleTypeChange.bind(this)}>
                            <Option value="项目汇报">项目汇报</Option>
                            <Option value="技术交流">技术交流</Option>                           
                            <Option value="会议纪要">会议纪要</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Upload 
                        
                        
                        onChange={this.handleChange}
                        showUploadList={false}
                        beforeUpload={this.beforeUpload.bind(this)}
                      >
                          
                            {fileList.length >= 1 ? reselectButton : uploadButton}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default UpLoadMeetingModal;