import React, { Component } from 'react';

import { message, Input, Form } from 'antd';

import { withRouter, Link } from 'react-router-dom';

const FormItem = Form.Item;

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: this.props.formId,
            submitSend: this.props.submit,
            ...INITIAL_STATE
        };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value }, () => {this.checkValidity()});
    };
    
    checkValidity = () => {
        const {
            // username,
            email,
            password,
        } = this.state;

        // TODO: Check if email is written
        // TODO: Error message for each input

        const valid = password !== '' && email !== '';
        this.props.validate(valid);
    }

    onSubmit = event => {
        console.log("Form login", "internal submit");
        // handle form submit
        event.preventDefault();

        const { email, password } = this.state;
        this.setState({submitSend: false},
            () => {
                this.props.firebase
                    .doSignInWithEmailAndPassword(email, password)
                .then(authUser => {
                    this.setState({ ...INITIAL_STATE });
                    message.loading('Action in progress..', 1.5)
                        .then(() => message.success('Login successful!'));
                    // end login
                    this.props.endRegistration();
                    this.props.history.push('/');
                })
                .catch(({message: error}) => {
                    // show message
                    message.error(error);
                    this.props.endRegistration();
                });
            }
        );
    }

    render() {
        return (
            <div className="wrapper">
                <Form id={this.state.form} onSubmit={this.onSubmit}>
                    <div className="padding__bottom">
                        <FormItem>
                            <label>Insert your Email:</label>
                            <Input 
                                name="email" 
                                type="email" 
                                placeholder="Email" 
                                onChange={this.onChange} />
                        </FormItem>
                    </div>
                    <div className="padding__bottom">
                        <FormItem>
                            <label>Insert your password:</label>
                            <Input 
                                name="password" 
                                type="password"
                                placeholder="Password"
                                onChange={this.onChange} />
                        </FormItem>
                    </div>
                </Form>
                <Link to="/register">
                    <span>Are you not registed yet? Sign in!</span>
                </Link>
            </div>
        );
    }
}

export default withRouter(Login);
