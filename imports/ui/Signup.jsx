import React, { Component } from 'react'
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: ''
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Accounts.createUser({email, password}, (err) => {
            if(err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.setState({
                    error: ''
                });
            }
        })
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join to Project02</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    
                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Create an account</button>
                    </form>
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        )
    }
}
