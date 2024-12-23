import { Socket, Server as SocketIOServer } from "socket.io";

import { handleDisconnection } from "./disconnection";
import { registerOrderEvents } from "./order.events";
import { registerShipperEvents } from "./shipper.events";
import { notificationEvents } from "./notification.events";

export const initializeConnection = (io: SocketIOServer, socket: Socket) => {
    registerShipperEvents(io, socket);
    registerOrderEvents(io, socket);
    notificationEvents(io, socket);
    handleDisconnection(io, socket);
};
