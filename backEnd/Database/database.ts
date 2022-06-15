import mongoose from "mongoose";

//connection URI to connect to database
const uri = process.env.MONGODB_URI;

//connection to the database
const connectDatabase = async () => mongoose.connect(uri)

export default connectDatabase;
    