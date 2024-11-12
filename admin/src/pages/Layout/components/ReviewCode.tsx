import React from "react";
import JSXParser from "react-jsx-parser";

interface ReviewDisplayProps {
    generatedCode: string;
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ generatedCode }) => {
    return (
        <>
            <div className="w-full bg-white p-5 my-5 ">
                {generatedCode ? (
                    <JSXParser
                        jsx={generatedCode}
                        bindings={{}}
                        components={{}}
                        renderInWrapper={false}
                    />
                ) : (
                    <p>No code generated yet.</p>
                )}
            </div>
        </>
    );
};

export default ReviewDisplay;
