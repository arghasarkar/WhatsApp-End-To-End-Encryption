var db = require('../pg_db_adapter');
var express = require('express');
var cryptops = require('../calculate/crypto_ops');

module.exports = function (parentRouter) {
    var messagesRouter = express.Router();

    messagesRouter
        .get('/get_id', function (request, response) {
            cryptops.returnHash(request.query.password, function (res) {
                var params = [
                    request.query.email,
                    res
                ];

                db.fetchItem('get_user', params, function (databasereturned) {
                    response.json(databasereturned);
                });
            });
        })

        .post('/create_user', function (request, response) {
            var body = request.body;
            cryptops.returnHash(body['password'], function (res) {
                var params = [
                    body['username'],
                    res
                ];

                db.fetchItemAndReturn('post', params, response);
            });
        });

    parentRouter.use('/keys', messagesRouter);
};
