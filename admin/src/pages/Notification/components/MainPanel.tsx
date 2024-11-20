import { useDispatch, useSelector } from "react-redux";
import ListNotification from "./ListNotifications";
import { useEffect, useState } from "react";
import FilterNotification from "./FilterNotification";
import SocketSingleton from "../../../socket";
import { fetchNotifications } from "../../../redux/api/notification";
import INotification from "../../../types/notification.interface";
interface MainPanelProps {}

const MainPanel: React.FC<MainPanelProps> = ({}) => {
    const dispatch = useDispatch();
    const { notifications } = useSelector(
        (state: any) => state.notificationSlice
    );
    const socket = SocketSingleton.getInstance();

    const [filter, setFilter] = useState("all");

    const filteredList = notifications
        .filter((item: {
            isRead:boolean
        }) => {
            console.log("item", item);
            return (
                filter === "all" ||
                (filter === "0" && !item.isRead) ||
                (filter === "1" && item.isRead)
                             
            );
        })
        ?.sort((a: INotification, b: INotification) => {
            if (a.time && b.time && a.time > b.time) {
                return 1;
            }
            return 0;
        })
        .reverse();
        
    useEffect(() => {
        socket.on("get-notification", () => {
            dispatch<any>(fetchNotifications());
        });
        return () => {
            socket.off("notification");
        };
    }, []);

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
