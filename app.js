var express = require('express'),
    app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var logger = require('./logger');

app.use(logger);

app.use(express.static('public'));

var blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

var locations = {
  'Fixed': 'First floor',
  'Movable': 'Second floor',
  'Rotating': 'Penthouse'
};

app.param('name', function(req, res, next) {
  var name = req.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

  req.blockName = block;

  next();
});

app.get('/blocks', function(req, res) {
  res.json(Object.keys(blocks));
});

app.get('/blocks/:name', function(req, res){
  var description = blocks[req.blockName];

  if (!description) {
    res.status(404).json('No description found for ' + req.params.name);
  } else {
    res.json(description);
  }
});

app.post('/blocks', parseUrlencoded, function(req, res) {
  var newBlock = req.body;
  blocks[newBlock.name] = newBlock.description;

  res.status(201).json(newBlock.name);
});

app.get('/locations/:name', function(req, res){
  var location = locations[req.blockName];

  if (!location) {
    res.status(404).json('No description found for ' + req.params.name);
  } else {
    res.json(location);
  }
});

app.get('/parts', function(req,res){
  res.redirect(301, '/blocks');
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
