import React, { Component } from 'react';

import {  Form, Input } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;


class MessageDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value},
            () => {
                this.props.updateMessage(this.state.title, this.state.description);
            }
        );
    }

    render() {
        return (
            <div className="wrapper full-desktop">
                {/* border */}
                <FormItem label={`Insert Title`}>
                    <Input 
                        name="title" 
                        placeholder="Title" 
                        onChange={this.onChange}
                    />
                </FormItem>
                <FormItem label={`Insert Description`}>
                    <TextArea 
                        name="description" 
                        placeholder="Description" 
                        autosize={{ minRows: 2, maxRows: 4 }}
                        onChange={this.onChange} 
                    />
                </FormItem>
            </div>
        );
    }
}

export default MessageDetails;
