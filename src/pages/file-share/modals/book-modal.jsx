import React, { Component } from 'react';

import {Modal} from 'antd'

import './modal.scss'
class BookModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        const {handleOk, handleCancel, visible, currentBookName} = {...this.props}
        return (
            
            <Modal
                title="查看书籍"
                visible={visible}
                okText="确定"
                cancelText='取消'
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
            >
                <p>{currentBookName}</p>
                       
            </Modal>
        );
    }
}
export default BookModal;