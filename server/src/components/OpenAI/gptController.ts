import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const GenerateCodeAPI = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    
    const promptInstructions = ``
;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: promptInstructions as string }],
        });
        res.json({ completion });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error generating component" });
    }
};

export default { GenerateCodeAPI };
