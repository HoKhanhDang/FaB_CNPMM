import { Request, Response } from "express";
import {
    GetOrderByParamsService,
    GetOrderByCustomerIdService,
    GetOrderItemsService,
    ChangeStatusService,
    CancelOrderService,
    GetShipperOrderService,
    CreateOrderService,
    GetOrderByIdService,
    AddOrderItemService,
    GetOrderDetailByIdService,
} from "./order.service";
import { now } from "mongoose";

const CreateOrderAPI = async (req: Request, res: Response) => {
    const { user_id, total_price, message, payment_method, address, lng, lat } =
        req.body;

    if (user_id == null || total_price == null) {
        return res
            .status(400)
            .json({ message: "User id and total price are required" });
    }

    try {
        const result = await CreateOrderService({
            user_id: user_id,
            total_price: Number(total_price),
            message: message || null,
            payment_method: payment_method || null,
            address: address || null,
            lng: lng ? Number(lng) : null,
            lat: lat ? Number(lat) : null,
        });
        return res
            .status(201)
            .json({ message: "Order created successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const AddOrderItemsAPI = async (req: Request, res: Response) => {
    const { order_id, item_id, quantity } = req.body;
    if (order_id == null || item_id == null || quantity == null) {
        return res
            .status(400)
            .json({ message: "Order id, item id, and quantity are required" });
    }

    try {
        const result = await AddOrderItemService({
            order_id: order_id,
            item_id: item_id,
            quantity: Number(quantity),
        });
        return res
            .status(201)
            .json({ message: "Order item added successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetOrderByCustomerIdAPI = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ message: "User id is required" });
    }
    try {
        const result = await GetOrderByCustomerIdService({
            user_id: user_id,
        });
        return res
            .status(200)
            .json({ message: "Order fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//get items of order by order_id
const GetOrderDetailByIdAPI = async (req: Request, res: Response) => {
    const order_id = req.params.order_id;

    if (!order_id) {
        return res.status(400).json({ message: "Orderdetail id is required" });
    }

    try {
        const result = await GetOrderDetailByIdService(order_id);
        if (!result) {
            return res.status(404).json({ message: "Orderdetail not found" });
        }
        return res
            .status(200)
            .json({ message: "Orderdetail fetched successfully", result });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error " + err });
    }
};

//get order by order_id
const GetOrderByIdAPI = async (req: Request, res: Response) => {
    const order_id = req.params.order_id;
    if (!order_id) {
        return res.status(400).json({ message: "Orderdetail id is required" });
    }

    try {
        const result = await GetOrderByIdService(order_id);
        if (!result) {
            return res.status(404).json({ message: "Orderdetail not found" });
        }
        return res
            .status(200)
            .json({ message: "Orderdetail fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Internal server error " + err });
    }
};

const GetOrderByParamsAPI = async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        create_at,
        history,
    } = req.query;

    try {
        const result = await GetOrderByParamsService({
            search: search as string,
            status: status as string,
            create_at: create_at as string,
            limit: Number(limit),
            page: Number(page),
            history: history as string,
        });
        return res
            .status(200)
            .json({
                message: "Orders fetched successfully",
                result,
                total: result.total,
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetOrderItemsAPI = async (req: Request, res: Response) => {
    try {
        const result = await GetOrderItemsService();
        return res
            .status(200)
            .json({ message: "Order items fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const ChangeStatusAPI = async (req: Request, res: Response) => {
    const { order_id } = req.params;
    const { status, user_id, delivery_time } = req.body;

    if (!order_id || !status) {
        return res
            .status(400)
            .json({ message: "Order id and status are required" });
    }

    try {
        const result = await ChangeStatusService({
            order_id: order_id,
            status: status as
                | "Pending"
                | "Processing"
                | "Packed"
                | "Delivering"
                | "Delivered"
                | "Successfully"
                | "Cancelled",
            delivery_time: delivery_time ? delivery_time : now(),
            user_id: user_id ? user_id : undefined,
        });
        return res
            .status(200)
            .json({ message: "Status updated successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const CancelOrderAPI = async (req: Request, res: Response) => {
    const { order_id } = req.params;
    const { message } = req.body;

    if (!order_id) {
        return res.status(400).json({ message: "Order id is required" });
    }

    try {
        const result = await CancelOrderService({
            order_id: order_id,
            message: message || null,
        });
        return res
            .status(200)
            .json({ message: "Order cancelled successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetShipperOrderAPI = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ message: "Shipper id is required" });
    }

    try {
        const result = await GetShipperOrderService({
            shipper_id: user_id,
        });
        return res
            .status(200)
            .json({ message: "Orders fetched successfully", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default {
    CreateOrderAPI,
    AddOrderItemsAPI,
    GetOrderByCustomerIdAPI,
    GetOrderByParamsAPI,
    GetOrderByIdAPI,
    GetOrderItemsAPI,
    ChangeStatusAPI,
    CancelOrderAPI,
    GetShipperOrderAPI,
    GetOrderDetailByIdAPI,
};
