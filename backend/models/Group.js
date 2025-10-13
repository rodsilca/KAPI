import mongoose from "mongoose";
import Idol from "./Idol.js";

const GroupSchema = new mongoose.Schema({
    Id:{type: Number, unique: true ,required: true},
    Name: {type: String, required: true},
    ShortName: String,
    KoreanName: String,
    Debut: Date,
    Company: String,
    CurrentMemberCount: Number,
    OriginalMemberCount: Number,
    Members:[
        {
            stageName: String,
            url:String
        }
    ],
    FanbaseName: String,
    Active:{type: String, enum:['Yes', 'No']}
},{
    timestamps: true,
    toJSON:{
        transform(doc,ret){
            delete ret._id;
            delete ret.__v;
            
            if(ret.Members){
                ret.Members = ret.Members.map(m => {
                    const {_id, ...rest} = m;
                    return rest;
                });
            }
            return ret;
        }
    }
});
//Middleware que deixa vazio o campo idol quando o grupo for excluido
GroupSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
        await Idol.updateMany(
            { "Group.name": doc.Name },
            { $set: { Group: {} } } // deixa vazio o campo group do idol
        );
    } catch (err) {
        console.error("Failed to remove reference of idols", err);
    }
  }
});

const Group = mongoose.model('Group', GroupSchema);
export default Group;