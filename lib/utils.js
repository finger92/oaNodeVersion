var moment = require('moment');
moment.locale('us-en');

// formate date
exports.formatDate = function(date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }

};

exports.isEmpty = function(object){
    return object==null||object=='';
}

exports.today = function(){
    return moment(new Date()).format('YYYY-MM-DD HH:mm');
}