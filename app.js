
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , redis = require('redis');

var app = express();
var client = redis.createClient();
var recipe = require('./routes/recipe')(client);

client.on('error', function(err) {
    console.log(err);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/recipe', recipe.list);
app.get('/recipe/:key', recipe.retrieve);
app.put('/recipe/:key', recipe.replace);
app.post('/recipe', recipe.create);
app.delete('recipe/:key', recipe.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
