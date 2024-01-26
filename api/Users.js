const mongoose = require("mongoose")

const schema = mongoose.Schema


const usersschema = new schema({
    uid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
})



const Users = mongoose.model("users",usersschema);

module.exports = Users