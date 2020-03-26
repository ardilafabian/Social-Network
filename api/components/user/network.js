const express = require('express');

const response = require('../../../network/response')
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);
router.delete('/:id', remove);

// Internal functions
function list(req, resp) {
    Controller.list()
        .then((list) => {
            response.success(req, resp, list, 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
}

function get(req, resp) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, resp, user, 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
}

function upsert(req, resp) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, resp, user, 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
}

function remove(req, resp) {
    Controller.remove(req.params.id)
        .then(() => {
            response.success(req, resp, "User deleted successfully.", 200);
        })
        .catch((err) => {
            response.error(req, resp, err.message, 500);
        });
}

module.exports = router;