var app = require('./app.js');

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log("Server is listening on " + port);
});

