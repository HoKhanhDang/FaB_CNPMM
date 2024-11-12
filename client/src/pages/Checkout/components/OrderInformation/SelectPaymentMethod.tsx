import SelectPaymentMethodItem from "./SelectPaymentMethodItem";

const PaymentMethodContants = [
    {
        image: "https://cdn-icons-png.flaticon.com/512/11078/11078490.png",
        text: "Credit Card",
        value: "creditCard",
    },
    {
        image: "https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png",
        text: "VNPay",
        value: "vnpay",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/512/5578/5578593.png",
        text: "COD ",
        value: "cod",
    },
];

interface PaymentMethodProps {
    selectedMethod: string;
    setSelectedMethod: (value: string) => void;
}
const PaymentMethod: React.FC<PaymentMethodProps> = ({
    selectedMethod,
    setSelectedMethod,
}) => {
    
    return (
        <div className="flex flex-col w-full h-auto border rounded-[10px] p-5 gap-2 my-5">
            {PaymentMethodContants.map((item, index) => (
                <SelectPaymentMethodItem
                    key={index}
                    image={item.image}
                    text={item.text}
                    value={item.value}
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                />
            ))}
        </div>
    );
};
export default PaymentMethod;
