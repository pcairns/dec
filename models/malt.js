var ingredient = require('./ingredient'),
    _ = require('underscore');

module.exports = function(redis) {
    var malt = {
        redis: redis,
        collection: 'fermentables'
    };
    _.extend(malt, ingredient);

    return malt;
};