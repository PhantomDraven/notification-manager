import React, { Component } from 'react';

import DaysSelector from '../Form/DaysSelector/DaysSelector';
import HoursSelector from '../Form/HoursSelector/HoursSelector';
import MessageDetails from '../Form/MessageDetails/MessageDetails';
import { Form, Button } from 'antd';

import "./Main.css";


const DAYSDATA = {
    cleanDay: false,
    cleanTime: false,
    cleanMessage: false,
    days: [
        {
            label: "S",
            name: "Sunday",
            title: "Sunday",
            active: false,
            value: 0
        },
        {
            label: "M",
            name: "Monday",
            title: "Monday",
            active: false,
            value: 1
        },
        {
            label: "T",
            name: "Tuesday",
            title: "Tuesday",
            active: false,
            value: 2
        },
        {
            label: "W",
            name: "Wednesday",
            title: "Wednesday",
            active: false,
            value: 3
        },
        {
            label: "T",
            name: "Thursday",
            title: "Thursday",
            active: false,
            value: 4
        },
        {
            label: "F",
            name: "Friday",
            title: "Friday",
            active: false,
            value: 5
        },
        {
            label: "S",
            name: "Saturday",
            title: "Saturday",
            active: false,
            value: 6
        }
    ],
    time: {
        hours: 0,
        minutes: 0,
    },
    message: {
        title: "",
        desciption: ""
    }
};

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ...DAYSDATA
        }
    }

    getTime = () => {
        const date  = new Date(),
            hours   = date.getHours(),
            minutes = date.getMinutes();
        
        return {hours, minutes};
    }

    handleClean = e => {
        e.preventDefault();
        this.setState(
            {
                ...DAYSDATA,
            },
            () => {
                this.setState({
                    cleanDay: true,
                    cleanTime: true,
                    cleanMessage: true,
                }, () => console.log(this.state))
            }
        );
    }

    componentWillMount = () => {
        this.resetTimer();
    }

    resetTimer = () => {
        this.setState({
            time: {
                hours: this.getTime().hours,
                minutes: this.getTime().minutes
            }
        });
    }

    updateDay = (id, value) => {
        let days = {...this.state.days}
        days[id].active = value;
        this.setState({days});
    }

    updateTime = (hours, minutes) => {
        let time = {...this.state.time};
        time.hours = hours;
        time.minutes = minutes;
        this.setState({time});
    }

    updateMessage = (title, description) => {
        let message = {...this.state.message};
        message.title = title;
        message.desciption = description;
        this.setState({message});
    }

    pageSelector = () => {
        const {account = false, daily = true} = this.props;
        if (account) {
            return (
                <div>
                    <p>Cose</p>
                    <p>Che</p>
                    <p>Ti</p>
                    <p>Mostro</p>
                    <p>Di</p>
                    <p>Esempio</p>
                </div>
            );
        } else if (daily) {
            return (
                <Form className="main__wrapper">
                    <DaysSelector 
                        days={this.state.days} 
                        updateDay={this.updateDay} 
                        clean={this.state.cleanDay}
                    />
                    <HoursSelector 
                        time={this.state.time} 
                        updateTime={this.updateTime} 
                        clean={this.state.cleanTime}
                    />
                    <MessageDetails
                        message={this.state.message}
                        updateMessage={this.updateMessage}
                        clean={this.state.cleanMessage}
                    />
                    <div className="wrapper">
                        <Button type="danger"htmlType="button" onClick={this.handleClean}>Clean</Button>
                    </div>
                    <div className="floating__top">
                        <h2>Create a Notify</h2>
                        <Button type="primary" ghost htmlType="submit">Submit</Button>                    
                    </div>
                </Form>
            );
        }
    }

    render() {
        return (
            <main>
                {this.pageSelector()}
            </main>
        );
    }
}

export default Main;
