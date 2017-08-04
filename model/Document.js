var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ApplicationDoc = new Schema({
    title : { 
        type: String, 
        unique: true 
    },
    operators : [ Schema.Types.ObjectId ],
    num : String,
    attachments : [ Schema.Types.ObjectId ],
    comments : Schema.Types.Mixed, //{user:{name:String, dept:String, comments:[]}}
    fields : Schema.Types.Mixed,
    author : {
        name: String,
        dept: String,
    },
    date : { 
        type: Date, 
        index: true, 
        default: Date.now 
    },
    isdel: {
        type: Boolean, 
        default: false
    }
})

ApplicationDoc.methods.revertDocument = function(userid, userCmt, cb) {
    console.log(this.comment);
    this.comment[userid]['comments']?this.comment[userid]['comments']=userCmt:'';
    this.save(cb);
    // return cb();
};

mongoose.model('ApplicationDoc', ApplicationDoc);
exports.ApplicationDoc = mongoose.model('ApplicationDoc');