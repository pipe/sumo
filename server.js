let app, express, path, port, router;

let GyroNorm = require('gyronorm').GyroNorm;
express = require('express');
path = require('path');
port = process.env.PORT || 8080;
app = express();

app.use(express["static"](path.join(__dirname, '/controller')));
app.use(express["static"](path.join(__dirname, '/node_modules/gyronorm')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/controller/control.html"));
});

app.listen(port);

console.log('Magic happens on port ' + port);


