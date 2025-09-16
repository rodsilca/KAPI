import express from "express"
import cors from "cors"
import IdolRoute from "./routes/idolRoutes.js"
import GroupRoute from "./routes/groupRoutes.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.status(200).send("oi");
})

app.use('/api/v1/idols', IdolRoute );
app.use("/api/v1/groups", GroupRoute );

export default app;