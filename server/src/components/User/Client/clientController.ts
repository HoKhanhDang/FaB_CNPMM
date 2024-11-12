import { Request, Response } from "express";

import CustomerService from "./client.service";

const GetShipper = async (req: Request, res: Response) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ message: "user_id is required!" });
    }

    try {
        const result = await CustomerService.GetShipperService({
            user_id: user_id as string,
        });
        return res.status(200).json({
            status: 200,
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetUserById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).json({ message: "ID is required!" });
    }

    try {
        const result = await CustomerService.GetUserByIdService({
            user_id: user_id,
        });
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
const updateStatus = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { status } = req.body;
    if (!user_id || !status) {
        return res.status(400).json({ message: "ID and status are required!" });
    }

    try {
        const result = await CustomerService.UpdateStatusService({
            user_id: user_id,
            status: status as string,
        });
        res.status(200).json({
            message: result.message,
            data: result.data,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetCustomersByParams = async (req: Request, res: Response) => {
    const { page, search, status } = req.query;

    try {
        const result = await CustomerService.GetCustomersByParamsService(
            {
                search: search as string,
                status: status as string,
            },
            Number(page)
        );
        res.status(200).json({
            message: result.message,
            data: result.data,
            total: result.total,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export default {
    updateStatus,
    GetCustomersByParams,
    GetUserById,
    GetShipper,
};
