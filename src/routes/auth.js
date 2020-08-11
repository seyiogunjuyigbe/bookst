
const express = require('express');
const { check } = require('express-validator');

const { login, renderRegister, renderLogin, verify, register, resendToken } = require('../controllers/auth');
const { recover, reset, resetPassword } = require('../controllers/password');
const validate = require('../middlewares/validate');
const { checkAuth } = require('../middlewares/auth')
const router = express.Router();
router.post("/register", [
    check('firstName').not().isEmpty().withMessage('Required field'),
    check('lastName').not().isEmpty().withMessage('Required field'),
    check('email').isEmail().withMessage('Required field'),
    check('phone').not().isEmpty().withMessage('Required field'),
    check('password').not().isEmpty().withMessage('Required field'),
], validate, register);

router.get("/login", renderLogin);
router.get("/register", renderRegister);

// router.get('/logout', logout)
router.post("/login", [
    check('email').not().isEmpty().withMessage('email is required'),
    check('password').not().isEmpty().withMessage('password is required'),
], validate, login);


//EMAIL Verification
router.get('/verify/:token', verify);
router.get('/token/resend', (req, res) => {
    return res.status(200).render('resend', { err: null })
});
router.post('/token/resend',
    check('email').isEmail().withMessage('Enter a valid email address'), validate, resendToken);

//Password RESET
router.get('/password/recover', (req, res) => {
    return res.status(200).render('recover', { err: null })
});

router.post('/password/recover', [
    check('email').isEmail().withMessage('Enter a valid email address'),
], validate, recover);

router.get('/password/reset/:token', reset);

router.post('/password/reset/:token', [
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Must be at least 6 chars long'),
], validate, resetPassword);
// router.get('/password/change', checkAuth, Password.renderChangePassword)
// router.post('/password/change', [
//     check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
//     check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
// ], validate,Password.changePassword);
module.exports = router;