'use strict';

var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, '../dist')));
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  console.log(`listening at: http://localhost:${server.address().port}`);
});