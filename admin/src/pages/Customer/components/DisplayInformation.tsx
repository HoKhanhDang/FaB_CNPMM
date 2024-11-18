import { useEffect, useState } from "react";
import { getCustomerByIdAPI, getOrderByCustomerIdAPI } from "../customer.service";
import { FaEye } from "react-icons/fa";

interface DisplayInformationProps {
    setIsOpenFormInformation: (value: boolean) => void;
    user_id: string;
}

const DisplayInformation: React.FC<DisplayInformationProps> = ({
    setIsOpenFormInformation,
    user_id,
}) => {
    // const [listOrders, setListOrders] = useState<any[]>([]);
    const [customerInfo, setCustomerInfo] = useState<any>({});
    const [customerOrders, setCustomerOrders] = useState<any[]>([]);
    const fetchData = async () => {
        const res = await getCustomerByIdAPI(user_id);
        setCustomerInfo(res?.data?.data);
        const resOrder = await getOrderByCustomerIdAPI(user_id);
        setCustomerOrders(resOrder?.data?.result);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div
            onClick={() => {
                setIsOpenFormInformation(false);
            }}
            className="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-60 p-[50px]  flex justify-center items-center z-40"
        >
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className="fixed z-50 top-5 right-5 flex justify-center items-center w-[50px] h-[50px]"
            >
                <button
                    onClick={() => setIsOpenFormInformation(false)}
                    className="text-[50px] w-[50px] h-[50px] text-red-500 hover:text-red-200 flex justify-center items-center"
                >
                    x
                </button>
            </div>
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className="opacity-100 flex flex-row justify-center items-center w-full h-full p-5 rounded-lg z-50 gap-5"
            >
                <div className="w-1/2 h-full text-[25px] bg-white rounded-2xl p-5 shadow-lg flex flex-col gap-[20px]">
                    <span className="text-[30px] self-center">
                        Customer Information
                    </span>
                    <div className="flex flex-col justify-start items-start border p-5 rounded-xl">
                    {customerInfo && (
                        <>
                            <p className="mb-2">
                                <strong>Full Name:</strong> {customerInfo?.fullName || <span className="text-gray-400 italic">No info</span>}
                            </p>
                            <p className="mb-2">
                                <strong>Age:</strong> {customerInfo?.age || <span className="text-gray-400 italic">No info</span>}
                            </p>
                            <p className="mb-2">
                                <strong>About:</strong> {customerInfo?.about || <span className="text-gray-400 italic">No info</span>}
                            </p>
                            <p className="mb-2">
                                <strong>Phone:</strong> {customerInfo?.phone || <span className="text-gray-400 italic">No info</span>}
                            </p>
                            <p className="mb-2">
                                <strong>Address:</strong> {customerInfo?.address || <span className="text-gray-400 italic">No info</span>}
                            </p>
                        </>
                    )}
                    </div>
                    <div className="flex flex-col justify-start items-start border p-5 rounded-xl">
                        <div className="mb-2  text-white bg-blue-500 rounded-[20px] p-2 w-full flex justify-center items-center">
                            <span className="text-[20px]">Total Orders: </span>{" "}
                            {Object.keys(customerOrders).length}
                        </div>
                        <div className="mb-2  text-white bg-red-500 rounded-[20px] p-5 w-full flex justify-center items-center">
                            <strong>Total Revenue : </strong> {'$' + customerOrders.reduce((total, order) => total + order.total_price, 0)}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full bg-white rounded-2xl shadow-lg flex flex-col">
                    <span className=" self-center text-[30px] h-[10%]">
                        Last orders
                    </span>
                    <div className="w-full h-[90%] overflow-y-auto bg-white rounded-2xl shadow-lg">
                    {/* <pre>{JSON.stringify(customerOrders, null, 2)}</pre> */}
                        {customerOrders.map((order, index) => (
                            <div
                                key={index}
                                className="w-full h-[100px] flex justify-between items-center border-b border-gray-300 p-5"
                            >
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-lg font-bold text-black opacity-50 py-2">
                                        {'#' + index + 1}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {`at ${new Date(order.create_at).toLocaleString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false // Sử dụng định dạng 24 giờ
                                        })}, ${new Date(order.create_at).toLocaleDateString('en-US')}`}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-bold text-black opacity-50 py-2">
                                        ${order.total_price}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {order.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayInformation;