var db = require('../pg_db_adapter');
var express = require('express');
var cryptops = require('../calculate/crypto_ops');

module.exports = function (parentRouter) {
    var messagesRouter = express.Router();

    messagesRouter
        .post('/get_id', function (request, response) {
            var body = request.body;
            cryptops.returnHash(body['password'], function (res) {
                var params = [
                    body['email'],
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
                var params = [
                    databasereturned.get_user_id_by_phone
                ];
                db.fetchListAndReturn('list_keys', params, response);
            });
        })

        .get('/get_key_by_mail', function (request, response) {
            var params = [
                request.query.email
            ];

            db.fetchItem('get_user_id_by_mail', params, function (databasereturned) {
                var params = [
                    databasereturned.get_user_id_by_mail
                ];
                db.fetchListAndReturn('list_keys', params, response);
            });
        })

        .get('/get_key_by_name', function (request, response) {
            var params = [
                request.query.full_name
            ];

            db.fetchItem('get_user_id_by_name', params, function (databasereturned) {
                var params = [
                    databasereturned.get_user_id_by_name
                ];
                db.fetchListAndReturn('list_keys', params, response);
            });
        })

        .get('/remove_key', function (request, response) {
            var params = [
                request.query.user_id,
                request.query.key_name
            ];

            db.fetchItemAndReturn('remove_key', params, response);
        })

        .get('/get_keys', function (request, response) {
            var params = [
                request.query.id
            ];

            db.fetchItem('get_user_object', params, function (userObject) {
                db.fetchList('list_keys', params, function (keyList) {
                    var jsonObject = userObject.get_user_object;
                    response.json(jsonObject);
                });
            });
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
