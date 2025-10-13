import mongoose from "mongoose";
import Group from "./Group.js";

const IdolSchema = new mongoose.Schema({
    Id:{type: Number, unique: true ,required: true},
    StageName:{ type: String, required: true},
    FullName: String,
    KoreanName: String,
    KoreanStageName: String,
    DateOfBirth: Date,
    Group: {
        name: {type: String, required: true},
        url: {type: String, required: true} 
    },
    Country:String,
    Birthplace:String,
    SecondGroup: String,
    Gender: {type: String, enum:['M','F','Other'] }
},{
    timestamps: true,
    toJSON:{
        transform(doc,ret){
            delete ret._id;
            delete ret.__v;
        }
    }
});

//Middleware que exclui o idol da lista de membros no schema group, quando o Idol for excluido do banco
IdolSchema.post("findOneAndDelete", async function (doc) {
    if (doc && doc.Group) {
        try {
        // Busca o grupo como um documento Mongoose completo
            const group = await Group.findOne({Name: doc.Group.name});
            if (group) {
                group.Members = group.Members.filter(
                    (member) => !member.url.endsWith(`/idols/${doc.Id}`)  
                );
                await group.save(); 
            }
        } catch (err) {
            console.error("Failed to update group members:", err);
        }
    }

})

// Middleware que add automaticamente o IDol no grupo correspondente

IdolSchema.post("save", async function(doc, next) {
    try {
        const groupName = doc.Group?.name;
        if(!groupName) return next();

        const group = await Group.findOne({Name: groupName});
        if(!group){
            console.warn(`Group: ${groupName} not found for ${doc.StageName}`);
            return next();
        }

        const exists = group.Members.some(m => m.stageName === doc.StageName);
        if(!exists){
            group.Members.push({
                stageName: doc.StageName,
                url: `http://localhost:8080/api/v1/idols/${doc.Id}`
            })
        }

        await group.save();
        console.log(`Idol added to your respective group: ${groupName}` );

    } catch (error) {
        console.error("Failed to add idol to group", error);
        next(error);
    }
});

const Idol = mongoose.model('Idol', IdolSchema);
export default Idol;

