let app, express, path, port, router;

express = require('express');
path = require('path');
port = process.env.PORT || 8080;
app = express();

app.use(express["static"](path.join(__dirname, '/controller')));
app.use(express["static"](path.join(__dirname, '/hermione_files')));
app.use(express["static"](path.join(__dirname, '/source')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/controller/control.html"));
});
app.get('/sumo', function(req, res) {
    res.sendFile(path.join(__dirname + "/sumo2.html"));
});
app.get('/hermione', function(req, res) {
    res.sendFile(path.join(__dirname + "/hermione.html"));
});
app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port);

console.log('Magic happens on port ' + port);


