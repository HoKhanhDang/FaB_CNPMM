interface TextProps {
    text: string;
    classNameValue: string;
}
const TextColumn: React.FC<TextProps> = ({
    text,
    classNameValue,
}) => {
    return (
        <div className={`flex ${classNameValue}`}>
            <p className="text-sm font-semibold">{text}</p>
        </div>
    );
};

export default TextColumn;
