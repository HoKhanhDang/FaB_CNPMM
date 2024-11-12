/**
 * This code was generated by Builder.io.
 */
import React from "react";

interface FormInputProps {
    label: string;
    value: string;
    multiline?: boolean;
    isEdit?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    multiline = false,
    isEdit = false
}) => {
    const inputId = label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div
            className={`flex flex-col ${
                multiline ? "w-full" : "flex-1 grow shrink-0 basis-0 w-fit"
            }`}
        >
            <label
                htmlFor={inputId}
                className="self-start mt-4 text-lg text-red-600"
            >
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={inputId}
                    className="px-5 py-6 mt-2.5 text-lg bg-orange-50 rounded-xl border-2 border-red-600 border-solid text-slate-700 max-md:max-w-full"
                    value={value}
                    readOnly={!isEdit}
                />
            ) : (
                <input
                    type="text"
                    id={inputId}
                    className="px-6 py-3 mt-2.5 text-2xl bg-orange-50 rounded-xl border-2 border-red-600 border-solid text-slate-700 max-md:px-5"
                    value={value}
                    readOnly ={!isEdit}
                />
            )}
        </div>
    );
};

export default FormInput;