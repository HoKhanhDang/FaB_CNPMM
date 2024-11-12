import FormatCurrency from "../../../../utils/common/FormatCurrency";

interface CheckoutTotalProps {
    items: any;
}
const CheckoutTotal: React.FC<CheckoutTotalProps> = ({ items }) => {
    return (
        <>
            <div className="w-full flex flex-col justify-start items-start gap-3 mt-5">
                <div className="w-full flex justify-between items-center">
                    <span className="text-[18px]">Subtotal</span>
                    <span className="text-[18px]">
                        {FormatCurrency(
                            items.reduce(
                                (acc: number, item: any) => acc + item.total,
                                0
                            )
                        )}
                    </span>
                </div>
                <div className="w-full h-0 border-t"></div>
                <div className="w-full flex justify-between items-center">
                    <span className="text-[18px]">Shipping</span>
                    <span className="text-[18px]">Free </span>
                </div>
                <div className="w-full h-0 border-t"></div>

                <div className="w-full flex justify-between items-center font-semibold text-[20px]">
                    <span>Total</span>
                    <span>
                        {FormatCurrency(
                            items.reduce(
                                (acc: number, item: any) => acc + item.total,
                                0
                            )
                        )}
                    </span>
                </div>
            </div>
        </>
    );
};
export default CheckoutTotal;
