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
    FanbaseName: String,
    Active:{type: Boolean}
},{
    timestamps: true
});

const Group = mongoose.model('Group', GroupSchema);
export default Group;