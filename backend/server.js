const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const mongoose = require('mongoose');
let io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const cors = require('cors');
app.use(cors());

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

mongoose.connect('mongodb+srv://mohamedChamakh98:YbGVcqyUhYesGkzq@cluster-app.tkaut.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


io.on('connection', (socket, values) => {
    let roomId;
    socket.on('join_room', (value) => {
        console.log("user joined room : ", value);
        roomId = value;
        socket.join(value);

    })
    socket.on('disconnect', function () {
        console.log('disconnected')
    });
    socket.on("typing", (value) => {
        socket.to(roomId).emit("typing", value)
    })
    socket.on('message', (value) => {
        socket.to(roomId).emit("message", value)
    })
});




server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
