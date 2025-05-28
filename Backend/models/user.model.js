import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength:[6, 'Email must be at least 6 characters long'],
        maxLength:[50, 'Email must be at most 50 characters long'],
    },
    password: {
        type:String
    }
})