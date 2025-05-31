import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js'
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
connect();

const app= express();

app.use(morgan('dev')); // Move morgan to the top for better logging

app.use(cors({
  origin: '*', // Or specify your frontend URL for better security
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  

app.use('/users', userRoutes); // Ensure this line exists and is correct
// If your backend uses a prefix like '/api', it should be:

app.use('/projects', projectRoutes); // This should match your frontend usage

app.use('/ai', aiRoutes); // Ensure this line exists and is correct

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;