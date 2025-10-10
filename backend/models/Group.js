import mongoose from "mongoose";

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

const Group = mongoose.model('Group', GroupSchema);
export default Group;