import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Tooltip } from 'antd';

class Intro extends Component {
    render() {
        return(
            <main>
                <h1 className="text__center">
                    <Tooltip title="Daily Notification Manager">
                    <span>Welcome to DNM</span>
                    </Tooltip>
                </h1>
                <h3 className="padding__top">
                    This is a notification manager
                </h3>
                <p>
                    You'll chose when you want to recive the notify
                    after that the application will return to you
                    a Push Notification through your browser.
                </p>
                <br/>
                <p>
                    Please <Link to="/login">LOGIN</Link> or <Link to="/register">SIGN IN</Link>
                </p>
            </main>
        );
    }
}

export default Intro;