import { Request, Response } from "express";
import {
    AddMenuService,
    DeleteMenuService,
    GetMenuByParamsService,
    GetAllMenuService,
    UpdateMenuService,
    GetMenuByIdService,
    GetSpecialMenuService,
} from "./menu.service";

const AddMenu = async (req: Request, res: Response) => {
    const { title, price, description, image, category } = req.body; // Sử dụng req.body

    if (!title || !price || !description || !image || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await AddMenuService({
            title,
            price: Number(price),
            description,
            image,
            category,
        });
        return res
            .status(201)
            .json({ message: "Menu added successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetAllMenu = async (req: Request, res: Response) => {
    try {
        const result = await GetAllMenuService();
        return res.status(200).json(result); // Trả về tất cả món ăn
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const UpdateMenu = async (req: Request, res: Response) => {
    const { title, price, description, image, category } = req.body;
    const m_id  = req.params.m_id; // Sử dụng req.params để lấy ID

    if (!title || !price || !description || !image || !category || !m_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await UpdateMenuService({
            item_id: m_id as string,
            title,
            price: Number(price),
            description,
            image,
            category,
        });
        return res
            .status(200)
            .json({ message: "Menu updated successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const DeleteMenu = async (req: Request, res: Response) => {
    const m_id = req.params.m_id; // Sử dụng req.params để lấy ID

    if (!m_id) {
        return res.status(400).json({ message: "Menu id is required" });
    }

    try {
        const result = await DeleteMenuService(m_id as string);
        return res
            .status(200)
            .json({ message: "Menu deleted successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetMenuByParams = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, title, category, availability } = req.query;
    try {
        const result = await GetMenuByParamsService({
            page: Number(page),
            limit: Number(limit),
            title: title as string,
            category: category as string,
            availability: availability as string,
        });
        return res
            .status(200)
            .json({ message: "Menu fetched successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetMenuById = async (req: Request, res: Response) => {
    const m_id = req.params.menu_id; // Sử dụng req.params để lấy ID

    if (!m_id) {
        return res.status(400).json({ message: "Menu id is required" });
    }

    try {
        const result = await GetMenuByIdService(m_id);
        return res
            .status(200)
            .json({ message: "Menu fetched successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

const GetSpecialMenu = async (req: Request, res: Response) => {
    try {
        const result = await GetSpecialMenuService();
        return res.status(200).json({
            message: "Special Menu fetched successfully",
            data: result,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export {
    AddMenu,
    UpdateMenu,
    DeleteMenu,
    GetAllMenu,
    GetMenuByParams,
    GetMenuById,
    GetSpecialMenu,
};
