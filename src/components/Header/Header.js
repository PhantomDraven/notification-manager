import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';

import { Link, withRouter } from 'react-router-dom';

import FirebaseContext from '../../firebase/Context';

import Login from '../Login/Login';
import Register from '../Register/Register';

import "./Header.css";

import logo from './logo.jpg';

const confirm = Modal.confirm;

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // login
            loginFormId: 'login',
            loginButtonLoading: this.props.loginPage,
            loginModalVisible: this.props.loginPage,
            loginModalSubmitLoading: false,
            loginModalValid: false, 
            // login submitted
            loginSubmit: false,
            // register
            registerFormId: 'register',
            registerButtonLoading: this.props.registerPage,
            registerModalVisible: this.props.registerPage,
            registerModalSubmitLoading: false,
            registerModalValid: false,
            // register submitted
            registerSubmit: false,
            // showing my account
            myAccount: this.props.showMyAccount,
            myAccountText: "Account"
        };
    }  
    
    // update Application
    myAccount() {
        if (this.state.myAccount) {
            this.setState({
                myAccountText: "Account",
                myAccount: false
            }, () => {this.props.myAccount(this.state.myAccount)})
        } else {
            this.setState({
                myAccountText: "Go Back",
                myAccount: true
            }, () => {this.props.myAccount(this.state.myAccount)})
        }
    }

    /* Checks */
    userSignIn = () => {
        if (this.props.authUser) {
            return this.Secure();
        }
        return this.unSecure();
    }

    /**********************/
    /*** Unsecure Login ***/
    /**********************/
    loginModalButton = (validate) => {
        this.setState({loginModalValid: validate});
    }
    loginModalSubmit = () => {
        console.log("Login click", "submit");
        this.setState({
            loginModalSubmitLoading: true
        })

        console.log("Form login", "launch submit");
        // trigger submit of form
        var submitEvent = new Event("submit");
        document.getElementById(this.state.loginFormId).dispatchEvent(submitEvent);
    
    }
    loginModalButtonEndLoad = () => {
        this.setState({loginModalSubmitLoading: false});
    }
    exitLoginModal = () => {
        console.log("Login click", "exit");
        this.setState({
            loginButtonLoading: false,
            loginModalVisible: false
        }, () => {
            // animation
            setTimeout(() => {
                this.props.history.push('/');
            }, 250)
        });
    }
    
    /*************************/
    /*** Unsecure Register ***/
    /*************************/
    registerModalButton = (validate) => {
        this.setState({registerModalValid: validate});
    }
    registerModalSubmit = () => {
        console.log("Register click", "submit");
        this.setState({
            registerModalSubmitLoading: true
        });

        console.log("Form register", "launch submit");
        // trigger submit of form
        var submitEvent = new Event("submit");
        document.getElementById(this.state.registerFormId).dispatchEvent(submitEvent);
    }
    registerModalButtonEndLoad = () => {
        this.setState({registerModalSubmitLoading: false});
    }
    exitRegisterModal = () => {
        console.log("Register click", "exit");
        this.setState({
            registerModalSubmitLoading: false, // <-- added to trigger this function after submit
            registerButtonLoading: false,
            registerModalVisible: false
        }, () => {
            // animation
            setTimeout(() => {
                this.props.history.push('/');
            }, 250)
        });
    }


    /*********************/
    /*** Secure Logout ***/
    /*********************/
    userLogout = (firebase) => {
        // show modal confirm popup
        confirm({
            title: 'Do you want to exit?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            cancelType: 'primary',
            onOk() {
                firebase.doSignOut()
                .then(function() {
                    message.success('You successfully logged out.');
                })
                .catch(function(error) {
                    message.error('Error on loggin out');
                });
            }
        });
    }

    /**********************/
    /*** Main templates ***/
    /**********************/
    unSecure = () => {
        return (
            <div className="account">
                <div className="login">
                    <Button 
                        id="login_button" 
                        type="primary" 
                        loading={this.state.loginButtonLoading} 
                        size="large"
                    >
                        <Link to="/login">Login</Link>
                    </Button>        
                    <Modal
                        title="Login"
                        visible={this.state.loginModalVisible}
                        confirmLoading={this.state.loginModalSubmitLoading}
                        okButtonProps={{ disabled: !this.state.loginModalValid }}
                        onOk={this.loginModalSubmit}
                        onCancel={this.exitLoginModal}
                    >
                        <FirebaseContext.Consumer>
                            {firebase => 
                            <Login
                                validate={this.loginModalButton}
                                firebase={firebase}
                                submit={this.state.loginSubmit}
                                formId={this.state.loginFormId}
                                endRegistration={this.loginModalButtonEndLoad}
                            />
                            }
                        </FirebaseContext.Consumer>
                    </Modal>
                </div>
                <div className="logo spacer">
                    <Link to="/">
                        <img src={logo} alt={"DNM logo"}/>
                    </Link>
                </div>
                <div className="register">
                    <Button 
                        id="register_button" 
                        type="primary" 
                        loading={this.state.registerButtonLoading} 
                        size="large" 
                    >
                        <Link to="/register">Sign In</Link>
                    </Button>
                    <Modal
                        title="Sign In"
                        visible={this.state.registerModalVisible}
                        confirmLoading={this.state.registerModalSubmitLoading}
                        okButtonProps={{ disabled: !this.state.registerModalValid }}
                        onOk={this.registerModalSubmit}
                        onCancel={this.exitRegisterModal}
                    >
                        <FirebaseContext.Consumer>
                            {firebase => 
                                <Register
                                    validate={this.registerModalButton}
                                    firebase={firebase}
                                    submit={this.state.registerSubmit}
                                    formId={this.state.registerFormId}
                                    endRegistration={this.registerModalButtonEndLoad}
                                />
                            }
                        </FirebaseContext.Consumer>
                    </Modal>
                </div>
            </div>
        );
    }

    Secure = () => {
        return (
            <div className="account">
                <div className="myaccount">
                    <Link to="/account">
                        <Button type="primary" size="large">{this.state.myAccountText}</Button>
                    </Link>
                </div>
                <div className="logo spacer">
                    <Link to="/">
                        <img src={logo} alt={"DNM logo"}/>
                    </Link>
                </div>
                <div className="logout">
                    <FirebaseContext.Consumer>
                        {firebase => 
                            <Button type="danger" size="large" icon="poweroff" onClick={this.userLogout.bind(this, firebase)}>Logout</Button>
                        }
                    </FirebaseContext.Consumer>
                </div>
            </div>
        );
    }

    render() {
        return (
            <header>
                {this.userSignIn()}
            </header>
        );
    }
}

export default withRouter(Header);
