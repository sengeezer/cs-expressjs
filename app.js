var express = require('express'),
    app = express();

app.use(express.static('public'));

app.get('/blocks', function(req,res){
  var blocks = ['Fixed', 'Movable','Rotating'];
  res.json(blocks);
});

app.get('/parts', function(req,res){
  res.redirect(301, '/blocks');
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
