const mongoose=require('mongoose');
const portfolioSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})

const Portfolio=mongoose.model('Portfolio',portfolioSchema);
module.exports=Portfolio;