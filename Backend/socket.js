import { Server } from "socket.io";
import userModule from "./modules/user.js";
import driverModule from "./modules/driver.js";

let io;

// Function to initialize Socket.IO
const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*", // Update this with your frontend's origin for security
            methods: ['GET', 'POST']
        },
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Listening for event to register user/driver with their ID
        socket.on("join", async ({ userId, userType }) => {

            if (userType === "user") {
                await userModule.findByIdAndUpdate(userId, { socketID: socket.id });
                console.log(`User registered with ID: ${userId}`);
            }
            if (userType === "driver") {
                await driverModule.findByIdAndUpdate(userId, { socketID: socket.id });
                console.log(`Driver registered with ID: ${userId}`);
            }
        });

        socket.on("update-driver-location", async ({ driverId, location }) => {
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: "Invalid location data" });
            }

            await driverModule.findByIdAndUpdate(driverId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        })

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};

// Function to send a message to a specific user/driver using their ID
const sendMessageToSocketID = (socketID, messageObj) => {
    if (io) {
        io.to(socketID).emit(messageObj.event, messageObj.data);
    } else {
        console.log(`Socket.IO instance not initialized.`);
    }
};

export default {
    initializeSocket,
    sendMessageToSocketID
}