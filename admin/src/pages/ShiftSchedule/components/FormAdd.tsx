import { useState } from "react";
import { IShift, IStaff } from "../../../types/schedule.interface";
import { getShift, addShift } from "../../../utils/Shift/shift.utils";
import { useQuery } from "@tanstack/react-query";
import { getAllStaff } from "../../../utils/Staff/getAllStaff";

interface FormAddProps {
    setOpenForm: (value: boolean) => void;
    shifts: IShift[];
    setShifts: (value: IShift[]) => void;
}
const FormAdd: React.FC<FormAddProps> = ({
    setOpenForm,
    shifts,
    setShifts,
}) => {
    const { data } = useQuery({
        queryKey: ["fetchStaff"],
        queryFn: getAllStaff,
    });

    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleScheduleShift = async () => {
        if (!selectedStaff || !date || !startTime || !endTime) {
            setError("Please fill out all fields.");
            return;
        }

        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);

        if (startDateTime >= endDateTime) {
            setError("End time must be after the start time.");
            return;
        }

        const staff = data.find((s: IStaff) => s.user_id === selectedStaff);
        if (!staff) return;

        const newShift: IShift = {
            _id: staff._id,
            staffId: staff.user_id,
            staffName: staff.fullName,
            start: startDateTime,
            end: endDateTime,
            title: `${staff.fullName} shift`,
        };
        const rs = await addShift(newShift);
        setShifts([...shifts, newShift]);
        clearForm();
        setOpenForm(false);
    };

    const clearForm = () => {
        setSelectedStaff(null);
        setDate("");
        setStartTime("");
        setEndTime("");
        setError(null);
    };
    return (
        <div
            onClick={() => setOpenForm(false)}
            className="fixed inset-0 z-40 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-baseline"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-1/4 h-auto flex flex-row shadow-2xl rounded-md p-5"
            >
                <div className="schedule-form ">
                    <h2>Schedule a New Shift</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleScheduleShift();
                        }}
                    >
                        <div>
                            <label>Staff Member</label>
                            <select
                                value={selectedStaff || ""}
                                onChange={(e) =>
                                    setSelectedStaff(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select Staff
                                </option>
                                {data?.map((staff: IStaff) => (
                                    <option
                                        key={staff.user_id}
                                        value={staff.user_id}
                                    >
                                        {staff.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <button type="submit">Schedule Shift</button>
                    </form>
                </div>
            </div>
            <div
                onClick={() => setOpenForm(false)}
                className="text-red-600 text-[50px] absolute top-5 right-10 hover:text-red-200"
            >
                X
            </div>
        </div>
    );
};
export default FormAdd;
