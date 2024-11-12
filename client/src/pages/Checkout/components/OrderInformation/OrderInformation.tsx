import { useSelector } from "react-redux";
import FormatCurrency from "../../../../utils/common/FormatCurrency";
import CheckoutTotal from "./CheckoutTotal";
import PaymentMethod from "./SelectPaymentMethod";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
    AddOrderItem,
    CreateOrder,
    CreateVNPayLink,
} from "../../../../utils/checkout/checkout.service";
import Loading from "../../../../components/loading/Loading";

interface OrderInformationProps {}
const OrderInformation: React.FC<OrderInformationProps> = ({}) => {
    const { id } = useSelector((state: any) => state.customerSlice);
    const { items } = useSelector((state: any) => state.cartSlice);
    const [selectedMethod, setSelectedMethod] = useState("creditCard");
    const [isLoading, setIsLoading] = useState(false);

    const validateInput = () => {
        const rs = document.getElementById("formCheckout") as HTMLFormElement;
        if (!rs.checkValidity()) {
            rs.reportValidity();
            return false;
        }
        const data = {
            address: document.getElementById(
                "addressCheckout"
            ) as HTMLInputElement,
        };
        if (data.address.value === "") {
            toast("Please fill the address information");
            return false;
        }
        return true;
    };

    const handlePlaceOrder = () => {
        if (!validateInput()) return;

        Swal.fire({
            title: "Confirm to place this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            confirmButtonColor: "#f87171",
            cancelButtonColor: "#4f46e5",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const note = document.getElementById(
                    "noteCheckout"
                ) as HTMLFormElement;
                const address = document.getElementById(
                    "addressCheckout"
                ) as HTMLInputElement;

                const data = {
                    user_id: id,
                    total_price: items.reduce(
                        (total: number, item: any) => total + item.total,
                        0
                    ),
                    address: address.value,
                    message: note.value,
                    payment_method: selectedMethod,
                    lng: window.localStorage.getItem("lng"),
                    lat: window.localStorage.getItem("lat"),
                };
                switch (selectedMethod) {
                    case "creditCard":
                        toast("This payment method is not available now");
                        return;
                    case "vnpay":
                        try {
                            const config = {
                                amount:
                                    items.reduce(
                                        (total: number, item: any) =>
                                            total + item.total,
                                        0
                                    ) * 24000,
                                bankCode: "NCB",
                                language: "en",
                            };
                            const rs = await CreateVNPayLink(config);
                            if (rs) {
                                window.localStorage.setItem(
                                    "order",
                                    JSON.stringify({
                                        order: data,
                                        items: items,
                                    })
                                );
                            }
                            window.location.href = rs.data.data;
                        } catch (e) {
                            toast("Error when place order");
                        }
                        return;
                    case "cod":
                        try {
                            setIsLoading(true);
                            const rs = await CreateOrder(data);
                            if (rs.status === 201) {
                                items.map(async (item: any) => {
                                    await AddOrderItem({
                                        order_id: rs?.data.result.order_id,
                                        item_id: item.id,
                                        quantity: item.quantity,
                                    });
                                });
                            }
                            window.localStorage.removeItem("persist:cart");
                            Swal.fire({
                                title: "Order successfully",
                                icon: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#f87171",
                            }).then(() => {
                                window.location.href = "/#/cart";                       
                            });
                        } catch (e) {
                            toast("Error when place order");
                        }
                        setIsLoading(false);

                        return;
                    default:
                        return;
                }
            }
        });
    };

    return (
        <div className=" max-sm:w-full sm:w-1/2 h-auto p-[30px] ">
            {isLoading && <Loading />}
            <div className="w-full h-full border rounded-[10px] p-5 bg-white">
                <span className="text-[25px] font-semibold">Orders</span>
                <div className="w-full h-full flex flex-col justify-start items-start gap-2">
                    {items?.map(
                        (product: {
                            id: string;
                            title: string;
                            price: number;
                            quantity: number;
                            total: number;
                            image: string;
                        }) => (
                            <div
                                key={product.id}
                                className="w-full h-full flex flex-row justify-start items-center gap-5 p-2 border rounded-[10px] max-sm:text-sm sm:text-base"
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-20 h-20 object-cover rounded-[10px] "
                                />
                                <div className="w-full max-sm:px-0 sm:px-5 flex flex-row justify-between items-start">
                                    <div className="flex flex-col justify-between items-start ">
                                        <span>{product.title}</span>
                                        <span>
                                            {FormatCurrency(product.price)}
                                        </span>
                                    </div>

                                    <span>X {product.quantity}</span>
                                    <span>
                                        Total: {FormatCurrency(product.total)}
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>

                <CheckoutTotal items={items} />
                <PaymentMethod
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                />

                <div
                    onClick={handlePlaceOrder}
                    className="w-full items-center flex justify-center bg-red-500 rounded-[10px] p-4 text-white hover:bg-red-300"
                >
                    Place Order
                </div>
            </div>
        </div>
    );
};
export default OrderInformation;
