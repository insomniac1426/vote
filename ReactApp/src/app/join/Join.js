import React from 'react';
import './join.css';

const Join = ({
  joinerName,
  changeHandler,
  joinerSessionId,
  joinerPass,
  submitButtonClickHandler,
}) => (
  <div className='join-session'>
    <h2>Join Session</h2>
    <form className='join-form'>
      <div>
        <input
          placeholder='Username'
          value={joinerName}
          onChange={(event) => changeHandler(event)}
          className='form-control'
          name='joinerName'
        />
      </div>
      <div>
        <input
          placeholder='Session ID'
          value={joinerSessionId}
          onChange={(event) => changeHandler(event)}
          className='form-control'
          name='joinerSessionId'
        />
      </div>
      <div>
        <input
          placeholder='Session Password'
          value={joinerPass}
          onChange={(event) => changeHandler(event)}
          className='form-control'
          name='joinerPass'
        />
      </div>
      <div>
        <button
          type='button'
          onClick={submitButtonClickHandler}
          className='btn btn-primary'
        >
          Join
        </button>
      </div>
    </form>
  </div>
);

export default Join;
