import React, { Component } from 'react';

import { Modal } from 'antd'

import {
    Form,
    Button,
    Upload,
    Icon,
    Input,
} from 'antd';

import './modal.scss'

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

            confirmLoading: false,
            okText: '确定',
            bookName:'',
            bookIntroduction:'',
        }
    }

    handleInputChandge(type, e){
        let newState = {}
        newState[type] = e.target.value
        console.log(e.target.value);
        this.setState(newState)
    }
    handleOk(){
        this.setState({
            confirmLoading: true,
            okText: `上传中`
        })
        setTimeout(()=>{
            this.setState({
                confirmLoading:false,
                okText:`确定`
            })
         this.props.handleOk.call(this);
        },5000)
        
        //表单检验、发送数据、处理回调
    }

    render() {

        const { okText, confirmLoading, bookIntroduction, bookName } = {...this.state}
        const { handleOk, handleCancel, visible} = { ...this.props }
        return (
            <Modal

                centered={true}
                title={'书籍上传'}
                okText={okText}
                cancelText={'取消'}
                confirmLoading={confirmLoading}
                mask
                visible={visible}
                onOk={ this.handleOk.bind(this)}
                onCancel={handleCancel.bind(this)}
            >

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='书名'>
                        <Input
                            size='small'
                            value={bookName}
                            onChange={this.handleInputChandge.bind(this,'bookName')}
                            style={{ width: '50%' }}
                            addonBefore="《" addonAfter="》"
                            placeholder='书名' />
                    </Form.Item>
                    <Form.Item label='书籍简介'>
                        <Input.TextArea
                        onChange={this.handleInputChandge.bind(this,'bookIntroduction')} 
                        value={bookIntroduction}
                        rows={4} />
                    </Form.Item>
                    <Form.Item label='上传'>
                        <Upload name="logo" action="" listType="picture">
                            <Button>
                                <Icon type="upload" /> Click to upload
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>);
    }
}
export default AddModal;