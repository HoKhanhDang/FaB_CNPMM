import { Socket, io } from "socket.io-client";
const apiUrl = import.meta.env.VITE_URL_SOCKET;

class SocketSingleton {
    private static instance: Socket;
    private constructor() {}
    public static getInstance(): Socket {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = io(apiUrl, {
                autoConnect: true,
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 3,
                transports: ["websocket"],
            });
        }
        return SocketSingleton.instance;
    }
}
export default SocketSingleton;
