const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Helper to send response with token
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await authService.registerUser({ name, email, password, role });
    sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide an email and password', 400));
    }

    const user = await authService.loginUser(email, password);
    sendTokenResponse(user, 200, res);
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
    const user = await authService.getUserById(req.user.id);
    res.status(200).json({ success: true, data: user });
});
