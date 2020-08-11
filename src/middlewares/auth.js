const response = require('./response');
module.exports = {
        checkAuth(req, res, next) {
                if (!req.user) {
                        return res.status(200).redirect('/auth/login?redirect=' + req.originalUrl);
                }
                else {
                        next()
                };
        },
}