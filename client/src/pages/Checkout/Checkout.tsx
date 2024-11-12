import CheckoutInformation from "./components/CheckoutInformation";
import OrderInformation from "./components/OrderInformation/OrderInformation";

interface CheckoutProps {}
const Checkout: React.FC<CheckoutProps> = ({}) => {
    return (
        <div className="w-screen h-auto flex flex-col items-center justify-center pt-[150px] max-sm:px-0 sm:px-[50px] bg-main ">
            <h1 className="text-[40px] font-semibold text-slate-700">
                Checkout
            </h1>
            <div className="w-full h-full flex max-sm:flex-col sm:flex-row justify-evenly items-start">
                <CheckoutInformation />
                <OrderInformation />
            </div>
        </div>
    );
};
export default Checkout;
