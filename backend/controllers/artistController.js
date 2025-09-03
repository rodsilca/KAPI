import fs from "fs"
import path, {dirname} from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);//pega a url do arquivo atual ex: file:///Users/usuario/cap/controllers/artistControllers.js e transforma em /Users/usuario/cap/controllers/artistControllers.js
const __dirname = dirname(__filename); // pego o nome do diretorio do arquivo atual
const filePath = path.join(__dirname, "..", "data", "allArtists.json" ); // constroi um path para o arquivo alvo EX: /Users/usuario/cap/controllers/../data/allArtists.json

const data = JSON.parse(
    fs.readFileSync(filePath)
) ;


export const getAllArtist = (req,res) => {
    let results = data;

    res.status(200).json({
        results
    });
};

export const getArtist = (req,res) => {
    const {id} = req.params;
    console.log(id);
    const artist = data.find((item) => item.Id == id);

    res.status(200).json({
        results: artist
    });
};
