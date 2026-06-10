const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
},
secretkey:{
    type:String,
    required:true
},
role: {
    type:String,
    enum: ['admin','shopkeeper','customer'],
    default:'customer'
}
})

module.exports=mongoose.model('User',userSchema)