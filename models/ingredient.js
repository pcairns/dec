module.exports = {
    ingredients_collection : 'ingredients',
    api_key: "8617e4cbe2de5540156dcfa2b0e1e5d4",
    api_base: 'https://api.brewerydb.com/v2/',
    page_num: 1,
    get: function get(id, callback) {
        return this.redis.hget(this.ingredients_collection, id, callback);
    },
    all: function all(callback) {
        return this.redis.hgetall(this.collection, callback);
    },
    build: function() {
       this.page(this.page_num, this.processor);
    },
    page: function(page_num, callback) {
        var rest = require('restler'),
            caller = this;
        rest.get(this.api_base + this.collection, {query: {p: page_num, key: this.api_key}})
            .on('complete', function(result) {
                callback.call(caller, result);
            })
            .on('error', function(err) {
                console.log("shit's fucked");
                console.log(err);
            });
    },
    processor: function(data) {
        for (var x in data.data) {
            var current = data.data[x];
            this.redis.hset(this.collection, current.id, current.name);
            this.redis.hset(this.ingredients_collection, current.id, JSON.stringify(current));
        }
        
        if (this.page_num < data.numberOfPages) {
            this.page_num++;
            this.page(this.page_num, this.processor);
        }
    }
};
