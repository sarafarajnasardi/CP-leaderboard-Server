import mongoose from 'mongoose';

const uri = "mongodb+srv://sarafarajnasardi786:30DW509wBF3fdBNv@learn0.jmqha.mongodb.net/CP-leaderboard?retryWrites=true&w=majority";

mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model("users", userSchema);

export default User;
