import Idol from "../models/Idol.js";
import Group from "../models/Group.js";

export function checkIdExists(model){

    return async (req,res,next) =>{
        const id = req.body.Id;

        if(!id) return res.status(400).json({message: "Id is required"});

        const exists = await model.findOne({Id: Number(id)});

        if(exists) return res.status(409).json({ error: "ID is not available" });

        next();
    };

}