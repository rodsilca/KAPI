import fs from "fs"
import path, {dirname} from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);//pega a url do arquivo atual ex: file:///Users/usuario/cap/backend/controllers/artistControllers.js e transforma em /Users/usuario/cap/controllers/artistControllers.js
const __dirname = dirname(__filename); // pego o nome do diretorio do arquivo atual
const filePath = path.join(__dirname, "..", "data", "allArtists.json" ); // constroi um path para o arquivo alvo EX: /Users/usuario/cap/controllers/../data/allArtists.json

const data = JSON.parse(
    fs.readFileSync(filePath)
) ;


export const getAllArtist = (req,res) => {
    let results = [];

    if(req.query.q != null || req.query.q != undefined){
        let query = decodeURIComponent(req.query.q.toLowerCase());

        results = data.filter((item) => 
            //colocar mais criterios
            item.StageName.toLowerCase() == query ||
            item.Group.toLowerCase() == query ||
            item.KoreanName.toLowerCase() == query
        )

        if(results.length == 0){ return res.status(404).json({results: "Artist Not Found with given creteria"});  }
    }else{
        results = data;
    }

    if(!results) { return res.status(404).json({results: "Artist Not Found"}); }

    res.status(200).json({count: results.length, results: results});
};

export const getArtist = (req,res) => {
    const {id} = req.params;
    console.log(id);
    const artist = data.find((item) => item.Id == id);

    if(!artist) { return res.status(404).json({results: "Artist Not Found"}); }

    res.status(200).json({results: artist});
};
