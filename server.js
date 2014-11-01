// var port = 4000;
// var express = require('express');
// var app = express();
// app.use(express.static('./www/'));
// app.listen(port);
// console.log("\nhttp://127.0.0.1:"+port+"\n");





livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname + "/www");

/* ======================================= */

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var format = require('util').format;
var cool = require('cool-ascii-faces');
var item = null;
/* ======================================= */


var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000))
app.use(express.static('./www/'));

app.get('/addItem',function(request,response)
{
  var insertData = {
    box_id:     request.query.box_id,
    name:           request.query.name,
    boxname:         request.query.boxname
  };

  item.insert(insertData,function()
  {
    response.send('Success');
  });
});

app.get('/getItem/:box_id?',function(request,response)
{
  var find = {};

  if(request.params.box_id)
    find.box_id = request.params.box_id;

  item.find(find).toArray(function(err,result)
  {
    response.send(JSON.stringify(result));
  });
});

app.get('/updateItem/:box_id',function(request,response)
{
  var find = {};
  var newData = {};
  if(request.params.box_id)
    find._id = new ObjectID(request.params.box_id);

  if(request.query.name)
    newData.name = request.query.name;
  if(request.query.boxname)
    newData.boxname = request.query.boxname;


    console.log(newData);

  item.update(find,{'$set':newData},function(err,result)
  {
    response.send('Success');
  });
});

app.get('/removeItem/:box_id',function(request,response)
{
  var find = {};
  if(request.params.box_id)
    find._id = new ObjectID(request.params.box_id);

  item.remove(find,function(err,result)
  {
    if(err)
      response.send(err);
    else
    response.send('Success');
  });
});



MongoClient.connect('mongodb://Naragorn:824687893@kahana.mongohq.com:10071/Naragorn_Work', function(err, db) {
  if(err) throw err;
  item = db.collection('box');
  app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
});
