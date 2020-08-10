const response = require('./response');
module.exports = {
        checkAuth(req, res, next) {
                if (!req.user) {
                        return response.error(res, 401, 'Unauthorized acccess')
                        //  return res.status(200).redirect('/auth/login?redirect='+req.originalUrl);
                }
                else {
                        next()
                };
        },
}