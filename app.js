
var express = require('express'), wApi = require('./server/wires-api');


var app = express();

var config = require('./config');

app.use(express.static(__dirname + '/app'));

//Route to serve all the wireframes exports
if(config.mediaPaths.indexOf('/') == 0) {
	console.log("mediaPth : " + config.mediaPaths);
	app.use('/media',express.static(config.mediaPaths));
} else {
	console.log("mediaPth : " + __dirname + '/' + config.mediaPaths);
	app.use('/media',express.static(__dirname + '/' + config.mediaPaths));
}
app.set('title', 'SOWT');

app.use('/rest/wires', function (req, res, next) {
  wApi.wires(req,res);
});

app.use('/rest/wire/:id', function (req, res, next) {
  wApi.wire(req,res);
});


//export png

var exec = require('child_process').exec,
    child;

// child = exec('cat *.js bad_file | wc -l',
//   function (error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (error !== null) {
//       console.log('exec error: ' + error);
//     }
// });


// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", 3000, app.settings.env);
});

