import React from 'react';
import './login.css';

class Login extends React.Component {
    render() {
        return (
            <div className = "login-form">
                <h2>Create Session</h2>
                <form>
                    <div><input className="form-control" name="userName" placeholder="User Name"/></div>
                    <div><input className="form-control" name="sessionPass" placeholder="Session Password"/></div>
                    <div><button className="btn btn-primary"> Start Session </button></div>
                </form>
            </div>
        )
    }
}

export default Login;