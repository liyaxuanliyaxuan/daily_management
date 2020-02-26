import React, { Component } from 'react';

import { Modal } from 'antd'

import {
    Form,
    Button,
    Upload,
    Icon,
    Input,
    Select,
    Message,
    message
} from 'antd';

import './modal.scss'



function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}





const { Option } = Select;
class AddModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

            confirmLoading: false,
            okText: '确定',
            bookName: '',
            bookIntroduction: '',
            bookType: '',
            imageUrl: '',
            loading: false,
            uploading: false,
            fileList: [],
            previewVisible: false,
            previewImage: '',

        }
    }
    handleTypeChange(val) {
        this.setState({

            bookType: val
        })

    }

    handleInputChandge(type, e) {
        let newState = {}
        newState[type] = e.target.value
        console.log(e.target.value);
        this.setState(newState)
    }
    handleOk() {
        const { bookType, bookName, bookIntroduction } = { ...this.state }
        const { fileList } = this.state;
        const formData = new FormData();

        formData.append('file', fileList[0]);



        console.log(formData);

        this.setState({
            confirmLoading: true,
            okText: `上传中`
        })
        setTimeout(() => {
            this.setState({
                confirmLoading: false,
                okText: `确定`
            })
            this.props.handleOk.call(this);
        }, 5000)

        //表单检验、发送数据、处理回调（页面跳转刷新）
    }
    handleChange = ({ fileList }) => this.setState({ fileList });


    beforeUpload(file) {

        // this.setState(state => ({
        //     fileList: [...state.fileList, file],
        // }))

        return false
        // return isJpgOrPng && isLt2M;
    }
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    handleCancel = () => this.setState({ previewVisible: false });

    render() {

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { okText, confirmLoading, bookIntroduction, bookName, fileList, previewVisible, previewImage } = { ...this.state }
        const { handleOk, handleCancel, visible } = { ...this.props }
        return (
            <Modal

                centered={true}
                destroyOnClose={true}
                title={'书籍上传'}
                okText={okText}
                cancelText={'取消'}
                confirmLoading={confirmLoading}
                mask
                visible={visible}
                onOk= {()=>{
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
                }}
            >

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='书名'>
                        <Input
                            size='small'
                            value={bookName}
                            onChange={this.handleInputChandge.bind(this, 'bookName')}
                            style={{ width: '50%' }}
                            addonBefore="《" addonAfter="》"
                            placeholder='书名' />
                    </Form.Item>
                    <Form.Item label='书籍简介'>
                        <Input.TextArea
                            onChange={this.handleInputChandge.bind(this, 'bookIntroduction')}
                            value={bookIntroduction}
                            rows={4} />
                    </Form.Item>
                    <Form.Item label='书籍类型'>
                        <Select defaultValue="服务器"
                            style={{ width: 120 }}
                            onChange={this.handleTypeChange.bind(this)}>
                            <Option value="服务器">服务器</Option>
                            <Option value="产品">产品</Option>
                            <Option value="硬件">硬件</Option>
                            <Option value='客户端'>客户端</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='选择封面'>
                        <Upload
                            name="logo"
                            listType="picture-card"
                            showUploadList={true}
                            fileList={fileList}
                            beforeUpload={this.beforeUpload.bind(this)}
                            onChange={this.handleChange}
                            onPreview={this.handlePreview}
                            action=""
                        >
                            {fileList.length >= 1 ? null : uploadButton}</Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>

                    </Form.Item>
                </Form>
            </Modal>);
    }
}
export default AddModal;