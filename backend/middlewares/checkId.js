import Idol from "../models/Idol.js";
import Group from "../models/Group.js";

export function checkIdExists(model){

    return async (req,res,next) =>{
        const data = req.body;    
        if(!Array.isArray(data) || data.length===0){

            const id = data.Id;

            if(!id) return res.status(400).json({message: "Id is required"});

            const exists = await model.findOne({Id: Number(id)});

            if(exists) return res.status(409).json({ error: "ID is not available" });

            next();
        }


        const ids = data.map(item => item.Id);

        const exists = await model.find({Id:  { $in: ids.map(Number) }});

        if (exists.length > 0) {
            return res.status(409).json({
                error: "Some IDs already exist",
            });
        }

        next();

    };

}