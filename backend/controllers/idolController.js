import Idol from "../models/Idol.js";
import { createIdolSchema, updateIdolSchema } from "../validators/idolValidator.js";


export const getAllIdols = async (req,res) => {
    const {page =1, limit =10} = req.query;
    const {name, nacionality, group,sort} = req.query;

    let filter = {};

    if(name){
        filter.StageName = {$regex: name, $options: "i"};
    }
    if(nacionality){
        filter.Country = {$regex: nacionality, $options: "i"};
    }
    if(group){
        filter.Group = {$regex: group, $options: "i"};
    }

    const sortOption = {};
    if(sort){
        const direction = sort.startsWith("-") ? -1 :1;
        const field = sort.replace("-","");
        sortOption[field] = direction;
    }

    try {
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber -1) * limitNumber;

        const idols = await Idol.find(filter)
        .skip(skip)
        .limit(limitNumber)
        .sort(sortOption)
        .collation({locale:"en", strength: 2});

        const total = await Idol.countDocuments(filter);

        res.status(200).json({count: total, 
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total/ limitNumber),
            results: idols
        });
    } catch (error) {
        res.status(500).json({ message: "Error searching for idols", error });
    }
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
        const{error} = createIdolSchema.validate(data);

        if(error) return res.status(400).json({ message: "Validation Error", details: error.details.map( x => x.message)});

        const newIdol = new Idol(data);
        await newIdol.save();

        res.status(201).json({message: "Idol created"});
    } catch (error) {
        res.status(500).json({ message: "Error creating idol", error });
    }
};

export const updateIdol = async (req,res) => {
    try {

        const {error} = updateIdolSchema.validate(req.body);

        if(error) return res.status(400).json({ message: "Validation Error", details: error.details.map( x => x.message)});

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
