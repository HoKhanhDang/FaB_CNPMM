import TextFieldComponent from "../../../components/commons/TextField";
import StepperComponents from "./Stepper";
import { fetchInformationOrder } from "../../../utils/Order/order.utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import FormatDay from "../../../helper/FormatDay.helper";
import FormatCurrency from "../../../helper/FormatCurrency.helper";
import MapboxComponent from "../../../components/Map/Map";
import SocketSingleton from "../../../socket";
import { getShipperById } from "../../Shipper/shipper.service";
import { Shipper } from "../../../types/shipper.interface";

interface OrderDetailProps {
    setIsShowDetail: (value: boolean) => void;
    orderID: string;
    userID: string;
    status?: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
    setIsShowDetail,
    orderID,
    userID,
    status,
}) => {
    const socket = SocketSingleton.getInstance();
    
    const { data, isLoading } = useQuery({
        queryKey: ["fetchOrderInformation", orderID, userID],
        queryFn: () =>
            fetchInformationOrder(orderID , userID),
        enabled: !!orderID && !!userID,
    });

    const [shipperId, setShipperId] = useState<number | undefined>();
    const [shipperLocation, setShipperLocation] = useState<[number, number]>();
    const [shipper, setShipper] = useState<Shipper | null>(null);
    
    const fetchShipper = useMemo(
        () => async () => {
            if (data?.order.shipper_id) {
                const rs = await getShipperById(data.order.shipper_id);
                if (rs?.data?.rs?.data[0]) {
                    const shipperData = rs.data.rs.data[0];
                    setShipperId(shipperData.user_id);
                    setShipper(shipperData);
                }
            }
        },
        [data]
    );

    useEffect(() => {
        if (data) {
            fetchShipper();
        }
    }, [data, fetchShipper]);

    useEffect(() => {
        if (!shipperId) return;

        socket.on("Shipper-Position-Get", (dataSocket) => {
            if (dataSocket.id === shipperId) {
                setShipperLocation([
                    dataSocket.shipperLocation.lng,
                    dataSocket.shipperLocation.lat,
                ]);
            }
        });

        return () => {
            socket.off("Shipper-Position-Get");
        };
    }, [shipperId, socket]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div
            onClick={() => setIsShowDetail(false)}
            className="fixed inset-0 z-40 bg-opacity-65 bg-gray-200 w-screen h-screen p-[100px] flex justify-center items-center gap-5"
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`bg-white z-50 ${
                    status === "Delivering" ? "w-[50%]" : "w-[100%]"
                } h-auto flex flex-col shadow-2xl rounded-md p-5 gap-5`}
            >
                {/* Customer Information */}
                <div className="w-full h-full flex flex-row justify-center items-center gap-5 ">
                    <div className="w-1/2 h-full flex flex-col p-[20px] hover:bg-blue-50 border">
                        <h2 className="text-[18px] font-bold text-center pb-3">
                            Customer Information
                        </h2>
                        <div className="w-full flex flex-col">
                            <TextFieldComponent
                                label="Full name:"
                                value={data?.customer.fullName || ""}
                            />
                            <TextFieldComponent
                                label="Phone Number:"
                                value={data?.customer.phone || ""}
                            />
                            <TextFieldComponent
                                label="Address:"
                                value={data?.customer.address || "No address"}
                            />
                            <TextFieldComponent
                                label="Email:"
                                value={data?.customer.email || ""}
                            />
                            <TextFieldComponent
                                label="Age:"
                                value={data?.customer.age?.toString() || ""}
                            />
                        </div>
                    </div>

                    {/* Order Information */}
                    <div className="w-1/2 h-full flex flex-col p-[20px] hover:bg-blue-50 border">
                        <h2 className="text-[18px] font-bold text-center pb-3">
                            Order Information
                        </h2>
                        <div className="w-full flex flex-col">
                            <TextFieldComponent
                                label="Id Order:"
                                value={data?.order.order_id.toString() || ""}
                            />
                            <TextFieldComponent
                                label="Total:"
                                value={
                                    FormatCurrency(data?.order.total_price) ||
                                    ""
                                }
                            />
                            <TextFieldComponent
                                label="Created at:"
                                value={FormatDay(data?.order.create_at) || ""}
                            />
                            <TextFieldComponent
                                label="Updated at:"
                                value={
                                    FormatDay(data?.order.delivery_time) || ""
                                }
                            />
                            <TextFieldComponent
                                label="Payment method:"
                                value={data?.order.payment_method || ""}
                            />
                        </div>
                    </div>
                </div>
                {/* Order Items and Note */}
                <div className="w-full h-[200px] flex flex-row justify-between items-center gap-5 border py-2">
                    <div className="w-[70%] h-full overflow-y-auto flex flex-col items-center gap-1 px-5">
                        {data?.orderItems?.map((item, index) => (
                            <div
                                className="flex flex-row w-full py-1 items-center gap-5"
                                key={index}
                            >
                                <img
                                    className="w-[50px] h-[50px] rounded-md"
                                    src={item.image}
                                    alt=""
                                />
                                <span className="w-[30%] text-[18px] font-medium">
                                    {item.title}
                                </span>
                                <span className="text-[15px]">
                                    {FormatCurrency(item.price)}
                                </span>
                                <span className="text-[15px]">
                                    X {item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-[30%] h-full flex flex-col gap-2">
                        <h3 className="text-[18px] font-bold pb-3">Note:</h3>
                        <p className="w-full h-[90%] p-2 border">
                            {data?.order.message || "No message"}
                        </p>
                    </div>
                </div>

                <div className="w-full bg-gray-50">
                    <StepperComponents status={data?.order.status} />
                </div>
            </div>

            {status === "Delivering" && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white z-50 w-[50%] h-full flex flex-col shadow-2xl rounded-md p-5 gap-5"
                >
                    <div className="w-full h-1/2 flex flex-col border">
                        {shipperLocation &&
                            shipperLocation[0] !== 0 &&
                            shipperLocation[1] !== 0 && (
                                <MapboxComponent
                                    start={shipperLocation}
                                    end={[data?.order.lng, data?.order.lat]}
                                />
                            )}
                    </div>

                    <div className="w-full h-1/2 flex flex-col p-5">
                        <h2 className="text-[18px] font-bold text-center pb-3">
                            Shipper Information
                        </h2>
                        <TextFieldComponent
                            label="Full name:"
                            value={shipper?.fullName || ""}
                        />
                        <TextFieldComponent
                            label="Phone Number:"
                            value={shipper?.phone || ""}
                        />
                        <TextFieldComponent
                            label="Email:"
                            value={shipper?.email || ""}
                        />
                    </div>
                </div>
            )}

            <div
                onClick={() => setIsShowDetail(false)}
                className="text-red-600 cursor-pointer text-[50px] absolute top-5 right-10 hover:text-red-200"
            >
                X
            </div>
        </div>
    );
};

export default OrderDetail;
