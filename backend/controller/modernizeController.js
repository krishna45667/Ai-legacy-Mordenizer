const { modernizeWithGemini } = require("../service/geminiService");

const modernizeCode = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code || !code.trim()) {
            return res.status(400).json({
                error: "Code input cannot be empty."
            });
        }

        const result = await modernizeWithGemini(code);

        return res.status(200).json(result);

    } catch (error) {
        console.error("Modernization error:", error);

        return res.status(500).json({
            error: "Failed to modernize code. Please try again."
        });
    }
};

module.exports = {
    modernizeCode
};