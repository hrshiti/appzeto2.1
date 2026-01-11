const User = require('../models/User');
const AppError = require('../utils/AppError');

/**
 * Register a new user
 * @param {Object} userData 
 * @returns {Promise<User>}
 */
exports.registerUser = async (userData) => {
    const { name, email, password, role } = userData;

    // Check if user exists (Optional, as model has unique index, but good for custom error message)
    const activeUser = await User.findOne({ email });
    if (activeUser) {
        throw new AppError('Email already in use', 400);
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    return user;
};

/**
 * Login user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<User>}
 */
exports.loginUser = async (email, password) => {
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new AppError('Invalid credentials', 401);
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        throw new AppError('Invalid credentials', 401);
    }

    return user;
};

/**
 * Get user by ID
 * @param {string} id 
 * @returns {Promise<User>}
 */
exports.getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return user;
};
