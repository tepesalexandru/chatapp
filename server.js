const io = require('socket.io')(3000);

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })
    console.log('New User has joined.');
    //socket.emit('chat-message', 'Hello World');
    socket.on('send-chat-message', message => {
        console.log(message);
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        });
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.io]);
        delete users[socket.io];
    })
})