import { connect } from "http2";
import mongoose from "mongoose";

export default async function databaseConnection(){
    //connection URI to connect to database
    const uri = process.env.MONGODB_URI;
    //connection to the database
    const connectDatabase = async () => mongoose.connect(uri);
    connectDatabase();
}