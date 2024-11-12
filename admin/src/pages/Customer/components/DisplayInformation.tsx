import { useEffect, useState } from "react";
import { getCustomerByIdAPI } from "../customer.service";
import { FaEye } from "react-icons/fa";
const listOrders = [
    {
        id: 1,
        name: "Order 1",
        date: "2021-10-10",
        total: 100,
        status: "Delivered",
    },
    {
        id: 2,
        name: "Order 2",
        date: "2021-10-11",
        total: 200,
        status: "Delivered",
    },
    {
        id: 3,
        name: "Order 3",
        date: "2021-10-12",
        total: 300,
        status: "Delivered",
    },
    {
        id: 4,
        name: "Order 4",
        date: "2021-10-13",
        total: 400,
        status: "Delivered",
    },
    {
        id: 5,
        name: "Order 5",
        date: "2021-10-14",
        total: 500,
        status: "Delivered",
    },
    {
        id: 6,
        name: "Order 6",
        date: "2021-10-15",
        total: 600,
        status: "Delivered",
    },
    {
        id: 7,
        name: "Order 7",
        date: "2021-10-16",
        total: 700,
        status: "Delivered",
    },
];

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
    const fetchData = async () => {

        const res = await getCustomerByIdAPI(user_id);
        setCustomerInfo(res?.data?.data[0]);
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
                        <p className="mb-2">
                            <strong>Full Name:</strong> {customerInfo?.fullName}
                        </p>
                        <p className="mb-2">
                            <strong>Age:</strong> {customerInfo?.age}
                        </p>
                        <p className="mb-2">
                            <strong>About:</strong> {customerInfo?.about}
                        </p>
                        <p className="mb-2">
                            <strong>Phone:</strong> {customerInfo?.phone}
                        </p>
                        <p className="mb-2">
                            <strong>Address:</strong> {customerInfo?.address}
                        </p>
                    </div>
                    <div className="flex flex-col justify-start items-start border p-5 rounded-xl">
                        <div className="mb-2  text-white bg-blue-500 rounded-[20px] p-2 w-full flex justify-center items-center">
                            <span className="text-[20px]">Total Orders: </span>{" "}
                            15
                        </div>
                        <div className="mb-2  text-white bg-red-500 rounded-[20px] p-5 w-full flex justify-center items-center">
                            <strong>Total Revenue : </strong> $10,000
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full bg-white rounded-2xl shadow-lg flex flex-col">
                    <span className=" self-center text-[30px] h-[10%]">
                        Last orders
                    </span>
                    <div className="w-full h-[90%] overflow-y-auto bg-white rounded-2xl shadow-lg">
                        {listOrders.map((order, index) => (
                            <div
                                key={index}
                                className="w-full h-[100px] flex justify-between items-center border-b border-gray-300 p-5"
                            >
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-lg font-bold text-black opacity-50 py-2">
                                        {order.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {order.date}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg font-bold text-black opacity-50 py-2">
                                        ${order.total}
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
