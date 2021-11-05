const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
    register: async (userData) => {
        const { name, email, password, place } = userData;
        // Check email exist
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return { emailExists: true };
        } else {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create user
            const user = new User({ name, email, password: hashedPassword, place, isAdmin: false });
            await user.save();
            return { user };
        }
    },
    login: async (userData) => {
        const { email, password } = userData;
        // Check email exist
        const user = await User.findOne({ email });
        if (user) {
            // Check password
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                return { user };
            } else {
                return { invalidPassword: true };
            }
        } else {
            return { invalidEmail: true };
        }
    },
    getUser: async (userId) => {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (err) {
            throw err;
        }
    },
};