const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
};

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, owner) {
        const decode = decodeHeader(req);
        console.log(decode);
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

    return 
}

module.exports = {
    sign,
};