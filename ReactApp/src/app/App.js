import React from 'react';
import './app.css'
import Login from './login/Login';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Login/>
            </div>
        )
    }
}

export default App;