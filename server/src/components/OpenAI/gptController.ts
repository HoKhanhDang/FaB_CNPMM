import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const GenerateCodeAPI = async (req: Request, res: Response) => {
    const { prompt } = req.body;

    const promptInstructions = `//Prompt Content
Build a React functional component using TypeScript and Tailwind CSS to display a restaurant's story section. The component should be visually appealing and responsive on both mobile and desktop.
Image Source:
https://cdn.builder.io/api/v1/image/assets/TEMP/6f9cd253ca538844dd7da6c5fb0294e5183260ba00df1d238cbb9494dc9c2017?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca10.

//Layout
The component should be divided into two sections side-by-side, using a flex-row layout.
Left Section:
A heading that says "${prompt}" in bold, uppercase, red text.
Below the heading, a paragraph with placeholder text (like Lorem Ipsum) in a regular, gray font to describe the restaurant.
Right Section:
A single large image of people gathered and dining in a restaurant.
The image should have rounded corners and a subtle shadow to add depth.
//Styling
Use Tailwind CSS for styling.
The background color of the entire section should be a light beige.
The heading text in the left section should be bold, red, uppercase, and larger than the rest of the text.
Apply margins, paddings, and spacing to create a clean, well-organized layout.
Ensure responsiveness:
On larger screens, display the text and image side by side.
On smaller screens, stack the sections vertically.
//Instruction
Only include JSX elements inside the return() function (such as <div>, <h2>, <p>, and <img>).
Do not include any imports, state declarations, or JavaScript logic outside the JSX.
Use Tailwind CSS classes to style each element.
//Role
You are a front-end developer aiming to create a visually appealing and responsive component for a restaurant's "Our Story" section.

//Requirement
The component must be responsive, visually balanced, and convey the restaurant’s story effectively. Use Tailwind CSS for all styling.

//Output
A JSX code snippet with the component structure:
Two main sections arranged using flex-row.
A heading and paragraph for the left section.
An image with rounded corners and shadow for the right section.
Only provide the JSX elements within the return() function, such as <div>, <img>, <h2>, <p>, and <button>.
Do not include any other code, such as imports, state declarations, or additional JavaScript logic outside of JSX or return() word

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
