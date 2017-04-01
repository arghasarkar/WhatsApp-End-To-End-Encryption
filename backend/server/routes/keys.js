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

                db.fetchItem('get_user_id', params, function (databasereturned) {
                    response.json(databasereturned);
                });
            });
        })

        .get('/get_key_by_phone', function (request, response) {
            var params = [
                request.query.mobile_phone
            ];

            db.fetchItem('get_user_id_by_phone', params, function (databasereturned) {
                var jsonobject = databasereturned;
                //jsonobject.get = decryptedmessage;
                response.json(jsonobject);
            });
        })

        .get('/get_keys', function (request, response) {
            var params = [
                request.query.id
            ];
            db.fetchListAndReturn('list_keys', params, response);
        })

        .post('/create_key', function (request, response) {
            var body = request.body;
            var params = [
                body['user_id'],
                body['key'],
                body['key_name']
            ];
            db.fetchItemAndReturn('new_key', params, response);
        })

        .post('/create_user', function (request, response) {
            var body = request.body;
            cryptops.returnHash(body['password'], function (res) {
                var params = [
                    body['email'],
                    res,
                    body['full_name'],
                    body['mobile_phone']
                ];

                db.fetchItemAndReturn('new_user', params, response);
            });
        });

    parentRouter.use('/keys', messagesRouter);
};
