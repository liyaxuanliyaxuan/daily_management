import React, { Component } from 'react';
import axios from 'axios'
import { Modal } from 'antd'

import {
    Form,
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
            bookType: '服务器',
            imageUrl: '',
            loading: false,
            uploading: false,
            fileList: [],
            previewVisible: false,
            previewImage: '',

        }
    }
    componentWillReceiveProps(nextprops) {
        //初始化表格数据
        if (nextprops.visible) {
            this.setState({
                fileList: [],
                bookIntroduction: '',
                bookName: '',
                bookType: '服务器',
                confirmLoading: false,
            })
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
    handleOk = () => {
        const { bookType, bookName, bookIntroduction, fileList } = { ...this.state }
        //    console.log(fileList[0]);
        // const file = fileList[0].orginFileObject
        const formData = new FormData();
        const _this = this

        formData.append('file', fileList[0].originFileObj);
        console.log(formData);
        if (bookIntroduction && bookName) {
            formData.append('bname', bookName);
            formData.append('introduction', bookIntroduction);
            formData.append('btype', bookType);

            this.setState({
                confirmLoading: true,
                okText: `上传中`
            })
            axios.post(
                'http://39.105.232.155:8081/infoshare/insertbook',
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
                    console.log(err);
                })

        } else {
            message.error(`请输入完整的信息哦~`)
        }



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
        const { handleCancel, visible } = { ...this.props }
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
                onOk={this.handleOk}
                onCancel={() => {
                    handleCancel()
                    this.setState({
                        fileList: []
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