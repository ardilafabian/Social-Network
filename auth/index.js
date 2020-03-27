const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
};

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        //CHECK IF IT IS OWN OR NOT
        if (decoded.id !== owner) {
            throw error('Do not have access', 401);
        }
    },

    logged: function(req) {
        const decoded = decodeHeader(req);
    }
}

function getToken(auth) {
    if(!auth) {
        throw new Error('There is no token.');
    } 

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Token format is invalid');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
};