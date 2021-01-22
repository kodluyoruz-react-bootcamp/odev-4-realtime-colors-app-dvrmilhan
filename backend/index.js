const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.end("Merhaba");
});

io.on('connection', (socket) => {

    socket.on("new-user", ({ color }) => console.log(color));

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});