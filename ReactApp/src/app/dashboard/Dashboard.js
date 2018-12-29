import React from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import './dashboard.css';


class Dashboard extends React.Component {
    state = {
        session: null,
        voted: false
    }
    vote = (choice) => {
        axios.post("http://localhost:8082/vote", { 
            username: this.props.user, 
            sessionId: this.props.sessionId, 
            voteResponse: choice 
        })
        .then(res => {
            if(res.data.success) {
                this.setState({
                    voted : true
                })
                this.socket.emit("userVoted", this.props.sessionId)
            } else {
                console.log(res.data)
            }
        })
        .catch(err => console.log(err))
    }
    render() {
        return(
            <div className="dashboard">
            
            {(this.state.session && this.state.session.host === this.props.user)
            ?<h2>You are the host for this session, Session ID: { this.props.sessionId } and Session Pass: { this.state.session.pass } </h2>
            :null}

            {(this.state.voted)?(<div>
                <h2>You have made your choice</h2>
                <div className="cards-section">
                    <div className="card">
                        <h3>{ this.state.session.users[this.props.user] }</h3>
                    </div>
                </div>
            </div>)
            :(<div>
                <h2>Dear, { this.props.user } make your choice</h2>
                <div className="cards-section">
                    {(this.props.voteChoices) ? this.props.voteChoices.map((choice, i) => {
                        return (
                            <div key={i} className="card">
                                <h3>{choice}</h3>
                                <button className="btn btn-outline-dark" onClick={() => this.vote(choice)}>Vote</button>
                            </div>)
                    }):null}
                </div>
            </div>)}
            <div className="user-list">
                <h3>Users</h3>
                <ul className="list-group">
                { (this.state.session)? Object.keys(this.state.session.users).map((user, i) => {
                    return (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                        {user}
                        <span className="badge badge-primary badge-pill">{ this.state.session.users[user] }</span>
                    </li>) 
                }): null}
                </ul>
            </div>
            </div>
        )
    }

    refreshSessionData = () => {
        axios.get('http://localhost:8082/session/' + this.props.sessionId)
        .then(res => {
            if(res.data.success) {
                this.setState({
                    session: res.data.payload
                })
            } else {
                console.log(res.data);
            }
        })
        .catch(err => {
            console.loog(err);
        })
    }

    componentDidMount() {
        this.socket = openSocket('http://localhost:8082');
        
        this.socket.emit('userJoined', {
            sessionId: this.props.sessionId,
            username: this.props.user
        })

        this.socket.on('refreshUserList', (sessionId) => {
            if(this.props.sessionId === sessionId) {
                this.refreshSessionData()
            }
        })
        
    }
}

export default Dashboard;