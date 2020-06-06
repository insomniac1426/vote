import React from 'react';
import './login.css';

const Login = (props) => (
  <div className='login-form'>
    <h2>Create Session</h2>
    <form>
      <div>
        <input
          className='form-control'
          onChange={(event) => props.changeHandler(event)}
          value={props.userName}
          name='userName'
          placeholder='User Name'
        />
      </div>
      <div>
        <input
          className='form-control'
          onChange={(event) => props.changeHandler(event)}
          value={props.sessionPass}
          name='sessionPass'
          placeholder='Session Password'
        />
      </div>
      <div>
        <button
          type='button'
          onClick={props.submitHandler}
          className='btn btn-primary'
        >
          Start Session
        </button>
      </div>
    </form>
  </div>
);

export default Login;
