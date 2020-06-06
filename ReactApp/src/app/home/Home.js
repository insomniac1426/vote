import React from 'react';
import { withRouter } from 'react-router-dom';
import './home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.createSessionClickHandler = this.createSessionClickHandler.bind(this);
    this.joinSessionClickHandler = this.joinSessionClickHandler.bind(this);
  }

  createSessionClickHandler() {
    this.props.history.push('/login');
  }

  joinSessionClickHandler() {
    this.props.history.push('/join');
  }

  render() {
    return (
      <div className='home-screen'>
        <h1>Voting App</h1>
        <p>An app for creating sessions and voting in groups.</p>
        <div className='button-group'>
          <button
            type='button'
            onClick={this.createSessionClickHandler}
            className='btn btn-primary'
          >
            Create Session
          </button>
          <button
            type='button'
            onClick={this.joinSessionClickHandler}
            className='btn btn-primary'
          >
            Join Session
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
