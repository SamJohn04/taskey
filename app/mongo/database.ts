import { connect } from "mongoose";

if(!global._connectionPromise) {
    global._connectionPromise = connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/taskey');
}
let connectionPromise = global._connectionPromise;

export async function connectDB() {
    try {
        const connection = await connectionPromise;
        if(!connection) {
            // connection = await connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/taskey');
        }
        return {
            success: true,
            connection
        }
    } catch(error) {
        console.log(error)
        return {
            success: false,
            error: error
        }
    }
}