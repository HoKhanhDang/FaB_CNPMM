/**
 * This code was generated by Builder.io.
 */
import React from "react";

interface FormSectionProps {
    title: string;
    children?: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
    return (
        <section className="mb-9 px-5">
            <h2 className="self-start text-4xl font-bold text-red-600">
                {title}
            </h2>
            <div className="shrink-0 mt-2 max-w-full h-0.5 bg-red-600 border-2 border-red-600 border-solid w-[801px]" />
            {children}
        </section>
    );
};

export default FormSection;
