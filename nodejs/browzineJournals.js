var https = require('https');
 
exports.JournalLookup = function (event, context, callback) {
    // parse URL query from Primo
    var query = require('querystring').parse(event.querystring);
    // initialize options values
    var ISSN = (query.ISSN === undefined ? 'noISSN' : query.ISSN);
    var cb = (query.callback === undefined ? '' : query.callback);
    
    // API key from Browzine
    var stoKey = process.env['stoKey'];
    // Customer ID from Browzine
    var stoID = process.env['stoID'];
    var options = {
        host :  'api.thirdiron.com',
        path : '/public/v1/libraries/' + stoID + '/search?issns=' + ISSN + '&access_token=' + stoKey,
        method : 'GET'
    };
    
    //make the https get call to Browzine and pass the callback data to Primo
    var getReq = https.request(options, function(res) {
        res.on('data', function(data) {
            callback(null,  
            cb + '(' + data + ')'
            );
        });
    });
 
    //end the request
    getReq.end();
    getReq.on('error', function(err){
        console.log("Error: ", err);
    }); 
};
