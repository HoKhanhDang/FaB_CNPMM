interface TextFieldProps {
    title: string;
    value: string;
}
const TextField: React.FC<TextFieldProps> = ({ title, value }) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <span className="text-sm font-medium">{title}</span>
            <span>{value}</span>
        </div>
    );
};
export default TextField;
