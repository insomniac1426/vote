import React from 'react';
import axios from 'axios';
import './app.css';
import { withRouter, Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import Join from './join/Join';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      sessionPass: '',
      joinerName: '',
      joinerSessionId: '',
      joinerPass: '',
      requiredSession: 0,
      currentActiveUser: '',
      voteChoices: [1, 2, 3, 5, 8, 13],
    };
    this.loginChangeHandler = this.loginChangeHandler.bind(this);
    this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
    this.joinChangeHandler = this.joinChangeHandler.bind(this);
    this.joinClickHandler = this.joinClickHandler.bind(this);
  }

  loginChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginSubmitHandler() {
    const { userName, sessionPass } = this.state;
    axios
      .post('http://localhost:8082/login', {
        user: {
          username: userName,
          sessionPass,
        },
      })
      .then((res) => {
        this.setState(({ userName: currentUserName }) => ({
          requiredSession: res.data.payload.sessionId,
          currentActiveUser: currentUserName,
        }));
        this.props.history.push('/dashboard');
      });
  }

  joinChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  joinClickHandler() {
    axios
      .post('http://localhost:8082/join', {
        joiner: {
          username: this.state.joinerName,
          joinerSessionId: Number(this.state.joinerSessionId),
          joinerSessionPass: this.state.joinerPass,
        },
      })
      .then((res) => {
        if (res.data.success) {
          this.setState(({ joinerSessionId, joinerName }) => ({
            currentActiveUser: joinerName,
            requiredSession: Number(joinerSessionId),
          }));
          this.props.history.push('/dashboard');
        } else {
          console.error(res.data.message);
        }
      });
  }

  render() {
    return (
      <div className='container-fluid'>
        <Switch>
          {this.state.currentActiveUser && this.state.requiredSession ? (
            <Route
              path='/dashboard'
              render={() => (
                <Dashboard
                  user={this.state.currentActiveUser}
                  sessionId={this.state.requiredSession}
                  voteChoices={this.state.voteChoices}
                />
              )}
            />
          ) : null}
          <Route
            exact
            path='/login'
            render={() => (
              <Login
                changeHandler={this.loginChangeHandler}
                userName={this.state.userName}
                sessionPass={this.state.sessionPass}
                submitHandler={this.loginSubmitHandler}
              />
            )}
          />
          <Route
            path='/join'
            render={() => (
              <Join
                changeHandler={this.joinChangeHandler}
                joinerName={this.state.joinerName}
                joinerSessionId={this.state.joinerSessionId}
                joinerPass={this.state.joinerPass}
                submitButtonClickHandler={this.joinClickHandler}
              />
            )}
          />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
