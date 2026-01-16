const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create a payment order
// @route   POST /api/payments/create-order
// @access  Public (or Admin protected if needed)
exports.createOrder = async (req, res) => {
    try {
        const { name, email, phone, amount, paymentPlan, productName } = req.body;

        if (!name || !email || !phone || !amount) {
            return res.status(400).json({ message: 'Please provide all details' });
        }

        const options = {
            amount: Number(amount) * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ message: 'Something went wrong with Razorpay' });
        }

        const payment = new Payment({
            name,
            email,
            phone,
            amount: Number(amount),
            paymentPlan,
            productName,
            razorpayOrderId: order.id,
            status: 'pending'
        });

        await payment.save();

        res.status(201).json({
            success: true,
            order,
            payment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Public
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Update payment status
            const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });

            if (payment) {
                payment.razorpayPaymentId = razorpay_payment_id;
                payment.razorpaySignature = razorpay_signature;
                payment.status = 'paid';
                await payment.save();
            }

            res.status(200).json({
                success: true,
                message: 'Payment verified successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid signature'
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all payments (for Admin)
// @route   GET /api/payments
// @access  Admin
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
