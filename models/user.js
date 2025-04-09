import mongoose from 'mongoose';
import config from '../config/server_config.js';
const uri = config.MONGO_URI

mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model("users", userSchema);

export default User;
