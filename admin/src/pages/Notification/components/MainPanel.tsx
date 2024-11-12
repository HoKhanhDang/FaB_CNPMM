import { useDispatch, useSelector } from "react-redux";
import ListNotification from "./ListNotifications";
import { useState } from "react";
import INotification from "../../../types/notification.interface";
import FilterNotification from "./FilterNotification";
interface MainPanelProps {}

const MainPanel: React.FC<MainPanelProps> = ({}) => {
    const { notifications } = useSelector(
        (state: any) => state.notificationSlice
    );

    const [filter, setFilter] = useState("");

    const filteredList = notifications
        ?.filter((item: any) => {
            return (
                item.isRead ===
                (filter === "0" ? 0 : filter === "1" ? 1 : item.isRead)
            );
        })
        ?.sort((a: any, b: any) => {
            if (filter === "newest") {
                return new Date(b.time).getTime() - new Date(a.time).getTime(); // Newest first
            } else if (filter === "latest") {
                return new Date(a.time).getTime() - new Date(b.time).getTime(); // Latest first
            }
            return 0;
        })
        .reverse();

    return (
        <div className="w-full h-full rounded-[20px] bg-white flex flex-col gap-5 p-5">
            <div className="flex flex-row w-full h-[10%] justify-between items-center px-5">
                <span className="text-[25px] font-semibold">
                    All Notifications
                </span>
                <FilterNotification
                    filterValue={filter}
                    setFilter={setFilter}
                />
                {/* <button className="ml-auto bg-blue-500 text-white rounded-md p-2">Only show unread</button>                */}
            </div>
            <ListNotification notifications={filteredList} />
        </div>
    );
};

export default MainPanel;
