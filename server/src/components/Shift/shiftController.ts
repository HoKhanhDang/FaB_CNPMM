import { Request, Response } from "express";
import { addShiftService, deleteShiftService, getShiftsService } from "./shift.service";
import convertDay from "../../utils/convertDay";

export const getShifts = async (req: Request, res: Response) => {
    try {
        const shifts = await getShiftsService();
        return res.status(200).json({
            message: "Successfully retrieved shifts",
            data: shifts
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const addShift = async (req: Request, res: Response) => {
    const { staffId, staffName, start, end, title } = req.body; // Sử dụng req.body thay vì req.query

    // Chuyển đổi ngày từ chuỗi sang đối tượng Date
    const newStart = convertDay(start as string);
    const newEnd = convertDay(end as string);

    try {
        const newShift = await addShiftService({
            staffId: staffId as string,
            staffName: staffName as string,
            start: newStart || start,  // Gửi trực tiếp kiểu Date
            end: newEnd || end,      // Gửi trực tiếp kiểu Date
            title: title as string
        });
        return res.status(201).json({
            message: "Successfully added shift",
            data: newShift
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const deleteShift = async (req: Request, res: Response) => {
    const { shift_id } = req.params; // Sử dụng req.params để lấy ID

    try {
        const result = await deleteShiftService(shift_id); // shift_id là chuỗi trong MongoDB
        return res.status(200).json({
            message: "Successfully deleted shift",
            data: result
        });
    } catch (error: any) {
        return res.status(500).json({
            error: error.message
        });
    }
};