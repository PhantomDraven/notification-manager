import React, { Component } from 'react';

import {withFirebase} from './firebase/Context';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Intro from './components/Intro/Intro';

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: false,
            email: "",
            login: this.props.login,
            register: this.props.register,
            account: this.props.account
        }
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState({ 
                    authUser,
                    email: authUser.email
                })
            } else {
                this.setState({ 
                    authUser: null,
                    email: ""
                });
            }
        });
    }

    componentWillMount(){
        /* Setting up page title for the first time */
        document.title = "Daily Notification Manager";
    }

    loggedInUser = () => {
        if (this.state.authUser) { 
            const {account = false,} = this.state;
            return (
                <div>
                    <Main account={account}/>
                </div>
            );
        } else {
            return(<Intro/>);
        }
    }

    render() {
        const {
            authUser = false,
            login = false,
            register = false,
        } = this.state;

        return (
            <div className="page__wrapper">
                <Header 
                    authUser={authUser}
                    loginPage={login}
                    registerPage={register}  
                />
                {this.loggedInUser()}
            </div>
        );
    }
}

export default withFirebase(App);
    