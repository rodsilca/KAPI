import Idol from "../models/Idol.js";
import { createIdolSchema, updateIdolSchema } from "../validators/idolValidator.js";


export const getAllIdols = async (req,res,next) => {
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
        // res.status(500).json({ message: "Error searching for idols", error });
        next(error);
    }
};

export const getIdolById = async (req,res,next) => {
    const id = req.params.id;
    
    try {
        const idol = await Idol.findOne({Id: Number(id)});

        // if(!idol){ return res.status(404).json({results: "Idol Not Found"});}
        if(!idol) {
            const error = new Error("Idol Not Found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({results: idol});
    } catch (error) {
        // res.status(500).json({ message: "Error searching for idol", error });
        next(error);
    }
};

export const createIdol = async (req,res,next) =>{
    const data = req.body;

    try {
        if(!Array.isArray(data)|| data.length===0){
            const{error} = createIdolSchema.validate(data);

            // if(error) return res.status(400).json({ message: "Validation Error", details: error.details.map( x => x.message)});
            if(error) next(error);

            const newIdol = new Idol(data);
            await newIdol.save();

            res.status(201).json({message: "Idol created", results: data});
        }

        const results = data.map((item,index) =>{
            const {error,value} = createIdolSchema.validate(item);
            return {index,error,value};
        });

        const errors = results.filter(r => r.error);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Some itens are invalid",
                errors: errors.map(e => ({
                index: e.index,
                message: e.error.details[0].message,
                item: data[e.index],
                })),
            });
        }

        const validData = results.map(r => r.value);

        const insert = await Idol.insertMany(validData);

        res.status(201).json({message: `${insert.length} idols created` , results: insert});
        
    } catch (error) {
        // res.status(500).json({ message: "Error creating idol", error });
        next(error);
    }
};

// export const createIdolByList = async (req,res,next)=>{
//     const data = req.body;

//     try{
//         if(!Array.isArray(data) || data.length ===0){
//             return res.status(400).json({ error: "Send a list of valid idols" });
//         }

//         const results = data.map((item,index) =>{
//             const {error,value} = createIdolSchema.validate(item);
//             return {index,error,value};
//         });

//         const errors = results.filter(r => r.error);

//         if (errors.length > 0) {
//             return res.status(400).json({
//                 message: "Some itens are invalid",
//                 errors: errors.map(e => ({
//                 index: e.index,
//                 message: e.error.details[0].message,
//                 item: data[e.index],
//                 })),
//             });
//         }

//         const validData = results.map(r => r.value);

//         const insert = await Idol.insertMany(validData);

//         res.status(201).json({message: `${insert.length} idols created` , results: insert});
//     }catch(error){
//         next(error);
//     }
// }

export const updateIdol = async (req,res,next) => {
    try {

        const {error} = updateIdolSchema.validate(req.body);

        // if(error) return res.status(400).json({ message: "Validation Error", details: error.details.map( x => x.message)});
        if(error) return next(error);

        const updated = await Idol.findOneAndUpdate({Id: Number(req.params.id)}, req.body,{
            new:true,
            runValidators: true,
        });

        // if(!updated) return res.status(404).json({results: "Idol Not Found"});
        if(!updated) {
            const error = new Error("Idol Not Found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({message: "Idol updated"});
    } catch (error) {
        // res.status(500).json({ message: "Error updating idol", error });
        next(error);
    }
}

export const deleteIdolById = async (req, res) =>{
    const id = req.params.id;

    try {
        const removed = await Idol.findOneAndDelete({Id: Number(id)});

        // if(!removed) return res.status(404).json({results: "Idol Not Found"});
        if(!removed) {
            const error = new Error("Idol Not Found");
            error.statusCode = 404;
            return next(error);
        } 

        res.status(200).json({message: "Idol deleted successfuly", results:removed });
    } catch (error) {
        // res.status(500).json({ message: "Error updating idol", error });
        next(error);
    }


}
