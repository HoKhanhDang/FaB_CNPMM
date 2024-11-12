import INotification from "../../../types/notification.interface";
import { GetTime } from "../../../helper/GetTimeOnDate.helper";
import { icons } from "../../../constant/notification.constant";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../../redux/api/notification";
import { setIsRead } from "../../../redux/slice/notification.slice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { changeIsReadAPI } from "../notification.service";

interface ListNotificationProps {
    notifications: INotification[];
}
const ListNotification: React.FC<ListNotificationProps> = ({notifications}) => {
    const dispatch: any = useDispatch();

    const handleIsRead = (nof_id: number) => {
        Swal.fire({
            title: "Confirm you have read this notification",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, mark it as read!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeIsReadAPI(nof_id);
                if (rs.status === 200) {
                    dispatch(setIsRead(nof_id));
                }
            }
        });
    };
    
    useEffect(() => {
        dispatch(fetchNotifications());
    }, []);

    return (

        
        <div className=" overflow-y-auto w-full h-full flex flex-col justify-start items-start">
            {notifications?.map((item: INotification, index: number) => {
                return (
                    <div
                        key={index}
                        className={`w-full h-auto flex flex-row justify-start items-center gap-5 border-b p-2 hover:bg-blue-200 rounded-md ${
                            item.isRead === 1 ? "opacity-60" : ""
                        }`}
                    >
                        <div
                            className={`w-[10%] flex justify-center items-center text-[40px] `}
                        >
                            {item.type === "new" && (
                                <span className="text-blue-400">
                                    {icons["new"]}
                                </span>
                            )}
                            {(item.type === "failed" ||
                                item.type === "ingredient") && (
                                <span className="text-red-400">
                                    {icons["failed"]}
                                </span>
                            )}
                            {(item.type === "done" ||
                                item.type === "repaired") && (
                                <span className="text-green-400">
                                    {icons["done"]}
                                </span>
                            )}
                        </div>
                        <div className="w-[50%] flex flex-col justify-start">
                            <span className="text-[18px] font-medium">
                                {item.title}
                            </span>
                            <span className="text-[14px]">{item.content}</span>
                        </div>
                        <div className="w-[20%] flex flex-col justify-start items-end">
                            <span className="text-[12px]">
                                {GetTime(item.time as string)}
                            </span>
                        </div>
                        <div className="w-[20%] flex flex-col justify-start items-end">
                            <div
                                onClick={() =>
                                    handleIsRead(item.nof_id as number)
                                }
                                className="text-[12px] hover:text-red-400 cursor-pointer"
                            >
                                Mark as Read
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListNotification;
