//components
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShiftSchedulerCalendar from "./components/ShiftSchedulerCalendar";
import { IShift } from "../../types/schedule.interface";
import "./css/calendar.css";
import FormAdd from "./components/FormAdd";

import { getShift } from "../../utils/Shift/shift.utils";
import { deleteShiftAPI } from "./schedule.service";
import { toast } from "react-toastify";

export default function Schedule() {
    const [shifts, setShifts] = useState<IShift[]>([]);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [list, setList] = useState<IShift[]>([]);

    const fetchShifts = async () => {
        const rs = await getShift();
        const rs2 = rs?.data.map((item: any) => {
            return {
                _id: item._id,
                staffId: item.staffId,
                staffName: item.staffName,
                start: new Date(item.start),
                end: new Date(item.end),
                title: item.title,
            };
        });
        setList(rs2);
    };
    useEffect(() => {
        fetchShifts();
    }, [shifts]);

    const handleDeleteShift = async (shiftId: string) => {
        const response = await deleteShiftAPI(shiftId);
        if (response.status === 200) {
            fetchShifts();
            toast("Delete shift successfully", { type: "success" });
        } else {
            console.error("Failed to delete shift");
        }
    };

    return (
        <>
            {/* content */}
            {isOpenForm && (
                <FormAdd
                    setOpenForm={setIsOpenForm}
                    shifts={shifts}
                    setShifts={setShifts}
                />
            )}
            <div
                onClick={() => setIsOpenForm(true)}
                className=" cursor-pointer fixed flex items-center justify-center top-5 right-5 w-[200px] h-[50px] bg-sidebar rounded-xl hover:bg-blue-700 bg"
            >
                <span className="text-white">Add new schedule</span>
            </div>
            <div className="w-full h-full bg-main-bg col-span-5 row-span-12 flex items-center justify-center p-5">
                <ShiftSchedulerCalendar
                    handleDeleteShift={handleDeleteShift}
                    shifts={list}
                />
            </div>
        </>
    );
}
