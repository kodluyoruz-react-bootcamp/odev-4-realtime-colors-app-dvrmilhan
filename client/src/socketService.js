import io from "socket.io-client";

let socket;

export const initSocket = () => {
    socket = io("http://localhost:3000", {
        transports: ["websocket"],
    });

    console.log("Connecting...");
    socket.on("connection", () => console.log("Connected!"));
};

export const disconnectSocket = () => {
    console.log("Disconnecting...");
    if (socket)
        socket.disconnect();
};

export const sendColor = (color) => {
    if (socket) {
        socket.emit("new-color", color);
        console.log("sendColor works well", color);
    }
};

export const subscribeToColor = (cb) => {
    if (socket) {

        socket.on("subscribe-to-color", (color) => {   //Çalışmıyor?!?!
            console.log("color received: ", color);
            cb(color);
        });
    }
};
