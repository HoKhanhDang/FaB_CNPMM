import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaDeleteLeft } from "react-icons/fa6";

import { IShift } from "../../../types/schedule.interface";

const localizer = momentLocalizer(moment);

interface EventProps {
    shifts: IShift[];
    handleDeleteShift: (shiftId: string) => void;
}
const ShiftSchedulerCalendar: React.FC<EventProps> = ({
    shifts,
    handleDeleteShift,
}) => {
    const [selectedShift, setSelectedShift] = useState<string | null>(null);
    const handleSelectEvent = (event: any) => {
        setSelectedShift(event._id);
    };
  
    return (
        <div className="shift-scheduler p-5">
            <div className="flex flex-row justify-between items-center">
                <h1>Schedule Staff Shifts</h1>
                <div className="text-[40px] text-red-500 hover:text-red-300">
                    <FaDeleteLeft onClick={()=>handleDeleteShift(selectedShift as string)}/>
                </div>
            </div>
            <div
                className="calendar-container"
                style={{ height: "500px", marginTop: "20px" }}
            >
                <Calendar
                    localizer={localizer}
                    events={shifts as Event[]}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    defaultView="week"
                    style={{ height: 500 }}
                    views={["month", "week", "day"]}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </div>
    );
};
export default ShiftSchedulerCalendar;
