import mongoose from "mongoose";

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
    timestamps: true
});

const Idol = mongoose.model('Idol', IdolSchema);
export default Idol;

