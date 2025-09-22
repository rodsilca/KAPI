import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8181;

app.listen(PORT, () =>{
    console.log("The server has started on port: "+ PORT);
    console.log("Running on: "+ process.env.NODE_ENV);
});