import express from "express"
import cors from "cors"
import ArtistRoute from "./routes/artistRoutes.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.status(200).send("oi");
})

app.use('/api/v1/artists', ArtistRoute );
// app.use("api/v1/groups", );

app.listen(PORT, () =>{
    console.log("The server has started on port: "+ PORT)
});