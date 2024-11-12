//components
import SideBar from "../../components/commons/Sidebar";
import MainPanel from "./components/MainPanel";

export default function Notification() {
    return (
        <div className="w-full h-full bg-main-bg col-span-5 row-span-12 p-[30px]">
            <MainPanel />
        </div>
    );
}
