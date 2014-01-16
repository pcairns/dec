var ingredient = require('./ingredient'),
    _ = require('underscore');

module.exports = function(redis) {
    var hop = {
        redis: redis,
        collection: 'hops'
    };
    _.extend(hop, ingredient);

    return hop;
};