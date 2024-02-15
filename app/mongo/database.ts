import { connect } from "mongoose";

export async function connectDB() {
    try {
        const connection = await connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/taskey');
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