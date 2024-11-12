import {GetTotalData} from "../../pages/Dashboard/chart.service";
export const GetChartData = async () => {
    const rs = await GetTotalData();
    return {
        current: rs?.data.currentMonth,
        last: rs?.data.lastMonth
    };
}