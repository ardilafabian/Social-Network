const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    // Implement the permission manager
    function middleware(req, res, next) {
        switch(action) {
            case "update":
                const owner = req.body.id;
                auth.check.own(req, owner);
                break;
            default:
                next();
        }
    }

    return middleware;
}