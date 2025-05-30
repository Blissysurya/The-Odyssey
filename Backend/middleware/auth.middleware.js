import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export const authUser = async(req, res, next) => {

    try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ errors: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await redisClient.get(token);

    if (isBlacklisted) {

        res.cookie('token','');
        return res.status(401).send({ errors: 'Token is blacklisted. Please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);      
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ errors: 'Invalid token.' });
    }
}