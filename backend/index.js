const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.end("Merhaba");
});

io.on('connection', (socket) => {
    console.log("connected")
    socket.on("new-color", (color) => {
        console.log(color);
        socket.broadcast.emit('subscribe-to-color', color);
    });

});

http.listen(Port, () => {
    console.log(`listening on : ${Port}`);
});