const mongoose = require('mongoose')



const Schema = mongoose.Schema

const userSchema = new Schema({
    image:{
        type:String,
    },
    name: {
        type: String,
        required: true,
      },
    accountType: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    contactNumber: {
        type: String,
        required: true,
      },
    bio: {
        type: String,
        required: true,
      },
      linkedin: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        required: true,
      },
      twitter: {
        type: String,
      },
      portfolio: {
        type: String,
      },
      password: {
        type: String,
        required: true,
      },
    company :{
        type :String,
        required:true
    }
},
{
    timestamps: true,
  }
)




module.exports = mongoose.model('User',userSchema)