const User = require('../models/user');
const { success, error } = require('../middlewares/response')

const response = require('../middlewares/response');
const { sendEmail } = require('../utils/index')




// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });

        if (user) return res.status(401).json({ message: 'The email address you have entered is already associated with another account.' });

        const newUser = new User({ ...req.body });
        const user_ = await User.register(newUser, password)
        await user_.save();

        // await sendVerificationEmail(user_, req, res);
        return success(res, 200, { message: "User registered sucesfully", user_ })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res) => {
    try {
        const { email, password, redirect } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ msg: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.' });

        //validate password
        else {
            if (password) {
                user.authenticate(password, (err, found, passwordErr) => {
                    if (err) {
                        return response.error(res, 500, err.message)
                    } else if (passwordErr) {
                        return response.error(res, 401, 'Incorrect email or password')
                    } else if (found) {
                        req.login(user, function (err) {
                            if (err) { return res.status(500).render('error/500', { message: err.message }) }
                            else {
                                req.session.user = req.user;
                                req.session.save()
                                if (redirect) return res.status(200).redirect(redirect)
                                return res.status(200).json({
                                    success: true,
                                    message: 'Login successful',
                                    user: req.user.email
                                })
                            }
                        });
                    }
                })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res) => {
    if (!req.params.token) return res.status(400).json({ message: "We were unable to find a user for this token." });

    try {
        // Find a matching token
        const token = await Token.findOne({ token: req.params.token });

        if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token.userId }, (err, user) => {
            if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

            if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) return res.status(500).json({ message: err.message });

                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
exports.resendToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });

        if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.' });

        await sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

async function sendVerificationEmail(user, req, res) {
    try {
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        let subject = "Account Verification Token";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req.headers.host + "/api/auth/verify/" + token.token;
        let html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({ to, from, subject, html });

        res.status(200).json({ message: 'A verification email has been sent to ' + user.email + '.' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}