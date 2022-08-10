const mongoose=require('mongoose');
const usuarioSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    camara1:{
        type:String,
        required:false
    },
    camara2:{
        type:String,
        required:false
    },
    tipo:{
        type:String,
        default:'user'
    },
    estatus:{
        type:Boolean,
        default:true
    }
});


module.exports=mongoose.model('usuario',usuarioSchema);