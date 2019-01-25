import React, { Component } from 'react';

import { Form, TimePicker, message } from 'antd';

import moment from 'moment';

const FormItem = Form.Item;

class HoursSelector extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;

        this.onChange = this.onChange.bind(this);
    }

    getState = (e) => {
        const hours = this.state.hours;
        const minutes = this.state.minutes;
        return `${hours}:${minutes}`;
    }

    format = event => {
        return 'HH:mm';
    }

    onChange = (moment, timestring) => {
        let time = timestring.split(":");
        if (time[0] == "" || time[1] === undefined) {
            this.setState({message: "Invalid time."});
        } else {
            this.setState({
                hours: time[0],
                minutes: time[1],
                message: false,
            }, () => {
                this.props.updateTime(time[0], time[1]);
            });
        }
    }

    showMessage = () => {
        if (this.state.message) {
            return (
                <span className="message__error">
                    {this.state.message}
                </span>
            );
        }
    }

    render() {
        return (
            <div className="wrapper">
                <FormItem label={`Select Hours`}>
                    <TimePicker
                        name="time"
                        defaultValue={moment( this.getState(), this.format() )}
                        format={this.format()}
                        onChange={this.onChange} 
                    />
                    {this.showMessage()}
                </FormItem>
            </div>
        );
    }
}

export default HoursSelector;
