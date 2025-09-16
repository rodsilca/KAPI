import Group from "../models/Group.js";

export const getAllGroups = async(req,res) => {
    const {name} = req.query;

    try {

        let filter = {};

        if(name){
            filter.Name = {$regex: name, $options: "i"};
        }

        const groups = await Group.find(filter);

        res.status(200).json({count: groups.length, results: groups});
    } catch (error) {
        res.status(500).json({ message: "Error searching for groups", error });
    }
};

export const getGroupById = async (req,res) => {
    const id = req.params.id;
    
    try {
        const group = await Group.findOne({Id: Number(id)});

        if(!group) return res.status(404).json({message: "Group Not Found"});

        res.status(200).json({count: group.length, results: group});
    } catch (error) {
        res.status(500).json({ message: "Error searching for groups", error });
    }
};

export const createGroup = async (req,res)=>{
    try{
        const newGroup = new Group(req.body);
        newGroup.save();

        res.status(201).json({message: "Group created"});

    }catch(error){
        res.status(500).json({ message: "Error creating group", error });
    }
}

export const updateGroup = async (req,res) =>{
    try {
        const update = await Group.findOneAndUpdate({Id: Number(req.params.id)}, req.body);

        if(!update) return res.status(404).json({message: "Group Not Found"});

        res.status(204).json({message: "Group updated"});
    } catch (error) {
        res.status(500).json({ message: "Error updating group", error });
    }
}

export const deleteGroupById = async (req,res) =>{
    try {
        const removed = await Group.findOneAndDelete({Id: Number(req.params.id)});

        if(!removed) return res.status(404).json({message: "Group Not Found"});

        res.status(200).json({message: "Group deleted"});

    } catch (error) {
        res.status(500).json({ message: "Error deleting group", error });
    }
}
