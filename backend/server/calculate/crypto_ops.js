var crypto = require('crypto');

function getHash(password, callback) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    var hashedpassword = hash.digest('hex');
    callback(hashedpassword);
}

module.exports = {
    returnHash: function (password, callback) {
        getHash(password, callback);
    }
};