import React, { Component } from 'react';

import { message, Input, Form } from 'antd';

import { Link } from 'react-router-dom';

const INITIAL_STATE = {
    // username: '',
    email: '',
    confirm__email: '',
    password: '',
    confirm__password: '',
};

class Register extends Component {
    
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
    }

    checkValidity = () => {
        const {
            // username,
            email,
            confirm__email,
            password,
            confirm__password,
        } = this.state;
        
        // TODO: Check if email is written
        // TODO: Error message for each input

        const valid =
            (password === confirm__password && password !== '') && 
            (email === confirm__email && email !== '');
            // && username !== '';

        this.props.validate(valid);
    }

    onSubmit = event => {
        console.log("Form register", "internal submit");
        // handle form submit
        event.preventDefault();

        const { email, password } = this.state;
        this.setState({submitSend: false},
            () => {
                this.props.firebase
                    .doCreateUserWithEmailAndPassword(email, password)
                .then(authUser => {
                    this.setState({ ...INITIAL_STATE });
                    message.loading('Action in progress..', 1.5)
                        .then(() => message.success('Welcome onboard!'));

                    // end registration
                    this.props.endRegistration();
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
            <Form id={this.state.form} onSubmit={this.onSubmit}>
                {/*<div className="padding__bottom">
                    <label>Insert your username:</label>
                    <Input name="username" type="text" placeholder="Username" onChange={this.onChange}/>
                </div>*/}
                <div className="padding__bottom">
                    <label>Insert your email:</label>
                    <Input name="email" type="email" placeholder="Email" onChange={this.onChange}/>
                </div>
                <div className="padding__bottom">
                    <label>Confirm email:</label>
                    <Input name="confirm__email" type="email" placeholder="Confirm Email" onChange={this.onChange}/>
                </div>
                <div className="padding__bottom">
                    <label>Insert your password:</label>
                    <Input name="password" type="password" placeholder="Password" onChange={this.onChange}/>
                </div>
                <div className="padding__bottom">
                    <label>Confirm password:</label>
                    <Input name="confirm__password" type="password" placeholder="Confirm Password" onChange={this.onChange}/>
                </div>
                <Link to="/login">
                    <span>Do you have an account? Login!</span>
                </Link>
            </Form>
        );
    }
}

export default Register;