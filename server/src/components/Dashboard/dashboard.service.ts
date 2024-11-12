// Import Mongoose models
import mongoose from "mongoose";
import dayjs from "dayjs"; // For date manipulation, if needed
import { Order } from "../Order/order.model";
import User from "../User/user.model";
import View from "./view.model";

type TotalOrderResult = { total_order: number };
type TotalProfitResult = { profit: number };
type TotalUserResult = { total_user: number };
type TotalViewResult = { total_view: number };

// 1. Total Views Last Month
export const GetTotalViewLastMonthService =
    async (): Promise<TotalViewResult> => {
        const oneMonthAgo = dayjs()
            .subtract(1, "month")
            .startOf("day")
            .toDate();
        const now = new Date();

        const result = await View.countDocuments({
            create_at: { $gte: oneMonthAgo, $lt: now },
        });

        return { total_view: result };
    };

// 2. Total Views Current Month
export const GetTotalViewCurrentMonthService =
    async (): Promise<TotalViewResult> => {
        const startOfMonth = dayjs().startOf("month").toDate();
        const now = new Date();

        const result = await View.countDocuments({
            create_at: { $gte: startOfMonth, $lt: now },
        });

        return { total_view: result };
    };

// 3. Total Orders Last Month
export const GetTotalOrderLastMonthService =
    async (): Promise<TotalOrderResult> => {
        const oneMonthAgo = dayjs()
            .subtract(1, "month")
            .startOf("day")
            .toDate();
        const now = new Date();

        const result = await Order.countDocuments({
            create_at: { $gte: oneMonthAgo, $lt: now },
        });

        return { total_order: result };
    };

// 4. Total Users Last Month
export const GetTotalUserLastMonthService =
    async (): Promise<TotalUserResult> => {
        const oneMonthAgo = dayjs()
            .subtract(1, "month")
            .startOf("day")
            .toDate();
        const now = new Date();

        const result = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo, $lt: now },
        });

        return { total_user: result };
    };

// 5. Total Profit Last Month
export const GetTotalProfitLastMonthService =
    async (): Promise<TotalProfitResult> => {
        const oneMonthAgo = dayjs()
            .subtract(1, "month")
            .startOf("day")
            .toDate();
        const now = new Date();

        const result = await Order.aggregate([
            {
                $match: {
                    status: "Successfully",
                    create_at: { $gte: oneMonthAgo, $lt: now },
                },
            },
            { $group: { _id: null, profit: { $sum: "$total_price" } } },
        ]);

        return { profit: result[0]?.profit || 0 };
    };

// 6. Total Orders Current Month
export const GetTotalOrderCurrentMonthService =
    async (): Promise<TotalOrderResult> => {
        const startOfMonth = dayjs().startOf("month").toDate();
        const now = new Date();

        const result = await Order.countDocuments({
            create_at: { $gte: startOfMonth, $lt: now },
        });

        return { total_order: result };
    };

// 7. Total Users Current Month
export const GetTotalUserCurrentMonthService =
    async (): Promise<TotalUserResult> => {
        const startOfMonth = dayjs().startOf("month").toDate();
        const now = new Date();

        const result = await User.countDocuments({
            createdAt: { $gte: startOfMonth, $lt: now },
        });

        return { total_user: result };
    };

// 8. Total Profit Current Month
export const GetTotalProfitCurrentMonthService =
    async (): Promise<TotalProfitResult> => {
        const startOfMonth = dayjs().startOf("month").toDate();
        const now = new Date();

        const result = await Order.aggregate([
            {
                $match: {
                    status: "Successfully",
                    create_at: { $gte: startOfMonth, $lt: now },
                },
            },
            { $group: { _id: null, profit: { $sum: "$total_price" } } },
        ]);

        return { profit: result[0]?.profit || 0 };
    };
