var ingredient = require('./ingredient'),
    _ = require('underscore');

module.exports = function(redis) {
    var yeast = {
        redis: redis,
        collection: 'yeasts'
    };
    _.extend(yeast, ingredient);

    return yeast;
};