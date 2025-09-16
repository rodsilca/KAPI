import mongoose from "mongoose";

const IdolSchema = new mongoose.Schema({
    StageName:{ type: String, required: true},
    FullName: String,
    KoreanName: String,
    KoreanStageName: String,
    DateOfBirth: Date,
    Group: String,
    Country:String,
    Birthplace:String,
    SecondGroup: String,
    Gender: {type: String, enum:['M','F','Other'] }
},{
    timestamps: true
});

const Idol = mongoose.model('Idol', IdolSchema);
export default Idol;

