import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const GenerateCodeAPI = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    
    const promptInstructions = `
// Prompt Content
${prompt}

Create with this static page layout:
<section className="mt-12 w-full max-md:mt-10 max-md:max-w-full md:px-[100px]">
      <div className="flex gap-5 max-md:flex-col">
</div></section >
// Styling
Use Tailwind CSS for styling.
The background color of the entire section should be inherit.
The heading text in the left section should be bold, red, uppercase, and larger than the rest of the text.
Apply margins, paddings, and spacing to create a clean, well-organized layout.
Ensure responsiveness:
On larger screens, display the text and image side by side.
On smaller screens, stack the sections vertically.

// Instruction
Only include JSX elements inside the return() function (such as <div>, <h2>, <p>, and <img>).
Do not include any imports, state declarations, or JavaScript logic outside the JSX.
Use Tailwind CSS classes to style each element.

// Role
You are a front-end developer aiming to create a visually appealing and responsive component.

// Requirement
The component must be responsive, visually balanced, and convey the restaurant’s story effectively. Use Tailwind CSS for all styling.

// Output
A JSX code snippet with the component structure:
Two main sections arranged using flex-row.
A heading and paragraph for the left section.
An image with rounded corners and shadow for the right section.
Only provide the JSX elements within the return() function, such as <div>, <img>, <h2>, <p>, and <button>.
Do not include any other code, such as imports, state declarations, or additional JavaScript logic outside of JSX or return().
`;

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
