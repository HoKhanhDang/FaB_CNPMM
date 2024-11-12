import {getShiftsAPI, addShiftAPI} from '../../pages/ShiftSchedule/schedule.service'
export const getShift = async () => {
    const res = await getShiftsAPI();
  
    return res?.data;
}

export const addShift = async (data: any) => {
    const res = await addShiftAPI(data);
    return res?.data;
}