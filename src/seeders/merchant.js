const User = require('../models/user')
module.exports = async () => {
    try {
        let existing = await User.findOne({ role: 'admin' })
        if (existing) console.log("Admin already seeded")
        else {
            let email = "merchant@bookreaper.com",
                password = "securePass",
                firstName = "Merchant",
                lastName = "Reaper",
                phone = "081008787677",
                role = "admin"
            const newUser = new User({ email, firstName, lastName, phone, role });
            const user_ = await User.register(newUser, password)
            await user_.save();
            console.log('Admin Seeded')
        }
    } catch (error) {
        console.log({ err: error.message })
    }
};