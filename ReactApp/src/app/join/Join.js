import React from 'react';
import './join.css';

class Join extends React.Component {
    render() {
        return (
            <div className="join-session">
                <h2>Join Session</h2>
                <form className="join-form">
                    <div>
                        <input placeholder="Username" value={this.props.joinerName} onChange={(event) => this.props.changeHandler(event)} className="form-control" name="joinerName"/>
                    </div>
                    <div>
                        <input placeholder="Session ID" value={this.props.joinerSessionId} onChange={(event) => this.props.changeHandler(event)} className="form-control" name="joinerSessionId"/>
                    </div>
                    <div>
                        <input placeholder="Session Password" value={this.props.joinerPass} onChange={(event) => this.props.changeHandler(event)} className="form-control" name="joinerPass"/>
                    </div>
                    <div>
                        <button type="button" onClick={this.props.submitButtonClickHandler} className="btn btn-primary">Join</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Join;