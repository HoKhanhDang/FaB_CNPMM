import { FaTrash } from "react-icons/fa6";
import { INotification } from "../../types/INotification";
import { FormatTimeStamps } from "../../utils/common/FormatDay";
import {
    changeIsReadAPI,
    deleteAllNotificationByUserIDAPI,
} from "../../utils/notification/notification.service";
import { useSelector } from "react-redux";
interface NotificationProps {
    setIsShowNotification: (value: boolean) => void;
    listNotification: INotification[];
    fetchNotifications?: () => void;
}
const Notification: React.FC<NotificationProps> = ({
    setIsShowNotification,
    listNotification,
    fetchNotifications,
}) => {
    const { id } = useSelector((state: any) => state.customerSlice);
    const handleChangeStatus = async (nof_id: string) => {
        await changeIsReadAPI(nof_id);
        fetchNotifications && fetchNotifications();
    };
    const handleDeleteAll = async () => {
        await deleteAllNotificationByUserIDAPI(id);
        console.log("delete all");
        fetchNotifications && fetchNotifications();
    };

    return (
        <>
            <div
                onClick={() => setIsShowNotification(false)}
                className="w-screen h-screen fixed"
            ></div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="max-sm:fixed sm:absolute max-sm:left-0  max-sm:bottom-[-50px] sm:top-[50px] max-sm:w-screen sm:w-[400px] h-auto max-h-[70vh] overflow-scroll scrollbar-hidden  bg-white rounded-md z-50 p-5"
            >
                <div className="flex items-center justify-between p-2 border-b">
                    <p className="text-md font-bold">Notifications</p>
                    <button
                        onClick={() => handleDeleteAll()}
                        className="text-sm font-semibold flex flex-row items-center gap-2 hover:text-red-300"
                    >
                        <FaTrash className="text-red-500" /> Clear all
                    </button>
                </div>
                {listNotification.map((item: INotification, index: number) => (
                    <div
                        onClick={() => handleChangeStatus(item.nof_id)}
                        key={index}
                        className={`flex items-center justify-between p-2 border-b hover:bg-orange-100/20 ${
                            item.isRead ? "opacity-50" : ""
                        }`}
                    >
                        <div className="flex flex-col w-full cursor-pointer">
                            <div className="w-full flex flex-row justify-between items-center">
                                <span className="text-sm font-semibold">
                                    Your {item.title}
                                </span>
                                <span className="text-xs font-light ">
                                    {FormatTimeStamps(item.time)}
                                </span>
                            </div>

                            <span className="text-xs text-gray-500 py-1">
                                {item.content}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default Notification;
