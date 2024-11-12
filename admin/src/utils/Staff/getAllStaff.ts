import {getAllStaffAPI} from "../../pages/Staff/staff.service";
export async function getAllStaff() {
    const res = await getAllStaffAPI();
    return res?.data.data;
}