
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , redis = require('redis')
  , client = redis.createClient()
  , yeast = require('./models/yeast')(client)
  , hop = require('./models/hop')(client)
  , malt = require('./models/malt')(client);

var app = express();
var recipe = require('./routes/recipe')(client),
    yeast_routes = require('./routes/ingredient')(yeast),
    hop_routes = require('./routes/ingredient')(hop),
    malt_routes = require('./routes/ingredient')(malt);



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
app.use('/components', express.static(__dirname + '/bower_components'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/hops', hop_routes.list);
app.get('/hops/:key', hop_routes.retrieve);

app.get('/yeasts', yeast_routes.list);
app.get('/yeasts/:key', yeast_routes.retrieve);

app.get('/malts', malt_routes.list);
app.get('/malts/:key', malt_routes.retrieve);

app.get('/recipe', recipe.list);
app.get('/recipe/:key', recipe.retrieve);
app.put('/recipe/:key', recipe.replace);
app.post('/recipe', recipe.create);
app.delete('recipe/:key', recipe.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
