const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response')
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/followers', secure('follow'), followers);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

// Internal functions
function list(req, resp, next) {
    Controller.list()
        .then((list) => {
            response.success(req, resp, list, 200);
        })
        .catch(next);
}

function get(req, resp, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, resp, user, 200);
        })
        .catch(next);
}

function upsert(req, resp, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, resp, user, 200);
        })
        .catch(next);
}

function remove(req, resp, next) {
    Controller.remove(req.params.id)
        .then(() => {
            response.success(req, resp, "User deleted successfully.", 200);
        })
        .catch(next);
}

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function followers(req, res, next) {
    Controller.followers(req.user.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;