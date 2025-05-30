import socket from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = ( ) =>{
    socketInstance = socket(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
        auth: {
            token: localStorage.getItem('token') || ''
        },
    });

    return socketInstance;
}

export const receiveMessage = (eventName, data) => {
    socketInstance.on(eventName, data);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}