import http from 'http';
import app from './app.js';
import 'dotenv/config';
import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js'; 
import { generateResult } from './services/ai.service.js';

const port = process.env.PORT || 3000

const server=http.createServer(app);

server.listen(port,( )=>{
    console.log(`Server is running on port ${port}`)
})

const io = new Server(server,{
    cors: '*'
});

io.use(async (socket,next)=>{
    try{
        const token = socket.handshake.auth.token || socket.handshake.headers['authorization']?.split(' ')[1];

        const projectId = socket.handshake.query.projectId;
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }


        socket.project= await projectModel.findById(projectId)

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

    socket.roomId = socket.project._id.toString(); // Set the room ID to the project ID
    console.log('A user connected:', socket.id);

    socket.join(socket.roomId); // Join the room with the project ID

    socket.on('project-message',async data =>{
        const message = data.message;

       const aiIsPresentInMessage = message.includes('@ai') || message.includes('@AI');

       if(aiIsPresentInMessage){
        const prompt = message.replace('@ai', '') // Remove @ai or @AI and trim the message
        const result = await generateResult(prompt);

        io.to(socket.roomId).emit('project-message',{
            message:result,
            sender:{
                _id: 'ai',
                email:'AI'
            }
        })
       }

        console.log('message',data)
        socket.broadcast.to(socket.roomId).emit('project-message',data) 
    })

  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { 
    console.log('A user disconnected:', socket.id);
    socket.leave(socket.roomId); // Leave the room when disconnected
  });
});
