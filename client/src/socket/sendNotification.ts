import SocketSingleton from ".";

const sendNotification= async () => {
    const socket = SocketSingleton.getInstance();
    socket.emit("send-notification", {});
};
export default sendNotification;