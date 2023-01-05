const mongoose=require('mongoose')
const injectionModel=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    image:{type:String ,required:true},
    price: { type: String, required: true },
    Composition: { type: String, required: true },
    effectiveMaterial: { type: String, required: true },
    alternative: { type: String, required: true },
    indication: { type: String, required: true },
    

    
})

module.exports=mongoose.model('injectionModel',injectionModel)
