import axios from "axios";

const LIBRETRANSLATE_API_URL = "https://libretranslate.com/translate";
const LIBRETRANSLATE_API_KEY = "your-api-key";

export const translateText = async (text: string, targetLang: string) => {
    try {
        const response = await axios.post(
            LIBRETRANSLATE_API_URL,
            {
                q: text,
                source: "en", // Assuming the source language is English
                target: targetLang,
                format: "text",
                api_key: "",
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data.translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
};
