import { Shift, IShift } from "./shift.model"; // Nhập model Shift từ shiftModel

export const getShiftsService = async (): Promise<IShift[]> => {
    try {
        const shifts = await Shift.find(); // Lấy tất cả các ca làm việc
        return shifts;
    } catch (err) {
        throw new Error(`Error fetching shifts: ${err}`);
    }
};

export const addShiftService = async (params: {
    staffId: string;
    staffName: string;
    start: Date; // Giữ nguyên kiểu Date
    end: Date; // Giữ nguyên kiểu Date
    title: string;
}): Promise<IShift> => {
    // Tạo một đối tượng Shift mới
    try {
        const newShift = new Shift(params);
        const savedShift = await newShift.save(); // Lưu ca làm việc vào cơ sở dữ liệu
        return savedShift; // Trả về ca làm việc đã lưu
    } catch (err) {
        throw new Error(`Error adding shift: ${err}`);
    }
};

export const deleteShiftService = async (shiftID: string) => {
    try {
        const result = await Shift.findByIdAndDelete(shiftID); // Xóa ca làm việc theo ID
        return { affectedRows: result }; // Trả về số dòng bị ảnh hưởng
    } catch (err) {
        throw new Error(`Error deleting shift: ${err}`);
    }
};
