import { Request, Response } from "express";
import View from "./view.model";
import {
    GetTotalOrderCurrentMonthService,
    GetTotalProfitCurrentMonthService,
    GetTotalUserCurrentMonthService,
    GetTotalViewCurrentMonthService,
    GetTotalOrderLastMonthService,
    GetTotalProfitLastMonthService,
    GetTotalUserLastMonthService,
    GetTotalViewLastMonthService,
} from "./dashboard.service";

export const GetTotalAllAPI = async (req: Request, res: Response) => {
    try {
        const result1 = await GetTotalOrderCurrentMonthService();
        const result2 = await GetTotalProfitCurrentMonthService();
        const result3 = await GetTotalUserCurrentMonthService();
        const result4 = await GetTotalViewCurrentMonthService();
        const result5 = await GetTotalOrderLastMonthService();
        const result6 = await GetTotalProfitLastMonthService();
        const result7 = await GetTotalUserLastMonthService();
        const result8 = await GetTotalViewLastMonthService();
        // Return a structured JSON response
        return res.status(200).json({
            message: "Total fetched successfully",
            currentMonth: {
                total_order: result1?.total_order || 0,
                total_profit: result2?.profit || 0,
                total_user: result3?.total_user || 0,
                total_view: result4?.total_view || 0,
            },
            lastMonth: {
                total_order: result5?.total_order || 0,
                total_profit: result6?.profit || 0,
                total_user: result7?.total_user || 0,
                total_view: result8?.total_view || 0,
            },
        });
    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Done
export const IncreaseViewAPI = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const create_at = new Date(); // Tạo thời gian hiện tại

        // Tạo và lưu một view mới
        const newView = new View({
            create_at, // Không cần truyền `create_at` nếu đã có giá trị mặc định trong schema
        });

        // Lưu view vào MongoDB
        await newView.save();

        return res.status(200).json({
            message: "View updated successfully",
            result: newView, // Trả về đối tượng view đã tạo
        });
    } catch (err) {
        console.error("Error increasing view:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
