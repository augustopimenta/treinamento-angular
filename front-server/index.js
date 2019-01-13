const express = require('express');
const path = require('path');
const app = express();
const port = 80;

app.use(express.static(__dirname));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, function() {
  console.log("Frontend server started on port " + port);
});
