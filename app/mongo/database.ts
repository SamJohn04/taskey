import { connect } from "mongoose";

let connection: any;

export async function connectDB() {
    try {
        console.log(123)
        if(!connection) {
            console.log(456)
            connection = await connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/taskey');
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