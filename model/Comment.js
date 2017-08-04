var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Comment = new Schema({
    content : String,
    visible : Boolean,
    author : {
        name: String, 
        dept: String
    },
    isdel: {
        type: Boolean, 
        default: false
    },  
    date : { 
        type: Date, 
        index: true, 
        default: Date.now 
    }
})

mongoose.model('Comment', Comment);
exports.Comment = mongoose.model('Comment');