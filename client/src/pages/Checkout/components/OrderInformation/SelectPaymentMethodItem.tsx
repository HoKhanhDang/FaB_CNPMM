interface SelectPaymentMethodProps {
    image: string;
    text: string;
    value: string;
    selectedMethod: string;
    setSelectedMethod: (value: string) => void;
}

const SelectPaymentMethodItem: React.FC<SelectPaymentMethodProps> = ({
    image,
    text,
    value,
    selectedMethod,
    setSelectedMethod,
}) => {
    return (
        <div
            onClick={() => setSelectedMethod(value)}
            className="flex flex-row items-center justify-start text-[20px] p-2 w-full gap-5 hover:bg-blue-100 rounded-[10px] cursor-pointer"
        >
            <input
                type="radio"
                value={value}
                checked={selectedMethod === value}
                onChange={() => setSelectedMethod(value)}
                className="p-2 w-[20px] h-[20px]"
            />
            <img
                src={image}
                alt={text}
                className="w-8 h-8 ml-2 bg-blue-100 p-1 rounded-[10px] "
            />
            <span className="ml-2 text-[15px]">{text}</span>
        </div>
    );
};

export default SelectPaymentMethodItem;