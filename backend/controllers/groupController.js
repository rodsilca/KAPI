import Group from "../models/Group.js";
import { createGroupSchema, updateGroupSchema } from "../validators/groupValidator.js";

export const getAllGroups = async(req,res,next) => {
    const {page =1, limit =10} = req.query;
    const {name, debut, company, members,sort} = req.query;

    let filter = {};

    if(name){
        filter.Name = {$regex: name, $options: "i"};
    }
    if(debut){
        filter.Debut ={}
        filter.Debut.$gte = new Date(`${debut}-01-01`);
        filter.Debut.$lte = new Date(`${debut}-12-31`);
    }
    if(company){
        filter.Company = {$regex: company, $options: "i"};
    }
    if(members){
        filter.CurrentMemberCount = Number(members);
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

        const groups = await Group.find(filter)
        .skip(skip)
        .limit(limitNumber)
        .sort(sortOption)
        .collation({locale:"en", strength: 2});

        const total = await Group.countDocuments(filter); 

        res.status(200).json({count: total, 
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total/ limitNumber),
            results: groups
        });
    } catch (error) {
        next(error);
    }
};

export const getGroupById = async (req,res,next) => {
    const id = req.params.id;
    
    try {
        const group = await Group.findOne({Id: Number(id)});

        if(!group) {
            const error = new Error("Group Not Found");
            error.statusCode = 404;
            next(error);
        };

        res.status(200).json({count: group.length, results: group});
    } catch (error) {
        next(error);
    }
};

export const createGroup = async (req,res,next)=>{
    try{

        const {error} = createGroupSchema.validate(req.body);

        if(error) return next(error);

        const newGroup = new Group(req.body);
        newGroup.save();

        res.status(201).json({message: "Group created", results: req.body});

    }catch(error){
        next(error);
    }
}

export const updateGroup = async (req,res,next) =>{
    try {

        const {error} = updateGroupSchema.validate(req.body);

        if(error) return next(error);

        const update = await Group.findOneAndUpdate({Id: Number(req.params.id)}, req.body);

        if(!update) {
            const error = new Error("Group Not Found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({message: "Group updated"});
    } catch (error) {
        next(error);
    }
}

export const deleteGroupById = async (req,res,next) =>{
    try {
        const removed = await Group.findOneAndDelete({Id: Number(req.params.id)});

        if(!removed) {
            const error = new Error("Group Not Found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({message: "Group deleted successfuly"});

    } catch (error) {
        next(error);
    }
}
