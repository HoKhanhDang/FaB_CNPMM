// TitleDescription.tsx

import React from "react";

interface TitleDescriptionProps {
    title: string;
    description: string;
}

const TitleDescription: React.FC<TitleDescriptionProps> = ({ title, description }) => {
    return (
        <div className="p-4 border rounded shadow-md">
            <h1 className="text-xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default TitleDescription;
