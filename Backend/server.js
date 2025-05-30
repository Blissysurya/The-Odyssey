import http from 'http';
import app from './app.js';
import 'dotenv/config';
import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';

const port = process.env.PORT || 3000

const server=http.createServer(app);

server.listen(port,( )=>{
    console.log(`Server is running on port ${port}`)
})

const io = new Server(server,{
    cors: '*'
});

io.use((socket,next)=>{
    try{
        const token = socket.handshake.auth.token || socket.handshake.headers['authorization']?.split(' ')[1];
        if (!token) {
            return next(new Error('Authentication error'));
        }
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return next(new Error('Invalid token'));
        }

        socket.user=decoded;
        // const user = jwt.verify(token, process.env.JWT_SECRET);
        // socket.user = user; // Attach user info to the socket
        next();
    }catch(error){
        next(error);
    }
})

io.on('connection', socket => {

    console.log('A user connected:', socket.id);

  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});
