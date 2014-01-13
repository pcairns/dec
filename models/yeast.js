module.exports = function(redis) {
    
var API_URL = "https://api.brewerydb.com/v2/yeasts",
    page_num = 1;

    function build() {
        getPage(page_num, processor);       
    }

    function all(callback) {
        return redis.hgetall('yeasts', callback);
    }

    function get(id, callback) {
        return redis.hget('ingredients', id, callback);
    }

    var processor = function(data) {
        

        for (var x in data.data) {
            var current = data.data[x];
            console.log(data.data[x].id);
            redis.hset("yeasts", current.id, current.name);
            redis.hset("ingredients", current.id, JSON.stringify(current));
        }
        
        if (page_num < data.numberOfPages) {
            page_num++;
            getPage(page_num, processor);
        }
    };

    function getPage(page, callback) {
        var rest = require('restler');
        console.log("Page " + page_num);
        console.log('===============================');
        console.log(API_URL + "?p=" + page + "&key=8617e4cbe2de5540156dcfa2b0e1e5d4");
        rest.get(API_URL, {query: {p: page, key: "8617e4cbe2de5540156dcfa2b0e1e5d4"}})
            .on('complete', function(result) {
                callback(result);
            })
            .on('error', function(err) {
                console.log("shit's fucked");
                console.log(err);
            });
    };

    return { 
        build: build,
        all: all,
        get: get
    };
};