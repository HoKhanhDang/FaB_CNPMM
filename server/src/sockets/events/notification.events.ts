import { Socket, Server as SocketIOServer } from "socket.io";

export const notificationEvents = (io: SocketIOServer, socket: Socket) => {
    socket.on("send-notification", () => {
        console.log("send-notification to clinet");
        io.emit("get-notification", {});
    });
};
