interface ButtonProps {
    text: string;
    onClick: () => void;
    additionClass?: string;
    icons?:any
}

const Button: React.FC<ButtonProps> = ({ text, onClick,additionClass ,icons}) => {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex flex-row justify-center items-center gap-2 ${additionClass}`}
        >
            {text} {icons}
        </button>
    );
}

export default Button;
