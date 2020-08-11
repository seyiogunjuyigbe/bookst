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
        checkIfMerchant(req, res, next) {
                if (!req.user) {
                        return res.status(200).redirect('/auth/login?redirect=' + req.originalUrl);
                }
                else {
                        if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized access" });
                        else {
                                next()
                        }

                };
        }
}