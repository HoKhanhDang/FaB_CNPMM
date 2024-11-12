interface QuantityControlProps {
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    quantity: number;
}
const QuantityControl: React.FC<QuantityControlProps> = ({
    setQuantity,
    quantity,
}) => {
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="flex justify-start items-center col-span-1">
            <button
                className="px-3 py-1 text-black text-[20px] rounded-lg"
                aria-label="Decrease quantity"
                onClick={handleDecrease}
            >
                -
            </button>
            <input
                type="text"
                className="w-[40px] text-center"
                value={quantity}
                readOnly
            />
            <button
                className="px-3 py-1  text-black text-[20px] rounded-lg"
                aria-label="Increase quantity"
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    );
};

export default QuantityControl;
