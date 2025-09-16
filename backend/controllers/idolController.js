import Idol from "../models/Idol.js";


export const getAllIdols = async (req,res) => {
    const {name} = req.query;

    try {

        let filter = {};

        if(name){
            filter.StageName = {$regex: name, $options: "i"};
        }

        const idols = await Idol.find(filter);

        res.status(200).json({count: idols.length, results: idols});
    } catch (error) {
        res.status(500).json({ message: "Error searching for idols", error });
    }

    // if(req.query.q != null || req.query.q != undefined){
    //     let query = decodeURIComponent(req.query.q.toLowerCase());

    //     results = data.filter((item) => 
    //         //colocar mais criterios
    //         item.StageName.toLowerCase() == query ||
    //         item.Group.toLowerCase() == query ||
    //         item.KoreanName.toLowerCase() == query
    //     )

    //     if(results.length == 0){ return res.status(404).json({results: "Idol Not Found with given creteria"});  }
    // }else{
    //     results = data;
    // }

    // if(!results) { return res.status(404).json({results: "Idol Not Found"}); }

    // res.status(200).json({count: results.length, results: results});
};

export const getIdolById = async (req,res) => {
    const id = req.params.id;
    
    try {
        const idol = await Idol.findOne({Id: Number(id)});

        if(!idol){ return res.status(404).json({results: "Idol Not Found"});}

        res.status(200).json({results: idol});
    } catch (error) {
        res.status(500).json({ message: "Error searching for idol", error });
    }
    
    // const {id} = req.params;
    // console.log(id);
    // const idol = data.find((item) => item.Id == id);

    // if(!idol) { return res.status(404).json({results: "Idol Not Found"}); }

    // res.status(200).json({results: idol});
};

export const createIdol = async (req,res) =>{
    const data = req.body;

    try {
        const newIdol = new Idol(data);
        await newIdol.save();

        res.status(201).json({message: "Idol created"});
    } catch (error) {
        res.status(500).json({ message: "Error creating idol", error });
    }
};

export const updateIdol = async (req,res) => {
    try {
        const updated = await Idol.findOneAndUpdate({Id: Number(req.params.id)}, req.body,{
            new:true,
            runValidators: true,
        });

        if(!updated) return res.status(404).json({results: "Idol Not Found"});

        res.status(204).json({message: "Idol updated"});
    } catch (error) {
        res.status(500).json({ message: "Error updating idol", error });
    }
}

export const deleteIdolById = async (req, res) =>{
    const id = req.params.id;

    try {
        const removed = await Idol.findOneAndDelete({Id: Number(id)});

        if(!removed) return res.status(404).json({results: "Idol Not Found"});

        res.status(200).json({message: "Idol deleted successfuly"});
    } catch (error) {
        res.status(500).json({ message: "Error updating idol", error });
    }


}
