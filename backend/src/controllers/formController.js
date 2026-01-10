const FormConfig = require('../models/FormConfig');

// Get Form Configuration
exports.getFormConfig = async (req, res) => {
    try {
        const { formId } = req.params;
        const config = await FormConfig.findOne({ formId });

        if (!config) {
            // Return defaults if not found (Optional: could handle in frontend)
            return res.status(200).json(null);
        }

        res.status(200).json(config);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Form Configuration
exports.updateFormConfig = async (req, res) => {
    try {
        const { formId } = req.params;
        const { fields, submitButtonText, title } = req.body;

        let config = await FormConfig.findOne({ formId });

        if (config) {
            config.fields = fields;
            config.submitButtonText = submitButtonText;
            config.title = title || config.title;
            config.updatedAt = Date.now();
            await config.save();
        } else {
            config = new FormConfig({
                formId,
                title,
                submitButtonText,
                fields
            });
            await config.save();
        }

        res.status(200).json(config);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
