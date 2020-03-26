const express = require('express');

const response = require('../../../network/response')
const Controller = require('./index');

const router = express.Router();

router.get('/', function(req, resp) {
    Controller.list()
        .then((list) => {
            response.success(req, resp, list, 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
});

router.get('/:id', function(req, resp) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, resp, user, 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
});

router.post('/', function(req, resp) {
    console.log(req.body);
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, resp, user, 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
})

router.delete('/:id', function(req, resp) {
    Controller.remove(req.params.id)
        .then(() => {
            response.success(req, resp, "User deleted successfully.", 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
})

module.exports = router;