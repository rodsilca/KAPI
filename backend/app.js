import express from "express"
import cors from "cors"
import IdolRoute from "./routes/idolRoutes.js"
import GroupRoute from "./routes/groupRoutes.js"

const app = express();

app.use(express.json());
app.use(cors({origin:"http://localhost:5000"}));// exemplo de uso de cors
//apenas essa url pode fazer requisicoes para a api

app.get("/", (req,res) =>{
    res.status(200).send("oi");
})

app.use('/api/v1/idols', IdolRoute );
app.use("/api/v1/groups", GroupRoute );

export default app;