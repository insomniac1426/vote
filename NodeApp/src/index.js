const express = require('express');
const app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

const bodyParser = require('body-parser');
const cors = require('cors');
let db = require('./data.js')
const PORT = 8082;

app.use(cors());
app.use(bodyParser.json());

app.route('/users')
.get((req, res) => {
    res.json({success:true, payload: db.users})
})

app.post('/login', (req, res) => {
        db.latestSessionId++;

        db.users = {
            ...db.users,
            [req.body.user.username]: {
                sessionId: db.latestSessionId,
                sessionPass: req.body.user.sessionPass
            }
        }

        db.sessions = {
            ...db.sessions,
            [db.latestSessionId]: {
                host: req.body.user.username,
                pass: req.body.user.sessionPass,
                users: {
                    [req.body.user.username]: ""
                }
            }
        }
    
    res.json({success:true, payload: { sessionId: db.latestSessionId }})
});

app.get('/session/:sessionId', (req, res) => {
    if(db.sessions[req.params.sessionId]) {
        res.json({success: true, payload: db.sessions[req.params.sessionId]})
    } else {
        res.json({success: false, payload: null})
    }
})

app.post('/join', (req, res) => {
    let session = db.sessions[req.body.joiner.joinerSessionId]
    if(session && (session.pass === req.body.joiner.joinerSessionPass)) {
        db.sessions = {
            ...db.sessions,
            [req.body.joiner.joinerSessionId]: {
                ...db.sessions[req.body.joiner.joinerSessionId],
                users: {
                    ...db.sessions[req.body.joiner.joinerSessionId].users,
                    [req.body.joiner.username] : ""
                }
                
            }
        }
        res.json({success:true, payload: db.sessions[req.body.joiner.joinerSessionId]})
    } else if (session) {
        res.json({success:false, message:"wrong password", payload: null})
    } else {
        res.json({success:false, message:"no session with id:" + req.body.joiner.joinerSessionId, payload: null})
    }
})

app.post('/vote', (req, res) => {
    const { username, sessionId, voteResponse } = req.body;
    if(db.sessions[sessionId] && (username in db.sessions[sessionId].users)) {
        db.sessions = {
            ...db.sessions,
            [sessionId] : {
                ...db.sessions[sessionId],
                users: {
                    ...db.sessions[sessionId].users,
                    [username]: voteResponse
                }
            }
        }
        res.json({success: true, message:"vote added for user " + username, payload: { [username] : voteResponse }})
    } else {
        res.json({success: false, message:"vote could not be added"});
    }
    
})

const removeUserFromSession = (sessionId, username) => {
    if(db.sessions[sessionId] && (username in db.sessions[sessionId].users)) {
        delete db.sessions[sessionId].users[username]
    }
        
}

io.on('connection', (client) => {  
    console.log('client connected...');

    client.on('userJoined', ({sessionId, username}) => {
        client.voteSessionId = sessionId;
        client.voteUsername = username;
        io.emit("refreshUserList", sessionId);
    });

    client.on('userVoted', sessionId => {
        io.emit("refreshUserList", sessionId);
    })

    client.on('disconnect', () => {
        removeUserFromSession(client.voteSessionId, client.voteUsername);
        io.emit("refreshUserList", client.voteSessionId);
        console.log("client disconnected ..")
    });
});

server.listen(PORT, () => {
    console.log("server is running on " + PORT);    
}); 

