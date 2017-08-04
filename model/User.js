var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
    name : { 
        type: String, 
        unique: true 
    },
    idcard : String,
    phone : { 
        type: String, 
        match: /^\d{11}$/
    },
    undo : [Schema.Types.ObjectId], 
    done : [Schema.Types.Mixed], //[{docid:{sendto:[], revertCmt:[]}}] 在本人转给他人的时候不需要修改，保留撤回后的状态，在被转发的时候需要修改
    favor : [Schema.Types.ObjectId],
    num : Number,
    date : { 
        type: Date, 
        default: Date.now 
    },
    active : {
        type: Boolean, 
        default: true
    },
})

mongoose.model('User', User);
exports.User = mongoose.model('User'); 