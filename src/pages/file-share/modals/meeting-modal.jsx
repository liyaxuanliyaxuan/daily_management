import React, { Component } from 'react';

import { Modal } from 'antd'
import axios from 'axios'
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

const {Option} = Select;
class UpLoadMeetingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingName:'',
            meetingTime:'',
            meetingtype:'项目汇报',
            confirmLoading: false,
            okText:'确定上传',
            fileList:[]

        }
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.visible){
            this.setState({
                meetingName:'',
                meetingTime:'',
                meetingtype:'项目汇报',
                confirmLoading: false,
                fileList:[]
            })
        }
    }
    handleTypeChange(val){

        this.setState({
            meetingtype:val
        })
    }
    handleInputChandge(type, e){
        let newState = {}
        newState[type] = e.target.value
        console.log(e.target.value);
        this.setState(newState)
    }
    handleOk=()=>{
        const { fileList, meetingName, meetingtype, meetingTime} = {...this.state}
        this.props.handleOk.call(this)//关闭选择框
        //表单检验、发送数据、处理回调
        if(fileList[fileList.length-1]){
           var file = fileList[fileList.length-1].originFileObj; 
        }
        
      
        const formData = new FormData();
        const _this = this;
        formData.append('file', file);
        if(meetingName&&meetingTime){
            formData.append('fname',meetingName);
            formData.append('ftype',meetingtype);
            formData.append('time',meetingTime);
            this.setState({
                confirmLoading: true,
                okText: `上传中`
            })
          this.$axios.post(
                '/infoshare/insertdoc',
                formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(
                (res) => {
                    if (res.code === 200) {
                        
                        _this.setState({
                            confirmLoading: false,
                            okText: `确定`
                        })
                        _this.props.handleOk.call(_this);
                    } 
                }

            ).then(() => { 
                message.success(`上传成功`);
                window.history.go(0) })
                .catch((err) => {
                    
                    message.error('似乎出现了一些错误')
                    _this.setState({
                        okText:'确定上传'
                    })
                    console.log(err);
                })
            

        }else{
            message.error(`请输入完整信息哦~`)
        }
    }
    pickDate(date,dateString){

        // console.log(date,dateString);
        this.setState({
            meetingTime:dateString
        })
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
      
     
        const { meetingName, confirmLoading, fileList, okText} = {...this.state}
        const {  handleCancel, visible } = { ...this.props }
        
        return (

            <Modal
                title="上传会议"
                okText={okText}
                cancelText={'取消'}
                destroyOnClose={true}
                confirmLoading={confirmLoading}
                visible={visible}
                onOk={this.handleOk}
                onCancel={()=>{
                   handleCancel()
                   this.setState({
                       fileList:[],
                       okText:'确定上传'
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