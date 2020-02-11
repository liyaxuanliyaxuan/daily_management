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
                title="Basic Modal"
                visible={visible}
                onOk={handleOk.bind(this)}
                onCancel={handleCancel.bind(this)}
                centered={true}
            >
                <p>{currentBookName}</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}
export default BookModal;