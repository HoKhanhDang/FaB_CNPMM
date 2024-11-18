import React, { createContext, useContext, useState, useEffect } from "react";
import { translateText } from "./translateService";

interface TranslationContextType {
    translate: (text: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
    undefined
);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [translations, setTranslations] = useState<{ [key: string]: string }>(
        {}
    );

    const translate = (text: string) => {
        return translations[text] || text;
    };

    useEffect(() => {
        const translateStaticTexts = async () => {
            const textsToTranslate = ["Title"]; // Add all static texts here
            const translatedTexts: { [key: string]: string } = {};

            for (const text of textsToTranslate) {
                try {
                    const translated = await translateText(text, "vn");
                    console.log(`Translated text "${text}":`, translated);
                    translatedTexts[text] = translated;
                } catch (error) {
                    console.error(`Error translating text "${text}":`, error);
                }
            }

            setTranslations(translatedTexts);
        };

        translateStaticTexts();
    }, []);

    return (
        <TranslationContext.Provider value={{ translate }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error(
            "useTranslation must be used within a TranslationProvider"
        );
    }
    return context;
};
