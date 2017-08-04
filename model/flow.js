var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Flow = new Schema({
    doc : {
        operator : String,
        date : { 
            type: Date, 
            index: true, 
            default: Date.now 
        },
    
        id : Schema.Types.ObjectId,
        title : String,
        author : {
            name: String, 
            dept: String
        },
        ,
        isdel: {
            type: Boolean, 
            default: false 
        }
    },
    
})

mongoose.model('Flow', Flow);
exports.Flow = mongoose.model('Flow');