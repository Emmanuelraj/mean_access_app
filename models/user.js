const mongoose = require('mongoose');

var mongooseSchema  = new mongoose.Schema({

      name:{
        type: String,
        required : true
      },
      email:{
        type:String,
        required: true
      },
      username:{
        type: String,
        required: true
      },
      password:{
        type:String,
        required:true
      },
      user:{
        type:String,
        required : false
    }

});



module.exports = mongoose.model('userm', mongooseSchema)
