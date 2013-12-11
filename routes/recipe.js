module.exports = function(client) {
    return {

        // GET /recipe/

        list: function(req, res) {
            // IMPLIMENT ME    
        },

        // GET /recipe/:key

        retrieve: function(req, res) {
            var key = req.params.key;
            client.hgetall(key, function(err, reply) {
                res.send(reply);
            });
        },

        // PUT /recipe/:key

        replace: function(req, res) {
            var key = req.params.key;
            client.hmset(key, function(err, reply) {
                res.send(200);
            });
        },

        // POST /recipe

        create: function(req, res) {
            //IMPLIMENT ME (hash key = ???)
        },

        // DELETE /recipe/:key 

        delete: function(req, res) {
            client.del(key, function(err, reply) {
                re.send(200);
            });

        }
    };
};