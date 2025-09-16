import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected do db");
    } catch (error) {
        console.log("Unable to connect do db: "+ error.message);
        process.exit(1);
    }
};

export default connectDB;