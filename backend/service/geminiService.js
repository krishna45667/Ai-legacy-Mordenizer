const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const modernizeWithGemini = async (code) => {

    const prompt = `
You are an expert JavaScript modernization software engineer.

Modernize the following legacy JavaScript code.

Requirements:
- Preserve the original behavior as much as reasonably possible.
- Replace outdated JavaScript syntax with modern JavaScript syntax.
- Prefer const and let instead of var.
- Use modern ES6+ features where they improve readability and maintainability.
- Use arrow functions, destructuring, template literals, optional chaining, and async/await where appropriate.
- If the code uses legacy jQuery patterns, replace them with modern vanilla JavaScript or React patterns where appropriate.
- Keep the resulting code simple, readable, and maintainable.
- Do not invent functionality that was not present in the original code.
- Explain the important changes in plain text.
- Return ONLY the requested JSON structure.

Legacy code:

${code}
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",

                responseSchema: {
                    type: "object",

                    properties: {
                        updatedCode: {
                            type: "string"
                        },

                        explanation: {
                            type: "string"
                        }
                    },

                    required: [
                        "updatedCode",
                        "explanation"
                    ]
                }
            }
        });

        const text = response.text;

        if (!text) {
            throw new Error("Gemini returned an empty response.");
        }

        try {

            const parsed = JSON.parse(text);

            if (!parsed.updatedCode || !parsed.explanation) {
                throw new Error(
                    "Gemini response is missing required fields."
                );
            }

            // Only return the fields our application needs
            return {
                updatedCode: parsed.updatedCode,
                explanation: parsed.explanation
            };

        } catch (error) {

            console.error(
                "Invalid JSON received from Gemini:",
                text
            );

            throw new Error(
                "Gemini returned invalid JSON."
            );
        }

    } catch (error) {

        console.error(
            "Gemini API error:",
            error
        );

        throw error;
    }
};

module.exports = {
    modernizeWithGemini
};
