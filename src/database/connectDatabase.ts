import { connect } from "mongoose";

export const connectDatabase = async () => {
    await connect(process.env.MONGODB_URI as string);
    console.log("Database connected...");
}