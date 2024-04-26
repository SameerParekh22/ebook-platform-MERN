import mongoose from "mongoose";
import {cluster0} from "../constants"

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${cluster0}`)
        console.log(`\n MongoDB Connected!! DB HOST: $ {connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB