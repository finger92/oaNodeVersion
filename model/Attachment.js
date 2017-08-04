var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Attachment = new Schema({
    title : { 
        type: String, 
        unique: true 
    },
    author : {
        name: String,
        dept: String,
    },,
    action : String,
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

mongoose.model('Attachment', Attachment);
exports.Attachment = mongoose.model('Attachment');