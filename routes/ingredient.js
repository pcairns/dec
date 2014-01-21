module.exports = function(model) {
    return {
        list: function(req, res) {
            model.all(function(err, items) {
                if(err) throw err;
                res.send(items);
            });
        },

        // GET /hops/:key
        retrieve: function(req, res) {
            var key = req.params.key;
            
            model.get(key, function(err, item) {
                if(err) throw err;
                res.send(item);
            });
        }
    };
};