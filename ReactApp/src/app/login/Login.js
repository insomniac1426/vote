import React from 'react';
import './login.css';

class Login extends React.Component {
    render() {
        return (
            <div className = "login-form">
                <h2>Create Session</h2>
                <form>
                    <div><input className="form-control"  onChange={ (event) => this.props.changeHandler(event) } value = { this.props.userName } name="userName" placeholder="User Name"/></div>
                    <div><input className="form-control" onChange={ (event) => this.props.changeHandler(event) } value = { this.props.sessionPass } name="sessionPass" placeholder="Session Password"/></div>
                    <div><button type="button" onClick={this.props.submitHandler} className="btn btn-primary"> Start Session </button></div>
                </form>
            </div>
        )
    }
}

export default Login;