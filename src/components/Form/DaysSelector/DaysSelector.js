import React, { Component } from 'react';

import { Form, Button } from 'antd';

import "./DaysSelector.css";

const ButtonGroup = Button.Group;
const FormItem = Form.Item;


class DaysSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            days: this.props.days
        };

        this.onClick = this.onClick.bind(this);
    }

    onChangeCheckbox = (checkedValues) => {
        // sorting
        checkedValues.sort();
    }

    onClick = event => {
        let id = event.currentTarget.getAttribute("value"),
            days = {...this.state.days}
        days[id].active = !days[id].active;
        this.setState({days}, () => {
            this.props.updateDay(id, days[id].active);
        });
    }

    checkboxGroupPrint = () => {
        let renderPrint = [];
        const { days } = this.state;
        for (let item in days) {
            const {name, value, active, label} = days[item];
            renderPrint.push(
                <Button
                    className={active ? "custom__checkbox active" : "custom__checkbox"}
                    id={name.toLowerCase()}
                    name={name.toLowerCase()}
                    value={value}
                    onClick={this.onClick}
                    key={value}
                >
                    <span>{label}</span>
                </Button>);
        }
        return (
            <ButtonGroup>
                {renderPrint}
            </ButtonGroup>
        );
    }

    componentWillUpdate = () => {
        if (this.props.clean) {
            console.log(this.state);
            this.setState(
                {days: this.props.days},
                () => console.log(this.state)
            );
        }
    }

    render() {
        return (
            <div className="wrapper days-selector">
                <FormItem label={`Select Days`}>
                    {this.checkboxGroupPrint()}
                </FormItem>
            </div>
        );
    }
}

export default DaysSelector;
