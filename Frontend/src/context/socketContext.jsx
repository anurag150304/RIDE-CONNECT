import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Create a context
export const SocketContext = createContext();

// Custom provider component
export const SocketProvider = ({ children }) => {
    const socket = useRef(null);

    // Connect to the server
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_BASE_URL);

        socket.current.on("connect");

        socket.current.on("disconnect");

        return () => {
            socket.current.disconnect();
        };
    }, []);

    // Function to send a message
    const sendMessage = (eventName, data) => {
        if (socket.current) {
            socket.current.emit(eventName, data);
        } else {
            console.error("Socket not connected");
        }
    };

    // Function to receive a message
    const receiveMessage = (eventName, callback) => {
        if (socket.current) {
            socket.current.on(eventName, callback);
        } else {
            console.error("Socket not connected");
        }
    };

    const removeMessage = (event, callback) => {
        if (socket.current) {
            socket.current.off(event, callback);
        } else {
            console.error("Socket not connected");
        }
    };

    return (
        <SocketContext.Provider value={{ socket, sendMessage, receiveMessage, removeMessage }}>
            {children}
        </SocketContext.Provider>
    );
};